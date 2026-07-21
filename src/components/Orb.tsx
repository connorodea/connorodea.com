"use client";

import { useEffect, useRef, useState } from "react";

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

/**
 * A raymarched, fbm-displaced sphere shaded as thin-film iridescence.
 * Written against raw WebGL2 so the hero costs kilobytes instead of the
 * several hundred a scene-graph library would add.
 */
const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;   // -1..1, eased
uniform float uEnter;   // 0..1 load-in
uniform float uScroll;  // 0..1 page scroll

// ── noise ────────────────────────────────────────────────────────────────
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

float fbm3(vec3 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// ── surface ──────────────────────────────────────────────────────────────
float map(vec3 p) {
  p.xz *= rot(uTime * 0.09 + uMouse.x * 0.45);
  p.yz *= rot(uMouse.y * 0.30);
  float base = length(p) - 1.0;
  // One slow swell plus a whisper of detail — a liquid body, not a rock.
  float warp = fbm3(p * 0.92 + vec3(0.0, uTime * 0.12, uTime * 0.04));
  float fine = fbm3(p * 2.10 - vec3(uTime * 0.06, 0.0, 0.0));
  return base - warp * 0.21 - fine * 0.006;
}

vec3 normal(vec3 p) {
  vec2 e = vec2(0.0016, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)));
}

// Cosine palette — the iridescent spectrum, matched to the site's domain hues.
vec3 pal(float t) {
  return 0.55 + 0.45 * cos(6.28318 * (t + vec3(0.00, 0.36, 0.68)));
}

/**
 * Studio environment. A dark room with one large key softbox above-left and a
 * cool fill low-right — this is what the surface reflects, and it is what
 * makes the object read as a body in a space rather than a shaded circle.
 */
vec3 env(vec3 d) {
  float y = d.y * 0.5 + 0.5;
  vec3 room = mix(vec3(0.016, 0.018, 0.026), vec3(0.26, 0.29, 0.38), pow(y, 1.25));

  vec3 keyDir = normalize(vec3(-0.40, 0.72, 0.45));
  float broad = pow(max(dot(d, keyDir), 0.0), 2.6);   // the softbox itself
  float core  = pow(max(dot(d, keyDir), 0.0), 48.0);  // its hot centre
  room += vec3(1.00, 0.94, 0.82) * broad * 1.75;   // warm key
  room += vec3(1.00, 0.99, 0.97) * core  * 3.2;    // its core, kept off clip

  float teal = pow(max(dot(d, normalize(vec3(0.86, -0.10, 0.30))), 0.0), 3.0);
  room += vec3(0.18, 0.78, 0.92) * teal * 1.15;    // cool fill, low right

  float mag = pow(max(dot(d, normalize(vec3(0.10, 0.36, -0.93))), 0.0), 4.0);
  room += vec3(0.95, 0.32, 0.68) * mag * 1.00;     // magenta kicker, behind

  float gold = pow(max(dot(d, normalize(vec3(-0.62, -0.55, 0.25))), 0.0), 5.0);
  room += vec3(1.00, 0.70, 0.28) * gold * 0.80;    // amber bounce, low left

  return room;
}

// ACES filmic tonemap — keeps the highlights from clipping to flat white.
vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);

  vec3 ro = vec3(0.0, 0.0, 3.25);
  vec3 rd = normalize(vec3(uv, -1.62));

  float t = 0.0;
  float hit = 0.0;
  for (int i = 0; i < 190; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    if (d < 0.00035 * t) { hit = 1.0; break; }
    if (t > 6.0) break;
    t += d * 0.38;            // conservative: displacement breaks Lipschitz
  }

  vec3 col = vec3(0.0);
  float alpha = 0.0;

  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec3 n = normal(p);
    vec3 r = reflect(rd, n);

    // Schlick fresnel — the whole look hangs off this term.
    float f = pow(clamp(1.0 - dot(n, -rd), 0.0, 1.0), 5.0);
    f = 0.045 + 0.955 * f;

    // Chromatic dispersion: the three channels reflect at slightly different
    // angles, which is what gives the rim its spectral edge.
    float disp = 0.030 * f;
    vec3 refR = reflect(rd, normalize(n + disp));
    vec3 refB = reflect(rd, normalize(n - disp));
    vec3 reflected = vec3(env(refR).r, env(r).g, env(refB).b);

    // Thin-film interference, narrow and only where the surface turns away.
    float film = fbm(p * 1.9 + uTime * 0.04) * 0.30 + f * 0.55 + uTime * 0.008;
    vec3  tint = mix(vec3(1.0), pal(film), 0.55);

    // Polished metal: the surface reflects across its whole face, and fresnel
    // only brightens the grazing edge. Weighting the reflection *by* fresnel
    // is what killed the previous pass.
    col  = reflected * tint * (0.62 + 0.75 * f);

    // Specular glint off the key.
    vec3 keyDir = normalize(vec3(-0.40, 0.72, 0.45));
    col += vec3(1.0, 0.98, 0.95)
         * pow(clamp(dot(r, keyDir), 0.0, 1.0), 190.0) * 2.2;

    // Spectral rim, tightly confined to the silhouette.
    col += pal(film + 0.42) * pow(f, 3.4) * 0.62;

    col = aces(col * 1.15);
    alpha = 1.0;
  } else {
    // Atmosphere: a soft halo so the object sits in air, not on a cutout.
    float r2 = length(uv);
    float glow = exp(-r2 * 3.1) * 0.20;
    col = mix(vec3(0.55, 0.62, 0.85), pal(uTime * 0.02), 0.35) * glow;
    alpha = glow * 2.2;
  }

  // Load-in: iris open from center.
  float ir = smoothstep(0.0, 1.0, uEnter);
  alpha *= ir;
  col *= ir;

  // Drift and fade slightly as the page scrolls away.
  float away = 1.0 - uScroll * 0.55;
  col *= away;
  alpha *= away;

  outColor = vec4(col, clamp(alpha, 0.0, 1.0));
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

export function Orb({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, "uRes"),
      time: gl.getUniformLocation(prog, "uTime"),
      mouse: gl.getUniformLocation(prog, "uMouse"),
      enter: gl.getUniformLocation(prog, "uEnter"),
      scroll: gl.getUniformLocation(prog, "uScroll"),
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(U.res, canvas.width, canvas.height);
    };

    let target: [number, number] = [0, 0];
    const eased: [number, number] = [0, 0];
    const onMove = (e: PointerEvent) => {
      target = [
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      ];
    };
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(canvas);

    let raf = 0;
    const t0 = performance.now();

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;

      resize();
      const now = (performance.now() - t0) / 1000;

      eased[0] += (target[0] - eased[0]) * 0.05;
      eased[1] += (target[1] - eased[1]) * 0.05;

      const scroll = Math.min(1, window.scrollY / (window.innerHeight || 1));

      gl.uniform1f(U.time, reduced ? 3.0 : now);
      gl.uniform2f(U.mouse, eased[0], eased[1]);
      gl.uniform1f(U.enter, reduced ? 1 : Math.min(1, now / 1.5));
      gl.uniform1f(U.scroll, scroll);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (reduced && now > 0.5) {
        cancelAnimationFrame(raf);
      }
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Fallback keeps the composition intact where WebGL2 is unavailable.
  if (failed) {
    return (
      <div className={`relative ${className}`}>
        <div className="orb aspect-square w-full">
          <div className="orb-shade" />
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", aspectRatio: "1 / 1" }}
    />
  );
}
