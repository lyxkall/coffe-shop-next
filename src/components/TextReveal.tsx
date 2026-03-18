"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

interface TextRevealProps {
  children: string;
  className?: string;
}

export default function TextReveal({ children, className }: TextRevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = children.split(" ");
  
  return (
    <p ref={container} className={clsx("flex flex-wrap text-4xl md:text-6xl font-medium tracking-tighter uppercase leading-[1.1]", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mr-[0.25em] mt-[0.25em]">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
