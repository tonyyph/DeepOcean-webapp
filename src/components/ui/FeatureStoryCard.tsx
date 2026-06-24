"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type FeatureStoryCardProps = {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
  };
  category: string;
  title: string;
  description: string;
  index: number;
};

export function FeatureStoryCard({
  image,
  category,
  title,
  description,
  index,
}: FeatureStoryCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <motion.article
      ref={cardRef}
      className="feature-story-card"
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      <div className="feature-story-media">
        <motion.div style={reduceMotion ? undefined : { y: parallaxY }}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 720px) 92vw, (max-width: 1080px) 45vw, 380px"
            style={{ objectPosition: image.position }}
          />
        </motion.div>
      </div>
      <div className="feature-story-copy">
        <span>{category}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.article>
  );
}
