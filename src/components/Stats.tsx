"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  label: string;
}

function Counter({ value, label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [started, setStarted] = useState(false);
  
  const spring = useSpring(0, {
     stiffness: 50,
     damping: 20,
     duration: 3000
  });
  
  const display = useTransform(spring, (val) => Math.floor(val));

  useEffect(() => {
    if (isInView && !started) {
      spring.set(value);
      setStarted(true);
    }
  }, [isInView, spring, value, started]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-7xl md:text-[8rem] font-light tracking-tighter text-accent flex">
        <motion.span>{display}</motion.span>
        <span>+</span>
      </div>
      <div className="text-sm uppercase tracking-[0.3em] font-medium text-coffee-400 mt-4">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-32 px-6 border-y border-foreground/10">
       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
         <Counter value={540} label="Stores Nationwide" />
         <Counter value={12} label="Signature Blends" />
         <Counter value={2} label="Million Cups Served" />
       </div>
    </section>
  );
}
