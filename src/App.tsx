import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FloatingNavbar from './components/FloatingNavbar';
import Achievements from './components/Achievements';
import ExclusiveBrands from './components/partnersSection';
import TestimonialScroll from './components/Testimonials';
import ServicesShowcase from './components/ServicesShowcase';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.title = 'HouseMood - Interior Design Studio';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const heroHeight = windowHeight;

  // Hero offset
  const heroOffset = Math.min(scrollY * 0.5, heroHeight * 0.5);

  // Achievements offset
  const achievementsStart = heroHeight;
  const achievementsOffset = Math.max(
    0,
    Math.min(heroHeight, scrollY - achievementsStart)
  );

  // Exclusive Brands offset
  const brandsStart = heroHeight * 2;
  const brandsScroll = Math.max(0, scrollY - brandsStart);
  const brandsProgress = brandsScroll / heroHeight;

  // Testimonials calculation - Extended duration
  const testimonialsStart = heroHeight * 3;
  const testimonialsScroll = Math.max(0, scrollY - testimonialsStart);
  const testimonialsProgress = Math.min(
    1,
    testimonialsScroll / (heroHeight * 3.5) // Extended span for all slides
  );

  // Smooth fade-in opacity for testimonials
  const testimonialsOpacity = Math.min(
    1,
    testimonialsScroll / (heroHeight * 0.5) // fade in over half-screen
  );

  // Services calculation - starts AFTER testimonials are completely done
  const servicesStart = heroHeight * 6.5; // Start much later
  const servicesScroll = Math.max(0, scrollY - servicesStart);
  const servicesOffset = Math.min(heroHeight, servicesScroll * 0.8); // Slower slide up

  // Services visibility - no fade, just slide up
  const servicesVisible = servicesScroll > 0;

  return (
    <div className="relative overflow-hidden">
      {/* Floating Navigation - Always visible with highest z-index */}
      <div className="fixed inset-x-0 top-0 z-[100]">
        <FloatingNavbar />
      </div>

      {/* Scrollable container - Extended for services */}
      <main style={{ height: `${heroHeight * 9}px` }}>
        {/* Hero Layer */}
        {scrollY < achievementsStart + heroHeight && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 10,
              transform: `translateY(${-heroOffset}px)`,
            }}
          >
            <Hero />
          </div>
        )}

        {/* Achievements Layer */}
        {scrollY < brandsStart + heroHeight && (
          <div
            className="absolute inset-0 w-full"
            style={{
              top: `${heroHeight}px`,
              zIndex: 20,
              transform: `translateY(${-achievementsOffset}px)`,
            }}
          >
            <Achievements />
          </div>
        )}

        {/* Exclusive Brands Layer */}
        {scrollY < testimonialsStart + heroHeight && (
          <div
            className="absolute inset-0 w-full"
            style={{
              top: `${heroHeight * 2}px`,
              zIndex: 30,
              transform: `translateY(${-brandsScroll}px)`,
            }}
          >
            <ExclusiveBrands scrollProgress={brandsProgress} />
          </div>
        )}

        {/* Testimonials Layer */}
        <div
          className="fixed inset-0 w-full"
          style={{
            zIndex: 40,
            opacity: testimonialsOpacity,
            pointerEvents: testimonialsOpacity > 0.05 ? 'auto' : 'none',
            transition: 'opacity 0.4s ease-out',
          }}
        >
          <TestimonialScroll scrollProgress={testimonialsProgress} />
        </div>

        {/* Services Layer - Slides up from bottom */}
        {servicesVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 50,
              transform: `translateY(${heroHeight - servicesOffset}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <ServicesShowcase scrollProgress={servicesScroll / heroHeight} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;