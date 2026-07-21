import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-between px-[var(--gutter)] py-8">
      <p className="mono-up text-white">Connor O&rsquo;Dea</p>

      <div>
        <p className="mono-up">Error 404</p>
        <h1 className="serif-it mt-4 text-[clamp(2.6rem,9vw,6rem)] leading-[0.95]">
          This page was never shipped.
        </h1>
        <p className="mono mt-6 max-w-[46ch] text-white/60">
          The address does not match anything on this site. The work that does
          exist is on the home page.
        </p>
        <Link
          href="/"
          className="mono-up mt-10 inline-block text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-white"
        >
          Back to the start →
        </Link>
      </div>

      <p className="mono">© 2026</p>
    </main>
  );
}
