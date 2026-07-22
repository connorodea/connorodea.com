export type Domain =
  | "video"
  | "legal"
  | "commerce"
  | "infra"
  | "finance"
  | "realestate"
  | "health"
  | "consumer";

export const DOMAINS: Record<Domain, { label: string; color: string }> = {
  video: { label: "Video / Media", color: "#FFD9A8" },
  infra: { label: "Infrastructure", color: "#B6FFD5" },
  commerce: { label: "Commerce", color: "#A8F0FF" },
  legal: { label: "Legal", color: "#B9A8FF" },
  realestate: { label: "Real Estate", color: "#9FB0FF" },
  health: { label: "Health", color: "#FFB0E6" },
  finance: { label: "Finance", color: "#E8FF9E" },
  consumer: { label: "Consumer", color: "#FFC2A8" },
};
/**
 * Every mark on the shipping line. Generated from public, non-fork repos on
 * github.com/connorodea. `date` is the repo's most recent push, which is what
 * the graphic actually claims - a ship, not a start or a launch.
 *
 * QuickLotz / QuickBidz repositories are excluded under the litigation hold.
 */
export type Ship = {
  name: string;
  domain: Domain;
  date: string;
  url: string;
  lang: string | null;
  stars: number;
};

export const SHIPS: Ship[] = [
  { name: "ClipsMachine", domain: "video", date: "2025-11-19", url: "https://github.com/connorodea/ClipsMachine", lang: "Python", stars: 0 },
  { name: "Faceless YT", domain: "video", date: "2025-11-29", url: "https://github.com/connorodea/ai-faceless-yt", lang: "Python", stars: 1 },
  { name: "UPC Scrapers", domain: "commerce", date: "2025-12-08", url: "https://github.com/connorodea/upc-database-scrapers", lang: "TypeScript", stars: 0 },
  { name: "RE Assistant", domain: "realestate", date: "2025-12-22", url: "https://github.com/connorodea/AIrealestateassistant", lang: "Python", stars: 0 },
  { name: "Pinintel", domain: "commerce", date: "2025-12-23", url: "https://github.com/connorodea/Pinintel", lang: "TypeScript", stars: 0 },
  { name: "Medscribd", domain: "health", date: "2026-01-22", url: "https://github.com/connorodea/medscribd", lang: "TypeScript", stars: 0 },
  { name: "Medscribd UI", domain: "health", date: "2026-01-25", url: "https://github.com/connorodea/medscribd-agent-ui", lang: "TypeScript", stars: 0 },
  { name: "Inquizit", domain: "consumer", date: "2026-01-25", url: "https://github.com/connorodea/inquizit", lang: "TypeScript", stars: 0 },
  { name: "Upscale Dist", domain: "commerce", date: "2026-01-29", url: "https://github.com/connorodea/upscaledist.com", lang: "TypeScript", stars: 0 },
  { name: "VideoCallSync", domain: "video", date: "2026-01-31", url: "https://github.com/connorodea/videocallsync", lang: "TypeScript", stars: 0 },
  { name: "RateMyPsych", domain: "health", date: "2026-01-31", url: "https://github.com/connorodea/ratemypsych.com", lang: "TypeScript", stars: 0 },
  { name: "AgentAgent", domain: "infra", date: "2026-02-11", url: "https://github.com/connorodea/AgentAgent", lang: "Shell", stars: 1 },
  { name: "Clawd Hub", domain: "infra", date: "2026-04-04", url: "https://github.com/connorodea/clawd-hub", lang: "Python", stars: 0 },
  { name: "AdPilot", domain: "commerce", date: "2026-04-07", url: "https://github.com/connorodea/adpilot", lang: "TypeScript", stars: 1 },
  { name: "BreatheEasy", domain: "health", date: "2026-04-11", url: "https://github.com/connorodea/BreatheEasy", lang: "Swift", stars: 0 },
  { name: "SpendWise", domain: "finance", date: "2026-04-11", url: "https://github.com/connorodea/SpendWise", lang: "Swift", stars: 0 },
  { name: "FocusFlow", domain: "consumer", date: "2026-04-11", url: "https://github.com/connorodea/FocusFlow", lang: "Swift", stars: 0 },
  { name: "PhotoGlowAI", domain: "consumer", date: "2026-04-11", url: "https://github.com/connorodea/PhotoGlowAI", lang: "Swift", stars: 0 },
  { name: "ScanMasterPro", domain: "consumer", date: "2026-04-11", url: "https://github.com/connorodea/ScanMasterPro", lang: "Swift", stars: 0 },
  { name: "Blog System", domain: "infra", date: "2026-04-11", url: "https://github.com/connorodea/ai-blog-system", lang: "Python", stars: 0 },
  { name: "PaywallScraper", domain: "infra", date: "2026-04-11", url: "https://github.com/connorodea/PaywallScraper", lang: "Python", stars: 0 },
  { name: "CartAI", domain: "commerce", date: "2026-04-13", url: "https://github.com/connorodea/cartai", lang: "TypeScript", stars: 0 },
  { name: "Lead Finder", domain: "realestate", date: "2026-04-14", url: "https://github.com/connorodea/wholesale-lead-finder", lang: "Python", stars: 0 },
  { name: "Website Builder", domain: "infra", date: "2026-04-14", url: "https://github.com/connorodea/premium-website-builder", lang: "JavaScript", stars: 0 },
  { name: "Transcript Analyzer", domain: "video", date: "2026-04-14", url: "https://github.com/connorodea/youtube-transcript-analyzer", lang: "JavaScript", stars: 0 },
  { name: "LiqOS", domain: "infra", date: "2026-04-15", url: "https://github.com/connorodea/LiqOS", lang: "TypeScript", stars: 0 },
  { name: "OpenHarness", domain: "infra", date: "2026-04-16", url: "https://github.com/connorodea/OpenHarness", lang: "Python", stars: 0 },
  { name: "Marketplace Car Flipping", domain: "commerce", date: "2026-04-17", url: "https://github.com/connorodea/FacebookMarketplaceCarFlipping", lang: "Python", stars: 0 },
  { name: "AIVidio", domain: "video", date: "2026-04-23", url: "https://github.com/connorodea/aividio", lang: "Python", stars: 6 },
  { name: "Ryvio AI", domain: "video", date: "2026-04-25", url: "https://github.com/connorodea/ryvio-ai", lang: "HTML", stars: 0 },
  { name: "AuditIQ", domain: "infra", date: "2026-04-27", url: "https://github.com/connorodea/auditiq", lang: "Python", stars: 0 },
  { name: "Supply Pulse", domain: "commerce", date: "2026-04-28", url: "https://github.com/connorodea/supply-pulse", lang: "TypeScript", stars: 0 },
  { name: "MS Ads Manager", domain: "commerce", date: "2026-04-29", url: "https://github.com/connorodea/microsoft-ads-manager", lang: "Python", stars: 0 },
  { name: "YT Auto", domain: "video", date: "2026-04-29", url: "https://github.com/connorodea/ytauto", lang: "Python", stars: 0 },
  { name: "Framewright", domain: "video", date: "2026-05-15", url: "https://github.com/connorodea/framewright", lang: null, stars: 0 },
  { name: "SPY CLI", domain: "finance", date: "2026-06-02", url: "https://github.com/connorodea/spycli", lang: "Python", stars: 0 },
  { name: "SonyOBS", domain: "video", date: "2026-06-10", url: "https://github.com/connorodea/sonyobs", lang: "Python", stars: 0 },
  { name: "Odea Works", domain: "infra", date: "2026-06-10", url: "https://github.com/connorodea/odeaworks.com", lang: "Astro", stars: 0 },
  { name: "Shopify Scraper", domain: "commerce", date: "2026-06-12", url: "https://github.com/connorodea/ShopifyScraper", lang: "Python", stars: 0 },
  { name: "GeoStamp", domain: "commerce", date: "2026-06-16", url: "https://github.com/connorodea/geostamp", lang: "HTML", stars: 0 },
  { name: "Cutroom", domain: "video", date: "2026-06-18", url: "https://github.com/connorodea/cutroom", lang: "TypeScript", stars: 0 },
  { name: "ScreenRec Studio", domain: "video", date: "2026-06-22", url: "https://github.com/connorodea/screenrec-studio", lang: "TypeScript", stars: 0 },
  { name: "Reelwire", domain: "video", date: "2026-06-22", url: "https://github.com/connorodea/reelwire", lang: null, stars: 0 },
  { name: "Python Mastery CLI", domain: "infra", date: "2026-06-28", url: "https://github.com/connorodea/python-mastery-cli", lang: "Python", stars: 0 },
  { name: "Preecursor", domain: "infra", date: "2026-07-10", url: "https://github.com/connorodea/preecursor", lang: "TypeScript", stars: 0 },
  { name: "AIWholesail", domain: "realestate", date: "2026-07-21", url: "https://github.com/connorodea/aiwholesail", lang: "TypeScript", stars: 0 },
];

