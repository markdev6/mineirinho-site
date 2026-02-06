
import React from 'react';
import { Navbar } from './Navbar';
import WeeklyOffers from './WeeklyOffers';
import Refeicoes from './Refeicoes';
import { ChefdaCasa } from './ChefdaCasa';
import { Pizzas } from './Pizzas';
import { Bebidas } from './Bebidas';
import { Confeitaria } from './Confeitaria';
import { PromotionBanner } from './PromotionBanner';
import { Footer } from './Footer';
import { CartProvider } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';

export const EmptySite: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-neutral-950">
        <Navbar />
        
        {/* Full Width Hero Carousel Section */}
        <WeeklyOffers />

        {/* Meals Grid Section */}
        <Refeicoes />

        {/* Specific Promotional Banner Section */}
        <PromotionBanner />

        {/* Pizzas Grid Section */}
        <Pizzas />

        {/* Drinks Horizontal Section */}
        <Bebidas />

        {/* Confeitaria Section */}
        <Confeitaria />

        {/* Chef Section */}
        <ChefdaCasa />

        {/* Professional Footer */}
        <Footer />

        {/* Shopping Cart Drawer & Button */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
};
