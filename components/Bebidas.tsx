
import React, { useRef } from 'react';
import { useCart } from '../context/CartContext';

const DRINKS = [
  { id: 1, nome: 'Coca Cola 2L', preco: 14.00, img: 'https://imglur.com/get/R2290h.png' },
  { id: 2, nome: 'Pepsi 2L', preco: 14.90, img: 'https://imglur.com/get/wNkRn5.png' },
  { id: 3, nome: 'Sprite', preco: 12.90, img: 'https://imglur.com/get/gxjM4D.png' },
  { id: 4, nome: 'Fanta Uva', preco: 12.90, img: 'https://imglur.com/get/Q9ZweL.png' },
  { id: 5, nome: 'Sukita Laranja', preco: 11.90, img: 'https://imglur.com/get/acxxvq.png' },
];

export const Bebidas: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleAddDrink = (drink: typeof DRINKS[0]) => {
    addToCart({
      name: drink.nome,
      details: 'Bebida',
      price: drink.preco,
      quantity: 1
    });
  };

  return (
    <section id="bebidas" className="py-20 sm:py-24 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4">
             <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-amber-500"></div>
              <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-sm">Refrescante</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase italic tracking-tighter">
              Bebidas <span className="text-amber-500">&</span> Sodas
            </h2>
          </div>
          
          {/* Scroll Indicator (Visual only) */}
          <div className="hidden sm:flex gap-2 text-white/20">
             <span className="text-xs uppercase tracking-widest animate-pulse">Deslize</span>
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
        >
          {DRINKS.map((drink) => (
            <div 
              key={drink.id}
              className="flex-shrink-0 w-[200px] sm:w-[280px] bg-neutral-900/50 border border-white/5 rounded-[2rem] p-6 flex flex-col items-center gap-6 snap-start group hover:border-amber-500/30 transition-all duration-500 hover:bg-neutral-900"
            >
              {/* Image */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                {/* Alterado aqui: Removido -rotate-6 e mantido apenas scale-110 para expansão leve */}
                <img 
                  src={drink.img} 
                  alt={drink.nome}
                  className="relative w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="text-center w-full space-y-2">
                <h3 className="text-white font-bold text-lg sm:text-xl uppercase italic tracking-tight line-clamp-1">
                  {drink.nome}
                </h3>
                <p className="text-amber-500 font-black text-xl sm:text-2xl">
                  {formatPrice(drink.preco)}
                </p>
              </div>

              {/* Add Button */}
              <button 
                onClick={() => handleAddDrink(drink)}
                className="w-full h-12 bg-white/5 hover:bg-amber-500 text-white rounded-xl flex items-center justify-center gap-2 transition-all font-bold uppercase text-xs tracking-widest group/btn"
              >
                <span>Adicionar</span>
                <svg className="w-4 h-4 transition-transform group-hover/btn:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};
