import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Replace with your logo paths
const logos = [
  "/img/logo/logo-1.png",
  "/img/logo/logo-2.png",
  "/img/logo/logo-3.png",
  "/img/logo/logo-4.png",
  "/img/logo/logo-5.png",
  "/img/logo/logo-6.png",
];

const TrustedPartners: React.FC = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto slide like Owl (every 3s)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Number of visible logos depending on screen size
  const getVisibleCount = () => {
    if (window.innerWidth < 480) return 1; // mobile
    if (window.innerWidth < 768) return 2; // tablet
    if (window.innerWidth < 1024) return 3; // small laptop
    return 4; // desktop
  };

  const visibleCount = getVisibleCount();

  return (
    <section
      className="relative py-16 px-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('/img/partners-bg.png')", // <-- replace with your background
      }}
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-white">
          OUR TRUSTED PARTNERS
        </h2>
      </div>

      {/* Carousel wrapper */}
      <div
        ref={containerRef}
        className="overflow-hidden relative max-w-6xl mx-auto cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          className="flex transition-transform duration-[1200ms] ease-in-out"
          style={{
            transform: `translateX(-${index * (100 / visibleCount)}%)`,
          }}
        >
          {logos.concat(logos).map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center px-6 logo-item"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <img
                src={logo}
                alt={`Partner ${i}`}
                className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedPartners;
