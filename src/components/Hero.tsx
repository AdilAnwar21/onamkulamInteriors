import React, { memo } from 'react'; // Import memo
import logo from '../assets/images/LOGO 01.png';

interface HeroProps {
  onExploreClick?: () => void;
}

// 1. Wrap in memo so it doesn't re-render on every scroll pixel
const Hero = memo(({ onExploreClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-200">
      {/* Background Image - Added will-change-transform */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-16 pt-6">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <img src={logo.src} alt="ONAMKULAM" className="h-12" />
            INTERIORS
          </div>
        </div>
      </div>

      {/* Left Side Content */}
      <div className="absolute left-4 sm:left-6 lg:left-16 top-1/3 -translate-y-1/2 max-w-[70%] sm:max-w-none">
        <div className="text-white mb-10 sm:mb-12">
          <h2 className="text-2xl italic sm:text-3xl lg:text-4xl font-light leading-relaxed mb-1 sm:mb-2">
            We craft interiors that
          </h2>
          <h2 className="text-2xl italic sm:text-3xl lg:text-4xl font-light leading-relaxed">
            embrace you.
          </h2>
        </div>
      </div>

      {/* Right Side Content */}
      <div className="absolute right-4 sm:right-6 lg:right-16 top-1/3 -translate-y-1/2 text-right hidden sm:block">
        <button
          onClick={onExploreClick}
          className="text-white space-y-0.5 sm:space-y-1 cursor-pointer hover:opacity-80 transition-opacity duration-300 group text-left"
          aria-label="Explore our latest projects"
        >
          <p className="text-sm sm:text-base font-medium">"Step into our stories"</p>
          <p className="text-xs sm:text-sm opacity-90 group-hover:underline">Explore into our</p>
          <p className="text-xs sm:text-sm opacity-90 group-hover:underline">latest projects</p>
        </button>
      </div>

      {/* Main Heading */}
      <div className="absolute bottom-10 sm:bottom-14 left-4 sm:left-6 lg:left-16 right-4 sm:right-6 lg:right-16">
        <h1 className="text-white font-light leading-tight sm:leading-none">
          <span className="block font-bold text-4xl sm:text-6xl lg:text-8xl xl:text-7xl">
            From Space to Soul —
          </span>
          <span className="block text-4xl sm:text-6xl lg:text-8xl xl:text-9xl mt-2">
            Interiors That Tell <span className="italic font-serif text-[#F0E5DA]">Your Story</span>
          </span>
        </h1>
      </div>


    </section>
  );
});

export default Hero;