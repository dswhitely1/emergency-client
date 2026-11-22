data "aws_iam_policy_document" "amplify_compute_trust" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["amplify.amazonaws.com"]
    }
  }
}

# Role the Next.js server code runs as: may only send mail from the site sender.
resource "aws_iam_role" "amplify_compute" {
  name               = "emergency-client-amplify-compute"
  path               = "/emergency-client/"
  assume_role_policy = data.aws_iam_policy_document.amplify_compute_trust.json
}

data "aws_iam_policy_document" "amplify_compute" {
  statement {
    actions = ["ses:SendEmail", "ses:SendRawEmail"]
    resources = [
      aws_sesv2_email_identity.domain.arn,
      aws_sesv2_email_identity.recipient.arn,
    ]

    condition {
      test     = "StringEquals"
      variable = "ses:FromAddress"
      values   = [local.sender_email]
    }
  }
}

resource "aws_iam_role_policy" "amplify_compute" {
  name   = "ses-send"
  role   = aws_iam_role.amplify_compute.id
  policy = data.aws_iam_policy_document.amplify_compute.json
}
