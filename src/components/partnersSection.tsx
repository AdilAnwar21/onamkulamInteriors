import React, { useEffect, useState, memo } from 'react';

type Brand = {
  name: string;
  position?: string;
  description?: string;
  founded?: string;
  specialty?: string;
};

// Define styles outside to prevent re-parsing
const marqueeStyle = `
  @keyframes marquee {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }
  .marquee-inner {
    display: flex;
    width: calc(200%);
    will-change: transform;
  }
`;

const ExclusiveBrandsComplete: React.FC<{ scrollProgress?: number }> = memo(({ scrollProgress = 0 }) => {
  const [mounted, setMounted] = useState(false);
  const fullQuote = "From your vision to our hands: The simple journey to soul.";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Optimized letter style calculation
  const getLetterStyle = (index: number): React.CSSProperties => {
    const scrollTypingProgress = Math.min(1, Math.max(0, scrollProgress / 0.23));
    const t = scrollTypingProgress;
    const easedProgress = t * t * (3 - 2 * t); 
    
    const letterProgress = Math.max(0, Math.min(1, (easedProgress * fullQuote.length - index) * 0.5));
    
    return {
      opacity: letterProgress,
      transform: `translate3d(0, ${Math.max(0, (1 - letterProgress) * 15)}px, 0)`,
      transition: 'opacity 0.2s ease-out, transform 0.3s ease-out',
      display: 'inline-block',
      willChange: 'opacity, transform',
    };
  };

  const exclusiveBrands: Brand[] = [
    { name: 'MERIDIANI', position: 'top-left' },
    { name: 'Frigerio', position: 'top-right' },
    { name: 'FIAM', position: 'bottom-left' },
    { name: 'SANGIACOMO', position: 'bottom-right' },
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

  // --- Section Logic ---
  let currentSection = 3;
  if (scrollProgress < 0.22) currentSection = 0;
  else if (scrollProgress < 0.24) currentSection = 0.5;
  else if (scrollProgress < 0.47) currentSection = 1;
  else if (scrollProgress < 0.49) currentSection = 1.5;
  else if (scrollProgress < 0.77) currentSection = 2;
  else if (scrollProgress < 0.79) currentSection = 2.5;

  const quoteProgress = scrollProgress < 0.24 ? Math.min(1, scrollProgress / 0.22) : 1;
  
  const titleGridProgress = (scrollProgress >= 0.22 && scrollProgress < 0.49) ? 
    Math.min(1, Math.max(0, (scrollProgress - 0.24) / 0.23)) : 0;
    
  const partnersProgress = (scrollProgress >= 0.47 && scrollProgress < 0.79) ? 
    Math.min(1, Math.max(0, (scrollProgress - 0.49) / 0.28)) : 0;
    
  const finalQuoteProgress = scrollProgress >= 0.77 ? 
    Math.min(1, Math.max(0, (scrollProgress - 0.79) / 0.21)) : 0;
  
  const titleProgress = Math.min(1, titleGridProgress * 1.5);
  const gridProgress = titleGridProgress > 0.2 ? Math.min(1, (titleGridProgress - 0.2) * 2) : 0;
  const colorTransitionProgress = scrollProgress > 0.8 ? Math.min(1, (scrollProgress - 0.8) * 5) : 0;

  const marqueeDuration = partnersProgress > 0 ? Math.max(10, 20 - partnersProgress * 10) : 20;
  const isWhiteMode = colorTransitionProgress > 0.5;
  const sweepTransform = `translate3d(${-100 + colorTransitionProgress * 200}%, 0, 0)`;

  // --- Helper to render text word-by-word ---
  // This prevents words from splitting in the middle (the "hand s" bug)
  const renderAnimatedText = (text: string) => {
    const words = text.split(' ');
    let globalCharIndex = 0;

    return words.map((word, wordIndex) => {
      // Render the word wrapper
      const wordEl = (
        <span 
          key={wordIndex} 
          // whitespace-nowrap ensures the word stays together
          className="inline-block whitespace-nowrap" 
          style={{ marginRight: '0.25em' }} // Add space between words
        >
          {word.split('').map((char, charIndex) => {
            const style = getLetterStyle(globalCharIndex);
            globalCharIndex++; // Increment counter for continuous wave animation
            return (
              <span key={charIndex} style={style}>
                {char}
              </span>
            );
          })}
        </span>
      );
      
      // Account for the space character in the index count so timing stays correct
      globalCharIndex++; 
      return wordEl;
    });
  };

  if (!mounted) return null;

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden ${
        isWhiteMode ? 'bg-white text-black' : 'bg-black text-white'
      }`}
      style={{ transition: 'background-color 0.6s ease, color 0.6s ease' }}
    >
      <style>{marqueeStyle}</style>

      {/* Color Sweep */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
          opacity: colorTransitionProgress > 0 ? Math.min(1, colorTransitionProgress * 2) : 0,
          transform: sweepTransform,
          willChange: 'transform'
        }}
      />

      <div className="relative z-10 w-full h-full">
        
        {/* --- SECTION 1: OPENING QUOTE (FIXED) --- */}
        <div 
          className="absolute inset-0 flex flex-col justify-center items-center px-6 pt-20 sm:pt-0"
          style={{
            opacity: currentSection <= 0.5 ? 1 : Math.max(0, 1 - ((currentSection - 0.5) * 4)),
            transform: `translate3d(0, ${currentSection <= 0.5 ? 0 : -(currentSection - 0.5) * 100}px, 0)`,
            pointerEvents: currentSection <= 0.8 ? 'auto' : 'none',
            zIndex: currentSection <= 0.8 ? 10 : 1,
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out'
          }}
        >
          <div
            className="text-center max-w-4xl mx-auto"
            style={{
              opacity: Math.min(1, quoteProgress * 1.2),
              transform: `translate3d(0, ${Math.max(0, (1 - quoteProgress) * 20)}px, 0) scale(${0.96 + quoteProgress * 0.04})`
            }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-relaxed tracking-wide">
              {/* Calls the new helper to keep words together */}
              {renderAnimatedText(fullQuote)}
            </h2>
          </div>
        </div>

        {/* --- SECTION 2: BRANDS GRID --- */}
        <div 
          className="absolute inset-0 flex flex-col justify-center items-center px-4 pt-20 sm:pt-0"
          style={{
            opacity: currentSection >= 0.5 && currentSection <= 1.5 ? 1 : 
              (currentSection > 1.5 ? Math.max(0, 1 - ((currentSection - 1.5) * 4)) : 
              (currentSection < 0.5 ? 0 : Math.min(1, (currentSection - 0.5) * 4))),
            transform: `translate3d(0, ${currentSection < 0.5 ? 80 : currentSection <= 1.5 ? 0 : -(currentSection - 1.5) * 100}px, 0)`,
            pointerEvents: currentSection >= 0.5 && currentSection <= 1.8 ? 'auto' : 'none',
            zIndex: currentSection >= 0.5 && currentSection <= 1.8 ? 10 : 1,
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out'
          }}
        >
          <div className="mb-6 md:mb-12 lg:mb-16 text-center w-full">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider leading-tight flex flex-col items-center">
              {['OUR', 'EXCLUSIVE', 'BRANDS'].map((text, idx) => {
                const threshold = 0.1 + (idx * 0.2);
                const show = titleProgress > threshold;
                return (
                  <div
                    key={text}
                    style={{
                      opacity: show ? 1 : 0,
                      transform: `translate3d(0, ${show ? 0 : 20}px, 0)`,
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out'
                    }}
                  >
                    {text}
                  </div>
                );
              })}
            </h2>
          </div>

          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 lg:gap-8">
            {exclusiveBrands.map((brand, i) => {
              const stagger = 0.05;
              const start = i * stagger;
              const adjustedProgress = Math.max(0, gridProgress - start);
              const brandProg = Math.min(1, adjustedProgress * 3);
              
              return (
                <div
                  key={brand.name}
                  className={`border rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 text-center min-h-[120px] sm:min-h-[160px] md:min-h-[180px] flex flex-col justify-center transition-colors duration-200 ${
                    isWhiteMode 
                      ? 'bg-gray-50 border-gray-300' 
                      : 'bg-gray-900/50 border-gray-800/50'
                  }`}
                  style={{
                    opacity: Math.min(1, brandProg * 1.2),
                    transform: `translate3d(0, ${Math.max(0, (1 - brandProg) * 25)}px, 0) scale(${0.94 + brandProg * 0.06})`,
                    willChange: 'transform, opacity'
                  }}
                >
                  <h3 className="text-base sm:text-lg md:text-2xl font-light tracking-wide">
                    {brand.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- SECTION 3: PARTNERS --- */}
        <div 
          className="absolute inset-0 flex flex-col justify-center items-center pt-20 sm:pt-0"
          style={{
            opacity: currentSection >= 1.5 && currentSection <= 2.5 ? 1 : 
              (currentSection > 2.5 ? Math.max(0, 1 - ((currentSection - 2.5) * 4)) : 
              (currentSection < 1.5 ? 0 : Math.min(1, (currentSection - 1.5) * 4))),
            transform: `translate3d(0, ${currentSection < 1.5 ? 80 : currentSection <= 2.5 ? 0 : -(currentSection - 2.5) * 100}px, 0)`,
            pointerEvents: currentSection >= 1.5 && currentSection <= 2.8 ? 'auto' : 'none',
            zIndex: currentSection >= 1.5 && currentSection <= 2.8 ? 10 : 1,
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out'
          }}
        >
          <div
            className="mb-8 md:mb-12 lg:mb-16 text-center px-4"
            style={{
              opacity: Math.min(1, partnersProgress * 1.5),
              transform: `translate3d(0, ${Math.max(0, (1 - partnersProgress) * 25)}px, 0)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out'
            }}
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider">
              OUR PARTNERS
            </h2>
          </div>
          
          {partnersProgress > 0 && (
            <div
              className="w-full overflow-hidden"
              style={{ 
                opacity: Math.min(1, partnersProgress * 1.2),
                transform: `scale(${0.95 + partnersProgress * 0.05}) translate3d(0,0,0)`,
                transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out'
              }}
            >
              <div 
                className="marquee-inner"
                style={{ 
                    gap: window.innerWidth < 768 ? '1rem' : '2rem',
                    animation: `marquee ${marqueeDuration}s linear infinite`
                }}
              >
                {[...partners, ...partners].map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className={`min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[280px] h-24 sm:h-28 md:h-32 lg:h-40 border rounded-lg flex flex-col items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                      isWhiteMode 
                        ? 'bg-transparent border-black/60' 
                        : 'bg-transparent border-white/60'
                    }`}
                  >
                    {p.name === 'BANG & OLUFSEN' ? (
                      <div className="text-center">
                        <h3 className="text-base sm:text-lg md:text-xl font-light tracking-wide">B&O</h3>
                        <p className={`text-xs sm:text-sm mt-1 tracking-wider ${isWhiteMode ? 'text-gray-600' : 'text-gray-400'}`}>
                          BANG & OLUFSEN
                        </p>
                      </div>
                    ) : p.name === 'WOLF' ? (
                      <div className={`border px-3 py-1.5 ${isWhiteMode ? 'border-black' : 'border-white'}`}>
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

        {/* --- SECTION 4: FINAL QUOTE --- */}
        <div 
          className="absolute inset-0 flex flex-col justify-center items-center px-6 pt-20 sm:pt-0"
          style={{
            opacity: currentSection >= 2.5 ? Math.min(1, (currentSection - 2.5) * 2) : 0,
            transform: `translate3d(0, ${currentSection < 2.5 ? 80 : Math.max(0, (1 - (currentSection - 2.5) * 1.5) * 40)}px, 0)`,
            pointerEvents: currentSection >= 2.5 ? 'auto' : 'none',
            zIndex: currentSection >= 2.5 ? 10 : 1,
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out'
          }}
        >
          <div
            className="text-center max-w-4xl mx-auto"
            style={{
              opacity: Math.min(1, finalQuoteProgress * 1.5),
              transform: `translate3d(0, ${Math.max(0, (1 - finalQuoteProgress) * 30)}px, 0) scale(${0.95 + finalQuoteProgress * 0.05})`
            }}
          >
            <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light leading-relaxed">
              With unlimited creativity,{' '}
              <span className="italic">we transform your vision</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ExclusiveBrandsComplete;