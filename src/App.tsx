import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FloatingNavbar from './components/FloatingNavbar';
import Achievements from './components/Achievements';
import ExclusiveBrands from './components/partnersSection';

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
  const brandsProgress = brandsScroll / heroHeight; // progress in screens

  return (
    <div className="relative overflow-hidden">
      {/* Floating Navigation */}
      <FloatingNavbar />

      {/* Scrollable container */}
      <main style={{ height: `${heroHeight * 6}px` }}>
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
        <div
          className="absolute inset-0 w-full"
          style={{
            top: `${heroHeight}px`,
            zIndex: 20,
            transform: `translateY(${-achievementsOffset}px)`,
          }}
        >
          <Achievements />
          <ExclusiveBrands scrollProgress={brandsProgress} />
        </div>

        {/* Exclusive Brands Layer */}
        <div
          className="absolute inset-0 w-full"
          style={{
            top: `${heroHeight * 2}px`,
            zIndex: 30,
            transform: `translateY(${-brandsScroll}px)`,
          }}
        >
          
        </div>
      </main>
    </div>
  );
}

export default App;
