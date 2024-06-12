---
"marketplace-app-for-good": patch
---

Migrate Service Provider Stripe Onboarding Links to Separate Endpoint and Handle Stripe Connect Webhooks

Changes:

- remove account_url field from stripe_users table
- add endpoint at GET /api/v1/service-providers/authorize
- add new webhook endpoint at POST /api/v1/webhooks/stripe/connect
- add postgres function to update onboarding status on stripe_users & service_providers

Other:

- add `npm supabase:db-push-local` script
- fix environment variables not being loaded in vitest test suites
