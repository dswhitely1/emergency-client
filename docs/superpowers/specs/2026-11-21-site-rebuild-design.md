# Emergency Electric Site Rebuild — Design

Date: 2026-11-21
Status: Approved in conversation; builder-check answers incorporated; pending final doc review

## Intent

emergencyelectricinc.com is a 2019 React 16 / MUI v4 / Redux SPA for Emergency Electric, Inc.
(Lanesville, IN — residential/commercial electrical contractor, 24-hour emergency service).
It had two jobs: marketing + contact form, and an online job-application portal with an admin
side. The backend (formerly on Heroku) is shut down, so the live site's contact form and
login are broken today; only the static content and phone number work.

The owner wants a modern, maintainable marketing site whose contact form actually reaches
the office by email, with no backend or database to keep alive, and with all AWS
infrastructure defined as code and deployed through GitHub Actions.

## Goals

- Rebuild the site as a single-page marketing site in Next.js, hosted on AWS Amplify.
- Contact form submissions are emailed to `emergency_electric@hotmail.com` via Amazon SES,
  with Reply-To set to the visitor so the office can reply directly.
- All AWS resources (Amplify app/branches, Route 53 records, SES identities, IAM) managed by
  Terraform; PRs show a plan, merges apply.
- Modern "Workshop Modern" visual design, responsive with a mobile nav, WCAG AA.
- Content (services, testimonials, hours, phones, address, legal/EEO text) lives in a typed
  data file, not hardcoded in components.

## Non-goals

- No login, applicant portal, admin dashboard, database, Supabase, or Redux.
- No CMS; content edits are code edits to the data file.
- No migration of any old data (none is retrievable).
- No seasonal logo swapping (the Christmas logo is dropped; use the standard logo).

## Anti-goals (failure even if it "works")

- Contact emails that silently land in junk or fail — deliverability (DKIM/SPF/DMARC) is part
  of done, and send failures must surface an error to the visitor rather than a fake "thanks".
- Long-lived AWS access keys stored in GitHub.
- Touching the live site before cutover (brief downtime *at* cutover is accepted).
- A contact form bots can flood.

## Facts established

- DNS: domain registered at GoDaddy, **DNS hosted in Route 53** (`ns-*.awsdns-*`). `www` CNAMEs
  to `dri6x86z1zc0y.cloudfront.net` (Amplify). Apex resolves to the same CloudFront IPs.
  No MX, SPF, or DMARC records exist. The domain receives no email; that is fine.
- No `amplify.yml` or `.github/` in the repo; Amplify build settings currently live in the console.
- Brand tokens (from `src/components/styles/theme.js` and landing styles): oxblood `#670300`
  (primary), tan `#b48a66` (secondary), error `#a80400`, cream `#fbf7f5` (background),
  dark brown `#351a1a`, accent yellow `#dee236`.
- Existing images in `src/assests/` (folder name misspelled) incl. `EmergencyElectricLogo.svg`
  and Unsplash photos; reuse them.
- Current landing sections: phone FAB, Header (hero), About, Services, Testimonials, Goals,
  Contact, Footer. Copy is in those components; carry it over (fix typo "fro", update
  "Copyright 2019" to the current year computed at build).

## Approaches considered

Site/backend:
- **A. Next.js on Amplify, contact via Server Action → SES (chosen).** One repo, one deploy;
  Amplify runs Next.js server code on managed Lambda compute, so no hand-managed Lambda.
- B. Static site + standalone Lambda (Function URL) → SES. Portable and explicit, but two deploy
  targets plus CORS/IAM wiring.
- C. Third-party form service (Formspree etc.). No code, but vendor dependency and branded/limited free tiers.
- Earlier options (Supabase full-stack portal, React Router 7 full-stack) were dropped when the
  application portal was removed from scope.

IaC:
- **A. Terraform/OpenTofu (chosen).** Readable PR plans, broad provider support.
- B. AWS CDK (TypeScript). Same language as the app; import is clunkier; needs bootstrap.
- C. SST. Most concise, but replaces Amplify hosting.

## Design (decided)

