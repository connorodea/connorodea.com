"use client";

import { useMemo, useState } from "react";
import { DOMAINS, SHIPS, type Domain } from "@/content/projects";

const LANES = Object.keys(DOMAINS) as Domain[];

type Placed = {
  name: string;
  domain: Domain;
  date: Date;
  url: string;
  lang: string | null;
  stars: number;
  x: number;
  delay: number;
};

/**
 * The shipping log: every recent ship as a mark, positioned by date and
 * grouped into a lane per domain. Density reads as velocity, lane spread
 * reads as range. This is the page's argument, drawn rather than asserted.
 */
export function ShippingLine() {
  const [active, setActive] = useState<Placed | null>(null);

  const { placed, months, span } = useMemo(() => {
    const dated = SHIPS.map((s) => ({ ...s, date: new Date(s.date) }));
    const times = dated.map((d) => d.date.getTime());
    const min = Math.min(...times);
    const max = Math.max(...times);
    const range = max - min || 1;

    const placed: Placed[] = dated
      .map((d) => {
        const x = ((d.date.getTime() - min) / range) * 100;
        return { ...d, x, delay: 0 };
      })
      .sort((a, b) => a.x - b.x)
      .map((d, i) => ({ ...d, delay: i * 26 }));

    // One label per month boundary inside the span.
    const months: { label: string; x: number }[] = [];
    const cursor = new Date(min);
    cursor.setDate(1);
    cursor.setMonth(cursor.getMonth() + 1);
    while (cursor.getTime() < max) {
      months.push({
        label: cursor.toLocaleDateString("en-US", { month: "short" }),
        x: ((cursor.getTime() - min) / range) * 100,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }

    const span = Math.max(1, Math.round(range / 86_400_000 / 30.44));
    return { placed, months, span };
  }, []);

  // Only render lanes that actually carry marks.
  const lanes = LANES.filter((l) => placed.some((p) => p.domain === l));

  return (
    <figure>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t pt-3">
        <span className="mono">
          Shipping log · {SHIPS.length} public repositories · {lanes.length}{" "}
          domains · {span} months
        </span>
        <a
          href="https://github.com/connorodea?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="mono transition-colors hover:text-white"
        >
          Source: github.com/connorodea →
        </a>
      </figcaption>

      <div
        className="relative mt-6 select-none"
        onPointerLeave={() => setActive(null)}
      >
        {lanes.map((lane) => {
          const marks = placed.filter((p) => p.domain === lane);
          return (
            <div
              key={lane}
              className="group relative flex items-center border-b border-dashed py-[7px] last:border-b-0"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <span
                className="mono-up w-0 shrink-0 overflow-hidden whitespace-nowrap opacity-0 transition-[width,opacity] duration-500 sm:w-[132px] sm:opacity-100"
                style={{ color: DOMAINS[lane].color }}
              >
                {DOMAINS[lane].label}
              </span>

              <div className="relative mx-[6px] h-4 flex-1">
                {marks.map((m) => {
                  const on = active?.name === m.name;
                  return (
                    <a
                      key={m.name}
                      href={m.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} on GitHub — ${DOMAINS[lane].label}, last shipped ${m.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                      onPointerEnter={() => setActive(m)}
                      onFocus={() => setActive(m)}
                      onBlur={() => setActive(null)}
                      className="absolute top-0 h-4 w-[10px] -translate-x-1/2"
                      style={{ left: `${m.x}%` }}
                    >
                      <span
                        className="mark block h-full w-[2px] origin-bottom rounded-[1px] transition-[transform,opacity] duration-300"
                        style={{
                          background: DOMAINS[lane].color,
                          opacity: on ? 1 : 0.62,
                          transform: on ? "scaleY(1)" : "scaleY(0.62)",
                          animationDelay: `${m.delay}ms`,
                        }}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Month axis */}
        <div className="relative mt-3 h-4 border-t sm:ml-[132px]">
          {months.map((m) => (
            <span
              key={m.label + m.x}
              className="mono absolute top-1.5 -translate-x-1/2"
              style={{ left: `${m.x}%` }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Readout — fixed slot, so hovering never shifts layout */}
        <div className="mt-6 flex h-5 flex-wrap items-center gap-x-3 gap-y-1 border-t pt-4 sm:ml-[132px]">
          {active ? (
            <>
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ background: DOMAINS[active.domain].color }}
              />
              <span className="serif-it text-[1.15rem] text-white">{active.name}</span>
              <span className="mono">
                {active.date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {active.lang && <span className="mono">{active.lang}</span>}
              {active.stars > 0 && (
                <span className="mono">★ {active.stars}</span>
              )}
              <span className="mono text-white">Open on GitHub →</span>
            </>
          ) : (
            <span className="mono">Hover a mark — every one links to its repository</span>
          )}
        </div>
      </div>

      <style>{`
        .mark { animation: markIn 520ms cubic-bezier(.16,1,.3,1) backwards; }
        @keyframes markIn {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(.62); opacity: .62; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mark { animation: none; }
        }
      `}</style>
    </figure>
  );
}
