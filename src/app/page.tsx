import Image from "next/image";
import { Hero } from "@/components/Hero";
import { ShippingLine } from "@/components/ShippingLine";
import { WorkRows } from "@/components/WorkRows";
import { Reveal } from "@/components/Reveal";
import { Section, Shell } from "@/components/Section";

const CAPABILITIES = [
  {
    k: "Zero to shipped",
    v: "You have a product that does not exist yet. I take it from a conversation to something in front of users — architecture, build, deploy, and the unglamorous parts in between.",
  },
  {
    k: "AI where it earns its place",
    v: "Retrieval, agents, and model pipelines built into a product because they make it work better, not because they are on the roadmap. I have shipped enough of these to know which ones do not pay off.",
  },
  {
    k: "Systems that outlive the demo",
    v: "Real deploys, real monitoring, real data models. The difference between a prototype that impresses and software that runs is mostly work nobody sees.",
  },
];

const FACTS: [string, string][] = [
  ["Based", "Denver, Colorado"],
  ["Focus", "Applied AI, 0→1 product"],
  ["Domains", "Seven, and counting"],
  ["Also", "odeaworks.com, preecursor.com"],
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* ── Shipping log ─────────────────────────────────────────────── */}
      <Section id="log" label="The log">
        <Reveal>
          <ShippingLine />
        </Reveal>
      </Section>

      {/* ── Work ─────────────────────────────────────────────────────── */}
      <Section id="work" label="Selected work" note="Eight of forty-six">
        <WorkRows />
      </Section>

      {/* ── Capabilities ─────────────────────────────────────────────── */}
      <Section id="capabilities" label="What I do">
        <dl className="grid gap-x-14 gap-y-12 sm:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.k} delay={i * 90}>
              <dt className="serif-it text-[2.1rem] leading-tight text-white">{c.k}</dt>
              <dd className="mono mt-4 text-[0.82rem] leading-[1.9] text-white/55">{c.v}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <Section id="about" label="About">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[auto_minmax(0,56ch)_1fr] lg:gap-16">
            <div className="w-[132px] shrink-0">
              <div className="relative overflow-hidden border">
                <Image
                  src="/connor.jpg"
                  alt="Connor O'Dea"
                  width={460}
                  height={460}
                  className="w-full grayscale contrast-[1.1] brightness-[.95]"
                />
              </div>
              <p className="mono mt-2 border-t pt-2">Denver, CO</p>
            </div>

            <div className="space-y-5">
              <p className="serif-it text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.15] text-white">
                I am an engineer who ships.
              </p>
              <p className="mono text-[0.82rem] leading-[1.9] text-white/55">
                Most of what I build starts as a problem I ran into myself, or
                watched somebody else lose a week to, and ends as software that
                is actually deployed and actually used.
              </p>
              <p className="mono text-[0.82rem] leading-[1.9] text-white/55">
                The range is deliberate. Working across video, infrastructure,
                commerce, health, consumer, real estate, and finance means the
                patterns start to rhyme — a retrieval problem in litigation
                looks a lot like one in property data, and the solution carries
                over. That is where the speed comes from. Not shortcuts,
                transfer.
              </p>
              <p className="mono text-[0.82rem] leading-[1.9] text-white">
                If you are building something and the hard part is that it has
                never been built before, that is the work I want.
              </p>
            </div>

            <dl className="space-y-3 self-start border-t pt-4">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6">
                  <dt className="mono-up">{k}</dt>
                  <dd className="mono text-right text-white/70">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="px-[var(--gutter)] pt-16 pb-20">
        <Reveal>
          <a href="mailto:connor@odeaworks.com" className="group block border-t pt-10">
            <span className="mono-up">Start a conversation</span>
            <span className="serif-it mt-5 block text-[clamp(2.4rem,8vw,6rem)] leading-[1.05] transition-transform duration-500 group-hover:translate-x-2">
              connor@odeaworks.com
            </span>
          </a>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <span className="mono">© 2026 Connor O&rsquo;Dea</span>
          <div className="flex gap-7">
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
        </div>
      </section>
    </main>
  );
}
