
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const MASSAS = ['Baunilha Bourbon', 'Chocolate Belga 70%', 'Red Velvet', 'Cenoura & Especiarias', 'Nozes', 'Limão Siciliano', 'Coco Cremoso', 'Pão de Ló', 'Amêndoas', 'Laranja Bahia'];
const RECHEIOS = ['Brigadeiro de Pistache', 'Ninho com Morangos', 'Doce de Leite & Nozes', 'Ganache Intenso', 'Quatro Leites', 'Frutas Vermelhas', 'Creme de Avelã', 'Beijinho Gourmet', 'Trufa Branca', 'Baba de Moça'];
const COBERTURAS = ['Chantininho Sedoso', 'Ganache Semi-Amargo', 'Buttercream Suíço', 'Glaceado Espelhado', 'Merengue Italiano', 'Naked Cake', 'Frutas & Flores', 'Drip de Caramelo', 'Crispy de Chocolate', 'Creme de Queijo'];

const PRICE_PER_KG = 52.90;

export const Confeitaria: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Cart Context
  const { addToCart } = useCart();

  // Form State
  const [selectedMassas, setSelectedMassas] = useState<string[]>([]);
  const [selectedRecheios, setSelectedRecheios] = useState<string[]>([]);
  const [selectedCoberturas, setSelectedCoberturas] = useState<string[]>([]);
  const [dataEntrega, setDataEntrega] = useState('');
  const [periodo, setPeriodo] = useState('tarde');
  const [obs, setObs] = useState('');
  const [weight, setWeight] = useState<number>(1.5); // Peso inicial padrão

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleSubmit = () => {
    // Validação básica
    if (!dataEntrega || selectedMassas.length === 0 || selectedRecheios.length === 0 || selectedCoberturas.length === 0 || weight <= 0) {
      alert('Por favor, preencha a Data, Peso e selecione pelo menos uma opção de Massa, Recheio e Cobertura.');
      return;
    }

    const calculatedPrice = weight * PRICE_PER_KG;

    // Formata os detalhes para o carrinho
    const detalhesFormatados = `
      Peso: ${weight}kg (Base: ${formatPrice(PRICE_PER_KG)}/kg).
      Data: ${dataEntrega} (${periodo}).
      Massas: ${selectedMassas.join(', ')}.
      Recheios: ${selectedRecheios.join(', ')}.
      Coberturas: ${selectedCoberturas.join(', ')}.
      ${obs ? `Obs: ${obs}` : ''}
    `.replace(/\s+/g, ' ').trim();

    // Adiciona ao carrinho
    addToCart({
      name: `Bolo Personalizado (${weight}kg)`,
      details: detalhesFormatados,
      price: calculatedPrice,
      quantity: 1
    });

    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    
    // Limpa o form (opcional)
    setSelectedMassas([]);
    setSelectedRecheios([]);
    setSelectedCoberturas([]);
    setDataEntrega('');
    setObs('');
    setWeight(1.5);
  };

  return (
    <section id="confeitaria" className="bg-neutral-950 pt-0 pb-20 sm:pb-32 md:pb-48 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 sm:mb-24 lg:mb-32 space-y-6">
          <div className="flex items-center gap-4 sm:gap-10">
            <div className="h-[1px] w-12 sm:w-32 bg-amber-500/30"></div>
            <span className="text-2xl sm:text-4xl lg:text-5xl text-amber-500" style={{ fontFamily: "'Pinyon Script', cursive" }}>
              Bolos de Festa
            </span>
            <div className="h-[1px] w-12 sm:w-32 bg-amber-500/30"></div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[1] italic" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
              Confeitaria <br className="sm:hidden" /> <span className="text-amber-500">Personalizada</span>
            </h2>
            <p className="text-xs sm:text-base md:text-xl lg:text-2xl text-neutral-400 font-light tracking-tight max-w-3xl mx-auto leading-relaxed">
              Crie a celebração perfeita com sabores que contam a sua história.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button 
            onClick={() => { setIsModalOpen(true); document.body.style.overflow = 'hidden'; }}
            className="group relative overflow-hidden h-14 sm:h-20 md:h-24 px-12 sm:px-20 md:px-24 bg-amber-500 hover:bg-white transition-all duration-700 rounded-full shadow-2xl shadow-amber-500/20 active:scale-95 flex items-center justify-center"
          >
            <span className="relative z-10 text-xs sm:text-base md:text-xl font-black uppercase tracking-[0.3em] text-white group-hover:text-amber-600 transition-colors">Personalizar Bolo</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
          </button>
        </div>
      </div>

      {/* Build Cake Single-Page Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col animate-[fadeIn_0.4s_ease-out] overflow-hidden">
          {/* Modal Header */}
          <div className="h-16 sm:h-24 md:h-32 flex items-center justify-between px-6 sm:px-12 md:px-20 border-b border-white/5 bg-neutral-950/90 backdrop-blur-3xl z-50">
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs md:text-sm font-black text-amber-500 uppercase tracking-[0.4em]">Atelier Digital</span>
              <h4 className="text-xl sm:text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">Personalização <span className="text-amber-500">Exclusiva</span></h4>
            </div>
            <button 
              onClick={() => { setIsModalOpen(false); document.body.style.overflow = 'unset'; }}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/5 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-500 border border-white/10"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 sm:p-16 md:p-24 custom-scrollbar bg-neutral-950">
            <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24 pb-32">
              
              {/* Identificação e Peso */}
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-2 h-12 bg-amber-500 rounded-full"></div>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Detalhes do <span className="text-amber-500">Pedido</span></h3>
                </div>
                
                <div className="w-full space-y-6">
                  {/* Linha 1: Data e Periodo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
                    <div className="space-y-3">
                      <label className="text-[10px] sm:text-xs uppercase font-black text-neutral-500 tracking-[0.3em]">Data Especial</label>
                      <input 
                        type="date" 
                        value={dataEntrega}
                        onChange={(e) => setDataEntrega(e.target.value)}
                        className="w-full h-14 sm:h-20 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl px-4 sm:px-8 text-white focus:outline-none focus:border-amber-500 transition-all text-xs sm:text-sm font-bold invert-calendar-icon"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] sm:text-xs uppercase font-black text-neutral-500 tracking-[0.3em]">Melhor Período</label>
                      <div className="flex h-14 sm:h-20 gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl">
                        {['manhã', 'tarde', 'noite'].map(p => (
                          <button 
                            key={p}
                            onClick={() => setPeriodo(p)}
                            className={`flex-1 rounded-xl uppercase text-[8px] sm:text-[10px] md:text-xs font-black tracking-widest transition-all ${periodo === p ? 'bg-amber-500 text-white shadow-xl' : 'text-neutral-500 hover:text-white'}`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Linha 2: Peso e Preço Estimado */}
                  <div className="bg-neutral-900 border border-white/5 rounded-[2rem] p-6 sm:p-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-3">
                           <label className="text-[10px] sm:text-xs uppercase font-black text-amber-500 tracking-[0.3em]">Peso Desejado (Kg)</label>
                           <div className="relative">
                             <input 
                               type="number" 
                               min="1" 
                               step="0.5"
                               value={weight}
                               onChange={(e) => setWeight(Math.max(0.5, parseFloat(e.target.value) || 0))}
                               className="w-full h-14 sm:h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white text-xl font-bold focus:outline-none focus:border-amber-500 transition-all placeholder:text-neutral-700"
                             />
                             <span className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-500 font-bold text-sm">Kg</span>
                           </div>
                           <p className="text-[10px] text-neutral-500 font-medium ml-2">*Valor médio por Kg: {formatPrice(PRICE_PER_KG)}</p>
                        </div>

                        <div className="flex flex-col items-end justify-center space-y-2 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                           <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">Valor Estimado</span>
                           <span className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
                             {formatPrice(weight * PRICE_PER_KG)}
                           </span>
                           <span className="text-[10px] text-amber-500/80 uppercase font-bold tracking-wider">Preço sujeito a confirmação</span>
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Opções de Massas, Recheios e Coberturas */}
              {[
                { title: 'Massas', subtitle: 'Base', data: MASSAS, state: selectedMassas, setState: setSelectedMassas, color: 'text-amber-500' },
                { title: 'Recheios', subtitle: 'Gourmet', data: RECHEIOS, state: selectedRecheios, setState: setSelectedRecheios, color: 'text-white' },
                { title: 'Cobertura', subtitle: 'Arte Final', data: COBERTURAS, state: selectedCoberturas, setState: setSelectedCoberturas, color: 'text-amber-500' }
              ].map((section, idx) => (
                <div key={idx} className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-2 h-12 bg-amber-500 rounded-full"></div>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">{section.title} <span className={section.color}>{section.subtitle}</span></h3>
                  </div>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {section.data.map(item => (
                      <button
                        key={item}
                        onClick={() => toggleSelection(item, section.state, section.setState)}
                        className={`h-12 sm:h-16 px-6 sm:px-10 rounded-full border text-xs sm:text-sm md:text-base font-bold tracking-tight transition-all duration-500 flex items-center ${section.state.includes(item) ? 'bg-amber-500 border-amber-500 text-white shadow-2xl scale-105' : 'bg-white/5 border-white/10 text-neutral-500 hover:text-white hover:border-white/30'}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-8 items-center justify-between">
                <div className="space-y-4 max-w-xl text-center sm:text-left">
                  <p className="text-neutral-500 text-xs sm:text-base md:text-lg leading-relaxed font-light">
                    O valor final de <strong className="text-amber-500">{formatPrice(weight * PRICE_PER_KG)}</strong> será adicionado ao seu carrinho. Detalhes adicionais serão alinhados via WhatsApp.
                  </p>
                </div>
                <button 
                  onClick={handleSubmit} 
                  className="w-full sm:w-auto h-20 sm:h-24 md:h-28 px-12 sm:px-20 md:px-32 bg-amber-500 hover:bg-white text-white hover:text-amber-600 rounded-full font-black uppercase tracking-[0.2em] transition-all duration-700 shadow-3xl shadow-amber-500/30 active:scale-95 text-sm sm:text-xl md:text-2xl flex flex-col items-center justify-center gap-1"
                >
                  <span>Adicionar ao Carrinho</span>
                  <span className="text-[10px] sm:text-xs opacity-80 font-normal normal-case tracking-normal">
                    (Total: {formatPrice(weight * PRICE_PER_KG)})
                  </span>
                </button>
              </div>
            </div>
          </div>

          <style>{`
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .invert-calendar-icon::-webkit-calendar-picker-indicator { filter: invert(1); }
          `}</style>
        </div>
      )}
    </section>
  );
};
