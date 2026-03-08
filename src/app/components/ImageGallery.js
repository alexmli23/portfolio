const images = [
  { src: "./SnowboardInSeattle.webp", alt: "Snowboarding in Seattle" },
  { src: "./PlaneWindow.webp", alt: "Plane back to Seattle" },
  { src: "./Cville.webp", alt: "Friends trip to UVA!" },
];

const ImageGallery = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">

      <img
        src={images[0].src}
        alt={images[0].alt}
        className="md:col-span-2 h-[40vh] w-full object-cover rounded-lg"
      />

      <img
        src={images[1].src}
        alt={images[1].alt}
        className="h-[28vh] w-full object-cover rounded-lg"
      />

      <img
        src={images[2].src}
        alt={images[2].alt}
        className="h-[28vh] w-full object-cover rounded-lg"
      />

    </div>
  );
};

export default ImageGallery