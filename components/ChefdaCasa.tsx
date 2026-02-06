
import React from 'react';

export const ChefdaCasa: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-white/10">
              {/* Imagem do Chef Atualizada - Sem grayscale e sem bordas arredondadas */}
              <img 
                src="https://imglur.com/get/APSBIr.png" 
                alt="Chef Luiz A. Dos Santos" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent"></div>
            </div>
            
            {/* Decorative Frame - Square */}
            <div className="absolute -inset-4 border border-amber-500/20 -z-10 group-hover:scale-[1.02] transition-transform duration-700"></div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="h-[1px] w-12 bg-amber-500"></div>
                <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs">Gastronomia & Excelência</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white italic tracking-tighter leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Luiz A. <br />
                <span className="text-amber-500">Dos Santos</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-light text-justify lg:text-left">
                Luiz A. dos Santos, paulista naturalizado em Minas Gerais, iniciou sua trajetória na culinária atuando em diferentes empresas pelo Brasil. Ao longo dos anos, consolidou uma vasta experiência profissional, conquistando o título de Chef credenciado, com formação especializada na área.
              </p>
              <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-light text-justify lg:text-left">
                Teve participação em um dos programas gastronômicos mais renomados do país, o <span className="text-amber-500 font-bold">MasterChef</span>, e atualmente traz sua técnica e paixão pela cozinha para as terras de Minas, unindo tradição, sabor e excelência em cada prato.
              </p>
            </div>

            {/* Signature or decorative element */}
            <div className="pt-8 flex justify-center lg:justify-start opacity-60">
               <span className="text-4xl sm:text-5xl text-white/20" style={{ fontFamily: "'Pinyon Script', cursive" }}>Luiz Santos</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
