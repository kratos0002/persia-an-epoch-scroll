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

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
      `}</style>
    </Head>
    <Preview>Reset your password for Epoch Lives</Preview>
    <Body style={body}>
      <Container style={outerContainer}>
        <Section style={goldBar} />
        <Container style={innerContainer}>
          <Text style={brandMark}>✦ &nbsp; EPOCH LIVES &nbsp; ✦</Text>
          <Hr style={goldDivider} />

          <Heading style={h1}>Reset your password</Heading>
          <Text style={textStyle}>
            We received a request to reset your password for Epoch Lives. Click the button below to choose a new one.
          </Text>

          <Section style={ctaSection}>
            <Button style={ctaButton} href={confirmationUrl}>
              Reset Password
            </Button>
          </Section>

          <Hr style={subtleDivider} />
          <Text style={footerText}>
            If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
          </Text>
        </Container>
        <Section style={goldBar} />
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

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
