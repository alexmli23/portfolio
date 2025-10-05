"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import ImageGallery from "./components/ImageGallery";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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

      <motion.div
        initia={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative w-full min-h-screen overflow-hidden"
      >
        <motion.div
          style={{
            opacity: fadeOpacity,

            filter: "blur(${blurEffect})",

            scale: scaleEffect,
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <img
            src="./wivenhoe_park_essex_1942.9.10.jpg"
            alt="Background"
            className="w-full h-full object-cover object-center"
          />

          <motion.div
            style={{ opacity: fadeOpacity }}
            className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-white"
          ></motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: -80 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-[83%] translate-y-[-50%] z-10 flex flex-col md:flex-row md:items-center md:justify-between w-full px-6"
        >
          {/* Left section */}
          <div className="relative md:left-[5%] lg:left-[2%] px-4 md:px-0">
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white hover:bg-black hover:bg-opacity-100 transition duration-200 leading-tight px-2 py-1 inline-block">
              Alex Madison Li
            </h1>

            <div className="mt-2">
              <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white hover:bg-black hover:bg-opacity-100 transition duration-200 leading-snug px-2 py-1 inline-block">
                Software Engineer Co-op @ MKS
              </h2>
            </div>
          </div>

          {/* Right section */}
          <div className="px-4 mt-32">
            <h2 className="text-xs text-white">
              <a href="https://www.nga.gov/artworks/1147-wivenhoe-park-essex"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-grab"
            >Wivenhoe Park, Essex</a>
            </h2>
            <p className="text-xs text-white opacity-80">
              John Constable, 1816
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{
          opacity: fadeOpacity,

          backdropFilter: `blur(${blurEffect})`,

          bottom: `${imageHeight * 0.785}px`,
        }}
        className="absolute w-full h-[400px] bg-gradient-to-b from-transparent to-black"
      ></motion.div>

      <motion.div
        style={{ opacity: fadeInNewScreen }}
        className="w-full min-h-[800px] bg-[#F5F5F5] text-black flex justify-start p-12 flex-col font-serif"
      >
        <hr className="w-[85%] border-t-4 border-gray-300 mx-auto" />

        <motion.h2 className="mt-12 lg:ml-11 sm:ml-4 text-6xl font-bold">
          My Portfolio Website
        </motion.h2>
        <div className="lg:ml-11 sm:ml-4">
          <h3 className="text-2xl">University of Wisconsin–Madison</h3>
          <h3 className="">Graduation: May 2027</h3>
          <h3 className="">B.S. Computer Science & History</h3>
        </div>
        <motion.div
          style={{ opacity: fadeInNewScreen }}
          className="w-full lg:p-12 sm:p-4 bg-[#F5F5F5] text-black flex justify-start flex-col"
        >
          <p className="lg:text-xl sm:text-sm ">
            My name is Alex, and I'm currently a junior at UW-Madison! I'm
            currently studying Computer Science and History. My Interest in
            Computer Science relates to embedded systems work. On the other hand
            I love learning more about European History espeically Early Modern
            Europe. This fall semseter I'm working at MKS as a Software
            Engineer, and next semester I'll be studying abroad in Italy at
            the&nbsp;
            <a
              href="https://www.unibo.it/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              University of Bologna
            </a>
            ! Outside of school and work, I love to workout, play games, and
            doomscroll!
          </p>

          <p className="mt-10 lg:text-xl sm: text-sm">
            Currently I'm working on:
          </p>

          <ul className="list-disc list-inside">
            <li>
              This website, hopefully I can start doing writeups on interesting
              things I learned in history!
            </li>

            <li>
              An DIY ESP32-IMU setup that streams live orientation data over
              Bluetooth to your laptop or phone, rotating a 3D model in real
              time like a mini AR/VR sensor pipeline
            </li>
          </ul>

          <p className="mt-10 lg:text-xl sm: text-sm">
            I just read:&nbsp;
            <a
              href="https://www.goodreads.com/book/show/129915654-pride-and-prejudice?ref=nav_sb_ss_1_14"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Pride & Prejudice
            </a>
            &nbsp;by Jane Austen
          </p>

          <p className="lg:text-xl sm: text-sm">
            I'm currently reading:&nbsp;
            <a
              href="https://www.goodreads.com/book/show/33257757-iron-gold"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Iron Gold
            </a>
            &nbsp;by Pierce Brown
          </p>

          <p className="lg:text-xl sm: text-sm">
            <a
              href="https://www.goodreads.com/friend/i?feature=friend-invite-url&invite_token=ZmMyYjJiM2ItZmY5Ni00OGExLWExOGQtMzYzNDE5YzcxNzMx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Become my GoodReads friend?
            </a>
          </p>

          <p className="lg:text-xl sm: text-sml mt-5">
            I also do leetcode: &nbsp;
            <a
              href="https://leetcode.com/u/alexmli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Check it out!
            </a>
          </p>
        </motion.div>
      </motion.div>

      <div className="bg-[#F5F5F5]">
        <hr className="w-[85%] border-t-4 border-gray-300 mx-auto bg-[#F5F5F5]" />
      </div>

      <motion.div
        style={{ opacity: fadeInNewScreen }}
        className="w-full min-h-screen bg-[#F5F5F5] text-black flex justify-start p-12 flex-col font-serif"
      >
        <div className="flex flex-col items-center min-h-screen">
          <h1 className="font-bold text-5xl">Everyone has a story.</h1>

          <h1 className="mt-3 text-2xl">
            Here's my story this year through photos
          </h1>

          <div className="flex flex-row justify-center gap-8"></div>

          <ImageGallery />
        </div>

        <div className="flex flex-col justify-start relative bottom-0 font-serif text-gray-900">
          {/* Heading & Links */}

          <div className="flex flex-col sm:flex-row items-center mt-2">
            <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-wide text-center sm:text-left">
              Let's Connect
            </h1>

            <div className="flex flex-col sm:flex-row sm:ml-12 sm:space-x-12 mt-3 text-xl sm:text-2xl md:text-4xl font-light text-center sm:text-left">
              <a
                href="https://www.linkedin.com/in/alexanderli523/"
                className="text-[#5a5a5a] hover:text-[#005582] transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/alexmli23"
                className="text-[#5a5a5a] hover:text-[#222] transition-colors duration-300 sm:ml-12"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>

              <a
                href="mailto:amli2@wisc.edu"
                className="text-[#5a5a5a] hover:text-[#8b0000] transition-colors duration-300 sm:ml-12"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
            </div>
          </div>

          {/* Divider */}

          <hr className="w-[90%] sm:w-[82%] border-t-2 border-gray-400 mt-4" />
        </div>
      </motion.div>
    </div>
  );
}
