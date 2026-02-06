import React from 'react';
import { APP_CONFIG } from '../constants';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950">
      <div className="relative flex flex-col items-center gap-8">
        {/* Glow de fundo */}
        <div className="absolute inset-0 bg-amber-500/10 blur-[120px] rounded-full scale-150 animate-pulse"></div>
        
        {/* Logo Pulsante */}
        <div className="relative animate-soft-pulse flex flex-col items-center gap-8">
          <div className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
            <img 
              src={APP_CONFIG.LOGO_URL} 
              alt="Logo" 
              className="w-full h-full object-contain brightness-110"
            />
          </div>
          
          {/* Barra de Progresso Simples */}
          <div className="h-0.5 w-32 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
             <div className="h-full bg-amber-500 animate-[loading_3s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes soft-pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-soft-pulse {
          animation: soft-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};