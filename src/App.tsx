import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FloatingNavbar from './components/FloatingNavbar';
import Achievements from './components/Achievements';
import ExclusiveBrands from './components/partnersSection';
import TestimonialScroll from './components/Testimonials';
import ServicesShowcase from './components/ServicesShowcase';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.title = 'HouseMood - Interior Design Studio';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const heroHeight = window.innerHeight;

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

  // Testimonials calculation
  const testimonialsStart = heroHeight * 3;
  const testimonialsScroll = Math.max(0, scrollY - testimonialsStart);
  const testimonialsProgress = Math.min(
    1,
    testimonialsScroll / (heroHeight * 2.5) // smoother span
  );

  // Smooth fade-in opacity
  const testimonialsOpacity = Math.min(
    1,
    testimonialsScroll / (heroHeight * 0.5) // fade in over half-screen
  );

  // Services calculation
  const servicesStart = heroHeight * 5.5; // Start after testimonials
  const servicesScroll = Math.max(0, scrollY - servicesStart);
  const servicesProgress = Math.min(
    1,
    servicesScroll / heroHeight
  );

  // Services opacity
  const servicesOpacity = Math.min(
    1,
    servicesScroll / (heroHeight * 0.5) // fade in over half-screen
  );

  return (
    <div className="relative overflow-hidden">
      {/* Floating Navigation */}
      <FloatingNavbar />

      {/* Scrollable container - Extended for services */}
      <main style={{ height: `${heroHeight * 8.5}px` }}>
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

        {/* Services Layer - New Component */}
        <div
          className="fixed inset-0 w-full"
          style={{
            zIndex: 50,
            opacity: servicesOpacity,
            pointerEvents: servicesOpacity > 0.05 ? 'auto' : 'none',
            transition: 'opacity 0.4s ease-out',
          }}
        >
          <ServicesShowcase />
        </div>
      </main>
    </div>
  );
}

export default App;