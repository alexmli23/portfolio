"use client";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const Navbar = () => {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isProjectsPage = pathname.startsWith(`${basePath}/projects`);

  return (
    <div className="absolute top-0 left-0 w-full z-20 flex justify-between px-10 py-6 text-white/90 lg:text-[85%] 2xl:text-[150%] uppercase tracking-wide font-serif">
      <Link
        href={`${basePath}/`}
        className={`relative ${
          isProjectsPage ? "text-black hover:text-black after:bg-black" : "text-white hover:text-white after:bg-white"
        } after:content-[''] after:absolute after:left-1/2 after:bottom-0 
        after:w-0 after:h-[2px] after:transition-all after:duration-300 
        hover:after:w-full hover:after:left-0`}
      >
        <span>Alexander M. Li</span>
      </Link>

      <div className="space-x-6 flex">
        <Link
          href={`${basePath}/projects`}
          className={`relative ${
            isProjectsPage ? "text-black hover:text-black after:bg-black" : "text-white hover:text-white after:bg-white"
          } after:content-[''] after:absolute after:left-1/2 after:bottom-0 
          after:w-0 after:h-[2px] after:transition-all after:duration-300 
          hover:after:w-full hover:after:left-0`}
        >
          Projects
        </Link>
        <Link
          href={`${basePath}/Alex_swe_Resume_copy.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative ${
            isProjectsPage ? "text-black hover:text-black after:bg-black" : "text-white hover:text-white after:bg-white"
          } after:content-[''] after:absolute after:left-1/2 after:bottom-0 
          after:w-0 after:h-[2px] after:transition-all after:duration-300 
          hover:after:w-full hover:after:left-0`}
        >
          Resume
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
