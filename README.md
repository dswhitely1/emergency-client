# Emergency Electric, Inc. website

Marketing site for [emergencyelectricinc.com](https://emergencyelectricinc.com): a single
statically rendered page built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4
and shadcn/ui. The contact form is a Server Action that validates input with zod, checks a
honeypot field and a Cloudflare Turnstile token, then emails the office through Amazon SES.

## Local development

Requires the Node version in `.nvmrc` (`nvm use`).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Then open http://localhost:3000.

`.env.local` holds the runtime settings. Never commit real values.

| Variable | Purpose |
| --- | --- |
| `SES_REGION` | AWS region the SES identities live in |
| `CONTACT_TO_EMAIL` | Where contact form messages are delivered |
| `CONTACT_FROM_EMAIL` | Verified SES sender (`website@emergencyelectricinc.com`) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret, used on the server |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key, built into the page |

For local work, use Cloudflare's Turnstile test keys, which always pass:

- Site key: `1x00000000000000000000AA`
- Secret key: `1x0000000000000000000000000000000AA`

Sending a real email locally also needs AWS credentials with `ses:SendEmail` permission. Without
them the form shows its error message with the office phone number, which is the expected
behavior when SES fails.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (`/` must be listed as static, ○) |
| `npm start` | Serve the production build |
| `npm test` | Vitest + Testing Library (`npm test -- --run` for a single run) |
| `npm run typecheck` | Generate route types and run `tsc --noEmit` |
| `npm run lint` | ESLint |

Site copy, phone numbers and the address live in `content/site.ts`.

## Deployment

- **Hosting:** AWS Amplify (SSR compute) builds and deploys the app from GitHub using
  `amplify.yml`. Pushing to the connected branch triggers a deploy.
- **Environment variables** are set on the Amplify app. Amplify only exposes them during the
  build, so `amplify.yml` writes the server-side ones into `.env.production` before
  `npm run build`, where the server can read them at runtime. Without that step every contact
  submission fails. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is built into the client bundle and needs
  no extra step.
- **Infrastructure** (SES identities, email DNS records, the Amplify app and its compute role)
  is managed with Terraform in `infra/` and applied by GitHub Actions through an OIDC role.
  No long-lived AWS keys are stored in GitHub.
- **CI** (`.github/workflows/ci.yml`) runs lint, typecheck, tests and the build on every push
  and pull request.

## Owner setup (manual steps)

1. **Verify the recipient address.** SES sends a verification email to
   `emergency_electric@hotmail.com`. Open it and click the link. SES stays in sandbox mode, so
   messages only reach verified addresses.
2. **Create Turnstile.** Make a free Cloudflare account and create a Turnstile widget (managed
   mode) for `emergencyelectricinc.com` **and** the Amplify preview domain. Put its site key and
   secret key into the Amplify environment variables `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
   `TURNSTILE_SECRET_KEY`, then redeploy.
3. **Keep messages out of junk.** When the first contact emails arrive in Hotmail, mark them
   "Not junk" and add `website@emergencyelectricinc.com` to Safe Senders.
