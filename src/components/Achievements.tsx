import { useState, useEffect, useRef, memo } from 'react';

// 1. Wrap in memo
const Achievements = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const achievements = [
    { 
      number: 27, 
      title: "Years of Storytelling", 
      subtitle: "Designing homes that resonate with heart and soul since 1998.", 
      showPlus: true 
    },
    { 
      number: 220, 
      title: "Spaces Transformed", 
      subtitle: "Each one a unique story we helped bring to life.", 
      showPlus: true 
    },
    { 
      number: 21, 
      title: "Year Warranty Promise", 
      subtitle: "Our promise of durability and trust, built into every detail.", 
      showPlus: false 
    },
    { 
      number: 45, 
      title: "Days Avg. Turnaround", 
      subtitle: "Average completion in just 45 days for a 2BHK, because your story can't wait.", 
      showPlus: false 
    }
  ];

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
  }, [isVisible]); // Depend only on isVisible

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 } // Lowered threshold slightly for better mobile triggering
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-gray-50 overflow-y-auto lg:overflow-y-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-12 pt-32 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-12 md:pb-16 lg:pb-20 h-full lg:flex lg:flex-col lg:justify-center">
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
              <div className="w-full h-px bg-gray-200 mt-6 sm:mt-8"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Achievements;