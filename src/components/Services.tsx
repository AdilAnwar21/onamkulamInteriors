import { useRef, useState, memo } from "react";
import { motion, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";

interface ServicesScrollProps {
  scrollProgress: MotionValue<number>;
}

// --- STATIC DATA ---
const services = [
  {
    id: 1,
    title: "Renovation & Remodeling",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: 2,
    title: "Interior Design",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: 3,
    title: "Space Planning",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    ],
  },
];

const allItems = services.flatMap(service =>
  service.images.map(image => ({
    title: service.title,
    image: image,
    serviceId: service.id
  }))
);

const ServicesScroll = memo(({ scrollProgress }: ServicesScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalItems = allItems.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isActiveState, setIsActiveState] = useState(false);

  // Listen to motion value to update state only when necessary
  useMotionValueEvent(scrollProgress, "change", (latest) => {
    const threshold = 0.1;
    const isAct = latest > threshold;
    if (isAct !== isActiveState) setIsActiveState(isAct);

    const p = Math.max(0, Math.min(1, latest));
    const adjusted = isAct ? Math.max(0, (p - threshold) / (1 - threshold)) : 0;
    const smoothIndex = adjusted * totalItems;
    const newIndex = Math.min(Math.floor(smoothIndex), totalItems - 1);

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  const currentItem = allItems[activeIndex] || allItems[0];

  // Transforms for smooth animations without React render
  // Entrance Animation
  const entranceTransform = useTransform(scrollProgress, p => {
    const threshold = 0.1;
    return p > threshold ? 'translate3d(0,0,0)' : 'translate3d(0, 100%, 0)';
  });

  // Scroll Strip
  const stripTransform = useTransform(scrollProgress, p => {
    const threshold = 0.1;
    const isAct = p > threshold;
    const val = Math.max(0, Math.min(1, p));
    const adjusted = isAct ? Math.max(0, (val - threshold) / (1 - threshold)) : 0;
    return `translate3d(0, -${adjusted * (100 - (100 / totalItems))}%, 0)`;
  });

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row w-full h-screen bg-black text-white overflow-hidden"
    >
      {/* --- LEFT SIDE (Text) --- */}
      <div className="flex flex-col justify-center items-start w-full lg:w-1/2 px-6 sm:px-8 md:px-12 lg:px-16 py-8 pt-24 lg:py-0 lg:pt-0 relative z-10">

        {/* Title */}
        <div className="mb-4 lg:mb-6 min-h-[4rem] flex items-center w-full">
          <h2
            key={isActiveState ? currentItem.title : 'default'}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight w-full animate-fade-in"
            style={{ color: '#F0E5DA' }}
          >
            {isActiveState ? currentItem.title : 'Our Services'}
          </h2>
        </div>

        {/* Description Block */}
        <div className="w-full mb-8 min-h-[6rem]">
          {!isActiveState ? (
            <blockquote className="w-full text-sm sm:text-base text-gray-300 max-w-md leading-relaxed border-l-2 pl-4 italic animate-fade-in" style={{ borderColor: '#F0E5DA' }}>
              "Design is not just what it looks like and feels like. Design is how it works."
              <footer className="text-xs mt-2 text-gray-400">— Steve Jobs</footer>
            </blockquote>
          ) : (
            <p className="w-full text-sm sm:text-base text-gray-300 max-w-md leading-relaxed animate-fade-in">
              Transform your space with our expert {currentItem.title?.toLowerCase()}.
              We bring creativity and precision to every project.
            </p>
          )}
        </div>

        {/* Button */}
        <button className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity duration-300 text-sm sm:text-base group">
          <span>View All Projects</span>
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </button>

        {/* Mobile Progress Indicators */}
        <div className="lg:hidden mt-8 flex space-x-1">
          {allItems.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'bg-white w-8'
                  : 'bg-gray-600 w-2'
                }`}
            />
          ))}
        </div>
      </div>

      {/* --- RIGHT SIDE (Images) --- */}
      <div className="relative w-full h-1/2 lg:w-1/2 lg:h-full overflow-hidden bg-[#F0E5DA]">

        {/* Entrance Animation Container */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: entranceTransform,
            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform'
          }}
        >
          {/* Scroll Strip */}
          <motion.div
            className="w-full h-full"
            style={{
              height: `${totalItems * 100}%`,
              transform: stripTransform,
              willChange: 'transform'
            }}
          >
            {allItems.map((item, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-center p-4 sm:p-6 lg:p-8"
                style={{ height: `${100 / totalItems}%` }}
              >
                <div className="relative w-full h-full max-w-2xl overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.title || 'Service'}
                    decoding="async"
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
                    }}
                  />

                  {/* Mobile Overlay */}
                  <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                    <h3 className="text-white text-sm font-medium">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Desktop Progress Indicators */}
        <div className="hidden lg:block absolute bottom-8 left-8 space-y-2 z-20">
          {allItems.map((_, index) => (
            <div
              key={index}
              className={`w-1 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'bg-white h-8'
                  : 'bg-gray-600 h-2'
                }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
});

export default ServicesScroll;