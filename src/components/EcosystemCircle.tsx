'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cog,
  Leaf,
  HeartHandshake,
  ShieldCheck,
  Globe2,
  Users2,
  Sprout,
  TrendingUp,
  Award,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export interface EcosystemPillar {
  id: number;
  num: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  category: string;
}

export const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  {
    id: 1,
    num: '01',
    title: 'Professionalizing meat production',
    shortDesc: 'Modernizing practices with advanced engineering & strict bio-security.',
    fullDesc: 'Standardized benchmarks, automated climate-controlled facilities, and rigorous protocols to elevate meat processing industry-wide.',
    icon: Cog,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    category: 'Production'
  },
  {
    id: 2,
    num: '02',
    title: 'Adopting an integrated & sustainable model',
    shortDesc: 'Circular farm-to-fork ecosystem optimizing resources and zero wastage.',
    fullDesc: 'Closing the loop across feed management, livestock welfare, energy-efficient processing, and organic byproduct conversion.',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    category: 'Sustainability'
  },
  {
    id: 3,
    num: '03',
    title: 'Ensuring humane treatment of animals',
    shortDesc: 'Compassionate handling adhering to ethical veterinary standards.',
    fullDesc: 'Prioritizing ethical care, stress-free environments, continuous vet inspections, and humane protocols throughout every phase.',
    icon: HeartHandshake,
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1200&q=80',
    category: 'Animal Welfare'
  },
  {
    id: 4,
    num: '04',
    title: 'Upholding Halal practices in production',
    shortDesc: 'Strict 100% Halal integrity audited and certified by recognized authorities.',
    fullDesc: 'Dedicated Islamic slaughter protocols, certified supervisors, segregated sanitation, and end-to-end supply chain purity assurance.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=80',
    category: 'Halal Certified'
  },
  {
    id: 5,
    num: '05',
    title: 'Supplying safe-to-eat meat products',
    shortDesc: 'Uncompromising food safety with zero chemical adulteration or antibiotics.',
    fullDesc: 'Multiple microbiological lab checkpoints, automated temperature verification, and tamper-evident sterile packaging.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    category: 'Food Safety'
  },
  {
    id: 6,
    num: '06',
    title: 'Catering to domestic & global markets',
    shortDesc: 'World-class export-grade standards reaching homes and culinary chefs everywhere.',
    fullDesc: 'Seamless cold-chain logistics linking local farming hubs to international export requirements across the Middle East and worldwide.',
    icon: Globe2,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    category: 'Logistics'
  },
  {
    id: 7,
    num: '07',
    title: 'Supporting social economic development',
    shortDesc: 'Generating rural prosperity, dependable livelihood, and skill enhancement.',
    fullDesc: 'Empowering local farmers, logistic operators, and rural communities through structured employment, fair pricing, and training.',
    icon: Users2,
    image: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80',
    category: 'Social Impact'
  },
  {
    id: 8,
    num: '08',
    title: 'Committing to environmental protection',
    shortDesc: 'Renewable energy adoption, biological water recycling, & green conservation.',
    fullDesc: 'Investing in rooftop solar generation, advanced wastewater treatment plants (ETP), and zero landfill biodegradable packing goals.',
    icon: Sprout,
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    category: 'Environment'
  },
  {
    id: 9,
    num: '09',
    title: 'Empowering entrepreneurs through a win-win format',
    shortDesc: 'Fostering franchise and vendor partners with turnkey operational support.',
    fullDesc: 'Creating thriving micro-entrepreneurs through our butchery franchise networks, standardized retail systems, and transparent profit-sharing.',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    category: 'Growth'
  },
  {
    id: 10,
    num: '10',
    title: 'Delivering long-term value to stakeholders',
    shortDesc: 'Accountable corporate governance ensuring sustainable growth and consumer trust.',
    fullDesc: 'Creating durable resilience for consumers, team members, farmers, and investors through principled, ethical stewardship.',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    category: 'Governance'
  }
];

