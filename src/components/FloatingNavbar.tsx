import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, ArrowRight } from 'lucide-react';
import logo from '../assets/images/LOGO 01.png';

interface FloatingNavbarProps {
  activeSection?: string;
  onBeginStoryClick?: () => void;
}

const FloatingNavbar = ({ activeSection, onBeginStoryClick }: FloatingNavbarProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;
      
      const isIPad = /iPad/.test(userAgent) || 
                   (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                   (width >= 768 && width <= 1366 && 'ontouchstart' in window);
      
      const isPortrait = height > width;
      
      if (width < 768) {
        setDeviceType('mobile');
      } else if ((width <= 1366 || isIPad) && (!isPortrait || width >= 768)) {
        setDeviceType('tablet');
      } else if (isPortrait && width >= 768 && width < 1024) {
        setDeviceType('mobile');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  const heroHeight = window.innerHeight;
  const scrollProgress = Math.min(scrollY / (heroHeight * 0.6), 1);

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: User },
    { name: 'Projects', icon: Briefcase },
    { name: 'Contact', icon: Mail },
  ];

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const smoothProgress = easeInOutCubic(scrollProgress);

  const getNavbarWidth = () => {
    if (scrollProgress === 0) return 'auto';
    
    const baseWidths = {
      desktop: {
        initial: 220,
        step1: 420,
        step2: 650,
        final: 880
      },
      tablet: {
        initial: 180,
        step1: 320,
        step2: 480,
        final: 600
      }
    };
    
    const widths = deviceType === 'desktop' ? baseWidths.desktop : baseWidths.tablet;
    
    if (scrollProgress < 0.2) return `${widths.initial + smoothProgress * (widths.step1 - widths.initial)}px`;
    if (scrollProgress < 0.4) return `${widths.step1 + smoothProgress * (widths.step2 - widths.step1)}px`;
    if (scrollProgress < 0.7) return `${widths.step2 + smoothProgress * (widths.final - widths.step2)}px`;
    return `${widths.final}px`;
  };

  const getNavbarTransform = () => {
    const moveDistance = deviceType === 'tablet' ? smoothProgress * 150 : smoothProgress * 300;
    return `translateX(-${moveDistance}px)`;
  };

  const getNavbarBackground = () => {
    if (scrollProgress === 0) return 'transparent';
    return `linear-gradient(
      135deg,
      rgba(255, 255, 255, ${0.12 + scrollProgress * 0.18}),
      rgba(255, 255, 255, ${0.08 + scrollProgress * 0.12})
    )`;
  };

  const getBorderStyle = () => {
    return scrollProgress > 0 ? 'border border-white/30' : '';
  };

  const getBackdropBlur = () => {
    return scrollProgress > 0 ? 'backdrop-blur-3xl' : '';
  };

  const getShadow = () => {
    return scrollProgress > 0.1
      ? 'shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.15),0_8px_32px_rgba(0,0,0,0.12)]'
      : '';
  };

  // -------------------- MOBILE NAVBAR --------------------
  if (deviceType === 'mobile') {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/15 backdrop-blur-3xl border-white/30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="text-black font-bold text-lg tracking-wider">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black p-2 hover:bg-white/25 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
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

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="fixed top-16 left-4 right-4 z-50 bg-white/98 backdrop-blur-3xl rounded-2xl border border-white/40 shadow-2xl p-6 animate-in slide-in-from-top-4 fade-in duration-300">
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

                <div className="pt-3 border-t border-black/20 animate-in slide-in-from-bottom-2 fade-in duration-400 delay-400">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      onBeginStoryClick?.();
                    }}
                    className="w-full bg-black/10 text-black px-6 py-3 rounded-full flex items-center justify-center space-x-3 hover:bg-black/20 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span className="font-medium">Begin Your Story</span>
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

  // -------------------- TABLET & DESKTOP NAVBAR --------------------
  return (
    <nav className={`fixed z-50 ${deviceType === 'tablet' ? 'top-4 right-4' : 'top-6 right-6'}`}>
      <div
        className="relative"
        style={{
          width: getNavbarWidth(),
          transform: getNavbarTransform(),
          transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div
          className={`rounded-full ${getBorderStyle()} ${getBackdropBlur()} ${getShadow()} overflow-hidden relative`}
          style={{
            background: getNavbarBackground(),
            height: scrollProgress > 0.2 ? (deviceType === 'tablet' ? '64px' : '68px') : (deviceType === 'tablet' ? '52px' : '56px'),
            transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"4\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\" opacity=\\"0.08\\"/%3E%3C/svg%3E")',
              mixBlendMode: 'overlay',
            }}
          />
          <div className="flex items-center h-full px-2 relative">
            <div
              className="flex items-center overflow-hidden"
              style={{
                width:
                  scrollProgress > 0.3
                    ? `${Math.min(deviceType === 'tablet' ? 160 : 200, (scrollProgress - 0.3) * (deviceType === 'tablet' ? 260 : 320))}px`
                    : '0px',
                opacity:
                  scrollProgress > 0.4
                    ? Math.min(1, (scrollProgress - 0.4) * 2.5)
                    : 0,
                transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <img
                src={logo}
                alt="Logo"
                className={`${deviceType === 'tablet' ? 'h-7' : 'h-8'} w-auto object-contain px-4`}
              />
            </div>

            <div
              className="flex items-center space-x-1 overflow-hidden"
              style={{
                width:
                  scrollProgress > 0.1
                    ? `${Math.min(deviceType === 'tablet' ? 280 : 450, (scrollProgress - 0.1) * (deviceType === 'tablet' ? 340 : 520))}px`
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
                    className={`flex items-center space-x-2 rounded-full group whitespace-nowrap font-medium transition-all duration-300
                      ${deviceType === 'tablet' ? 'px-3 py-2 text-sm' : 'px-4 py-2.5 text-sm'}
                      ${
                        isActive
                          ? 'bg-black text-white shadow-md'
                          : 'text-black hover:text-[#8B4513] hover:bg-white/15'
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
                      className={`${deviceType === 'tablet' ? 'w-4 h-4' : 'w-4 h-4'} transition-transform duration-300 ${
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

            <div className="ml-auto">
              <button
                onClick={onBeginStoryClick}
                className={`bg-white/20 text-black rounded-full flex items-center space-x-3 hover:bg-white/30 hover:scale-105 whitespace-nowrap transition-all duration-300
                  ${deviceType === 'tablet' ? 'px-5 py-2.5' : 'px-6 py-3'}`}
                style={{ backdropFilter: 'blur(4px)' }}
              >
                <span className={`font-medium italic ${deviceType === 'tablet' ? 'text-sm' : 'text-base'}`}>
                  Begin Your Story
                </span>
                <div className="bg-yellow-400 rounded-full p-1 transition-all duration-300">
                  <ArrowRight className={`${deviceType === 'tablet' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-black`} />
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