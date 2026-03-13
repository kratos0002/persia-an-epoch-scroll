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
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  siteName,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
      `}</style>
    </Head>
    <Preview>Your sign-in link for Epoch Lives</Preview>
    <Body style={body}>
      <Container style={outerContainer}>
        <Section style={goldBar} />
        <Container style={innerContainer}>
          <Text style={brandMark}>✦ &nbsp; EPOCH LIVES &nbsp; ✦</Text>
          <Hr style={goldDivider} />

          <Heading style={h1}>Your sign-in link</Heading>
          <Text style={textStyle}>
            Click below to sign in to Epoch Lives. This link will expire shortly — like empires do.
          </Text>

          <Section style={ctaSection}>
            <Button style={ctaButton} href={confirmationUrl}>
              Sign In
            </Button>
          </Section>

          <Hr style={subtleDivider} />
          <Text style={footerText}>
            If you didn't request this link, you can safely ignore this email.
          </Text>
        </Container>
        <Section style={goldBar} />
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const body = { backgroundColor: '#F5F0E8', fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif", margin: '0', padding: '40px 0' }
const outerContainer = { maxWidth: '520px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '2px', overflow: 'hidden' as const, border: '1px solid #E8DFD0' }
const goldBar = { backgroundColor: '#D4A933', height: '4px', width: '100%' }
const innerContainer = { padding: '48px 40px 40px' }
const brandMark = { fontSize: '13px', fontWeight: 700 as const, letterSpacing: '0.25em', color: '#D4A933', textAlign: 'center' as const, margin: '0 0 20px' }
const goldDivider = { borderColor: '#D4A933', borderWidth: '1px', margin: '0 0 32px', opacity: 0.3 }
const h1 = { fontSize: '28px', fontWeight: 600 as const, color: '#1A1510', margin: '0 0 24px', fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: '1.2' }
const textStyle = { fontSize: '16px', color: '#4A4035', lineHeight: '1.7', margin: '0 0 16px' }
const ctaSection = { textAlign: 'center' as const, margin: '32px 0' }
const ctaButton = { backgroundColor: '#1A1510', color: '#D4A933', fontSize: '13px', fontWeight: 600 as const, borderRadius: '4px', padding: '16px 40px', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase' as const }
const subtleDivider = { borderColor: '#E8DFD0', margin: '32px 0 24px' }
const footerText = { fontSize: '13px', color: '#9A8E7A', lineHeight: '1.5', margin: '0' }
