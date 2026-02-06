
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { items, removeFromCart, total, isCartOpen, toggleCart, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pix');

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    if (!name || !address) {
      alert("Por favor, preencha seu nome e endereço.");
      return;
    }

    const date = new Date().toLocaleDateString('pt-BR');
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Construção da mensagem estilo Cupom Fiscal
    let message = `*NOVO PEDIDO - SITE* 🧾\n`;
    message += `${date} - ${time}\n`;
    message += `--------------------------------\n`;
    message += `*MINEIRINHO*\n`;
    message += `RESTAURANTE & CONFEITARIA\n`;
    message += `--------------------------------\n\n`;

    message += `*DADOS DO CLIENTE:*\n`;
    message += `Nome: *${name}*\n`;
    message += `Endereço: \n${address}\n`;
    message += `--------------------------------\n\n`;

    message += `*ITENS DO PEDIDO:*\n\n`;

    items.forEach((item, index) => {
      // Linha do item: Qtd x Nome
      message += `*${item.quantity}x ${item.name}*\n`;
      
      // Detalhes (se houver) recuados
      if (item.details) {
        // Limpa espaços extras e quebras de linha dos detalhes para ficar compacto
        const cleanDetails = item.details.replace(/\s+/g, ' ').trim();
        message += `   ( ${cleanDetails} )\n`;
      }
      
      // Preço do item (unitário * qtd)
      message += `   Valor: ${formatPrice(item.price * item.quantity)}\n`;
      message += `- - - - - - - - - - - - - - - -\n`;
    });

    message += `\n--------------------------------\n`;
    message += `*RESUMO DO PAGAMENTO:*\n`;
    message += `Forma: *${paymentMethod}*\n`;
    message += `\n*TOTAL A PAGAR: ${formatPrice(total)}*\n`;
    message += `--------------------------------\n\n`;
    message += `✅ _Pedido gerado via Website_`;

    const phoneNumber = "5531971858407";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    clearCart();
    toggleCart();
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={toggleCart}
        className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/40 hover:scale-110 hover:bg-white hover:text-amber-500 text-white transition-all duration-300 group"
      >
        <div className="relative">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-neutral-900">
              {items.length}
            </span>
          )}
        </div>
      </button>

      {/* Backdrop */}
      {isCartOpen && (
        <div 
          onClick={toggleCart} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] transition-opacity animate-[fadeIn_0.3s]"
        ></div>
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-neutral-900 border-l border-white/10 shadow-2xl z-[100] transform transition-transform duration-500 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-neutral-950">
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Seu <span className="text-amber-500">Pedido</span></h2>
          <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Items List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4 opacity-50">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="text-sm font-medium uppercase tracking-widest">Seu carrinho está vazio</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white/5 rounded-2xl p-4 flex justify-between gap-4 border border-white/5 animate-[fadeIn_0.3s]">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm uppercase tracking-tight">{item.name}</h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{item.details}</p>
                  <p className="text-amber-500 font-bold text-sm mt-2">{formatPrice(item.price)}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="h-8 w-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        <div className="p-6 bg-neutral-950 border-t border-white/10 space-y-6">
          {/* Summary */}
          <div className="flex justify-between items-end border-b border-white/10 pb-4">
            <span className="text-neutral-400 uppercase text-xs font-bold tracking-widest">Total do Pedido</span>
            <span className="text-3xl font-black text-amber-500">{formatPrice(total)}</span>
          </div>

          {/* Form */}
          <div className="space-y-4">
             <input 
               type="text" 
               placeholder="Seu Nome" 
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none placeholder:text-neutral-600 font-medium"
             />
             <input 
               type="text" 
               placeholder="Endereço Completo (Rua, Nº, Bairro)" 
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none placeholder:text-neutral-600 font-medium"
             />
             
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">Pagamento</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Pix', 'Cartão', 'Dinheiro'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 rounded-lg text-xs font-bold uppercase transition-all ${paymentMethod === method ? 'bg-amber-500 text-white shadow-lg' : 'bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
             </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleCheckout}
            disabled={items.length === 0}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${items.length === 0 ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white shadow-xl hover:shadow-green-500/20 active:scale-95'}`}
          >
            <span>Solicitar Pedido</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #171717; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #404040; border-radius: 4px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
};
