output "ses_domain_identity_arn" {
  description = "ARN of the SES domain identity."
  value       = aws_sesv2_email_identity.domain.arn
}
