import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Building, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { icon: Building, value: '250+', label: 'Projects Completed' },
    { icon: Users, value: '98%', label: 'Client Satisfaction' },
    { icon: Award, value: '15+', label: 'Awards Won' },
    { icon: Clock, value: '10+', label: 'Years Experience' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate stats on scroll
    gsap.fromTo('.stat-card', 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
        }
      }
    );

    // Animate text content
    gsap.fromTo('.about-text', 
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    );

  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="about-text">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Excellence in Every
              <span className="text-orange-500"> Detail</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              For over a decade, we have been transforming spaces and creating architectural masterpieces 
              that stand the test of time. Our commitment to quality, innovation, and client satisfaction 
              has made us a trusted name in the industry.
            </p>
            <p className="text-gray-600 mb-8">
              We believe that great architecture is not just about aesthetics—it's about creating 
              environments that enhance lives and inspire communities.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                  <stat.icon className="text-orange-500 group-hover:text-white transition-colors duration-300" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;