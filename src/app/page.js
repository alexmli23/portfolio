"use client"
import Image from "next/image"
import Navbar from "./components/Navbar"
import ImageGallery from "./components/ImageGallery"
import { motion, useScroll, useTransform } from "framer-motion"
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
  const fadeInNewScreen = useTransform(scrollY, [400,800], [0, 1]);
  const blurEffect = useTransform(scrollY, [500, 1000], ["0px", "20px"]);
  const scaleEffect = useTransform(scrollY, [400, 1000], [1.1, 1]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden font-serif">
      {/* Black Overlay on Top*/}
      <div className="absolute top-0 left-0 w-full h-[125px] bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
        <Navbar />
      <motion.div 
        initia={{ opacity:0 }}
        animate={{ opacity: 1}}
        transition={{ duration: 1.5 }}
        className="relative w-full min-h-[130vh] overflow-hidden"
        >

        <motion.div 
          style={{
            opacity: fadeOpacity,
            filter: 'blur(${blurEffect})',
            scale: scaleEffect,
          }}
          className="absolute top-0 left-0 w-full h-full">
          <img
            src="./WandererAboveFog.jpeg"
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
          <motion.div
            style = {{ opacity: fadeOpacity }}
            className="absolute bottom-0 w-full h-[250px] bg-gradient-to-b from-transparent to-white"
          >

          </motion.div>
        </motion.div>

        <motion.div 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: -80 }}
  transition={{ duration: 1, delay: 0.3 }}
  className="absolute top-[43%] left-[5%] translate-y-[-50%] z-10 flex flex-col items-start md:flex-row md:items-center md:space-x-8"
>
  {/* Name & Job Title */}
  <div>
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-100 transition-opacity duration-0 hover:duration-50 pointer-events-none"></div>
      <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[550%] font-bold tracking-wide relative z-10 text-white hover:bg-black hover:bg-opacity-100 transition duration-50">
        Alexander M. Li
      </h1>
    </div>
    <div className="relative mt-2">
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity duration-0 hover:duration-50 pointer-events-none"></div>
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-[222%] font-light relative z-10 text-white hover:bg-black hover:bg-opacity-100 transition duration-50">
        Software Engineer
      </h2>
    </div>
  </div>

  {/* Description & Contact Button */}
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.3 }}
    className="md:mt-0 lg: top-[-12%] lg:absolute lg:left-[120%] md:w-[25vw] max-w-[1000px] min-w-[250px] text-white/90 text-sm sm:text-base md:text-lg lg:text-[120%]"
  >
    <div className="relative group">
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      <div className="relative z-10 p-4">
        <p className="leading-relaxed">
          I am a developer and history enthusiast, bridging technology with the past. I love elegant design, structured code, and meaningful experiences.
        </p>
        <div className="mt-6">
          <a
            href="mailto:amli2@wisc.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/40 rounded-full text-white/90 hover:bg-white/20 transition duration-200"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  </motion.div>
</motion.div>


      </motion.div>
      
      <motion.div
        style={{
          opacity: fadeOpacity,
          backdropFilter: `blur(${blurEffect})`,
          bottom: `${imageHeight * 0.785}px`, // 78.5% of the image height
        }}
        className="absolute w-full h-[400px] bg-gradient-to-b from-transparent to-black"
      ></motion.div>

    
      <motion.div
        style={{ opacity: fadeInNewScreen }}
        className="w-full min-h-screen bg-[#F5F5F5] text-black flex justify-start p-12 flex-col font-serif"
      > 
          <hr className="w-[85%] border-t-4 border-gray-300 mx-auto" />

          <motion.h2 className="mt-12 ml-10 text-6xl font-bold">
            My Portfolio Website
          </motion.h2>

          <h3 className=" ml-11 text-2xl">
            University of Wisconsin–Madison 
          </h3>
          <h3 className="ml-11">
              2023-2027
          </h3>
          <h3 className="ml-11">
              B.S. Computer Science & History 
          </h3>
        <motion.div
        style={{ opacity: fadeInNewScreen }}
        className="w-full bg-[#F5F5F5] text-black flex justify-start p-12 flex-col"
        >
          <p className="text-xl sm:text-lg md:text-base">
            My name is Alex, and I'm currently a junior at the University of Wisconsin - Madison, studying Computer Science 
            and History. I have a strong interest in software development, with prior experience at Wisconsin Athletics
           and Madison Bach Musicians, where I contributed to projects that enhanced digital infrastructure and user 
           experiences. My passion for history lies in Early Modern European History, where I explore the political, 
           social, and cultural transformations that shaped the modern world. By combining my technical expertise with 
           my historical curiosity, I enjoy analyzing patterns across time, whether in coding challenges or historical 
           narratives.
          </p>
          <p className="mt-10 text-xl sm:text-lg md:text-base">
          Outside of school, my hobbies include working out, swimming, hanging out with friends, and exploring history. 
          I enjoy staying active, whether it’s lifting, swimming, or competing in club swimming. I also love reading about 
          historical & present events, especially Early Modern European History, and discovering how the past shapes the present.
          </p>
          <p className="mt-10 text-xl">
            I'm currently reading:&nbsp; 
            <a href="https://www.goodreads.com/book/show/609614.True_Love"
               target="_blank" 
               rel = "noopener noreferrer"
               className="text-blue-600 underline">
               True Love 
            </a>
            &nbsp;by Thich Nhat Hanh
          </p>
          <p className="text-xl">
            I also do leetcode:  &nbsp;
            <a href="https://leetcode.com/u/alexmli/"
              target="_blank" 
              rel = "noopener noreferrer"
              className="text-blue-600 underline">
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
          <h1 className="font-bold text-5xl">
            Everyone has a story.
          </h1>
          <h1 className="mt-3 text-2xl">
            Here's my story this year through photos
          </h1>
          
          <div className="flex flex-row justify-center gap-8">
           
          </div>
            <ImageGallery />
        </div>
        
        <div className="flex flex-col justify-start relative bottom-0 mt-20 font-serif text-gray-900">
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