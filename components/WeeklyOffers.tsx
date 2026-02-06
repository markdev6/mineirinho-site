
import React, { useEffect, useState, useRef } from 'react';
import { APP_CONFIG } from '../constants';
import { useCart } from '../context/CartContext';

interface OfferItem {
  id: number;
  imagem_url: string;
  nome: string;
  descricao_curta: string;
  descricao_detalhada: string;
  preco: number;
}

const WeeklyOffers: React.FC = () => {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Cart Context
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;

    const fetchOffers = async () => {
      const endpoint = `${APP_CONFIG.SUPABASE_URL}/rest/v1/ofertas_semana?select=*&limit=3`;
      
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'apikey': APP_CONFIG.SUPABASE_KEY,
            'Authorization': `Bearer ${APP_CONFIG.SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        
        const data = await response.json();
        if (isMounted) {
          setOffers(data || []);
          setLoading(false);
        }
      } catch (err) {
        console.error("Erro ao carregar ofertas:", err);
        if (isMounted) setLoading(false);
      }
    };

    fetchOffers();
    return () => { isMounted = false; };
  }, []);

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleAddToCart = (item: OfferItem) => {
    addToCart({
      name: item.nome,
      details: 'Oferta da Semana',
      price: item.preco,
      quantity: 1
    });
  };

  if (loading || offers.length === 0) {
    return <div className="w-full h-[60vh] bg-neutral-950 animate-pulse" />;
  }

  return (
    <section className="relative w-full h-[75vh] md:h-[90vh] bg-neutral-950 overflow-hidden">
      <div 
        ref={scrollRef} 
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {offers.map((item) => (
          <div key={item.id} className="relative min-w-full h-full snap-start overflow-hidden group">
            {/* Background Image */}
            <img 
              src={item.imagem_url} 
              alt={item.nome} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
            />
            
            {/* Gradients for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/40 via-transparent to-transparent"></div>

            {/* Bottom Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 md:p-20 flex items-end justify-between gap-6">
              
              {/* Left Side: Stacked Text Content */}
              <div className="max-w-3xl space-y-3 sm:space-y-4 md:space-y-6 animate-[fadeInUp_0.8s_ease-out_forwards]">
                <div className="inline-block px-3 py-1 bg-amber-500 rounded-full">
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white">Oferta Exclusiva</span>
                </div>
                
                <h3 className="text-4xl sm:text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85]">
                  {item.nome}
                </h3>
                
                <p className="text-neutral-300 text-xs sm:text-base md:text-xl font-light italic max-w-xl line-clamp-2">
                  {item.descricao_curta}
                </p>
                
                <div className="pt-2">
                  <span className="text-3xl sm:text-5xl md:text-7xl font-black text-amber-500">
                    {formatPrice(item.preco)}
                  </span>
                </div>
              </div>

              {/* Right Side: Minimalist "+" Button */}
              <div className="flex-shrink-0 mb-2 md:mb-6">
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 hover:bg-white hover:text-amber-500"
                >
                  <svg className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination indicators */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 flex flex-col gap-3 z-30">
        {offers.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => scrollTo(idx)} 
            className={`w-1 transition-all duration-700 rounded-full ${activeIndex === idx ? 'h-16 bg-amber-500' : 'h-4 bg-white/20'}`} 
          />
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default WeeklyOffers;
