"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate image loading or preloading the 240 frames
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(onComplete, 800); // Small delay to show 100%
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-coffee-900 text-foreground"
      initial={{ y: 0 }}
      exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center">
        <div className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Kedai Cengkar </div>
        <div className="text-6xl md:text-8xl font-light tracking-tighter">
          {progress}%
        </div>
      </div>
    </motion.div>
  );
}
