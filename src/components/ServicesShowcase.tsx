import { useState } from 'react';

const ServicesShowcase = ({ }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const services = [
    {
      id: '01',
      title: 'Interior Design',
      description: 'We create harmonious living spaces that reflect your personality while maximizing functionality and aesthetic appeal. Our team transforms ordinary rooms into extraordinary environments through thoughtful design, careful material selection, and attention to every detail.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=800&fit=crop'
    },
    {
      id: '02',
      title: 'Architecture',
      description: 'From residential homes to commercial buildings, we design structures that stand the test of time. Our architectural approach combines innovative design with practical functionality, creating spaces that inspire and serve their purpose for generations to come.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop'
    },
    {
      id: '03',
      title: 'Project Management',
      description: 'We ensure seamless project execution from conception to completion. Our experienced team coordinates every aspect of your project, managing timelines, budgets, and quality control to deliver exceptional results that exceed your expectations.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop'
    },
    {
      id: '04',
      title: 'Furniture Design',
      description: 'Custom furniture pieces crafted to perfection for your unique space. We design and create bespoke furniture that not only complements your interior but also serves your specific functional needs with unmatched quality and attention to craftsmanship.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop'
    },
    
  ];

  // Calculate the vertical offset for the content based on hovered item
  const contentOffset = hoveredIndex * 100; // Height of each content section

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-0">
      <div className="max-w-none w-full">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 h-screen">
          {/* Left Side - Service List & Description */}
          <div className="bg-stone-50 flex flex-col justify-center px-8 xl:px-16 py-24 col-span-2">
            <div className="space-y-6 xl:space-y-8 mb-12">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-4 xl:gap-6 py-3 xl:py-4 cursor-pointer transition-all duration-300 ${
                    hoveredIndex === index 
                      ? 'text-gray-800' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <div className="text-sm font-light min-w-[2rem]">
                    {service.id}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl xl:text-2xl font-light">
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

          {/* Right Side - Single Image Display */}
          <div className="relative overflow-hidden bg-gray-100 col-span-3">
            <div 
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateY(-${contentOffset}vh)`,
                height: `${services.length * 100}vh`
              }}
            >
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  className="h-screen w-full relative overflow-hidden"
                >
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

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden min-h-screen">
          {/* Service Navigation */}
          <div className="bg-stone-50 px-4 sm:px-6 md:px-8 pt-16 pb-8">
            <div className="space-y-4 sm:space-y-6">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-3 sm:gap-4 py-3 cursor-pointer transition-all duration-300 ${
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
                    <h3 className="text-lg sm:text-xl md:text-2xl font-light">
                      {service.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Description for Mobile */}
            <div className="mt-8 max-w-none sm:max-w-md">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                {services[hoveredIndex].description}
              </p>
            </div>
          </div>

          {/* Image Display for Mobile */}
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100">
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
  );
};

export default ServicesShowcase;