import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Product Manager",
    company: "TechCorp",
    text: "Fast and accurate at solving mental math problems involving addition, subtraction, multiplication, division and percentages but without high-level skills that might be required in jobs requiring complex calculation and analysis.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Bob Martinez",
    title: "Data Analyst",
    company: "DataFlow",
    text: "This platform revolutionized our workflow with its intuitive design and powerful features. The seamless integration with our existing tools made adoption effortless across our entire team.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Renee Calhoun",
    title: "CEO",
    company: "Woolley",
    text: "Fast and accurate at solving mental math problems involving addition, subtraction, multiplication, division and percentages but without high-level skills that might be required in jobs requiring complex calculation and analysis.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Diana Chen",
    title: "Engineering Lead",
    company: "InnovateLab",
    text: "Outstanding performance and reliability. The robust architecture handles our complex requirements while maintaining simplicity for end users. A perfect balance of power and usability.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Ethan Wilson",
    title: "Business Director",
    company: "GrowthVentures",
    text: "The ROI we've seen since implementation has exceeded all expectations. Not only did it streamline our operations, but it also opened up new possibilities we hadn't considered.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(next, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  const handleDragEnd = (event:any, info:any) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prev();
    } else if (info.offset.x < -threshold) {
      next();
    }
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const getVisibleTestimonials = () => {
    const result = [];
    const totalVisible = 5;
    const startIndex = currentIndex - Math.floor(totalVisible / 2);

    for (let i = 0; i < totalVisible; i++) {
      const index = (startIndex + i + testimonials.length) % testimonials.length;
      result.push({ ...testimonials[index], position: i - Math.floor(totalVisible / 2) });
    }
    return result;
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Container that fits between the orange rectangles */}
      <div className="relative w-full mx-auto px-16 sm:px-20 md:px-24 lg:px-28 xl:px-32 py-8 sm:py-12 md:py-16">
        <div className="relative mx-auto max-w-5xl">
          
          {/* Main testimonial card */}
          <div
            className="relative mb-12 sm:mb-16 md:mb-20 px-4 sm:px-8 py-6 sm:py-8 bg-white"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: "grabbing" }}
              className="cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-center relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed italic font-light"
                  >
                    "{currentTestimonial.text}"
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Navigation buttons */}
            <motion.button
              onClick={prev}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute left-0 sm:-left-4 md:-left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 focus:outline-none z-30 opacity-80 hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </motion.button>
            
            <motion.button
              onClick={next}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute right-0 sm:-right-4 md:-right-8 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 focus:outline-none z-30 opacity-80 hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </motion.button>
          </div>

          {/* Bottom profile carousel */}
          <div className="relative">
            <motion.div
              className="flex items-end justify-center space-x-8 sm:space-x-10 md:space-x-12 lg:space-x-14"
            >
              {getVisibleTestimonials().map((testimonial) => {
                const isCenter = testimonial.id === currentTestimonial.id;
                const scale = isCenter ? 1.5 : (Math.abs(testimonial.position) === 1 ? 1 : 0.7);
                const opacity = isCenter ? 1 : (Math.abs(testimonial.position) === 1 ? 0.7 : 0.3);
                const yOffset = isCenter ? -10 : 0;

                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale, opacity, y: yOffset }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="flex flex-col items-center cursor-pointer relative z-20"
                    onClick={() => {
                      setCurrentIndex(testimonials.findIndex(t => t.id === testimonial.id));
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 2000);
                    }}
                    whileHover={{
                      scale: isCenter ? 1.55 : (Math.abs(testimonial.position) === 1 ? 1.05 : 0.75),
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className={`relative rounded-full transition-all duration-300 ${
                      isCenter ? 'ring-4 ring-orange-500 ring-offset-4 ring-offset-white' : ''
                    }`}>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className={`rounded-full object-cover shadow-md transition-all duration-300 ${
                          isCenter
                            ? 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28'
                            : 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20'
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* Name and title below all images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-6 sm:mt-8 text-center"
              >
                <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900">
                  {currentTestimonial.name}
                </h3>
                <p className="text-orange-600 font-semibold text-sm sm:text-base md:text-lg">
                  {currentTestimonial.title} {currentTestimonial.company}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}