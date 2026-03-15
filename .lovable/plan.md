

## Fix automated welcome email flow

### Problem
Two bugs block the automated welcome email:
1. `getVerifiedSender` calls `GET /domains` — MailerLite returns 405 (only POST supported), crashing the send
2. Function needs redeployment with the fix

### Fix

**Edit `supabase/functions/send-mailerlite-campaign/index.ts`:**
- Replace `getVerifiedSender` — remove the `GET /domains` call entirely
- Use only `GET /` (account info) to fetch `account_email_address`
- Add a hardcoded fallback (`notify@epochlives.com` or similar) if account endpoint also fails

**Deploy** the updated edge function.

**Test** by triggering a welcome email for `vishal27792@gmail.com`.

### Steps
1. Rewrite `getVerifiedSender` function (remove domains call, account-info-only + fallback)
2. Deploy `send-mailerlite-campaign`
3. Invoke the function to re-send welcome to `vishal27792@gmail.com`

