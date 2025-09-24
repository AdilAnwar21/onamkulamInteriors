import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define the team member data type
interface TeamMember {
  id: number;
  name: string;
  position: string;
  quote: string;
  description: string;
  image: string;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulate API call for team data
  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTeamData = [
        {
          id: 1,
          name: "Alex Rodriguez",
          position: "Project Manager",
          quote: "Excellence is in the details. I ensure every project runs smoothly from concept to completion.",
          description: "Alex coordinates all our projects with precision, ensuring timelines are met and quality standards exceeded.",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face&fm=png"
        },
        {
          id: 2,
          name: "Emily Chen",
          position: "Creative Director",
          quote: "Innovation meets tradition in every design we create. We don't just follow trends, we set them.",
          description: "Emily leads our creative vision, bringing fresh perspectives to modern interior design with 10+ years of experience.",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face&fm=png"
        },
        {
          id: 3,
          name: "David Park",
          position: "3D Visualization Specialist",
          quote: "Bringing dreams to life through technology. Every render tells a story before it becomes reality.",
          description: "David creates stunning 3D visualizations that help clients envision their perfect spaces before construction begins.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face&fm=png"
        }
      ];
      
      setTeamMembers(mockTeamData);
      setLoading(false);
    };

    fetchTeamData();
  }, []);

  // Auto-advance to next team member
  useEffect(() => {
    if (teamMembers.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [teamMembers.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? teamMembers.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  if (loading || teamMembers.length === 0) {
    return (
      <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-800">Loading team information...</p>
        </div>
      </div>
    );
  }

  const currentMember = teamMembers[currentIndex];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center relative overflow-hidden py-6 sm:py-10 lg:py-0">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50" />
      
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        
        {/* Mobile Layout (up to lg) */}
        <div className="lg:hidden">
          {/* Section Header */}
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-sm sm:text-base font-medium text-gray-600 mb-1 tracking-wide">
              MEET OUR TEAM
            </h2>
            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm px-2">
              The talented individuals who bring our clients' visions to life
            </p>
          </div>

          {/* Content fits inside the screen */}
          <div className="flex flex-col items-center justify-between px-4">
            {/* Team member photo */}
            <div className="flex justify-center mb-4">
              <img 
                src={currentMember.image}
                alt={currentMember.name}
                className="w-40 h-52 sm:w-48 sm:h-64 rounded-xl object-cover object-center shadow-md"
              />
            </div>

            {/* Quote with curly quotes */}
            <div className="relative text-center px-2 mb-4">
              <div className="absolute -left-2 -top-2 text-2xl sm:text-3xl text-gray-300 font-serif leading-none">“</div>
              <blockquote className="text-base sm:text-lg text-gray-900 leading-snug font-light px-4">
                {currentMember.quote}
              </blockquote>
              <div className="absolute -bottom-3 right-2 text-2xl sm:text-3xl text-gray-300 font-serif leading-none">”</div>
            </div>

            {/* Member Info */}
            <div className="text-center mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {currentMember.name}
              </h3>
              <p className="text-gray-600 mb-2 font-medium text-xs sm:text-sm">
                {currentMember.position}
              </p>
              <p className="text-gray-700 text-xs sm:text-sm max-w-xs mx-auto">
                {currentMember.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={goToPrevious}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                aria-label="Previous team member"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              
              <button
                onClick={goToNext}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                aria-label="Next team member"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>

              {/* Dots */}
              <div className="flex gap-1.5 ml-2">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-gray-900 w-4' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to team member ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT side - Section Header + Photo */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            {/* Section Header */}
            <div>
              <h2 className="text-lg font-medium text-gray-600 mb-4 tracking-wide">
                MEET OUR TEAM
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The talented individuals who bring our clients' visions to life
              </p>
            </div>

            {/* Team member photo */}
            <div className="relative">
              <img 
                src={currentMember.image}
                alt={currentMember.name}
                className="w-80 h-96 lg:w-96 lg:h-[32rem] rounded-2xl object-cover object-center transition-all duration-500 shadow-lg"
              />
            </div>
          </div>

          {/* RIGHT side - Content */}
          <div className="text-gray-800 space-y-8 lg:pl-8">
            
            {/* Large Quote with curly quotes */}
            <div className="relative">
              <div className="absolute -left-6 -top-4 text-8xl text-gray-300 font-serif leading-none">“</div>
              <blockquote className="text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight font-light pl-12 pr-4">
                {currentMember.quote}
              </blockquote>
              <div className="absolute -bottom-8 right-0 text-8xl text-gray-300 font-serif leading-none">”</div>
            </div>

            {/* Member Info */}
            <div className="pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentMember.name}
              </h3>
              <p className="text-gray-600 mb-4 font-medium">
                {currentMember.position}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {currentMember.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 pt-8">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                aria-label="Previous team member"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                aria-label="Next team member"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Progress indicators */}
              <div className="flex gap-2 ml-4">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-gray-900 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to team member ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Team;
