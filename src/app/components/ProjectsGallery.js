import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const images = [
  [
    { src: "./website.png", alt: "My Online Portfolio Website!", description: "My Own Online Portfolio!.", height: 300, width: 600, github: "https://github.com/alexmli23?tab=repositories" },
    { src: "./BookLibrary.png", alt: "Book Full Stack Website", description: "A full-stack book management application.", height: 250, width: 500, github: "https://github.com/alexmli23/Book-Library" },
  ],
  [
    { src: "./GreyScale.png", alt: "A Greyscale application to grey out discrations ", description: "A greyscale transformation project.", height: 200, width: 350, github: "https://github.com/alexmli23/Greyscale-Tabs" },
    { src: "./OrangeOpinon.png", alt: "Our Social Website the Orange Opinion", description: "A social platform for sharing opinions on trending topics.", height: 280, width: 500, github: "https://github.com/alexmli23/MadHacks2024" },
  ],
];

const ImageCard = ({ src, alt, description, height, width, github }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-gray-300 rounded-lg overflow-hidden will-change-transform"
      style={{ height, width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={src} alt={alt} className="object-cover w-full h-full rounded-md" loading="lazy" />
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4 rounded-lg"
        >
          <p className="text-lg font-semibold text-center">{alt}</p>
          <p className="text-sm text-center mt-2">{description}</p>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-white hover:bg-stone-400 text-black font-bold py-2 px-4 rounded"
          >
            Check it out!
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

const ProjectsGallery = () => {
  const renderedImages = useMemo(() => {
    return images.map((column, index) => (
      <div key={index} className="flex flex-col gap-4">
        {column.map((image, imgIndex) => (
          <ImageCard key={`${index}-${imgIndex}`} {...image} />
        ))}
      </div>
    ));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-row justify-center gap-8 mt-16 bg-[#F5F5F5]"
    >
      {renderedImages}
    </motion.div>
  );
};

export default ProjectsGallery;