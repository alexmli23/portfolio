"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const ProjectsNavbar = () => {
  const pathname = usePathname();

  const linkClass = (href, exact = false) => {
    const isActive = exact
      ? pathname === href // exact match (for home link)
      : pathname.startsWith(href); // prefix match (for other links)

    return `relative hover:text-black after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 ${
      isActive ? "after:w-full after:left-0 text-black" : ""
    }`;
  };

  return (
    <div className="absolute top-0 left-0 w-full z-20 flex justify-between px-10 py-6 text-black/90 lg:text-[85%] 2xl:text-[150%] uppercase tracking-wide font-serif">
      <Link href={`${basePath}/`} className={linkClass(`${basePath}/`, true)}>
        <span>Alexander M. Li</span>
      </Link>
      <div className="space-x-6 flex">
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
          href={`/Alex_M_Li_Resume_Copy.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative hover:text-black after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
        >
          Resume
        </a>
      </div>
    </div>
  );
};

export default ProjectsNavbar;
