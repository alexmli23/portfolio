"use client";
import Link from 'next/link';
import { usePathname } from "next/navigation";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';


const Navbar = () => {
  const pathname = usePathname();
  const isProjectsPage = pathname.startsWith(`${basePath}/projects`);
  return (
    <div className="absolute top-0 left-0 w-full z-20 flex justify-between px-10 py-6 lg:text-[85%] 2xl:text-[150%] uppercase tracking-wide font-serif">
      <Link href={`${basePath}/`} className={`relative 
        text-${isProjectsPage ? "black" : "white"} 
       hover:text-${isProjectsPage ? "black" : "white"} 
        after:content-[''] after:absolute after:left-1/2 after:bottom-0 
        after:w-0 after:h-[2px] after:bg-${isProjectsPage ? "black" : "white"} 
        after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 
        hover:after:bg-${isProjectsPage ? "black" : "white"}`}>
        <span>Alexander M. Li</span>
      </Link>
      <div className="space-x-6 flex">
        <Link href={`${basePath}/projects`}  className={`relative 
        text-${isProjectsPage ? "black" : "white"} 
       hover:text-${isProjectsPage ? "black" : "white"} 
        after:content-[''] after:absolute after:left-1/2 after:bottom-0 
        after:w-0 after:h-[2px] after:bg-${isProjectsPage ? "black" : "white"} 
        after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 
        hover:after:bg-${isProjectsPage ? "black" : "white"}`}>
          Projects
        </Link>
        <Link href={`${basePath}/Alex_swe_Resume_copy.pdf`} 
           target="_blank"
           rel="noopener noreferrer"
           className={`relative 
            text-${isProjectsPage ? "black" : "white"} 
           hover:text-${isProjectsPage ? "black" : "white"} 
            after:content-[''] after:absolute after:left-1/2 after:bottom-0 
            after:w-0 after:h-[2px] after:bg-${isProjectsPage ? "black" : "white"} 
            after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 
            hover:after:bg-${isProjectsPage ? "black" : "white"}`}>
          Resume
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
