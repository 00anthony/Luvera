'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "What's actually in the moisturizer?",
    answer: (
      <>
        Luvera Men's Moisturizer is a lightweight daily formula built to hydrate deeply without
        feeling heavy or greasy. Key ingredients include <span className="text-white">soothing aloe</span> and
        a blend of skin-supporting actives that help calm irritation and strengthen your skin barrier —
        leaving your face smooth, balanced, and refreshed. It absorbs fast, so you can apply it in
        the morning or straight after shaving with zero fuss.
      </>
    ),
  },
  {
    id: 2,
    question: "What free bonuses come with my order?",
    answer: (
      <ul className="space-y-4">
        {[
          {
            title: 'Cooling Face Roller',
            desc: 'Refresh and de-puff your skin while boosting moisturizer absorption.',
          },
          {
            title: "Men's Skin Reset Guide",
            desc: 'A simple framework for better skin through easy daily habits.',
          },
          {
            title: 'Skin Ingredient Decoder',
            desc: 'Understand what common skincare ingredients actually do so you can make smarter choices.',
          },
        ].map(({ title, desc }) => (
          <li key={title} className="flex gap-3">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <span className="text-white font-medium">{title}</span>
              {' — '}
              {desc}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 3,
    question: 'How long does shipping take?',
    answer: (
      <>
        <p className="mb-4">
          All orders ship free. Processing takes <span className="text-white">1–2 business days</span>,
          and you'll get a tracking link as soon as your package leaves our facility.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { region: 'USA',                   time: '4–6 business days'   },
            { region: 'UK',                    time: '6–9 business days'   },
            { region: 'Australia & Canada',    time: '7–10 business days'  },
            { region: 'Europe',                time: '7–10 business days'  },
            { region: 'Rest of world',         time: '12–16 business days' },
          ].map(({ region, time }) => (
            <div
              key={region}
              className="flex flex-col gap-0.5 bg-white/0.03 border border-white/5 rounded-xl px-4 py-3"
            >
              <span className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold">{region}</span>
              <span className="text-white text-sm font-medium">{time}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 4,
    question: "What if it doesn't work for me?",
    answer: (
      <>
        Try Luvera risk-free for <span className="text-white">90 days</span>. If you're not happy with
        how your skin looks and feels, send it back for a full refund — no questions asked.
        We stand behind the product completely.
      </>
    ),
  },
  {
    id: 5,
    question: 'Can I use it after shaving?',
    answer: (
      <>
        Absolutely — it's one of the best times to apply it. The formula is designed to
        calm post-shave irritation and replenish moisture that shaving strips away.
        The fast-absorbing texture means no residue, no shine, just settled skin.
      </>
    ),
  },
  {
    id: 6,
    question: 'Is it suitable for sensitive skin?',
    answer: (
      <>
        Yes. The formula was built with sensitivity in mind — aloe and the barrier-supporting
        actives work together to reduce redness and calm reactive skin. If you have a known
        allergy to a specific ingredient, check the full ingredient list on the product page
        before ordering.
      </>
    ),
  },
];

// ─── Single accordion row ─────────────────────────────────────────────────────
function FAQRow({ item, isOpen, onToggle }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.07]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span
          className={`font-medium text-base md:text-lg transition-colors duration-300 ${
            isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'
          }`}
        >
          {item.question}
        </span>

        {/* Plus rotates to × when open */}
        <span
          className="shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor:     isOpen ? 'rgb(192 132 252 / 0.6)' : 'rgba(255,255,255,0.1)',
            backgroundColor: isOpen ? 'rgb(192 132 252 / 0.1)' : 'transparent',
            color:           isOpen ? 'rgb(192 132 252)'        : 'rgba(255,255,255,0.4)',
            transform:       isOpen ? 'rotate(45deg)'           : 'rotate(0deg)',
          }}
        >
          <Plus className="w-4 h-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 text-white/50 text-sm md:text-base leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => setOpenId(prev => (prev === id ? null : id));

  // Split into two columns on desktop
  const half    = Math.ceil(FAQS.length / 2);
  const colLeft  = FAQS.slice(0, half);
  const colRight = FAQS.slice(half);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-400 text-sm font-bold tracking-[0.4em] uppercase">
              Got Questions?
            </span>
            <h2 className="text-5xl md:text-8xl font-serif italic mt-2 text-white tracking-tighter">
              We've got answers.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 max-w-xs text-sm md:text-base italic leading-relaxed"
          >
            Everything you need to know before you commit to better skin.
          </motion.p>
        </div>

        {/* Two-column accordion on md+, single column on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 md:gap-x-16"
        >
          {/* Left column */}
          <div>
            {colLeft.map(item => (
              <FAQRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>

          {/* Right column */}
          <div>
            {colRight.map(item => (
              <FAQRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6
                     border border-white/0.06 rounded-2xl px-8 py-7 bg-white/0.02"
        >
          <div>
            <p className="text-white font-medium">Still have a question?</p>
            <p className="text-white/40 text-sm mt-0.5">Our team usually replies within a few hours.</p>
          </div>
          <a
            href="mailto:support@luveralotion.com"
            className="shrink-0 px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase
                       transition-all duration-300 hover:opacity-90"
            style={{
              background: 'rgb(192 132 252 / 0.15)',
              border:     '1px solid rgb(192 132 252 / 0.3)',
              color:      'rgb(192 132 252)',
            }}
          >
            Contact Support
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;