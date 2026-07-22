import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function Shell({ children }: { children: ReactNode }) {
  return <div className="px-[var(--gutter)]">{children}</div>;
}

export function Section({
  id,
  index,
  label,
  title,
  note,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title?: ReactNode;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-6 px-[var(--gutter)] py-24 sm:py-32"
    >
      <Reveal>
        <header className="mb-16 border-t pt-6 sm:mb-20">
          <div className="flex items-baseline justify-between gap-6">
            <div className="flex items-baseline gap-5">
              <span className="index text-white/30 text-[clamp(1.6rem,3vw,2.4rem)]">
                {index}
              </span>
              <span className="mono-up text-white/60">{label}</span>
            </div>
            {note && <span className="mono">{note}</span>}
          </div>
          {title && (
            <h2 className="serif-it mt-8 max-w-[16ch] text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.98] text-white">
              {title}
            </h2>
          )}
        </header>
      </Reveal>
      {children}
    </section>
  );
}
