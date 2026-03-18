"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Our Story", href: "/#about" },
  { title: "Menu", href: "/#menu" },
  { title: "Locations", href: "/#locations" },
  { title: "Contact", href: "/#contact" },
];

const menuVariants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
  },
  exit: {
    scaleY: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const linkVariants = {
  initial: { y: "30vh", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const } },
  open: { y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const } },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* FIX: hapus mix-blend-difference dari header, pakai conditional class aja */}
      <header
        className={`fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 py-6 transition-colors duration-300 ${
          isOpen ? "text-foreground" : "mix-blend-difference text-white"
        }`}
      >
        {/* FIX: hapus mix-blend-difference dari Link */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter uppercase z-50 relative"
        >
        Kedai Cengkar
        </Link>

        {/* FIX: hapus mix-blend-difference dari button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 p-2 rounded-full border border-current/20 hover:bg-foreground hover:text-background transition-colors duration-300 relative"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-30 bg-coffee-900 origin-top flex flex-col justify-center px-10 md:px-24"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <div key={link.title} className="overflow-hidden">
                  <motion.div
                    custom={i}
                    variants={linkVariants}
                    initial="initial"
                    animate="open"
                    exit="initial"
                    className="origin-bottom"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-6xl md:text-8xl font-medium tracking-tighter hover:text-accent transition-colors duration-500 uppercase overflow-hidden flex items-center gap-4 group"
                    >
                      <span className="text-sm tracking-widest text-coffee-400 group-hover:text-accent transition-colors">
                        0{i + 1}
                      </span>
                      {link.title}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-10 left-10 md:left-24 right-10 flex justify-between uppercase text-xs tracking-widest text-coffee-400">
              <div className="flex gap-4">
                <a href="#" className="hover:text-foreground transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Twitter
                </a>
              </div>
              <div>© {new Date().getFullYear()} Kedai Cengkar</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}