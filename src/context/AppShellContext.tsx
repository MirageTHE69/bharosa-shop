'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import type { CartItem } from '@/components/CartDrawer';
import type { Product } from '@/types/database';

interface AppShellContextValue {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  isVerifyModalOpen: boolean;
  openVerifyModal: () => void;
  closeVerifyModal: () => void;

  isSellerModalOpen: boolean;
  openSellerModal: () => void;
  closeSellerModal: () => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function AppShellProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const value: AppShellContextValue = {
    cartItems,
    cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
    addToCart,
    updateQuantity,
    removeItem,

    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),

    isVerifyModalOpen,
    openVerifyModal: () => setIsVerifyModalOpen(true),
    closeVerifyModal: () => setIsVerifyModalOpen(false),

    isSellerModalOpen,
    openSellerModal: () => setIsSellerModalOpen(true),
    closeSellerModal: () => setIsSellerModalOpen(false),
  };

  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>;
}

export function useAppShell() {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error('useAppShell must be used within AppShellProvider');
  return ctx;
}
