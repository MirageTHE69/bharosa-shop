'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { HindiDivider } from '@/components/HindiDivider';
import { TrustProcessSection } from '@/components/TrustProcessSection';
import { CategoryGridSection } from '@/components/CategoryGridSection';
import { FeaturedVendorsSection } from '@/components/FeaturedVendorsSection';
import { WhyBharosaSection } from '@/components/WhyBharosaSection';
import { VendorCalloutSection } from '@/components/VendorCalloutSection';
import { VerificationModal } from '@/components/VerificationModal';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { FEATURED_PRODUCTS, Category } from '@/data/bharosaData';
import { TrustSealBadge } from '@/components/TrustSealBadge';
import { ShoppingBag, Star, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: FEATURED_PRODUCTS[0], quantity: 1 },
    { product: FEATURED_PRODUCTS[1], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  const handleAddToCart = (productId: string) => {
    const existing = cartItems.find((item) => item.product.id === productId);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const prod = FEATURED_PRODUCTS.find((p) => p.id === productId) || FEATURED_PRODUCTS[0];
      setCartItems([...cartItems, { product: prod, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleAddCategoryToCart = (categoryName: string) => {
    const matched = FEATURED_PRODUCTS.find((p) => p.category.toLowerCase().includes(categoryName.toLowerCase())) || FEATURED_PRODUCTS[0];
    handleAddToCart(matched.id);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E4] text-[#1E2C1B]">
      
      {/* Navigation Header */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <HeroSection
          onShopClick={scrollToCategories}
          onVerifyClick={() => setIsVerifyModalOpen(true)}
        />

        {/* 2. Hindi Slogan Divider */}
        <HindiDivider
          phraseHi="मिट्टी से मेज़ तक"
          translationEn="From Soil to Table • Farm Traceability"
        />

        {/* 3. Trust & Verification Process */}
        <TrustProcessSection
          onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        />

        {/* 4. Featured Verified Products Spotlight */}
        <section className="py-16 bg-[#F6F1E4] border-b border-[#EFE6D0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center space-x-2 bg-[#EFE6D0] border border-[#D6C8A6] rounded-full px-3.5 py-1 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#E07A2E]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1E2C1B]">
                    Batch-Screened Specials
                  </span>
                </div>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1E2C1B]">
                  Featured Verified Harvests
                </h2>
                <div className="font-devanagari text-lg font-semibold text-[#2A5C31]">
                  “100% रसायन-मुक्त और प्रमाणित कार्बनिक उत्पाद”
                </div>
              </div>

              <button
                onClick={scrollToCategories}
                className="text-sm font-bold text-[#E07A2E] hover:underline flex items-center space-x-1"
              >
                <span>View All Categories</span>
                <span>→</span>
              </button>
            </div>

            {/* Featured Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#EFE6D0] rounded-2xl border-2 border-[#D6C8A6] hover:border-[#E07A2E] shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 bg-[#1E2C1B] overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <TrustSealBadge size="sm" showLabel={true} />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-[#1E2C1B]/80 text-[#F6F1E4] text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                        {prod.batchCode}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#1E2C1B]/70">
                        <span>{prod.weight}</span>
                        <span className="font-bold text-[#3F7D46]">{prod.vendorName}</span>
                      </div>

                      <h3 className="font-serif-display text-base font-bold text-[#1E2C1B] line-clamp-1 group-hover:text-[#E07A2E] transition-colors">
                        {prod.title}
                      </h3>

                      <div className="font-devanagari text-xs font-semibold text-[#2A5C31]">
                        {prod.hindiTitle}
                      </div>

                      <div className="bg-[#F6F1E4] p-2 rounded-xl border border-[#D6C8A6] text-[11px] space-y-1">
                        <div className="flex items-center space-x-1 text-[#3F7D46] font-bold">
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          <span>Pesticide Score: {prod.labPesticidePpm.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between border-t border-[#D6C8A6]/60 mt-2">
                    <div>
                      <span className="text-lg font-bold text-[#1E2C1B]">₹{prod.price}</span>
                      <span className="text-xs text-[#1E2C1B]/50 line-through ml-1.5">₹{prod.originalPrice}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(prod.id)}
                      className="px-3.5 py-1.5 bg-[#E07A2E] hover:bg-[#C4611E] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Basket</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Shop by Category Grid */}
        <CategoryGridSection
          onSelectCategory={(cat: Category) => {
            setSelectedCategoryFilter(cat.nameEn);
            scrollToCategories();
          }}
          onAddToCart={handleAddCategoryToCart}
        />

        {/* 6. Hindi Slogan Divider */}
        <HindiDivider
          phraseHi="शुद्ध, सुरक्षित और गुणवत्तापूर्ण"
          translationEn="100% Lab Verified • Zero Chemical Residue"
        />

        {/* 7. Featured Farmers & Artisans */}
        <FeaturedVendorsSection
          onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        />

        {/* 8. Why Bharosa (Value Propositions) */}
        <WhyBharosaSection />

        {/* 9. Become a Vendor Section */}
        <VendorCalloutSection
          isModalOpen={isSellerModalOpen}
          onOpenModal={() => setIsSellerModalOpen(true)}
          onCloseModal={() => setIsSellerModalOpen(false)}
        />

        {/* 10. Verified Customer Testimonials */}
        <section className="py-16 bg-[#EFE6D0]/60 border-t border-[#D6C8A6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
              <h2 className="font-serif-display text-3xl font-bold text-[#1E2C1B]">
                Trusted by 45,000+ Kitchens Across India
              </h2>
              <div className="font-devanagari text-base font-semibold text-[#3F7D46]">
                “ग्राहकों का भरोसा ही हमारी सबसे बड़ी शक्ति है”
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Ananya Deshmukh',
                  city: 'Mumbai',
                  quote: 'The Bilona A2 Gir Ghee smells exactly like the ghee my grandmother used to make in Kolhapur. Scanning the batch code gave us total peace of mind!',
                  product: 'A2 Vedic Bilona Ghee',
                },
                {
                  name: 'Dr. Vikramaditya Sharma',
                  city: 'New Delhi',
                  quote: 'As a nutritionist, zero-pesticide verification is crucial for my family. Bharosa Shop Lakadong Turmeric has over 7.5% curcumin verified by lab report.',
                  product: 'Lakadong High-Curcumin Turmeric',
                },
                {
                  name: 'Meera & Rajesh Nair',
                  city: 'Bengaluru',
                  quote: 'Directly supporting Wayanad tribal honey gatherers while receiving 100% raw unheated forest honey. Best organic platform in India!',
                  product: 'Wild Forest Raw Honey',
                },
              ].map((rev, i) => (
                <div key={i} className="bg-[#F6F1E4] p-6 rounded-2xl border border-[#D6C8A6] shadow-2xs space-y-3">
                  <div className="flex text-[#C79A3E]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#1E2C1B]/90 font-sans-body italic">
                    &quot;{rev.quote}&quot;
                  </p>
                  <div className="pt-2 border-t border-[#EFE6D0] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#1E2C1B]">{rev.name}</span>
                      <span className="text-[#1E2C1B]/60"> ({rev.city})</span>
                    </div>
                    <span className="font-semibold text-[#3F7D46]">{rev.product}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <VerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
      />

    </div>
  );
}
