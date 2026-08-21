'use client';

import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '@/types/database';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#24291F]/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">

        <div className="w-screen max-w-md bg-[#FBF9F4] text-[#24291F] shadow-xl flex flex-col justify-between">

          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-[#E7E0CE]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="font-serif-display text-lg font-bold">
                Your Basket ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-[#6B7263] hover:text-[#24291F] rounded-full hover:bg-[#F4EEE1]"
              aria-label="Close Cart Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F4EEE1] px-5 py-3 border-b border-[#E7E0CE] text-xs">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center space-x-1.5 font-semibold text-[#3F7D46]">
                <Truck className="w-4 h-4" />
                <span>You qualify for FREE Direct Farm Shipping!</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between font-medium text-[#24291F]">
                  <span>Add ₹{freeShippingThreshold - subtotal} more for FREE Shipping</span>
                  <span>₹{subtotal} / ₹{freeShippingThreshold}</span>
                </div>
                <div className="w-full h-1.5 bg-[#E7E0CE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3F7D46] transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#F4EEE1] flex items-center justify-center mx-auto text-[#6B7263]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-bold text-[#24291F]">
                    Your basket is empty
                  </h4>
                  <p className="text-xs text-[#6B7263] mt-1">
                    Explore our verified categories for pure Lakadong turmeric, A2 ghee, and wild raw honey.
                  </p>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl p-3 border border-[#E7E0CE] flex space-x-3"
                >
                  <img
                    src={item.product.image_url ?? DEFAULT_PRODUCT_IMAGE}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-[#24291F] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#6B7263] hover:text-red-600 p-0.5 shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-[#6B7263]">
                      Batch: {item.product.batch_code}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2 border border-[#E7E0CE] rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="font-bold text-sm text-[#24291F] hover:text-[#C4611E]"
                        >
                          -
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="font-bold text-sm text-[#24291F] hover:text-[#C4611E]"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-semibold text-sm text-[#24291F]">
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
            <div className="p-5 bg-[#F4EEE1] border-t border-[#E7E0CE] space-y-4">

              <div className="space-y-1.5 text-xs text-[#24291F]">
                <div className="flex justify-between">
                  <span className="text-[#6B7263]">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7263]">Direct Farm Shipping</span>
                  <span className="font-semibold">
                    {isFreeShipping ? <span className="text-[#3F7D46]">FREE</span> : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-[#E7E0CE]">
                  <span>Total Payable</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#3F7D46] shrink-0" />
                  <span className="font-medium text-[#24291F]">100% Lab Tested Guarantee</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenVerifyModal();
                  }}
                  className="text-[11px] font-semibold text-[#3F7D46] hover:underline"
                >
                  Verify Batch
                </button>
              </div>

              <button
                onClick={() => alert('Order Placed Successfully! Bharosa Verified Farm Receipt generated.')}
                className="w-full py-3 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center space-x-2"
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
