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

  // Use a fixed hero height that matches our Hero component (800px max)
  const heroHeight = Math.min(windowHeight, 800);
  const sectionDuration = heroHeight; // Duration for each section to slide up
  const displayDuration = heroHeight; // Duration to display each section before next starts

  // Section timing calculations
  // Hero: 0 to heroHeight (slides out more gradually)
  const heroEnd = heroHeight * 0.9; // Hero slides out later
  const heroOffset = Math.min(scrollY * 0.4, heroHeight * 0.4); // Slower hero exit
  const heroVisible = scrollY < heroEnd + sectionDuration * 0.8; // Hero visible longer

  // Achievements: starts overlapping with hero to eliminate gap
  const achievementsStart = heroHeight * 0.5; // Start earlier to overlap with hero
  const achievementsSlideEnd = achievementsStart + sectionDuration; // When it's fully visible
  const achievementsDisplayEnd = achievementsSlideEnd + displayDuration; // When it stops displaying
  const achievementsScroll = Math.max(0, scrollY - achievementsStart);
  const achievementsOffset = Math.min(heroHeight, achievementsScroll);
  const achievementsVisible = scrollY >= achievementsStart && scrollY < achievementsDisplayEnd + sectionDuration;

  // Brands: starts after achievements display period
  // Extended duration to account for internal scrolling through 4 sections: title, grid, partners, quote + color transition
  const brandsStart = achievementsDisplayEnd;
  const brandsSlideEnd = brandsStart + sectionDuration;
  const brandsInternalScrollDuration = displayDuration * 5; 
  const brandsDisplayEnd = brandsSlideEnd + brandsInternalScrollDuration;
  const brandsScroll = Math.max(0, scrollY - brandsStart)+20;
  const brandsOffset = Math.min(heroHeight, brandsScroll);
  const brandsProgress = Math.min(1, Math.max(0, (scrollY - brandsSlideEnd)) / brandsInternalScrollDuration); // Progress starts after slide-up
  const brandsVisible = scrollY >= brandsStart && scrollY < brandsDisplayEnd + sectionDuration;

  // Testimonials: starts after brands display period
  const testimonialsStart = brandsDisplayEnd;
  const testimonialsSlideEnd = testimonialsStart + sectionDuration;
  const testimonialsDisplayEnd = testimonialsSlideEnd + displayDuration * 3; // Extended display for testimonials
  const testimonialsScroll = Math.max(0, scrollY - testimonialsStart);
  const testimonialsOffset = Math.min(heroHeight, testimonialsScroll);
  const testimonialsProgress = Math.min(1, Math.max(0, (scrollY - testimonialsSlideEnd)) / (displayDuration * 3)); // Progress starts after slide-up
  const testimonialsVisible = scrollY >= testimonialsStart && scrollY < testimonialsDisplayEnd + sectionDuration;

  // Services: starts after testimonials display period
  const servicesStart = testimonialsDisplayEnd;
  const servicesScroll = Math.max(0, scrollY - servicesStart);
  const servicesOffset = Math.min(heroHeight, servicesScroll);
  const servicesVisible = scrollY >= servicesStart;

  // Total document height - reduced to eliminate extra space
  const totalHeight = servicesStart + heroHeight * 2;

  return (
    <div className="relative overflow-hidden">
      {/* Floating Navigation - Always visible with highest z-index */}
      <div className="fixed inset-x-0 top-0 z-[100]">
        <FloatingNavbar />
      </div>

      {/* Scrollable container */}
      <main style={{ height: `${totalHeight}px` }}>
        
        {/* Hero Layer - slides out first */}
        {heroVisible && (
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

        {/* Achievements Layer - slides up after hero, then stays for display duration */}
        {achievementsVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 20,
              transform: scrollY <= achievementsSlideEnd 
                ? `translateY(${heroHeight - achievementsOffset}px)` // Sliding up phase
                : `translateY(0px)`, // Fully visible phase (stays at top)
            }}
          >
            <Achievements />
          </div>
        )}

        {/* Exclusive Brands Layer - slides up after achievements display period */}
        {brandsVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 30,
              transform: scrollY <= brandsSlideEnd 
                ? `translateY(${heroHeight - brandsOffset}px)` // Sliding up phase
                : `translateY(0px)`, // Fully visible phase
            }}
          >
            <ExclusiveBrands scrollProgress={brandsProgress} />
          </div>
        )}

        {/* Testimonials Layer - slides up after brands display period */}
        {testimonialsVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 40,
              transform: scrollY <= testimonialsSlideEnd 
                ? `translateY(${heroHeight - testimonialsOffset}px)` // Sliding up phase
                : `translateY(0px)`, // Fully visible phase
              transition: 'transform 0.1s ease-out',
            }}
          >
            <TestimonialScroll scrollProgress={testimonialsProgress} />
          </div>
        )}

        {/* Services Layer - slides up after testimonials display period */}
        {servicesVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 50,
              transform: `translateY(${heroHeight - servicesOffset}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <ServicesShowcase />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;