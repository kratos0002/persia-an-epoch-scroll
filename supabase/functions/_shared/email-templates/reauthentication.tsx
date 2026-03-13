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
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your verification code for Epoch Lives</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brandMark}>EPOCH LIVES</Text>
        <Hr style={divider} />
        <Heading style={h1}>Verification code</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          This code will expire shortly. If you didn't request this, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }
const container = { padding: '40px 32px', maxWidth: '480px', margin: '0 auto' }
const brandMark = { fontSize: '11px', fontWeight: 700 as const, letterSpacing: '0.2em', color: '#D4A933', margin: '0 0 16px' }
const divider = { borderColor: '#E8E0D0', margin: '0 0 32px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#1A1D24', margin: '0 0 20px', fontFamily: "'Georgia', 'Cambria', serif" }
const text = { fontSize: '15px', color: '#4A4E57', lineHeight: '1.6', margin: '0 0 20px' }
const codeStyle = { fontFamily: "'Courier New', Courier, monospace", fontSize: '28px', fontWeight: 'bold' as const, color: '#D4A933', letterSpacing: '0.15em', margin: '0 0 32px' }
const footer = { fontSize: '12px', color: '#9CA3AF', margin: '32px 0 0', lineHeight: '1.5' }
