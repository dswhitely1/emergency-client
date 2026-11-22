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
