import React from "react";
import { motion } from "framer-motion";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const PartnersCarousel: React.FC = () => {
  const partners: Partner[] = [
    { id: 1, name: "CraftGenic", logo: "https://dummyimage.com/200x100/ccc/000&text=CraftGenic" },
    { id: 2, name: "Design Ripple", logo: "https://dummyimage.com/200x100/ccc/000&text=DesignRipple" },
    { id: 3, name: "Neural Construct", logo: "https://dummyimage.com/200x100/ccc/000&text=Neural" },
    { id: 4, name: "Rebel Architect", logo: "https://dummyimage.com/200x100/ccc/000&text=Rebel" },
    { id: 5, name: "ModernSpace", logo: "https://dummyimage.com/200x100/ccc/000&text=Modern" },
    { id: 6, name: "UrbanFlow", logo: "https://dummyimage.com/200x100/ccc/000&text=Urban" },
  ];

  const loopedPartners = [...partners, ...partners];

  return (
    <div className="relative bg-white py-16 overflow-hidden">
      {/* Section wrapper inside orange bars */}
      <div className="relative w-[71.6%] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            OUR TRUSTED PARTNERS
          </h2>
          {/* Orange underline (SVG curve) */}
          <div className="flex justify-center mt-3">
            <svg
              width="220"
              height="20"
              viewBox="0 0 220 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 15C60 5 160 5 215 15"
                stroke="#C9732A"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          className="flex space-x-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {loopedPartners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-none w-40 h-20"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-14 object-contain filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnersCarousel;
