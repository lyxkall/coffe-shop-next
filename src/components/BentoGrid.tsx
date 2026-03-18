"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BentoGrid() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const smY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const lgY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={container} className="py-24 px-6 md:px-12 max-w-[100rem] mx-auto opacity-90 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 mb-6 h-auto md:h-[60vh]">
        
        {/* Large Block */}
        <motion.div 
          style={{ y: smY }}
          className="flex-1 bg-coffee-600 rounded-[2rem] p-10 flex flex-col justify-end relative overflow-hidden group min-h-[40vh]"
        >
           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
           <img 
              src="/sequence/ezgif-frame-050.jpg" 
              alt="Coffee beans" 
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
           />
           <div className="relative z-20 mt-auto">
             <h3 className="text-4xl md:text-5xl uppercase tracking-tight text-white mix-blend-difference mb-2">Single Origin</h3>
             <p className="text-white/80 max-w-sm mix-blend-difference">Discover the unique profiles of our Ethiopian Yirgacheffe harvest.</p>
           </div>
        </motion.div>

        {/* Small Block */}
        <motion.div 
          style={{ y: lgY }}
          className="w-full md:w-1/3 bg-accent rounded-[2rem] p-10 flex flex-col items-center justify-center text-coffee-900 group min-h-[40vh]"
        >
           <h3 className="text-6xl font-medium tracking-tighter mb-4 uppercase">100%</h3>
           <p className="text-center font-medium uppercase tracking-widest text-sm">Direct Trade</p>
           <p className="text-center mt-6 text-sm opacity-80 max-w-[200px]">Empowering farmers through ethical sourcing and fair partnerships.</p>
        </motion.div>

      </div>

      <div className="flex flex-col-reverse md:flex-row gap-6 h-auto md:h-[50vh]">
        
        {/* Small Block 2 */}
        <motion.div 
          style={{ y: lgY }}
          className="w-full md:w-2/5 bg-coffee-400 rounded-[2rem] p-10 flex flex-col justify-between text-background group min-h-[40vh]"
        >
           <div className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center group-hover:bg-background group-hover:text-coffee-900 transition-colors">
             <span className="text-xl">↗</span>
           </div>
           <div>
             <h3 className="text-3xl uppercase tracking-tight mb-2">Our Manifesto</h3>
             <p className="opacity-80 text-sm max-w-xs">We believe in quality over quantity. Every batch is roasted to specific profiles to extract the intended notes.</p>
           </div>
        </motion.div>

        {/* Medium Block */}
        <motion.div 
          style={{ y: smY }}
          className="flex-1 bg-coffee-600 rounded-[2rem] overflow-hidden relative group min-h-[40vh]"
        >
           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
           <img 
              src="/sequence/ezgif-frame-120.jpg" 
              alt="Pour over coffee" 
              className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
           />
           <div className="absolute inset-0 z-20 p-10 flex items-center justify-center">
             <h3 className="text-5xl md:text-7xl uppercase tracking-tighter text-white mix-blend-overlay font-light opacity-50 group-hover:opacity-100 transition-opacity">
               Brew Guide
             </h3>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
