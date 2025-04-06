'use client';

import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-scroll';

interface MenuItem {
  id: string;
  label: string;
}

const HeaderMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const menuItems: MenuItem[] = [
    { id: 'home', label: 'דף הבית' },
    { id: 'about', label: 'אודות' },
    { id: 'services', label: 'שירותים' },
    { id: 'portfolio', label: 'קטלוג ספרים' },
    { id: 'testimonials', label: 'המלצות' },
    { id: 'contact', label: 'צור קשר' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.menu-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.id);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md" dir="rtl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="font-fancy text-2xl font-bold text-primary">חנות ספרים</div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-secondary hover:text-primary transition-colors duration-300"
              aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 space-x-reverse">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={`font-medium text-lg cursor-pointer hover:text-primary transition-colors duration-300 pb-1 ${
                      activeSection === item.id 
                        ? 'text-primary border-b-2 border-primary' 
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`menu-container md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="bg-white px-4 py-3 shadow-inner">
          <ul className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className={`block font-medium text-lg cursor-pointer hover:text-primary transition-colors duration-300 ${
                    activeSection === item.id 
                      ? 'text-primary font-bold' 
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderMenu;