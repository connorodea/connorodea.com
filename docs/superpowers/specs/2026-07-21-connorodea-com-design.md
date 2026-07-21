# connorodea.com — Design Spec

**Date:** 2026-07-21
**Status:** Built (v1). Revised 2026-07-21 after design review — see §5, §6, §8.
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

- `/` — single scrolling page. Hero, shipping log, selected work, capabilities,
  about, contact.
- `/work/[slug]` — deep case studies for four flagship projects only.
- `/writing` — **deferred out of v1.** The route and content pipeline are built
  so posts can be added later, but the section is not linked or shipped until at
  least two posts exist. An empty blog costs more credibility than it earns.

### Home page sections

1. **Hero** — mono micro-grid header, the lockup, the rendered object, a short
   bio, and a footer strip carrying local time and outbound links.
2. **Shipping log** — every public repository as a mark, positioned by last-ship
   date and grouped into a lane per domain. Density reads as velocity, lane
   spread reads as range. Each mark links to its repository. This is the page's
   central argument, drawn rather than asserted.
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

Case study bodies are typed TypeScript records keyed by slug. MDX was specified
originally and proved unnecessary — the bodies are structured data, not prose
documents.

Rationale: the site must never show a loading state, never break because an
external API changed, and never go stale silently. Curation is the point — the
value is in what is left out.

## 5. Visual design

### Direction

**Revised.** The original terminal-inspired direction was replaced during the
build at Connor's request, against a supplied reference: pure black, a mono
micro-grid header, an oversized mixed lockup pairing serif italic with heavy
grotesk, and a single luminous object carrying all of the page's color.

The earlier plan called for a near-black canvas with one acid-lime accent. That
combination is one of the most common AI-generated design defaults, and the
accent was a filler choice rather than a considered one. It is gone.

Color is now information. A restrained categorical palette encodes project
*domain* and appears only in the shipping log and work rows. Interactive states
are plain white. The hero object supplies the spectrum those domain hues are
drawn from, which is what ties the two halves of the page together.

Explicitly rejected: fake window chrome, traffic-light dots, typing animations,
blinking cursors, and any accent used as a large flat fill.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#000000` | Page canvas |
| `fg` | `#FFFFFF` | Primary text |
| `muted` | `#8B8B8F` | Secondary text |
| `faint` | `#56565C` | Metadata |
| `line` | `#FFFFFF` at 11% | Hairline borders |

Domain hues, drawn from the hero object's spectrum and used only as data:
video `#FFD9A8`, infrastructure `#B6FFD5`, commerce `#A8F0FF`, legal `#B9A8FF`,
real estate `#9FB0FF`, health `#FFB0E6`, finance `#E8FF9E`, consumer `#FFC2A8`.

There is no single brand accent. Nothing on the page is orange, which belongs to
APIDistributed; the two properties should not look related.

### Typography

Three families, self-hosted via `next/font`, subset and preloaded.

- **Instrument Serif Italic** — the display voice. Project names, the hero
  lockup's first line, section pull quotes, the contact address.
- **Archivo** (700) — the heavy counterweight in the lockup.
- **DM Mono** — labels, metadata, body copy, and all numeric data.

The serif-italic and heavy-grotesk pairing is the site's signature typographic
move. Mono carries the body text here, which the earlier draft forbade; at this
size and measure it reads well and it is what the reference direction calls for.

### Texture

A fine grain overlay across the whole page. No grid — the reference direction is
bare black, and the hero object supplies the only luminance.

## 6. Motion

1. **The hero object** — continuous slow rotation, eased pointer-follow, and a
   fade as the page scrolls past it.
2. **Work row hover** — a light sweep crosses the row, the name shifts right, and
   a rule in the project's domain color draws in from the left.
3. **Section reveals** — short, staggered entrance on scroll via
   IntersectionObserver.
4. **Shipping log marks** — draw in left to right on first view.
5. **Link transitions** — underline and color shifts.

No scroll-jacking. Every effect has a complete `prefers-reduced-motion` path that
renders the final state immediately. Reveals are gated behind a `js` class set by
an inline script, so a visitor without JavaScript sees all content rather than an
empty page.

## 7. The portrait

The supplied headshot is 460×460, 20KB. It was moved out of the hero during the
redesign — the rendered object occupies that slot — and now appears in the About
section at 132px, framed and desaturated to greyscale, where its softness reads
as a deliberate treatment rather than a low-resolution upload.

If a source image of 1000px or larger becomes available, it drops in as a direct
replacement with no layout change.

Source file is committed at `assets/connor-headshot-460.jpg`.

## 8. Technical

### Stack

- Next.js 16, static export (`output: 'export'`)
- Tailwind CSS v4
- Hand-written WebGL2 for the hero object — no scene-graph library
- Typed TypeScript content files for case study bodies (MDX was not needed)
- Self-hosted fonts, no external requests at runtime

**The hero object.** A raymarched, fbm-displaced sphere shaded as polished metal:
a four-light studio environment sampled by the reflection vector, Schlick
fresnel, per-channel chromatic dispersion at the rim, thin-film tinting, and ACES
tonemapping. Written directly against WebGL2 because Three.js would have added
roughly 600KB to carry one object; the shader is about 9KB of source. Falls back
to a CSS gradient sphere where WebGL2 is unavailable, and renders a single static
frame under `prefers-reduced-motion`.

This mirrors the `preecursor` site, which is already proven on this
infrastructure.

### Performance budget

- Largest Contentful Paint under 1.5s on a 4G profile
- No layout shift from font loading
- No third-party requests at runtime

**Budget revised.** The original target of 150KB gzipped JavaScript was not met:
the build ships ~196KB. Substantially all of it is the React and Next.js
baseline — the hero shader is negligible by comparison. Meeting 150KB would mean
changing framework, not trimming this code. The overage is accepted for v1 and
recorded here rather than quietly dropped.

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
3. Four case studies are complete, substantive, and **fact-checked by Connor** at
   launch. The v1 bodies were drafted from repository metadata and are not yet
   verified.
4. The performance and accessibility budgets in section 8 are met and measured.
5. The site does not read as a third consulting pitch alongside odeaworks.com and
   preecursor.com.
6. connorodea.com serves from hetznerCO with valid TLS and no dark window during
   cutover.
