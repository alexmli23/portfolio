"use client"
import Navbar from "../components/Navbar";
import ProjectsGallery from "../components/ProjectsGallery";

export default function projectsPage(){
    return(
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 justify-center items-center text-black text-">
                <ProjectsGallery />
            </div>
        </div>
    );
}