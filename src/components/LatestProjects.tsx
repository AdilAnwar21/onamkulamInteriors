import { useState } from 'react';

const LatestProjects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      name: "Valeria Novikova",
      role: "Designer",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9c7d304?w=400&h=500&fit=crop&crop=face",
      bgColor: "bg-blue-100"
    },
    {
      id: 2,
      name: "Alex Podzemsky",
      role: "Designer", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
      bgColor: "bg-amber-100"
    },
    {
      id: 3,
      name: "Helen Reeves",
      role: "Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bgColor: "bg-emerald-800"
    },
    {
      id: 4,
      name: "Mark Jackson",
      role: "Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face",
      bgColor: "bg-gray-900",
      isLarge: true,
      quote: "We are here to create space that will inspire you."
    },
    {
      id: 5,
      name: "Tanya Rodriguez",
      role: "HR",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      bgColor: "bg-rose-100"
    },
    {
      id: 6,
      name: "Astra",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&crop=face",
      bgColor: "bg-gray-900",
      isBottom: true
    }
  ];

  const stats = {
    people: "50+",
    description: "People in business"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Latest Projects
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Side - Description */}
          <div className="lg:col-span-2 flex items-start justify-center">
            <div className="space-y-6 max-w-sm">
              <h3 className="text-2xl md:text-3xl font-light leading-tight text-gray-900">
                We are a passionate team of designers dedicated to transforming your vision into beautifully crafted spaces.
              </h3>
            </div>
          </div>

          {/* Right Side - Project Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 h-full">
              {/* Top Row */}
              <div className="grid gap-3 lg:gap-4">
                {/* Valeria */}
                <div
                  className={`${projects[0].bgColor} rounded-xl lg:rounded-2xl p-3 lg:p-4 aspect-[3/4] relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    hoveredProject === projects[0].id ? 'scale-105' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHoveredProject(projects[0].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[0].image}
                    alt={projects[0].name}
                    className={`w-full h-full object-cover rounded-lg lg:rounded-xl transition-transform duration-300 ${
                      hoveredProject === projects[0].id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-gray-900">
                    <p className="font-medium text-xs lg:text-sm">{projects[0].name}</p>
                    <p className="text-xs opacity-70">{projects[0].role}</p>
                  </div>
                </div>

                {/* Tanya */}
                <div
                  className={`${projects[4].bgColor} rounded-xl lg:rounded-2xl p-3 lg:p-4 aspect-square relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    hoveredProject === projects[4].id ? 'scale-105' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHoveredProject(projects[4].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[4].image}
                    alt={projects[4].name}
                    className={`w-full h-full object-cover rounded-lg lg:rounded-xl transition-transform duration-300 ${
                      hoveredProject === projects[4].id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-gray-900">
                    <p className="font-medium text-xs lg:text-sm">{projects[4].name}</p>
                    <p className="text-xs opacity-70">{projects[4].role}</p>
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="grid gap-3 lg:gap-4">
                {/* Alex */}
                <div
                  className={`${projects[1].bgColor} rounded-xl lg:rounded-2xl p-3 lg:p-4 aspect-[3/4] relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    hoveredProject === projects[1].id ? 'scale-105' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHoveredProject(projects[1].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[1].image}
                    alt={projects[1].name}
                    className={`w-full h-full object-cover rounded-lg lg:rounded-xl transition-transform duration-300 ${
                      hoveredProject === projects[1].id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                    <p className="font-medium text-xs lg:text-sm">{projects[1].name}</p>
                    <p className="text-xs opacity-70">{projects[1].role}</p>
                  </div>
                </div>

                {/* Mark - Large Card */}
                <div
                  className={`${projects[3].bgColor} rounded-xl lg:rounded-2xl p-4 lg:p-5 aspect-[4/3] relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    hoveredProject === projects[3].id ? 'scale-105' : 'scale-100'
                  } col-span-2 md:col-span-1`}
                  onMouseEnter={() => setHoveredProject(projects[3].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[3].image}
                    alt={projects[3].name}
                    className={`w-full h-full object-cover rounded-lg lg:rounded-xl transition-transform duration-300 ${
                      hoveredProject === projects[3].id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-4 lg:top-5 left-4 lg:left-5 text-white">
                    <div className="w-6 h-6 flex items-center justify-center mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <p className="font-medium text-xs lg:text-sm">{projects[3].name}</p>
                    <p className="text-xs opacity-70">{projects[3].role}</p>
                  </div>
                  <div className="absolute bottom-4 lg:bottom-5 right-4 lg:right-5 text-white max-w-xs">
                    <p className="text-sm lg:text-base font-light leading-relaxed">{projects[3].quote}</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="grid gap-3 lg:gap-4">
                {/* Helen */}
                <div
                  className={`${projects[2].bgColor} rounded-xl lg:rounded-2xl p-3 lg:p-4 aspect-square relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    hoveredProject === projects[2].id ? 'scale-105' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHoveredProject(projects[2].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[2].image}
                    alt={projects[2].name}
                    className={`w-full h-full object-cover rounded-lg lg:rounded-xl transition-transform duration-300 ${
                      hoveredProject === projects[2].id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                    <p className="font-medium text-xs lg:text-sm">{projects[2].name}</p>
                    <p className="text-xs opacity-70">{projects[2].role}</p>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 aspect-square flex flex-col justify-center items-center text-center shadow-sm">
                  <div className="text-4xl lg:text-5xl font-light text-gray-900 mb-1">
                    {stats.people}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    {stats.description}
                  </div>
                </div>

                {/* Astra - Bottom */}
                <div
                  className={`${projects[5].bgColor} rounded-xl lg:rounded-2xl p-3 lg:p-4 aspect-[4/3] relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    hoveredProject === projects[5].id ? 'scale-105' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHoveredProject(projects[5].id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={projects[5].image}
                    alt={projects[5].name}
                    className={`w-full h-full object-cover rounded-lg lg:rounded-xl transition-transform duration-300 ${
                      hoveredProject === projects[5].id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                    <p className="font-medium text-xs lg:text-sm">{projects[5].name}</p>
                    <p className="text-xs opacity-70">{projects[5].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-end mt-8 lg:mt-12">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors duration-200 font-medium text-sm">
            Grab a copy
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Bottom Brand */}
        <div className="flex justify-end mt-6">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Made in Framer</span>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 0h16v8l-8 8V8H4V0zm0 8h8v8l-8-8z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProjects;