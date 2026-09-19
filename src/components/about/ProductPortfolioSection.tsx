'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { ArrowRight } from 'lucide-react';

interface PortfolioCategory {
  title: string;
  desc: string;
  icon: string;
  iconBg: string;
  cardBg: string;
  arrowBg: string;
  image: string;
  imageAlt: string;
  href: string;
}

const CATEGORIES: PortfolioCategory[] = [
  {
    title: 'Fresh Meat',
    desc: 'Scientifically slaughtered and hygienically cleaned meat for immediate distribution.',
    icon: 'boxicons:meat',
    iconBg: '#1A5C38',
    cardBg: '#EDF5EC',
    arrowBg: '#D6E8D3',
    image: '/AboutUs/portfolio/fresh-meat.webp',
    imageAlt: 'Fresh Meat',
    href: '/product',
  },
  {
    title: 'Chilled Meat',
    desc: 'Temperature-controlled meat stored at 4°C with a shelf life of up to 72 hours.',
    icon: 'carbon:temperature-max',
    iconBg: '#BC581A',
    cardBg: '#F8F1E5',
    arrowBg: '#F1DFC9',
    image: '/AboutUs/portfolio/chilled-meat.webp',
    imageAlt: 'Chilled Meat',
    href: '/product',
  },
  {
    title: 'Frozen Meat',
    desc: 'Maintained between -18°C to -20°C with a shelf life of up to 9 months.',
    icon: 'ion:snow-outline',
    iconBg: '#2E6E9E',
    cardBg: '#EAF3F9',
    arrowBg: '#D1E6F4',
    image: '/AboutUs/portfolio/frozen-meat.webp',
    imageAlt: 'Frozen Meat',
    href: '/product',
  },
  {
    title: 'Value-Added Products',
    desc: 'Ready-to-cook & processed products including burger patties, nuggets, sausages, and specialty cuts.',
    icon: 'streamline-plump:burger',
    iconBg: '#648E32',
    cardBg: '#EDF5E7',
    arrowBg: '#D7E9CD',
    image: '/AboutUs/portfolio/value-added-products.webp',
    imageAlt: 'Value-Added Products',
    href: '/product',
  },
];

export default function ProductPortfolioSection() {
  return (
    <section className="relative w-full bg-[#FAFDF5] py-10 sm:py-14 lg:py-[4.5vw] overflow-hidden select-none">
      {/* Decorative Organic Vector Background Doodles matching mockup */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
          fill="none"
        >
          {/* Top curve */}
          <path
            d="M-30 180 C 280 60, 480 320, 840 120 C 1180 -50, 1340 220, 1500 110"
            stroke="#DCE9CF"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="6 8"
          />
          {/* Bottom swirl & decorative lines */}
          <path
            d="M60 840 C 360 670, 560 880, 960 720 C 1280 600, 1380 800, 1540 730"
            stroke="#DCE9CF"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="160" cy="280" r="22" stroke="#E2EED4" strokeWidth="2" fill="none" />
          <circle cx="1280" cy="360" r="30" stroke="#E2EED4" strokeWidth="2" fill="none" />
          <path
            d="M1360 620 C 1420 640, 1450 700, 1420 740 C 1390 780, 1340 760, 1350 710"
            stroke="#E2EED4"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Floating Fresh Green Leaves Accent from mockup (Right edge) */}
      <div className="absolute top-[32%] right-[-1%] w-20 sm:w-24 lg:w-[6.8vw] aspect-[3/4] pointer-events-none z-10 opacity-90 drop-shadow-sm">
        <Image
          src="/AboutUs/portfolio/leaves-img.webp"
          alt="Fresh leaves decoration"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5vw] relative z-10 w-full">
        
        {/* TOP SECTION: Left Hero Image Card & Right Headings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center mb-10 sm:mb-12 lg:mb-[3vw]">
          
          {/* Left Column: Hero Meat Board Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-6"
          >
            <div className="relative w-full aspect-[16/8.8] rounded-2xl sm:rounded-3xl lg:rounded-[1.8vw] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.06)] border-[3px] border-white group bg-[#F5F8F2]">
              <Image
                src="/AboutUs/portfolio/product-portfolio.webp"
                alt="MEATiN Product Portfolio - Fresh Chicken Cuts"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right Column: Heading, Subtitle & CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-start lg:pl-2 xl:pl-6"
          >
            <h2 className="font-barlow font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-[4vw] leading-[0.98]">
              <span className="text-[#0B4D26] block">PRODUCT</span>
              <span className="text-[#F37321] block">PORTFOLIO</span>
            </h2>

            <p className="mt-3.5 sm:mt-4 lg:mt-[1.1vw] text-slate-700 text-sm sm:text-base lg:text-[1.02vw] leading-relaxed max-w-xl font-medium">
              Quality meat products, processed and packed with care to ensure freshness, safety and grate taste.
            </p>

            <Link
              href="/product"
              className="mt-6 sm:mt-7 lg:mt-[1.6vw] inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#163823] hover:bg-[#0B4D26] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 hover:gap-3.5 group cursor-pointer"
            >
              <span>Explore our products</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>

        {/* BOTTOM SECTION: 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-5 xl:gap-[1.4vw]">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="h-full"
            >
              <Link
                href={cat.href}
                style={{ backgroundColor: cat.cardBg }}
                className="group relative flex flex-col justify-between h-full min-h-[350px] sm:min-h-[370px] lg:min-h-[21.5vw] rounded-2xl sm:rounded-3xl lg:rounded-[1.4vw] p-5 sm:p-6 lg:p-[1.4vw] border border-white/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer"
              >
                {/* Top: Icon + Title + Description */}
                <div>
                  {/* Round Category Icon */}
                  <div
                    style={{ backgroundColor: cat.iconBg }}
                    className="w-13 h-13 sm:w-14 sm:h-14 lg:w-[3.4vw] lg:h-[3.4vw] rounded-full flex items-center justify-center text-white shadow-sm mb-4 sm:mb-5 lg:mb-[1.2vw] transition-transform duration-300 group-hover:scale-105"
                  >
                    <Icon icon={cat.icon} className="w-7 h-7 sm:w-8 sm:h-8 lg:w-[1.9vw] lg:h-[1.9vw]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-barlow font-bold text-lg sm:text-xl lg:text-[1.25vw] text-[#1E3B27] tracking-tight mb-2 sm:mb-2.5 leading-snug">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-700 text-xs sm:text-[13px] lg:text-[0.82vw] leading-relaxed font-normal">
                    {cat.desc}
                  </p>
                </div>

                {/* Bottom Row: Circular Arrow Button (Left) & Platter Plate Image (Right) */}
                <div className="relative flex items-end justify-between mt-6 pt-2">
                  
                  {/* Circular Arrow Button */}
                  <div
                    style={{ backgroundColor: cat.arrowBg }}
                    className="w-9 h-9 sm:w-10 sm:h-10 lg:w-[2.4vw] lg:h-[2.4vw] rounded-full flex items-center justify-center text-slate-800 transition-all duration-300 group-hover:scale-110 shrink-0 z-10"
                  >
                    <ArrowRight className="w-4 h-4 lg:w-[1vw] lg:h-[1vw] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>

                  {/* Meat Platter Plate Image */}
                  <div className="relative w-32 sm:w-36 lg:w-[9.2vw] aspect-square shrink-0 -mr-3 -mb-3 transition-transform duration-500 ease-out group-hover:scale-105">
                    <Image
                      src={cat.image}
                      alt={cat.imageAlt}
                      fill
                      className="object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.16)]"
                    />
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
