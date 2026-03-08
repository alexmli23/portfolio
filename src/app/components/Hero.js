"use client";

import { motion } from "framer-motion";

export default function Hero({ fadeOpacity, blurEffect, scaleEffect }) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden font-serif">

      {/* Background Image */}
      <motion.div
        style={{
          opacity: fadeOpacity,
          filter: `blur(${blurEffect})`,
          scale: scaleEffect,
        }}
        className="absolute inset-0"
      >
        <img
          src="/Paris2026.jpg"
          alt="Paris"
          className="w-full h-full object-cover"
        />

        {/* subtle dark overlay */}
        <div className="absolute inset-0 bg-black/25" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col justify-center min-h-screen max-w-6xl mx-auto px-8 text-white"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Alex
        </h1>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <i>Madison</i> Li
        </h1>

        <p className="mt-4 text-xl md:text-2xl text-white">
          Computer Science & History
        </p>

        <p className="text-lg text-white">
          University of Wisconsin–Madison
        </p>

        <div className="mt-10 w-24 border-t border-white"></div>

        <p className="mt-4 text-sm tracking-wide text-white">
          Paris — 2026
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest">
        SCROLL
      </div>

    </div>
  );
}