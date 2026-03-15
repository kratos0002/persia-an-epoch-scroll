

# Fix: Transactional Email Sending

## Root Cause

The `sendLovableEmail` function from `@lovable.dev/email-js` **requires a valid `run_id`** that comes from a Lovable auth webhook. Auth emails get this automatically; transactional emails (like new-essay notifications) do not. There is no way to generate a valid `run_id` without a webhook trigger — random UUIDs fail with `run_not_found`.

The current `send-transactional-email` tries to call `sendLovableEmail` directly, which will always fail for this reason.

## Solution

Rewrite the transactional email flow to **enqueue emails to the `transactional_emails` pgmq queue** (matching how `auth-email-hook` works), and update `process-email-queue` to use a **raw HTTP `fetch`** for messages that have no `run_id` — bypassing `sendLovableEmail` entirely for transactional sends.

## Changes

### 1. `supabase/functions/send-transactional-email/index.ts`

- Remove `sendLovableEmail` import — this function will no longer send directly
- Pre-render the email template (HTML + plain text) as it does now
- Enqueue to `transactional_emails` queue via `supabase.rpc('enqueue_email', { queue_name: 'transactional_emails', payload: { ... } })`
- Payload includes: `message_id`, `to`, `from`, `sender_domain`, `subject`, `html`, `text`, `purpose: 'transactional'`, `label`, `queued_at`
- No `run_id` in the payload (transactional emails don't have one)
- Log `pending` status to `email_send_log` before enqueue
- Return immediately after enqueue (the dispatcher handles actual sending)

### 2. `supabase/functions/process-email-queue/index.ts`

- Add a fallback for messages with no `run_id`: use a direct HTTP `fetch` to the Lovable email API endpoint instead of `sendLovableEmail`
- Construct the API URL from `LOVABLE_SEND_URL` or default (`https://api.lovable.dev/v1/email/send`)
- POST with the same payload fields minus `run_id`, authenticated with `LOVABLE_API_KEY` as Bearer token
- Keep the existing `sendLovableEmail` path for auth emails (which have `run_id`)
- All retry, rate-limit, DLQ, and logging logic stays the same

### 3. Deploy both edge functions

Redeploy `send-transactional-email` and `process-email-queue` after changes.

## Why This Works

- Auth emails continue through the existing `sendLovableEmail` path with valid `run_id` from webhooks
- Transactional emails bypass the `run_id` requirement by using a direct HTTP call
- Both flows still benefit from the queue's retry, rate-limit backoff, and DLQ safety
- The admin UI (test button, broadcast) requires zero changes

