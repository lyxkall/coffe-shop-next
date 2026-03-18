"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import TextReveal from "@/components/TextReveal";
import BentoGrid from "@/components/BentoGrid";
import Stats from "@/components/Stats";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Locations from "@/components/Locations";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScroll>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <main className="bg-background text-foreground min-h-screen">
          <Navbar />
          
          <SequenceScroll />

          {/* Subsequent Sections: Using negative top margin and z-index to overlay on top of the Sticky canvas */}
          <div className="relative z-10 -mt-[100vh] bg-background pt-32 overscroll-none rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
             <div className="max-w-6xl mx-auto px-6 mb-32" id="about">
               <div className="flex items-center gap-4 mb-10">
                 <div className="h-[1px] w-12 bg-coffee-400" />
                 <span className="text-sm uppercase tracking-[0.3em] font-medium text-coffee-600">The Journey</span>
               </div>
               <TextReveal>
                 We are reimagining the way the world experiences coffee. From direct harvest relationships to precise roasting curves, every step is calculated to awaken your senses.
               </TextReveal>
             </div>

             <Stats />
             
             <div id="menu">
               <BentoGrid />
             </div>

             <div id="locations">
               <Locations />
             </div>

             <TestimonialSlider />
             
             <CTA />
          </div>

          <Footer />
        </main>
      )}
    </SmoothScroll>
  );
}
