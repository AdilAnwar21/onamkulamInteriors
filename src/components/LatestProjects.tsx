import { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/LOGO 03.png'

const TeamSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  console.log(hoveredProject,'hoveredProject')
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
    <div className="h-screen w-full bg-gray-50 overflow-hidden" ref={sectionRef}>
      <div className="h-full pt-20 pb-4 px-4 sm:pt-24 sm:pb-6 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto flex flex-col">
        
        {/* Navigation breadcrumb */}
        <div className={`mb-4 flex-shrink-0 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center text-sm text-gray-500">
            <span></span>
            <span className="ml-2"></span>
          </div>
        </div>
        
        {/* Header */}
        <div className={`mb-3 sm:mb-4 lg:mb-6 flex-shrink-0 transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-left">
            Latest Projects:
          </h1>
        </div>
        
        {/* Main Content Grid - Takes remaining space */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Side - Description */}
          <div className={`lg:col-span-4 flex flex-col justify-center transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="space-y-4 lg:space-y-6">
              {/* Logo */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 sm:h-10 object-contain"
                  />
                </div>
              </div>
              
              {/* Description */}
              <div className="text-center lg:text-left">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight text-gray-900 max-w-md mx-auto lg:mx-0">
                  We are a passionate team of designers dedicated to transforming your vision into beautifully crafted spaces.
                </h2>
              </div>
            </div>
          </div>
          
          {/* Right Side - Team Grid */}
          <div className={`lg:col-span-8 min-h-0 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 lg:gap-3 h-full">
              
              {/* Top Row - 3 team member cards */}
              <div className={`col-span-1 md:col-span-2 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div
                  className="relative rounded-xl lg:rounded-2xl overflow-hidden h-full min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] cursor-pointer transition-all duration-300 group"
                  onMouseEnter={() => setHoveredProject(projects[0].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[0].image}
                    alt={projects[0].name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                    <p className="font-semibold text-xs sm:text-sm lg:text-base">{projects[0].name}</p>
                    <p className="text-xs sm:text-sm opacity-90">{projects[0].role}</p>
                  </div>
                </div>
              </div>
              
              <div className={`col-span-1 md:col-span-2 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div
                  className="relative rounded-xl lg:rounded-2xl overflow-hidden h-full min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] cursor-pointer transition-all duration-300 group"
                  onMouseEnter={() => setHoveredProject(projects[1].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[1].image}
                    alt={projects[1].name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                    <p className="font-semibold text-xs sm:text-sm lg:text-base">{projects[1].name}</p>
                    <p className="text-xs sm:text-sm opacity-90">{projects[1].role}</p>
                  </div>
                </div>
              </div>
              
              <div className={`col-span-2 md:col-span-2 transition-all duration-700 delay-800 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div
                  className="relative rounded-xl lg:rounded-2xl overflow-hidden h-full min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] cursor-pointer transition-all duration-300 group"
                  onMouseEnter={() => setHoveredProject(projects[2].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[2].image}
                    alt={projects[2].name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                    <p className="font-semibold text-xs sm:text-sm lg:text-base">{projects[2].name}</p>
                    <p className="text-xs sm:text-sm opacity-90">{projects[2].role}</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom Row */}
              <div className={`col-span-2 md:col-span-4 transition-all duration-700 delay-900 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div
                  className="relative rounded-xl lg:rounded-2xl overflow-hidden h-full min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] cursor-pointer transition-all duration-300 group"
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
                  <div className="absolute top-3 lg:top-4 left-3 lg:left-4 text-white">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <p className="font-semibold text-xs sm:text-sm lg:text-base">{projects[3].name}</p>
                    <p className="text-xs sm:text-sm opacity-90">{projects[3].role}</p>
                  </div>
                  
                  {/* Bottom right quote */}
                  <div className="absolute bottom-3 lg:bottom-4 right-3 lg:right-4 text-white max-w-[120px] sm:max-w-[160px] lg:max-w-[200px] text-right">
                    <p className="text-xs sm:text-sm lg:text-base font-light leading-tight">{projects[3].quote}</p>
                  </div>
                </div>
              </div>
              
              <div className={`col-span-2 md:col-span-2 flex flex-col gap-2 lg:gap-3 transition-all duration-700 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                {/* Tanya */}
                <div
                  className="relative rounded-xl lg:rounded-2xl overflow-hidden flex-1 min-h-[50px] sm:min-h-[60px] lg:min-h-[70px] cursor-pointer transition-all duration-300 group"
                  onMouseEnter={() => setHoveredProject(projects[4].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[4].image}
                    alt={projects[4].name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 lg:bottom-3 left-2 lg:left-3 text-white">
                    <p className="font-semibold text-xs sm:text-sm">{projects[4].name}</p>
                    <p className="text-xs opacity-90">{projects[4].role}</p>
                  </div>
                </div>
                
                {/* Stats Card */}
                <div className="bg-white rounded-xl lg:rounded-2xl flex-1 min-h-[50px] sm:min-h-[60px] lg:min-h-[70px] flex flex-col justify-center items-center text-center shadow-sm border border-gray-100">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                    {stats.people}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 px-2">
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