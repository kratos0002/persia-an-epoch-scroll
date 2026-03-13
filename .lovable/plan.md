

# Mobile "Best on Desktop" Notice

Add a dismissible banner that appears on essay pages when viewed on mobile, suggesting desktop for the best experience.

## Approach
- Create a small `MobileNotice` component that uses `useIsMobile()` and `localStorage` to show once per session
- Renders a bottom toast-style banner with a dismiss button
- Import it in each essay page (or just in the essay pages that have heavy visuals)

## Component: `src/components/site/MobileNotice.tsx`
- Uses `useIsMobile()` hook
- Checks `sessionStorage` for `mobile-notice-dismissed`
- Shows a fixed bottom banner: "This essay is best experienced on desktop" with an ✕ close button
- Auto-dismisses after 8 seconds or on tap
- Styled to match the dark essay aesthetic (semi-transparent dark bg, subtle border)

## Integration
- Import `<MobileNotice />` into each essay page component (Nuclear, Napoleon, Rebellion, etc.) — or add it once in a shared layout wrapper used by all essays

