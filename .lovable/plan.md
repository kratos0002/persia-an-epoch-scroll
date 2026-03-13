

## OG Images & Social Sharing for a React SPA

### The Problem
React SPAs render meta tags client-side, but social crawlers (Twitter, Facebook, LinkedIn, iMessage) don't execute JavaScript. They see a blank page with generic meta tags from `index.html`.

### The Solution: Edge Function OG Proxy + Admin Image Manager

A backend function that intercepts social crawler requests and serves a minimal HTML page with the correct OG tags per essay. Normal users get redirected to the real page. Combined with an admin panel for managing OG images and metadata per story.

```text
┌─────────────────────────────────────────────┐
│  Social share link:                         │
│  https://pastlives.site/share/napoleon      │
│                                             │
│  Crawler?  → Edge fn serves HTML with       │
│              OG title, description, image   │
│                                             │
│  Human?    → JS redirect to /napoleon       │
└─────────────────────────────────────────────┘
```

### Architecture

**1. Database: `story_og` table**
- `story_id` (text, PK) — matches essay IDs
- `og_title`, `og_description` (text) — custom OG text
- `og_image_url` (text) — URL to the uploaded OG image
- `updated_by` (uuid), `updated_at` (timestamptz)
- RLS: admins write, anyone reads

**2. Storage bucket: `og-images`**
- Public bucket for OG images (crawlers must access without auth)
- Admin-only upload policy

**3. Edge function: `og-share`**
- Route: `/functions/v1/og-share?story=napoleon`
- Detects crawler user agents (Twitterbot, facebookexternalhit, LinkedInBot, WhatsApp, etc.)
- Serves minimal HTML with proper `<meta property="og:...">` tags
- For humans, serves an instant `<meta http-equiv="refresh">` redirect to the real page
- Falls back to site-level OG data for unknown story IDs

**4. Admin panel extension**
- New "Social Sharing" tab on `/admin`
- Per essay: upload OG image, set custom title & description
- Image preview showing how it will look when shared
- One-click copy of the shareable URL per essay
- Option to generate an OG image via AI (using the image generation model) with a prompt like "Create a dramatic, cinematic OG image for an essay about Napoleon"

**5. Static fallback in `index.html`**
- Keep the existing generic OG tags as fallback for the homepage
- Update them to use the site-level OG image (manageable from admin)

### Implementation Steps

1. Create `story_og` table + RLS policies via migration
2. Create `og-images` public storage bucket via migration
3. Build the `og-share` edge function
4. Extend `Admin.tsx` with a social sharing management section per essay (upload image, edit title/description, copy share URL)
5. Add AI image generation option in the admin panel (calls the image model, uploads result to storage)

### Sharing Workflow for You (Admin)

1. Go to `/admin` → Social Sharing tab
2. For each essay: write a compelling OG title + description, upload or AI-generate an image
3. Copy the share URL (e.g., `https://pastlives.site/share/napoleon`)
4. Use that URL when sharing on Twitter/LinkedIn/etc. — crawlers see the rich preview, humans land on the essay

### Technical Notes
- OG images should be 1200x630px for optimal display across platforms
- The edge function approach works regardless of hosting — no server-side rendering needed
- The `/share/:storyId` route will be added to the React app to handle the redirect client-side as a fallback

