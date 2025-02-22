"use client"
import Navbar from "../components/Navbar";
import ProjectsGallery from "../components/ProjectsGallery";

export default function projectsPage(){
    return(
        <div className="relative min-h-screen flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[125px] bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
            <Navbar />
            <div className="flex flex-1 justify-center items-center text-black text-">
                <ProjectsGallery />
            </div>
        </div>
    );
}