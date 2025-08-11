import { motion } from "framer-motion";
import { useMemo } from "react";

const images = [
  [
    { src: "./PlaneWindow.webp", alt: "Plane back to Seattle", height: "30vh" },
    { src: "./ForestPath.webp", alt: "Forest road", height: "25vh" },
  ],
  [
    { src: "./RelaxRoom.webp", alt: "UVA Mediation Room", height: "20vh" },
    { src: "./HuluClanWalking.webp", alt: "Last day in UVA", height: "28vh" },
  ],
  [
    { src: "./SnowboardInSeattle.webp", alt: "Snowboarding in Seattle", height: "25vh" },
    { src: "./ShinyCharizard.webp", alt: "Shiny Charizard in Pocket TCG", height: "30vh" },
  ],
  [
    { src: "./Veo.webp", alt: "At UVA scootering", height: "28vh" },
    { src: "./Cville.webp", alt: "Friends trip to UVA!", height: "20vh" },
  ],
];

const ImageCard = ({ src, alt, height }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="bg-gray-300 w-full sm:w-[40vw] md:w-[10vw] rounded-lg overflow-hidden will-change-transform"
    style={{ height }}
    aria-hidden="true"
  >
    <img
      src={src}
      alt={alt}
      className="object-cover w-full h-full rounded-md"
      loading="lazy"
    />
  </motion.div>
)

const ImageGallery = () => {
  const renderedImages = useMemo(() => {
    return images.map((column, index) => (
      <div key={index} className={`flex flex-col gap-4 ${index % 2 !== 0 ? `mt-${index * 4}` : ""}`}>
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
      className="flex flex-col md:flex-row justify-center gap-8 mt-16"
    >
      {renderedImages}
    </motion.div>
  );
};

export default ImageGallery;

