// import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import useScrollPosition from './hooks/useScrollPosition';
import PartnersCarousel from './components/Partners';
import Testimonials from './components/Testimonials';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const isScrolled = useScrollPosition(100);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isScrolled={isScrolled} />
      <main>
        <HeroCarousel />
        <PartnersCarousel />
        <Testimonials />
        {/* <AboutSection /> */}
        <ServicesSection />
      </main>
    </div>
  );
}

export default App;