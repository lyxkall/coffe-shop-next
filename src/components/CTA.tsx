"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "./Magnetic";

export default function CTA() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.1]);

  return (
    <section ref={container} className="relative h-screen flex items-center justify-center overflow-hidden bg-coffee-900 border-t border-background/10 rounded-t-[3rem] mt-[-3rem] z-30">
       <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-coffee-900 to-transparent z-10 opacity-80 mix-blend-multiply" />
          <img 
            src="/sequence/ezgif-frame-200.jpg" 
            alt="Coffee cup abstract" 
            className="w-full h-full object-cover opacity-30" 
          />
       </motion.div>

       <div className="relative z-20 flex flex-col items-center text-center px-6">
          <h2 className="text-6xl md:text-9xl font-light uppercase tracking-tighter mix-blend-difference mb-12">
            Ready to <br/> <span className="text-accent italic font-serif lowercase">Taste</span> <br/> the Magic?
          </h2>
          <Magnetic>
             <button className="bg-foreground text-background h-40 w-40 rounded-full flex flex-col items-center justify-center text-sm tracking-[0.3em] font-medium uppercase hover:scale-110 transition-transform duration-500">
               <span>Shop</span>
               <span>Now</span>
             </button>
          </Magnetic>
       </div>
    </section>
  );
}
