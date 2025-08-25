import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', active: true },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Pages', href: '#pages' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (isScrolled) {
      gsap.to(navbar, {
        duration: 0.4,
        ease: 'power2.out',
        y: 0,
        opacity: 1
      });
    }
  }, [isScrolled]);

  return (
    <nav 
      className={`navbar fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? 'top-3 left-2 right-2 sm:left-4 sm:right-4 md:left-6 md:right-6 lg:left-16 lg:right-16 backdrop-blur-md bg-black/20 border border-white/10 shadow-2xl rounded-2xl' 
          : 'top-0 left-0 right-0 bg-transparent'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className={`font-bold text-white transition-all duration-500 ${
              isScrolled ? 'text-lg sm:text-xl md:text-2xl' : 'text-xl sm:text-2xl md:text-3xl'
            }`}>
              Staging<span className="text-orange-500">.</span>
            </h1>
          </div>

          {/* Desktop Navigation → only show on large screens */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 transition-all duration-300 hover:text-orange-500 relative group
                    ${isScrolled ? 'text-white text-sm font-semibold' : 'text-base font-medium'}
                    ${item.active ? 'text-white' : isScrolled ? 'text-white' : 'text-gray-300'}
                  `}
                >
                  {item.label}
                  {item.active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info (only large screens) */}
          <div className={`hidden lg:flex items-center text-right transition-all duration-500 ${
            isScrolled ? 'scale-90' : 'scale-100'
          }`}>
            <div>
              <p className="text-gray-400 text-xs">Call us for any questions</p>
              <div className="flex items-center text-orange-500 font-semibold">
                <Phone size={isScrolled ? 14 : 16} className="mr-2 transition-all duration-500" />
                <span className={`${isScrolled ? 'text-sm' : 'text-base'}`}>+01 123 456 789</span>
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-500 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile + Tablet Navigation */}
      <div className={`lg:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} ${
        isScrolled ? 'mt-1' : ''
      }`}>
        <div className="px-3 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-md border-t border-white/10 rounded-b-2xl">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block px-3 py-2 text-sm sm:text-base font-medium transition-colors duration-200 hover:text-orange-500 ${
                item.active ? 'text-white' : 'text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="px-3 py-2 border-t border-white/10 mt-3">
            <p className="text-xs text-gray-400">Call us for any questions</p>
            <div className="flex items-center text-orange-500 font-semibold mt-1">
              <Phone size={16} className="mr-2" />
              <span>+01 123 456 789</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
