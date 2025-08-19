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

      {/* Arc Section */}


      <div
        className="absolute left-0 w-full z-10 pointer-events-none
         top-[30%] sm:top-[25%] md:top-[20%] lg:top-[12%]"
      >
        <div className="relative w-full">
          <svg
            className="w-[115%] sm:w-full h-auto"
            viewBox="0 0 1920 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M400,400 L400,260 Q400,60 600,60 L1320,60 Q1520,60 1520,260 L1520,400 L1450,400 L1450,260 Q1450,120 1320,120 L600,120 Q470,120 470,260 L470,400 Z"
              fill="white"
              opacity="0.95"
            />
          </svg>

          {/* Orange projecting rectangles (with gap below arc) */}
          <div className="absolute top-[calc(100%+6.5rem)] left-[20.5%] z-20">
            <div className="w-8 sm:w-10 md:w-12 lg:w-16 h-40 sm:h-48 md:h-56 lg:h-64 bg-orange-400 opacity-80"></div>
          </div>
          <div className="absolute top-[calc(100%+6.5rem)] right-[20.5%] z-20">
            <div className="w-8 sm:w-10 md:w-12 lg:w-16 h-40 sm:h-48 md:h-56 lg:h-64 bg-orange-400 opacity-80"></div>
          </div>
        </div>
      </div>


      {/* Content inside Arc */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 px-4">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-black leading-tight text-center opacity-90">
          {currentSlideData.title}
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black leading-tight mt-2 text-center opacity-80">
          {currentSlideData.subtitle}
        </h2>

        {/* Achievements */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 w-full max-w-5xl text-center">
          <div>
            <p className="text-4xl font-bold text-black">400+</p>
            <p className="text-lg font-medium text-gray-600">Projects</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-black">250+</p>
            <p className="text-lg font-medium text-gray-600">Clients</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-black">10+</p>
            <p className="text-lg font-medium text-gray-600">Awards</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-black">15+</p>
            <p className="text-lg font-medium text-gray-600">Years Exp.</p>
          </div>
        </div>
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
            style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
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
