variable "aws_region" {
  description = "Region of the existing Amplify app; SES and the new Amplify app live here too."
  type        = string
}

variable "domain_name" {
  description = "Site domain; its Route 53 hosted zone already exists."
  type        = string
  default     = "emergencyelectricinc.com"
}

locals {
  sender_email    = "website@emergencyelectricinc.com"
  recipient_email = "emergency_electric@hotmail.com"
  mail_from       = "mail.${var.domain_name}"
  spf_record      = "v=spf1 include:amazonses.com ~all"
  dmarc_record    = "v=DMARC1; p=none;"
}

variable "attach_domain" {
  description = "Attach the apex and www domain to the new app. Leave false until cutover."
  type        = bool
  default     = false
}

variable "github_access_token" {
  description = "GitHub token Amplify uses to connect to the repository."
  type        = string
  sensitive   = true
}

variable "turnstile_secret_key" {
  description = "Cloudflare Turnstile secret key (server-side)."
  type        = string
  sensitive   = true
}

variable "turnstile_site_key" {
  description = "Cloudflare Turnstile site key (public)."
  type        = string
}