export default function EcosystemCircle() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activePillar = ECOSYSTEM_PILLARS[activeIndex];

  // Auto-advance
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ECOSYSTEM_PILLARS.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ECOSYSTEM_PILLARS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ECOSYSTEM_PILLARS.length) % ECOSYSTEM_PILLARS.length);
  };

  return (
    <section className="relative w-full bg-[#FCFCF9] py-14 sm:py-20 lg:py-24 overflow-hidden select-none border-y border-[#EAE9E2]">
      <div className="max-w-[1580px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        
        {/* TOP BAR: Clean Title with Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#E3E2D8]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8DC541] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#064823]">
                10 Core Commitments
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-barlow-condensed tracking-tight uppercase leading-none">
              <span className="text-[#064823]">WE ARE </span>
              <span className="text-[#8DC541]">MEATIN</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500 font-mono">
              <strong className="text-[#064823] text-base">{activePillar.num}</strong> / 10
            </span>
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#064823] hover:text-white text-slate-700 border border-slate-200 flex items-center justify-center transition-all duration-200 shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 h-10 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 shadow-sm"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#064823]" /> : <Play className="w-3.5 h-3.5 text-[#064823]" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#064823] hover:text-white text-slate-700 border border-slate-200 flex items-center justify-center transition-all duration-200 shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT: IMAGE ON LEFT (5 COLS), CONTENT ON RIGHT (7 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT: Dynamic Focal Showcase Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] max-w-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-900 group">
              
              {/* Dynamic Image with Smooth Crossfade & Zoom */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activePillar.image}
                    alt={activePillar.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Number Watermark in Background */}
              <div className="absolute top-4 right-6 text-white/15 font-black text-8xl sm:text-9xl font-barlow-condensed pointer-events-none select-none">
                {activePillar.num}
              </div>

              {/* Bottom Spotlight Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3 z-10 text-white">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-[#8DC541] text-[#064823] text-xs font-black uppercase tracking-wider">
                    {activePillar.category}
                  </span>
                  <span className="text-xs text-white/70 font-mono font-medium">
                    Commitment #{activePillar.num}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1.5"
                  >
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-barlow text-white tracking-tight leading-tight">
                      {activePillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed line-clamp-3">
                      {activePillar.fullDesc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Micro Progress Bar */}
                <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mt-3">
                  <motion.div
                    key={activePillar.id}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.5, ease: 'linear' }}
                    className="h-full bg-[#8DC541]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Connected Commitments Matrix (2 Columns of 5 items) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Active Detail Header Callout */}
            <div className="bg-white rounded-2xl p-5 border border-[#8DC541]/40 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#064823] text-[#8DC541] flex items-center justify-center text-xl font-extrabold font-barlow-condensed shrink-0 shadow-md">
                {activePillar.num}
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8DC541]">
                    Active Selection
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#064823] leading-snug">
                  {activePillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activePillar.shortDesc}
                </p>
              </div>
            </div>

            {/* 10 Interactive Commitment Tiles (Clean 2-column layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ECOSYSTEM_PILLARS.map((pillar, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`group text-left p-3.5 rounded-xl transition-all duration-200 border flex items-center gap-3.5 w-full relative ${
                      isActive
                        ? 'bg-[#064823] border-[#064823] text-white shadow-lg shadow-[#064823]/15 scale-[1.01]'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {/* Number Indicator */}
                    <span
                      className={`text-xl font-black font-barlow-condensed leading-none shrink-0 transition-colors ${
                        isActive ? 'text-[#8DC541]' : 'text-slate-300 group-hover:text-[#064823]'
                      }`}
                    >
                      {pillar.num}
                    </span>

                    {/* Title */}
                    <span
                      className={`text-xs sm:text-[13px] font-bold leading-snug flex-1 transition-colors line-clamp-2 ${
                        isActive ? 'text-white' : 'text-slate-700 group-hover:text-[#064823]'
                      }`}
                    >
                      {pillar.title}
                    </span>

                    {/* Active Icon Indicator */}
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#8DC541] shrink-0 animate-ping" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

