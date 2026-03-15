import { createClient } from 'npm:@supabase/supabase-js@2'
import { render } from 'npm:@react-email/render@0.0.12'
import { NewEssayEmail } from '../_shared/email-templates/new-essay.tsx'
import { SubscriberWelcomeEmail } from '../_shared/email-templates/subscriber-welcome.tsx'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const BREVO_BASE = 'https://api.brevo.com/v3'
const SENDER = { name: 'Epoch Lives', email: 'hello@epochlives.com' }

async function brevoFetch(path: string, apiKey: string, opts: RequestInit = {}) {
  const res = await fetch(`${BREVO_BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'api-key': apiKey,
      ...(opts.headers || {}),
    },
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : {}
  if (!res.ok) {
    throw new Error(`Brevo ${res.status}: ${JSON.stringify(data)}`)
  }
  return data
}

/** Send a single transactional email via Brevo */
async function sendTransactionalEmail(
  apiKey: string,
  to: string,
  subject: string,
  htmlContent: string,
) {
  return brevoFetch('/smtp/email', apiKey, {
    method: 'POST',
    body: JSON.stringify({
      sender: SENDER,
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  })
}

/** Add or update a contact in Brevo, optionally adding to a list */
async function upsertContact(apiKey: string, email: string, listIds?: number[]) {
  return brevoFetch('/contacts', apiKey, {
    method: 'POST',
    body: JSON.stringify({
      email,
      updateEnabled: true,
      ...(listIds ? { listIds } : {}),
    }),
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const brevoApiKey = Deno.env.get('BREVO_API_KEY')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!brevoApiKey || !supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: 'Missing configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const { action, data } = await req.json()

    // ── ACTION: sync-subscriber ──
    if (action === 'sync-subscriber') {
      const { email, sendWelcome = true } = data
      if (!email) throw new Error('Missing email')

      // Add contact to Brevo
      await upsertContact(brevoApiKey, email)

      // Send welcome email
      if (sendWelcome) {
        try {
          const welcomeHtml = render(
            SubscriberWelcomeEmail({
              siteUrl: 'https://pastlives.site',
              unsubscribeUrl: '{{unsubscribe}}',
            })
          )

          await sendTransactionalEmail(
            brevoApiKey,
            email,
            "Welcome to Epoch Lives — history's turning points, felt",
            welcomeHtml,
          )

          // Log
          await supabase.from('email_send_log').insert({
            message_id: crypto.randomUUID(),
            template_name: 'subscriber-welcome-brevo',
            recipient_email: email,
            status: 'sent',
          })

          console.log('Welcome email sent to', email)
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
    if (action === 'send-new-essay') {
      const { essayTitle, essaySubtitle, essayHook, essayUrl, essayImageUrl, testRecipients } = data
      const isTest = Array.isArray(testRecipients) && testRecipients.length > 0

      // Determine recipients
      let recipientEmails: string[] = []

      if (isTest) {
        recipientEmails = testRecipients
      } else {
        const { data: subscribers } = await supabase
          .from('subscribers')
          .select('email')
          .eq('status', 'active')

        recipientEmails = (subscribers || []).map((s: { email: string }) => s.email)
      }

      let sent = 0
      let failed = 0

      for (const email of recipientEmails) {
        try {
          const html = render(
            NewEssayEmail({
              siteUrl: 'https://pastlives.site',
              essayTitle,
              essaySubtitle,
              essayHook,
              essayUrl,
              essayImageUrl,
              unsubscribeUrl: '{{unsubscribe}}',
            })
          )

          await sendTransactionalEmail(
            brevoApiKey,
            email,
            isTest ? `[TEST] New essay: ${essayTitle}` : `New essay: ${essayTitle}`,
            html,
          )

          sent++
        } catch (err) {
          console.error(`Failed to send to ${email}:`, err)
          failed++
        }
      }

      // Log
      await supabase.from('email_send_log').insert({
        message_id: crypto.randomUUID(),
        template_name: isTest ? 'new-essay-test-brevo' : 'new-essay-brevo',
        recipient_email: isTest ? testRecipients.join(', ') : 'all-subscribers',
        status: 'sent',
      })

      return new Response(
        JSON.stringify({ success: true, sent, failed, test: isTest }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: `Unknown action: ${action}` }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Brevo email error:', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
