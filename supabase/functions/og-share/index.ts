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

const STORY_DEFAULTS: Record<string, { title: string; desc: string }> = {
  persia: { title: "The Immortal Empire — 2,500 Years of Persia", desc: "From Cyrus the Great to the Islamic Revolution. The empire that was conquered, fractured, and reborn — again and again." },
  wisdom: { title: "The Library That Lit the World", desc: "Baghdad's House of Wisdom sparked a golden age that shaped modern science, mathematics, and medicine. Then the Mongols came." },
  buddhism: { title: "The Path That Split — How Buddhism Fractured", desc: "One man's awakening became a world religion — then fractured into competing visions of enlightenment." },
  samurai: { title: "How Japan Killed the Samurai — With Pension Bonds", desc: "The warrior class that ruled Japan for 700 years was dismantled not by war, but by bureaucratic precision." },
  "1857": { title: "The Signal and the Fire — India's First Rebellion", desc: "A greased cartridge ignited India's first war of independence. The British Empire was never the same." },
  napoleon: { title: "The Rise and Fall of Napoleon Bonaparte", desc: "From artillery officer to Emperor of Europe — and the catastrophic hubris that brought it all down." },
  constantinople: { title: "Constantinople — The City That Was the World's Hinge", desc: "Seven names, three empires, one strait. The city that controlled the flow of history for 1,600 years." },
  "india-states": { title: "The Mosaic Republic — How 565 States Became India", desc: "The greatest political integration in modern history. 565 princely states unified into one nation in under two years." },
  "mongol-india": { title: "The Wall That Held — Why the Mongols Failed in India", desc: "The Mongols conquered everything from China to Hungary. India stopped them cold." },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const storyId = url.searchParams.get("story");
  const ua = req.headers.get("user-agent") || "";
  const isCrawler = CRAWLER_UA.test(ua);

  const targetPath = storyId ? `/${storyId}` : "/";
  const targetUrl = `${SITE_URL}${targetPath}`;

  // For humans: just 302 redirect (bypasses CSP sandbox)
  if (!isCrawler) {
    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: targetUrl },
    });
  }

  // For crawlers: serve OG meta tags
  let ogTitle = SITE_TITLE;
  let ogDesc = SITE_DESC;
  let ogImage = SITE_IMAGE;
  let ogUrl = SITE_URL;

  if (storyId) {
    ogUrl = `${SITE_URL}/${storyId}`;
    const defaults = STORY_DEFAULTS[storyId];
    if (defaults) {
      ogTitle = defaults.title;
      ogDesc = defaults.desc;
    }

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

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${esc(ogTitle)}</title>
  <meta name="description" content="${esc(ogDesc)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${esc(ogUrl)}" />
  <meta property="og:title" content="${esc(ogTitle)}" />
  <meta property="og:description" content="${esc(ogDesc)}" />
  <meta property="og:image" content="${esc(ogImage)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@EpochLives" />
  <meta name="twitter:title" content="${esc(ogTitle)}" />
  <meta name="twitter:description" content="${esc(ogDesc)}" />
  <meta name="twitter:image" content="${esc(ogImage)}" />
</head>
<body>
  <h1>${esc(ogTitle)}</h1>
  <p>${esc(ogDesc)}</p>
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

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
