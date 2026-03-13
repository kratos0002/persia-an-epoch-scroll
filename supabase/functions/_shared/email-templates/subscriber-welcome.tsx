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
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SubscriberWelcomeProps {
  siteUrl: string
  unsubscribeUrl?: string
}

export const SubscriberWelcomeEmail = ({
  siteUrl = 'https://pastlives.site',
  unsubscribeUrl,
}: SubscriberWelcomeProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
      `}</style>
    </Head>
    <Preview>Welcome to Epoch Lives — history's turning points, felt</Preview>
    <Body style={body}>
      <Container style={outerContainer}>
        <Section style={goldBar} />

        <Container style={innerContainer}>
          <Text style={brandMark}>✦ &nbsp; EPOCH LIVES &nbsp; ✦</Text>
          <Text style={brandTagline}>Turning points in history, felt — not summarized</Text>
          <Hr style={goldDivider} />

          <Heading style={h1}>You're in.</Heading>

          <Text style={textStyle}>
            We build visual essays — immersive, map-rich, source-driven stories about the moments
            that turned the world. Persia. Napoleon. The House of Wisdom. The end of the Samurai.
          </Text>

          <Text style={textStyle}>
            No schedule. No spam. When history demands it, we'll write — and you'll be the first to know.
          </Text>

          <Section style={essayPreview}>
            <Text style={essayLabel}>START WITH A FAVOURITE</Text>
            <Hr style={essayDivider} />
            <Link href={`${siteUrl}/persia`} style={essayLink}>
              <Text style={essayTitle}>The Immortal Empire</Text>
              <Text style={essaySubtitle}>2,500 years of Persia — from Cyrus to Khomeini</Text>
            </Link>
            <Hr style={essayDivider} />
            <Link href={`${siteUrl}/wisdom`} style={essayLink}>
              <Text style={essayTitle}>The Library That Lit the World</Text>
              <Text style={essaySubtitle}>The House of Wisdom — 400 years of collected knowledge</Text>
            </Link>
            <Hr style={essayDivider} />
            <Link href={`${siteUrl}/nuclear`} style={essayLink}>
              <Text style={essayTitle}>The Chain Reaction</Text>
              <Text style={essaySubtitle}>How nine countries built the bomb</Text>
            </Link>
          </Section>

          <Section style={ctaSection}>
            <Button style={ctaButton} href={siteUrl}>
              Explore All Essays
            </Button>
          </Section>

          <Hr style={subtleDivider} />

          <Text style={signoff}>— The editors of Epoch Lives</Text>

          {unsubscribeUrl && (
            <Text style={unsubText}>
              <Link href={unsubscribeUrl} style={unsubLink}>Unsubscribe</Link>
            </Text>
          )}
        </Container>

        <Section style={goldBar} />
      </Container>
    </Body>
  </Html>
)

export default SubscriberWelcomeEmail

const body = { backgroundColor: '#F5F0E8', fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif", margin: '0', padding: '40px 0' }
const outerContainer = { maxWidth: '520px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '2px', overflow: 'hidden' as const, border: '1px solid #E8DFD0' }
const goldBar = { backgroundColor: '#D4A933', height: '4px', width: '100%' }
const innerContainer = { padding: '48px 40px 40px' }
const brandMark = { fontSize: '13px', fontWeight: 700 as const, letterSpacing: '0.25em', color: '#D4A933', textAlign: 'center' as const, margin: '0 0 6px' }
const brandTagline = { fontSize: '12px', color: '#9A8E7A', textAlign: 'center' as const, letterSpacing: '0.08em', margin: '0 0 24px', fontStyle: 'italic' as const }
const goldDivider = { borderColor: '#D4A933', borderWidth: '1px', margin: '0 0 32px', opacity: 0.3 }
const h1 = { fontSize: '32px', fontWeight: 600 as const, color: '#1A1510', margin: '0 0 24px', fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: '1.1' }
const textStyle = { fontSize: '16px', color: '#4A4035', lineHeight: '1.7', margin: '0 0 16px' }

const essayPreview = { margin: '32px 0', padding: '24px', backgroundColor: '#1A1510', borderRadius: '4px' }
const essayLabel = { fontSize: '10px', fontWeight: 700 as const, letterSpacing: '0.25em', color: '#D4A933', margin: '0 0 12px', textAlign: 'center' as const }
const essayDivider = { borderColor: '#2A2520', margin: '12px 0' }
const essayLink = { textDecoration: 'none' }
const essayTitle = { fontSize: '17px', fontWeight: 600 as const, color: '#E8DFD0', margin: '0 0 2px', fontFamily: "'Cormorant Garamond', Georgia, serif" }
const essaySubtitle = { fontSize: '13px', color: '#8A7E6E', margin: '0', fontStyle: 'italic' as const }

const ctaSection = { textAlign: 'center' as const, margin: '32px 0 24px' }
const ctaButton = { backgroundColor: '#D4A933', color: '#1A1510', fontSize: '13px', fontWeight: 600 as const, borderRadius: '4px', padding: '14px 36px', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const subtleDivider = { borderColor: '#E8DFD0', margin: '24px 0 20px' }
const signoff = { fontSize: '14px', color: '#6B5E4E', fontStyle: 'italic' as const, margin: '0 0 16px' }
const unsubText = { fontSize: '11px', color: '#B0A898', margin: '0', textAlign: 'center' as const }
const unsubLink = { color: '#B0A898', textDecoration: 'underline' }
