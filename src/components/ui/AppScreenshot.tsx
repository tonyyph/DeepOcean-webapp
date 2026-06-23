import Image from "next/image";

type AppScreenshotProps = {
  screen: "home" | "dive" | "collection" | "stats" | "ai" | "premium";
  compact?: boolean;
  priority?: boolean;
};

const screenDetails: Record<
  AppScreenshotProps["screen"],
  { src: string; alt: string }
> = {
  home: {
    src: "/screenshots/home.png",
    alt: "Deep Ocean Home screen with a 25-minute dive, quick durations, depth progress, and daily guidance",
  },
  dive: {
    src: "/screenshots/dive.png",
    alt: "Deep Ocean active Dive screen showing elapsed time, current depth, pause, surface, and abort controls",
  },
  collection: {
    src: "/screenshots/collection.png",
    alt: "Deep Ocean Expedition Log showing discovered ocean creatures and rarity filters",
  },
  stats: {
    src: "/screenshots/stats.png",
    alt: "Deep Ocean Dive Analytics screen with focus totals, weekly heatmap, and recent expeditions",
  },
  ai: {
    src: "/screenshots/ai.png",
    alt: "Deep Ocean Marine Guide screen with daily guidance, session reflection, and Pro insights",
  },
  premium: {
    src: "/screenshots/premium.png",
    alt: "Deep Ocean Profile screen showing active Pro access, XP, themes, and settings",
  },
};

export function AppScreenshot({
  screen,
  compact = false,
  priority = false,
}: AppScreenshotProps) {
  const details = screenDetails[screen];

  return (
    <figure
      className={`phone-capture${compact ? " phone-capture-compact" : ""}`}
    >
      <Image
        src={details.src}
        alt={details.alt}
        fill
        priority={priority}
        sizes={compact ? "(max-width: 700px) 72vw, 280px" : "(max-width: 900px) 72vw, 390px"}
      />
    </figure>
  );
}
