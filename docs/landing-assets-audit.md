# Deep Ocean landing assets audit

Audit date: 2026-06-23

Source of truth:

- Mobile app: `/Users/tony/DeepOcean`
- Landing app: `/Users/tony/DeepOcean-webapp`
- Product behavior was verified from the current implementation, not inferred from filenames or older product notes.

## Product summary

Deep Ocean is a focus app that represents a focus session as an underwater dive. Focused minutes become depth across five ocean zones. Completed dives are saved locally and can add discoveries, XP, levels, streak progress, achievements, and session history.

The current app is an Expo/React Native app for iOS and Android with English and Vietnamese UI.

## Assets found

### Brand and splash assets

| Asset | Source | Landing copy | Status |
| --- | --- | --- | --- |
| App icon, 1024×1024 | `../DeepOcean/assets/images/deepocean-fixed.png` | `public/assets/app-icon.png` | Exact SHA-1 match |
| Transparent splash/logo mark | `../DeepOcean/assets/images/logo.png` | Not copied to landing | Available if needed |

The app icon is the watercolor orb on a near-black background. The transparent splash asset contains the same orb without the square background.

### Widget artwork

| Asset | Size | Status |
| --- | ---: | --- |
| `public/assets/ocean-portal-square.png` | 900×900 | Exact match with mobile source |
| `public/assets/ocean-portal-wide.png` | 1000×500 | Exact match with mobile source |
| `public/assets/living-jellyfish-square.png` | 900×900 | Exact match with mobile source |
| `public/assets/living-whale-wide.png` | 1000×500 | Exact match with mobile source |

These are real source assets used by the native widget implementation. They are not mobile-screen screenshots and should be labeled as widget artwork.

### Audio and animation

- One shipped audio asset exists: `../DeepOcean/assets/audio/luffy.wav`, currently configured as the dive-completion notification sound.
- No Lottie files, GIF animations, or exported app animations were found.
- Ambient particles and underwater effects are code-native (Skia/Reanimated), not image or Lottie assets.

## Real screenshots available

The following 1290×2796 images are real app captures and visually match the current mobile implementation:

| Screenshot | Screen represented | Safe landing use |
| --- | --- | --- |
| `public/screenshots/home.png` | Home / dive launch | Yes |
| `public/screenshots/dive.png` | Active dive | Yes |
| `public/screenshots/collection.png` | Expedition Log / collection | Yes |
| `public/screenshots/stats.png` | Dive Analytics / history | Yes |
| `public/screenshots/ai.png` | Marine Guide / AI companion | Yes |

The current captures show the Prism Water theme and English UI. They contain sample local user data, which is acceptable as an authentic in-app state but must not be presented as universal product results.

### Widget concept sheet available

`public/screenshots/widget-portal.png` is a 1536×1024 repository asset showing
the Ocean Portal, Diving Instrument, and Living Ocean concepts across small,
medium, and large layouts. It is suitable as a concept overview, but it is not
a real installed-device screenshot.

The previously documented individual widget screenshots are not present in the
current landing worktree and are not referenced by the landing page:

- `public/screenshots/ocean_portal_{small,medium,large}.png`
- `public/screenshots/diving_instrument_{small,medium,large}.png`
- `public/screenshots/living_ocean_{small,medium,large}.png`

TODO: restore or recapture individual widget screenshots only if they can be
traced to the current implementation. Until then, use the concept sheet with an
explicit concept label and do not describe it as an installed-device capture.

### App Store screenshots

No dedicated App Store or Google Play marketing screenshot set was found. The portrait captures above are raw app screenshots, not store-ready compositions.

## Landing page asset mapping

Every rendered image on the landing page currently resolves to a real file
under `public/`.

| Landing section | Rendered asset | Usage |
| --- | --- | --- |
| Navigation / brand | `public/assets/app-icon.png` | App icon |
| Hero | `public/assets/ocean-portal-wide.png` | Full-width ocean artwork |
| Hero | `public/screenshots/dive.png` | Real active-dive screen |
| Feature story: ritual | `public/assets/ocean-portal-wide.png` | Verified widget artwork |
| Feature story: atmosphere | `public/assets/living-jellyfish-square.png` | Verified widget artwork |
| Feature story: record | `public/screenshots/stats.png` | Real Dive Analytics capture |
| Loved by travelers preview | `public/screenshots/home.png` | Real Home capture, cropped within the card |
| Loved by travelers preview | `public/assets/app-icon.png` | App icon |
| Product preview gallery | `public/screenshots/home.png`, `dive.png`, `collection.png`, `stats.png`, `ai.png` | Five real app captures |
| Marine Guide | `public/screenshots/ai.png` | Real Marine Guide capture |
| Widgets | `public/screenshots/widget-portal.png` | Repository-sourced widget concept sheet |
| Analytics | `public/screenshots/stats.png` | Real Dive Analytics capture |
| Metadata / social preview | `public/assets/ocean-portal-wide.png` | Repository artwork |

No award badge is rendered in the floating app preview because no verified
award/badge asset exists in the repository.

## Visual system verified from source

- Core palette: near-black navy (`#010512`, `#02081C`) with cyan (`#22E4FF`), aqua (`#5FF7E0`), violet, coral, amber, and pale blue-white text.
- Surfaces: translucent glass panels, subtle colored edges, dark absorption layers, glow used sparingly.
- Typography:
  - Display/UI themes: Space Grotesk
  - Body: Space Grotesk in the current theme system; legacy/core tokens also define Inter
  - Numeric/telemetry: JetBrains Mono
- Shape language: rounded cards (18–32px), pill controls, circular progress/depth indicators.
- Motion: slow organic particles, restrained fades/translations, haptics, and reduced-motion support.
- Current theme registry: 10 themes total in the app.

