import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const achievements = [
    { number: 27, title: "Years of Storytelling", subtitle: "Designing homes that resonate with heart and soul since 1998.", images: [ /* images... */ ] },
    { number: 220, title: "Spaces Transformed", subtitle: "Each one a unique story we helped bring to life.", images: [ /* images... */ ] },
    { number: 21, title: "Year Warranty Promise", subtitle: "Our promise of durability and trust, built into every detail.", images: [ /* images... */ ] },
    { number: 45, title: "Days Avg. Turnaround", subtitle: "Average completion in just 45 days for a 2BHK, because your story can't wait.", images: [ /* images... */ ] }
  ];

  // Animate numbers
  useEffect(() => {
    let raf: number;

    if (isVisible) {
      const startTime = performance.now();

      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / 1500, 1); // 1.5s animation
        setCounts(achievements.map(a => Math.floor(a.number * progress)));

        if (progress < 1) {
          raf = requestAnimationFrame(animate);
        }
      };

      raf = requestAnimationFrame(animate);
    } else {
      // Reset to 0 when leaving section
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
      className="relative min-h-screen bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12"
      style={{ paddingTop: '120px' }} // Add top padding to account for navbar
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-12 md:mb-16">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-4xl">
            Every space has a story waiting to be told. It's the story of a family growing, a quiet evening with a book, or a gathering filled with laughter. We believe in designing not just interiors, but the very settings where your life's best scenes are played out.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 lg:gap-16 mb-10 sm:mb-16 md:mb-20">
          {achievements.map((achievement, index) => (
            <div key={index} className={`transition-all duration-700`}>
              <div className="mb-3 sm:mb-6">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-black mb-1 sm:mb-2">
                  {counts[index]} +
                </h2>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-black mb-1 sm:mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">{achievement.subtitle}</p>
              </div>

              {/* Images */}
              <div className="flex -space-x-2 sm:-space-x-3">
                {achievement.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 sm:border-3 border-white shadow-lg"
                    style={{ zIndex: achievement.images.length - imgIndex }}
                  >
                    <img src={image} alt={`Project ${imgIndex + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-gray-200 mt-4 sm:mt-8"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <h3 className="text-base sm:text-lg md:text-xl font-medium text-black">Want your own Design?</h3>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black p-2 sm:p-3 rounded-full transition-all">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm sm:text-base">Slots are available</span>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;