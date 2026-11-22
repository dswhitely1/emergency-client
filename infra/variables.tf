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
