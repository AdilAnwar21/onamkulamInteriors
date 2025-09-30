import { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface TestimonialScrollProps {
  scrollProgress: number;
}

const TestimonialScroll = ({ scrollProgress }: TestimonialScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const totalCards = testimonials.length;
  const progress = Math.max(0, Math.min(1, scrollProgress));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-white"
      style={{ zIndex: 50 }}
    >
      {testimonials.map((testimonial, index) => {
        const sectionStart = index / totalCards;
        const sectionEnd = (index + 1) / totalCards;
        const sectionProgress = Math.max(
          0,
          Math.min(1, (progress - sectionStart) / (sectionEnd - sectionStart))
        );

        // Each card scrolls up over the previous
        const translateY = (1 - sectionProgress) * 100;

        // Determine colors based on section index
        const isSecondSection = index === 1;
        const textColor = isSecondSection ? 'text-white' : 'text-black';
        const bgColor = isSecondSection ? 'bg-black' : 'bg-white';
        const mobileOverlayBg = isSecondSection ? 'bg-black/50' : 'bg-white/50';
        const mobileTextColor = isSecondSection ? 'text-white' : 'text-black';

        return (
          <div
            key={testimonial.id}
            className="absolute inset-0 w-full h-full flex flex-col md:flex-row"
            style={{
              transform: `translateY(${translateY}%)`,
              zIndex: index + 1,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Image Section */}
            <div
              className="w-full h-1/2 md:w-2/3 md:h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${testimonial.projectImage})`,
              }}
            >
              {/* Mobile Content Overlay */}
              <div className={`md:hidden absolute inset-0 ${mobileOverlayBg} flex flex-col justify-end p-6 ${mobileTextColor}`}>
                <h1 className="text-4xl sm:text-5xl font-bold mb-2">{testimonial.number}</h1>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  {testimonial.project}
                </h2>
                <p className="text-sm opacity-70">{testimonial.location}</p>
              </div>
            </div>

            {/* Desktop Content Section */}
            <div className={`flex flex-col justify-center w-full h-1/2 md:w-1/3 md:h-full ${bgColor} ${textColor} p-6 sm:p-8 lg:p-12`}>
              {/* Desktop Number - Hidden on mobile since it's in overlay */}
              <h1 className="hidden md:block text-5xl lg:text-7xl font-bold mb-4 lg:mb-6">{testimonial.number}</h1>
              
              {/* Desktop Project Title - Hidden on mobile since it's in overlay */}
              <h2 className="hidden md:block text-2xl lg:text-4xl font-semibold mb-3 lg:mb-4">
                {testimonial.project}
              </h2>
              
              {/* Quote - Visible on both */}
              <p className="text-sm sm:text-base lg:text-lg italic mb-4 lg:mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              {/* Author Info */}
              <div className="space-y-1">
                <p className="font-medium text-sm sm:text-base">{testimonial.author}</p>
                <p className={`text-xs sm:text-sm ${isSecondSection ? 'opacity-70' : 'opacity-60'}`}>{testimonial.role}</p>
                {/* Location only shown on desktop, already in mobile overlay */}
                <p className={`hidden md:block text-xs sm:text-sm ${isSecondSection ? 'opacity-50' : 'opacity-40'}`}>{testimonial.location}</p>
              </div>
              
              {/* Read More Icon - Visible on all slides */}
              <div className="mt-6 lg:mt-8 flex items-center justify-center md:justify-start gap-2 cursor-pointer group">
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
      <div className="absolute bottom-6 right-6 z-50">
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
};

export default TestimonialScroll;