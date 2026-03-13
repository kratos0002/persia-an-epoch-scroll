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
        <Section style={goldBar} />

        <Container style={innerContainer}>
          <Text style={brandMark}>✦ &nbsp; EPOCH LIVES &nbsp; ✦</Text>
          <Hr style={goldDivider} />

          <Text style={newLabel}>NEW ESSAY</Text>

          {essayImageUrl && (
            <Section style={imageSection}>
              <Img
                src={essayImageUrl}
                alt={essayTitle}
                width="440"
                style={heroImage}
              />
            </Section>
          )}

          <Heading style={h1}>{essayTitle}</Heading>
          <Text style={subtitle}>{essaySubtitle}</Text>

          <Hr style={contentDivider} />

          <Text style={hookText}>"{essayHook}"</Text>

          <Section style={ctaSection}>
            <Button style={ctaButton} href={essayUrl}>
              Read the Essay
            </Button>
          </Section>

          <Hr style={subtleDivider} />

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

        <Section style={goldBar} />
      </Container>
    </Body>
  </Html>
)

export default NewEssayEmail

const body = { backgroundColor: '#F5F0E8', fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif", margin: '0', padding: '40px 0' }
const outerContainer = { maxWidth: '520px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '2px', overflow: 'hidden' as const, border: '1px solid #E8DFD0' }
const goldBar = { backgroundColor: '#D4A933', height: '4px', width: '100%' }
const innerContainer = { padding: '48px 40px 40px' }
const brandMark = { fontSize: '13px', fontWeight: 700 as const, letterSpacing: '0.25em', color: '#D4A933', textAlign: 'center' as const, margin: '0 0 20px' }
const goldDivider = { borderColor: '#D4A933', borderWidth: '1px', margin: '0 0 28px', opacity: 0.3 }

const newLabel = { fontSize: '10px', fontWeight: 700 as const, letterSpacing: '0.3em', color: '#D4A933', margin: '0 0 20px', textAlign: 'center' as const, backgroundColor: '#1A1510', padding: '8px 0', borderRadius: '2px' }

const imageSection = { margin: '0 0 28px', textAlign: 'center' as const }
const heroImage = { width: '100%', height: 'auto', borderRadius: '2px', display: 'block' as const }

const h1 = { fontSize: '30px', fontWeight: 700 as const, color: '#1A1510', margin: '0 0 8px', fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: '1.15', textAlign: 'center' as const }
const subtitle = { fontSize: '15px', color: '#8A7E6E', margin: '0 0 20px', fontStyle: 'italic' as const, textAlign: 'center' as const }

const contentDivider = { borderColor: '#E8DFD0', margin: '0 0 24px' }

const hookText = { fontSize: '17px', color: '#4A4035', lineHeight: '1.7', margin: '0 0 8px', fontStyle: 'italic' as const, borderLeft: '3px solid #D4A933', paddingLeft: '16px' }

const goldLink = { color: '#B8922A', textDecoration: 'underline' }
const ctaSection = { textAlign: 'center' as const, margin: '32px 0 24px' }
const ctaButton = { backgroundColor: '#1A1510', color: '#D4A933', fontSize: '13px', fontWeight: 600 as const, borderRadius: '4px', padding: '16px 44px', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase' as const }
const subtleDivider = { borderColor: '#E8DFD0', margin: '24px 0 20px' }
const footerNote = { fontSize: '13px', color: '#9A8E7A', lineHeight: '1.5', margin: '0 0 12px' }
const signoff = { fontSize: '14px', color: '#6B5E4E', fontStyle: 'italic' as const, margin: '0 0 16px' }
const unsubText = { fontSize: '11px', color: '#B0A898', margin: '0', textAlign: 'center' as const }
const unsubLink = { color: '#B0A898', textDecoration: 'underline' }
