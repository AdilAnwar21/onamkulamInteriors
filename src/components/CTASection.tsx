// Add this import to your App.tsx:
// import CTASection from './components/CTASection';

import React from 'react';

const CTASection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Remove furniture silhouettes since we now have a real interior photo */}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtitle */}
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 tracking-wide opacity-90 font-light">
            Crafting Environments<br />
            That Inspire
          </p>

          {/* Main heading */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 sm:mb-12 leading-tight">
            It's so <span className="italic font-light">Easy</span> to<br />
            Change the <span className="italic font-light">Mood</span>
          </h1>

          {/* CTA Button */}
          <button className="group inline-flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95">
            <span>Order the Design</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 text-black" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-white opacity-60 rounded-full animate-pulse hidden sm:block" />
      <div className="absolute top-20 right-20 w-3 h-3 bg-white opacity-40 rounded-full animate-pulse delay-1000 hidden md:block" />
      <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white opacity-80 rounded-full animate-pulse delay-500 hidden lg:block" />
    </div>
  );
};

export default CTASection;