import React, { useState, useEffect } from 'react';

// Define the founder data type
interface FounderData {
  id: number;
  name: string;
  quote: string;
  signature: string;
  image: string;
}

const Founder = () => {
  const [founderData, setFounderData] = useState<FounderData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const fetchFounderData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock API response
      const mockApiResponse = {
        id: 1,
        name: "Marcus Thompson",
        quote: "Interior design is the art of creating harmony between human needs and aesthetic beauty. Every space I design tells a unique story, blending functionality with emotion to create environments that truly feel like home.",
        signature: "Marcus Thompson",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face"
      };
      
      setFounderData(mockApiResponse);
      setLoading(false);
    };

    fetchFounderData();
  }, []);

  if (loading || !founderData) {
    return (
      <div className="h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
          <p className="text-amber-800">Loading founder information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
      {/* Clean white background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side - Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Photo with elegant styling */}
              <div className="w-80 h-96 lg:w-96 lg:h-[32rem] rounded-2xl shadow-2xl relative overflow-hidden">
                <img 
                  src={founderData.image}
                  alt={founderData.name}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-amber-200/30 rounded-2xl" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-200/20 rounded-full blur-sm" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-orange-200/15 rounded-full blur-md" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-amber-900 space-y-8 lg:pl-8">
            
            {/* Heading */}
            <div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mb-2">
                <span className="block text-amber-700 text-2xl lg:text-3xl font-normal mb-4">
                  Meet the man behind all of this
                </span>
                <span className="bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent font-bold">
                  {founderData.name}
                </span>
              </h2>
            </div>

            {/* Quote */}
            <div className="relative">
              <div className="absolute -left-4 -top-2 text-6xl text-amber-200 font-serif">"</div>
              <blockquote className="text-xl lg:text-2xl text-amber-800 leading-relaxed italic pl-8 pr-4">
                {founderData.quote}
              </blockquote>
              <div className="absolute -right-4 -bottom-6 text-6xl text-amber-200 font-serif">"</div>
            </div>

            {/* Signature */}
            <div className="pt-8 border-t border-amber-200">
              <div className="text-3xl lg:text-4xl text-amber-900 font-light italic tracking-wider">
                — {founderData.signature}
              </div>
            </div>

            {/* Optional decorative line */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-amber-600 to-transparent mt-8" />
          </div>
        </div>
      </div>

      {/* Subtle ambient effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-100 rounded-full blur-2xl opacity-20" />
    </div>
  );
};

export default Founder;