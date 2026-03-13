import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CRAWLER_UA =
  /Twitterbot|facebookexternalhit|LinkedInBot|WhatsApp|Slackbot|Discordbot|TelegramBot|Googlebot|bingbot|Applebot|Pinterest|Embedly|Quora|Showyou|OutbrainBot|W3C_Validator/i;

const SITE_URL = "https://pastlives.site";
const SITE_TITLE = "Epoch Lives — Turning points in history, felt";
const SITE_DESC =
  "Visual essays on the turning points of civilizations. Immersive scrollytelling with maps, data, and primary sources.";
const SITE_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a1d18bd5-5022-4f58-bfaa-ddf86f5cf162/id-preview-d28c64ec--379849b8-e25a-40db-9b86-56b603dda73d.lovable.app-1773255702732.png";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const storyId = url.searchParams.get("story");
  const ua = req.headers.get("user-agent") || "";
  const isCrawler = CRAWLER_UA.test(ua);

  // Determine target page URL
  const targetPath = storyId ? `/${storyId}` : "/";
  const targetUrl = `${SITE_URL}${targetPath}`;

  // Default OG values
  let ogTitle = SITE_TITLE;
  let ogDesc = SITE_DESC;
  let ogImage = SITE_IMAGE;
  let ogUrl = SITE_URL;

  if (storyId) {
    ogUrl = `${SITE_URL}/${storyId}`;

    // Try to fetch custom OG data from database
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!
      );

      const { data } = await supabase
        .from("story_og")
        .select("og_title, og_description, og_image_url")
        .eq("story_id", storyId)
        .maybeSingle();

      if (data) {
        if (data.og_title) ogTitle = data.og_title;
        if (data.og_description) ogDesc = data.og_description;
        if (data.og_image_url) ogImage = data.og_image_url;
      }
    } catch {
      // Fall through to defaults
    }
  }

  // For crawlers: serve HTML with OG tags
  // For humans: redirect to the real page
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(ogTitle)}</title>
  <meta name="description" content="${escapeHtml(ogDesc)}" />

  <meta property="og:type" content="article" />
  <meta property="og:url" content="${escapeHtml(ogUrl)}" />
  <meta property="og:title" content="${escapeHtml(ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(ogDesc)}" />
  <meta property="og:image" content="${escapeHtml(ogImage)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@EpochLives" />
  <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(ogDesc)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}" />

  ${!isCrawler ? `<meta http-equiv="refresh" content="0;url=${escapeHtml(targetUrl)}" />` : ""}
</head>
<body>
  ${!isCrawler ? `<p>Redirecting to <a href="${escapeHtml(targetUrl)}">${escapeHtml(ogTitle)}</a>…</p>` : `<h1>${escapeHtml(ogTitle)}</h1><p>${escapeHtml(ogDesc)}</p>`}
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
