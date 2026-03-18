"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "The rich, chocolatey undertones of their signature blend completely transformed my morning routine.",
    author: "Elena R.",
    role: "Coffee Enthusiast"
  },
  {
    quote: "Tuku's dedication to sustainable sourcing is just as impressive as the complex flavor profiles they deliver.",
    author: "Marcus T.",
    role: "Café Owner"
  },
  {
    quote: "Every bag feels like a masterclass in roasting. The single-origin Ethiopian is simply unmatched in clarity.",
    author: "Sarah J.",
    role: "Food Critic"
  }
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-6 bg-foreground text-background overflow-hidden relative min-h-[80vh] flex items-center">
      <div className="absolute font-outfit text-[20rem] tracking-tighter text-background/5 top-1/2 -translate-y-1/2 left-0 pointer-events-none whitespace-nowrap">
        REVIEWS REVIEWS REVIEWS
      </div>
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="flex mb-16 gap-4 items-center">
           <div className="h-[1px] w-12 bg-coffee-400" />
           <span className="text-sm uppercase tracking-[0.3em] font-medium text-coffee-600">The Word</span>
        </div>

        <div className="relative h-[300px] md:h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <p className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-12">
                "{testimonials[index].quote}"
              </p>
              <div className="flex justify-between items-end border-t border-background/20 pt-8 uppercase text-sm tracking-widest text-coffee-600">
                <span className="font-bold">{testimonials[index].author}</span>
                <span>{testimonials[index].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-3 mt-12 w-full max-w-[200px]">
           {testimonials.map((_, i) => (
             <div key={i} className="h-1 flex-1 bg-background/20 rounded-full overflow-hidden relative">
               {i === index && (
                 <motion.div 
                   className="absolute inset-0 bg-coffee-900"
                   initial={{ scaleX: 0, originX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ duration: 6, ease: "linear" }}
                 />
               )}
               {i < index && <div className="absolute inset-0 bg-coffee-900" />}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
