"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: HTMLElement;
      resize: boolean;
    }) => void;
  };
};

/** Official inline embed; no calendar data or booking form passes through this site. */
export function BookingCalendar({ url }: { url: string }) {
  const container = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [failed, setFailed] = useState(false);

  const initialize = useCallback(() => {
    const calendly = (window as CalendlyWindow).Calendly;
    if (!container.current || initialized.current) return;
    if (!calendly) {
      setFailed(true);
      return;
    }

    try {
      // The page provides the name and duration; retain Calendly's cookie controls.
      const embedUrl = new URL(url);
      embedUrl.searchParams.set("hide_event_type_details", "1");
      calendly.initInlineWidget({
        url: embedUrl.toString(),
        parentElement: container.current,
        resize: true,
      });
      initialized.current = true;
      const frame = container.current.querySelector("iframe");
      if (frame) frame.title = "Choose a meeting time with Connor O'Dea";
    } catch {
      setFailed(true);
    }
  }, [url]);

  return (
    <>
      <Script
        id="calendly-booking-widget"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={initialize}
        onError={() => setFailed(true)}
      />
      {failed ? (
        <p role="status" className="px-7 py-14 text-center text-base leading-relaxed text-black/70">
          The calendar couldn&rsquo;t load here. Use the booking-page link above
          to choose a time.
        </p>
      ) : (
        <div
          id="booking-calendar"
          ref={container}
          className="w-full"
          style={{ minWidth: 320, height: 740 }}
          aria-label="Meeting availability"
          data-lenis-prevent
        />
      )}
      <noscript>
        <style>{"#booking-calendar { display: none; }"}</style>
        <p className="px-7 py-10 text-center text-base leading-relaxed text-black/70">
          Open the booking-page link above to choose a time.
        </p>
      </noscript>
    </>
  );
}
