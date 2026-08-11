'use client';

import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';
import { Product } from '../data/bharosaData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenVerifyModal: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenVerifyModal,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 79;
  const total = subtotal + (items.length > 0 ? shippingCost : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1E2C1B]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-[#F6F1E4] text-[#1E2C1B] shadow-2xl flex flex-col justify-between border-l-2 border-[#E07A2E]">
          
          {/* Header */}
          <div className="bg-[#1E2C1B] text-[#F6F1E4] p-5 flex items-center justify-between border-b border-[#E07A2E]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#E07A2E]" />
              <h3 className="font-serif-display text-lg font-bold text-white">
                Your Verified Basket ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10"
              aria-label="Close Cart Drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#EFE6D0] px-5 py-3 border-b border-[#D6C8A6] text-xs">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center space-x-1.5 font-bold text-[#3F7D46]">
                <Truck className="w-4 h-4" />
                <span>🎉 Congratulations! You qualify for FREE Direct Farm Shipping!</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-[#1E2C1B]">
                  <span>Add ₹{freeShippingThreshold - subtotal} more for FREE Shipping</span>
                  <span>₹{subtotal} / ₹{freeShippingThreshold}</span>
                </div>
                <div className="w-full h-2 bg-[#D6C8A6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E07A2E] transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE6D0] border-2 border-[#D6C8A6] flex items-center justify-center mx-auto text-[#1E2C1B]/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif-display text-lg font-bold text-[#1E2C1B]">
                    Your basket is empty
                  </h4>
                  <p className="text-xs text-[#1E2C1B]/70 mt-1">
                    Explore our verified categories for pure Lakadong turmeric, A2 ghee, and wild raw honey.
                  </p>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-[#EFE6D0] rounded-2xl p-3.5 border border-[#D6C8A6] flex space-x-3 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 rounded-xl object-cover border border-[#D6C8A6] shrink-0"
                  />

                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif-display text-sm font-bold text-[#1E2C1B] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#1E2C1B]/40 hover:text-red-600 p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs font-devanagari text-[#2A5C31] font-semibold">
                      {item.product.hindiTitle}
                    </div>

                    <div className="text-[11px] font-mono text-[#E07A2E] font-bold">
                      Batch: {item.product.batchCode}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2 border border-[#D6C8A6] rounded-lg bg-[#F6F1E4] px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="font-bold text-sm text-[#1E2C1B] hover:text-[#E07A2E]"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="font-bold text-sm text-[#1E2C1B] hover:text-[#E07A2E]"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-bold text-sm text-[#1E2C1B]">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 bg-[#EFE6D0] border-t border-[#D6C8A6] space-y-4">
              
              <div className="space-y-1.5 text-xs text-[#1E2C1B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Direct Farm Shipping</span>
                  <span className="font-bold">
                    {isFreeShipping ? <span className="text-[#3F7D46]">FREE</span> : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-[#D6C8A6]">
                  <span>Total Payable</span>
                  <span className="text-[#E07A2E]">₹{total}</span>
                </div>
              </div>

              {/* Verified Guarantee Callout */}
              <div className="bg-[#F6F1E4] p-2.5 rounded-xl border border-[#3F7D46] flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#3F7D46] shrink-0" />
                  <span className="font-semibold text-[#1E2C1B]">100% Lab Tested Guarantee</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenVerifyModal();
                  }}
                  className="text-[11px] font-bold text-[#E07A2E] hover:underline"
                >
                  Verify Batch
                </button>
              </div>

              <button
                onClick={() => alert('Order Placed Successfully! Bharosa Verified Farm Receipt generated.')}
                className="w-full py-3.5 bg-[#E07A2E] hover:bg-[#C4611E] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
