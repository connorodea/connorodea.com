"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

function LocalTime() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setT(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Denver",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="mono text-white/70 tabular-nums">
      {t ? `Denver — ${t.toLowerCase()}` : "Denver"}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Cinematic 3D centerpiece, full-bleed behind everything */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Legibility scrim — keeps type crisp over the bright object */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 42%, transparent 40%, rgba(0,0,0,0.35) 78%), linear-gradient(to bottom, rgba(0,0,0,0.45), transparent 22%, transparent 62%, rgba(0,0,0,0.72))",
        }}
      />

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[var(--gutter)] py-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-[7px] w-[7px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
            <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-white" />
          </span>
          <span className="mono-up text-white">Connor O&rsquo;Dea</span>
        </div>
        <nav className="hidden gap-8 sm:flex">
          {[
            ["Work", "#work"],
            ["Services", "#capabilities"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="mono-up text-white/60 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Center lockup */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-[var(--gutter)] text-center">
        <p className="mono-up mb-6 text-white/55">
          Applied AI Engineer · Denver
        </p>
        <h1 className="leading-[0.82]">
          <span className="heavy block text-[clamp(3.4rem,15vw,13rem)] text-white">
            CONNOR
          </span>
          <span className="serif-it block text-[clamp(3.4rem,15vw,13rem)] text-white">
            O&rsquo;Dea
          </span>
        </h1>
        <p className="mt-8 max-w-[46ch] text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed text-white/70">
          I build AI-native products end to end — architecture through ship.
          <span className="text-white">
            {" "}
            Forty-six shipped across seven industries
          </span>{" "}
          in the last eight months.
        </p>
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-[var(--gutter)] py-6">
        <LocalTime />
        <div className="hidden items-center gap-2 sm:flex">
          <span className="mono">Scroll</span>
          <span className="scroll-line" aria-hidden />
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com/connorodea"
            className="mono transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href="mailto:connor@odeaworks.com"
            className="mono transition-colors hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
