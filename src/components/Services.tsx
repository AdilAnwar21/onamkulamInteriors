import { useRef } from "react";

interface ServicesScrollProps {
  scrollProgress: number;
}

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

const ServicesScroll = ({ scrollProgress }: ServicesScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten all images with their corresponding service data
  const allItems = services.flatMap(service =>
    service.images.map(image => ({
      title: service.title,
      image: image,
      serviceId: service.id
    }))
  );

  const totalItems = allItems.length;
  
  // Only start image transitions when scrollProgress begins (after component is visible)
  // Add a small threshold to ensure smooth activation
  const threshold = 0.1;
  const isActive = scrollProgress > threshold;
  
  // Calculate which image/title combination is active with smoother transitions
  const progress = Math.max(0, Math.min(1, scrollProgress));
  const adjustedProgress = isActive ? Math.max(0, (progress - threshold) / (1 - threshold)) : 0;
  const smoothProgress = adjustedProgress * totalItems;
  const activeIndex = Math.min(Math.floor(smoothProgress), totalItems - 1);
  
  const currentItem = allItems[activeIndex] || allItems[0] || { title: 'Services', image: '', serviceId: 1 };

  return (
    <div 
      ref={containerRef} 
      className="flex flex-col lg:flex-row w-full h-screen bg-black text-white overflow-hidden"
    >
      {/* Left Side - Text */}
      <div className="flex flex-col justify-center items-start w-full lg:w-1/2 px-6 sm:px-8 md:px-12 lg:px-16 py-8 lg:py-0 relative z-10">
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 lg:mb-8 transition-all duration-1000 ease-out" style={{ color: '#F0E5DA' }}>
          {isActive ? (currentItem?.title || 'Services') : 'Our Services'}
        </h2>
        
        {!isActive ? (
          <blockquote className="text-sm sm:text-base text-gray-300 mb-6 lg:mb-8 max-w-md leading-relaxed transition-all duration-800 ease-out border-l-2 pl-4 italic" style={{ borderColor: '#F0E5DA' }}>
            "Design is not just what it looks like and feels like. Design is how it works."
            <footer className="text-xs mt-2 text-gray-400">— Steve Jobs</footer>
          </blockquote>
        ) : (
          <p className="text-sm sm:text-base text-gray-300 mb-6 lg:mb-8 max-w-md leading-relaxed transition-all duration-800 ease-out">
            Transform your space with our expert {currentItem?.title?.toLowerCase() || 'design'} services. 
            We bring creativity and precision to every project.
          </p>
        )}
        
        <button className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity duration-300 text-sm sm:text-base group">
          <span>View All Projects</span>
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </button>

        {/* Mobile progress indicator with smoother transitions */}
        <div className="lg:hidden mt-6 flex space-x-1">
          {allItems.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-700 ease-out ${
                index === activeIndex 
                  ? 'bg-white w-8' 
                  : 'bg-gray-600 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Scrolling Images */}
      <div className="relative w-full h-1/2 lg:w-1/2 lg:h-full overflow-hidden">
        {/* Background for smooth transitions */}
        <div className="absolute inset-0" style={{ backgroundColor: '#F0E5DA' }} />
        
        {/* Image container with smoother transitions - pops from bottom */}
        <div
          className="absolute inset-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: isActive ? `translateY(-${smoothProgress * 100}%)` : `translateY(100%)`,
            opacity: isActive ? 1 : 0,
          }}
        >
          {allItems.map((item, index) => (
            <div
              key={index}
              className="w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8"
            >
              <div className="relative w-full h-full max-w-2xl">
                <img
                  src={item.image}
                  alt={item.title || 'Service'}
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl transition-all duration-[1000ms] ease-out"
                  onError={(e) => {
                    // Fallback image if the main image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
                  }}
                />
                
                {/* Image overlay for extra context on mobile */}
                <div className="lg:hidden absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 transition-all duration-500 ease-out">
                  <h3 className="text-white text-sm font-medium">{item.title || 'Service'}</h3>
                  <p className="text-gray-300 text-xs mt-1">Professional Design Services</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop progress indicator with smoother transitions */}
        <div className="hidden lg:block absolute bottom-8 left-8 space-y-2">
          {allItems.map((_, index) => (
            <div
              key={index}
              className={`w-1 rounded-full transition-all duration-700 ease-out ${
                index === activeIndex 
                  ? 'bg-white h-8' 
                  : 'bg-gray-600 h-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesScroll;