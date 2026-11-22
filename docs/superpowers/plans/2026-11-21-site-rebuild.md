# Emergency Electric Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 2019 React SPA with a Next.js marketing site on a new Amplify app whose contact form emails the office via SES, with all AWS resources in Terraform deployed by GitHub Actions.

**Architecture:** Two tracks. **Infra** (`infra/`, `.github/workflows/infra.yml`) lands on `master` first via its own PR and only adds resources. **App** (Next.js at repo root) is built on `next`; the contact form is a Server Action that validates (zod), checks a honeypot and Turnstile, then calls SES v2. Cutover moves the domain to the new Amplify app.

**Tech Stack:** Next.js (App Router, current stable ≥16, confirm Amplify support), React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui, react-hook-form + zod, `@aws-sdk/client-sesv2`, Vitest + Testing Library, Terraform ≥1.10 with AWS provider ~> 6, GitHub Actions with OIDC.

**Spec:** `docs/superpowers/specs/2026-11-21-site-rebuild-design.md`

## Global Constraints

- Domain `emergencyelectricinc.com`; DNS zone already in Route 53 — reference it with `data "aws_route53_zone"`, never create or modify apex/`www` records before cutover.
- Sender `website@emergencyelectricinc.com`; recipient `emergency_electric@hotmail.com`; Reply-To = visitor email.
- MAIL FROM `mail.emergencyelectricinc.com`; SPF `v=spf1 include:amazonses.com ~all`; DMARC `v=DMARC1; p=none;`.
- SES stays in sandbox; SES region = the region of the existing Amplify app (discover with `aws amplify list-apps --region <r>`; record it as `var.aws_region`).
- No long-lived AWS keys in GitHub; Actions use OIDC role. No secrets committed.
- Brand tokens: primary `#670300`, secondary `#b48a66`, error `#a80400`, background `#fbf7f5`, dark `#351a1a`, accent `#dee236`. Text/background pairs meet WCAG AA.
- Fonts: Barlow Condensed (headings), Inter (body) via `next/font/google`.
- No login, portal, admin, database, Supabase, Redux. Do not touch or reuse `origin/rebuild/nextjs-foundation`.
- Copy comes from the old components on `master` (`git show master:src/components/landing-page/pages/<File>.jsx`); fix typo "fro" → "for"; footer year = `new Date().getFullYear()`.
- Runtime env vars (exact names): `SES_REGION`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- Phone/address shown in the error message must come from `content/site.ts`, not be retyped.

## Review Focus

1. Message/name containing HTML or `<script>` → email HTML body shows it escaped as text (test in Task A3).
2. Name containing CR/LF (header injection attempt) → subject has newlines stripped (test in Task A3).
3. SES throws or an env var is missing → visitor sees an error naming the office phone, never "thanks" (test in Task A3).
4. Visitor double-clicks Submit → one submission; button disabled while pending (test in Task A4).
5. Turnstile token missing (script blocked / no JS) → field-independent error with phone number, no send (test in Task A3).

## Worker coordination

Four sessions share one checkout, so **each worker uses its own git worktree** (`git worktree add ../ee-<track> <branch>`).
- `infra` branch (from `master`) → PR into `master`: Tasks I1–I4.
- `next` branch: Task A1 first (blocks the rest). Then A2 and A3 in parallel on `next-a2` / `next-a3` (branched from `next` after A1), each merged back into `next`. Then A4, then A5.
- Task C (cutover) is run by the coordinator with the owner after everything else.

---

## Infra track

### Task I1: Bootstrap (state bucket + GitHub OIDC role)

**Files:**
- Create: `infra/bootstrap/main.tf`, `infra/bootstrap/variables.tf`, `infra/bootstrap/outputs.tf`, `infra/README.md`

**Interfaces:**
- Produces: outputs `state_bucket` (string), `gha_role_arn` (string). Bucket name `emergency-client-tfstate-<account_id>`. Role name `emergency-client-gha`.

- [ ] **Step 1:** Write bootstrap config with local state: S3 bucket (versioning on, SSE-S3, all public access blocked), `aws_iam_openid_connect_provider` for `token.actions.githubusercontent.com` (use a `data` lookup if one already exists in the account — check with `aws iam list-open-id-connect-providers`), role `emergency-client-gha` trusting `repo:dswhitely1/emergency-client:pull_request` and `repo:dswhitely1/emergency-client:environment:production`, with a policy limited to: Amplify (`amplify:*` on apps in the account), SES v2 identities, Route 53 record changes on the zone ID, IAM create/manage roles under path `/emergency-client/`, `iam:PassRole` for those roles, and S3 read/write on the state bucket.
- [ ] **Step 2:** Run `terraform -chdir=infra/bootstrap init -backend=false && terraform -chdir=infra/bootstrap validate`. Expected: `Success! The configuration is valid.`
- [ ] **Step 3:** In `infra/README.md`, document the owner's one-time step: `terraform -chdir=infra/bootstrap init && terraform -chdir=infra/bootstrap apply`, then add GitHub repo variables `AWS_ROLE_ARN` and `TF_STATE_BUCKET` from the outputs.
- [ ] **Step 4:** Commit `feat(infra): add bootstrap for state bucket and GitHub OIDC role`.

### Task I2: SES identities and email DNS

**Files:**
- Create: `infra/backend.tf`, `infra/providers.tf`, `infra/variables.tf`, `infra/ses.tf`, `infra/dns.tf`, `infra/outputs.tf`

**Interfaces:**
- Consumes: state bucket from I1 (backend uses `-backend-config="bucket=..."`, key `site/terraform.tfstate`, `use_lockfile = true`).
- Produces: `aws_sesv2_email_identity.domain` (its `arn` used by I3), locals `sender_email = "website@emergencyelectricinc.com"`, `recipient_email = "emergency_electric@hotmail.com"`, variable `aws_region`.

- [ ] **Step 1:** Define `aws_sesv2_email_identity` for the domain (Easy DKIM) and for the Hotmail recipient; `aws_sesv2_email_identity_mail_from_attributes` with `mail.emergencyelectricinc.com`, behavior on MX failure `USE_DEFAULT_VALUE`.
- [ ] **Step 2:** In `dns.tf`, use `data "aws_route53_zone"` for the domain and create: 3 DKIM CNAMEs (`<token>._domainkey` → `<token>.dkim.amazonses.com`, via `for_each` over the identity's DKIM tokens), MX `mail` → `10 feedback-smtp.${var.aws_region}.amazonses.com`, TXT `mail` → SPF constant, TXT `_dmarc` → DMARC constant.
- [ ] **Step 3:** Run `terraform -chdir=infra fmt -check && terraform -chdir=infra init -backend=false && terraform -chdir=infra validate`. Expected: valid.
- [ ] **Step 4:** Commit `feat(infra): add SES identities and email DNS records`.

### Task I3: New Amplify app and SSR compute role

**Files:**
- Create: `infra/iam.tf`, `infra/amplify.tf`
- Modify: `infra/variables.tf`, `infra/outputs.tf`

**Interfaces:**
- Consumes: `aws_sesv2_email_identity.domain.arn`, locals from I2.
- Produces: output `preview_url` (`https://next.<default_domain>`), variable `attach_domain` (bool, default `false`), sensitive variables `github_access_token`, `turnstile_secret_key`, variable `turnstile_site_key`.

- [ ] **Step 1:** In `iam.tf`, create role `emergency-client-amplify-compute` (path `/emergency-client/`) trusted by `amplify.amazonaws.com`, with a policy allowing only `ses:SendEmail` and `ses:SendRawEmail` on the domain identity ARN and the recipient identity ARN, conditioned `StringEquals ses:FromAddress = local.sender_email`.
- [ ] **Step 2:** In `amplify.tf`, create `aws_amplify_app` named `emergency-electric-next`: repository `https://github.com/dswhitely1/emergency-client`, `access_token = var.github_access_token`, `platform = "WEB_COMPUTE"`, `compute_role_arn` = the role from Step 1 (confirm the attribute name in the provider version pinned), environment variables with the exact names from Global Constraints (`SES_REGION = var.aws_region`, the two emails from locals, the Turnstile keys from variables). Create `aws_amplify_branch` `next` (framework `Next.js - SSR`, auto build on).
- [ ] **Step 3:** Add `aws_amplify_domain_association` for the apex + `www`, with `count = var.attach_domain ? 1 : 0` (stays off until Task C).
- [ ] **Step 4:** Run fmt/validate as in I2. Expected: valid.
- [ ] **Step 5:** Commit `feat(infra): add Amplify app, next branch, and SES-scoped compute role`.

### Task I4: Infra workflow

**Files:**
- Create: `.github/workflows/infra.yml`

**Interfaces:**
- Consumes: repo variables `AWS_ROLE_ARN`, `TF_STATE_BUCKET`, `AWS_REGION`; repo secrets `TF_VAR_github_access_token`, `TF_VAR_turnstile_secret_key`; repo variable `TF_VAR_turnstile_site_key`.

- [ ] **Step 1:** Workflow with `permissions: id-token: write, contents: read, pull-requests: write`. On `pull_request` with paths `infra/**` (excluding `infra/bootstrap/**`) and `.github/workflows/infra.yml`: checkout, `hashicorp/setup-terraform`, `aws-actions/configure-aws-credentials` (role from vars), `fmt -check`, `init` with backend config, `validate`, `plan -no-color -out=tfplan`, post the plan output as a PR comment (update the existing comment if present). On `push` to `master` with the same paths: job with `environment: production` running `init` and `apply -auto-approve`.
- [ ] **Step 2:** Lint with `actionlint .github/workflows/infra.yml` (install via `brew install actionlint` if missing). Expected: no output.
- [ ] **Step 3:** Commit `ci(infra): add terraform plan/apply workflow`. Open a PR `infra` → `master` and report the URL to the coordinator. **Do not merge**; the owner runs bootstrap and sets the GitHub variables/secrets and the `production` environment (required reviewer) first.

---

## App track (branch `next`)

### Task A1: Scaffold, tokens, test runner, CI

**Files:**
- Delete: everything from the old Vite app (`src/`, `public/`, `index.html`, `vite.config.*`, `eslint.config.js`, `package.json`, `package-lock.json`); first copy the images from `src/assests/` that are used (logo SVG plus the Unsplash/electrician photos) to `public/images/`, renaming to kebab-case with no spaces; skip `sharpen xmas.png` and the admin images.
- Create: Next.js app at repo root (`create-next-app` with TypeScript, ESLint, App Router, Tailwind, no `src/` dir, import alias `@/*`), `.nvmrc` (`22`), `vitest.config.ts`, `vitest.setup.ts`, `components.json` (shadcn init), `app/globals.css`, `app/layout.tsx`, `.github/workflows/ci.yml`, `.env.example`
- Test: `tests/smoke.test.tsx`

**Interfaces:**
- Produces: Tailwind theme tokens usable as classes: `bg-primary`, `text-primary-foreground`, `bg-secondary`, `bg-background`, `bg-dark`, `text-dark-foreground`, `bg-accent`, `text-destructive`; font CSS vars `--font-heading`, `--font-body` with utilities `font-heading`, `font-body`; `npm test` runs Vitest; `npm run typecheck` runs `tsc --noEmit`.

- [ ] **Step 1:** Scaffold and init shadcn (`npx shadcn@latest init`); add components `button input textarea label select sheet card`.
- [ ] **Step 2:** In `app/globals.css`, map brand tokens from Global Constraints into the `@theme`/shadcn CSS variables (only a light theme; no dark mode). Where white-on-tan fails AA, use dark text on tan.
- [ ] **Step 3:** Write `tests/smoke.test.tsx`: renders `<Button>Call</Button>` and asserts `getByRole('button', { name: 'Call' })` exists. Run `npm test`, expect PASS.
- [ ] **Step 4:** `ci.yml`: on `pull_request` and push to `next`/`master`, run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test -- --run`, `npm run build` on Node from `.nvmrc`. Validate with `actionlint`.
- [ ] **Step 5:** `.env.example` lists the five env var names with placeholder values. Run `npm run build`. Expected: build succeeds.
- [ ] **Step 6:** Commit `feat: scaffold Next.js app with brand tokens, Vitest, and CI`.

### Task A2: Content module and static sections

**Files:**
- Create: `content/site.ts`, `components/site/{site-header,mobile-nav,hero,about,services,testimonials,goals,careers,site-footer,call-button}.tsx`
- Test: `tests/content.test.ts`, `tests/site-header.test.tsx`

**Interfaces:**
- Produces: `export const site: SiteContent` with `SiteContent = { name: string; tagline: string; phones: { label: string; display: string; tel: string }[]; address: { street: string; city: string; state: string; zip: string }; hours: string; about: string[]; services: { title: string; description: string; image: string; imageAlt: string }[]; testimonials: { quote: string; author: string }[]; goals: string[]; careers: { heading: string; body: string; eeo: string }; nav: { label: string; href: `#${string}` }[] }`. `site.phones[0]` is the primary phone. `<CallButton variant?: 'hero' | 'floating' />`.

- [ ] **Step 1:** Write `tests/content.test.ts`: every `phones[].tel` matches `/^\+1\d{10}$/`; every service has a non-empty `imageAlt` that differs between services; no string anywhere in `site` contains `" fro "`; `nav` hrefs match section ids `about, services, testimonials, careers, contact`.
- [ ] **Step 2:** Populate `content/site.ts` from the old components (`git show master:src/components/landing-page/pages/{About,Services,Testimonials,Goals,Footer,PhoneNumber,Header}.jsx`; EEO text from `Header.jsx`/`git show master:src/components/application/ViewApplication.jsx`). Careers body: "We're hiring licensed electricians and apprentices. Call us or send a message using the form below and choose “Employment interest.”" Run the test, expect PASS.
- [ ] **Step 3:** Write `tests/site-header.test.tsx`: at mobile width, the menu button `getByRole('button', { name: /open menu/i })` opens a sheet listing every `site.nav` label; clicking a link closes the sheet; the primary phone link has `href="tel:..."` and an accessible name containing the display number.
- [ ] **Step 4:** Build the sections as Server Components using `site` (Workshop Modern: cream background, dark-brown header/footer, oxblood CTAs, accent yellow only on hover/focus; `next/image` with the spec'd alt text; each section's `id` matches `nav`). `MobileNav` is the only client component here. Add `scroll-behavior: smooth` (respecting `prefers-reduced-motion`) in `globals.css`. Run the tests, expect PASS.
- [ ] **Step 5:** Commit `feat: add content module and landing sections`.

### Task A3: Contact submission (schema, email, Turnstile, Server Action)

**Files:**
- Create: `lib/contact/schema.ts`, `lib/contact/email.ts`, `lib/contact/turnstile.ts`, `app/actions/contact.ts`
- Test: `tests/contact/schema.test.ts`, `tests/contact/email.test.ts`, `tests/contact/action.test.ts`

**Interfaces:**
- Produces:
  - `contactSchema` (zod): `name` trimmed 1–100; `email` valid email ≤254; `phone` optional, ≤30; `topic` enum `'general' | 'service' | 'employment'`; `message` trimmed 10–5000; `company` honeypot, string (may be empty). `type ContactInput = z.infer<typeof contactSchema>`. `TOPIC_LABELS: Record<ContactInput['topic'], string>` = `{ general: 'General question', service: 'Service request', employment: 'Employment interest' }`.
  - `buildContactEmail(input: ContactInput): { subject: string; text: string; html: string }` — subject `` `[Website] ${TOPIC_LABELS[topic]} — ${name}` `` with CR/LF removed from `name`.
  - `sendContactEmail(input: ContactInput, client?: SESv2Client): Promise<void>` — SES v2 `SendEmailCommand`, `FromEmailAddress = CONTACT_FROM_EMAIL`, `Destination.ToAddresses = [CONTACT_TO_EMAIL]`, `ReplyToAddresses = [input.email]`, region `SES_REGION`; throws if any of those env vars is missing.
  - `verifyTurnstile(token: string | null, ip?: string): Promise<boolean>` — POST form data `secret`, `response`, `remoteip` to `https://challenges.cloudflare.com/turnstile/v0/siteverify`; returns `false` for empty token or `success !== true`, and on network error.
  - `type ContactState = { status: 'idle' | 'success' | 'error'; message?: string; fieldErrors?: Partial<Record<keyof ContactInput, string[]>> }`; `submitContact(prev: ContactState, formData: FormData): Promise<ContactState>` (`'use server'`), reading the token from form field `cf-turnstile-response`.

- [ ] **Step 1:** Write `schema.test.ts`: valid input parses; `message` of 9 chars fails with a fieldError on `message`; bad email fails on `email`; unknown topic fails. Run it, expect FAIL (module missing). Implement `schema.ts`. Run it, expect PASS.
- [ ] **Step 2:** Write `email.test.ts`: `buildContactEmail` with `name: 'Ann\r\nBcc: x@y.z'` → subject contains no `\r` or `\n`; with `message: '<script>alert(1)</script>'` → `html` contains `&lt;script&gt;` and not `<script>`; `text` contains the raw message, phone, and email. `sendContactEmail` with a mocked client (`{ send: vi.fn() }`) → the command input has `ReplyToAddresses: ['visitor@example.com']` and the env From/To; with `CONTACT_TO_EMAIL` unset → rejects. Run it, expect FAIL. Implement `email.ts` (escape `& < > " '` in HTML). Run it, expect PASS.
- [ ] **Step 3:** Write `action.test.ts`, mocking `verifyTurnstile` and `sendContactEmail`: (a) valid + token ok → `{ status: 'success' }` and send called once; (b) honeypot `company` non-empty → `status: 'success'` and send **not** called; (c) turnstile false → `status: 'error'`, message contains `site.phones[0].display`, send not called; (d) send rejects → `status: 'error'`, message contains `site.phones[0].display`; (e) invalid fields → `status: 'error'` with `fieldErrors.message`. Run it, expect FAIL. Implement `turnstile.ts` and `app/actions/contact.ts` (order: honeypot → schema → Turnstile → send; log the error server-side with `console.error`, never return it to the client). Run it, expect PASS.
- [ ] **Step 4:** Run `npm test -- --run && npm run typecheck`. Expected: all pass.
- [ ] **Step 5:** Commit `feat: add contact submission via Server Action and SES`.

### Task A4: Contact form UI and page assembly

**Files:**
- Create: `components/contact/contact-form.tsx`, `components/contact/contact-section.tsx`
- Modify: `app/page.tsx`, `app/layout.tsx` (metadata: title "Emergency Electric, Inc. | Lanesville, IN Electrician", description from `site.tagline`, Open Graph)
- Test: `tests/contact/contact-form.test.tsx`

**Interfaces:**
- Consumes: `submitContact`, `ContactState`, `contactSchema`, `TOPIC_LABELS` (A3); `site`, sections (A2).

- [ ] **Step 1:** Write `contact-form.test.tsx` (mock the action): every field has an associated label; submitting a 5-char message shows the inline error without calling the action; while pending the submit button is disabled and has the text "Sending…", and a second click does not call the action again; on `status: 'success'` the form is replaced by a thank-you message with `role="status"`; on `status: 'error'` the message renders with `role="alert"`. Run it, expect FAIL.
- [ ] **Step 2:** Implement `ContactForm` (client component): react-hook-form with `zodResolver(contactSchema)`, `useActionState(submitContact, { status: 'idle' })`, shadcn inputs, topic `Select` defaulting to `general`, honeypot `company` input hidden off-screen with `tabIndex={-1}` and `autoComplete="off"` and `aria-hidden`, Turnstile widget loaded with `next/script` from `https://challenges.cloudflare.com/turnstile/v0/api.js` using `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (managed mode, renders the hidden `cf-turnstile-response` field). Run the tests, expect PASS.
- [ ] **Step 3:** Assemble `app/page.tsx` in the order Hero, About, Services, Testimonials, Goals, Careers, Contact, with `SiteHeader`, `SiteFooter`, and the floating `CallButton` on mobile. Run `npm run build`. Expected: `/` is listed as static (○) in the build output and the build succeeds.
- [ ] **Step 4:** Commit `feat: add contact form and assemble landing page`.

### Task A5: 404, Amplify build spec, accessibility check, README

**Files:**
- Create: `app/not-found.tsx`, `amplify.yml`
- Modify: `README.md`

- [ ] **Step 1:** `not-found.tsx`: brand-styled page with links to `/` and the primary phone.
- [ ] **Step 2:** `amplify.yml`: `nvm use` from `.nvmrc`, `npm ci`, then **write the server-side env vars into `.env.production` before `npm run build`** (`env | grep -E '^(SES_REGION|CONTACT_TO_EMAIL|CONTACT_FROM_EMAIL|TURNSTILE_SECRET_KEY)=' >> .env.production`), artifacts `baseDirectory: .next`, cache `.next/cache` and `node_modules`.
- [ ] **Step 3:** Run `npm run build && npx next start` and an automated a11y check: `npx @axe-core/cli http://localhost:3000 --exit`. Expected: 0 violations. Fix any, then stop the server.
- [ ] **Step 4:** Rewrite `README.md`: local dev (`.env.local` from `.env.example`; Turnstile test keys `1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`), scripts, deploy model, and the owner's manual steps: click the AWS verification email in the Hotmail inbox; create the Cloudflare account and a Turnstile widget for `emergencyelectricinc.com` plus the Amplify preview domain; mark the first emails "Not junk" and add `website@emergencyelectricinc.com` to Safe Senders.
- [ ] **Step 5:** Commit `feat: add 404 page, Amplify build spec, and README`. Push `next` and report to the coordinator.

---

## Task C: Preview verification and cutover (coordinator + owner)

- [ ] **Step 1:** After the infra PR is merged and applied, and `next` has built on the new Amplify app, open `preview_url`; submit the form with topic "Service request". Expected: the email arrives at the Hotmail inbox from `website@emergencyelectricinc.com`, and replying goes to the visitor address. Check the message headers show `dkim=pass` and `spf=pass`.
- [ ] **Step 2:** Merge `next` → `master` (PR). In a follow-up infra PR: change the `aws_amplify_branch` to `master` (stage `PRODUCTION`), remove the domain from the old Amplify app in the console, then set `attach_domain = true`, plan, and apply.
- [ ] **Step 3:** Verify `https://www.emergencyelectricinc.com` and the apex serve the new site with valid SSL (`curl -sI`), and send one more test submission. Rollback: set `attach_domain = false`, re-add the domain to the old app.
