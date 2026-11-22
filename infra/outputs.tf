output "ses_domain_identity_arn" {
  description = "ARN of the SES domain identity."
  value       = aws_sesv2_email_identity.domain.arn
}

output "preview_url" {
  description = "Preview URL of the next branch on the new Amplify app."
  value       = "https://next.${aws_amplify_app.site.default_domain}"
}
