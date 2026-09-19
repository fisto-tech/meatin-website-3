'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface CountryItem {
  name: string;
  flag: string;
}

const COUNTRIES: CountryItem[] = [
  { name: 'Indonesia', flag: '/AboutUs/countries-serve/flag-images/indonesia.webp' },
  { name: 'Kuwait', flag: '/AboutUs/countries-serve/flag-images/kuwait.webp' },
  { name: 'Qatar', flag: '/AboutUs/countries-serve/flag-images/qatar.webp' },
  { name: 'Egypt', flag: '/AboutUs/countries-serve/flag-images/egypt.webp' },
  { name: 'Bahrain', flag: '/AboutUs/countries-serve/flag-images/bahrain.webp' },
  { name: 'Lebanon', flag: '/AboutUs/countries-serve/flag-images/lebanon.webp' },
  { name: 'Jordan', flag: '/AboutUs/countries-serve/flag-images/jordan.webp' },
  { name: 'Myanmar', flag: '/AboutUs/countries-serve/flag-images/myanmar.webp' },
  { name: 'Maldives', flag: '/AboutUs/countries-serve/flag-images/maldives.webp' },
  { name: 'Oman', flag: '/AboutUs/countries-serve/flag-images/oman.webp' },
  { name: 'Thailand', flag: '/AboutUs/countries-serve/flag-images/thailand.webp' },
  { name: 'Philippines', flag: '/AboutUs/countries-serve/flag-images/philippines.webp' },
  { name: 'UAE', flag: '/AboutUs/countries-serve/flag-images/uae.webp' },
  { name: 'Vietnam', flag: '/AboutUs/countries-serve/flag-images/vietnam.webp' },
  { name: 'Singapore', flag: '/AboutUs/countries-serve/flag-images/singapore.webp' },
  { name: 'Saudi Arabia', flag: '/AboutUs/countries-serve/flag-images/saudi-arabia.webp' },
  { name: 'Iran', flag: '/AboutUs/countries-serve/flag-images/iran.webp' },
  { name: 'Uzbekistan', flag: '/AboutUs/countries-serve/flag-images/uzbekistan.webp' },
];

