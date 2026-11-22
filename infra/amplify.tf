# New app for the Next.js site; the console-managed Vite app stays untouched until cutover.
resource "aws_amplify_app" "site" {
  name             = "emergency-electric-next"
  repository       = "https://github.com/dswhitely1/emergency-client"
  access_token     = var.github_access_token
  platform         = "WEB_COMPUTE"
  compute_role_arn = aws_iam_role.amplify_compute.arn

  depends_on = [time_sleep.amplify_compute_propagation]

  environment_variables = {
    SES_REGION                     = var.aws_region
    CONTACT_TO_EMAIL               = local.recipient_email
    CONTACT_FROM_EMAIL             = local.sender_email
    TURNSTILE_SECRET_KEY           = var.turnstile_secret_key
    NEXT_PUBLIC_TURNSTILE_SITE_KEY = var.turnstile_site_key
  }
}

resource "aws_amplify_branch" "next" {
  app_id            = aws_amplify_app.site.id
  branch_name       = "next"
  framework         = "Next.js - SSR"
  enable_auto_build = true
}

# Off until cutover (Task C): the domain is still attached to the old app.
resource "aws_amplify_domain_association" "site" {
  count                 = var.attach_domain ? 1 : 0
  app_id                = aws_amplify_app.site.id
  domain_name           = var.domain_name
  wait_for_verification = false

  sub_domain {
    branch_name = aws_amplify_branch.next.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.next.branch_name
    prefix      = "www"
  }
}
