import React, { useEffect, useState } from 'react';

type Brand = {
  name: string;
  position?: string;
  description?: string;
  founded?: string;
  specialty?: string;
};

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

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

  // BETTER progress divisions with more space for each section
  const titleProgress = scrollProgress < 0.25 ? Math.min(1, scrollProgress * 4) : 1; // 0-25%: Title
  const gridProgress = scrollProgress > 0.15 && scrollProgress < 0.5 ? Math.min(1, (scrollProgress - 0.15) * 2.86) : scrollProgress >= 0.5 ? 1 : 0; // 15-50%: Grid
  const partnersProgress = scrollProgress > 0.4 && scrollProgress < 0.75 ? Math.min(1, (scrollProgress - 0.4) * 2.86) : scrollProgress >= 0.75 ? 1 : 0; // 40-75%: Partners
  const quoteProgress = scrollProgress > 0.65 && scrollProgress < 0.9 ? Math.min(1, (scrollProgress - 0.65) * 4) : scrollProgress >= 0.9 ? 1 : 0; // 65-90%: Quote
  const colorTransitionProgress = scrollProgress > 0.8 ? Math.min(1, (scrollProgress - 0.8) * 5) : 0; // 80-100%: Color transition

  // Calculate which section should be visible based on scroll progress
  const getCurrentSection = () => {
    if (scrollProgress < 0.25) return 0; // Title + Grid
    if (scrollProgress < 0.5) return 1; // Grid
    if (scrollProgress < 0.75) return 2; // Partners
    return 3; // Quote
  };

  const currentSection = getCurrentSection();

  // Brand stagger animation
  const brandProgressForIndex = (index: number) => {
    if (gridProgress <= 0) return 0;
    const stagger = 0.1;
    const start = index * stagger;
    const adjustedProgress = Math.max(0, gridProgress - start);
    return Math.min(1, adjustedProgress * 2);
  };

  const marqueeDuration = Math.max(15, 25 - partnersProgress * 10);

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
        transition: 'background-color 0.8s ease, color 0.8s ease'
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
          gap: 2rem;
          width: calc(200%);
          animation: marquee ${marqueeDuration}s linear infinite;
        }
        
        .brand-card {
          transition: all 0.3s ease;
        }
        .brand-card:hover {
          transform: translateY(-5px) scale(1.02);
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
          padding: 2rem;
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
            opacity: scrollProgress < 0.5 ? 1 : Math.max(0, 1 - (scrollProgress - 0.5) * 4),
            transform: `translateY(${scrollProgress < 0.5 ? 0 : -(scrollProgress - 0.5) * 100}px)`,
            transition: 'all 0.3s ease-out'
          }}
        >
          {/* Title */}
          <div
            className="mb-8 md:mb-16 text-center"
            style={{
              opacity: titleProgress,
              transform: `translateY(${Math.max(0, (1 - titleProgress) * 50)}px)`,
              transition: 'all 0.6s ease'
            }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wider leading-tight">
              <div
                style={{
                  opacity: titleProgress > 0.2 ? 1 : 0,
                  transform: `translateY(${titleProgress > 0.2 ? 0 : 30}px)`,
                  transition: 'all 0.8s ease 0.2s'
                }}
              >
                OUR
              </div>
              <div
                style={{
                  opacity: titleProgress > 0.4 ? 1 : 0,
                  transform: `translateY(${titleProgress > 0.4 ? 0 : 30}px)`,
                  transition: 'all 0.8s ease 0.4s'
                }}
              >
                EXCLUSIVE
              </div>
              <div
                style={{
                  opacity: titleProgress > 0.6 ? 1 : 0,
                  transform: `translateY(${titleProgress > 0.6 ? 0 : 30}px)`,
                  transition: 'all 0.8s ease 0.6s'
                }}
              >
                BRANDS
              </div>
            </h2>
          </div>

          {/* BRANDS GRID */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {exclusiveBrands.map((brand, i) => {
              const brandProg = brandProgressForIndex(i);
              
              return (
                <div
                  key={brand.name}
                  className={`border rounded-lg p-6 md:p-8 text-center cursor-pointer min-h-[160px] md:min-h-[180px] flex flex-col justify-center brand-card ${
                    isWhiteMode 
                      ? 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400' 
                      : 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-800/60 hover:border-gray-700/60'
                  }`}
                  style={{
                    opacity: brandProg,
                    transform: `translateY(${Math.max(0, (1 - brandProg) * 30)}px) scale(${0.9 + brandProg * 0.1})`,
                    transition: `all 0.6s ease ${i * 0.1}s`
                  }}
                >
                  <h3 className="text-xl md:text-2xl font-light tracking-wide">
                    {brand.name}
                  </h3>
                  <div className={`w-12 h-0.5 mx-auto mt-4 opacity-60 ${
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
            opacity: scrollProgress >= 0.4 && scrollProgress < 0.8 ? 1 : 0,
            transform: `translateY(${
              scrollProgress < 0.4 ? 100 : 
              scrollProgress >= 0.8 ? -100 : 0
            }px)`,
            transition: 'all 0.3s ease-out'
          }}
        >
          <div
            className="mb-12 md:mb-16 text-center"
            style={{
              opacity: partnersProgress,
              transform: `translateY(${Math.max(0, (1 - partnersProgress) * 50)}px)`,
              transition: 'all 0.6s ease'
            }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wider">
              OUR PARTNERS
            </h2>
          </div>
          
          {partnersProgress > 0 && (
            <div
              className="w-full max-w-full marquee"
              style={{ 
                opacity: partnersProgress,
                transition: 'opacity 0.6s ease'
              }}
            >
              <div className="marquee-inner">
                {[...partners, ...partners].map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className={`min-w-[240px] md:min-w-[280px] h-32 md:h-40 border rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${
                      isWhiteMode 
                        ? 'bg-transparent border-black/60 hover:border-black' 
                        : 'bg-transparent border-white/60 hover:border-white'
                    }`}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    {p.name === 'BANG & OLUFSEN' ? (
                      <div className="text-center">
                        <h3 className="text-lg md:text-xl font-light tracking-wide">B&O</h3>
                        <p className={`text-xs md:text-sm mt-1 tracking-wider ${
                          isWhiteMode ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          BANG & OLUFSEN
                        </p>
                      </div>
                    ) : p.name === 'WOLF' ? (
                      <div className={`border px-3 py-1.5 ${
                        isWhiteMode ? 'border-black' : 'border-white'
                      }`}>
                        <h3 className="text-base md:text-lg font-light tracking-wider">{p.logo}</h3>
                      </div>
                    ) : (
                      <h3 className="text-base md:text-lg font-light tracking-wide">{p.logo}</h3>
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
            opacity: scrollProgress >= 0.65 ? 1 : 0,
            transform: `translateY(${scrollProgress < 0.65 ? 100 : 0}px)`,
            transition: 'all 0.3s ease-out'
          }}
        >
          <div
            style={{
              opacity: quoteProgress,
              transform: `translateY(${Math.max(0, (1 - quoteProgress) * 50)}px)`,
              transition: 'all 0.8s ease',
              maxWidth: '70ch',
              textAlign: 'center',
            }}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed">
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