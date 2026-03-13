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
    <Head />
    <Preview>Your sign-in link for Epoch Lives</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brandMark}>EPOCH LIVES</Text>
        <Hr style={divider} />
        <Heading style={h1}>Your sign-in link</Heading>
        <Text style={text}>
          Click the button below to sign in to Epoch Lives. This link will expire shortly.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Sign In
        </Button>
        <Text style={footer}>
          If you didn't request this link, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }
const container = { padding: '40px 32px', maxWidth: '480px', margin: '0 auto' }
const brandMark = { fontSize: '11px', fontWeight: 700 as const, letterSpacing: '0.2em', color: '#D4A933', margin: '0 0 16px' }
const divider = { borderColor: '#E8E0D0', margin: '0 0 32px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#1A1D24', margin: '0 0 20px', fontFamily: "'Georgia', 'Cambria', serif" }
const text = { fontSize: '15px', color: '#4A4E57', lineHeight: '1.6', margin: '0 0 20px' }
const button = { backgroundColor: '#D4A933', color: '#0F1219', fontSize: '14px', fontWeight: 600 as const, borderRadius: '8px', padding: '14px 28px', textDecoration: 'none', letterSpacing: '0.04em' }
const footer = { fontSize: '12px', color: '#9CA3AF', margin: '32px 0 0', lineHeight: '1.5' }
