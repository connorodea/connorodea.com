"use client";

import { useEffect, useState } from "react";
import { Orb } from "@/components/Orb";

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
      {t ? `MST ${t.toLowerCase()}` : "MST"}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative px-[var(--gutter)] pt-6 pb-14 lg:min-h-[100svh] lg:pb-8">
      {/* Micro-grid header */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-b pb-6 sm:grid-cols-4 sm:gap-y-7 sm:pb-7">
        <div>
          <p className="mono-up text-white">Connor</p>
          <p className="mono-up text-white">O&rsquo;Dea</p>
        </div>

        <div>
          <p className="mono">Available for select work:</p>
          <a
            href="mailto:connor@odeaworks.com"
            className="mono text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
          >
            connor@odeaworks.com
          </a>
        </div>

        <div className="hidden sm:block">
          <p className="mono">TypeScript, Python, Swift</p>
          <p className="mono">Next.js, Hono, FastAPI</p>
          <p className="mono">Claude, MCP, Postgres</p>
          <p className="mono">Cloudflare, Hetzner</p>
        </div>

        <nav className="flex flex-col items-start">
          <a href="#work" className="mono transition-colors hover:text-white">
            Work
          </a>
          <a
            href="#capabilities"
            className="mono transition-colors hover:text-white"
          >
            Services
          </a>
          <a href="#about" className="mono transition-colors hover:text-white">
            About
          </a>
          <a
            href="#contact"
            className="mono transition-colors hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Stage */}
      <div className="relative mt-[clamp(1.5rem,6vh,4rem)] grid items-center gap-y-9 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-8 lg:gap-y-14">
        {/* Lockup */}
        <h1 className="relative z-10 order-2 lg:order-1">
          <span className="serif-it block whitespace-nowrap text-[clamp(2.9rem,6.6vw,5.6rem)] leading-[0.95]">
            Applied AI
          </span>
          <span className="heavy block whitespace-nowrap text-[clamp(2.5rem,5.8vw,4.9rem)]">
            ENGINEER.
          </span>
        </h1>

        {/* Orb */}
        <div className="order-1 w-[clamp(200px,54vw,560px)] justify-self-center lg:order-2">
          <Orb />
        </div>

        {/* Bio */}
        <div className="order-3 max-w-[38ch] justify-self-start lg:justify-self-end">
          <p className="mono text-white/80">
            Hi, I&rsquo;m Connor O&rsquo;Dea, a Denver-based{" "}
            <span className="text-white">software engineer</span> building{" "}
            <span className="text-white">AI-native products</span>.
          </p>
          <p className="mono mt-4 text-white/60">
            I take products from nothing to deployed — architecture through
            ship. Forty-six public repositories across{" "}
            <span className="text-white">seven industries</span> in the last
            eight months, and the log below is the whole argument.
          </p>
        </div>
      </div>

      {/* Mobile: the desktop strip is absolutely positioned, so mobile gets
          its own inline version rather than nothing. */}
      <div className="mt-12 flex items-end justify-between border-t pt-4 sm:hidden">
        <div>
          <p className="mono">Local time</p>
          <LocalTime />
        </div>
        <div className="flex flex-col items-end">
          <a href="https://github.com/connorodea" className="mono">GitHub</a>
          <a href="https://odeaworks.com" className="mono">Odea Works</a>
          <a href="https://preecursor.com" className="mono">Preecursor</a>
        </div>
      </div>

      {/* Footer strip */}
      <div className="absolute right-[var(--gutter)] bottom-8 left-[var(--gutter)] hidden grid-cols-3 items-end sm:grid">
        <div>
          <p className="mono">Local time</p>
          <LocalTime />
        </div>

        <div className="flex flex-col items-center">
          <a
            href="https://github.com/connorodea"
            className="mono transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://odeaworks.com"
            className="mono transition-colors hover:text-white"
          >
            Odea Works
          </a>
          <a
            href="https://preecursor.com"
            className="mono transition-colors hover:text-white"
          >
            Preecursor
          </a>
        </div>

        <p className="mono justify-self-end text-right">
          © 2026
          <br />
          Connor O&rsquo;Dea
        </p>
      </div>
    </section>
  );
}
