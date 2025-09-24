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

  // Much simpler progress divisions - wider ranges so everything shows
  const titleProgress = Math.min(1, scrollProgress * 3); // Shows early and stays
  const gridProgress = scrollProgress > 0.1 ? Math.min(1, (scrollProgress - 0.1) * 2.5) : 0;
  const partnersProgress = scrollProgress > 0.25 ? Math.min(1, (scrollProgress - 0.25) * 2) : 0;
  const quoteProgress = scrollProgress > 0.45 ? Math.min(1, (scrollProgress - 0.45) * 2) : 0;
  const colorTransitionProgress = scrollProgress > 0.7 ? Math.min(1, (scrollProgress - 0.7) * 3.33) : 0;

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
      className={`relative overflow-hidden min-h-[400vh] ${
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
      `}</style>

      {/* Color sweep effect */}
      {colorTransitionProgress > 0 && <div className="color-sweep" />}

      {/* Content container */}
      <div className="relative z-10">
        {/* EXCLUSIVE BRANDS TITLE SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-10 py-16">
          <div
            className="mb-16 text-center"
            style={{
              opacity: titleProgress,
              transform: `translateY(${Math.max(0, (1 - titleProgress) * 50)}px)`,
              transition: 'all 0.6s ease'
            }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider leading-tight">
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
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {exclusiveBrands.map((brand, i) => {
              const brandProg = brandProgressForIndex(i);
              
              return (
                <div
                  key={brand.name}
                  className={`border rounded-lg p-8 md:p-12 text-center cursor-pointer min-h-[200px] md:min-h-[240px] flex flex-col justify-center brand-card ${
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
                  <h3 className="text-2xl md:text-3xl font-light tracking-wide">
                    {brand.name}
                  </h3>
                  <div className={`w-16 h-0.5 mx-auto mt-6 opacity-60 ${
                    isWhiteMode 
                      ? 'bg-gradient-to-r from-transparent via-black to-transparent' 
                      : 'bg-gradient-to-r from-transparent via-white to-transparent'
                  }`} />
                </div>
              );
            })}
          </div>
        </section>

        {/* PARTNERS SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-16">
          <div
            className="mb-16 text-center"
            style={{
              opacity: partnersProgress,
              transform: `translateY(${Math.max(0, (1 - partnersProgress) * 50)}px)`,
              transition: 'all 0.6s ease'
            }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider">
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
                    className={`min-w-[280px] md:min-w-[320px] h-40 md:h-48 border rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${
                      isWhiteMode 
                        ? 'bg-transparent border-black/60 hover:border-black' 
                        : 'bg-transparent border-white/60 hover:border-white'
                    }`}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    {p.name === 'BANG & OLUFSEN' ? (
                      <div className="text-center">
                        <h3 className="text-xl md:text-2xl font-light tracking-wide">B&O</h3>
                        <p className={`text-xs md:text-sm mt-1 tracking-wider ${
                          isWhiteMode ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          BANG & OLUFSEN
                        </p>
                      </div>
                    ) : p.name === 'WOLF' ? (
                      <div className={`border px-4 py-2 ${
                        isWhiteMode ? 'border-black' : 'border-white'
                      }`}>
                        <h3 className="text-lg md:text-xl font-light tracking-wider">{p.logo}</h3>
                      </div>
                    ) : (
                      <h3 className="text-lg md:text-xl font-light tracking-wide">{p.logo}</h3>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* QUOTE SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-16 text-center">
          <div
            style={{
              opacity: quoteProgress,
              transform: `translateY(${Math.max(0, (1 - quoteProgress) * 50)}px)`,
              transition: 'all 0.8s ease',
              maxWidth: '80ch',
            }}
          >
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed">
              With unlimited creativity,{' '}
              <span className="italic">we transform your vision</span>
            </h3>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExclusiveBrandsComplete;