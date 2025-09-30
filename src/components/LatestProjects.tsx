import { useState, useEffect, useRef } from 'react';
import logoSvg from '../assets/images/LOGO 03.png'
const TeamSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // const logoSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23d4a574'/%3E%3Cpath d='M30 50 L50 35 L70 50 L50 65 Z' fill='white'/%3E%3C/svg%3E";
  
  const projects = [
    {
      id: 1,
      name: "Valeria Novikova",
      role: "Designer",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9c7d304?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Alex Podzemsky",
      role: "Designer", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Helen Reeves",
      role: "Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Mark Jackson",
      role: "Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face",
      isLarge: true,
      quote: "We are here to create space that will inspire you."
    },
    {
      id: 5,
      name: "Tanya Rodriguez",
      role: "HR",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face"
    }
  ];
  
  const stats = {
    people: "50+",
    description: "People in business"
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="h-screen w-full bg-gray-50 overflow-hidden flex items-center justify-center" ref={sectionRef}>
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Header */}
        <div className={`mb-3 sm:mb-6 md:mb-8 transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-left">
            Latest Projects:
          </h1>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Left Side - Description */}
          <div className={`lg:col-span-4 flex flex-col justify-center transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="space-y-3 sm:space-y-4">
              {/* Logo */}
              <div className="flex items-center justify-center lg:justify-start">
                <img
                  src={logoSvg}
                  alt="Logo"
                  className="h-7 sm:h-10 w-7 sm:w-10 object-contain"
                />
              </div>
              
              {/* Description */}
              <div className="text-center lg:text-left">
                <h2 className="text-sm sm:text-lg md:text-xl font-bold leading-tight text-gray-900 max-w-md mx-auto lg:mx-0">
                  We are a passionate team of designers dedicated to transforming your vision into beautifully crafted spaces.
                </h2>
              </div>
            </div>
          </div>
          
          {/* Right Side - Team Grid */}
          <div className={`lg:col-span-8 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3">
              
              {/* Top Row - 3 team member cards */}
              <div className={`col-span-1 md:col-span-2 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div
                  className="relative rounded-lg sm:rounded-xl overflow-hidden h-32 sm:h-48 md:h-52 cursor-pointer transition-all duration-300 group"
                  onMouseEnter={() => setHoveredProject(projects[0].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[0].image}
                    alt={projects[0].name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white">
                    <p className="font-semibold text-xs sm:text-sm">{projects[0].name}</p>
                    <p className="text-xs opacity-90">{projects[0].role}</p>
                  </div>
                </div>
              </div>
              
              <div className={`col-span-1 md:col-span-2 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div
                  className="relative rounded-lg sm:rounded-xl overflow-hidden h-32 sm:h-48 md:h-52 cursor-pointer transition-all duration-300 group"
                  onMouseEnter={() => setHoveredProject(projects[1].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[1].image}
                    alt={projects[1].name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white">
                    <p className="font-semibold text-xs sm:text-sm">{projects[1].name}</p>
                    <p className="text-xs opacity-90">{projects[1].role}</p>
                  </div>
                </div>
              </div>
              
              <div className={`col-span-2 md:col-span-2 transition-all duration-700 delay-800 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div
                  className="relative rounded-lg sm:rounded-xl overflow-hidden h-32 sm:h-48 md:h-52 cursor-pointer transition-all duration-300 group"
                  onMouseEnter={() => setHoveredProject(projects[2].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[2].image}
                    alt={projects[2].name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white">
                    <p className="font-semibold text-xs sm:text-sm">{projects[2].name}</p>
                    <p className="text-xs opacity-90">{projects[2].role}</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom Row */}
              <div className={`col-span-2 md:col-span-4 transition-all duration-700 delay-900 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div
                  className="relative rounded-lg sm:rounded-xl overflow-hidden h-24 sm:h-36 md:h-40 cursor-pointer transition-all duration-300 group"
                  onMouseEnter={() => setHoveredProject(projects[3].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[3].image}
                    alt={projects[3].name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                  
                  {/* Top left info */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 text-white">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mb-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <p className="font-semibold text-xs sm:text-sm">{projects[3].name}</p>
                    <p className="text-xs opacity-90">{projects[3].role}</p>
                  </div>
                  
                  {/* Bottom right quote */}
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-white max-w-[100px] sm:max-w-[140px] text-right">
                    <p className="text-xs sm:text-sm font-light leading-tight">{projects[3].quote}</p>
                  </div>
                </div>
              </div>
              
              <div className={`col-span-2 md:col-span-2 flex flex-col gap-2 sm:gap-3 transition-all duration-700 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                {/* Tanya */}
                <div
                  className="relative rounded-lg sm:rounded-xl overflow-hidden h-16 sm:h-24 md:h-26 cursor-pointer transition-all duration-300 group"
                  onMouseEnter={() => setHoveredProject(projects[4].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[4].image}
                    alt={projects[4].name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 text-white">
                    <p className="font-semibold text-xs">{projects[4].name}</p>
                    <p className="text-xs opacity-90">{projects[4].role}</p>
                  </div>
                </div>
                
                {/* Stats Card */}
                <div className="bg-white rounded-lg sm:rounded-xl h-16 sm:h-24 md:h-26 flex flex-col justify-center items-center text-center shadow-sm border border-gray-100">
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