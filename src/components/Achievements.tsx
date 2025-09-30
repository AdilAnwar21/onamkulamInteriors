import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sample images for demo
  const sampleImages = [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=100&h=100&fit=crop'
  ];

  const achievements = [
    { 
      number: 27, 
      title: "Years of Storytelling", 
      subtitle: "Designing homes that resonate with heart and soul since 1998.", 
      // images: sampleImages, 
      showPlus: true 
    },
    { 
      number: 220, 
      title: "Spaces Transformed", 
      subtitle: "Each one a unique story we helped bring to life.", 
      // images: sampleImages, 
      showPlus: true 
    },
    { 
      number: 21, 
      title: "Year Warranty Promise", 
      subtitle: "Our promise of durability and trust, built into every detail.", 
      // images: sampleImages, 
      showPlus: false 
    },
    { 
      number: 45, 
      title: "Days Avg. Turnaround", 
      subtitle: "Average completion in just 45 days for a 2BHK, because your story can't wait.", 
      // images: sampleImages, 
      showPlus: false 
    }
  ];

  // Animate numbers
  useEffect(() => {
    let raf: number;
    if (isVisible) {
      const startTime = performance.now();
      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / 1500, 1);
        setCounts(achievements.map(a => Math.floor(a.number * progress)));
        if (progress < 1) {
          raf = requestAnimationFrame(animate);
        }
      };
      raf = requestAnimationFrame(animate);
    } else {
      setCounts(achievements.map(() => 0));
    }
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  // Watch section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-gray-50 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-12 pt-32 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-12 md:pb-16 lg:pb-20">
        {/* Header */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <p className="text-base sm:text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-4xl">
            Every space has a story waiting to be told. It's the story of a family growing, a quiet evening with a book, or a gathering filled with laughter. We believe in designing not just interiors, but the very settings where your life's best scenes are played out.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 sm:gap-10 md:gap-12 lg:gap-16 mb-10 sm:mb-16 md:mb-20">
          {achievements.map((achievement, index) => (
            <div key={index} className="transition-all duration-700">
              <div className="mb-6 sm:mb-6">
                <h2 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-black mb-3 sm:mb-2 leading-none">
                  {counts[index]}{achievement.showPlus ? ' +' : ''}
                </h2>
                <h3 className="text-xl sm:text-lg md:text-xl lg:text-2xl font-medium text-black mb-2 sm:mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-sm md:text-base leading-relaxed">
                  {achievement.subtitle}
                </p>
              </div>
              
              {/* Images - Commented out as in your code */}
              {/* <div className="flex -space-x-2 sm:-space-x-3 mb-6 sm:mb-0">
                {achievement.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 sm:border-3 border-white shadow-lg"
                    style={{ zIndex: achievement.images.length - imgIndex }}
                  >
                    <img 
                      src={image} 
                      alt={`Project ${imgIndex + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div> */}

              <div className="w-full h-px bg-gray-200 mt-6 sm:mt-8"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;