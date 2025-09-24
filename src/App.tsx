import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FloatingNavbar from './components/FloatingNavbar';
import Achievements from './components/Achievements';
import ExclusiveBrands from './components/partnersSection';
import TestimonialScroll from './components/Testimonials';
import ServicesScroll from './components/Services';
import ServicesShowcase from './components/ServicesShowcase';
import Founder from './components/Founder';
import Team from './components/Team';

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
    scrollY < servicesScrollDisplayEnd + sectionDuration * 0.5;
  const servicesScrollOffset = Math.min(
    heroHeight,
    Math.max(0, scrollY - servicesScrollStart)
  );

  // Testimonials section
  const testimonialsStart = servicesScrollDisplayEnd - sectionDuration * 0.5;
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
  const servicesShowcaseStart = testimonialsDisplayEnd;
  const servicesShowcaseSlideEnd = servicesShowcaseStart + sectionDuration;
  const servicesShowcaseDisplayEnd = servicesShowcaseSlideEnd + displayDuration;
  const servicesShowcaseScroll = Math.max(0, scrollY - servicesShowcaseStart);
  const servicesShowcaseOffset = Math.min(heroHeight, servicesShowcaseScroll);
  const servicesShowcaseVisible =
    scrollY >= servicesShowcaseStart &&
    scrollY < servicesShowcaseDisplayEnd + sectionDuration;

  // Founder section
  const founderStart = servicesShowcaseDisplayEnd;
  const founderSlideEnd = founderStart + sectionDuration;
  const founderDisplayEnd = founderSlideEnd + displayDuration;
  const founderScroll = Math.max(0, scrollY - founderStart);
  const founderOffset = Math.min(heroHeight, founderScroll);
  const founderVisible =
    scrollY >= founderStart &&
    scrollY < founderDisplayEnd + sectionDuration;

  // Team section
  const teamStart = founderDisplayEnd;
  const teamScroll = Math.max(0, scrollY - teamStart);
  const teamOffset = Math.min(heroHeight, teamScroll);
  const teamVisible = scrollY >= teamStart;

  // Total height - Updated to include team section
  const totalHeight = teamStart + heroHeight * 2;

  return (
    <div className="relative overflow-hidden bg-black">
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
            className="fixed inset-0 w-full bg-black"
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
            className="fixed inset-0 w-full bg-black"
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
        {servicesShowcaseVisible && (
          <div
            className="fixed inset-0 w-full bg-black"
            style={{
              zIndex: 60,
              transform:
                scrollY <= servicesShowcaseSlideEnd
                  ? `translateY(${heroHeight - servicesShowcaseOffset}px)`
                  : `translateY(0px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <ServicesShowcase />
          </div>
        )}

        {/* Founder */}
        {founderVisible && (
          <div
            className="fixed inset-0 w-full bg-white"
            style={{
              zIndex: 70,
              transform:
                scrollY <= founderSlideEnd
                  ? `translateY(${heroHeight - founderOffset}px)`
                  : `translateY(0px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <Founder />
          </div>
        )}

        {/* Team */}
        {teamVisible && (
          <div
            className="fixed inset-0 w-full bg-gray-50"
            style={{
              zIndex: 80,
              transform: `translateY(${heroHeight - teamOffset}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <Team />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;