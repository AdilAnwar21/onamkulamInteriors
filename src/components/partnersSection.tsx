import React, { useEffect, useState } from 'react';

type Brand = {
  name: string;
  position?: string;
  description?: string;
  founded?: string;
  specialty?: string;
};

// const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

const ExclusiveBrandsComplete: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const exclusiveBrands: Brand[] = [
    {
      name: 'MERIDIANI',
      position: 'top-left',
      description: 'Italian luxury furniture brand known for sophisticated contemporary design and exceptional craftsmanship.',
      founded: '1996',
      specialty: 'Contemporary Furniture',
    },
    {
      name: 'Frigerio',
      position: 'top-right',
      description: 'Premium Italian furniture manufacturer specializing in upholstered seating and elegant living solutions.',
      founded: '1941',
      specialty: 'Upholstered Furniture',
    },
    {
      name: 'FIAM',
      position: 'bottom-left',
      description: 'Innovative glass furniture design company creating stunning curved and artistic glass pieces.',
      founded: '1973',
      specialty: 'Glass Furniture',
    },
    {
      name: 'SANGIACOMO',
      position: 'bottom-right',
      description: 'Modern Italian furniture brand offering contemporary storage solutions and bedroom furniture.',
      founded: '1968',
      specialty: 'Storage Solutions',
    },
  ];

  const partners = [
    { name: 'hansgrohe', logo: 'hansgrohe' },
    { name: 'WOLF', logo: 'WOLF' },
    { name: 'SIEMENS', logo: 'SIEMENS' },
    { name: 'BANG & OLUFSEN', logo: 'B&O', subtitle: 'BANG & OLUFSEN' },
    { name: 'davide groppi', logo: 'davide groppi' },
    { name: 'GAGGENAU', logo: 'GAGGENAU' },
    { name: 'SUB-ZERO', logo: 'SUB•ZERO' },
    { name: 'smeg', logo: '•••smeg' },
  ];

  // Improved section boundaries with faster transitions
  const getCurrentSection = () => {
    if (scrollProgress < 0.35) return 0; // Title + Grid (0-35%)
    if (scrollProgress < 0.65) return 1; // Partners (35-65%)
    return 2; // Quote (65-100%)
  };

  const currentSection = getCurrentSection();

  // Optimized section-specific progress calculations
  const titleGridProgress = scrollProgress < 0.35 ? scrollProgress / 0.35 : 1;
  const partnersProgress = scrollProgress >= 0.35 && scrollProgress < 0.65 ? (scrollProgress - 0.35) / 0.3 : (scrollProgress >= 0.65 ? 1 : 0);
  const quoteProgress = scrollProgress >= 0.65 ? (scrollProgress - 0.65) / 0.35 : 0;
  
  // Faster title and grid progression
  const titleProgress = titleGridProgress;
  const gridProgress = titleGridProgress > 0.2 ? (titleGridProgress - 0.2) / 0.8 : 0;
  
  const colorTransitionProgress = scrollProgress > 0.75 ? Math.min(1, (scrollProgress - 0.75) * 4) : 0;

  // Brand stagger animation with reduced delay
  const brandProgressForIndex = (index: number) => {
    if (gridProgress <= 0) return 0;
    const stagger = 0.05; // Reduced from 0.1
    const start = index * stagger;
    const adjustedProgress = Math.max(0, gridProgress - start);
    return Math.min(1, adjustedProgress * 2.5); // Faster animation
  };

  const marqueeDuration = partnersProgress > 0 ? Math.max(12, 20 - partnersProgress * 8) : 20;

  // Color transition effect
  const isWhiteMode = colorTransitionProgress > 0.5;
  const sweepProgress = colorTransitionProgress;

  if (!mounted) return null;

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden ${
        isWhiteMode ? 'bg-white text-black' : 'bg-black text-white'
      }`}
      style={{
        transition: 'background-color 0.6s ease, color 0.6s ease'
      }}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee { overflow: hidden; width: 100%; }
        .marquee-inner {
          display: flex;
          gap: 1rem;
          width: calc(200%);
          animation: marquee ${marqueeDuration}s linear infinite;
        }
        
        @media (min-width: 768px) {
          .marquee-inner {
            gap: 2rem;
          }
        }
        
        .brand-card {
          transition: all 0.2s ease;
        }
        .brand-card:hover {
          transform: translateY(-3px) scale(1.01);
        }
        
        .color-sweep {
          position: absolute;
          top: 0;
          left: ${-100 + sweepProgress * 200}%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%);
          z-index: 1;
          pointer-events: none;
          opacity: ${colorTransitionProgress > 0 ? colorTransitionProgress : 0};
        }

        .section {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .section {
            padding: 2rem;
          }
        }
      `}</style>

      {/* Color sweep effect */}
      {colorTransitionProgress > 0 && <div className="color-sweep" />}

      {/* Content container with absolute positioned sections */}
      <div className="relative z-10 w-full h-full">
        
        {/* EXCLUSIVE BRANDS TITLE + GRID SECTION */}
        <div 
          className="section"
          style={{
            opacity: currentSection === 0 ? 1 : currentSection === 1 ? Math.max(0, 1 - (scrollProgress - 0.35) * 8) : 0,
            transform: `translateY(${
              currentSection === 0 ? 0 : 
              currentSection === 1 ? -(scrollProgress - 0.35) * 200 : -80
            }px)`,
            transition: 'opacity 0.3s ease-out',
            pointerEvents: currentSection <= 1 ? 'auto' : 'none'
          }}
        >
          {/* Title */}
          <div
            className="mb-6 md:mb-12 lg:mb-16 text-center mt-8 md:mt-0"
            style={{
              opacity: titleProgress,
              transform: `translateY(${Math.max(0, (1 - titleProgress) * 30)}px)`,
              transition: 'all 0.4s ease'
            }}
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider leading-tight">
              <div
                style={{
                  opacity: titleProgress > 0.15 ? 1 : 0,
                  transform: `translateY(${titleProgress > 0.15 ? 0 : 20}px)`,
                  transition: 'all 0.6s ease 0.1s'
                }}
              >
                OUR
              </div>
              <div
                style={{
                  opacity: titleProgress > 0.3 ? 1 : 0,
                  transform: `translateY(${titleProgress > 0.3 ? 0 : 20}px)`,
                  transition: 'all 0.6s ease 0.2s'
                }}
              >
                EXCLUSIVE
              </div>
              <div
                style={{
                  opacity: titleProgress > 0.45 ? 1 : 0,
                  transform: `translateY(${titleProgress > 0.45 ? 0 : 20}px)`,
                  transition: 'all 0.6s ease 0.3s'
                }}
              >
                BRANDS
              </div>
            </h2>
          </div>

          {/* BRANDS GRID */}
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 lg:gap-8 px-4">
            {exclusiveBrands.map((brand, i) => {
              const brandProg = brandProgressForIndex(i);
              
              return (
                <div
                  key={brand.name}
                  className={`border rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 text-center cursor-pointer min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex flex-col justify-center brand-card ${
                    isWhiteMode 
                      ? 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400' 
                      : 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-800/60 hover:border-gray-700/60'
                  }`}
                  style={{
                    opacity: brandProg,
                    transform: `translateY(${Math.max(0, (1 - brandProg) * 20)}px) scale(${0.95 + brandProg * 0.05})`,
                    transition: `all 0.4s ease ${i * 0.05}s`
                  }}
                >
                  <h3 className="text-base sm:text-lg md:text-2xl font-light tracking-wide">
                    {brand.name}
                  </h3>
                  <div className={`w-8 sm:w-10 md:w-12 h-0.5 mx-auto mt-3 md:mt-4 opacity-60 ${
                    isWhiteMode 
                      ? 'bg-gradient-to-r from-transparent via-black to-transparent' 
                      : 'bg-gradient-to-r from-transparent via-white to-transparent'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* PARTNERS SECTION */}
        <div 
          className="section"
          style={{
            opacity: currentSection === 1 ? Math.min(1, (scrollProgress - 0.35) * 8) : currentSection === 2 ? Math.max(0, 1 - (scrollProgress - 0.65) * 8) : 0,
            transform: `translateY(${
              currentSection === 1 ? (1 - (scrollProgress - 0.35) * 5) * 80 : 
              currentSection === 2 ? -(scrollProgress - 0.65) * 200 :
              currentSection < 1 ? 80 : -80
            }px)`,
            transition: 'opacity 0.3s ease-out',
            pointerEvents: currentSection === 1 ? 'auto' : 'none'
          }}
        >
          <div
            className="mb-8 md:mb-12 lg:mb-16 text-center"
            style={{
              opacity: partnersProgress,
              transform: `translateY(${Math.max(0, (1 - partnersProgress) * 30)}px)`,
              transition: 'all 0.4s ease'
            }}
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider">
              OUR PARTNERS
            </h2>
          </div>
          
          {partnersProgress > 0 && (
            <div
              className="w-full max-w-full marquee"
              style={{ 
                opacity: partnersProgress,
                transition: 'opacity 0.4s ease'
              }}
            >
              <div className="marquee-inner">
                {[...partners, ...partners].map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className={`min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[280px] h-24 sm:h-28 md:h-32 lg:h-40 border rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${
                      isWhiteMode 
                        ? 'bg-transparent border-black/60 hover:border-black' 
                        : 'bg-transparent border-white/60 hover:border-white'
                    }`}
                    style={{ transition: 'all 0.2s ease' }}
                  >
                    {p.name === 'BANG & OLUFSEN' ? (
                      <div className="text-center">
                        <h3 className="text-base sm:text-lg md:text-xl font-light tracking-wide">B&O</h3>
                        <p className={`text-xs sm:text-sm mt-1 tracking-wider ${
                          isWhiteMode ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          BANG & OLUFSEN
                        </p>
                      </div>
                    ) : p.name === 'WOLF' ? (
                      <div className={`border px-2 sm:px-3 py-1 sm:py-1.5 ${
                        isWhiteMode ? 'border-black' : 'border-white'
                      }`}>
                        <h3 className="text-sm sm:text-base md:text-lg font-light tracking-wider">{p.logo}</h3>
                      </div>
                    ) : (
                      <h3 className="text-sm sm:text-base md:text-lg font-light tracking-wide px-2">{p.logo}</h3>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* QUOTE SECTION */}
        <div 
          className="section"
          style={{
            opacity: currentSection === 2 ? Math.min(1, (scrollProgress - 0.65) * 8) : 0,
            transform: `translateY(${
              currentSection === 2 ? (1 - (scrollProgress - 0.65) * 5) * 80 : 
              currentSection < 2 ? 80 : 0
            }px)`,
            transition: 'opacity 0.3s ease-out',
            pointerEvents: currentSection === 2 ? 'auto' : 'none'
          }}
        >
          <div
            className="px-4"
            style={{
              opacity: quoteProgress,
              transform: `translateY(${Math.max(0, (1 - quoteProgress) * 30)}px)`,
              transition: 'all 0.6s ease',
              maxWidth: '90vw',
              textAlign: 'center',
            }}
          >
            <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light leading-relaxed max-w-4xl mx-auto">
              With unlimited creativity,{' '}
              <span className="italic">we transform your vision</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveBrandsComplete;