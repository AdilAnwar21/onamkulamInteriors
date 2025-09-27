import { useState } from 'react';

const TeamSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Team Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-16 text-left">
              The Team:
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Side - Description */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="space-y-8">
                {/* Logo */}
                <div className="flex items-center lg:justify-start justify-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      ⌘
                    </div>
                    <span className="text-2xl font-bold text-gray-900">namkulam</span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold leading-tight text-gray-900">
                    We are a passionate team of designers dedicated to transforming your vision into beautifully crafted spaces.
                  </h2>
                </div>
              </div>
            </div>

            {/* Right Side - Team Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 h-full">
                
                {/* Top Row - 3 team member cards */}
                <div className="col-span-1 md:col-span-2">
                  <div
                    className="relative rounded-3xl overflow-hidden h-64 md:h-80 cursor-pointer transition-all duration-300 group"
                    onMouseEnter={() => setHoveredProject(projects[0].id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <img
                      src={projects[0].image}
                      alt={projects[0].name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="font-semibold text-lg">{projects[0].name}</p>
                      <p className="text-sm opacity-90">{projects[0].role}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <div
                    className="relative rounded-3xl overflow-hidden h-64 md:h-80 cursor-pointer transition-all duration-300 group"
                    onMouseEnter={() => setHoveredProject(projects[1].id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <img
                      src={projects[1].image}
                      alt={projects[1].name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="font-semibold text-lg">{projects[1].name}</p>
                      <p className="text-sm opacity-90">{projects[1].role}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-2">
                  <div
                    className="relative rounded-3xl overflow-hidden h-64 md:h-80 cursor-pointer transition-all duration-300 group"
                    onMouseEnter={() => setHoveredProject(projects[2].id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <img
                      src={projects[2].image}
                      alt={projects[2].name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="font-semibold text-lg">{projects[2].name}</p>
                      <p className="text-sm opacity-90">{projects[2].role}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="col-span-2 md:col-span-4">
                  <div
                    className="relative rounded-3xl overflow-hidden h-64 md:h-80 cursor-pointer transition-all duration-300 group"
                    onMouseEnter={() => setHoveredProject(projects[3].id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <img
                      src={projects[3].image}
                      alt={projects[3].name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                    
                    {/* Top left info */}
                    <div className="absolute top-6 left-6 text-white">
                      <div className="w-8 h-8 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <p className="font-semibold text-lg">{projects[3].name}</p>
                      <p className="text-sm opacity-90">{projects[3].role}</p>
                    </div>
                    
                    {/* Bottom right quote */}
                    <div className="absolute bottom-6 right-6 text-white max-w-xs text-right">
                      <p className="text-lg font-light leading-relaxed">{projects[3].quote}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-2 space-y-4">
                  {/* Tanya */}
                  <div
                    className="relative rounded-3xl overflow-hidden h-32 md:h-36 cursor-pointer transition-all duration-300 group"
                    onMouseEnter={() => setHoveredProject(projects[4].id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <img
                      src={projects[4].image}
                      alt={projects[4].name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold text-sm">{projects[4].name}</p>
                      <p className="text-xs opacity-90">{projects[4].role}</p>
                    </div>
                  </div>

                  {/* Stats Card */}
                  <div className="bg-white rounded-3xl h-32 md:h-36 flex flex-col justify-center items-center text-center shadow-sm border border-gray-100">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {stats.people}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stats.description}
                    </div>
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