import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES, DOMAINS, PROJECTS } from "@/content/projects";
import { CASE_STUDY_BODIES } from "@/content/caseStudies";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — Connor O'Dea`, description: p.tagline };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  const body = CASE_STUDY_BODIES[slug];
  if (!p || !body) notFound();

  const color = DOMAINS[p.domain].color;
  const idx = CASE_STUDIES.findIndex((x) => x.slug === slug);
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  return (
    <>
      {/* Ambient spectral light, tinted toward the project's domain color */}
      <div className="aura" aria-hidden>
        <span style={{ background: `radial-gradient(circle, ${color}, transparent 68%)` }} />
        <span />
        <span style={{ background: `radial-gradient(circle, ${color}, transparent 68%)` }} />
      </div>

      <main className="relative z-10 px-[var(--gutter)]">
        <header className="flex items-center justify-between border-b py-6">
          <Link href="/" className="mono-up transition-colors hover:text-white">
            ← Connor O&rsquo;Dea
          </Link>
          <span className="mono-up" style={{ color }}>
            {DOMAINS[p.domain].label}
          </span>
        </header>

        <article className="pt-20 pb-24 sm:pt-28">
          <Reveal>
            <span className="mono-up text-white/50">
              {p.year} · {p.status === "live" ? "Live" : "In build"}
            </span>
            <h1 className="serif-it mt-6 text-[clamp(3.2rem,13vw,10rem)] leading-[0.9] text-white">
              {p.name}
            </h1>
            <p className="mono mt-8 max-w-[54ch] text-[0.9rem] leading-[1.8] text-white/60">
              {p.tagline}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-b py-6">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {p.stack.map((s) => (
                  <span key={s} className="mono-up text-white/60">
                    {s}
                  </span>
                ))}
              </div>
              {p.repo ? (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="mono-up transition-colors hover:text-white"
                  style={{ color }}
                >
                  View source →
                </a>
              ) : (
                <span className="mono-up text-white/40">Private repository</span>
              )}
            </div>
          </Reveal>

          <div className="mt-24 grid gap-16 lg:grid-cols-[minmax(0,62ch)_1fr] lg:gap-24">
            <div className="space-y-20">
              <Reveal>
                <h2 className="index mb-6 block text-[1.4rem] text-white/30">01</h2>
                <p className="serif-it mb-6 text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] text-white">
                  The problem
                </p>
                <p className="mono text-[0.9rem] leading-[1.95] text-white/60">
                  {body.problem}
                </p>
              </Reveal>

              <Reveal>
                <h2 className="index mb-6 block text-[1.4rem] text-white/30">02</h2>
                <p className="serif-it mb-8 text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] text-white">
                  The approach
                </p>
                <ol className="space-y-7">
                  {body.approach.map((a, i) => (
                    <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
                      <span className="index text-white/30 text-[1rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mono text-[0.9rem] leading-[1.95] text-white/60">
                        {a}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal>
                <h2 className="index mb-6 block text-[1.4rem] text-white/30">03</h2>
                <p className="serif-it mb-6 text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] text-white">
                  What it taught me
                </p>
                <p
                  className="mono border-l-2 pl-6 text-[0.9rem] leading-[1.95] text-white/80"
                  style={{ borderColor: color }}
                >
                  {body.learned}
                </p>
              </Reveal>
            </div>

            <Reveal delay={80} className="self-start">
              <h2 className="mono-up mb-6 text-white/50">Architecture</h2>
              <dl className="space-y-5 border-t pt-6">
                {body.architecture.map((a) => (
                  <div key={a.k}>
                    <dt className="mono-up" style={{ color }}>
                      {a.k}
                    </dt>
                    <dd className="mono mt-2 text-[0.85rem] leading-[1.8] text-white/55">
                      {a.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </article>

        <Link href={`/work/${next.slug}/`} className="group block border-t py-16">
          <span className="mono-up text-white/50">Next project</span>
          <span className="serif-it mt-4 block text-[clamp(2.6rem,9vw,6rem)] leading-[0.95] text-white transition-transform duration-500 group-hover:translate-x-3">
            {next.name} →
          </span>
        </Link>

        <footer className="flex items-center justify-between border-t py-8">
          <Link href="/" className="mono-up transition-colors hover:text-white">
            ← All work
          </Link>
          <span className="mono">© 2026 Connor O&rsquo;Dea</span>
        </footer>
      </main>
    </>
  );
}
