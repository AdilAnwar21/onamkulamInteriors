import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, ArrowRight } from 'lucide-react';

const FloatingNavbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Calculate navbar expansion based on scroll - complete expansion at 60% of hero height
  const heroHeight = window.innerHeight;
  const scrollProgress = Math.min(scrollY / (heroHeight * 0.6), 1);

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: User },
    { name: 'Projects', icon: Briefcase },
    { name: 'Contact', icon: Mail },
  ];

  // Smooth easing function
  const easeInOutCubic = (t: any) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const smoothProgress = easeInOutCubic(scrollProgress);

  // Desktop navbar calculations
  const getDesktopNavbarWidth = () => {
    if (scrollProgress === 0) return 'auto';
    if (scrollProgress < 0.2) return `${220 + smoothProgress * 120}px`;
    if (scrollProgress < 0.4) return `${420 + smoothProgress * 180}px`;
    if (scrollProgress < 0.7) return `${650 + smoothProgress * 100}px`;
    return '800px'; // increased from 720px → 800px
  };

  const getDesktopNavbarTransform = () => {
    const moveDistance = smoothProgress * 300;
    return `translateX(-${moveDistance}px)`;
  };

  const getNavbarOpacity = () => {
    return Math.min(0.95, 0.75 + scrollProgress * 0.2);
  };

  const getBorderStyle = () => {
    return scrollProgress > 0.25 ? 'border border-black/20' : '';
  };

  // Mobile navbar (only logo + hamburger)
  if (isMobile) {
    return (
      <>
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white backdrop-blur-xl rounded-full border border-black/20 shadow-2xl px-4 py-3">
            <div className="flex items-center justify-between space-x-4">
              {/* Logo */}
              <div className="text-black font-bold text-lg tracking-wider">
                HOUSEMOOD
              </div>
              
              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black p-2 hover:bg-black/10 rounded-full transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white backdrop-blur-xl rounded-2xl border border-black/20 shadow-2xl p-6 min-w-[250px]">
              <div className="space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      className="flex items-center space-x-3 w-full text-left px-4 py-3 text-black hover:text-brown-700 hover:bg-black/5 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
                
                {/* Say Hello Button */}
                <div className="pt-3 border-t border-black/20">
                  <button className="w-full bg-black/10 text-black px-6 py-3 rounded-full flex items-center justify-center space-x-3 hover:bg-black/20 transition-all duration-300">
                    <span className="font-medium">Say "Hello"</span>
                    <div className="bg-yellow-400 rounded-full p-1">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop navbar
  return (
    <nav className="fixed top-6 right-6 z-50">
      <div 
        className="relative"
        style={{ 
          width: getDesktopNavbarWidth(),
          transform: getDesktopNavbarTransform(),
          transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        <div 
          className={`bg-white backdrop-blur-xl rounded-full ${getBorderStyle()} shadow-2xl overflow-hidden`}
          style={{ 
            opacity: getNavbarOpacity(),
            height: scrollProgress > 0.2 ? '68px' : '56px',
            transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          <div className="flex items-center h-full px-2">
            {/* Logo */}
            <div 
              className="flex items-center overflow-hidden"
              style={{
                width: scrollProgress > 0.3 ? `${Math.min(200, (scrollProgress - 0.3) * 320)}px` : '0px',
                opacity: scrollProgress > 0.4 ? Math.min(1, (scrollProgress - 0.4) * 2.5) : 0,
                transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              <div className="px-6 py-2 text-black font-bold text-xl whitespace-nowrap tracking-wider">
                HOUSEMOOD
              </div>
            </div>

            {/* Nav Items */}
            <div
              className="flex items-center space-x-1 overflow-hidden"
              style={{
                width: scrollProgress > 0.1 ? `${Math.min(400, (scrollProgress - 0.1) * 500)}px` : '0px',
                opacity: scrollProgress > 0.2 ? Math.min(1, (scrollProgress - 0.2) * 2.5) : 0,
                transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const itemDelay = index * 0.02;
                const itemProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2 - itemDelay) / 0.3));
                const smoothItemProgress = easeInOutCubic(itemProgress);
                
                return (
                  <button
                    key={item.name}
                    className="flex items-center space-x-2 px-4 py-2.5 text-black hover:text-brown-700 hover:bg-black/5 rounded-full group whitespace-nowrap text-sm font-medium"
                    style={{
                      opacity: smoothItemProgress,
                      transform: `translateY(${(1 - smoothItemProgress) * 2}px)`,
                      transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Say Hello Button */}
            <div className="ml-auto">
              <button
                className="bg-black/10 text-black px-6 py-3 rounded-full flex items-center space-x-3 hover:bg-black/20 hover:scale-105 whitespace-nowrap"
              >
                <span className="font-medium">Say "Hello"</span>
                <div className="bg-yellow-400 rounded-full p-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
