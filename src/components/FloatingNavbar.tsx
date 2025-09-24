import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, ArrowRight } from 'lucide-react';

const FloatingNavbar = ({ activeSection }: { activeSection?: string }) => {
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

  // Calculate navbar expansion based on scroll
  const heroHeight = window.innerHeight;
  const scrollProgress = Math.min(scrollY / (heroHeight * 0.6), 1);

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: User },
    { name: 'Projects', icon: Briefcase },
    { name: 'Contact', icon: Mail },
  ];

  // Easing
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const smoothProgress = easeInOutCubic(scrollProgress);

  // Desktop navbar calculations
  const getDesktopNavbarWidth = () => {
    if (scrollProgress === 0) return 'auto';
    if (scrollProgress < 0.2) return `${220 + smoothProgress * 120}px`;
    if (scrollProgress < 0.4) return `${420 + smoothProgress * 180}px`;
    if (scrollProgress < 0.7) return `${650 + smoothProgress * 120}px`;
    return '880px';
  };

  const getDesktopNavbarTransform = () => {
    const moveDistance = smoothProgress * 300;
    return `translateX(-${moveDistance}px)`;
  };

  // Translucent frosted glass background
  const getNavbarBackground = () => {
    if (scrollProgress === 0) return 'transparent';
    return `linear-gradient(
    135deg,
    rgba(255, 255, 255, ${0.04 + scrollProgress * 0.1}),
    rgba(255, 255, 255, ${0.02 + scrollProgress * 0.06})
  )`;
  };

  const getBorderStyle = () => {
    return scrollProgress > 0 ? 'border border-white/20' : '';
  };

  const getBackdropBlur = () => {
    return scrollProgress > 0 ? 'backdrop-blur-2xl' : '';
  };

  const getShadow = () => {
    return scrollProgress > 0.1
      ? 'shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.15)]'
      : '';
  };

  // -------------------- MOBILE NAVBAR --------------------
  if (isMobile) {
    return (
      <>
        {/* Mobile Sticky Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <div className="text-black font-bold text-lg tracking-wider">
              ONAMKULAM
            </div>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <div
                className={`transition-transform duration-300 ${
                  isMenuOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="fixed top-16 left-4 right-4 z-50 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-6 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="space-y-3">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.name;

                  return (
                    <button
                      key={item.name}
                      className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                        isActive
                          ? 'bg-black text-white'
                          : 'text-black hover:text-[#8B4513] hover:bg-black/5'
                      }`}
                      style={{
                        animationDelay: `${index * 50 + 100}ms`,
                        animationFillMode: 'both',
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}

                {/* Say Hello Button */}
                <div className="pt-3 border-t border-black/20 animate-in slide-in-from-bottom-2 fade-in duration-400 delay-400">
                  <button className="w-full bg-black/10 text-black px-6 py-3 rounded-full flex items-center justify-center space-x-3 hover:bg-black/20 transition-all duration-300 hover:scale-105 active:scale-95">
                    <span className="font-medium">Say "Hello"</span>
                    <div className="bg-yellow-400 rounded-full p-1 transition-all duration-300 hover:rotate-12">
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

  // -------------------- DESKTOP NAVBAR --------------------
  return (
    <nav className="fixed top-6 right-6 z-50">
      <div
        className="relative"
        style={{
          width: getDesktopNavbarWidth(),
          transform: getDesktopNavbarTransform(),
          transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div
          className={`rounded-full ${getBorderStyle()} ${getBackdropBlur()} ${getShadow()} overflow-hidden relative`}
          style={{
            background: getNavbarBackground(),
            height: scrollProgress > 0.2 ? '68px' : '56px',
            transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {/* Noise texture overlay for liquid glass effect */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.65\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\" opacity=\\"0.1\\"/%3E%3C/svg%3E")',
              mixBlendMode: 'overlay',
            }}
          />
          <div className="flex items-center h-full px-2 relative">
            {/* Logo */}
            <div
              className="flex items-center overflow-hidden"
              style={{
                width:
                  scrollProgress > 0.3
                    ? `${Math.min(200, (scrollProgress - 0.3) * 320)}px`
                    : '0px',
                opacity:
                  scrollProgress > 0.4
                    ? Math.min(1, (scrollProgress - 0.4) * 2.5)
                    : 0,
                transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <div className="px-6 py-2 text-black font-bold text-xl whitespace-nowrap tracking-wider">
                ONAMKULAM
              </div>
            </div>

            {/* Nav Items */}
            <div
              className="flex items-center space-x-1 overflow-hidden"
              style={{
                width:
                  scrollProgress > 0.1
                    ? `${Math.min(450, (scrollProgress - 0.1) * 520)}px`
                    : '0px',
                opacity:
                  scrollProgress > 0.2
                    ? Math.min(1, (scrollProgress - 0.2) * 2.5)
                    : 0,
                transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const itemDelay = index * 0.02;
                const itemProgress = Math.max(
                  0,
                  Math.min(1, (scrollProgress - 0.2 - itemDelay) / 0.3)
                );
                const smoothItemProgress = easeInOutCubic(itemProgress);
                const isActive = activeSection === item.name;

                return (
                  <button
                    key={item.name}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-full group whitespace-nowrap text-sm font-medium transition-all duration-300
                      ${
                        isActive
                          ? 'bg-black text-white shadow-md'
                          : 'text-black hover:text-[#8B4513] hover:bg-white/10'
                      }`}
                    style={{
                      opacity: smoothItemProgress,
                      transform: `translateY(${
                        (1 - smoothItemProgress) * 2
                      }px)`,
                      transition:
                        'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  >
                    <Icon
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                    />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Say Hello Button */}
            <div className="ml-auto">
              <button
                className="bg-white/20 text-black px-6 py-3 rounded-full flex items-center space-x-3 hover:bg-white/30 hover:scale-105 whitespace-nowrap transition-all duration-300"
                style={{ backdropFilter: 'blur(4px)' }}
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
