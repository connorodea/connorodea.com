export type CaseStudy = {
  problem: string;
  approach: string[];
  architecture: { k: string; v: string }[];
  learned: string;
};

export const CASE_STUDY_BODIES: Record<string, CaseStudy> = {
  cutroom: {
    problem:
      "Editing long-form footage is mostly search. An editor knows the moment they want and spends the session scrubbing to find it. Every tool sold as an AI editor so far has been a wrapper — it generates a rough cut you then have to fix in a real NLE, which means doing the work twice.",
    approach: [
      "Transcribe on ingest, then treat the transcript as the primary timeline surface. Deleting a sentence performs the cut.",
      "Build the actual editor underneath it — media pool, multi-track timeline, color, delivery — so the transcript view is an interface onto a real project, not a preprocessor that hands off.",
      "Keep the model in an advisory seat. It proposes selects and finds moments; it never commits a change the editor did not ask for.",
    ],
    architecture: [
      { k: "Client", v: "React + Vite, custom timeline renderer on canvas" },
      { k: "API", v: "Hono, streaming responses for long transcription jobs" },
      { k: "Model layer", v: "Claude for select reasoning, ASR for transcript" },
      { k: "Media", v: "FFmpeg pipeline, proxy generation on import" },
    ],
    learned:
      "The hard part was never the model. It was making a timeline that stays responsive at hour-long durations while a second view of the same project stays in sync with it.",
  },
  sightline: {
    problem:
      "A growing share of purchase research now happens inside assistants rather than search engines. There is no rank to check, no impressions to read, and no way for a merchant to know whether ChatGPT recommends them or a competitor.",
    approach: [
      "Build a prompt set per merchant that reflects how their buyers actually ask — category, comparison, and problem-first phrasings, not brand-name lookups.",
      "Query each engine on a schedule from clean sessions, so results reflect the model rather than an accumulated conversation.",
      "Score two things separately: whether the store surfaced at all, and what was said about it when it did. Presence and sentiment fail independently.",
    ],
    architecture: [
      { k: "App", v: "Next.js, embedded in Shopify admin" },
      { k: "Engines", v: "ChatGPT, Perplexity, and Claude, queried on schedule" },
      { k: "Store", v: "Postgres, time-series per prompt per engine" },
      { k: "Scoring", v: "Presence rate and sentiment, tracked as separate series" },
    ],
    learned:
      "Answers vary enough run to run that a single query says almost nothing. The product only became useful once it reported trends across repeated runs instead of point-in-time results.",
  },
  juricratic: {
    problem:
      "Litigation strategy is mostly built on intuition and war stories. Attorneys make consequential calls about settlement and posture with no model of how the other parties will respond.",
    approach: [
      "Model the case as what it structurally is: a multi-party game with payoffs, incomplete information, and sequential moves.",
      "Compute equilibria over realistic settlement positions, and model co-defendant dynamics where cooperating and defecting have asymmetric costs.",
      "Ground the payoffs in real court data instead of assumed numbers, so the simulation reflects outcomes that have actually occurred.",
    ],
    architecture: [
      { k: "Simulation", v: "Python, game-theoretic solver over party payoffs" },
      { k: "Graph", v: "Neo4j — parties, claims, precedent relationships" },
      { k: "Orchestration", v: "LangGraph for multi-step case analysis" },
      { k: "Data", v: "CourtListener, eyecite for citation extraction" },
    ],
    learned:
      "The model is only as good as the payoff estimates, and those are where domain expertise is irreplaceable. The valuable output turned out to be sensitivity analysis — which assumptions actually change the recommendation.",
  },
  apidistributed: {
    problem:
      "API marketplaces were built for a human browsing a catalog, signing up, and copying a key. Agents need to discover, authenticate, and transact programmatically, and every existing marketplace makes that the hard path.",
    approach: [
      "Make the marketplace MCP-native, so an agent can enumerate and call APIs through a protocol it already speaks.",
      "Run the whole surface at the edge, because an agent chaining several calls pays every millisecond of latency more than once.",
      "Keep provider onboarding to an OpenAPI spec, so listing an API is a configuration step rather than an integration project.",
    ],
    architecture: [
      { k: "Edge", v: "Cloudflare Workers, global by default" },
      { k: "Data", v: "D1 for catalog, KV for hot routing" },
      { k: "Protocol", v: "MCP server exposing the catalog as tools" },
      { k: "Billing", v: "Per-call metering at the edge" },
    ],
    learned:
      "Edge runtimes change what you can assume. A surprising amount of standard Node middleware simply does not exist there, and the constraint pushed the design toward something simpler than what I would have built on a server.",
  },
};
