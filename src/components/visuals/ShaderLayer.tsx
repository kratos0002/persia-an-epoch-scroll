/**
 * ShaderLayer — full-bleed WebGL2 atmosphere primitive.
 *
 * One reusable canvas layer for paper-fiber tint and animated film grain.
 * Replaces ad-hoc CSS atmosphere stacks (vellum-grain class, foxing,
 * sepia overlays) with a single GPU-rendered surface.
 *
 * Two kinds supported:
 *  - 'paper' — static low-frequency fiber tint, multiply-blended.
 *  - 'grain' — animated per-frame value noise, soft-light blended.
 *
 * Renders with a fullscreen triangle (no vertex buffer) and a single
 * fragment shader. ~120 lines of vanilla WebGL2; no external dep.
 *
 * Usage:
 *   <ShaderLayer kind="paper" intensity={0.35} />
 *   <ShaderLayer kind="grain" intensity={0.5} />
 *
 * Compose by stacking — paper underneath, grain on top.
 */
import React, { useEffect, useRef } from 'react';

export type ShaderKind = 'paper' | 'grain';

export interface ShaderLayerProps {
  kind: ShaderKind;
  /** 0 = invisible, 1 = full effect. Default 0.4. */
  intensity?: number;
  /** Paper tint hue (HSL string). Defaults to warm parchment. */
  tintColor?: [number, number, number]; // RGB 0–1
  /** z-index. Defaults to 1 for paper, 2 for grain. */
  zIndex?: number;
  /** Pointer-events. Defaults to 'none'. */
  pointerEvents?: 'none' | 'auto';
  className?: string;
}

const VERT_SRC = `#version 300 es
// Fullscreen triangle from gl_VertexID — no vertex buffer needed
void main() {
  vec2 p = vec2(
    (gl_VertexID == 1) ? 3.0 : -1.0,
    (gl_VertexID == 2) ? 3.0 : -1.0
  );
  gl_Position = vec4(p, 0.0, 1.0);
}`;

// ── Paper: low-frequency fiber tint, static. Multiply-blended over content.
const FRAG_PAPER = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uResolution;
uniform float uIntensity;
uniform vec3 uTint;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  // Two octaves of fiber: long and short
  float fiber = fbm(uv * 80.0) * 0.6 + fbm(uv * 280.0) * 0.4;
  // Subtle horizontal anisotropy (paper grain runs sideways)
  float aniso = fbm(uv * vec2(8.0, 220.0)) * 0.4;
  float v = (fiber + aniso) * 0.5;
  // Foxing — sparse warm spots
  float spots = smoothstep(0.78, 0.92, fbm(uv * 6.0));
  vec3 col = mix(uTint, uTint * 0.78, v);
  col = mix(col, vec3(0.62, 0.42, 0.22), spots * 0.18);
  fragColor = vec4(col, uIntensity);
}`;

// ── Grain: animated per-frame value noise, soft-light blended.
const FRAG_GRAIN = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uIntensity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  // High-frequency white noise, jittered each frame for film-grain look
  vec2 seed = gl_FragCoord.xy + vec2(uTime * 71.0, uTime * 113.0);
  float n = hash(seed);
  // Soft-light blending wants a value around 0.5 with deviation
  float g = 0.5 + (n - 0.5) * 0.6;
  fragColor = vec4(vec3(g), uIntensity);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type);
  if (!sh) throw new Error('createShader failed');
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return sh;
}

function linkProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
  const prog = gl.createProgram();
  if (!prog) throw new Error('createProgram failed');
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error(`Program link failed: ${log}`);
  }
  return prog;
}

export const ShaderLayer: React.FC<ShaderLayerProps> = ({
  kind,
  intensity = 0.4,
  tintColor = [0.92, 0.85, 0.74], // warm parchment
  zIndex,
  pointerEvents = 'none',
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      premultipliedAlpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      // Browser without WebGL2 — render nothing. Caller sees empty canvas;
      // since this is atmosphere, missing it gracefully degrades.
      return;
    }

    let vs: WebGLShader, fs: WebGLShader, prog: WebGLProgram;
    try {
      vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
      fs = compileShader(gl, gl.FRAGMENT_SHADER, kind === 'paper' ? FRAG_PAPER : FRAG_GRAIN);
      prog = linkProgram(gl, vs, fs);
    } catch (err) {
      // Compile or link failed — log and bail. Fail-soft for atmosphere.
      // eslint-disable-next-line no-console
      console.warn('[ShaderLayer]', err);
      return;
    }

    const uResolution = gl.getUniformLocation(prog, 'uResolution');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uIntensity = gl.getUniformLocation(prog, 'uIntensity');
    const uTint = gl.getUniformLocation(prog, 'uTint');

    gl.useProgram(prog);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (now: number) => {
      resize();
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uIntensity, intensity);
      gl.uniform3f(uTint, tintColor[0], tintColor[1], tintColor[2]);
      if (uTime) {
        gl.uniform1f(uTime, (now - startTimeRef.current) / 1000);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (kind === 'grain') {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    startTimeRef.current = performance.now();

    if (kind === 'grain') {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Paper is static — draw once now and once on resize.
      draw(performance.now());
    }

    const ro = new ResizeObserver(() => {
      // For static kind, redraw on resize.
      if (kind === 'paper') draw(performance.now());
    });
    ro.observe(canvas);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [kind, intensity, tintColor]);

  const blendMode: React.CSSProperties['mixBlendMode'] =
    kind === 'paper' ? 'multiply' : 'soft-light';
  const defaultZ = kind === 'paper' ? 1 : 2;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents,
        mixBlendMode: blendMode,
        zIndex: zIndex ?? defaultZ,
      }}
    />
  );
};
