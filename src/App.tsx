import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FloatingNavbar from './components/FloatingNavbar';
import Achievements from './components/Achievements';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Smooth scrolling
    // Disable smooth scrolling for better stacking effect
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Update document title
    document.title = 'HouseMood - Interior Design Studio';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Calculate stacking positions
  const heroHeight = window.innerHeight;
  const achievementsOffset = Math.max(0, Math.min(heroHeight, scrollY - heroHeight * 0.3));

  return (
    <div className="relative overflow-hidden">
      {/* Floating Navigation */}
      <FloatingNavbar />
      
      {/* Main Content */}
      <main className="relative" style={{ height: `${heroHeight * 2}px` }}>
        {/* Hero Section - Fixed positioning for stacking effect */}
        <div 
          className="fixed inset-0 w-full"
          style={{ 
            zIndex: 10,
            transform: `translateY(${-Math.min(scrollY * 0.5, heroHeight * 0.3)}px)`
          }}
        >
          <Hero />
        </div>
        
        {/* Achievements Section - Moves up and stacks on top */}
        <div 
          className="absolute w-full"
          style={{ 
            top: `${heroHeight}px`,
            zIndex: 30,
            transform: `translateY(${-achievementsOffset}px)`
          }}
        >
          <Achievements />
        </div>
      </main>
    </div>
  );
}

export default App;