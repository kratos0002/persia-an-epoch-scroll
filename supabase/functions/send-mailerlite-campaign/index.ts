import { createClient } from 'npm:@supabase/supabase-js@2'
import { render } from 'npm:@react-email/render@0.0.12'
import { NewEssayEmail } from '../_shared/email-templates/new-essay.tsx'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ML_BASE = 'https://connect.mailerlite.com/api'

async function mlFetch(path: string, apiKey: string, opts: RequestInit = {}) {
  const res = await fetch(`${ML_BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
      ...(opts.headers || {}),
    },
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`MailerLite ${res.status}: ${JSON.stringify(data)}`)
  }
  return data
}

/** Find or create a group by name, return its id */
async function ensureGroup(apiKey: string, name: string): Promise<string> {
  // Search for existing group
  const { data: groups } = await mlFetch(`/groups?filter[name]=${encodeURIComponent(name)}&limit=1`, apiKey)
  if (groups?.length) return groups[0].id

  // Create group
  const { data: group } = await mlFetch('/groups', apiKey, {
    method: 'POST',
    body: JSON.stringify({ name }),
  })
  return group.id
}

/** Add subscriber to a group (upsert) */
async function addSubscriber(apiKey: string, email: string, groupId: string) {
  return mlFetch('/subscribers', apiKey, {
    method: 'POST',
    body: JSON.stringify({
      email,
      groups: [groupId],
      status: 'active',
    }),
  })
}

/** Get the account's default verified sender email */
async function getVerifiedSender(apiKey: string): Promise<{ email: string; name: string }> {
  // Try domains first
  const { data: domains } = await mlFetch('/domains', apiKey)
  // Find a verified domain
  const verified = domains?.find((d: Record<string, unknown>) =>
    d.is_verified || d.dns_records_verified
  )

  // Get account info for default sender
  try {
    const account = await mlFetch('/', apiKey)
    if (account?.data?.account_email_address) {
      return {
        email: account.data.account_email_address,
        name: account.data.name || 'Epoch Lives',
      }
    }
  } catch {
    // fallback
  }

  // Fallback: use the first domain or a generic
  if (verified?.name) {
    return { email: `notify@${verified.name}`, name: 'Epoch Lives' }
  }

  throw new Error('No verified sender found in MailerLite. Please verify a sender email/domain in your MailerLite dashboard.')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const mlApiKey = Deno.env.get('MAILERLITE_API_KEY')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!mlApiKey || !supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: 'Missing configuration (MailerLite API key or Supabase credentials)' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const { action, data } = await req.json()

    // ── ACTION: sync-subscriber ──
    // Called when a new user subscribes on the site
    if (action === 'sync-subscriber') {
      const { email, sendWelcome = true } = data
      if (!email) throw new Error('Missing email')

      const groupId = await ensureGroup(mlApiKey, 'Epoch Lives Subscribers')
      await addSubscriber(mlApiKey, email, groupId)

      // Send welcome email via a one-off MailerLite campaign
      if (sendWelcome) {
        try {
          const welcomeGroupId = await ensureGroup(mlApiKey, 'Epoch Lives Welcome')
          await addSubscriber(mlApiKey, email, welcomeGroupId)

          const welcomeHtml = render(
            SubscriberWelcomeEmail({
              siteUrl: 'https://pastlives.site',
              unsubscribeUrl: '{$unsubscribe}',
            })
          )

          const sender = await getVerifiedSender(mlApiKey)

          const { data: campaign } = await mlFetch('/campaigns', mlApiKey, {
            method: 'POST',
            body: JSON.stringify({
              name: `Welcome – ${email} – ${new Date().toISOString()}`,
              type: 'regular',
              emails: [{
                subject: "Welcome to Epoch Lives — history's turning points, felt",
                from_name: 'Epoch Lives',
                from: sender.email,
                content: welcomeHtml,
              }],
              groups: [welcomeGroupId],
            }),
          })

          await mlFetch(`/campaigns/${campaign.id}/schedule`, mlApiKey, {
            method: 'POST',
            body: JSON.stringify({ delivery: 'instant' }),
          })

          // Log
          const messageId = crypto.randomUUID()
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: 'subscriber-welcome-ml',
            recipient_email: email,
            status: 'sent',
          })

          console.log('Welcome campaign sent to', email)
        } catch (welcomeErr) {
          console.error('Welcome email failed:', welcomeErr)
        }
      }

      return new Response(
        JSON.stringify({ success: true, synced: email }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── ACTION: send-new-essay ──
    // Creates a MailerLite campaign with the essay HTML and sends it
    if (action === 'send-new-essay') {
      const { essayTitle, essaySubtitle, essayHook, essayUrl, essayImageUrl, testRecipients } = data
      const isTest = Array.isArray(testRecipients) && testRecipients.length > 0

      // 1. Ensure group exists
      const groupName = isTest ? 'Epoch Lives Test' : 'Epoch Lives Subscribers'
      const groupId = await ensureGroup(mlApiKey, groupName)

      // 2. For test mode: add test recipients to the test group
      if (isTest) {
        for (const email of testRecipients) {
          await addSubscriber(mlApiKey, email, groupId)
        }
      } else {
        // Sync all active subscribers from DB to MailerLite
        const { data: subscribers } = await supabase
          .from('subscribers')
          .select('email')
          .eq('status', 'active')

        if (subscribers?.length) {
          for (const sub of subscribers) {
            try {
              await addSubscriber(mlApiKey, sub.email, groupId)
            } catch (e) {
              console.warn(`Failed to sync subscriber ${sub.email}:`, e)
            }
          }
        }
      }

      // 3. Render HTML
      const html = render(
        NewEssayEmail({
          siteUrl: 'https://pastlives.site',
          essayTitle,
          essaySubtitle,
          essayHook,
          essayUrl,
          essayImageUrl,
          unsubscribeUrl: '{$unsubscribe}', // MailerLite variable
        })
      )

      // 4. Get verified sender
      const sender = await getVerifiedSender(mlApiKey)

      // 5. Create campaign
      const campaignName = isTest
        ? `[TEST] ${essayTitle} – ${new Date().toISOString()}`
        : `New Essay: ${essayTitle}`

      const { data: campaign } = await mlFetch('/campaigns', mlApiKey, {
        method: 'POST',
        body: JSON.stringify({
          name: campaignName,
          type: 'regular',
          emails: [{
            subject: isTest ? `[TEST] New essay: ${essayTitle}` : `New essay: ${essayTitle}`,
            from_name: 'Epoch Lives',
            from: sender.email,
            content: html,
          }],
          groups: [groupId],
        }),
      })

      console.log('Campaign created:', campaign.id)

      // 6. Send immediately
      const scheduleResult = await mlFetch(`/campaigns/${campaign.id}/schedule`, mlApiKey, {
        method: 'POST',
        body: JSON.stringify({ delivery: 'instant' }),
      })

      console.log('Campaign scheduled:', scheduleResult?.data?.status)

      // 7. Log to email_send_log
      const messageId = crypto.randomUUID()
      await supabase.from('email_send_log').insert({
        message_id: messageId,
        template_name: isTest ? 'new-essay-test-ml' : 'new-essay-ml',
        recipient_email: isTest ? testRecipients.join(', ') : 'all-subscribers',
        status: 'sent',
      })

      return new Response(
        JSON.stringify({
          success: true,
          campaign_id: campaign.id,
          test: isTest,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: `Unknown action: ${action}` }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('MailerLite campaign error:', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
