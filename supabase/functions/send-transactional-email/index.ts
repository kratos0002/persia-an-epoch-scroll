import { createClient, SupabaseClient } from 'npm:@supabase/supabase-js@2'
import { render } from 'npm:@react-email/render@0.0.12'
import { SubscriberWelcomeEmail } from '../_shared/email-templates/subscriber-welcome.tsx'
import { NewEssayEmail } from '../_shared/email-templates/new-essay.tsx'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// deno-lint-ignore no-explicit-any
async function enqueueEmail(
  supabase: SupabaseClient<any>,
  opts: {
    to: string
    from: string
    senderDomain: string
    subject: string
    html: string
    text: string
    label: string
    unsubscribeToken?: string
  }
) {
  const messageId = crypto.randomUUID()

  // Log pending
  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: opts.label,
    recipient_email: opts.to,
    status: 'pending',
  })

  // Enqueue to transactional_emails pgmq queue
  const { error } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: opts.to,
      from: opts.from,
      sender_domain: opts.senderDomain,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      purpose: 'transactional',
      label: opts.label,
      unsubscribe_token: opts.unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })

  if (error) {
    console.error('Failed to enqueue email', { error, messageId })
    return { success: false, messageId, error: error.message }
  }

  return { success: true, messageId }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const { template, data } = await req.json()

    if (template === 'subscriber-welcome') {
      const { email } = data
      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Missing email' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Check suppression list
      const { data: suppressed } = await supabase
        .from('suppressed_emails')
        .select('id')
        .eq('email', email)
        .maybeSingle()

      if (suppressed) {
        return new Response(
          JSON.stringify({ skipped: true, reason: 'suppressed' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Generate unsubscribe token
      const token = crypto.randomUUID()
      await supabase.from('email_unsubscribe_tokens').insert({ email, token })
      const unsubscribeUrl = `https://pastlives.site/unsubscribe?token=${token}`

      const html = render(
        SubscriberWelcomeEmail({
          siteUrl: 'https://pastlives.site',
          unsubscribeUrl,
        })
      )

      const result = await enqueueEmail(supabase, {
        to: email,
        from: 'Epoch Lives <notify@notify.pastlives.site>',
        senderDomain: 'notify.pastlives.site',
        subject: "Welcome to Epoch Lives — history's turning points, felt",
        html,
        text: "Welcome to Epoch Lives — history's turning points, felt. Visit https://pastlives.site to explore.",
        label: 'subscriber-welcome',
        unsubscribeToken: token,
      })

      return new Response(
        JSON.stringify({ success: result.success, message_id: result.messageId }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (template === 'new-essay') {
      const { essayTitle, essaySubtitle, essayHook, essayUrl, essayImageUrl, testRecipients } = data

      // Determine recipients: test mode or all subscribers
      let recipientEmails: string[] = []
      const isTest = Array.isArray(testRecipients) && testRecipients.length > 0

      if (isTest) {
        recipientEmails = testRecipients
      } else {
        const { data: subscribers, error: subError } = await supabase
          .from('subscribers')
          .select('email')
          .eq('status', 'active')

        if (subError) throw subError
        recipientEmails = (subscribers || []).map((s: { email: string }) => s.email)
      }

      let enqueued = 0
      let failed = 0

      for (const email of recipientEmails) {
        // Skip suppression check for test emails
        if (!isTest) {
          const { data: suppressed } = await supabase
            .from('suppressed_emails')
            .select('id')
            .eq('email', email)
            .maybeSingle()

          if (suppressed) continue
        }

        // Generate unsubscribe token
        const token = crypto.randomUUID()
        await supabase.from('email_unsubscribe_tokens').insert({ email, token })
        const unsubscribeUrl = `https://pastlives.site/unsubscribe?token=${token}`

        const html = render(
          NewEssayEmail({
            siteUrl: 'https://pastlives.site',
            essayTitle,
            essaySubtitle,
            essayHook,
            essayUrl,
            essayImageUrl,
            unsubscribeUrl,
          })
        )

        const plainText = `New essay: ${essayTitle}\n\n${essaySubtitle}\n\n"${essayHook}"\n\nRead the essay: ${essayUrl}\n\n— The editors, Epoch Lives`

        const result = await enqueueEmail(supabase, {
          to: email,
          from: 'Epoch Lives <notify@notify.pastlives.site>',
          senderDomain: 'notify.pastlives.site',
          subject: isTest ? `[TEST] New essay: ${essayTitle}` : `New essay: ${essayTitle}`,
          html,
          text: plainText,
          label: isTest ? 'new-essay-test' : 'new-essay',
          unsubscribeToken: token,
        })

        if (result.success) enqueued++
        else failed++
      }

      return new Response(
        JSON.stringify({ success: true, enqueued, failed, test: isTest }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: `Unknown template: ${template}` }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Transactional email error:', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
