"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Magnetic from "./Magnetic";

const frameCount = 192;

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll 0-1 to frame 1-240
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);
  
  // Transform values for text overlays
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);

  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.3], [50, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.6], [50, 0]);
  const y4 = useTransform(scrollYProgress, [0.85, 0.9], [50, 0]);

  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload all images
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${numStr}.jpg`;
      // Keep reference even before loaded so array is ordered correctly
      loadedImages.push(img);
    }

    // Set images to state immediately so the render loop can start drawing
    // them as soon as they individually trigger `img.complete = true`
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Get current frame
      const currentFrame = Math.round(frameIndex.get());
      const idx = Math.max(1, Math.min(frameCount, currentFrame)) - 1;
      
      const img = images[idx];
      if (img && img.complete) {
        // Draw image keeping cover aspect ratio
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
           drawHeight = canvas.width / imgRatio;
           offsetY = (canvas.height - drawHeight) / 2;
        } else {
           drawWidth = canvas.height * imgRatio;
           offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [images, frameIndex]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-coffee-900">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 mix-blend-difference">
          {/* Section 1: 0% */}
          <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center flex flex-col items-center">
             <h1 className="text-7xl md:text-[10rem] font-medium tracking-tighter uppercase leading-none">
               Cengkar
             </h1>
             <p className="mt-6 text-xl tracking-widest uppercase text-accent">The Fine Coffee Experience</p>
          </motion.div>

          {/* Section 2: 30% */}
          <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute left-10 md:left-24 top-1/2 -translate-y-1/2 max-w-xl text-left">
             <h2 className="text-5xl md:text-7xl tracking-tighter uppercase leading-tight">
               Roasted to <br/> Perfection
             </h2>
             <p className="mt-6 text-lg tracking-wide text-coffee-400">
               Every bean is crafted with care, delivering a burst of flavor in every sip. It's not just coffee, it's an awakening.
             </p>
          </motion.div>

          {/* Section 3: 60% */}
          <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute right-10 md:right-24 top-1/2 -translate-y-1/2 max-w-xl text-right">
             <h2 className="text-5xl md:text-7xl tracking-tighter uppercase leading-tight">
               Artisanal <br/> Blend
             </h2>
             <p className="mt-6 text-lg tracking-wide text-coffee-400">
               Sourced from the finest local farmers, ensuring a sustainable and rich heritage in your cup.
             </p>
          </motion.div>

          {/* Section 4: 90% */}
          <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute flex flex-col items-center pointer-events-auto">
             <h2 className="text-4xl md:text-6xl tracking-tighter uppercase mb-10">
               Taste the difference
             </h2>
             <Magnetic>
               <button className="h-32 w-32 rounded-full border border-current flex items-center justify-center text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300">
                 Explore
               </button>
             </Magnetic>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
