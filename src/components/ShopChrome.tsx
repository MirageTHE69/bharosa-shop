'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { VerificationModal } from '@/components/VerificationModal';
import { SellerRegistrationModal } from '@/components/SellerRegistrationModal';
import { useAppShell } from '@/context/AppShellContext';
import type { ProfileRole, ProductWithVendor } from '@/types/database';

interface ShopChromeProps {
  children: React.ReactNode;
  user: { fullName: string | null; role: ProfileRole } | null;
  verifyProducts: ProductWithVendor[];
}

export function ShopChrome({ children, user, verifyProducts }: ShopChromeProps) {
  const {
    cartItems,
    cartCount,
    updateQuantity,
    removeItem,
    isCartOpen,
    openCart,
    closeCart,
    isVerifyModalOpen,
    openVerifyModal,
    closeVerifyModal,
    isSellerModalOpen,
    openSellerModal,
    closeSellerModal,
  } = useAppShell();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#24291F]">
      <Navbar
        cartCount={cartCount}
        onOpenCart={openCart}
        onOpenVerifyModal={openVerifyModal}
        onOpenSellerModal={openSellerModal}
        user={user}
      />

      <main className="flex-grow">{children}</main>

      <Footer onOpenVerifyModal={openVerifyModal} onOpenSellerModal={openSellerModal} />

      <VerificationModal
        isOpen={isVerifyModalOpen}
        onClose={closeVerifyModal}
        products={verifyProducts}
      />

      <SellerRegistrationModal
        isOpen={isSellerModalOpen}
        onClose={closeSellerModal}
        isSignedIn={!!user}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onOpenVerifyModal={openVerifyModal}
      />
    </div>
  );
}