export default function CountriesWeServeSection() {
  return (
    <section className="relative w-full bg-[#FBFDF8] py-12 sm:py-16 lg:py-[5vw] overflow-hidden select-none">
      
      {/* Background Subtle Organic Curved Pattern (as seen in mockup background) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 900" fill="none">
          <path d="M-50 150 C 300 50, 450 300, 800 120 C 1150 -60, 1300 200, 1500 100" stroke="#E1EBD5" strokeWidth="1.5" fill="none" strokeDasharray="4 6" opacity="0.6" />
          <path d="M100 800 C 400 650, 600 850, 1000 700 C 1300 580, 1400 750, 1550 720" stroke="#E1EBD5" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="150" cy="280" r="18" stroke="#E5EEE0" strokeWidth="1.2" fill="none" opacity="0.6" />
          <circle cx="1250" cy="350" r="24" stroke="#E5EEE0" strokeWidth="1.2" fill="none" opacity="0.6" />
          <circle cx="450" cy="850" r="28" stroke="#E5EEE0" strokeWidth="1.2" fill="none" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-[4vw] relative z-10 w-full">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-0">
          
          {/* LEFT COLUMN: Headings, Flags Grid Card & Bottom 3 Highlights */}
          <div className="lg:col-span-6 xl:col-span-6 z-20">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-[0.5vw] mb-1.5 lg:mb-[0.4vw]">
              <span className="w-5 sm:w-6 lg:w-[1.6vw] h-[2px] lg:h-[0.16vw] bg-[#CF9A16]" />
              <span className="text-[11px] sm:text-xs lg:text-[0.78vw] font-bold tracking-[0.24em] text-[#CF9A16] uppercase font-manrope">
                FROM OUR FARM TO THE WORLD
              </span>
            </div>

            {/* Main Title */}
            <h2 className="font-extrabold font-barlow-condensed tracking-normal leading-[0.92] text-5xl sm:text-6xl lg:text-[4.6vw]">
              <span className="text-[#1F5A3C] block">FRESHNESS</span>
              <span className="text-[#F58408] block uppercase">ACROSS THE WORLD</span>
            </h2>

            {/* Subtitle description */}
            <p className="text-[#2D2D2D] font-medium leading-snug mt-2.5 lg:mt-[0.6vw] text-sm sm:text-base lg:text-[1.12vw] max-w-sm sm:max-w-md lg:max-w-[28vw]">
              Trusted in 18+ Countries, Serving Healthy Chicken to Families Around the Globe.
            </p>

            {/* Small decorative line #8DC541 */}
            <div className="w-9 sm:w-11 lg:w-[3vw] h-[3px] lg:h-[0.22vw] bg-[#8DC541] rounded-full mt-3 lg:mt-[0.8vw] mb-6 lg:mb-[1.8vw]" />

            {/* Countries Flag Holding Card (#EAF8D0) */}
            <div 
              style={{
                backgroundColor: '#EAF8D0',
                boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.05)',
              }}
              className="rounded-2xl sm:rounded-3xl lg:rounded-[1.2vw] p-4 sm:p-6 lg:p-[1.4vw] max-w-xl lg:max-w-[34vw]"
            >
              <div className="grid grid-cols-6 gap-x-2 sm:gap-x-3 lg:gap-x-[0.6vw] gap-y-3 sm:gap-y-4 lg:gap-y-[0.8vw] items-center justify-items-center">
                {COUNTRIES.map((country, idx) => (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.02 }}
                    className="flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    {/* Flag Image */}
                    <div className="relative w-9 h-6 sm:w-11 sm:h-7 lg:w-[2.7vw] lg:h-[1.7vw] rounded-md sm:rounded-lg lg:rounded-[0.35vw] overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.12)] border border-black/5 group-hover:scale-110 transition-transform duration-200">
                      <Image
                        src={country.flag}
                        alt={country.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Country Name */}
                    <span className="text-[9px] sm:text-[10px] lg:text-[0.65vw] font-bold text-[#2D2D2D] mt-1 lg:mt-[0.3vw] leading-tight tracking-tight">
                      {country.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3 Bottom Highlights Row: High Quality | Trusted Globally | Healthy Families */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-[1.8vw] mt-6 sm:mt-8 lg:mt-[2vw]">
              
              {/* Highlight 1: High Quality */}
              <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-[0.6vw]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[3vw] lg:h-[3vw] rounded-full bg-[#D4FFE3] flex items-center justify-center shrink-0 shadow-sm">
                  <Icon icon="bxs:leaf" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[1.4vw] lg:h-[1.4vw] text-[#01511C]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D]">High</span>
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D]">Quality</span>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-[1.2px] h-8 sm:h-9 lg:h-[2vw] bg-[#2D2D2D]/15" />

              {/* Highlight 2: Trusted Globally */}
              <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-[0.6vw]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[3vw] lg:h-[3vw] rounded-full bg-[#D4FFE3] flex items-center justify-center shrink-0 shadow-sm">
                  <Icon icon="icon-park-solid:protect" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[1.4vw] lg:h-[1.4vw] text-[#01511C]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D]">Trusted</span>
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D]">Globally</span>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-[1.2px] h-8 sm:h-9 lg:h-[2vw] bg-[#2D2D2D]/15" />

              {/* Highlight 3: Healthy Families */}
              <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-[0.6vw]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[3vw] lg:h-[3vw] rounded-full bg-[#D4FFE3] flex items-center justify-center shrink-0 shadow-sm">
                  <Icon icon="famicons:people" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[1.4vw] lg:h-[1.4vw] text-[#01511C]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D]">Healthy</span>
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D]">Families</span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Globe Background, Airplane Flight Path & Packed Products in Foreground */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-[38vw]">
            
            {/* Dotted Flight Path Curve with Airplane */}
            <div className="absolute -top-4 sm:-top-8 lg:-top-[2vw] left-0 sm:left-4 lg:-left-[1vw] z-30 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative flex items-center"
              >
                {/* Airplane Image */}
                <div className="relative w-14 h-10 sm:w-20 sm:h-14 lg:w-[5.2vw] lg:h-[3.6vw] drop-shadow-md">
                  <Image
                    src="/AboutUs/countries-serve/airplane-image.webp"
                    alt="MEATiN Global Airplane"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>

            {/* Svg Flight Path Dashed Line arching to the globe */}
            <svg 
              className="absolute top-2 sm:top-4 lg:top-[1vw] left-6 sm:left-12 lg:left-[2.5vw] w-[260px] sm:w-[380px] lg:w-[28vw] h-[80px] sm:h-[120px] lg:h-[9vw] pointer-events-none z-20"
              viewBox="0 0 400 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M 10 100 C 120 10, 260 20, 390 110" 
                stroke="#064823" 
                strokeWidth="2" 
                strokeDasharray="4 6" 
                opacity="0.75" 
              />
            </svg>

            {/* Globe Map with Location Marker Pins */}
            <div className="relative w-[340px] sm:w-[480px] md:w-[540px] lg:w-[38vw] aspect-square flex items-center justify-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/AboutUs/countries-serve/globe-image.webp"
                  alt="MEATiN World Serving Destinations"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>

            {/* Foreground Packed Chicken Products Stack (Docked at bottom center-right) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-[1vw] right-0 sm:right-4 lg:right-[1vw] w-[320px] sm:w-[450px] md:w-[500px] lg:w-[36vw] z-20 pointer-events-none"
            >
              <Image
                src="/AboutUs/countries-serve/packed-product.webp"
                alt="MEATiN I'm Your Chicken Packed Products"
                width={800}
                height={550}
                priority
                className="w-full h-auto object-contain drop-shadow-2xl block"
              />
            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}