## App flow verified from source

1. First launch enters a five-step onboarding flow:
   - Welcome
   - Select up to six goals
   - Receive a personalized recommended plan
   - Choose a workflow
   - Complete onboarding
2. Home shows the latest dive, preferred duration, quick durations (15/25/45/60), free dive, depth-zone progress, daily guidance, and profile progress.
3. Starting a dive opens the immersive Dive screen.
4. A dive can be paused, resumed, surfaced, or aborted. Timed dives can auto-complete.
5. During a dive, elapsed focus becomes depth and zone progression. Discovery events can appear.
6. Surfacing persists the session and updates collection sightings, XP, level, streaks, zone/title achievements, widgets, notifications, and Live Activity state where supported.
7. The saved session can be opened as a detailed expedition report with duration, depth, XP, zone journey, discoveries, and native sharing.
8. Collection, Stats, Marine Guide, and Profile are available from the tab bar.

Note: `docs/onboarding.md` in the mobile repo describes an older four-slide/long-press onboarding. The current `src/screens/OnboardingScreen.tsx` five-step implementation is the source of truth.

## Features verified from source

### Core focus

- Timed dives with 15, 25, 45, and 60 minute quick presets
- Custom timed dives
- Open-ended free dives
- Pause, resume, surface, abort, and timed auto-completion
- Background reconciliation based on wall-clock time
- Underwater ambience, haptics, discovery alerts, and reduced-motion support

### Ocean progression

- Five zones: Sunlight, Twilight, Midnight, Abyssal, Hadal Trench
- Zone thresholds begin at 0, 15, 30, 50, and 75 focused minutes
- 164 unique catalog entries across creatures and artifacts
- Deterministic, zone-aware discovery rolls
- Basic collection entries and deeper creature/artifact stories

### Progress and history

- XP and levels
- Current and longest streak
- New zones and title achievements
- Total focus, maximum depth, dive count, level
- Seven-day focus heatmap
- Recent expedition history
- Per-session detail/report and system share sheet
- Local history capped at 500 sessions

### Onboarding and personalization

- Goal selection
- Recommended items and workflow
- AI-backed recommendation when configured
- Deterministic fallback recommendation when unavailable
- Remembered selected goals, workflow, and recommendation

### AI companion

- Daily recommendation
- Daily motivation/nudge
- Last-session reflection
- Context can include language, level, XP, streaks, total dives, mood, reached zones, achievements, and recent sessions
- Provider chain can use Gemini, Groq, or OpenRouter when configured
- Cached response fallback
- Context-derived offline fallback
- Current users receive the app's guidance, mood map, focus planning, and breathing ritual as part of the free experience.

### Free Access

Verified included access:

- Core timer and free/custom dives
- Pause/resume/surface
- XP, levels, streaks
- Collection entries and expedition journal/lore
- Reminders
- Expedition history
- App themes and visual treatment
- AI guidance, mood-correlated planning, and breathing ritual

### Reminders, widgets, and Live Activity

- Configurable daily local dive reminder
- Timed-dive completion notification
- Android ongoing active-dive notification
- iOS WidgetKit source and target wiring
- Android AppWidget provider and small/medium/large layouts
- Widget actions for start, pause, resume, opening AI, and opening daily progress
- iPhone Live Activity bridge and native support flags
- Shared, persisted widget snapshot rather than a second timer engine

## Privacy / local-first findings

Verified local storage:

- Sessions, profile, collection, settings, mood, personalization, achievements, notification state, active dive state, AI cache, and widget snapshot are persisted on-device with MMKV.

Network-dependent areas:

- Optional hosted AI requests are sent to the configured provider.
- Expo Updates is configured for app updates.

Safe landing wording:

- “Your core dive history and preferences are stored on device.”
- “AI guidance can use a configured online provider; cached and local fallback guidance is available.”

Do not claim:

- End-to-end encryption
- No data ever leaves the device
- Anonymous analytics policy
- Account sync or cloud backup
- Health/medical outcomes

Those statements are not established by the current source.

## Features requiring confirmation or cautious wording

- Public release status: store URLs are not present in the landing repo.
- Beta signup destination: no form, email endpoint, or external signup URL is configured.
- Whether all three widget concepts will ship publicly on both platforms.
- Live Activity device/build QA status. The bridge and native configuration exist, but a real-device screenshot is not present.
- Hosted AI provider availability in production builds; public API keys are currently configuration-dependent.
- The exact privacy-policy, terms, support, and contact URLs.
- “Advanced analytics/full history filters” are mentioned as future work in product notes but are not implemented; do not market them.
- A break state is not implemented. The widget `skip_break` action is only a compatibility fallback and must not be advertised as a break timer.

## Screenshots needed

The landing can launch using the five verified portrait captures, verified
widget artwork, and the labeled widget concept sheet above. The following real
captures should still be supplied to represent the complete product accurately:

1. Current onboarding welcome screen
2. Onboarding goals screen
3. Personalized plan/workflow screen
4. Dive session at a deeper zone with a real discovery overlay
5. Session completed / surfaced reward state
6. Session detail / expedition report
7. Collection item story sheet
8. Daily reminder settings
9. Notification center
10. iPhone Live Activity on Lock Screen / Dynamic Island
11. Android active-dive notification
14. Real installed iOS widget screenshots for each widget family intended to ship
15. Real installed Android widget screenshots for each size intended to ship
16. Vietnamese Home or Dive screen for localization proof
17. Final App Store and Google Play screenshot compositions
18. Verified award or editorial badge, if the product earns one and the source asset is supplied

Until those captures exist, the landing must use text-only descriptions for those states and must not draw substitute phone screens or simulated OS chrome.
