"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Navbar = () => {
  const pathname = usePathname();

  const linkClass = (href, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return `relative hover:text-white 
      after:content-[''] after:absolute after:left-0 after:bottom-0 
      after:h-[2px] after:bg-white after:transition-all after:duration-300 
      after:w-0 hover:after:w-full
      ${isActive ? "after:w-full text-white" : ""}`;
  };

  return (
    <div
      className="
        absolute top-0 left-0 w-full z-20 flex justify-between items-center
        px-4 py-3 text-white/90
        sm:px-6 sm:py-4
        md:px-8 md:py-5
        lg:px-10 lg:py-6
        text-sm sm:text-base lg:text-[85%] 2xl:text-[150%]
        uppercase tracking-wide font-serif
      "
    >
      <Link href={`${basePath}/`} className={linkClass(`${basePath}/`, true)}>
        <span>Alexander M. Li</span>
      </Link>
      <div className="space-x-4 sm:space-x-6 flex text-sm sm:text-base">
        <Link
          href={`${basePath}/research`}
          className={linkClass(`${basePath}/research`)}
        >
          Research
        </Link>
        <Link
          href={`${basePath}/projects`}
          className={linkClass(`${basePath}/projects`)}
        >
          Projects
        </Link>
        <a
          href="/Alex_M_Li_Resume_Copy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative hover:text-white 
            after:content-[''] after:absolute after:left-0 after:bottom-0 
            after:h-[2px] after:bg-white after:transition-all after:duration-300 
            after:w-0 hover:after:w-full"
        >
          Resume
        </a>
      </div>
    </div>
  );
};

export default Navbar;
