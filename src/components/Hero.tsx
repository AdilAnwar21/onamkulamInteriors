// import React from 'react';
// import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-200">
      {/* Background Image - Modern Interior */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-8 lg:px-16 pt-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-wider">ONAMKULAM</h1>
          </div>

          {/* Say Hello Button */}
          {/* <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full flex items-center space-x-3 hover:bg-white/30 transition-all duration-300 hover:scale-105">
            <span className="font-medium">Say "Hello"</span>
            <div className="bg-yellow-400 rounded-full p-1">
              <ArrowRight className="w-4 h-4 text-black" />
            </div>
          </button> */}
        </div>
      </div>

      {/* Left Side Content */}
      <div className="absolute left-8 lg:left-16 top-1/3 transform -translate-y-1/2">
        {/* Award Badge */}
        <div className="flex items-center space-x-3 text-white mb-8">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
            <span className="text-xs font-bold">✦</span>
          </div>
          <div>
            <p className="text-sm font-medium">Interior</p>
            <p className="text-sm opacity-90">Design Awards</p>
          </div>
          <span className="text-2xl font-light opacity-90">2021</span>
        </div>

        {/* Main Content Block */}
        <div className="text-white mb-12">
          <h2 className="text-3xl lg:text-4xl font-light leading-relaxed mb-2">
            We Craft Interiors
          </h2>
          <h2 className="text-3xl lg:text-4xl font-light leading-relaxed">
            Since 2014
          </h2>
        </div>
      </div>

      {/* Right Side Content */}
      <div className="absolute right-8 lg:right-16 top-1/3 transform -translate-y-1/2 text-right">
        <div className="text-white space-y-1">
          <p className="font-medium">Tech Specifications</p>
          <p className="opacity-90">Design Project</p>
          <p className="opacity-90">3D visualisation</p>
        </div>
      </div>

      {/* Main Heading - Bottom */}
      <div className="absolute bottom-16 left-8 lg:left-16 right-8 lg:right-16">
        <h1 className="text-white font-light leading-none">
          <span className="block text-6xl lg:text-8xl xl:text-9xl">Your House is</span>
          <span className="block text-6xl lg:text-8xl xl:text-9xl mt-2">
            the Place <span className="italic font-serif">of Mod</span>
          </span>
        </h1>
      </div>

      {/* Hamburger Menu */}
      {/* <div className="absolute top-8 right-8 lg:hidden">
        <button className="text-white p-2">
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div> */}
    </section>
  );
};

export default Hero;