import { motion } from "framer-motion";
import { useMemo } from "react";

const images = [
  [
    { src: "/PlaneWindow.png", alt: "Plane back to Seattle", height: 300 },
    { src: "/ForestPath.png", alt: "Forest road", height: 250 },
  ],
  [
    { src: "/MonetAtAIC.png", alt: "Monet Painting at the Art Institute of Chicago", height: 200 },
    { src: "/ChiSky.png", alt: "Chicago Skyline", height: 280 },
  ],
  [
    { src: "/SnowboardInSeattle.png", alt: "Snowboarding in Seattle", height: 250 },
    { src: "/NikiConcert.png", alt: "Niki Concert in Chicago!", height: 300 },
  ],
  [
    { src: "/CarRide.png", alt: "Car Ride to Winter Retreat", height: 280 },
    { src: "/Me.png", alt: "Friends trip to Chicago!", height: 200 },
  ],
];

const ImageCard = ({ src, alt, height }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="bg-gray-300 w-[180px] rounded-lg overflow-hidden will-change-transform"
    style={{ height }}
    aria-hidden="true"
  >
    <img src={src} alt={alt} className="object-cover w-full h-full rounded-md" loading="lazy" />
  </motion.div>
);

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
      className="flex flex-row justify-center gap-8 mt-16"
    >
      {renderedImages}
    </motion.div>
  );
};

export default ImageGallery;

