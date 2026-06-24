"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";

export function FloatingAppPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="app-preview-card"
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 6, ease: "easeInOut", repeat: Infinity }
      }
      whileHover={reduceMotion ? undefined : { y: -10, rotate: 0 }}
    >
      <div className="app-preview-banner">
        <Image
          src="/screenshots/home.png"
          alt="Real Deep Ocean Home screen preview"
          fill
          sizes="(max-width: 820px) 92vw, 440px"
        />
      </div>
      <div className="app-preview-body">
        <Image
          className="app-preview-icon"
          src="/assets/app-icon.png"
          alt="Deep Ocean app icon"
          width={68}
          height={68}
        />
        <div className="app-preview-copy">
          <p className="app-preview-kicker">Deep Ocean</p>
          <h3>Focus deeper. Surface calmer.</h3>
          <p>
            Turn timed or open-ended focus sessions into dives, discoveries,
            and a record you can return to.
          </p>
        </div>
        <span className="app-preview-cta" aria-label="Deep Ocean download coming soon">
          <ArrowDownToLine size={16} />
          Coming soon
        </span>
      </div>
    </motion.article>
  );
}
