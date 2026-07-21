import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES, DOMAINS, PROJECTS } from "@/content/projects";
import { CASE_STUDY_BODIES } from "@/content/caseStudies";
import { Shell } from "@/components/Section";
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
  return {
    title: `${p.name} — Connor O'Dea`,
    description: p.tagline,
  };
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
    <main>
      <Shell>
        <header className="flex items-center justify-between border-b py-6">
          <Link href="/" className="mono transition-colors hover:text-white">
            ← Connor O&rsquo;Dea
          </Link>
          <span className="mono" style={{ color }}>
            {DOMAINS[p.domain].label}
          </span>
        </header>

        <article className="pt-16 pb-24 sm:pt-24">
          <Reveal>
            <span className="mono-up">
              {p.year} · {p.status === "live" ? "Live" : "In build"}
            </span>
            <h1 className="serif-it mt-5 text-[clamp(2.8rem,9vw,6.4rem)] leading-[0.95]">
              {p.name}
            </h1>
            <p className="mono mt-7 max-w-[52ch] text-white/70">
              {p.tagline}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-b py-5">
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {p.stack.map((s) => (
                  <span key={s} className="mono">
                    {s}
                  </span>
                ))}
              </div>
              {p.repo ? (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="mono transition-colors hover:text-white"
                >
                  View source →
                </a>
              ) : (
                <span className="mono">Private repository</span>
              )}
            </div>
          </Reveal>

          <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(0,60ch)_1fr] lg:gap-24">
            <div className="space-y-16">
              <Reveal>
                <h2 className="mono-up mb-5 text-white">Problem</h2>
                <p className="mono text-white/70">{body.problem}</p>
              </Reveal>

              <Reveal>
                <h2 className="mono-up mb-5 text-white">Approach</h2>
                <ol className="space-y-6">
                  {body.approach.map((a, i) => (
                    <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-3">
                      <span className="mono tabular-nums pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mono text-white/70">{a}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal>
                <h2 className="mono-up mb-5 text-white">What it taught me</h2>
                <p
                  className="mono border-l-2 pl-6 text-white/85"
                  style={{ borderColor: color }}
                >
                  {body.learned}
                </p>
              </Reveal>
            </div>

            <Reveal delay={80} className="self-start">
              <h2 className="mono-up mb-5 text-white">Architecture</h2>
              <dl className="space-y-4 border-t pt-5">
                {body.architecture.map((a) => (
                  <div key={a.k}>
                    <dt className="mono-up" style={{ color }}>
                      {a.k}
                    </dt>
                    <dd className="mono mt-1 text-white/60">{a.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </article>

        <Link
          href={`/work/${next.slug}/`}
          className="group block border-t py-12"
        >
          <span className="mono-up">Next</span>
          <span className="serif-it mt-3 block text-[clamp(2rem,6vw,3.6rem)] transition-transform duration-500 group-hover:translate-x-2">
            {next.name} →
          </span>
        </Link>

        <footer className="py-9">
          <Link href="/" className="mono transition-colors hover:text-white">
            ← All work
          </Link>
        </footer>
      </Shell>
    </main>
  );
}
