# Infrastructure

Terraform for the Emergency Electric site: SES identities and email DNS, the new Amplify app
(`emergency-electric-next`) and its SSR compute role. Plans run on pull requests and applies run
on merge to `master` (`.github/workflows/infra.yml`).

- `bootstrap/` — one-time, applied by hand with local state: the remote-state bucket, the GitHub
  OIDC provider, and two deploy roles: `emergency-client-gha-plan` (read-only, assumed by PR
  plans) and `emergency-client-gha` (writes, assumed only by the `production` environment).
- `./` — everything else, applied by GitHub Actions with remote state in the bootstrap bucket.

Existing apex/`www` records and the old Amplify app are not touched before cutover.

## One-time owner setup

1. **Bootstrap** (needs admin credentials for the account that holds the Route 53 zone and the
   existing Amplify app; `<region>` is that app's region):

   ```sh
   aws iam list-open-id-connect-providers   # if a token.actions.githubusercontent.com provider exists, add -var create_oidc_provider=false
   terraform -chdir=infra/bootstrap init
   aws amplify list-apps --region <region>  # note the existing app's appId
   terraform -chdir=infra/bootstrap apply -var aws_region=<region> -var live_amplify_app_id=<appId>
   ```

   The apply role may not change the live app, and may change only the SES records in the zone.
   At cutover (Task C), re-apply bootstrap with `-var allow_site_records=true` and lift the
   live-app protection as part of that change.

   Keep `infra/bootstrap/terraform.tfstate` somewhere safe (it is git-ignored).

2. **GitHub repository settings** (Settings → Secrets and variables → Actions):

   | Kind     | Name                           | Value                                        |
   |----------|--------------------------------|----------------------------------------------|
   | Variable | `AWS_PLAN_ROLE_ARN`            | bootstrap output `gha_plan_role_arn`         |
   | Variable | `AWS_ROLE_ARN`                 | bootstrap output `gha_role_arn`              |
   | Variable | `TF_STATE_BUCKET`              | bootstrap output `state_bucket`              |
   | Variable | `AWS_REGION`                   | `<region>` used above                        |
   | Variable | `TF_VAR_turnstile_site_key`    | Cloudflare Turnstile site key                |
   | Secret   | `TF_VAR_github_access_token`   | GitHub token Amplify uses to read the repo   |
   | Secret   | `TF_VAR_turnstile_secret_key`  | Cloudflare Turnstile secret key              |

3. **Environment:** create a GitHub Environment named `production` with a required reviewer and
   deployment branches limited to `master`. Applies on `master` wait for that approval; the PR's
   plan comment is what you approve, and the plan actually applied is written to the run summary.

4. **SES verification:** after the first apply, someone with access to
   `emergency_electric@hotmail.com` must click the AWS verification link. In Hotmail, mark the
   first messages from `website@emergencyelectricinc.com` as "Not junk" and add the sender to
   Safe Senders.
