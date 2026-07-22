import Image from "next/image";
import { Hero } from "@/components/Hero";
import { ShippingLine } from "@/components/ShippingLine";
import { WorkRows } from "@/components/WorkRows";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

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
    <>
      {/* Ambient spectral light spilling from the hero into the page below */}
      <div className="aura" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <main className="relative z-10">
        <Hero />

        {/* ── Shipping log ───────────────────────────────────────────── */}
        <Section
          id="log"
          index="01"
          label="The log"
          title={
            <>
              Forty-six shipped,
              <br />
              seven industries.
            </>
          }
          note="Live from GitHub"
        >
          <Reveal>
            <ShippingLine />
          </Reveal>
        </Section>

        {/* ── Work ───────────────────────────────────────────────────── */}
        <Section
          id="work"
          index="02"
          label="Selected work"
          title={<>The evidence.</>}
          note="Eight of forty-six"
        >
          <WorkRows />
        </Section>

        {/* ── Capabilities ───────────────────────────────────────────── */}
        <Section
          id="capabilities"
          index="03"
          label="What I do"
          title={<>What I can build for you.</>}
        >
          <dl className="grid gap-x-14 gap-y-16 sm:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.k} delay={i * 100}>
                <dt className="index mb-6 block text-[1.4rem] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </dt>
                <p className="serif-it text-[clamp(1.7rem,2.6vw,2.3rem)] leading-[1.05] text-white">
                  {c.k}
                </p>
                <p className="mono mt-5 text-[0.82rem] leading-[1.9] text-white/50">
                  {c.v}
                </p>
              </Reveal>
            ))}
          </dl>
        </Section>

        {/* ── About ──────────────────────────────────────────────────── */}
        <Section id="about" index="04" label="About">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
            <Reveal>
              <div className="space-y-8">
                <p className="serif-it text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-white">
                  I am an engineer who ships.
                </p>
                <div className="max-w-[54ch] space-y-5">
                  <p className="mono text-[0.85rem] leading-[1.95] text-white/55">
                    Most of what I build starts as a problem I ran into myself,
                    or watched somebody else lose a week to, and ends as
                    software that is actually deployed and actually used.
                  </p>
                  <p className="mono text-[0.85rem] leading-[1.95] text-white/55">
                    The range is deliberate. Working across video,
                    infrastructure, commerce, health, consumer, real estate, and
                    finance means the patterns start to rhyme — a retrieval
                    problem in litigation looks a lot like one in property data,
                    and the solution carries over. That is where the speed comes
                    from. Not shortcuts, transfer.
                  </p>
                  <p className="mono text-[0.85rem] leading-[1.95] text-white">
                    If you are building something and the hard part is that it
                    has never been built before, that is the work I want.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex flex-col gap-8">
                <div className="w-[148px]">
                  <div className="relative overflow-hidden border">
                    <Image
                      src="/connor.jpg"
                      alt="Connor O'Dea"
                      width={460}
                      height={460}
                      className="w-full grayscale contrast-[1.1] brightness-[.95]"
                    />
                  </div>
                </div>
                <dl className="space-y-3 border-t pt-5">
                  {FACTS.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6">
                      <dt className="mono-up">{k}</dt>
                      <dd className="mono text-right text-white/70">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ── Contact ────────────────────────────────────────────────── */}
        <section
          id="contact"
          className="relative px-[var(--gutter)] pt-24 pb-20 sm:pt-32"
        >
          <Reveal>
            <div className="border-t pt-12">
              <p className="mono-up text-white/50">
                05 — Start a conversation
              </p>
              <a
                href="mailto:connor@odeaworks.com"
                className="group mt-10 block"
              >
                <span className="serif-it block text-[clamp(2.6rem,10vw,8rem)] leading-[0.95] text-white transition-transform duration-500 group-hover:translate-x-3">
                  Let&rsquo;s build
                  <br />
                  something.
                </span>
                <span className="mono-up mt-8 inline-block text-white/60 transition-colors group-hover:text-white">
                  connor@odeaworks.com →
                </span>
              </a>
            </div>
          </Reveal>

          <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
            <span className="mono">© 2026 Connor O&rsquo;Dea · Denver, CO</span>
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
    </>
  );
}
