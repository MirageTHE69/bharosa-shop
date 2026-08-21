'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'Is Bharosa Shop’s ghee really lab tested?',
    answer:
      'Yes. Every batch of our A2 Bilona ghee is screened by NABL-accredited labs for 230+ chemical pesticides and purity markers before it’s listed. Each product carries a QR batch code you can scan to view the full lab report.',
  },
  {
    question: 'How do I sell my organic products on Bharosa Shop?',
    answer:
      'Apply for Verified Seller status from the homepage or footer. Our team assists with NABL lab testing, and once approved you get zero listing commission for your first 90 days plus direct bi-weekly payouts.',
  },
  {
    question: 'What does the Bharosa Verified Seal mean?',
    answer:
      'The Bharosa Verified Seal is only awarded to vendors and products that pass our 3-step farm vetting system, including independent lab testing for chemical residues and full farm-to-table traceability.',
  },
  {
    question: 'Does Bharosa Shop deliver across India?',
    answer:
      'Yes, we ship pan-India from our verified farmer network, with cold-chain handling for perishables like ghee and honey where required.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FBF9F4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46]">
            Common Questions
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-[#E7E0CE] border-t border-b border-[#E7E0CE]">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold text-[#24291F]">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-[#6B7263] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-sm text-[#6B7263] leading-relaxed pb-5 pr-8">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
