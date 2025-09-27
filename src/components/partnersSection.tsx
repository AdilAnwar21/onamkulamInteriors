import React, { useEffect, useState } from 'react';

type Brand = {
  name: string;
  position?: string;
  description?: string;
  founded?: string;
  specialty?: string;
};

const ExclusiveBrandsComplete: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0 }) => {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);

  const fullQuote = "Crafting spaces that inspire, designing dreams that come alive.";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth typing effect with fluid progression
  useEffect(() => {
    if (scrollProgress > 0 && scrollProgress < 0.23) {
      const typingProgress = scrollProgress / 0.23;
      
      // Smooth easing for more natural typing speed
      const easedProgress = typingProgress * typingProgress * (3 - 2 * typingProgress); // smoothstep
      const targetLength = Math.floor(fullQuote.length * easedProgress);
      
      // Show cursor when typing starts
      if (typingProgress > 0.03 && !showCursor) {
        setShowCursor(true);
      }
      
      // Immediate, smooth character progression without delays
      setTypedText(fullQuote.slice(0, targetLength));
      
    } else if (scrollProgress >= 0.23) {
      setTypedText(fullQuote);
      // Hide cursor when typing is complete
      if (showCursor) {
        setTimeout(() => setShowCursor(false), 800);
      }
    } else {
      setTypedText('');
      setShowCursor(false);
    }
  }, [scrollProgress]);

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

  // Smoother section boundaries with gentle transitions
  const getCurrentSection = () => {
    if (scrollProgress < 0.22) return 0; // Quote (0-22%)
    if (scrollProgress < 0.24) return 0.5; // Transition from quote to brands
    if (scrollProgress < 0.47) return 1; // Title + Grid (24-47%)
    if (scrollProgress < 0.49) return 1.5; // Transition from brands to partners
    if (scrollProgress < 0.77) return 2; // Partners (49-77%)
    if (scrollProgress < 0.79) return 2.5; // Transition from partners to final quote
    return 3; // Final Quote (79-100%)
  };

  const currentSection = getCurrentSection();

  // Smoother section progress calculations with easing
  const quoteProgress = scrollProgress < 0.24 ? Math.min(1, scrollProgress / 0.22) : 1;
  const titleGridProgress = (scrollProgress >= 0.22 && scrollProgress < 0.49) ? 
    Math.min(1, Math.max(0, (scrollProgress - 0.24) / 0.23)) : 0;
  const partnersProgress = (scrollProgress >= 0.47 && scrollProgress < 0.79) ? 
    Math.min(1, Math.max(0, (scrollProgress - 0.49) / 0.28)) : 0;
  const finalQuoteProgress = scrollProgress >= 0.77 ? 
    Math.min(1, Math.max(0, (scrollProgress - 0.79) / 0.21)) : 0;
  
  // Smooth title and grid progression
  const titleProgress = Math.min(1, titleGridProgress * 1.5);
  const gridProgress = titleGridProgress > 0.2 ? Math.min(1, (titleGridProgress - 0.2) * 2) : 0;
  
  // Color transition (keep this smooth)
  const colorTransitionProgress = scrollProgress > 0.8 ? Math.min(1, (scrollProgress - 0.8) * 5) : 0;

  // Brand stagger animation with smoother timing
  const brandProgressForIndex = (index: number) => {
    if (gridProgress <= 0) return 0;
    const stagger = 0.05;
    const start = index * stagger;
    const adjustedProgress = Math.max(0, gridProgress - start);
    return Math.min(1, adjustedProgress * 3);
  };

  // Marquee speed based on scroll
  const marqueeDuration = partnersProgress > 0 ? Math.max(10, 20 - partnersProgress * 10) : 20;

  // Color mode
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
          transform: translateY(-3px) scale(1.02);
        }
        
        .color-sweep {
          position: absolute;
          top: 0;
          left: ${-100 + sweepProgress * 200}%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%);
          z-index: 1;
          pointer-events: none;
          opacity: ${colorTransitionProgress > 0 ? Math.min(1, colorTransitionProgress * 2) : 0};
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
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (min-width: 768px) {
          .section {
            padding: 2rem;
          }
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: currentColor;
          margin-left: 3px;
          opacity: ${showCursor ? 1 : 0};
          animation: ${showCursor ? 'blink 1.2s infinite' : 'none'};
        }

        @keyframes blink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }

        .smooth-transform {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out;
        }
      `}</style>

      {/* Color sweep effect */}
      {colorTransitionProgress > 0 && <div className="color-sweep" />}

      {/* Content container with strict section separation */}
      <div className="relative z-10 w-full h-full">
        
        {/* OPENING QUOTE SECTION */}
        <div 
          className="section"
          style={{
            opacity: currentSection <= 0.5 ? 1 : Math.max(0, 1 - ((currentSection - 0.5) * 4)),
            transform: `translateY(${currentSection <= 0.5 ? 0 : -(currentSection - 0.5) * 100}px)`,
            pointerEvents: currentSection <= 0.8 ? 'auto' : 'none',
            zIndex: currentSection <= 0.8 ? 10 : 1
          }}
        >
          <div
            className="text-center px-4 max-w-4xl mx-auto smooth-transform"
            style={{
              opacity: Math.min(1, quoteProgress * 1.2),
              transform: `translateY(${Math.max(0, (1 - quoteProgress) * 20)}px) scale(${0.96 + quoteProgress * 0.04})`
            }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-relaxed tracking-wide">
              {typedText}
              <span className="typing-cursor"></span>
            </h2>
          </div>
        </div>

        {/* EXCLUSIVE BRANDS TITLE + GRID SECTION */}
        <div 
          className="section smooth-transform"
          style={{
            opacity: currentSection >= 0.5 && currentSection <= 1.5 ? 1 : 
              (currentSection > 1.5 ? Math.max(0, 1 - ((currentSection - 1.5) * 4)) : 
              (currentSection < 0.5 ? 0 : Math.min(1, (currentSection - 0.5) * 4))),
            transform: `translateY(${
              currentSection < 0.5 ? 80 : 
              currentSection <= 1.5 ? 0 : 
              -(currentSection - 1.5) * 100
            }px)`,
            pointerEvents: currentSection >= 0.5 && currentSection <= 1.8 ? 'auto' : 'none',
            zIndex: currentSection >= 0.5 && currentSection <= 1.8 ? 10 : 1
          }}
        >
          {/* Title with word-by-word reveal */}
          <div className="mb-6 md:mb-12 lg:mb-16 text-center mt-8 md:mt-0">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider leading-tight">
              <div
                className="smooth-transform"
                style={{
                  opacity: titleProgress > 0.1 ? 1 : 0,
                  transform: `translateY(${titleProgress > 0.1 ? 0 : 20}px)`
                }}
              >
                OUR
              </div>
              <div
                className="smooth-transform"
                style={{
                  opacity: titleProgress > 0.3 ? 1 : 0,
                  transform: `translateY(${titleProgress > 0.3 ? 0 : 20}px)`
                }}
              >
                EXCLUSIVE
              </div>
              <div
                className="smooth-transform"
                style={{
                  opacity: titleProgress > 0.5 ? 1 : 0,
                  transform: `translateY(${titleProgress > 0.5 ? 0 : 20}px)`
                }}
              >
                BRANDS
              </div>
            </h2>
          </div>

          {/* BRANDS GRID with smoother animations */}
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
                    opacity: Math.min(1, brandProg * 1.2),
                    transform: `translateY(${Math.max(0, (1 - brandProg) * 25)}px) scale(${0.94 + brandProg * 0.06})`
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
          className="section smooth-transform"
          style={{
            opacity: currentSection >= 1.5 && currentSection <= 2.5 ? 1 : 
              (currentSection > 2.5 ? Math.max(0, 1 - ((currentSection - 2.5) * 4)) : 
              (currentSection < 1.5 ? 0 : Math.min(1, (currentSection - 1.5) * 4))),
            transform: `translateY(${
              currentSection < 1.5 ? 80 : 
              currentSection <= 2.5 ? 0 : 
              -(currentSection - 2.5) * 100
            }px)`,
            pointerEvents: currentSection >= 1.5 && currentSection <= 2.8 ? 'auto' : 'none',
            zIndex: currentSection >= 1.5 && currentSection <= 2.8 ? 10 : 1
          }}
        >
          <div
            className="mb-8 md:mb-12 lg:mb-16 text-center smooth-transform"
            style={{
              opacity: Math.min(1, partnersProgress * 1.5),
              transform: `translateY(${Math.max(0, (1 - partnersProgress) * 25)}px)`
            }}
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider">
              OUR PARTNERS
            </h2>
          </div>
          
          {partnersProgress > 0 && (
            <div
              className="w-full max-w-full marquee smooth-transform"
              style={{ 
                opacity: Math.min(1, partnersProgress * 1.2),
                transform: `scale(${0.95 + partnersProgress * 0.05})`
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

        {/* FINAL QUOTE SECTION */}
        <div 
          className="section smooth-transform"
          style={{
            opacity: currentSection >= 2.5 ? Math.min(1, (currentSection - 2.5) * 2) : 0,
            transform: `translateY(${
              currentSection < 2.5 ? 80 : 
              Math.max(0, (1 - (currentSection - 2.5) * 1.5) * 40)
            }px)`,
            pointerEvents: currentSection >= 2.5 ? 'auto' : 'none',
            zIndex: currentSection >= 2.5 ? 10 : 1
          }}
        >
          <div
            className="px-4 smooth-transform"
            style={{
              opacity: Math.min(1, finalQuoteProgress * 1.5),
              transform: `translateY(${Math.max(0, (1 - finalQuoteProgress) * 30)}px) scale(${0.95 + finalQuoteProgress * 0.05})`,
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