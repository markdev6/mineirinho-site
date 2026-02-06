
import React from 'react';

export const PromotionBanner: React.FC = () => {
  return (
    <section className="w-full bg-neutral-950 py-10 sm:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-12">
        <div className="relative group overflow-hidden rounded-2xl sm:rounded-[3rem] shadow-2xl shadow-amber-500/5 transition-all duration-700 hover:shadow-amber-500/10">
          <img 
            src="https://imglur.com/get/0xH9ld.png?v=410462225" 
            alt="Promoção Especial" 
            loading="lazy"
            className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-[1.02]"
          />
          {/* Subtle Glass Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};