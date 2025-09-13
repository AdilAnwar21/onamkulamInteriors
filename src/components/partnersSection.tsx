import { useState, useEffect } from 'react';

const ExclusiveBrands = ({ scrollProgress = 0 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Brand data
  const brands = [
    { name: 'MERIDIANI', position: 'top-left' },
    { name: 'Frigerio', position: 'top-right' },
    { name: 'CASSINA', position: 'bottom-left' },
    { name: 'B&B ITALIA', position: 'bottom-right' },
  ];

  // Calculate animation progress based on scroll
  const titleProgress = Math.min(1, Math.max(0, (scrollProgress - 0.1) * 2));
  const brandsProgress = Math.min(1, Math.max(0, (scrollProgress - 0.3) * 1.5));
  
  // Individual brand animation timings
  const getBrandProgress = (index:any) => {
    const startPoint = 0.4 + (index * 0.15);
    return Math.min(1, Math.max(0, (scrollProgress - startPoint) * 2));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
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
          {brands.map((brand, index) => {
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
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 min-w-[280px] text-center hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
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
  );
};

export default ExclusiveBrands;