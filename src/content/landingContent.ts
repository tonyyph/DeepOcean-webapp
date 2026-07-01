import {
  BellRing,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  Compass,
  FishSymbol,
  Gauge,
  Gem,
  History,
  Layers3,
  MoonStar,
  Palette,
  Sparkles,
  TimerReset,
  Trophy,
  Waves,
} from "lucide-react";

export const siteLinks = {
  primaryCta: "#final-cta",
  secondaryCta: "#how-it-works",
  privacy: "/privacy",
  terms: "/terms",
  support: "/support",
  contact: "mailto:support@deepocean.io.vn",
} as const;

export const navItems = [
  { label: { en: "Why Deep Ocean", vi: "Vì sao chọn Deep Ocean" }, href: "#problem" },
  { label: { en: "Features", vi: "Tính năng" }, href: "#features" },
  { label: { en: "Experience", vi: "Trải nghiệm" }, href: "#screens" },
  { label: { en: "Pro", vi: "Pro" }, href: "#premium" },
  { label: { en: "Privacy", vi: "Quyền riêng tư" }, href: "#privacy" },
] as const;

export const problemSolution = {
  problem: {
    eyebrow: "The surface problem",
    title: "Most timers measure attention. They do not make it easier to return.",
    body: "A plain countdown can feel like another demand. Deep Ocean gives focus a calm sense of place, visible progression, and a reason to protect the next few minutes.",
  },
  solution: {
    eyebrow: "A quieter system",
    title: "Every session becomes a dive with a beginning, a descent, and something worth surfacing with.",
    body: "Choose a duration or free dive, watch time become depth, discover ocean life, and build a personal record of focused work without turning productivity into noise.",
  },
} as const;

export const features = [
  {
    icon: TimerReset,
    title: "Timed and free dives",
    description:
      "Start with 15, 25, 45, or 60 minutes, choose a custom duration, or leave the timer open and surface when the work is done.",
    tag: "Core focus",
  },
  {
    icon: Layers3,
    title: "Five depth zones",
    description:
      "Focused minutes move you from the Sunlight Zone through Twilight, Midnight, Abyssal, and the Hadal Trench.",
    tag: "Progression",
  },
  {
    icon: FishSymbol,
    title: "Creatures, artifacts, and lore",
    description:
      "Deterministic discovery rolls reveal creatures and artifacts from the zone you reached, building an expedition log over time.",
    tag: "Collection",
  },
  {
    icon: Trophy,
    title: "XP, levels, streaks, and titles",
    description:
      "Completed focus earns XP and can advance levels, daily streaks, zone unlocks, and milestone achievements.",
    tag: "Motivation",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Focus analytics",
    description:
      "Review total focus, maximum depth, weekly rhythm, recent expeditions, discoveries, and per-session reports.",
    tag: "Reflection",
  },
  {
    icon: MoonStar,
    title: "Calm sensory feedback",
    description:
      "Cinematic motion, underwater ambience, semantic haptics, reduced-motion support, and discovery alerts shape the ritual.",
    tag: "Atmosphere",
  },
] as const;

export const featureStories = [
  {
    image: {
      src: "/assets/ocean-portal-wide.png",
      alt: "Deep Ocean widget artwork showing a whale below a sunlit ocean portal",
      width: 1000,
      height: 500,
      position: "center",
    },
    category: "The ritual",
    title: "Start with a destination, not another countdown.",
    description:
      "Choose a timed or open-ended dive and let focused minutes become a visible descent through the ocean.",
  },
  {
    image: {
      src: "/assets/living-jellyfish-square.png",
      alt: "Deep Ocean Living Ocean widget artwork with a glowing jellyfish",
      width: 900,
      height: 900,
      position: "center",
    },
    category: "The atmosphere",
    title: "A living world that makes returning feel natural.",
    description:
      "Ocean zones, discoveries, restrained motion, ambience, and haptics turn focus into a repeatable calm ritual.",
  },
  {
    image: {
      src: "/screenshots/stats.png",
      alt: "Real Deep Ocean Dive Analytics screen with focus totals and expedition history",
      width: 1290,
      height: 2796,
      position: "center 18%",
    },
    category: "The record",
    title: "See the attention you protected over time.",
    description:
      "Completed dives build authentic history through total focus, weekly rhythm, depth records, and recent expeditions.",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Tell Deep Ocean what you want to improve",
    description:
      "Onboarding captures goals such as focus, consistency, stress reduction, learning, routines, and productivity.",
  },
  {
    number: "02",
    title: "Choose a focus rhythm",
    description:
      "Select a recommended workflow and a timed or open-ended dive that fits the energy you have today.",
  },
  {
    number: "03",
    title: "Descend while you work",
    description:
      "The live dive tracks elapsed focus, depth, zone, discoveries, pause state, and completion without crowding the screen.",
  },
  {
    number: "04",
    title: "Surface with a useful record",
    description:
      "A completed dive is saved with XP, depth, discoveries, level progress, streak updates, and an expedition report.",
  },
] as const;

