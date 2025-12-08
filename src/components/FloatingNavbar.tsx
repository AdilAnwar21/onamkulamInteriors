import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, ArrowRight } from 'lucide-react';
import logo from '../assets/images/LOGO 01.png';

interface FloatingNavbarProps {
  activeSection?: string;
  onBeginStoryClick?: () => void;
  onNavClick?: (section: string) => void;
}

const FloatingNavbar = ({ activeSection, onBeginStoryClick, onNavClick }: FloatingNavbarProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width < 1280) {
        setDeviceType('tablet');
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
        initial: 160,
        step1: 340,
        step2: 540,
        final: 720 // Fits iPad Mini (768px) with 24px margin on sides
      }
    };

    const widths = deviceType === 'desktop' ? baseWidths.desktop : baseWidths.tablet;

    if (scrollProgress < 0.2) return `${widths.initial + smoothProgress * (widths.step1 - widths.initial)}px`;
    if (scrollProgress < 0.4) return `${widths.step1 + smoothProgress * (widths.step2 - widths.step1)}px`;
    if (scrollProgress < 0.7) return `${widths.step2 + smoothProgress * (widths.final - widths.step2)}px`;
    return `${widths.final}px`;
  };

  const getNavbarTransform = () => {
    // FIX: Tablet uses Flex centering now, so we remove translateX animation for it.
    // Desktop still slides from right to left.
    if (deviceType === 'tablet') return 'none';

    const moveDistance = smoothProgress * 300;
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
        <nav className="fixed top-4 left-4 right-4 z-50 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="text-black font-bold text-lg tracking-wider">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black p-1.5 hover:bg-white/25 rounded-full transition-all duration-300 active:scale-95"
            >
              <div
                className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : 'rotate-0'
                  }`}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
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

            <div className="fixed top-20 left-4 right-4 z-50 bg-white/95 backdrop-blur-3xl rounded-2xl border border-white/40 shadow-2xl p-5 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setIsMenuOpen(false);
                        onNavClick?.(item.name);
                      }}
                      className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isActive
                        ? 'bg-[#f0f0f0] text-[#8B4513] shadow-sm'
                        : 'text-black hover:text-[#8B4513] hover:bg-black/5'
                        }`}
                      style={{
                        animationDelay: `${index * 50 + 100}ms`,
                        animationFillMode: 'both',
                      }}
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
  // Desktop: Fixed right. Tablet: Fixed center (using flex justify-center on w-full wrapper).
  const navLayoutClass = deviceType === 'tablet'
    ? 'fixed z-50 top-4 left-0 w-full flex justify-center pointer-events-none'
    : 'fixed z-50 top-6 right-6';

  return (
    <nav className={navLayoutClass}>
      <div
        className={`relative ${deviceType === 'tablet' ? 'pointer-events-auto' : ''}`}
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
            height: scrollProgress > 0.2 ? (deviceType === 'tablet' ? '60px' : '68px') : (deviceType === 'tablet' ? '50px' : '56px'),
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
            {/* Logo Section */}
            <div
              className="flex items-center overflow-hidden"
              style={{
                width:
                  scrollProgress > 0.3
                    ? `${Math.min(deviceType === 'tablet' ? 130 : 200, (scrollProgress - 0.3) * (deviceType === 'tablet' ? 260 : 320))}px`
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
                className={`${deviceType === 'tablet' ? 'h-6 pl-3' : 'h-8 px-4'} w-auto object-contain`}
              />
            </div>

            {/* Nav Items */}
            <div
              className="flex items-center space-x-1 overflow-hidden"
              style={{
                width:
                  scrollProgress > 0.1
                    ? `${Math.min(deviceType === 'tablet' ? 350 : 450, (scrollProgress - 0.1) * (deviceType === 'tablet' ? 380 : 520))}px`
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
                    onClick={() => onNavClick?.(item.name)}
                    className={`flex items-center space-x-2 rounded-full group whitespace-nowrap font-medium transition-all duration-300
                      ${deviceType === 'tablet' ? 'px-2.5 py-2 text-xs' : 'px-4 py-2.5 text-sm'}
                      ${isActive
                        ? 'bg-[#f0f0f0] text-[#8B4513] shadow-sm'
                        : 'text-black hover:text-[#8B4513] hover:bg-white/15'
                      }`}
                    style={{
                      opacity: smoothItemProgress,
                      transform: `translateY(${(1 - smoothItemProgress) * 2
                        }px)`,
                      transition:
                        'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  >
                    <Icon
                      className={`${deviceType === 'tablet' ? 'w-3.5 h-3.5' : 'w-4 h-4'} transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                        }`}
                    />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Call to Action Button */}
            <div className="ml-auto">
              <button
                onClick={onBeginStoryClick}
                className={`bg-white/20 text-black rounded-full flex items-center space-x-3 hover:bg-white/30 hover:scale-105 whitespace-nowrap transition-all duration-300
                  ${deviceType === 'tablet' ? 'px-4 py-2' : 'px-6 py-3'}`}
                style={{ backdropFilter: 'blur(4px)' }}
              >
                <span className={`font-medium italic ${deviceType === 'tablet' ? 'text-xs' : 'text-base'}`}>
                  Begin Your Story
                </span>
                <div className="bg-yellow-400 rounded-full p-1 transition-all duration-300">
                  <ArrowRight className={`${deviceType === 'tablet' ? 'w-3 h-3' : 'w-4 h-4'} text-black`} />
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