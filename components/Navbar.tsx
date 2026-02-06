
import React from 'react';
import { APP_CONFIG } from '../constants';

export const Navbar: React.FC = () => {
  const menuItems = [
    { name: 'Refeições', href: '#refeicoes' },
    { name: 'Pizzas', href: '#pizzas' },
    { name: 'Bebidas', href: '#bebidas' },
    { name: 'Confeitaria', href: '#confeitaria' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed top-2 sm:top-6 md:top-8 left-0 right-0 z-40 px-3 sm:px-8 md:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Logo Container */}
        <div className="pointer-events-auto flex items-center justify-start">
          <img 
            src={APP_CONFIG.LOGO_URL} 
            alt="Logo" 
            className="h-[40px] xs:h-[50px] sm:h-[80px] md:h-[100px] lg:h-[120px] w-auto object-contain transition-all duration-500 ease-out drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:scale-105"
          />
        </div>

        {/* Navigation Bar */}
        <nav className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] rounded-full transition-all duration-500 overflow-hidden">
          <div className="px-3 xs:px-4 sm:px-8 md:px-10 h-8 xs:h-9 sm:h-[48px] md:h-[56px] flex items-center gap-3 xs:gap-4 sm:gap-8 md:gap-12 lg:gap-16">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="group relative flex items-center h-full text-[8px] xs:text-[9px] sm:text-[11px] md:text-[13px] lg:text-[14px] font-bold text-neutral-800 hover:text-amber-600 transition-colors uppercase tracking-[0.05em] xs:tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.25em] whitespace-nowrap leading-none"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full opacity-60"></span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      <style>{`
        @media (max-width: 340px) {
          .h-8 { height: 28px; }
          .px-3 { padding-left: 8px; padding-right: 8px; }
        }
      `}</style>
    </div>
  );
};
