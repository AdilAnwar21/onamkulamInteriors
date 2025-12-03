import { useRef, memo, useMemo } from "react";
import { ArrowRight } from "lucide-react";

interface TestimonialScrollProps {
  scrollProgress: number;
}

// --- STATIC DATA ---
const testimonials = [
  {
    id: 1,
    quote: "This interior design studio transformed our home into a masterpiece. The attention to detail and creativity exceeded all expectations.",
    author: "Sarah Johnson",
    role: "Homeowner",
    project: "Sanur House",
    location: "San Francisco, CA",
    projectImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop",
    number: "01",
  },
  {
    id: 2,
    quote: "Working with HouseMood was an incredible experience. They understood our vision perfectly and brought it to life beautifully.",
    author: "Michael Chen",
    role: "Business Owner",
    project: "Modern Loft",
    location: "New York, NY",
    projectImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop",
    number: "02",
  },
  {
    id: 3,
    quote: "The team's professionalism and innovative approach to design made our renovation process smooth and enjoyable.",
    author: "Emily Rodriguez",
    role: "Architect",
    project: "Urban Retreat",
    location: "Los Angeles, CA",
    projectImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop",
    number: "03",
  },
];

// Reusable styles to prevent object creation on every render
const LAYER_STYLE: React.CSSProperties = {
  willChange: 'transform',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  perspective: 1000,
};

const TestimonialScroll = memo(({ scrollProgress }: TestimonialScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = testimonials.length;
  // Clamp progress to ensure we don't go out of bounds
  const progress = Math.max(0, Math.min(1, scrollProgress));
  
  // FIX: Check window width once per render to disable scale on mobile
  // Accessing window.innerWidth is fast enough for this check
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-white"
      style={{ zIndex: 50 }}
    >
      {testimonials.map((testimonial, index) => {
        const sectionStart = index / totalCards;
        const sectionEnd = (index + 1) / totalCards;
        
        const rawSectionProgress = (progress - sectionStart) / (sectionEnd - sectionStart);
        const sectionProgress = Math.max(0, Math.min(1, rawSectionProgress));
        
        // Calculate translation
        const translateY = (1 - sectionProgress) * 100;

        // Optimization: If card is completely below screen (translate 100%), 
        // effectively hide it from paint to save GPU resources
        if (sectionProgress === 0 && index !== 0) {
            return null; // or display: none via style
        }

        const isSecondSection = index === 1;
        const textColor = isSecondSection ? 'text-white' : 'text-black';
        const bgColor = isSecondSection ? 'bg-black' : 'bg-white';
        const mobileOverlayBg = isSecondSection ? 'bg-black/70' : 'bg-white/70'; 
        const mobileTextColor = isSecondSection ? 'text-white' : 'text-black';

        return (
          <div
            key={testimonial.id}
            className="absolute inset-0 w-full h-full flex flex-col lg:flex-row"
            style={{
              ...LAYER_STYLE,
              transform: `translate3d(0, ${translateY}%, 0)`,
              zIndex: index + 1,
            }}
          >
            {/* Image Section */}
            <div className="w-full h-1/2 lg:w-2/3 lg:h-full relative overflow-hidden">
               <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${testimonial.projectImage})`,
                    // FIX: Only apply Scale Animation on Desktop.
                    // On mobile, scaling + translating simultaneously causes the stutter.
                    transform: isDesktop 
                        ? `scale(${1 + (1 - sectionProgress) * 0.1}) translateZ(0)` 
                        : 'translateZ(0)', 
                    transition: isDesktop ? 'transform 0.1s linear' : 'none',
                    willChange: isDesktop ? 'transform' : 'auto',
                    backfaceVisibility: 'hidden', // Hardware acceleration
                  }}
               />

              {/* Mobile/Tablet Overlay Content */}
              <div className={`lg:hidden absolute inset-0 ${mobileOverlayBg} flex flex-col justify-end p-6 md:p-10 ${mobileTextColor}`}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">{testimonial.number}</h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                  {testimonial.project}
                </h2>
                <p className="text-sm md:text-base opacity-80">{testimonial.location}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className={`flex flex-col justify-center w-full h-1/2 lg:w-1/3 lg:h-full ${bgColor} ${textColor} p-6 sm:p-8 md:p-12 lg:p-12`}>
              
              <h1 className="hidden lg:block text-5xl lg:text-7xl font-bold mb-4 lg:mb-6">{testimonial.number}</h1>
              <h2 className="hidden lg:block text-2xl lg:text-4xl font-semibold mb-3 lg:mb-4">
                {testimonial.project}
              </h2>
              
              <p className="text-sm sm:text-base md:text-xl lg:text-lg italic mb-4 lg:mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="space-y-1">
                <p className="font-medium text-sm sm:text-base md:text-lg">{testimonial.author}</p>
                <p className={`text-xs sm:text-sm md:text-base ${isSecondSection ? 'opacity-70' : 'opacity-60'}`}>{testimonial.role}</p>
                <p className={`hidden lg:block text-xs sm:text-sm ${isSecondSection ? 'opacity-50' : 'opacity-40'}`}>{testimonial.location}</p>
              </div>
              
              <div className="mt-6 lg:mt-8 flex items-center justify-center lg:justify-start gap-2 cursor-pointer group">
                <span className={`text-sm lg:text-base font-medium ${isSecondSection ? 'text-white' : 'text-black'}`}>
                  Read More
                </span>
                <ArrowRight className={`w-5 h-5 lg:w-6 lg:h-6 ${isSecondSection ? 'text-white' : 'text-black'} transition-transform duration-300 group-hover:scale-125 group-hover:translate-x-1`} />
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Progress indicator */}
      <div className="absolute bottom-6 right-6 z-[60]">
        <div className="flex space-x-2">
          {testimonials.map((_, index) => {
            const sectionStart = index / totalCards;
            const sectionEnd = (index + 1) / totalCards;
            const isActive = progress >= sectionStart && progress < sectionEnd;
            
            return (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-gray-800' : 'bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default TestimonialScroll;