# connorodea.com — Design Spec

**Date:** 2026-07-21
**Status:** Approved for planning
**Owner:** Connor O'Dea

## 1. Purpose

connorodea.com is a personal portfolio site that showcases Connor O'Dea as an
individual engineer. Its job is to convince clients and potential customers,
within about thirty seconds, that he builds AI-native products end to end and
ships them fast.

The argument is evidence: a curated body of shipped work, presented with enough
depth to be verifiable. The site does not sell a service package. It establishes
credibility and gives an interested visitor a way to make contact.

### Relationship to other properties

Connor owns three overlapping domains. This spec assigns each a distinct job:

| Domain | Job |
| --- | --- |
| connorodea.com | The person. Portfolio and proof of work. |
| odeaworks.com | The consulting practice. Services and engagements. |
| preecursor.com | The applied-AI studio. Productized apps. |

connorodea.com must not read as a third consulting pitch. Where a visitor wants
to hire a firm rather than a person, the site links out to the other two.

## 2. Audience

Primary: prospective clients and customers evaluating whether Connor can build
what they need.

Secondary: partners, investors, and recruiters doing due diligence.

Both audiences want the same thing — proof of capability — so the site is
designed for one path, not segmented.

## 3. Information architecture

### Routes

- `/` — single scrolling page. Hero, proof strip, selected work, capabilities,
  about, contact.
- `/work/[slug]` — deep case studies for four flagship projects only.
- `/writing` — **deferred out of v1.** The route and content pipeline are built
  so posts can be added later, but the section is not linked or shipped until at
  least two posts exist. An empty blog costs more credibility than it earns.

### Home page sections

1. **Hero** — name, positioning line, portrait, status indicator.
2. **Proof strip** — a dense band of real numbers: projects shipped, domains
   worked in, years active. Volume is the argument.
3. **Selected work** — eight curated projects as full-width rows. Four link to
   case studies; the other four are self-contained rows.
4. **Capabilities** — what Connor does for clients, stated plainly. This is the
   section that serves the conversion audience.
5. **About** — short, personal, human. Not a resume.
6. **Contact** — one clear path to reach him.

### Case study pages

Four flagships get full pages: Cutroom, Sightline, Juricratic, APIDistributed.

Each covers: the problem, what was built, architecture, stack, status, and what
was learned. Screenshots where they exist.

Four deep case studies beat eight shallow ones. Additional projects are promoted
to case studies later, one at a time, as their write-ups are finished.

### The eight projects

This is the default set, subject to Connor's edit before implementation begins.

| Project | Domain | Case study |
| --- | --- | --- |
| Cutroom | AI-native video editing | Yes |
| Sightline | Commerce / AI visibility | Yes |
| Juricratic | Legal intelligence | Yes |
| APIDistributed | API marketplace infrastructure | Yes |
| GeoStamp | Local SEO tooling | No |
| Lockrooms | Sports film subscription | No |
| MetroDealReport | Real-estate publishing | No |
| ScreenRec Studio | Native macOS capture | No |

No QuickLotz or QuickBidz work appears on this site, in any form, under the
standing litigation hold.

## 4. Content model

All content lives in typed TypeScript files in the repo, edited directly. There
are no runtime API calls, no GitHub fetching, and no CMS.

A `Project` record carries: slug, name, year, one-line description, domain, stack,
status, external links, an optional preview image, and an optional flag marking it
as a case study.

Case study bodies are MDX files keyed by slug.

Rationale: the site must never show a loading state, never break because an
external API changed, and never go stale silently. Curation is the point — the
value is in what is left out.

## 5. Visual design

### Direction

Terminal-inspired, real layout. The site borrows the *language* of a developer
console — monospace metadata, hairline grids, command-line section headers, status
glyphs, high data density — but the page is a properly designed editorial layout
with a real type hierarchy.

Explicitly rejected: fake window chrome, traffic-light dots, typing animations,
blinking cursors, and monospace body text. These are the markers of the generic
dev portfolio and they are what this design is differentiating against.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#08090B` | Page canvas |
| `fg` | `#EDEDEF` | Primary text |
| `muted` | `#8A8F98` | Secondary text |
| `faint` | `#4A4F58` | Metadata, disabled |
| `line` | `#EDEDEF` at 8% | Hairline borders |
| `accent` | `#C8FF3D` | Active states, status dots, one hero element |

