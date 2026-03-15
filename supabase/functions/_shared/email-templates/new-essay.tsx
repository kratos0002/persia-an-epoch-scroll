/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface NewEssayEmailProps {
  siteUrl: string
  essayTitle: string
  essaySubtitle: string
  essayHook: string
  essayUrl: string
  essayImageUrl?: string
  unsubscribeUrl?: string
}

export const NewEssayEmail = ({
  siteUrl = 'https://pastlives.site',
  essayTitle,
  essaySubtitle,
  essayHook,
  essayUrl,
  essayImageUrl,
  unsubscribeUrl,
}: NewEssayEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
      `}</style>
    </Head>
    <Preview>New essay: {essayTitle} — {essaySubtitle}</Preview>
    <Body style={body}>
      <Container style={outerContainer}>
        {/* Top gold bar */}
        <Section style={goldBar} />

        <Container style={innerContainer}>
          {/* Brand mark */}
          <Text style={brandMark}>✦ &nbsp; EPOCH LIVES &nbsp; ✦</Text>
          <Text style={tagline}>turning points, felt</Text>

          {/* Hero image with gradient overlay */}
          {essayImageUrl && (
            <Section style={imageWrapper}>
              <Img
                src={essayImageUrl}
                alt={essayTitle}
                width="520"
                style={heroImage}
              />
            </Section>
          )}

          {/* New essay ornamental label */}
          <Text style={newLabel}>── &nbsp; NEW ESSAY &nbsp; ──</Text>

          {/* Title */}
          <Heading style={h1}>{essayTitle}</Heading>
          <Text style={subtitle}>{essaySubtitle}</Text>

          {/* Thin gold divider */}
          <Hr style={goldDividerThin} />

          {/* Hook quote */}
          <Section style={hookSection}>
            <Text style={hookText}>"{essayHook}"</Text>
          </Section>

          {/* CTA button */}
          <Section style={ctaSection}>
            <Button style={ctaButton} href={essayUrl}>
              Read the Essay →
            </Button>
          </Section>

          {/* Footer divider */}
          <Hr style={footerDivider} />

          <Text style={footerNote}>
            You're receiving this because you subscribed to{' '}
            <Link href={siteUrl} style={goldLink}>Epoch Lives</Link>.
            No schedule — just history.
          </Text>

          <Text style={signoff}>— The editors</Text>

          {unsubscribeUrl && (
            <Text style={unsubText}>
              <Link href={unsubscribeUrl} style={unsubLink}>Unsubscribe</Link>
            </Text>
          )}
        </Container>

        {/* Bottom gold bar */}
        <Section style={goldBar} />
      </Container>
    </Body>
  </Html>
)

export default NewEssayEmail

/* ═══════════════════════════════════
   STYLES — Dark cinematic theme
   ═══════════════════════════════════ */

const body = {
  backgroundColor: '#0F0D0A',
  fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  margin: '0',
  padding: '40px 0',
}

const outerContainer = {
  maxWidth: '520px',
  margin: '0 auto',
  backgroundColor: '#1A1510',
  borderRadius: '2px',
  overflow: 'hidden' as const,
  border: '1px solid #2A2318',
}

const goldBar = {
  backgroundColor: '#D4A933',
  height: '4px',
  width: '100%',
}

const innerContainer = {
  padding: '40px 40px 36px',
}

const brandMark = {
  fontSize: '13px',
  fontWeight: 700 as const,
  letterSpacing: '0.25em',
  color: '#D4A933',
  textAlign: 'center' as const,
  margin: '0 0 4px',
}

const tagline = {
  fontSize: '12px',
  color: '#6B5E4E',
  textAlign: 'center' as const,
  fontStyle: 'italic' as const,
  letterSpacing: '0.08em',
  margin: '0 0 28px',
}

const imageWrapper = {
  margin: '0 -40px 24px',
  textAlign: 'center' as const,
}

const heroImage = {
  width: '100%',
  height: 'auto',
  display: 'block' as const,
}

const newLabel = {
  fontSize: '11px',
  fontWeight: 600 as const,
  letterSpacing: '0.3em',
  color: '#D4A933',
  textAlign: 'center' as const,
  margin: '0 0 16px',
}

const h1 = {
  fontSize: '34px',
  fontWeight: 700 as const,
  color: '#D4A933',
  margin: '0 0 8px',
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  lineHeight: '1.1',
  textAlign: 'center' as const,
}

const subtitle = {
  fontSize: '16px',
  color: '#C4B8A0',
  margin: '0 0 24px',
  fontStyle: 'italic' as const,
  textAlign: 'center' as const,
  lineHeight: '1.5',
}

const goldDividerThin = {
  borderColor: '#D4A933',
  borderWidth: '1px',
  margin: '0 60px 24px',
  opacity: 0.25,
}

const hookSection = {
  margin: '0 0 8px',
}

const hookText = {
  fontSize: '18px',
  color: '#E8DFD0',
  lineHeight: '1.7',
  margin: '0',
  fontStyle: 'italic' as const,
  borderLeft: '3px solid #D4A933',
  paddingLeft: '16px',
  fontFamily: "'Cormorant Garamond', Georgia, serif",
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0 28px',
}

const ctaButton = {
  backgroundColor: '#D4A933',
  color: '#1A1510',
  fontSize: '13px',
  fontWeight: 700 as const,
  borderRadius: '4px',
  padding: '16px 44px',
  textDecoration: 'none',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  fontFamily: "'Cormorant Garamond', Georgia, serif",
}

const footerDivider = {
  borderColor: '#D4A933',
  borderWidth: '1px',
  margin: '0 0 20px',
  opacity: 0.15,
}

const goldLink = {
  color: '#D4A933',
  textDecoration: 'underline',
}

const footerNote = {
  fontSize: '13px',
  color: '#6B5E4E',
  lineHeight: '1.6',
  margin: '0 0 12px',
}

const signoff = {
  fontSize: '14px',
  color: '#8A7E6E',
  fontStyle: 'italic' as const,
  margin: '0 0 16px',
}

const unsubText = {
  fontSize: '11px',
  color: '#4A4035',
  margin: '0',
  textAlign: 'center' as const,
}

const unsubLink = {
  color: '#4A4035',
  textDecoration: 'underline',
}