export const screenPreviews = [
  {
    id: "home",
    label: "Home",
    title: "A calm launch point",
    description:
      "See your last dive, preferred session, quick durations, depth progress, daily guidance, streak, dives, and level.",
  },
  {
    id: "dive",
    label: "Live dive",
    title: "Attention, with almost no chrome",
    description:
      "One cinematic screen holds the progress ring, elapsed time, depth, zone, discoveries, pause, surface, and abort controls.",
  },
  {
    id: "collection",
    label: "Expedition log",
    title: "A collection earned through real focus",
    description:
      "Catalog creatures and artifacts by rarity, revisit sightings, and unlock deeper field-journal entries with Pro.",
  },
  {
    id: "stats",
    label: "Dive analytics",
    title: "A history of protected attention",
    description:
      "Review total focus, maximum depth, a seven-day heatmap, recent expeditions, and individual session reports.",
  },
  {
    id: "ai",
    label: "Marine Guide",
    title: "Guidance grounded in your app context",
    description:
      "Daily recommendations, motivation, session reflection, mood selection, and a cached or local fallback when hosted AI is unavailable.",
  },
  {
    id: "premium",
    label: "Profile & Pro",
    title: "Settings and premium access in one place",
    description:
      "Manage the diver profile, XP, themes, language, reminders, motion, haptics, audio, and verified Pro entitlements.",
  },
] as const;

export const premiumBenefits = [
  {
    icon: Palette,
    title: "Seven premium themes",
    description:
      "App-wide visual identities with distinct palettes, typography, particles, gradients, and ambient effects.",
  },
  {
    icon: BrainCircuit,
    title: "Deep AI insights",
    description:
      "Unlock personal trend analysis, mood-correlated patterns, focus plans, and a guided breathing ritual.",
  },
  {
    icon: BookOpen,
    title: "Full field journals",
    description:
      "Read the folklore, theories, and sealed expedition notes behind discovered creatures and artifacts.",
  },
  {
    icon: Gem,
    title: "A more personal ocean",
    description:
      "Pro elevates the tab experience and lets the visual system feel deliberately yours while the core timer remains accessible.",
  },
] as const;

export const intelligence = [
  {
    icon: BrainCircuit,
    title: "Context-aware companion",
    description:
      "Guidance can use your level, streak, mood, unlocked zones, achievements, and recent sessions.",
  },
  {
    icon: Compass,
    title: "Personal onboarding plan",
    description:
      "Your selected goals shape recommended items and a starting workflow before the first dive.",
  },
  {
    icon: Sparkles,
    title: "Graceful offline fallback",
    description:
      "If a hosted AI provider is unavailable, a deterministic local guide still produces data-driven recommendations.",
  },
] as const;

export const progressMetrics = [
  { value: "5", label: "ocean zones", icon: Layers3 },
  { value: "164", label: "catalog entries", icon: FishSymbol },
  { value: "500", label: "local session records", icon: Gauge },
  { value: "EN / VI", label: "app languages", icon: Waves },
] as const;

export const progressFeatures = [
  {
    icon: History,
    title: "Expedition history",
    body: "Every surfaced session becomes a dated record with duration, maximum depth, discoveries, and XP.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Weekly focus shape",
    body: "A seven-day heatmap makes consistency visible without turning the experience into a spreadsheet.",
  },
  {
    icon: Trophy,
    title: "Long-term progression",
    body: "Levels, current and longest streaks, depth records, collection milestones, and title achievements reward return.",
  },
] as const;

export const faqs = [
  {
    question: "What is a focus dive?",
    answer:
      "It is a focus session represented as an underwater descent. Time becomes depth, deeper durations reach new zones, and completed sessions can produce discoveries and progression.",
  },
  {
    question: "Do I have to use a fixed timer?",
    answer:
      "No. Deep Ocean includes quick and custom timed sessions plus a free dive with no fixed end time.",
  },
  {
    question: "What stays available without Pro?",
    answer:
      "The core dive timer, XP, streaks, basic expedition history, collection loop, and standard guidance remain part of the core experience. Pro adds premium themes, deeper AI insights, and full field journals.",
  },
  {
    question: "Does the AI companion require an internet connection?",
    answer:
      "Hosted AI features need a configured provider and connectivity, but the app includes cached and local fallback behavior so basic guidance does not disappear.",
  },
  {
    question: "Can I keep track of a dive outside the app?",
    answer:
      "The implementation includes home-screen widgets, timed-dive completion notifications, an Android active-dive notification, and iPhone Live Activity support. Final device and store QA is still required before release.",
  },
  {
    question: "Is Deep Ocean available now?",
    answer:
      "Store availability links have not been provided for this landing page yet. The current calls to action are clearly marked as beta or store-link placeholders.",
  },
] as const;

export const widgetHighlights = [
  "Start, pause, or resume a focus session",
  "Open the AI companion or daily progress",
  "See streak, focus targets, zone, depth, and discoveries",
  "Follow an active timed dive with iPhone Live Activities",
] as const;

export const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Experience", href: "#screens" },
      { label: "Deep Ocean Pro", href: "#premium" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Privacy Policy", href: siteLinks.privacy },
      { label: "Terms of Service", href: siteLinks.terms },
      { label: "Support", href: siteLinks.support },
      { label: "Email support", href: siteLinks.contact },
    ],
  },
] as const;

export const auxiliaryIcons = { BellRing };
