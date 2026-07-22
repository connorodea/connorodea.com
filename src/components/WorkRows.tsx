"use client";

import Link from "next/link";
import { useState } from "react";
import { DOMAINS, PROJECTS, type Project } from "@/content/projects";

const STATUS: Record<Project["status"], string> = {
  live: "Live",
  beta: "Beta",
  building: "In build",
};

function Row({ p, index }: { p: Project; index: number }) {
  const [on, setOn] = useState(false);
  const color = DOMAINS[p.domain].color;
  const actionable = p.caseStudy || Boolean(p.repo);

  const inner = (
    <>
      {/* Domain-color bloom — the hero's spectral light, echoed on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -inset-y-2 transition-opacity duration-500"
        style={{
          opacity: on ? 1 : 0,
          background: `radial-gradient(60% 120% at 18% 50%, ${color}22, transparent 62%)`,
        }}
      />

      <div className="relative grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4 py-9 sm:grid-cols-[3.5rem_1fr_auto] sm:py-11">
        <span
          className="index text-[1.5rem] transition-colors duration-500"
          style={{ color: on ? color : "rgba(255,255,255,0.28)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="col-span-1">
          <h3
            className="serif-it text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] transition-transform duration-500"
            style={{ transform: on ? "translateX(14px)" : "none" }}
          >
            {p.name}
          </h3>
          <p
            className="mono mt-3 max-w-[52ch] text-[0.8rem] leading-relaxed text-white/45 transition-transform duration-500"
            style={{ transform: on ? "translateX(14px)" : "none" }}
          >
            {p.tagline}
          </p>
        </div>

        <div className="col-span-2 flex flex-wrap items-center gap-x-5 gap-y-1 sm:col-span-1 sm:flex-col sm:items-end sm:gap-y-3">
          <span className="flex items-center gap-2">
            <span
              className="h-[6px] w-[6px] shrink-0 rounded-full transition-shadow duration-500"
              style={{
                background: color,
                boxShadow: on ? `0 0 12px ${color}` : "none",
              }}
            />
            <span className="mono-up" style={{ color }}>
              {DOMAINS[p.domain].label}
            </span>
          </span>
          <div className="flex items-center gap-4">
            <span className="mono-up text-white/40">{STATUS[p.status]}</span>
            <span
              className="mono-up transition-all duration-500"
              style={{
                color: actionable ? "#fff" : "rgba(255,255,255,0.3)",
                transform: on && actionable ? "translateX(5px)" : "none",
              }}
            >
              {p.caseStudy ? "Read →" : p.repo ? "Code →" : "Private"}
            </span>
          </div>
        </div>
      </div>

      {/* Baseline rule that ignites in the domain color on hover */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-[650ms] ease-[cubic-bezier(.16,1,.3,1)]"
        style={{
          background: color,
          transform: on ? "scaleX(1)" : "scaleX(0)",
          boxShadow: on ? `0 0 14px ${color}` : "none",
        }}
      />
    </>
  );

  const props = {
    className: "relative block border-b first:border-t",
    onPointerEnter: () => setOn(true),
    onPointerLeave: () => setOn(false),
    onFocus: () => setOn(true),
    onBlur: () => setOn(false),
  };

  if (p.caseStudy) {
    return (
      <Link href={`/work/${p.slug}/`} {...props}>
        {inner}
      </Link>
    );
  }
  if (p.repo) {
    return (
      <a href={p.repo} target="_blank" rel="noreferrer" {...props}>
        {inner}
      </a>
    );
  }
  return <div {...props}>{inner}</div>;
}

export function WorkRows() {
  return (
    <div>
      {PROJECTS.map((p, i) => (
        <Row key={p.slug} p={p} index={i} />
      ))}
    </div>
  );
}
