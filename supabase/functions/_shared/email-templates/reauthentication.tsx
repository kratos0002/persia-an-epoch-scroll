/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
      `}</style>
    </Head>
    <Preview>Your verification code for Epoch Lives</Preview>
    <Body style={body}>
      <Container style={outerContainer}>
        <Section style={goldBar} />
        <Container style={innerContainer}>
          <Text style={brandMark}>✦ &nbsp; EPOCH LIVES &nbsp; ✦</Text>
          <Hr style={goldDivider} />

          <Heading style={h1}>Verification code</Heading>
          <Text style={textStyle}>Use the code below to confirm your identity:</Text>

          <Section style={codeContainer}>
            <Text style={codeStyle}>{token}</Text>
          </Section>

          <Hr style={subtleDivider} />
          <Text style={footerText}>
            This code will expire shortly. If you didn't request this, you can safely ignore this email.
          </Text>
        </Container>
        <Section style={goldBar} />
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const body = { backgroundColor: '#F5F0E8', fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif", margin: '0', padding: '40px 0' }
const outerContainer = { maxWidth: '520px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '2px', overflow: 'hidden' as const, border: '1px solid #E8DFD0' }
const goldBar = { backgroundColor: '#D4A933', height: '4px', width: '100%' }
const innerContainer = { padding: '48px 40px 40px' }
const brandMark = { fontSize: '13px', fontWeight: 700 as const, letterSpacing: '0.25em', color: '#D4A933', textAlign: 'center' as const, margin: '0 0 20px' }
const goldDivider = { borderColor: '#D4A933', borderWidth: '1px', margin: '0 0 32px', opacity: 0.3 }
const h1 = { fontSize: '28px', fontWeight: 600 as const, color: '#1A1510', margin: '0 0 24px', fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: '1.2' }
const textStyle = { fontSize: '16px', color: '#4A4035', lineHeight: '1.7', margin: '0 0 16px' }
const codeContainer = { textAlign: 'center' as const, margin: '24px 0 32px', padding: '20px', backgroundColor: '#1A1510', borderRadius: '4px' }
const codeStyle = { fontFamily: "'Courier New', Courier, monospace", fontSize: '32px', fontWeight: 'bold' as const, color: '#D4A933', letterSpacing: '0.3em', margin: '0' }
const subtleDivider = { borderColor: '#E8DFD0', margin: '32px 0 24px' }
const footerText = { fontSize: '13px', color: '#9A8E7A', lineHeight: '1.5', margin: '0' }
