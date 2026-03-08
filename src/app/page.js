"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import ImageGallery from "./components/ImageGallery";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import About from "./components/About";
import Reading from "./components/Reading";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

export default function Home() {
  const [imageHeight, setImageHeight] = useState(0);

  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      setImageHeight(imgRef.current.clientHeight);
    }
  }, []);

  const { scrollY } = useScroll();
  const fadeOpacity = useTransform(scrollY, [400, 900], [1, 0]);
  const fadeInNewScreen = useTransform(scrollY, [400, 800], [0, 1]);
  const blurEffect = useTransform(scrollY, [500, 1000], ["0px", "20px"]);
  const scaleEffect = useTransform(scrollY, [400, 1000], [1.1, 1]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden font-serif">
      {/* Black Overlay on Top*/}

      <div className="absolute top-0 left-0 w-full h-[125px] bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>

      <div className="text-white/90">
        <Navbar />
      </div>

      <div>
        <Hero />
      </div>

      <div>
         <About />
       </div>

      <div>
        <Projects />
      </div>

      <div>
       <Reading />
      </div>

      <div className="bg-[#F5F5F5]">
        <hr className="w-[85%] border-t-4 border-gray-300 mx-auto bg-[#F5F5F5]" />
      </div>

     <section className="bg-[#F5F5F5] py-20">
  <div className="max-w-[1100px] mx-auto px-10">

    <span className="font-mono text-xs tracking-widest text-gray-500">
      Entry 004 — Contact
    </span>

    <hr className="border-t-[3px] border-gray-300 mt-2 mb-12" />

    <div className="grid md:grid-cols-2 gap-16 items-start">

      <h2 className="text-5xl md:text-6xl font-bold leading-tight">
        Let's
        <br />
        Connect.
      </h2>

      <div className="flex flex-col gap-6 font-mono text-lg">

        <a
          href="https://www.linkedin.com/in/alexanderli523/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-gray-300 pb-2 hover:text-[#005582] transition"
        >
          LinkedIn →
        </a>

        <a
          href="https://github.com/alexmli23"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-gray-300 pb-2 hover:text-black transition"
        >
          GitHub →
        </a>

        <a
          href="mailto:amli2@wisc.edu"
          className="border-b border-gray-300 pb-2 hover:text-[#8b0000] transition"
        >
          Email →
        </a>

      </div>

    </div>
  </div>
</section>
    </div>
  );
}
