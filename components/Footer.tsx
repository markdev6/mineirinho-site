
import React from 'react';
import { APP_CONFIG } from '../constants';

export const Footer: React.FC = () => {
  const links = [
    { name: 'Refeições', href: '#refeicoes' },
    { name: 'Pizzas', href: '#pizzas' },
    { name: 'Bebidas', href: '#bebidas' },
    { name: 'Confeitaria', href: '#confeitaria' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-neutral-300 py-12 border-t-2 border-amber-500/20 relative z-10">
      {/* Decorative Top Shadow for Contrast */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        
        {/* Main Content Grid - Horizontal on ALL sizes (grid-cols-3) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-8 mb-12">
          
          {/* 1. Brand Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-20 sm:h-20 bg-neutral-900/50 rounded-full flex items-center justify-center border border-white/10 p-2">
               <img 
                src={APP_CONFIG.LOGO_URL} 
                alt="Logo Mineirinho" 
                className="w-full h-full object-contain opacity-90"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-1 sm:mb-2">
                Mineirinho
              </h3>
              <p className="hidden sm:block text-amber-500 font-medium tracking-widest text-[10px] sm:text-xs uppercase">
                Restaurante, Pizzaria <br/> & Confeitaria
              </p>
              {/* Mobile Short Version */}
              <p className="sm:hidden text-amber-500 font-medium tracking-tight text-[8px] uppercase leading-tight">
                Restaurante &<br/>Confeitaria
              </p>
            </div>
          </div>

          {/* 2. Navigation Section (Center) */}
          <div className="flex flex-col items-center pt-2 sm:pt-4">
            <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-3 sm:mb-6">Menu</h4>
            <ul className="space-y-2 sm:space-y-3 text-center">
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-[10px] sm:text-sm text-neutral-400 hover:text-white transition-colors font-medium block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Section (Right) */}
          <div className="flex flex-col items-center sm:items-end text-center sm:text-right pt-2 sm:pt-4">
            <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-3 sm:mb-6">Contato</h4>
            
            <a 
              href="tel:+5531971858407" 
              className="group flex flex-col sm:flex-row items-center sm:gap-3 text-white transition-colors mb-2"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center text-black mb-2 sm:mb-0 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
                <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div className="flex flex-col items-center sm:items-end">
                <span className="text-[10px] sm:text-xs text-neutral-500 uppercase font-bold tracking-wider">Delivery</span>
                <span className="text-xs sm:text-lg font-bold whitespace-nowrap tracking-tight">31 97185-8407</span>
              </div>
            </a>
          </div>

        </div>

        {/* Bottom Bar - Separated for cleanup */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-neutral-600 font-medium">
          <p className="order-2 sm:order-1 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Mineirinho. Todos os direitos reservados.
          </p>
          
          <div className="order-1 sm:order-2 flex items-center gap-1.5 bg-neutral-900/50 px-4 py-2 rounded-full border border-white/5">
            <span className="opacity-70">Site Criado por</span>
            <a 
              href="mailto:swt.service@gmail.com" 
              className="text-amber-500 hover:text-white font-black tracking-wider hover:underline decoration-amber-500 underline-offset-2 transition-all"
              title="Entre em contato com a SWT"
            >
              SWT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