export type Project = {
  slug: string;
  name: string;
  year: string;
  domain: Domain;
  tagline: string;
  summary: string;
  stack: string[];
  status: "live" | "building" | "beta";
  href?: string;
  /** Public repository, when there is one. Private work is not linked. */
  repo?: string;
  caseStudy: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "cutroom",
    repo: "https://github.com/connorodea/cutroom",
    name: "Cutroom",
    year: "2026",
    domain: "video",
    tagline: "An AI-native video editor that cuts from the transcript.",
    summary:
      "Pro editors spend most of a session scrubbing for the moment they already remember. Cutroom transcribes first, then makes the transcript the timeline — strike a sentence and the cut happens. Built as a real NLE, not a wrapper: media pool, multi-track timeline, color, and delivery.",
    stack: ["TypeScript", "React", "Vite", "Hono", "Claude"],
    status: "building",
    caseStudy: true,
  },
  {
    slug: "sightline",
    name: "Sightline",
    year: "2026",
    domain: "commerce",
    tagline: "Tells Shopify merchants when AI recommends their store.",
    summary:
      "Search is moving inside assistants, where there is no rank to check and no analytics to read. Sightline queries ChatGPT, Perplexity, and Claude on a schedule for the prompts a merchant's buyers actually use, then scores how often the store surfaces and what gets said about it.",
    stack: ["Next.js", "TypeScript", "Postgres", "Shopify"],
    status: "building",
    caseStudy: true,
  },
  {
    slug: "juricratic",
    name: "Juricratic",
    year: "2026",
    domain: "legal",
    tagline: "Litigation strategy modeled as a game, not a guess.",
    summary:
      "Case outcomes are usually predicted from intuition and anecdote. Juricratic treats litigation as what it is — a multi-party game with payoffs — and simulates it: Nash equilibria over settlement positions, prisoner's-dilemma dynamics between co-defendants, trained on court data.",
    stack: ["Python", "Neo4j", "LangGraph", "Anthropic"],
    status: "building",
    caseStudy: true,
  },
  {
    slug: "apidistributed",
    name: "APIDistributed",
    year: "2026",
    domain: "infra",
    tagline: "An API marketplace built for agents, not portals.",
    summary:
      "RapidAPI was designed for humans clicking through a catalog. Agents need discovery, auth, and billing they can traverse programmatically. APIDistributed is a marketplace with an MCP-native surface, edge-deployed so latency stays in the tens of milliseconds.",
    stack: ["Cloudflare Workers", "TypeScript", "MCP", "D1"],
    status: "building",
    caseStudy: true,
  },
  {
    slug: "geostamp",
    repo: "https://github.com/connorodea/geostamp",
    name: "GeoStamp",
    year: "2026",
    domain: "commerce",
    tagline: "Geotags photos for local SEO in seconds.",
    summary:
      "Local businesses are told to geotag their photos and given no usable tool to do it. GeoStamp writes correct EXIF GPS across a batch from a map pin, on desktop and web.",
    stack: ["Tauri", "React", "Rust"],
    status: "live",
    caseStudy: false,
    href: "https://geostamp.app",
  },
  {
    slug: "lockrooms",
    name: "Lockrooms",
    year: "2026",
    domain: "video",
    tagline: "Multi-sport film study as a subscription.",
    summary:
      "Coaches and athletes pay for film access in fragmented, sport-by-sport silos. Lockrooms consolidates it into one subscription with a motion pipeline that renders highlight reels automatically.",
    stack: ["Next.js", "TypeScript", "FFmpeg", "Postgres"],
    status: "building",
    caseStudy: false,
  },
  {
    slug: "metrodealreport",
    name: "MetroDealReport",
    year: "2026",
    domain: "realestate",
    tagline: "A publication for real-estate investors, not a listings feed.",
    summary:
      "Investor-grade deal reporting with the editorial structure of a trade publication, backed by an API that keeps the underlying market data current.",
    stack: ["Next.js", "TypeScript", "Postgres"],
    status: "building",
    caseStudy: false,
  },
  {
    slug: "screenrec-studio",
    repo: "https://github.com/connorodea/screenrec-studio",
    name: "ScreenRec Studio",
    year: "2026",
    domain: "video",
    tagline: "A native macOS screen recorder and editor.",
    summary:
      "ScreenFlow-class capture built directly on ScreenCaptureKit, encoding to H.264 without the overhead that browser-based recorders carry.",
    stack: ["Swift", "ScreenCaptureKit", "AVFoundation"],
    status: "building",
    caseStudy: false,
  },
];

export const FEATURED = PROJECTS;
export const CASE_STUDIES = PROJECTS.filter((p) => p.caseStudy);