### App
- Next.js App Router, TypeScript (strict), Tailwind CSS v4, shadcn/ui components.
- Built on a new `next` branch at the **repo root**, replacing the old app (history preserved in git).
- Single page `/` statically rendered; sections: Hero (with prominent call button), About,
  Services, Testimonials, Goals, **Careers** (new: "We're hiring — call or email/apply via the
  contact form"; includes the EEO statement), Contact, Footer. Add a 404 page.
- Contact form fields: name, email, phone (optional), topic (General / Service request /
  Employment interest), message. Validation with zod on both client and server
  (react-hook-form on the client).
- Submission handled by a Next.js **Server Action** that: validates, checks a honeypot field,
  verifies a **Cloudflare Turnstile** token (widget created by hand in a new free Cloudflare
  account the owner will set up; not managed in Terraform; site key + secret key stored as
  Amplify env/secrets), then calls SES `SendEmail` (AWS SDK v3).
  Shows success only on SES success; shows a clear error with the phone number otherwise.
- Mobile nav (sheet/drawer), smooth scrolling via CSS `scroll-behavior`, correct alt text,
  labelled inputs, AA contrast, visible focus states. Phone links are `tel:` with aria-labels.
- Content in a typed data module (e.g. `content/site.ts`).

### Visual direction: "Workshop Modern"
Cream background, oxblood primary, tan secondary, dark-brown header/footer, accent yellow used
sparingly (CTA hover/focus). Condensed industrial display face for headings (e.g. Barlow
Condensed) with Inter for body. Flat cards, thin rules, generous spacing. Brand colors defined
once as Tailwind `@theme` tokens; text/background pairs must meet WCAG AA (adjust shades of
tan for text use if needed).

### Email (SES)
- SES domain identity for `emergencyelectricinc.com` with Easy DKIM; DKIM CNAMEs in Route 53.
- Custom MAIL FROM `mail.emergencyelectricinc.com` (MX + SPF TXT in Route 53).
- DMARC TXT at `_dmarc` with `p=none` and an `rua` reporting address of the builder's
  choosing, or none if no suitable mailbox.
- Email identity for `emergency_electric@hotmail.com` (recipient). Account stays in the SES
  **sandbox** (sender and recipient both verified). **Manual step:** someone with access to the
  Hotmail inbox must click the AWS verification link.
- Sender `website@emergencyelectricinc.com`; Reply-To = visitor email; subject includes topic
  and visitor name. Plain-text + simple HTML body.
- Owner should mark the first messages "Not junk" / add to Safe Senders (document in README).

### Hosting (Amplify)
- **New Amplify app** created by Terraform (platform WEB_COMPUTE) for the Next.js site; the
  existing console-managed app (Vite SPA on `master`) is left untouched until cutover.
  *(Builder's call, accepted risk: owner confirmed brief downtime is acceptable — traffic is low.)*
- New app tracks branch `next` (preview URL) until cutover, then `master`.
- Amplify **SSR compute IAM role** granting only `ses:SendEmail`/`ses:SendRawEmail` on the
  domain identity, conditioned on the From address.
- Environment variables: AWS region for SES, recipient/sender addresses, Turnstile site key
  (public) and secret key. Secret handling is the builder's call (Amplify secrets/SSM),
  never committed.
- `amplify.yml` committed to the repo.
- Cutover: merge `next` → `master`, point the new app at `master`, remove the domain
  association from the old app and add it to the new one (Terraform), accepting a few minutes
  of DNS/SSL re-issue. Rollback: move the domain association back to the old app (keep the old
  app until the new site has run cleanly for a while; deleting it is a later manual step).

### Infrastructure as code
- Terraform in `infra/`, remote state in S3 (native S3 locking). The state bucket and the
  GitHub OIDC provider + deploy role are created once by a small `infra/bootstrap` config
  applied manually by the owner.
- Managed resources: new Amplify app, branches, env vars, compute role, domain association
  (added at cutover); SES identities,
  MAIL FROM; Route 53 records for DKIM/MAIL FROM/DMARC (in the existing hosted zone,
  referenced as data, not recreated).
- Existing Route 53 records for the site (apex/www) are not modified before cutover.
- **Sequencing:** `infra/` and the workflows land on `master` first, alongside the old Vite app.
  Their applies only add resources (SES, email DNS records, IAM, new Amplify app on `next`), so
  the live site is unaffected and `next` can be tested on its preview URL before cutover.

### CI/CD (GitHub Actions)
- `ci.yml` on PRs: install, lint, typecheck, `next build`.
- `infra.yml`: on PRs touching `infra/` → `terraform fmt -check`, `validate`, `plan`, plan posted
  as a PR comment. On push to `master` → `apply`, gated by a GitHub Environment requiring
  manual approval.
- AWS auth via GitHub OIDC (`aws-actions/configure-aws-credentials`), role scoped to this repo.
- App build/deploy remains Amplify's GitHub-connected auto-build.

### Prior attempt
- Remote branch `origin/rebuild/nextjs-foundation` (March 2026, Next.js + Supabase + portal) is
  **not used** — owner chose to build fresh. Leave the branch alone (don't delete it, don't
  reuse code). It is not part of the new Amplify app.

## Left to the builder

- Exact package versions (use current stable; verify Amplify's supported Next.js version).
- Component breakdown, file layout within `app/`, and test approach (at minimum: zod schema and
  Server Action unit tests with SES mocked; a build check in CI).
- Copy edits and section ordering polish; image optimization approach.
- Terraform module structure and provider versions.
- Discovering the AWS account/region of the existing Amplify app and hosted zone (via AWS CLI);
  SES should be in the same region as Amplify unless there is a reason otherwise.
