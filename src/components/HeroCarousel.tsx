import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: 'Turning dream homes',
      subtitle: 'into reality.',
      backgroundImage: 'https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    },
    {
      id: 2,
      title: 'Innovation Meets',
      subtitle: 'Elegance.',
      backgroundImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    },
    {
      id: 3,
      title: 'Crafting Modern',
      subtitle: 'Environments.',
      backgroundImage: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex = (currentSlide + 1) % slides.length;

    gsap.to('.hero-content', {
      duration: 0.3,
      opacity: 0,
      y: 30,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentSlide(nextIndex);
        gsap.fromTo('.hero-content',
          { opacity: 0, y: 30 },
          {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false)
          }
        );
      }
    });
  };

  const prevSlide = () => {
    console.log("prevSlide");
    if (isAnimating) return;
    setIsAnimating(true);

    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;

    gsap.to('.hero-content', {
      duration: 0.3,
      opacity: 0,
      y: 30,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentSlide(prevIndex);
        gsap.fromTo('.hero-content',
          { opacity: 0, y: 30 },
          {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false)
          }
        );
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  useEffect(() => {
    gsap.fromTo('.hero-content',
      { opacity: 0, y: 50 },
      { duration: 1, opacity: 1, y: 0, ease: 'power2.out', delay: 0.5 }
    );
    gsap.fromTo('.hero-nav',
      { opacity: 0, scale: 0.8 },
      { duration: 0.8, opacity: 1, scale: 1, ease: 'back.out(1.7)', delay: 1 }
    );
  }, []);

  const currentSlideData = slides[currentSlide];

  return (


    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      

      <div
        className="absolute left-0 w-full z-10 pointer-events-none
             top-[40%] sm:top-[35%] md:top-[30%] lg:top-[13%]">
        <svg
          className="w-[110%] sm:w-full h-auto"   // 👈 wider on mobile
          viewBox="0 0 1920 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M400,300 L400,260 Q400,80 600,80 L1320,80 Q1520,80 1520,260 L1520,300 L1450,300 L1450,260 Q1450,140 1320,140 L600,140 Q470,140 470,260 L470,300 Z"
            fill="white"
            opacity="0.95"
          />
        </svg>
      </div>


      {/* Content positioned below the arc curve end */}
      <div className="relative z-20 flex items-center h-full">
        <div className="hero-content text-left px-4 sm:px-6 lg:px-8 max-w-xl ml-[10%] sm:ml-[12%] md:ml-[15%] mt-[15%]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight opacity-90">
            {currentSlideData.title}
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight mt-2 opacity-90">
            {currentSlideData.subtitle}
          </h2>
        </div>
      </div>

      {/* Long rectangle at bottom-left aligned with curve tip - responsive */}
      <div className="absolute z-30 bottom-4 sm:bottom-6 md:bottom-8 left-[7.8%]">
        <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-8 sm:h-10 md:h-12 lg:h-14 bg-orange-400 opacity-80"></div>
      </div>

      {/* Long rectangle at bottom-right aligned with curve tip - responsive */}
      <div className="absolute z-30 bottom-4 sm:bottom-6 md:bottom-8 right-[7.8%]">
        <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-8 sm:h-10 md:h-12 lg:h-14 bg-orange-400 opacity-80"></div>
      </div>

      {/* Navigation buttons */}
      <div className="z-50 hero-nav absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 md:px-12 pointer-events-none">
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="pointer-events-auto group bg-white/20 backdrop-blur-sm border border-white/30 
               rounded-full p-2 sm:p-3 md:p-4 
               transition-all duration-300 hover:bg-white/30 hover:scale-110 
               disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronLeft
            className="text-white transition-transform duration-300 group-hover:-translate-x-1"
            style={{ fontSize: "clamp(20px, 2vw, 28px)" }} // responsive icon size
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
            className="text-white transition-transform duration-300 group-hover:translate-x-1"
            style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
          />
        </button>
      </div>


      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${index === currentSlide
                ? 'bg-orange-400 border-orange-400 scale-125'
                : 'bg-transparent border-white/60 hover:border-white hover:bg-white/20'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
