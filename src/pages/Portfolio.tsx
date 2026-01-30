import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { X, ArrowLeft } from 'lucide-react';

// Import portfolio images
import bathroom1 from '../assets/portfolio/bathroom/bathroom-1.png';
import bedroom1 from '../assets/portfolio/bedroom/bedroom-1.png';
import diningRoom1 from '../assets/portfolio/dining-room/dining-room-1.png';
import kitchen1 from '../assets/portfolio/kitchen/kitchen-1.png';
import kitchen2 from '../assets/portfolio/kitchen/kitchen-2.png';
import kitchen3 from '../assets/portfolio/kitchen/kitchen-3.png';
import kitchen4 from '../assets/portfolio/kitchen/kitchen-4.png';
import livingRoom1 from '../assets/portfolio/living-room/living-room-1.png';

interface Project {
    id: number;
    title: string;
    image: string;
    description: string;
}

interface CategorySection {
    category: string;
    projects: Project[];
}

const portfolioData: CategorySection[] = [
    {
        category: 'Kitchen',
        projects: [
            { id: 1, title: 'Contemporary Kitchen', image: kitchen1, description: 'Modern kitchen with sleek finishes' },
            { id: 2, title: 'Minimalist Kitchen', image: kitchen2, description: 'Clean and functional kitchen design' },
            { id: 3, title: 'Luxury Kitchen', image: kitchen3, description: 'High-end kitchen with premium materials' },
            { id: 4, title: 'Classic Kitchen', image: kitchen4, description: 'Timeless kitchen design' },
        ]
    },
    {
        category: 'Living Room',
        projects: [
            { id: 5, title: 'Spacious Living Room', image: livingRoom1, description: 'Open and airy living space' },
        ]
    },
    {
        category: 'Bedroom',
        projects: [
            { id: 6, title: 'Cozy Bedroom', image: bedroom1, description: 'Warm and inviting bedroom space' },
        ]
    },
    {
        category: 'Bathroom',
        projects: [
            { id: 7, title: 'Modern Bathroom', image: bathroom1, description: 'Elegant bathroom design with contemporary fixtures' },
        ]
    },
    {
        category: 'Dining Room',
        projects: [
            { id: 8, title: 'Elegant Dining', image: diningRoom1, description: 'Sophisticated dining room setup' },
        ]
    },
];

function Portfolio() {
    const navigate = useNavigate();
    const [lightboxImage, setLightboxImage] = useState<{ project: Project; category: string } | null>(null);
    const sectionsRef = useRef<HTMLDivElement[]>([]);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);

        // Entrance animations
        const timer = setTimeout(() => {
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
                );
            }

            // Animate each section
            sectionsRef.current.forEach((section, index) => {
                if (section) {
                    const items = section.querySelectorAll('.portfolio-item');
                    gsap.fromTo(
                        items,
                        { opacity: 0, y: 60, scale: 0.9 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.3 + (index * 0.1) }
                    );
                }
            });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const openLightbox = (project: Project, category: string) => {
        setLightboxImage({ project, category });
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div ref={headerRef} className="relative z-10 pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/onamkulamInteriors')}
                        className="group mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm hover:bg-[#8B4513] rounded-full transition-all duration-300 border border-white/20 hover:border-[#8B4513] text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white transform group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium text-white">Back to Home</span>
                    </button>

                    {/* Title */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4">
                            <span className="text-white">Our </span>
                            <span className="text-[#F0E5DA] italic font-serif">Portfolio</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl">
                            Explore our collection of stunning interior designs that transform spaces into extraordinary experiences.
                        </p>
                    </div>
                </div>
            </div>

            {/* Portfolio Sections by Category */}
            <div className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
                    {portfolioData.map((section, sectionIndex) => (
                        <div
                            key={section.category}
                            ref={(el) => {
                                if (el) sectionsRef.current[sectionIndex] = el;
                            }}
                        >
                            {/* Category Header */}
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                                    {section.category}
                                </h2>
                                <div className="w-20 h-1 bg-[#8B4513] rounded-full"></div>
                            </div>

                            {/* Category Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {section.projects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        className={`portfolio-item group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer touch-manipulation ${index === 0 && section.projects.length > 2 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                                            }`}
                                        onClick={() => openLightbox(project, section.category)}
                                    >
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-800">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                            {/* Glassmorphism Overlay on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/0 to-black/0 group-hover:from-[#8B4513]/40 group-hover:to-black/20 transition-all duration-500" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] sm:text-xs font-medium text-[#F0E5DA] mb-1 uppercase tracking-wider">
                                                        {section.category}
                                                    </p>
                                                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-gray-300 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                </div>

                                                {/* Arrow Icon */}
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all duration-300 group z-10 touch-manipulation"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <div
                        className="relative max-w-6xl w-full animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={lightboxImage.project.image}
                            alt={lightboxImage.project.title}
                            className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl"
                        />

                        <div className="mt-4 sm:mt-6 text-center px-2">
                            <p className="text-xs sm:text-sm font-medium text-[#F0E5DA] mb-2 uppercase tracking-wider">
                                {lightboxImage.category}
                            </p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
                                {lightboxImage.project.title}
                            </h2>
                            <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                                {lightboxImage.project.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
        </div>
    );
}

export default Portfolio;
