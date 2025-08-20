import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs for achievements animation
  const projectsRef = useRef<HTMLParagraphElement>(null);
  const clientsRef = useRef<HTMLParagraphElement>(null);
  const awardsRef = useRef<HTMLParagraphElement>(null);
  const yearsRef = useRef<HTMLParagraphElement>(null);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: "Turning dream homes",
      subtitle: "into reality.",
      backgroundImage:
        "https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    },
    {
      id: 2,
      title: "Innovation Meets",
      subtitle: "Elegance.",
      backgroundImage:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    },
    {
      id: 3,
      title: "Crafting Modern",
      subtitle: "Environments.",
      backgroundImage:
        "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex = (currentSlide + 1) % slides.length;

    // Animate out current content
    const heroContent = document.querySelector('.hero-content') as HTMLElement | null;
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(30px)';
      heroContent.style.transition = 'all 0.3s ease-in';

      setTimeout(() => {
        setCurrentSlide(nextIndex);
        // Animate in new content
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(2px) sm:translateY(3px) md:translateY(4px) lg:translateY(6px)';
        heroContent.style.transition = 'all 0.6s ease-out';
        setTimeout(() => setIsAnimating(false), 600);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const prevIndex =
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1;

    // Animate out current content
    const heroContent = document.querySelector('.hero-content') as HTMLElement | null;
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(30px)';
      heroContent.style.transition = 'all 0.3s ease-in';

      setTimeout(() => {
        setCurrentSlide(prevIndex);
        // Animate in new content
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(2px) sm:translateY(3px) md:translateY(4px) lg:translateY(6px)';
        heroContent.style.transition = 'all 0.6s ease-out';
        setTimeout(() => setIsAnimating(false), 600);
      }, 300);
    }
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  // Count-up animation
  useEffect(() => {
    const animateCount = (
      ref: React.RefObject<HTMLParagraphElement>,
      endValue: number
    ) => {
      if (!ref.current) return;
      let current = 0;
      const increment = endValue / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= endValue) {
          current = endValue;
          clearInterval(timer);
        }
        if (ref.current) {
          ref.current.innerText = Math.floor(current).toString() + '+';
        }
      }, 20);
    };

    setTimeout(() => {
      animateCount(projectsRef, 400);
      animateCount(clientsRef, 250);
      animateCount(awardsRef, 10);
      animateCount(yearsRef, 15);
    }, 1000);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className="
        relative
        h-[100vh]      
        sm:h-[70vh]    
        md:h-[70vh]    
        lg:h-[100vh]
        w-full
        overflow-visible
      "
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Arc Section - Extended outside hero */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[100%] sm:w-[100%] md:w-full max-w-7xl z-10 top-[15%] sm:top-[18%] md:top-[20%] lg:top-[22%] overflow-visible">
        <div className="relative w-full px-0 sm:px-6 lg:px-8">
          <svg
            className="w-full h-auto overflow-visible"
            viewBox="0 0 1200 350"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M200,350 L200,160 Q200,20 400,20 L800,20 Q1000,20 1000,160 L1000,350 L950,350 L950,160 Q950,70 800,70 L400,70 Q250,70 250,160 L250,350 Z"
              fill="white"
              opacity="0.95"
            />
          </svg>

          {/* Title positioned in the center of the arc */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="hero-content text-center px-4 transform translate-y-2 sm:translate-y-3 md:translate-y-4 lg:translate-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                {currentSlideData.title}
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mt-1 sm:mt-2">
                {currentSlideData.subtitle}
              </h2>
            </div>
          </div>

          {/* Achievements positioned with minimal gaps on mobile */}
          <div className="absolute top-full mt-4 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-18 left-0 right-0 w-full px-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center max-w-4xl mx-auto">
              <div>
                <p ref={projectsRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">0</p>
                <p className="text-sm sm:text-base md:text-lg font-medium text-gray-200 mt-1">Projects</p>
              </div>
              <div>
                <p ref={clientsRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">0</p>
                <p className="text-sm sm:text-base md:text-lg font-medium text-gray-200 mt-1">Clients</p>
              </div>
              <div>
                <p ref={awardsRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">0</p>
                <p className="text-sm sm:text-base md:text-lg font-medium text-gray-200 mt-1">Awards</p>
              </div>
              <div>
                <p ref={yearsRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">0</p>
                <p className="text-sm sm:text-base md:text-lg font-medium text-gray-200 mt-1">Years Exp.</p>
              </div>
            </div>
          </div>

          {/* Orange rectangles - Fixed width consistent with arc, improved height for tablet and mobile */}
          <div className="absolute top-full mt-40 sm:mt-28 md:mt-36 lg:mt-40 xl:mt-44 left-[16.67%] transform -translate-x-1/2 z-50">
            <div className="w-16 h-80 sm:h-96 md:h-80 lg:h-80 xl:h-88 bg-orange-300 opacity-80"></div>
          </div>
          <div className="absolute top-full mt-40 sm:mt-28 md:mt-36 lg:mt-40 xl:mt-44 right-[16.67%] transform translate-x-1/2 z-50">
            <div className="w-16 h-80 sm:h-96 md:h-80 lg:h-80 xl:h-88 bg-orange-300 opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="z-50 hero-nav absolute inset-y-0 left-0 right-0 
        hidden lg:flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 pointer-events-none">
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="pointer-events-auto group bg-white/20 backdrop-blur-sm border border-white/30 
       rounded-full p-2 sm:p-3 md:p-4 
       transition-all duration-300 hover:bg-white/30 hover:scale-110 
       disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronLeft
            className="text-white transition-transform duration-300 group-hover:-translate-x-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
          />
        </button>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="pointer-events-auto group bg-white/20 backdrop-blur-sm border border-white/30 
       rounded-full p-2 sm:p-3 md:p-4 
       transition-all duration-300 hover:bg-white/30 hover:scale-110 
       disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronRight
            className="text-white transition-transform duration-300 group-hover:translate-x-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
          />
        </button>
      </div>

      {/* Contact Us Button - Bottom Right (Only show on lg and above) */}
      <div className="hidden lg:block absolute bottom-12 right-12 z-50">
        <button className="group bg-orange-400 hover:bg-orange-500 text-white font-semibold 
                            px-6 py-3 md:px-8 md:py-4 
                            rounded-full shadow-lg hover:shadow-xl 
                            transition-all duration-300 hover:scale-105 
                            flex items-center gap-3">
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-12" />
          <span className="text-sm md:text-base lg:text-lg">Contact Us</span>
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 md:space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentSlide(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full transition-all duration-300 border-2 ${index === currentSlide
                ? "bg-orange-400 border-orange-400 scale-125"
                : "bg-transparent border-white/60 hover:border-white hover:bg-white/20"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;