import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import storyPersia from '@/assets/story-persia.jpg';
import storyWisdom from '@/assets/story-wisdom.jpg';
import storyBuddhism from '@/assets/story-buddhism.jpg';
import storySamurai from '@/assets/story-samurai.jpg';
import story1857 from '@/assets/story-1857.jpg';
import storyNapoleon from '@/assets/story-napoleon.jpg';
import storyConstantinople from '@/assets/story-constantinople.jpg';
import storyIndia from '@/assets/story-india.jpg';
import storyMongol from '@/assets/story-mongol.jpg';

/* ── Story Data ──────────────────────────────── */

interface StoryPreviewData {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  image: string;
  color: string;
  bgRgb: string; // rgb for canvas
  colorRgb: string; // rgb for canvas
  era: string;
  href: string;
  motif: string;
}

const PREVIEWS: Record<string, StoryPreviewData> = {
  persia: {
    id: 'persia', title: 'The Immortal Empire', subtitle: 'THE HISTORY OF PERSIA',
    hook: '2,500 years. One civilization.',
    image: storyPersia, color: 'hsl(43, 85%, 55%)', bgRgb: '22, 18, 14', colorRgb: '217, 176, 50',
    era: '550 BCE', href: '/persia',
    motif: 'From Cyrus to the present — the empire that never truly fell',
  },
  wisdom: {
    id: 'wisdom', title: 'The Library That Lit the World', subtitle: 'THE HOUSE OF WISDOM',
    hook: 'One building. All of human knowledge.',
    image: storyWisdom, color: 'hsl(170, 40%, 38%)', bgRgb: '12, 18, 18', colorRgb: '58, 136, 120',
    era: '762 CE', href: '/wisdom',
    motif: 'Baghdad preserved what the world forgot',
  },
  buddhism: {
    id: 'buddhism', title: 'The Path That Split', subtitle: 'THE SPREAD OF BUDDHISM',
    hook: 'One teaching. A thousand forms.',
    image: storyBuddhism, color: 'hsl(30, 65%, 45%)', bgRgb: '20, 15, 12', colorRgb: '189, 126, 40',
    era: '528 BCE', href: '/buddhism',
    motif: 'From a tree in India to every corner of Asia',
  },
  samurai: {
    id: 'samurai', title: 'The Death of a Class', subtitle: 'THE END OF THE SAMURAI',
    hook: 'Destroyed not by war — by accounting.',
    image: storySamurai, color: 'hsl(5, 75%, 50%)', bgRgb: '20, 14, 14', colorRgb: '204, 50, 40',
    era: '1603', href: '/samurai',
    motif: 'The ledger was mightier than the sword',
  },
  '1857': {
    id: '1857', title: 'The Signal and the Fire', subtitle: 'THE 1857 REBELLION',
    hook: 'Two signals. One nation.',
    image: story1857, color: 'hsl(30, 85%, 50%)', bgRgb: '20, 16, 12', colorRgb: '230, 140, 20',
    era: '1857', href: '/1857',
    motif: 'Electricity versus fury — the race across India',
  },
  napoleon: {
    id: 'napoleon', title: 'The Rise and Fall of Napoleon', subtitle: 'REVOLUTION TO LEGACY',
    hook: 'He reorganized Europe. Then it closed in.',
    image: storyNapoleon, color: 'hsl(220, 65%, 45%)', bgRgb: '12, 14, 22', colorRgb: '50, 90, 180',
    era: '1789', href: '/napoleon',
    motif: "The emperor fell. The ideas didn't.",
  },
  constantinople: {
    id: 'constantinople', title: 'The City of Layers', subtitle: 'CONSTANTINOPLE',
    hook: '2,700 years. 25 meters of earth.',
    image: storyConstantinople, color: 'hsl(270, 45%, 40%)', bgRgb: '16, 12, 20', colorRgb: '120, 56, 148',
    era: '657 BCE', href: '/constantinople',
    motif: 'Each empire built on the bones of the last',
  },
  'india-states': {
    id: 'india-states', title: 'The Mosaic Republic', subtitle: 'HOW 565 BECAME 28',
    hook: '565 states. One republic.',
    image: storyIndia, color: 'hsl(40, 60%, 55%)', bgRgb: '14, 16, 22', colorRgb: '204, 168, 56',
    era: '1947', href: '/india-states',
    motif: 'The largest peaceful integration in history',
  },
  'mongol-india': {
    id: 'mongol-india', title: 'The World Conqueror', subtitle: 'THE MONGOL STORM',
    hook: 'He asked for trade. They sent back heads.',
    image: storyMongol, color: 'hsl(25, 70%, 50%)', bgRgb: '20, 16, 12', colorRgb: '210, 120, 38',
    era: '1206', href: '/mongol-india',
    motif: 'What followed reshaped every civilization',
  },
};

/* ── Easing ──────────────────────────────────── */

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

/* ── Canvas Animator ─────────────────────────── */

const W = 1200;
const H = 628;
const DURATION = 5.5; // seconds
const FPS = 30;

function drawFrame(
  ctx: CanvasRenderingContext2D,
  story: StoryPreviewData,
  img: HTMLImageElement,
  t: number, // 0 to DURATION
) {
  const [bgR, bgG, bgB] = story.bgRgb.split(',').map(Number);
  const [acR, acG, acB] = story.colorRgb.split(',').map(Number);

  // Clear
  ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
  ctx.fillRect(0, 0, W, H);

  // ── Phase timings ──
  const imgFadeIn = easeOutCubic(clamp01(t / 1.2));
  const imgScale = 1.12 - 0.12 * clamp01(t / DURATION); // Ken Burns
  const subtitleAlpha = easeOutCubic(clamp01((t - 0.5) / 0.6));
  const hookAlpha = easeOutCubic(clamp01((t - 2.0) / 0.8));
  const motifAlpha = easeOutCubic(clamp01((t - 2.8) / 0.8));
  const lineScale = easeOutCubic(clamp01((t - 3.2) / 0.8));
  const brandAlpha = easeOutCubic(clamp01((t - 3.5) / 0.6));
  const fadeOut = t > 4.8 ? easeInCubic(clamp01((t - 4.8) / 0.7)) : 0;

  // ── Image (centered top area with Ken Burns) ──
  const imgAreaW = 520;
  const imgAreaH = 292; // ~16:9
  const imgX = (W - imgAreaW) / 2;
  const imgY = 40;

  ctx.save();
  ctx.globalAlpha = imgFadeIn;
  ctx.beginPath();
  ctx.roundRect(imgX, imgY, imgAreaW, imgAreaH, 12);
  ctx.clip();

  // Draw image with scale from center
  const drawW = imgAreaW * imgScale;
  const drawH = imgAreaH * imgScale;
  const drawX = imgX + (imgAreaW - drawW) / 2;
  const drawY = imgY + (imgAreaH - drawH) / 2;

  // Darken/desaturate via compositing
  ctx.drawImage(img, drawX, drawY, drawW, drawH);

  // Darken overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(imgX, imgY, imgAreaW, imgAreaH);

  // Vignette
  const grad = ctx.createRadialGradient(
    imgX + imgAreaW / 2, imgY + imgAreaH / 2, imgAreaW * 0.25,
    imgX + imgAreaW / 2, imgY + imgAreaH / 2, imgAreaW * 0.6,
  );
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, `rgba(${bgR},${bgG},${bgB},0.7)`);
  ctx.fillStyle = grad;
  ctx.fillRect(imgX, imgY, imgAreaW, imgAreaH);

  ctx.restore();

  // ── Era badge (top-left of image) ──
  const eraAlpha = easeOutCubic(clamp01((t - 0.8) / 0.5));
  if (eraAlpha > 0) {
    ctx.globalAlpha = eraAlpha;
    ctx.font = '600 11px "Cormorant Garamond", serif';
    ctx.fillStyle = `rgba(${acR},${acG},${acB},0.8)`;
    const eraText = story.era;
    ctx.fillText(eraText, imgX + 16, imgY + 24);
    ctx.globalAlpha = 1;
  }

  // ── Subtitle ──
  const textCenterX = W / 2;
  let textY = imgY + imgAreaH + 40;

  ctx.globalAlpha = subtitleAlpha;
  ctx.font = '600 11px "Cormorant Garamond", serif';
  ctx.letterSpacing = '4px';
  ctx.fillStyle = `rgba(${acR},${acG},${acB},0.6)`;
  ctx.textAlign = 'center';
  ctx.fillText(story.subtitle, textCenterX, textY);
  ctx.letterSpacing = '0px';

  // ── Title (word by word) ──
  textY += 38;
  const words = story.title.split(' ');
  ctx.font = '900 42px "Playfair Display", serif';
  ctx.textAlign = 'center';

  // Measure total width for centering
  const wordWidths = words.map(w => ctx.measureText(w + ' ').width);
  const totalWidth = wordWidths.reduce((a, b) => a + b, 0) - ctx.measureText(' ').width;
  let wordX = textCenterX - totalWidth / 2;

  words.forEach((word, i) => {
    const wordT = clamp01((t - (1.0 + i * 0.1)) / 0.5);
    const wordAlpha = easeOutCubic(wordT);
    const wordSlide = 20 * (1 - easeOutCubic(wordT));

    const isAccent = i === 0 || i === words.length - 1;
    ctx.globalAlpha = wordAlpha;
    ctx.fillStyle = isAccent
      ? `rgb(${acR},${acG},${acB})`
      : 'rgb(215, 205, 190)';

    const w = ctx.measureText(word).width;
    ctx.fillText(word, wordX + w / 2, textY + wordSlide);
    wordX += ctx.measureText(word + ' ').width;
  });

  // ── Hook ──
  textY += 44;
  ctx.globalAlpha = hookAlpha;
  ctx.font = '400 20px "Cormorant Garamond", serif';
  ctx.fillStyle = 'rgb(140, 130, 115)';
  ctx.textAlign = 'center';
  ctx.fillText(story.hook, textCenterX, textY);

  // ── Motif ──
  textY += 32;
  ctx.globalAlpha = motifAlpha;
  ctx.font = 'italic 15px "Cormorant Garamond", serif';
  ctx.fillStyle = 'rgb(90, 82, 72)';
  ctx.fillText(story.motif, textCenterX, textY);

  // ── Accent line ──
  textY += 24;
  if (lineScale > 0) {
    ctx.globalAlpha = lineScale;
    const lineW = 160 * lineScale;
    const lineGrad = ctx.createLinearGradient(textCenterX - lineW / 2, 0, textCenterX + lineW / 2, 0);
    lineGrad.addColorStop(0, 'transparent');
    lineGrad.addColorStop(0.5, `rgb(${acR},${acG},${acB})`);
    lineGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(textCenterX - lineW / 2, textY);
    ctx.lineTo(textCenterX + lineW / 2, textY);
    ctx.stroke();
  }

  // ── Brand watermark ──
  textY += 30;
  ctx.globalAlpha = brandAlpha;
  ctx.font = '600 11px "Cormorant Garamond", serif';
  ctx.letterSpacing = '3px';
  ctx.fillStyle = 'rgb(65, 58, 50)';
  ctx.textAlign = 'center';
  ctx.fillText('PASTLIVES.SITE', textCenterX, textY);
  ctx.letterSpacing = '0px';

  // ── Fade out ──
  if (fadeOut > 0) {
    ctx.globalAlpha = fadeOut;
    ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
    ctx.fillRect(0, 0, W, H);
  }

  ctx.globalAlpha = 1;
}

