output "state_bucket" {
  description = "S3 bucket for infra/ remote state (GitHub variable TF_STATE_BUCKET)."
  value       = aws_s3_bucket.state.bucket
}

output "gha_role_arn" {
  description = "Role assumed by GitHub Actions via OIDC (GitHub variable AWS_ROLE_ARN)."
  value       = aws_iam_role.gha.arn
}
