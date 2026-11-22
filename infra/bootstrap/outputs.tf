output "state_bucket" {
  description = "S3 bucket for infra/ remote state (GitHub variable TF_STATE_BUCKET)."
  value       = aws_s3_bucket.state.bucket
}

output "gha_plan_role_arn" {
  description = "Read-only role for PR plans (GitHub variable AWS_PLAN_ROLE_ARN)."
  value       = aws_iam_role.gha_plan.arn
}

output "gha_role_arn" {
  description = "Apply role for the production environment (GitHub variable AWS_ROLE_ARN)."
  value       = aws_iam_role.gha.arn
}
