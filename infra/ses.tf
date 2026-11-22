# Domain identity with Easy DKIM (the default for a domain identity).
resource "aws_sesv2_email_identity" "domain" {
  email_identity = var.domain_name
}

resource "aws_sesv2_email_identity_mail_from_attributes" "domain" {
  email_identity         = aws_sesv2_email_identity.domain.email_identity
  mail_from_domain       = local.mail_from
  behavior_on_mx_failure = "USE_DEFAULT_VALUE"
}

# The account stays in the SES sandbox, so the recipient must be verified too.
resource "aws_sesv2_email_identity" "recipient" {
  email_identity = local.recipient_email
}
