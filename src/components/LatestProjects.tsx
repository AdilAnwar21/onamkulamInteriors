import React, { useState, useEffect, memo } from 'react';
import logoSvg from '../assets/images/LOGO 03.png';

// --- Static Data ---
const projects = [
  {
    id: 1,
    name: "The Maple Residence",
    role: "Luxury Villa",
    image: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Oakwood Estate",
    role: "Modern Apartment",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Riverside Retreat",
    role: "Holiday Home",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Skyline Towers",
    role: "Penthouse",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=600&h=400&fit=crop",
    quote: "Spaces that redefine modern living with elegance.",
  },
  {
    id: 5,
    name: "Palm Grove Villa",
    role: "Private Residence",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
  },
];

const stats = {
  people: "50+",
  description: "New Projects"
};

// --- Reusable Card Component (Optimized) ---
const ProjectCard = memo(({ project, heightClass, extraContent, delay, isVisible }: any) => {
  return (
    <div 
      className={`relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group w-full ${heightClass} transition-all duration-700 ${delay} ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{ willChange: 'transform, opacity' }}
    >
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        project.quote ? 'bg-gradient-to-r from-black/70 via-black/30 to-transparent' : 'bg-gradient-to-t from-black/60 via-transparent to-transparent'
      }`} />

      {extraContent ? (
        extraContent(project)
      ) : (
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white pointer-events-none">
          <p className="font-semibold text-xs sm:text-sm line-clamp-1">{project.name}</p>
          <p className="text-[10px] sm:text-xs opacity-90">{project.role}</p>
        </div>
      )}
    </div>
  );
});

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
        setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    // --- CONTAINER UPDATE: Matches Achievements Scrolling Logic ---
    // h-screen + overflow-y-auto: Enables vertical scroll inside this section on mobile
    // lg:overflow-y-hidden: Locks scroll on desktop where content fits
    <div className="relative h-screen w-full bg-gray-50 overflow-y-auto lg:overflow-y-hidden">
      
      {/* Content Wrapper */}
      {/* pt-28: Pushes content down so Navbar doesn't cover it on mobile */}
      {/* lg:h-full lg:justify-center: Centers content vertically on desktop */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-0 lg:pb-0 lg:h-full lg:flex lg:flex-col lg:justify-center">

        {/* Header */}
        <div className={`mb-4 sm:mb-6 md:mb-8 transition-all duration-1000 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-left">
            Latest Projects:
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-6">

          {/* Left Side - Description */}
          <div className={`lg:col-span-4 flex flex-col justify-center transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="space-y-4 mb-6 lg:mb-0">
              <div className="flex items-center justify-start">
                <img
                  src={logoSvg}
                  alt="Logo"
                  className="h-8 sm:h-10 w-8 sm:w-10 object-contain"
                />
              </div>

              <div className="text-left">
                <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight text-gray-900 max-w-md">
                  We are a passionate team of designers dedicated to transforming your vision into beautifully crafted spaces.
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side - Project Grid */}
          <div className={`lg:col-span-8 transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3">

              {/* --- TOP ROW --- */}
              <div className="col-span-1 md:col-span-2">
                <ProjectCard 
                  project={projects[0]} 
                  heightClass="h-32 sm:h-48 md:h-52" 
                  delay="delay-[400ms]"
                  isVisible={isVisible}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <ProjectCard 
                  project={projects[1]} 
                  heightClass="h-32 sm:h-48 md:h-52" 
                  delay="delay-[500ms]"
                  isVisible={isVisible}
                />
              </div>

              <div className="col-span-2 md:col-span-2">
                <ProjectCard 
                  project={projects[2]} 
                  heightClass="h-32 sm:h-48 md:h-52" 
                  delay="delay-[600ms]"
                  isVisible={isVisible}
                />
              </div>

              {/* --- BOTTOM ROW --- */}
              <div className="col-span-2 md:col-span-4">
                <ProjectCard 
                   project={projects[3]}
                   heightClass="h-32 sm:h-36 md:h-40"
                   delay="delay-[700ms]"
                   isVisible={isVisible}
                   extraContent={(p: any) => (
                     <>
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 text-white pointer-events-none">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mb-1">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            </div>
                            <p className="font-semibold text-xs sm:text-sm">{p.name}</p>
                            <p className="text-[10px] sm:text-xs opacity-90">{p.role}</p>
                        </div>

                        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-white max-w-[140px] text-right pointer-events-none hidden sm:block">
                            <p className="text-xs sm:text-sm font-light leading-tight">{p.quote}</p>
                        </div>
                     </>
                   )}
                />
              </div>

              {/* Mobile: Side-by-side grid. Desktop: Stacked column */}
              <div className={`col-span-2 md:col-span-2 grid grid-cols-2 md:flex md:flex-col gap-2 sm:gap-3 transition-all duration-700 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                
                <div className="h-full">
                  <ProjectCard 
                    project={projects[4]} 
                    heightClass="h-24 sm:h-24 md:h-26" 
                    delay="delay-0"
                    isVisible={true}
                  />
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl h-24 sm:h-24 md:h-26 flex flex-col justify-center items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="text-lg sm:text-xl font-bold text-gray-900">
                    {stats.people}
                  </div>
                  <div className="text-xs text-gray-500 px-2">
                    {stats.description}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;