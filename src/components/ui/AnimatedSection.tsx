"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { landingTheme } from "@/lib/landingTheme";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  as?: "div" | "section";
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  id,
  as = "div",
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;

  return (
    <Component
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: landingTheme.motion.duration,
        delay,
        ease: landingTheme.motion.enter,
      }}
    >
      {children}
    </Component>
  );
}
