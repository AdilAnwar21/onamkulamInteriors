import { useState, useEffect } from 'react';

const ServicesShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);

  const services = [
    {
      id: '01',
      title: 'Consultation & Vision',
      description: 'Your story begins with us listening. Our experts visit your space to understand your dreams, your needs, and the life you envision living there.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=800&fit=crop'
    },
    {
      id: '02',
      title: '3D Visualisation',
      description: 'This is where your vision takes shape. We create detailed 3D renders, allowing you to walk through your future home and make sure every detail is a part of your story.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop'
    },
    {
      id: '03',
      title: 'Detailed Drawings & Approval',
      description: 'We turn your dream into a solid plan. Once you love every detail, we finalize the drawings and sign the contract, officially beginning the creation of your story.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=800&fit=crop'
    },
    {
      id: '04',
      title: 'Production & Quality Check',
      description: 'Behind the scenes, our skilled artisans begin to craft the elements of your home. Each piece is meticulously made in-house and passes a rigorous quality check, ensuring every detail is perfect for your story.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop'
    },
    {
      id: '05',
      title: 'Installation & Unboxing',
      description: "The moment your story becomes a reality. Our professional team installs every piece with precision, transforming your space into the home you've always imagined.",
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop'
    },
    {
      id: '06',
      title: 'Handover & Walk-through',
      description: 'This is your moment. We do a final walk-through with you to ensure every detail is just right before handing over the keys to your new home and all the warranty details.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=800&fit=crop'
    },
    {
      id: '07',
      title: 'Post-Handover Support',
      description: 'Breathe new life into existing spaces with our comprehensive renovation services. We specialize in updating and modernizing homes and commercial spaces while preserving their unique character and maximizing their potential.',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=800&fit=crop'
    }
  ];

  // Auto-cycle through services every 3 seconds on desktop
  useEffect(() => {
    if (!isUserInteracting && window.innerWidth >= 1024) {
      const interval = setInterval(() => {
        setHoveredIndex((prev) => (prev + 1) % services.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isUserInteracting, services.length]);

  const handleMouseEnter = (index: number) => {
    setIsUserInteracting(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsUserInteracting(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-0">
      <div className="max-w-none w-full h-screen">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 h-full">
          {/* Left Side - Service List & Description */}
          <div 
            className="bg-stone-50 flex flex-col justify-center px-8 xl:px-16 py-16 col-span-2"
            onMouseLeave={handleMouseLeave}
          >
            <div className="space-y-3 xl:space-y-4 mb-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-4 xl:gap-6 py-2 xl:py-3 cursor-pointer transition-all duration-300 ${
                    hoveredIndex === index 
                      ? 'text-gray-800' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  <div className="text-sm font-light min-w-[2rem]">
                    {service.id}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg xl:text-xl font-light">
                      {service.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Description Paragraph */}
            <div className="max-w-md xl:max-w-lg">
              <p className="text-gray-600 text-sm xl:text-base leading-relaxed font-light">
                {services[hoveredIndex].description}
              </p>
            </div>
          </div>

          {/* Right Side - Scroll Up Image Display */}
          <div className="relative overflow-hidden bg-gray-100 col-span-3 p-8 xl:p-12">
            <div className="relative h-full w-full overflow-hidden">
              <div 
                className="h-full w-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateY(-${hoveredIndex * 100}%)` }}
              >
                {services.map((service) => (
                  <div key={service.id} className="h-full w-full flex-shrink-0 relative">
                    <img 
                      src={service.image}
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/5"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden h-full flex flex-col">
          {/* Service Navigation */}
          <div className="bg-stone-50 flex-1 px-4 sm:px-6 md:px-8 py-8 overflow-y-auto">
            <div className="space-y-3 sm:space-y-4 mb-6">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-3 sm:gap-4 py-2 sm:py-3 cursor-pointer transition-all duration-300 ${
                    hoveredIndex === index 
                      ? 'text-gray-800' 
                      : 'text-gray-400'
                  }`}
                  onClick={() => setHoveredIndex(index)}
                >
                  <div className="text-xs sm:text-sm font-light min-w-[1.5rem] sm:min-w-[2rem]">
                    {service.id}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-light">
                      {service.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Description for Mobile */}
            <div className="max-w-none">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                {services[hoveredIndex].description}
              </p>
            </div>
          </div>

          {/* Image Display for Mobile */}
          <div className="relative h-48 sm:h-64 md:h-80 bg-gray-100 p-4">
            <div className="relative h-full w-full">
              <img 
                src={services[hoveredIndex].image}
                alt={services[hoveredIndex].title} 
                className="w-full h-full object-cover transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesShowcase;