import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GEIGER = 'hsl(140, 70%, 45%)';
const URANIUM = 'hsl(50, 90%, 55%)';
const FLASH = 'hsl(45, 100%, 85%)';
const ORANGE = 'hsl(25, 95%, 55%)';
const STEEL = 'hsl(200, 10%, 50%)';
const DIM = 'hsl(200, 10%, 30%)';
const RED = 'hsl(0, 70%, 50%)';

/* ── Step 0: Einstein's Letter ─────────────── */

const EinsteinLetter = () => (
  <motion.g
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {/* Paper */}
    <rect x={100} y={40} width={200} height={280} rx={2} fill="hsl(40, 30%, 90%)" stroke="hsl(35, 20%, 75%)" strokeWidth={0.5} />

    {/* Fold line */}
    <line x1={100} y1={140} x2={300} y2={140} stroke="hsl(35, 15%, 80%)" strokeWidth={0.3} strokeDasharray="2 2" />

    {/* Header date */}
    <motion.text x={120} y={68} fill="hsl(25, 20%, 30%)" fontSize={7} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      Albert Einstein
    </motion.text>
    <motion.text x={120} y={80} fill="hsl(25, 15%, 50%)" fontSize={5.5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      Old Grove Rd., Nassau Point, Peconic, Long Island
    </motion.text>
    <motion.text x={120} y={95} fill="hsl(25, 15%, 50%)" fontSize={5.5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      August 2nd, 1939
    </motion.text>

    {/* Addressee */}
    <motion.text x={120} y={115} fill="hsl(25, 20%, 30%)" fontSize={5.5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
      F.D. Roosevelt
    </motion.text>
    <motion.text x={120} y={124} fill="hsl(25, 15%, 50%)" fontSize={5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
      President of the United States
    </motion.text>

    {/* Body lines (simulated typed text) */}
    {[148, 158, 168, 178, 188, 198, 208, 218, 228].map((y, i) => {
      const widths = [170, 175, 160, 172, 168, 155, 175, 140, 90];
      return (
        <motion.rect
          key={y}
          x={120}
          y={y}
          width={widths[i]}
          height={2.5}
          rx={1}
          fill="hsl(25, 10%, 65%)"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.5 }}
          transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
          style={{ transformOrigin: `120px ${y}px` }}
        />
      );
    })}

    {/* Key phrase highlighted */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
      <rect x={118} y={155} width={178} height={14} rx={1} fill={`${URANIUM}20`} />
      <text x={120} y={164} fill="hsl(25, 30%, 25%)" fontSize={5.5} fontFamily="Georgia, serif" fontStyle="italic">
        "...extremely powerful bombs of a new type..."
      </text>
    </motion.g>

    {/* Signature scrawl */}
    <motion.path
      d="M120 270 Q130 260 140 268 Q150 275 160 265 Q165 260 175 268"
      fill="none"
      stroke="hsl(220, 40%, 25%)"
      strokeWidth={1.2}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
    />
    <motion.text x={120} y={285} fill="hsl(25, 15%, 50%)" fontSize={5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
      A. Einstein
    </motion.text>

    {/* CONFIDENTIAL stamp */}
    <motion.g
      initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
      animate={{ opacity: 0.7, scale: 1, rotate: -12 }}
      transition={{ delay: 2.5, duration: 0.3, type: 'spring' }}
      style={{ transformOrigin: '255px 80px' }}
    >
      <rect x={220} y={60} width={75} height={22} rx={2} fill="none" stroke={RED} strokeWidth={1.5} />
      <text x={230} y={75} fill={RED} fontSize={8} fontFamily="monospace" fontWeight="bold" letterSpacing={2}>
        SECRET
      </text>
    </motion.g>
  </motion.g>
);


/* ── Step 1: Manhattan Project Sites Map ───── */

// Real US state boundaries projected from GeoJSON (Albers-like, continental US)
const US_STATES = [
  "M225.7 132.6 L238.4 151.4 L239.5 156.2 L239.2 158.9 L238.8 165.4 L224.2 167.8 L225.1 172.1 L223.9 174.4 L221.8 170.6 L219.6 173.4 L221.3 133.6 Z",
  "M98.5 115 L79.8 161.6 L66.4 152.4 L65.6 149.9 L66.6 144.1 L68 139.9 L66.7 135.1 L66.1 131.4 L65.2 122.9 L68.6 123.6 L90 114.9 Z",
  "M183.9 119.4 L208.9 122.2 L211.6 125.5 L209.4 128.7 L208.3 132.6 L207.4 135.6 L205.8 138.2 L204.9 141.2 L204 146.4 L203.3 150.2 L186.5 145.4 L183.9 144.6 Z",
  "M15.4 70.9 L34.3 71 L41.8 105.3 L58.6 124.1 L66.7 135.1 L68 139.9 L66.6 144.1 L65.6 149.9 L66.4 152.4 L51.2 154.3 L50 149.1 L45 143.5 L43.7 142.8 L38.9 140.1 L35 137.8 L30.5 136.3 L30.6 131.7 L28.4 128.5 L26.5 125.7 L23 118.2 L23 115.2 L20.1 112.9 L19.6 108.1 L19.7 105.2 L17.1 105.9 L14.8 101.2 L12.7 97.1 L11.7 90.1 L8.5 84.7 L9.9 78.6 L9.4 72.9 Z",
  "M105.1 79.8 L139.5 79.8 L134 115 L108 115 L98.4 103.8 Z",
  "M309.5 70.7 L316.9 76.2 L313.4 77.5 L307.7 78.9 L307 77.9 Z",
  "M295.7 90.3 L294.6 93.4 L297 99.1 L294 102.1 Z",
  "M236.6 167.8 L248.3 170.9 L256.8 173.4 L257.4 169.3 L260.7 174.2 L265.7 190.1 L266.6 196.5 L268.6 206.8 L266.8 216.5 L265.4 218.5 L261.9 218.6 L259.8 212.6 L258 209.2 L256.7 204.1 L255.6 205.1 L254.8 195.6 L252.1 195.2 L252.6 185.4 L249.9 181.7 L248.1 179.1 L243.2 176.1 L240.3 178.9 L237.1 177.1 L229.9 173.1 L225.6 172.8 L224 169 Z",
  "M250.6 132.6 L251.2 137.3 L252.9 140.1 L255.9 144.6 L258.5 148.8 L260.5 153.5 L262.3 157.9 L261.9 163.2 L260.6 166.6 L257.4 169.3 L256.8 173.4 L248.3 170.9 L238.8 165.4 L239.2 158.9 L239.5 156.2 L238.4 151.4 L243.5 132.7 Z",
  "M57.5 9.4 L59.4 23.3 L61.8 25.4 L65.8 29.6 L66.8 33.4 L66.1 37.8 L67.5 40.6 L70.6 39.3 L72 43.5 L73.3 46.5 L76 49.9 L79.8 48.4 L82.3 48.9 L85.7 48.3 L80.2 71 L51.7 54.9 L50.9 51.1 L52.3 46.5 L53.5 43.3 L54.6 38 L52.3 34.3 L51.6 20.3 Z",
  "M206.4 66.5 L222.9 68.3 L224.7 94.3 L224.8 99.3 L222.9 103.6 L221.9 105.3 L221 109.2 L218.9 112.5 L216.5 113 L215.2 115.1 L213.5 112 L211.1 107 L208.1 104.3 L209 99.8 L207.4 97.7 L205.9 95.1 L201.4 88.3 L202 83.7 L204.5 80.5 L204 76.2 L208.3 73.3 L209.2 69.9 Z",
  "M233.7 73.1 L240.6 84.2 L240.6 99.3 L237 99.8 L235.6 103.3 L233.4 106.6 L230.6 105.8 L229 106.3 L225.5 106.8 L223.8 107 L221.5 107.4 L222.2 103.8 L224.1 100.6 L224 95.9 L225.3 74.1 Z",
  "M202.2 57.8 L204 60 L203.9 64.4 L207.7 68.1 L209.3 71 L208.2 74.6 L203.7 77.7 L203.8 81.4 L201.9 85.3 L199.4 83.2 L176.4 83.4 L175.4 78 L174.3 73.8 L173.4 70.7 L171.8 63.5 L171.7 60.2 L172.4 57.8 Z",
  "M140.4 88.6 L181.5 90.1 L181.9 95.6 L151 115 Z",
  "M245.9 99.4 L250.4 100.7 L252.1 101 L253.4 105.1 L255.4 109.1 L255 112.6 L252 115.2 L250.4 117.3 L242.2 118.6 L230.1 118 L221.6 119.4 L213.9 118.3 L215 114.7 L218.7 114.4 L219.1 111.6 L221.7 108 L224.2 106.4 L227 108.1 L229.3 107.1 L231.8 104.7 L234.1 106 L236 102.2 L238.5 100.2 L240.1 96.9 L244 98.3 Z",
  "M189 150 L203.5 151.6 L204.4 157.1 L202 162.3 L200.6 165.5 L211.7 167.8 L212.3 174.1 L211.1 177.1 L214.4 177.7 L212.2 178.8 L213.1 182 L216 183.8 L213.2 183.5 L210 181.7 L208.8 184.3 L206.4 184.3 L203.8 183.7 L201.2 180.7 L199.1 178 L196.6 180.7 L191.3 178.6 L187.2 178.5 L188.5 172.7 L189.5 168.4 L187.8 161 Z",
  "M323.3 61.7 L321.7 59.2 L323.6 40.7 L325.1 38.1 L325.6 35.2 L327.4 29.7 L333.1 24.9 L336.9 24.5 L340.4 26.4 L342.3 39.3 L342.1 42.1 L345.1 46.3 L342.6 48.1 L340.6 48.6 L337.8 49.1 L336.5 50.1 L334.3 49.4 L332.7 52.5 L330.7 53.7 L328.4 55.9 L325.9 56.2 L325.2 58.4 Z",
  "M271.9 91 L297.8 102.2 L294.2 106.6 L292.5 105 L292 103.5 L290.7 101.8 L290.6 96.1 L292.4 92.5 L290.1 94.7 L289 99.4 L289.9 103.9 L288.8 104.3 L285.2 103 L286.1 99.2 L285.7 98 L283.7 95.4 L281.5 92.1 L278.9 92 L276 92.2 L272.9 94.8 Z",
  "M322 63.2 L322.6 66.1 L322.9 68.8 L324.2 71.6 L327.8 72.7 L323.5 75 L321.9 75 L320.2 73.5 L318.4 70.8 L309.5 70.7 L308.3 64.4 L320.5 64.1 Z",
  "M248.5 73.4 L233.7 73.1 L230.8 70 L232.4 64.7 L231.1 55 L232.3 48.4 L233.2 45.4 L235.8 46.7 L237.2 42.5 L238.8 39.5 L242.6 38.8 L245.9 40.3 L249.3 43.3 L249.6 47.1 L247.8 52.9 L245.9 56.3 L249.7 53.6 L253.3 54.7 L254.6 62.4 L253 64.9 L250.5 68.9 Z",
  "M224.3 43.8 L222.6 41.4 L222 37.6 L218 35.9 L208.8 31.3 L211 28.8 L216.1 27 L219.5 23.7 L219.8 26.3 L220.5 27.6 L225.5 31.1 L228.1 31.7 L234.3 29.7 L239.1 29.1 L241.6 31.5 L244.6 31.1 L246.6 35.9 L248.4 35.9 L243.2 36.4 L241.2 37.1 L237.5 35 L234.1 36.4 L231.6 37.6 L229 37 L226.7 38.8 Z",
  "M198.4 29.6 L196.7 35.1 L193.4 38.3 L194.7 40.7 L193.7 46.8 L197.1 49.5 L200.8 53.1 L202.7 56.8 L172.4 57.8 L170 39.3 L171.5 32.9 L170.4 27.7 L168.8 18.7 L168.6 12.2 L180 6 L182.7 11.4 L185.4 12.5 L189.9 13.4 L192.7 12.7 L195.5 14.3 L198.1 15 L200.1 17.2 L203.8 16.6 L206.8 17.1 L210.9 18.3 L210.3 19.7 L203.3 23.8 L197.9 28.9 Z",
  "M219.1 132.6 L220.5 143.2 L218.9 173.7 L215.5 173.4 L212.3 174.1 L211.7 167.8 L200.6 165.5 L202 162.3 L204.4 157.1 L203.5 151.6 L203.8 149 L203 145.3 L204.6 140.2 L206.8 137.7 L207.8 134.1 Z",
  "M199.4 83.2 L201.9 85.3 L202.2 91 L206.3 98 L208.7 98.1 L209.1 100.6 L209.8 106.1 L213 108.9 L213 112.5 L214.8 118.7 L213.2 119.4 L211.8 123.8 L209.8 121.1 L183.1 119.4 L181.9 95.6 L181.5 90.1 L177.6 86.3 L191.1 83.5 Z",
  "M127.8 9.4 L127.9 44.6 L98.3 44.6 L85.7 48.3 L82.3 48.9 L79.8 48.4 L76 49.9 L73.3 46.5 L72 43.5 L70.6 39.3 L67.5 40.6 L66.1 37.8 L66.8 33.4 L65.8 29.6 L61.8 25.4 L59.4 23.3 L57.5 9.4 Z",
  "M132.1 62.2 L160.5 62.7 L165.1 63.6 L171.3 66.5 L174.3 71.2 L174.4 75 L176 80 L177.6 86.3 L139.5 88.6 L127.8 62.2 Z",
  "M51.7 71 L69.2 122.1 L67.3 122.6 L66 129.7 L58.6 124.1 L41.8 105.3 L34.3 71 Z",
  "M321.1 41.9 L322.7 60.2 L322.6 63.3 L319.8 64.9 L312.6 62.6 L313.5 57.2 L315.5 52.7 L318.4 48.2 L318.6 44.5 Z",
  "M302.6 78.6 L302.9 82.9 L304.1 86 L300.4 95.2 L297.1 95.3 L294.8 91.9 L297.2 89.6 L299.4 86.7 L297 83.5 L297.3 80.1 L299.9 76.6 Z",
  "M108 115 L134 115 L133.7 141.3 L112.8 159 L103.4 160.9 L98.5 115 Z",
  "M307.8 44.5 L308.1 49.5 L307.8 55.4 L308.2 63.7 L307 70.6 L305.6 78.9 L309 80.1 L314 78.4 L312.9 81.2 L305.3 83.4 L304.5 79.8 L299.6 76 L297.8 73.2 L296 71 L270.2 68.6 L275.5 64.1 L274.2 59.9 L281.9 59.2 L286.6 59.8 L290.9 57.5 L290.1 52.8 L293.6 48.9 L303.1 44.7 Z",
  "M263.1 118.9 L293 118.9 L291.8 122.6 L288.2 123.7 L290.1 124.3 L293.5 124.3 L292.9 127.6 L289.1 131.3 L289.4 135.6 L285.1 136.1 L280.7 142.8 L270.7 134.3 L263.3 131.7 L255.4 130.9 L250.6 132.6 L243.6 130.6 L246.7 127.7 L251.2 125.8 L253.5 124.1 L257.6 121.1 Z",
  "M167.8 9.4 L168.4 17 L170.2 27.3 L170.8 32 L127.8 36.3 Z",
  "M265.8 71.2 L265.3 84.4 L263.9 91.1 L260.3 93.8 L258.2 96.7 L256.9 97.2 L255.4 101.1 L252.8 101.3 L251 99.8 L247.2 100.6 L244 98.3 L240.6 84.2 L250.8 74.6 L253.5 76 L258.6 75.5 Z",
  "M151 115 L184.2 129.1 L181.1 142.6 L177.7 142.5 L175.4 142.4 L172.5 143.4 L169.6 141.7 L167 143 L164 142.7 L162.3 140.4 L159.9 140.1 L156.3 139.5 L153.3 138 L151.6 119.4 L134 115 Z",
  "M15.5 34.3 L17.8 36.1 L23.7 38.4 L27.4 39.3 L33.1 38.2 L39.4 36.4 L53.2 37.4 L53.8 41.8 L52.9 45.2 L50.5 49.9 L52.5 52 L41.9 71.1 L20.4 70.9 L8.8 70 L7.6 63.6 L9.5 57.3 L10.4 46.6 L10.9 36.3 L14.6 34.5 Z",
  "M270.2 68.8 L296.6 72.2 L297.7 74.5 L299.9 76.6 L297.3 80.1 L297 83.5 L299.4 86.7 L297.2 89.6 L293.5 91 L265.8 83 L266.8 70.7 Z",
  "M252.6 132 L262.7 131.3 L264.2 133.2 L277.3 142.7 L273.8 146.9 L271.2 150.1 L268.8 153.6 L266.1 156.1 L262.3 157.9 L260.5 153.5 L258.5 148.8 L255.9 144.6 L252.9 140.1 L251.2 137.3 L250.6 132.6 Z",
  "M127.8 36.3 L170 39.3 L172.4 57.8 L171.7 60.2 L171.8 63.5 L171.3 66.5 L165.1 63.6 L160.5 62.7 L132.1 62.2 L127.9 44.6 Z",
  "M221.6 119.4 L230.1 118 L242.2 118.6 L258.9 118.6 L256.9 122.8 L253.3 123.2 L249.7 126.3 L245.2 129 L243.5 132.7 L220.7 132.6 L208.9 132.4 L210.5 127.3 L211.8 123.8 L213.2 119.4 Z",
  "M140.9 119.4 L152 136.3 L155.9 137.8 L158.8 140.2 L161.2 140 L163.6 141.5 L166.4 142.2 L168.1 143.7 L171.3 142.8 L174.1 142.8 L177.3 142 L179.5 141.7 L183.9 144.6 L186.5 145.4 L187.8 161 L189.5 168.4 L188.5 172.7 L187.2 178.5 L183.7 180.6 L181.6 179.5 L181.4 181 L178.6 186.6 L173.7 189.1 L171.5 187.8 L171.5 191.1 L169 193.8 L166.1 199.8 L166.3 203 L166.4 205.1 L167.3 210.4 L165.3 211.6 L160.5 209.8 L157.2 208.2 L154.8 202.8 L154.6 198.8 L152.3 196 L149.8 191.7 L147.9 186.2 L145.6 182.1 L143.3 178.8 L137.8 177.8 L135.1 180.8 L133.3 185.5 L127.2 182 L124.1 177.3 L122.8 171.6 L118.7 167.1 L115.2 163.7 L112.6 159.9 L133.6 150.2 L134 119.4 Z",
  "M80.2 71 L98.5 79.8 L98.5 104.7 L69.2 115 Z",
  "M318.6 44.5 L318.4 48.2 L315.5 52.7 L313.5 57.2 L312.6 62.6 L308.3 64.4 L307.5 56.1 L307.9 51.2 L307.9 46.3 Z",
  "M278.5 93.3 L283.1 94.7 L284.9 97.2 L285.6 100.6 L284.7 103.2 L288.6 104.9 L290.1 109.6 L289.9 113.6 L288.6 113.9 L292.3 115.7 L267.1 119 L247.3 118.5 L251.9 116 L252.8 113.9 L257.1 111 L259.7 113.2 L263.1 112.4 L267 110.5 L268.8 106.2 L270.9 101 L273.4 101.8 L278.1 95.9 Z",
  "M51.7 9.4 L51.6 32.8 L40.2 35.8 L34.5 37.4 L30.6 38 L25.3 38.2 L18.1 38.8 L16 34.2 L13.5 33.5 L10.5 32.9 L10.3 29.3 L8.4 20.5 L7.4 14.8 L12.6 16.7 L16.5 17.5 L19.6 19.2 L20.7 24 L21.2 17.9 L19.8 14.1 L18.8 11.4 Z",
  "M265.8 83 L271.8 95.6 L274.9 93.5 L278 91.9 L280.5 92.1 L281.5 96.2 L275.4 99.5 L272.8 102.6 L270.4 103 L267.7 107.5 L266 111.3 L261.6 112.9 L258.9 113.2 L257.2 110.3 L255.1 108.1 L253.6 102.5 L256.1 100.6 L257.7 98.5 L258.9 95 L260.9 94.4 L264.5 87.9 L264.9 83.5 Z",
  "M207.7 30.8 L215.5 34.6 L221.3 36.5 L223.1 40.2 L223.4 42.8 L223 45 L222.3 48.7 L225.4 45.4 L227.5 43.8 L224.6 50.6 L223.4 54.5 L222.4 60 L223.1 66.7 L206 65.4 L203.3 61 L203 57.8 L201.8 53.5 L198.9 50.5 L195.2 48.4 L194 42.1 L193.3 39.5 L196.4 35.7 L197.9 29.2 L203.8 28.2 L205 29.2 Z",
  "M98.3 44.6 L127.8 62.2 L105.1 79.8 L86.8 71 Z",
];

// Site detail cards for the three main sites
const SITE_DETAILS: Record<string, { image: string; caption: string; role: string }> = {
  'Los Alamos, NM': {
    image: '/images/nuclear/trinity-test.jpg',
    caption: 'Trinity detonation, 0.016 seconds after ignition, July 16, 1945',
    role: 'Weapons design laboratory — where Oppenheimer\'s team built the bomb',
  },
  'Oak Ridge, TN': {
    image: '/images/nuclear/oak-ridge.jpg',
    caption: 'Calutron diffusion pumps at the Y-12 plant, Oak Ridge',
    role: 'Uranium enrichment — 75,000 workers, most unaware of the mission',
  },
  'Hanford, WA': {
    image: '/images/nuclear/hanford.jpg',
    caption: 'Workers loading uranium slugs into the B Reactor, Hanford',
    role: 'Plutonium production — the B Reactor, world\'s first full-scale nuclear reactor',
  },
};

// Site positions projected from real lat/lon coordinates
const SITES = [
  { x: 114.6, y: 124.9, label: 'Los Alamos, NM', main: true },
  { x: 243.8, y: 123.7, label: 'Oak Ridge, TN', main: true },
  { x: 38.6, y: 31, label: 'Hanford, WA', main: true },
  { x: 224.1, y: 72.1, label: 'Chicago', main: false },
  { x: 116.6, y: 151.1, label: 'Alamogordo', main: false },
  { x: 188.9, y: 70.7, label: 'Ames, IA', main: false },
  { x: 244.2, y: 90.7, label: 'Dayton, OH', main: false },
  { x: 282.8, y: 60.8, label: 'Rochester, NY', main: false },
  { x: 320.9, y: 67.7, label: 'MIT', main: false },
  { x: 269.1, y: 91.9, label: 'Morgantown', main: false },
  { x: 209, y: 100.7, label: 'St. Louis', main: false },
  { x: 122.3, y: 90.9, label: 'Denver', main: false },
  { x: 21, y: 107.3, label: 'Berkeley, CA', main: false },
];

const ManhattanMap = ({ onSiteClick }: { onSiteClick: (label: string) => void }) => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
    {/* Offset the map group to center it in the 400x400 viewBox */}
    <g transform="translate(25, 55)">
      {/* Real US state boundaries */}
      {US_STATES.map((d, i) => (
        <motion.path
          key={`state-${i}`}
          d={d}
          fill={`${GEIGER}08`}
          stroke={DIM}
          strokeWidth={0.5}
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.03 }}
        />
      ))}

      {/* Connection lines between major sites (real coordinates) */}
      {[
        [114.6, 124.9, 243.8, 123.7],
        [114.6, 124.9, 38.6, 31],
        [38.6, 31, 243.8, 123.7],
        [224.1, 72.1, 114.6, 124.9],
        [224.1, 72.1, 243.8, 123.7],
        [224.1, 72.1, 38.6, 31],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={`conn-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={GEIGER}
          strokeWidth={0.5}
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{ delay: 1.2 + i * 0.15, duration: 0.8 }}
        />
      ))}

      {/* Sites */}
      {SITES.map((site, i) => (
        <motion.g
          key={site.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.06, type: 'spring', stiffness: 200 }}
          style={{ cursor: site.main ? 'pointer' : 'default' }}
          onClick={site.main ? () => onSiteClick(site.label) : undefined}
        >
          {/* Larger invisible hit area for main sites */}
          {site.main && (
            <circle cx={site.x} cy={site.y} r={16} fill="transparent" />
          )}
          <circle cx={site.x} cy={site.y} r={site.main ? 4 : 2} fill={site.main ? GEIGER : STEEL} />
          {site.main && (
            <motion.circle
              cx={site.x} cy={site.y} r={8}
              fill="none" stroke={GEIGER} strokeWidth={0.6}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 0.15, 0.6], r: [8, 14, 8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {site.main && (
            <text
              x={site.x + 8}
              y={site.y + 3}
              fill={FLASH}
              fontSize={7}
              fontFamily="var(--font-body)"
              fontWeight="600"
              textAnchor="start"
            >
              {site.label}
            </text>
          )}
        </motion.g>
      ))}
    </g>

    {/* Stats bar at bottom */}
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <line x1={40} y1={320} x2={360} y2={320} stroke={DIM} strokeWidth={0.3} />

      <text x={90} y={342} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        SITES
      </text>
      <text x={90} y={360} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        30+
      </text>

      <text x={200} y={342} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        PERSONNEL
      </text>
      <text x={200} y={360} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        125,000
      </text>

      <text x={310} y={342} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        COST (1945)
      </text>
      <text x={310} y={360} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        $2B
      </text>
    </motion.g>
  </motion.g>
);


/* ── Step 2: Trinity Detonation ────────────── */

const TrinityBlast = () => (
  <motion.g>
    {/* Desert horizon line */}
    <motion.line
      x1={0} y1={280} x2={400} y2={280}
      stroke={DIM}
      strokeWidth={0.5}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ delay: 0.5 }}
    />

    {/* Desert floor texture */}
    {[...Array(40)].map((_, i) => (
      <motion.line
        key={`sand-${i}`}
        x1={i * 10 + Math.random() * 5}
        y1={280}
        x2={i * 10 + 3 + Math.random() * 4}
        y2={282 + Math.random() * 3}
        stroke="hsl(35, 20%, 20%)"
        strokeWidth={0.3}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.6 + i * 0.02 }}
      />
    ))}

    {/* Mushroom cloud silhouette */}
    <motion.path
      d="M200 280 L195 260 Q180 220 160 200 Q140 180 145 155 Q148 135 165 120 Q180 105 200 100 Q220 105 235 120 Q252 135 255 155 Q260 180 240 200 Q220 220 205 260 Z"
      fill={`${URANIUM}15`}
      stroke={URANIUM}
      strokeWidth={0.8}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '200px 280px' }}
    />

    {/* Mushroom cap */}
    <motion.ellipse
      cx={200} cy={105}
      fill={`${ORANGE}25`}
      stroke={ORANGE}
      strokeWidth={0.6}
      initial={{ rx: 0, ry: 0, opacity: 0 }}
      animate={{ rx: 70, ry: 30, opacity: 1 }}
      transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
    />

    {/* Inner cap glow */}
    <motion.ellipse
      cx={200} cy={108}
      fill={`${URANIUM}20`}
      initial={{ rx: 0, ry: 0 }}
      animate={{ rx: 45, ry: 18 }}
      transition={{ delay: 1.4, duration: 0.8 }}
    />

    {/* Core flash */}
    <motion.circle
      cx={200} cy={270}
      fill={FLASH}
      initial={{ r: 0, opacity: 0 }}
      animate={{ r: 20, opacity: [0, 1, 0.6] }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />

    {/* Fireball glow */}
    <motion.circle
      cx={200} cy={270}
      fill={`${URANIUM}30`}
      initial={{ r: 0 }}
      animate={{ r: 40 }}
      transition={{ delay: 0.3, duration: 1.2 }}
    />

    {/* Expanding shockwave rings along ground */}
    {[1, 2, 3].map(i => (
      <motion.ellipse
        key={`ground-shock-${i}`}
        cx={200} cy={280}
        fill="none"
        stroke={FLASH}
        strokeWidth={0.8}
        initial={{ rx: 10, ry: 3, opacity: 0.7 }}
        animate={{ rx: 200, ry: 20, opacity: 0 }}
        transition={{
          duration: 3.5,
          delay: 0.5 + i * 0.8,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    ))}

    {/* Debris particles */}
    {[...Array(20)].map((_, i) => {
      const angle = (i / 20) * Math.PI;
      const distance = 30 + Math.random() * 60;
      return (
        <motion.circle
          key={`debris-${i}`}
          cx={200}
          cy={275}
          r={1}
          fill={i % 3 === 0 ? URANIUM : ORANGE}
          initial={{ cx: 200, cy: 275, opacity: 0 }}
          animate={{
            cx: 200 + Math.cos(angle) * distance * (Math.random() > 0.5 ? 1 : -1),
            cy: 275 - Math.sin(angle) * distance,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: 0.3 + Math.random() * 0.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      );
    })}

    {/* Timestamp */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <text x={200} y={330} fill={STEEL} fontSize={7} fontFamily="monospace" textAnchor="middle" letterSpacing={2}>
        05:29:45 MWT
      </text>
      <text x={200} y={342} fill={DIM} fontSize={5} fontFamily="var(--font-body)" textAnchor="middle">
        Jornada del Muerto desert, New Mexico
      </text>
    </motion.g>
  </motion.g>
);


/* ── Step 3: Blast Radii + City Comparison ─── */

const BLAST_RADII = [
  { label: 'Fireball', radius: 0.08, color: URANIUM, distance: '200m' },
  { label: 'Total destruction', radius: 0.22, color: ORANGE, distance: '500m' },
  { label: 'Severe damage', radius: 0.38, color: 'hsl(15, 80%, 40%)', distance: '1.2km' },
  { label: 'Thermal radiation', radius: 0.58, color: 'hsl(0, 50%, 30%)', distance: '2km' },
];

// Center the radii diagram higher to leave room for the legend below
const CX = 170;
const CY = 155;
const SCALE = 150;

const BlastRadii = () => (
  <motion.g>
    {/* Subtle grid */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} transition={{ duration: 0.8 }}>
      {[...Array(20)].map((_, i) => (
        <React.Fragment key={i}>
          <line x1={i * 20} y1={0} x2={i * 20} y2={400} stroke={STEEL} strokeWidth={0.3} />
          <line x1={0} y1={i * 20} x2={400} y2={i * 20} stroke={STEEL} strokeWidth={0.3} />
        </React.Fragment>
      ))}
    </motion.g>

    {/* Radii circles — no inline labels */}
    {BLAST_RADII.slice().reverse().map((ring, i) => (
      <motion.circle
        key={ring.label}
        cx={CX} cy={CY}
        fill={`${ring.color}10`}
        stroke={ring.color}
        strokeWidth={0.8}
        strokeDasharray="4 3"
        initial={{ r: 0, opacity: 0 }}
        animate={{ r: ring.radius * SCALE, opacity: 1 }}
        transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
      />
    ))}

    {/* Ground zero marker */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
      <line x1={CX - 3} y1={CY - 3} x2={CX + 3} y2={CY + 3} stroke={FLASH} strokeWidth={1} />
      <line x1={CX + 3} y1={CY - 3} x2={CX - 3} y2={CY + 3} stroke={FLASH} strokeWidth={1} />
      <text x={CX} y={CY + 14} fill={STEEL} fontSize={5} fontFamily="monospace" textAnchor="middle">
        GROUND ZERO
      </text>
    </motion.g>

    {/* Legend — clean vertical list on the right */}
    <motion.g
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      {BLAST_RADII.map((ring, i) => {
        const ly = 85 + i * 38;
        return (
          <motion.g
            key={ring.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.2 }}
          >
            {/* Color swatch */}
            <rect x={295} y={ly - 5} width={10} height={10} rx={2} fill={ring.color} opacity={0.8} />
            {/* Label */}
            <text x={312} y={ly + 1} fill={FLASH} fontSize={7} fontFamily="var(--font-body)" fontWeight="600">
              {ring.label}
            </text>
            {/* Distance */}
            <text x={312} y={ly + 11} fill={STEEL} fontSize={6} fontFamily="monospace">
              {ring.distance}
            </text>
          </motion.g>
        );
      })}
    </motion.g>

    {/* Divider */}
    <motion.line
      x1={40} y1={290} x2={360} y2={290}
      stroke={DIM} strokeWidth={0.3}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    />

    {/* City comparisons at bottom — side by side */}
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      {/* Hiroshima */}
      <text x={120} y={315} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        HIROSHIMA · AUG 6
      </text>
      <text x={120} y={338} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        ~15 kt
      </text>
      <text x={120} y={354} fill={RED} fontSize={6.5} fontFamily="var(--font-body)" textAnchor="middle">
        ~80,000 killed
      </text>

      {/* Divider dot */}
      <circle cx={200} cy={335} r={1.5} fill={DIM} />

      {/* Nagasaki */}
      <text x={280} y={315} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        NAGASAKI · AUG 9
      </text>
      <text x={280} y={338} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        ~21 kt
      </text>
      <text x={280} y={354} fill={RED} fontSize={6.5} fontFamily="var(--font-body)" textAnchor="middle">
        ~40,000 killed
      </text>
    </motion.g>
  </motion.g>
);


/* ── Main Component ────────────────────────── */

interface Props {
  activeStep: number;
}

export const TrinityFireball = ({ activeStep }: Props) => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  // Close card when step changes
  React.useEffect(() => {
    setSelectedSite(null);
  }, [activeStep]);

  const detail = selectedSite ? SITE_DETAILS[selectedSite] : null;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle, ${activeStep >= 2 ? URANIUM : GEIGER}30 0%, transparent 70%)`,
        }}
        animate={{
          width: activeStep >= 2 ? '100%' : '30%',
          height: activeStep >= 2 ? '100%' : '30%',
          opacity: activeStep >= 1 ? 0.5 : 0.2,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <svg viewBox="0 0 400 400" className="w-full max-w-[550px] h-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.g key="letter" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <EinsteinLetter />
            </motion.g>
          )}
          {activeStep === 1 && (
            <motion.g key="map" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <ManhattanMap onSiteClick={(label) => setSelectedSite(prev => prev === label ? null : label)} />
            </motion.g>
          )}
          {activeStep === 2 && (
            <motion.g key="blast" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <TrinityBlast />
            </motion.g>
          )}
          {activeStep === 3 && (
            <motion.g key="radii" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <BlastRadii />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Site detail card overlay */}
      <AnimatePresence>
        {detail && selectedSite && (
          <motion.div
            key={selectedSite}
            className="absolute z-20 w-[280px] md:w-[320px] overflow-hidden rounded-lg shadow-2xl"
            style={{
              background: 'hsl(200, 20%, 10%)',
              border: `1px solid hsl(140, 30%, 20%)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* Photo */}
            <div className="relative w-full h-[160px] overflow-hidden">
              <img
                src={detail.image}
                alt={detail.caption}
                className="w-full h-full object-cover"
                style={{ filter: 'sepia(0.15) contrast(1.1)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 50%, hsl(200, 20%, 10%) 100%)' }} />
            </div>

            {/* Text */}
            <div className="px-4 pb-4 -mt-2 relative">
              <p
                className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold mb-1"
                style={{ color: GEIGER }}
              >
                {selectedSite}
              </p>
              <p className="font-body text-[13px] leading-relaxed mb-2" style={{ color: 'hsl(0, 0%, 85%)' }}>
                {detail.role}
              </p>
              <p className="font-body text-[10px] italic" style={{ color: STEEL }}>
                {detail.caption}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedSite(null)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'hsl(200, 20%, 10%, 0.8)', color: STEEL }}
            >
              <span className="text-xs leading-none">&times;</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: STEEL }}>
          {activeStep === 0 && 'August 2, 1939 — Einstein\'s Letter'}
          {activeStep === 1 && 'The Manhattan Project — 30 Sites Across America'}
          {activeStep === 2 && 'July 16, 1945 — 05:29:45 MWT'}
          {activeStep === 3 && 'Blast Radii — 21 Kilotons'}
        </p>
      </motion.div>
    </div>
  );
};
