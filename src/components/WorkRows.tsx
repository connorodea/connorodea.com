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
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: on ? 1 : 0,
          background: `linear-gradient(90deg, transparent, ${color}12 40%, transparent 80%)`,
        }}
      />

      <div className="relative grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 py-7 sm:grid-cols-[4.5rem_minmax(0,20rem)_1fr_auto]">
        <span className="mono tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className="serif-it text-[2.1rem] leading-none transition-transform duration-500 sm:text-[2.4rem]"
          style={{ transform: on ? "translateX(8px)" : "none" }}
        >
          {p.name}
        </h3>

        <p className="col-span-2 max-w-[44ch] sm:col-span-1">
          <span className="mono text-white/60">{p.tagline}</span>
        </p>

        <div className="col-span-2 flex flex-wrap items-center gap-x-4 gap-y-1 sm:col-span-1 sm:justify-end">
          <span className="flex items-center gap-2">
            <span
              className="h-[5px] w-[5px] shrink-0 rounded-full"
              style={{ background: color }}
            />
            <span className="mono-up" style={{ color }}>
              {DOMAINS[p.domain].label}
            </span>
          </span>
          <span className="mono-up">{STATUS[p.status]}</span>
          <span
            className="mono-up transition-transform duration-500"
            style={{
              color: actionable ? "#fff" : undefined,
              transform: on && actionable ? "translateX(4px)" : "none",
            }}
          >
            {p.caseStudy ? "Read →" : p.repo ? "Code →" : "Private"}
          </span>
        </div>
      </div>

      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-[650ms] ease-[cubic-bezier(.16,1,.3,1)]"
        style={{ background: color, transform: on ? "scaleX(1)" : "scaleX(0)" }}
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
