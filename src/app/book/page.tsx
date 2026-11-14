import type { Metadata } from "next";
import Image from "next/image";
import { BookingCalendar } from "@/components/BookingCalendar";
import { BOOKING } from "@/content/booking";

const description =
  "Book a 30-minute conversation with Connor O'Dea about what you're building, a potential collaboration, or an idea worth exploring.";

export const metadata: Metadata = {
  title: `${BOOKING.title} — book a conversation`,
  description,
  alternates: { canonical: BOOKING.canonicalUrl },
  openGraph: {
    title: BOOKING.title,
    description,
    url: BOOKING.canonicalUrl,
    siteName: "Connor O'Dea",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: BOOKING.title,
    description,
    images: ["/og.png"],
  },
};

export default function BookingPage() {
  return (
    <div className="relative min-h-screen px-[var(--gutter)]">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 border-b py-6">
        <a
          href="/"
          className="font-mono text-xs tracking-[0.14em] text-white uppercase"
        >
          Connor O&rsquo;Dea
        </a>
        <a
          href="/"
          className="font-mono text-xs text-white/65 transition-colors hover:text-white"
        >
          <span aria-hidden="true">← </span>Back to portfolio
        </a>
      </header>

      <main className="mx-auto grid max-w-[1440px] gap-12 pt-12 pb-16 sm:pt-16 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-16 xl:pt-20">
        <section aria-labelledby="booking-title" className="min-w-0">
          <div className="mb-8 flex items-center gap-4">
            <Image
              src="/connor.jpg"
              alt=""
              width={64}
              height={64}
              className="border grayscale"
            />
            <p className="font-mono text-xs leading-relaxed tracking-[0.12em] text-white/65 uppercase">
              Let&rsquo;s connect
              <span className="mt-1 block text-white/85">Denver, Colorado</span>
            </p>
          </div>

          <h1 id="booking-title" className="text-white">
            <span className="serif-it block text-[clamp(2.6rem,4.8vw,4rem)] leading-none">
              Meet with
            </span>
            <span className="heavy mt-4 block text-[clamp(3.8rem,6vw,5.5rem)]">
              Connor
            </span>
            <span className="serif-it mt-1 block text-[clamp(3.8rem,6vw,5.5rem)] leading-none">
              O&rsquo;Dea.
            </span>
          </h1>

          <p className="mt-7 max-w-[38ch] text-base leading-relaxed text-white/70">
            A 30-minute conversation about what you&rsquo;re building, a
            potential collaboration, or an idea worth exploring.
          </p>

          <dl className="mt-9 max-w-[380px] border-y py-5">
            <div className="flex items-center justify-between gap-6">
              <dt className="font-mono text-xs tracking-wide text-white/65 uppercase">
                Duration
              </dt>
              <dd className="text-sm text-white">{BOOKING.durationMinutes} minutes</dd>
            </div>
          </dl>

          <div className="mt-8">
            <p className="text-sm text-white/65">Prefer to start with an email?</p>
            <a
              href={`mailto:${BOOKING.email}`}
              className="mt-2 inline-block break-all text-sm text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            >
              {BOOKING.email}
            </a>
          </div>
        </section>

        <section aria-labelledby="calendar-title" className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <h2 id="calendar-title" className="text-lg font-medium text-white">
              Choose a date and time
            </h2>
            <a
              href={BOOKING.schedulingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              aria-label="Open Connor O'Dea's booking page in a new tab"
            >
              Open booking page <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="-mx-[var(--gutter)] bg-white sm:mx-0 sm:border">
            <BookingCalendar url={BOOKING.schedulingUrl} />
          </div>
          <p className="mt-4 font-mono text-[0.7rem] leading-relaxed text-white/65">
            Scheduling provided by Calendly. You can adjust your time zone in the calendar.
          </p>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 border-t py-6 font-mono text-xs text-white/65">
        <span>Connor O&rsquo;Dea</span>
        <a href="/" className="transition-colors hover:text-white">
          connorodea.com <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  );
}
