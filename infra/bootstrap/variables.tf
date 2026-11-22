variable "aws_region" {
  description = "Region of the existing Amplify app; also used for SES."
  type        = string
}

variable "github_repo" {
  description = "GitHub repository (owner/name) allowed to assume the deploy role."
  type        = string
  default     = "dswhitely1/emergency-client"
}

variable "domain_name" {
  description = "Domain whose existing Route 53 hosted zone the deploy role may change."
  type        = string
  default     = "emergencyelectricinc.com"
}

variable "create_oidc_provider" {
  description = "Create the GitHub OIDC provider. Set false if the account already has one (aws iam list-open-id-connect-providers)."
  type        = bool
  default     = true
}

variable "live_amplify_app_id" {
  description = "ID of the existing console-managed Amplify app (aws amplify list-apps). The deploy role may not change it."
  type        = string
}

variable "allow_site_records" {
  description = "Let the deploy role change any record in the zone (needed at cutover). Default limits it to the SES records."
  type        = bool
  default     = false
}
