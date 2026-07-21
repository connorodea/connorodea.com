import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return <div className="px-[var(--gutter)]">{children}</div>;
}

export function Section({
  id,
  label,
  note,
  children,
}: {
  id: string;
  label: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 px-[var(--gutter)] py-16 sm:py-24">
      <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t pt-4">
        <h2 className="mono-up text-white">{label}</h2>
        {note && <span className="mono">{note}</span>}
      </div>
      {children}
    </section>
  );
}