The accent is used sparingly — never as a large fill. It is deliberately not
orange, which belongs to APIDistributed; the two properties should not look
related.

### Typography

Two families, self-hosted, subset, preloaded.

- **Geist** (grotesk) — headings and body. Chosen because body copy must be
  readable at length.
- **JetBrains Mono** — labels, metadata, section commands, numeric data.

Monospace is the accent voice, not the default. This is the single most important
decision separating this site from a generic terminal portfolio.

### Texture

A fine grain overlay, one soft radial glow behind the hero, and a hairline grid
that parallaxes subtly with pointer position. Restrained throughout.

## 6. Motion

Five specific effects, each budgeted:

1. **Hero grid parallax** — hairline grid offsets subtly with cursor position.
2. **Work row hover** — the row lifts, a light sweep passes through it, and the
   project preview image resolves in from the right. This is the site's signature
   moment.
3. **Section reveals** — short, fast, staggered entrance on scroll.
4. **Proof strip count-up** — numbers animate once on first view.
5. **Link and button transitions** — accent underline wipes.

No scroll-jacking. No long-running loops. Every effect has a complete
`prefers-reduced-motion` path that renders the final state immediately.

## 7. The portrait

The supplied headshot is 460×460, 20KB. It is displayed at 240px or smaller,
inside a framed slot with hairline crosshairs, grain, and a duotone treatment, so
its softness reads as a deliberate style choice rather than a low-resolution
upload.

If a source image of 1000px or larger becomes available, it drops in as a direct
replacement with no layout change.

Source file is committed at `assets/connor-headshot-460.jpg`.

## 8. Technical

### Stack

- Next.js 16, static export (`output: 'export'`)
- Tailwind CSS v4
- Motion for animation
- MDX for case study bodies
- Self-hosted fonts, no external requests at runtime

This mirrors the `preecursor` site, which is already proven on this
infrastructure.

### Performance budget

- Lighthouse performance ≥ 95 on mobile
- Largest Contentful Paint under 1.5s on a 4G profile
- Total JavaScript under 150KB gzipped
- No layout shift from font loading
- No third-party requests at runtime

### Accessibility

- WCAG AA contrast for all text. The accent on the dark canvas is verified before
  use on any text.
- Full keyboard navigation with visible focus states.
- Semantic landmarks and heading order.
- `prefers-reduced-motion` honored throughout.

### Repository and deployment

- New repo `connorodea/connorodea.com`, public.
- Deployed to hetznerCO via GitHub Actions using the standard `HETZNER_CO_*`
  secrets, nginx serving the static export.
- All work proceeds on feature branches with pull requests. Nothing is pushed
  directly to main.
- Git author is pinned to `Connor O'Dea <102129457+connorodea@users.noreply.github.com>`.

### DNS cutover

connorodea.com currently resolves to `185.158.133.1` and serves a
Lovable-generated SPA. It does **not** currently point at hetznerCO, and no vhost
for it exists on that server.

Cutover sequence, in order:

1. Build and deploy to a staging hostname on hetznerCO.
2. Verify the staging deployment end to end.
3. Provision the production vhost and TLS certificate for connorodea.com.
4. Repoint DNS.

DNS is not changed before step 3. Pointing it earlier would take the domain dark,
because nothing on hetznerCO would answer for it.

Connor has pre-approved the flip; it executes only once steps 1–3 are verified.

## 9. Out of scope for v1

- An interactive command prompt that accepts typed input
- A WebGL or shader hero
- Live GitHub API integration or any runtime data fetching
- A published writing section
- Analytics (deferred; revisit after launch)
- Contact form backend — v1 uses a direct mail link

## 10. Success criteria

1. A visitor can state what Connor does within three seconds of page load.
2. A visitor can verify that claim within thirty seconds by scanning the work.
3. Four case studies are complete and substantive at launch.
4. The performance and accessibility budgets in section 8 are met and measured.
5. The site does not read as a third consulting pitch alongside odeaworks.com and
   preecursor.com.
6. connorodea.com serves from hetznerCO with valid TLS and no dark window during
   cutover.
