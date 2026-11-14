/** Keep the public /book address stable when the scheduling provider changes. */
export const BOOKING = {
  path: "/book/",
  canonicalUrl: "https://connorodea.com/book/",
  schedulingUrl: "https://calendly.com/connorodea/30min",
  title: "Meet with Connor O'Dea",
  durationMinutes: 30,
  email: "connor@odeaworks.com",
} as const;
