import type { Metadata } from "next";
import { Archivo, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://connorodea.com"),
  title: "Connor O'Dea — applied AI engineer",
  description:
    "I build AI-native products end to end. Forty-six public repositories across seven domains — video, infrastructure, commerce, health, consumer, real estate, and finance.",
  openGraph: {
    title: "Connor O'Dea — applied AI engineer",
    description:
      "I build AI-native products end to end, across seven domains.",
    url: "https://connorodea.com",
    siteName: "Connor O'Dea",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The inline script below adds `js` to this element before hydration.
      suppressHydrationWarning
      className={`${archivo.variable} ${dmMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* Reveals are gated on this class, so no-JS renders everything. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