/* ── Main Component ──────────────────────────── */

const StoryPreview = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const story = storyId ? PREVIEWS[storyId] : undefined;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [recording, setRecording] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Load image
  useEffect(() => {
    if (!story) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
    };
    img.src = story.image;
  }, [story]);

  // Animation loop
  useEffect(() => {
    if (!story || !imgLoaded || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx || !imgRef.current) return;

    startRef.current = performance.now();

    const loop = () => {
      const elapsed = ((performance.now() - startRef.current) / 1000) % DURATION;
      drawFrame(ctx, story, imgRef.current!, elapsed);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animRef.current);
  }, [story, imgLoaded]);

  // Record & download
  const handleDownload = useCallback(async () => {
    if (!story || !canvasRef.current || !imgRef.current) return;
    setRecording(true);
    setDownloading(true);

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const stream = canvas.captureStream(FPS);
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 5_000_000,
    });

    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `epoch-lives-${story.id}-preview.webm`;
      a.click();
      URL.revokeObjectURL(url);
      setRecording(false);
      setDownloading(false);
    };

    recorder.start();

    // Render frames for exactly DURATION
    const totalFrames = Math.ceil(DURATION * FPS);
    const frameInterval = 1000 / FPS;

    for (let i = 0; i < totalFrames; i++) {
      const t = (i / totalFrames) * DURATION;
      drawFrame(ctx, story, imgRef.current!, t);
      await new Promise(r => setTimeout(r, frameInterval));
    }

    recorder.stop();
  }, [story]);

  if (!story) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/50 font-body">Story not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-8" style={{ background: '#0a0a0a' }}>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full max-w-4xl rounded-lg shadow-2xl"
        style={{ aspectRatio: `${W}/${H}` }}
      />

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleDownload}
          disabled={downloading || !imgLoaded}
          className="px-6 py-3 rounded-lg font-body text-sm font-semibold tracking-[0.1em] uppercase transition-all disabled:opacity-40"
          style={{
            background: story.color,
            color: '#0a0a0a',
          }}
        >
          {recording ? 'Recording…' : downloading ? 'Processing…' : 'Download .webm'}
        </button>

        <Link
          to={story.href}
          className="px-6 py-3 rounded-lg font-body text-sm font-semibold tracking-[0.1em] uppercase border transition-colors hover:bg-white/5"
          style={{ borderColor: 'hsl(40, 10%, 25%)', color: 'hsl(40, 15%, 55%)' }}
        >
          View essay →
        </Link>
      </div>

      {/* Quick nav to other previews */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {Object.entries(PREVIEWS).map(([id, s]) => (
          <Link
            key={id}
            to={`/preview/${id}`}
            className={`text-[10px] tracking-[0.1em] uppercase font-body font-semibold px-3 py-1.5 rounded-full transition-colors ${
              id === storyId ? 'text-black' : 'text-white/40 hover:text-white/70'
            }`}
            style={id === storyId ? { background: story.color } : { border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {s.id === '1857' ? '1857' : s.title.split(' ').slice(0, 2).join(' ')}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoryPreview;
