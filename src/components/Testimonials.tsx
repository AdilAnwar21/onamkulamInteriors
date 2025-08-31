import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "Fast and accurate at solving mental math problems involving addition, subtraction, multiplication, division and percentages but without high-level skills that might be required in jobs requiring complex calculation and analysis.",
    name: "Renee Calhoun",
    role: "CEO Woolley",
    avatar: "/avatars/avatar1.jpg",
  },
  {
    id: 2,
    text: "Their attention to detail and consistent delivery made a big impact on our business. Highly recommend working with them!",
    name: "Emily Carter",
    role: "Product Manager",
    avatar: "/avatars/avatar2.jpg",
  },
  {
    id: 3,
    text: "An exceptional team player who brings both creativity and analytical skills to the table. Truly invaluable.",
    name: "Michael Smith",
    role: "CTO Rebel Architect",
    avatar: "/avatars/avatar3.jpg",
  },
];

const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => next(), 5000);
    return () => clearInterval(t);
  }, [index]);

  const prev = () => setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center">
      
      {/* Testimonial Content */}
      <div className="relative max-w-4xl mx-auto min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="text-lg sm:text-xl md:text-2xl font-light italic text-gray-800 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            “{TESTIMONIALS[index].text}”
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-gray-100 shadow hover:bg-gray-200"
        >
          ‹
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={next}
          className="p-2 rounded-full bg-gray-100 shadow hover:bg-gray-200"
        >
          ›
        </button>
      </div>

      {/* Avatars */}
      <div className="flex items-center justify-center mt-10 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setIndex(i)}
            className={`rounded-full border-2 p-1 transition ${
              i === index ? "border-orange-400" : "border-transparent opacity-60"
            }`}
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-14 h-14 rounded-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Author */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold">{TESTIMONIALS[index].name}</h4>
        <p className="text-sm text-orange-500">{TESTIMONIALS[index].role}</p>
      </div>
    </div>
  );
};

export default Testimonials;
