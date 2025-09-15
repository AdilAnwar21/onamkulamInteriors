import { useState, useEffect } from 'react';

const ExclusiveBrandsComplete = ({ scrollProgress = 0 }) => {
  const [mounted, setMounted] = useState(false);
  type Brand = {
    name: string;
    position: string;
    description: string;
    founded: string;
    specialty: string;
  };
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Brand data for exclusive brands
  const exclusiveBrands = [
    { 
      name: 'MERIDIANI', 
      position: 'top-left',
      description: 'Italian luxury furniture brand known for sophisticated contemporary design and exceptional craftsmanship.',
      founded: '1996',
      specialty: 'Contemporary Furniture'
    },
    { 
      name: 'Frigerio', 
      position: 'top-right',
      description: 'Premium Italian furniture manufacturer specializing in upholstered seating and elegant living solutions.',
      founded: '1941',
      specialty: 'Upholstered Furniture'
    },
    { 
      name: 'FIAM', 
      position: 'bottom-left',
      description: 'Innovative glass furniture design company creating stunning curved and artistic glass pieces.',
      founded: '1973',
      specialty: 'Glass Furniture'
    },
    { 
      name: 'SANGIACOMO', 
      position: 'bottom-right',
      description: 'Modern Italian furniture brand offering contemporary storage solutions and bedroom furniture.',
      founded: '1968',
      specialty: 'Storage Solutions'
    },
  ];

  // Partners data for carousel
  const partners = [
    { name: 'GAGGENAU', logo: 'GAGGENAU' },
    { name: 'SUB-ZERO', logo: 'SUB•ZERO' },
    { name: 'smeg', logo: '•••smeg' },
    { name: 'LIEBHERR', logo: 'LIEBHERR' },
    { name: 'hansgrohe', logo: 'hansgrohe' },
    { name: 'MIELE', logo: 'MIELE' },
    { name: 'BOSCH', logo: 'BOSCH' },
    { name: 'SIEMENS', logo: 'SIEMENS' },
  ];

  // Calculate animation progress based on scroll
  const titleProgress = Math.min(1, Math.max(0, (scrollProgress - 0.1) * 2));
  // const brandsProgress = Math.min(1, Math.max(0, (scrollProgress - 0.3) * 1.5));
  const partnersProgress = Math.min(1, Math.max(0, (scrollProgress - 1.2) * 1.5));
  const quoteProgress = Math.min(1, Math.max(0, (scrollProgress - 1.8) * 2));
  
  // Individual brand animation timings
  const getBrandProgress = (index:any) => {
    const startPoint = 0.4 + (index * 0.15);
    return Math.min(1, Math.max(0, (scrollProgress - startPoint) * 2));
  };

  // Carousel animation
  const carouselOffset = (Date.now() / 50) % (partners.length * 300);

  if (!mounted) return null;

  return (
    <div className="bg-black text-white relative overflow-hidden">
      
      {/* EXCLUSIVE BRANDS SECTION */}
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: `translate(${scrollProgress * -20}px, ${scrollProgress * -30}px)`,
          }} />
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 relative z-10">
          
          {/* Title Section */}
          <div className="mb-16 text-center">
            <div 
              className="overflow-hidden"
              style={{
                transform: `translateY(${(1 - titleProgress) * 100}px)`,
                opacity: titleProgress,
              }}
            >
              <h2 className="text-6xl md:text-8xl font-light tracking-wider mb-4">
                OUR
              </h2>
            </div>
            <div 
              className="overflow-hidden"
              style={{
                transform: `translateY(${(1 - titleProgress) * 100}px)`,
                opacity: titleProgress,
                transitionDelay: '0.2s',
              }}
            >
              <h2 className="text-6xl md:text-8xl font-light tracking-wider mb-4">
                EXCLUSIVE
              </h2>
            </div>
            <div 
              className="overflow-hidden"
              style={{
                transform: `translateY(${(1 - titleProgress) * 100}px)`,
                opacity: titleProgress,
                transitionDelay: '0.4s',
              }}
            >
              <h2 className="text-6xl md:text-8xl font-light tracking-wider">
                BRANDS
              </h2>
            </div>
          </div>

          {/* Brands Grid */}
          <div className="w-full max-w-6xl h-96 relative">
            {exclusiveBrands.map((brand, index) => {
              const progress = getBrandProgress(index);
              const isFirstBrand = index === 0;
              
              // Position calculations
              let x = 0, y = 0, scale = 1, opacity = 1;
              
              if (isFirstBrand) {
                // First brand starts in center, then moves to position
                x = progress * (brand.position.includes('right') ? 300 : -300);
                y = progress * (brand.position.includes('bottom') ? 150 : -150);
                opacity = 1;
                scale = 1 + (1 - progress) * 0.2; // Slightly larger initially
              } else {
                // Other brands emerge from their final positions
                const emergeFactor = 1 - Math.pow(1 - progress, 3); // Easing
                scale = 0.5 + (emergeFactor * 0.5);
                opacity = emergeFactor;
                
                // Set final positions
                if (brand.position.includes('right')) x = 300;
                if (brand.position.includes('left')) x = -300;
                if (brand.position.includes('bottom')) y = 150;
                if (brand.position.includes('top')) y = -150;
              }

              return (
                <div
                  key={brand.name}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                    opacity: opacity,
                    transition: 'none',
                  }}
                >
                  <div 
                    className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 min-w-[280px] text-center hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedBrand(brand)}
                  >
                    <h3 className="text-2xl md:text-3xl font-light tracking-wider text-white">
                      {brand.name}
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-4 opacity-60" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtle animated elements */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-60">
            <div 
              className="w-full h-full bg-white rounded-full animate-pulse"
              style={{
                animationDelay: '0s',
                animationDuration: '3s',
              }}
            />
          </div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-40">
            <div 
              className="w-full h-full bg-white rounded-full animate-pulse"
              style={{
                animationDelay: '1.5s',
                animationDuration: '3s',
              }}
            />
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>

      {/* OUR PARTNERS SECTION */}
      <div className="min-h-screen flex flex-col justify-center items-center px-8 relative">
        {/* Partners Title */}
        <div 
          className="mb-16 text-center"
          style={{
            transform: `translateY(${(1 - partnersProgress) * 100}px)`,
            opacity: partnersProgress,
          }}
        >
          <h2 className="text-6xl md:text-8xl font-light tracking-wider mb-4">
            OUR
          </h2>
          <h2 className="text-6xl md:text-8xl font-light tracking-wider">
            PARTNERS
          </h2>
        </div>

        {/* Partners Carousel */}
        <div 
          className="w-full max-w-7xl overflow-hidden relative"
          style={{
            opacity: partnersProgress,
          }}
        >
          <div 
            className="flex gap-8 animate-scroll"
            style={{
              transform: `translateX(-${carouselOffset}px)`,
              width: `${partners.length * 320}px`,
            }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="min-w-[280px] h-48 bg-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl flex items-center justify-center hover:bg-gray-800/60 transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-2xl md:text-3xl font-light tracking-wider text-white text-center px-4">
                  {partner.logo}
                </h3>
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>

        {/* Navigation dots */}
        <div 
          className="flex justify-center mt-8 space-x-2"
          style={{ opacity: partnersProgress }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse" />
          </div>
        </div>
      </div>

      {/* QUOTE SECTION */}
      <div 
        className="min-h-screen flex flex-col justify-center items-center px-8 text-center relative"
        style={{
          transform: `translateY(${(1 - quoteProgress) * 100}px)`,
          opacity: quoteProgress,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-light leading-relaxed mb-8">
            With unlimited creativity, <span className="italic text-gray-300">we transform your vision into reality</span>, inviting you to <span className="font-medium">discover a universe of unique and memorable</span> <span className="italic text-gray-300">experiences</span>.
          </h3>
          
          <div className="mt-12 text-gray-400 text-lg md:text-xl font-light max-w-3xl mx-auto">
            <p>Every detail is designed to capture the essence of your style and</p>
            <p>turn the space into a reflection of your own identity.</p>
          </div>
        </div>
      </div>

      {/* Brand Details Popup */}
      {selectedBrand && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 z-50" onClick={() => setSelectedBrand(null)}>
          <div 
            className="bg-gray-900 rounded-3xl p-8 max-w-2xl w-full border border-gray-700/50 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-light tracking-wider">{selectedBrand.name}</h3>
              <button 
                onClick={() => setSelectedBrand(null)}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">{selectedBrand.description}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700/50">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Founded</p>
                  <p className="text-xl font-light">{selectedBrand.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Specialty</p>
                  <p className="text-xl font-light">{selectedBrand.specialty}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button 
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                onClick={() => setSelectedBrand(null)}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ExclusiveBrandsComplete;