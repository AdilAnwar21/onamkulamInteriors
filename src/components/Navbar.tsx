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
    ? 'top-4 left-2 right-2 sm:left-6 sm:right-6 md:left-10 md:right-10 lg:left-16 lg:right-16 xl:left-24 xl:right-24 backdrop-blur-md bg-black/20 border border-white/10 shadow-2xl rounded-2xl' 
    : 'top-0 left-0 right-0 bg-transparent'
}`}
  style={{
    backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
  }}
>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className={`font-bold text-white transition-all duration-500 ${
              isScrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
            }`}>
              Staging<span className="text-orange-500">.</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 transition-all duration-300 hover:text-orange-500 relative group
          ${isScrolled ? 'text-white text-xs font-semibold' : 'text-sm font-medium'}
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


          {/* Contact Info */}
          <div className={`hidden lg:flex items-center text-right transition-all duration-500 ${
            isScrolled ? 'scale-90' : 'scale-100'
          }`}>
            <div>
              <p className={`text-gray-400 transition-all duration-500 ${
                isScrolled ? 'text-xs' : 'text-xs'
              }`}>Call us for any questions</p>
              <div className="flex items-center text-orange-500 font-semibold">
                <Phone size={isScrolled ? 14 : 16} className="mr-2 transition-all duration-500" />
                <span className={`transition-all duration-500 ${
                  isScrolled ? 'text-sm' : 'text-base'
                }`}>+01 123 456 789</span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-500 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} ${
        isScrolled ? 'mt-2' : ''
      }`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-md ${
          isScrolled ? 'border-t border-white/10 rounded-b-2xl' : 'border-t border-white/10'
        }`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-orange-500 ${
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