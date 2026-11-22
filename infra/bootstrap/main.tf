terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_caller_identity" "current" {}

data "aws_route53_zone" "site" {
  name         = var.domain_name
  private_zone = false
}

locals {
  account_id   = data.aws_caller_identity.current.account_id
  state_bucket = "emergency-client-tfstate-${local.account_id}"
  iam_path     = "/emergency-client/"
  oidc_url     = "https://token.actions.githubusercontent.com"
  oidc_arn     = var.create_oidc_provider ? aws_iam_openid_connect_provider.github[0].arn : data.aws_iam_openid_connect_provider.github[0].arn
}

# Remote state bucket for infra/ (S3 native locking, no DynamoDB).
resource "aws_s3_bucket" "state" {
  bucket = local.state_bucket
}

resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket                  = aws_s3_bucket.state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# GitHub Actions OIDC provider (one per account).
resource "aws_iam_openid_connect_provider" "github" {
  count          = var.create_oidc_provider ? 1 : 0
  url            = local.oidc_url
  client_id_list = ["sts.amazonaws.com"]
}

data "aws_iam_openid_connect_provider" "github" {
  count = var.create_oidc_provider ? 0 : 1
  url   = local.oidc_url
}

# Two deploy roles. PR code runs `terraform plan`, so the role PRs can reach is read-only; only the
# approval-gated production environment can assume the role that writes.
data "aws_iam_policy_document" "gha_plan_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [local.oidc_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:pull_request"]
    }
  }
}

data "aws_iam_policy_document" "gha_apply_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [local.oidc_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:environment:production"]
    }
  }
}

resource "aws_iam_role" "gha_plan" {
  name               = "emergency-client-gha-plan"
  assume_role_policy = data.aws_iam_policy_document.gha_plan_trust.json
}

resource "aws_iam_role" "gha" {
  name               = "emergency-client-gha"
  assume_role_policy = data.aws_iam_policy_document.gha_apply_trust.json
}

data "aws_iam_policy_document" "gha_plan" {
  statement {
    sid       = "AmplifyRead"
    actions   = ["amplify:Get*", "amplify:List*"]
    resources = ["*"]
  }

  statement {
    sid       = "SesRead"
    actions   = ["ses:Get*", "ses:List*"]
    resources = ["*"]
  }

  statement {
    sid       = "Route53Read"
    actions   = ["route53:Get*", "route53:List*"]
    resources = ["*"]
  }

  statement {
    sid       = "IamRead"
    actions   = ["iam:GetRole", "iam:GetRolePolicy", "iam:ListRolePolicies", "iam:ListAttachedRolePolicies", "iam:ListInstanceProfilesForRole"]
    resources = ["arn:aws:iam::${local.account_id}:role${local.iam_path}*"]
  }

  statement {
    sid       = "StateBucket"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.state.arn]
  }

  statement {
    sid       = "StateRead"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.state.arn}/*"]
  }

  # plan still takes the state lock.
  statement {
    sid       = "StateLock"
    actions   = ["s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.state.arn}/site/terraform.tfstate.tflock"]
  }
}

data "aws_iam_policy_document" "gha" {
  source_policy_documents = [data.aws_iam_policy_document.gha_plan.json]

  statement {
    sid       = "Amplify"
    actions   = ["amplify:*"]
    resources = ["arn:aws:amplify:${var.aws_region}:${local.account_id}:apps/*"]
  }

  # The live console-managed app is off limits until cutover.
  statement {
    sid    = "ProtectLiveApp"
    effect = "Deny"
    actions = [
      "amplify:DeleteApp", "amplify:UpdateApp", "amplify:DeleteBranch", "amplify:UpdateBranch",
      "amplify:DeleteDomainAssociation", "amplify:UpdateDomainAssociation", "amplify:CreateDomainAssociation",
    ]
    resources = [
      "arn:aws:amplify:${var.aws_region}:${local.account_id}:apps/${var.live_amplify_app_id}",
      "arn:aws:amplify:${var.aws_region}:${local.account_id}:apps/${var.live_amplify_app_id}/*",
    ]
  }

  statement {
    sid       = "SesIdentities"
    actions   = ["ses:CreateEmailIdentity", "ses:DeleteEmailIdentity", "ses:PutEmailIdentity*", "ses:TagResource", "ses:UntagResource"]
    resources = ["arn:aws:ses:${var.aws_region}:${local.account_id}:identity/*"]
  }

  statement {
    sid       = "Route53EmailRecords"
    actions   = ["route53:ChangeResourceRecordSets"]
    resources = [data.aws_route53_zone.site.arn]

    # Only the SES records until cutover; set allow_site_records = true for Task C.
    dynamic "condition" {
      for_each = var.allow_site_records ? [] : [1]
      content {
        test     = "ForAllValues:StringLike"
        variable = "route53:ChangeResourceRecordSetsNormalizedRecordNames"
        values   = ["*._domainkey.${var.domain_name}", "mail.${var.domain_name}", "_dmarc.${var.domain_name}"]
      }
    }
  }

  statement {
    sid = "IamComputeRole"
    actions = [
      "iam:CreateRole", "iam:DeleteRole", "iam:UpdateRole", "iam:UpdateAssumeRolePolicy",
      "iam:TagRole", "iam:UntagRole", "iam:PutRolePolicy", "iam:DeleteRolePolicy",
    ]
    resources = ["arn:aws:iam::${local.account_id}:role${local.iam_path}emergency-client-amplify-compute"]
  }

  statement {
    sid       = "PassComputeRole"
    actions   = ["iam:PassRole"]
    resources = ["arn:aws:iam::${local.account_id}:role${local.iam_path}emergency-client-amplify-compute"]

    condition {
      test     = "StringEquals"
      variable = "iam:PassedToService"
      values   = ["amplify.amazonaws.com"]
    }
  }

  statement {
    sid       = "StateWrite"
    actions   = ["s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.state.arn}/*"]
  }
}

resource "aws_iam_role_policy" "gha_plan" {
  name   = "emergency-client-gha-plan"
  role   = aws_iam_role.gha_plan.id
  policy = data.aws_iam_policy_document.gha_plan.json
}

resource "aws_iam_role_policy" "gha" {
  name   = "emergency-client-gha"
  role   = aws_iam_role.gha.id
  policy = data.aws_iam_policy_document.gha.json
}
