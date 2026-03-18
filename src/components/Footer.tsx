"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 px-6 md:px-12 relative z-40 border-t border-white/10 flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10 mb-20 mt-10">
        <div className="text-center md:text-left">
           <h3 className="text-2xl uppercase tracking-widest font-bold mb-4">Kedai Cengkar</h3>
           <p className="text-sm opacity-60 max-w-[200px]">Elevating the daily ritual, one cup at a time.</p>
        </div>
        
        <div className="flex gap-16 uppercase text-sm tracking-widest font-medium">
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="hover:text-accent transition-colors">Shop</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Brew Guide</a></li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">TikTok</a></li>
          </ul>
        </div>
      </div>

      <div className="w-full overflow-hidden flex flex-col items-center">
         <motion.h1 
           initial={{ y: "100%" }}
           whileInView={{ y: 0 }}
           transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
           viewport={{ once: true, margin: "0px 0px -100px 0px" }}
           className="text-[15vw] leading-none uppercase tracking-tighter font-medium my-0 py-0"
         >
           
         </motion.h1>
         <div className="flex w-full justify-between items-center mt-8 text-xs uppercase tracking-widest opacity-40">
            <span>© {new Date().getFullYear()} Kedai Cengkar. All rights reserved.</span>
            <span>Made with passion.</span>
         </div>
      </div>
    </footer>
  );
}
