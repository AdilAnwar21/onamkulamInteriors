import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FloatingNavbar from './components/FloatingNavbar';
import Achievements from './components/Achievements';
import ExclusiveBrands from './components/partnersSection';
import TestimonialScroll from './components/Testimonials';
import ServicesScroll from './components/Services';
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

  const heroHeight = Math.min(windowHeight, 800);
  const sectionDuration = heroHeight;
  const displayDuration = heroHeight;

  // Hero section
  const heroEnd = heroHeight * 0.9;
  const heroOffset = Math.min(scrollY * 0.4, heroHeight * 0.4);
  const heroVisible = scrollY < heroEnd + sectionDuration * 0.8;

  // Achievements section
  const achievementsStart = heroHeight * 0.5;
  const achievementsSlideEnd = achievementsStart + sectionDuration;
  const achievementsDisplayEnd = achievementsSlideEnd + displayDuration;
  const achievementsScroll = Math.max(0, scrollY - achievementsStart);
  const achievementsOffset = Math.min(heroHeight, achievementsScroll);
  const achievementsVisible =
    scrollY >= achievementsStart &&
    scrollY < achievementsDisplayEnd + sectionDuration;

  // Exclusive Brands section
  const brandsStart = achievementsDisplayEnd;
  const brandsSlideEnd = brandsStart + sectionDuration;
  const brandsInternalScrollDuration = displayDuration * 10;
  const brandsDisplayEnd = brandsSlideEnd + brandsInternalScrollDuration;
  const brandsScroll = Math.max(0, scrollY - brandsStart) + 20;
  const brandsOffset = Math.min(heroHeight, brandsScroll);
  const brandsProgress = Math.min(
    1,
    Math.max(0, (scrollY - brandsSlideEnd)) / brandsInternalScrollDuration
  );
  const brandsVisible =
    scrollY >= brandsStart && scrollY < brandsDisplayEnd + sectionDuration;

  // ServicesScroll section
  const servicesScrollStart = brandsDisplayEnd;
  const servicesScrollSlideEnd = servicesScrollStart + sectionDuration;
  const servicesScrollInternalDuration = displayDuration * 3;
  const servicesScrollDisplayEnd =
    servicesScrollSlideEnd + servicesScrollInternalDuration;
  const servicesScrollProgress = Math.min(
    1,
    Math.max(0, (scrollY - servicesScrollSlideEnd)) /
      servicesScrollInternalDuration
  );
  const servicesScrollVisible =
    scrollY >= servicesScrollStart &&
    scrollY < servicesScrollDisplayEnd + sectionDuration * 0.5; // Reduced overlap to prevent white gap
  const servicesScrollOffset = Math.min(
    heroHeight,
    Math.max(0, scrollY - servicesScrollStart)
  );

  // Testimonials section - Start earlier to eliminate gap
  const testimonialsStart = servicesScrollDisplayEnd - sectionDuration * 0.5; // Start earlier
  const testimonialsSlideEnd = testimonialsStart + sectionDuration;
  const testimonialsDisplayEnd = testimonialsSlideEnd + displayDuration * 3;
  const testimonialsScroll = Math.max(0, scrollY - testimonialsStart);
  const testimonialsOffset = Math.min(heroHeight, testimonialsScroll);
  const testimonialsProgress = Math.min(
    1,
    Math.max(0, (scrollY - testimonialsSlideEnd)) / (displayDuration * 3)
  );
  const testimonialsVisible =
    scrollY >= testimonialsStart &&
    scrollY < testimonialsDisplayEnd + sectionDuration;

  // ServicesShowcase section
  const servicesStart = testimonialsDisplayEnd;
  const servicesScroll = Math.max(0, scrollY - servicesStart);
  const servicesOffset = Math.min(heroHeight, servicesScroll);
  const servicesVisible = scrollY >= servicesStart;

  // Total height
  const totalHeight = servicesStart + heroHeight * 2;

  return (
    <div className="relative overflow-hidden bg-black"> {/* Added bg-black to prevent white gaps */}
      {/* Floating Navbar */}
      <div className="fixed inset-x-0 top-0 z-[100]">
        <FloatingNavbar />
      </div>

      {/* Scrollable container */}
      <main style={{ height: `${totalHeight}px` }} className="bg-black">
        {/* Hero */}
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

        {/* Achievements */}
        {achievementsVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 20,
              transform:
                scrollY <= achievementsSlideEnd
                  ? `translateY(${heroHeight - achievementsOffset}px)`
                  : `translateY(0px)`,
            }}
          >
            <Achievements />
          </div>
        )}

        {/* Exclusive Brands */}
        {brandsVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 30,
              transform:
                scrollY <= brandsSlideEnd
                  ? `translateY(${heroHeight - brandsOffset}px)`
                  : `translateY(0px)`,
            }}
          >
            <ExclusiveBrands scrollProgress={brandsProgress} />
          </div>
        )}

        {/* ServicesScroll */}
        {servicesScrollVisible && (
          <div
            className="fixed inset-0 w-full bg-black" // Added bg-black
            style={{
              zIndex: 40,
              transform:
                scrollY <= servicesScrollSlideEnd
                  ? `translateY(${heroHeight - servicesScrollOffset}px)`
                  : `translateY(0px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <ServicesScroll scrollProgress={servicesScrollProgress} />
          </div>
        )}

        {/* Testimonials */}
        {testimonialsVisible && (
          <div
            className="fixed inset-0 w-full bg-black" // Added bg-black
            style={{
              zIndex: 50,
              transform:
                scrollY <= testimonialsSlideEnd
                  ? `translateY(${heroHeight - testimonialsOffset}px)`
                  : `translateY(0px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <TestimonialScroll scrollProgress={testimonialsProgress} />
          </div>
        )}

        {/* ServicesShowcase */}
        {servicesVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 60,
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