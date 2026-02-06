
import React, { useState, useEffect, useRef } from 'react';
import { APP_CONFIG } from '../constants';
import { useCart } from '../context/CartContext';

interface Pizza {
  id: number;
  nome: string;
  descricao_curta: string;
  descricao_detalhada?: string;
  ingredientes: string;
  preco: number;
  imagem_url_1: string;
  imagem_url_2?: string;
  imagem_url_3?: string;
}

export const Pizzas: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPizzaIndex, setSelectedPizzaIndex] = useState<number | null>(null);
  
  // Molho State
  const [selectedSauce, setSelectedSauce] = useState('Maionese');
  const [isSauceOpen, setIsSauceOpen] = useState(false);

  // Borda State
  const [selectedBorder, setSelectedBorder] = useState('Sem borda');
  const [isBorderOpen, setIsBorderOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    const fetchPizzas = async () => {
      try {
        const response = await fetch(`${APP_CONFIG.SUPABASE_URL}/rest/v1/pizzas?select=*`, {
          method: 'GET',
          headers: {
            'apikey': APP_CONFIG.SUPABASE_KEY,
            'Authorization': `Bearer ${APP_CONFIG.SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (isMounted) {
          setPizzas(data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar pizzas:", error);
        if (isMounted) setLoading(false);
      }
    };
    fetchPizzas();
    return () => { isMounted = false; };
  }, []);

  const openModal = (index: number) => {
    setSelectedPizzaIndex(index);
    // Reset selections
    setSelectedSauce('Maionese');
    setIsSauceOpen(false);
    setSelectedBorder('Sem borda');
    setIsBorderOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPizzaIndex(null);
    document.body.style.overflow = 'unset';
  };

  const nextPizza = () => {
    if (selectedPizzaIndex !== null) {
      const nextIndex = (selectedPizzaIndex + 1) % pizzas.length;
      setSelectedPizzaIndex(nextIndex);
      setSelectedSauce('Maionese');
      setSelectedBorder('Sem borda');
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPizza = () => {
    if (selectedPizzaIndex !== null) {
      const prevIndex = (selectedPizzaIndex - 1 + pizzas.length) % pizzas.length;
      setSelectedPizzaIndex(prevIndex);
      setSelectedSauce('Maionese');
      setSelectedBorder('Sem borda');
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatPrice = (value: number) => {
    if (value === undefined || value === null || isNaN(value)) return 'R$ --';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const currentPizza = selectedPizzaIndex !== null ? pizzas[selectedPizzaIndex] : null;

  const handleAddToCart = () => {
    if (currentPizza) {
      addToCart({
        name: currentPizza.nome,
        details: `Molho: ${selectedSauce}, Borda: ${selectedBorder}`,
        price: currentPizza.preco,
        quantity: 1
      });
      closeModal();
    }
  };

  return (
    <section id="pizzas" className="py-20 sm:py-32 bg-neutral-950">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-24">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-amber-500"></div>
              <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-sm">Forno à Lenha</span>
            </div>
            <h2 className="text-5xl sm:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.8]">
              Nossas <br /> <span className="text-amber-500">Pizzas</span>
            </h2>
          </div>
        </div>
        
        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-10 animate-pulse">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="aspect-square sm:aspect-[4/3] bg-neutral-900 rounded-2xl sm:rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-10 lg:gap-12">
            {pizzas.map((pizza, index) => (
              <div 
                key={pizza.id} 
                onClick={() => openModal(index)}
                className="group relative bg-neutral-900/30 border border-white/5 rounded-2xl sm:rounded-[2.5rem] overflow-hidden flex flex-col transition-all duration-500 hover:border-amber-500/30 cursor-pointer hover:shadow-2xl hover:shadow-amber-500/5"
              >
                <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden">
                  <img src={pizza.imagem_url_1} alt={pizza.nome} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent"></div>
                  {/* "+" Button Trigger */}
                  <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-16 sm:h-16 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 z-10">
                    <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  </div>
                </div>
                <div className="p-4 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-amber-500 transition-colors">{pizza.nome}</h3>
                  <span className="text-amber-500 text-[10px] sm:text-lg font-black mt-1">{formatPrice(pizza.preco)}</span>
                  <p className="text-neutral-400 text-[9px] sm:text-base leading-relaxed italic font-light mt-2">{pizza.descricao_curta}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DYNAMIC MODAL */}
      {currentPizza && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl transition-opacity animate-[fadeIn_0.3s_ease-out]" onClick={closeModal}></div>
          
          {/* Modal Container */}
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] md:h-auto bg-neutral-900 border border-white/10 rounded-[2rem] sm:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl animate-[scaleIn_0.4s_ease-out]">
            
            {/* Single Image Section */}
            <div className="relative w-full lg:w-1/2 h-[40vh] sm:h-[50vh] lg:h-auto bg-neutral-950 flex-shrink-0">
              <img src={currentPizza.imagem_url_1} alt={currentPizza.nome} className="w-full h-full object-cover" />
              
              {/* Mobile Close Button */}
              <button onClick={closeModal} className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-lg rounded-full text-white flex items-center justify-center hover:bg-amber-500 transition-all lg:hidden z-20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content Section (Scrollable) */}
            <div ref={scrollRef} className="w-full lg:w-1/2 flex flex-col h-full bg-neutral-900 overflow-y-auto no-scrollbar relative">
              {/* Desktop Close Button */}
              <button onClick={closeModal} className="hidden lg:flex absolute top-8 right-8 w-12 h-12 bg-white/5 rounded-full items-center justify-center text-white hover:bg-amber-500 transition-all z-20 hover:scale-105 active:scale-95">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="p-6 sm:p-10 lg:p-14 flex flex-col flex-grow">
                <div className="space-y-6 sm:space-y-8">
                  {/* Header */}
                  <div>
                    <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block animate-[fadeInUp_0.4s_ease-out]">Artesanal & Premium</span>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">{currentPizza.nome}</h3>
                    <div className="flex items-center gap-4 mt-6">
                       <span className="text-2xl sm:text-4xl font-black text-amber-500">{formatPrice(currentPizza.preco)}</span>
                       <div className="px-3 py-1 rounded-full border border-amber-500/30 text-[10px] font-bold text-amber-500 uppercase tracking-widest">Disponível</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <p className="text-neutral-400 text-sm sm:text-lg leading-relaxed italic font-light">
                      {currentPizza.descricao_detalhada || currentPizza.descricao_curta}
                    </p>
                    
                    {currentPizza.ingredientes && (
                      <div className="mt-6 bg-white/5 p-4 sm:p-6 rounded-[2rem] border border-white/5">
                        <span className="text-white text-[10px] uppercase font-black tracking-[0.2em] block mb-3">Ingredientes da Pizza</span>
                        <p className="text-neutral-500 text-xs sm:text-sm leading-loose">
                          {currentPizza.ingredientes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Selectors Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    
                     {/* Sauce Drop-up Selector */}
                     <div className="relative">
                        <label className="text-[10px] uppercase font-black text-neutral-500 tracking-[0.3em] block mb-3">Escolha seu Molho</label>
                        <div className="relative">
                           <button 
                             onClick={() => { setIsSauceOpen(!isSauceOpen); setIsBorderOpen(false); }}
                             className={`w-full h-14 sm:h-16 px-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between text-white font-bold transition-all hover:border-amber-500 group ${isSauceOpen ? 'border-amber-500 bg-amber-500/5' : ''}`}
                           >
                             <div className="flex items-center gap-2">
                               <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[10px] shrink-0">
                                 {selectedSauce === 'Maionese' ? 'M' : 'C'}
                               </span>
                               <span className="text-sm truncate">{selectedSauce}</span>
                             </div>
                             <svg className={`w-4 h-4 text-amber-500 transition-transform duration-500 ${isSauceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                           </button>
                           
                           {isSauceOpen && (
                             <div className="absolute bottom-full left-0 right-0 mb-2 bg-neutral-800/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out] z-50">
                               {['Maionese', 'Catupiry (Sachê)'].map((sauce) => (
                                 <button 
                                   key={sauce} 
                                   onClick={() => { setSelectedSauce(sauce); setIsSauceOpen(false); }}
                                   className={`w-full h-12 px-4 text-left font-bold transition-all flex items-center justify-between text-sm group ${selectedSauce === sauce ? 'bg-amber-500 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                                 >
                                   <span>{sauce}</span>
                                   {selectedSauce === sauce && (
                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                   )}
                                 </button>
                               ))}
                             </div>
                           )}
                        </div>
                     </div>

                     {/* Border Drop-up Selector */}
                     <div className="relative">
                        <label className="text-[10px] uppercase font-black text-neutral-500 tracking-[0.3em] block mb-3">Escolha a Borda</label>
                        <div className="relative">
                           <button 
                             onClick={() => { setIsBorderOpen(!isBorderOpen); setIsSauceOpen(false); }}
                             className={`w-full h-14 sm:h-16 px-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between text-white font-bold transition-all hover:border-amber-500 group ${isBorderOpen ? 'border-amber-500 bg-amber-500/5' : ''}`}
                           >
                             <div className="flex items-center gap-2">
                               <span className="text-sm truncate">{selectedBorder}</span>
                             </div>
                             <svg className={`w-4 h-4 text-amber-500 transition-transform duration-500 ${isBorderOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                           </button>
                           
                           {isBorderOpen && (
                             <div className="absolute bottom-full left-0 right-0 mb-2 bg-neutral-800/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out] z-50">
                               {['Sem borda', 'Catupiry', 'Mussarela'].map((border) => (
                                 <button 
                                   key={border} 
                                   onClick={() => { setSelectedBorder(border); setIsBorderOpen(false); }}
                                   className={`w-full h-12 px-4 text-left font-bold transition-all flex items-center justify-between text-sm group ${selectedBorder === border ? 'bg-amber-500 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                                 >
                                   <span>{border}</span>
                                   {selectedBorder === border && (
                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                   )}
                                 </button>
                               ))}
                             </div>
                           )}
                        </div>
                     </div>

                  </div>
                </div>

                {/* Navigation and Add to Cart Section */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center gap-6 pb-4 sm:pb-0">
                  {/* Prev/Next Controls */}
                  <div className="flex gap-4 w-full sm:w-auto">
                    <button 
                      onClick={prevPizza} 
                      className="flex-1 sm:w-16 h-16 sm:h-20 rounded-[1.5rem] border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
                      title="Pizza Anterior"
                    >
                      <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button 
                      onClick={nextPizza} 
                      className="flex-1 sm:w-16 h-16 sm:h-20 rounded-[1.5rem] border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
                      title="Próxima Pizza"
                    >
                      <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={handleAddToCart}
                    className="w-full h-16 sm:h-20 bg-amber-500 hover:bg-white text-white hover:text-amber-600 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center gap-4 transition-all duration-500 group/btn shadow-2xl shadow-amber-500/20 active:scale-95"
                  >
                    <div className="flex flex-col items-start">
                       <span className="font-black uppercase tracking-widest text-xs sm:text-sm">Adicionar ao Carrinho</span>
                       <span className="text-[9px] font-medium opacity-80">{selectedBorder !== 'Sem borda' ? `+ Borda ${selectedBorder}` : ''}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-colors group-hover/btn:bg-amber-500/10">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes slideUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { 
          from { opacity: 0; transform: scale(0.95) translateY(10px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
