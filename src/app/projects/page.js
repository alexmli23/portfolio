"use client"
import ProjectsNavbar from "../components/ProjectsNavbar";
import ProjectsGallery from "../components/ProjectsGallery";

export default function projectsPage(){
    return(
        <div className="relative min-h-screen flex flex-col">
            <ProjectsNavbar />
            <div className="flex flex-1 justify-center items-center text-black text-">
                <ProjectsGallery />
            </div>
        </div>
    );
}