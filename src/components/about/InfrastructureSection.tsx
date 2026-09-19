'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface ComponentItem {
  id: string;
  name: string;
  icon: string;
}

const COMPONENTS: ComponentItem[] = [
  {
    id: '01',
    name: 'Large animal slaughterhouse',
    icon: 'healthicons:animal-cow',
  },
  {
    id: '02',
    name: 'Small animal slaughterhouse',
    icon: 'openmoji:goat',
  },
  {
    id: '03',
    name: 'Poultry processing unit',
    icon: 'cbi:chicken',
  },
  {
    id: '04',
    name: 'Rendering plant',
    icon: 'clarity:factory-solid',
  },
  {
    id: '05',
    name: 'Lairages',
    icon: 'material-symbols-light:warehouse',
  },
  {
    id: '06',
    name: '200 KLD ETP',
    icon: 'griddy-icons:water-drop-filled',
  },
  {
    id: '07',
    name: 'Biogas plant',
    icon: 'f7:flame-fill',
  },
  {
    id: '08',
    name: 'Biofilter plant',
    icon: 'ph:plant-fill',
  },
  {
    id: '09',
    name: 'Freezing & cold storage units',
    icon: 'emojione-monotone:snowflake',
  },
];

export default function InfrastructureSection() {
  return (
    <section className="relative w-full bg-[#F8F9EE] pt-12 sm:pt-16 lg:pt-20 pb-0 overflow-hidden min-h-[640px] sm:min-h-[720px] lg:min-h-[760px] xl:min-h-[820px] flex flex-col justify-end">
      
      {/* Background Factory Facility Building Image - Docked right side with soft left fade */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[68%] xl:w-[64%] 2xl:w-[60%] h-full opacity-60 lg:opacity-90">
          <Image
            src="/AboutUs/infrastructure/infrastructure-background-building.webp"
            alt="MEATiN Infrastructure Facility"
            fill
            priority
            className="object-cover object-right-bottom"
          />
          {/* Subtle soft gradient fade into #F8F9EE from the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F9EE] via-[#F8F9EE]/90 lg:via-[#F8F9EE]/50 to-transparent" />
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          
          {/* LEFT COLUMN: Headings & 9 Pill Items (5 cols) */}
          <div className="lg:col-span-5 pb-10 sm:pb-12 lg:pb-16 space-y-5 sm:space-y-6 z-20">
            
            {/* Eyebrow & Main Headings */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-6 sm:w-8 h-[2.5px] bg-[#CF9A16]" />
                <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#CF9A16] uppercase font-manrope">
                  OUR INFRASTURCTURE
                </span>
              </div>

              <h2 className="text-5xl sm:text-6xl lg:text-[58px] xl:text-[66px] 2xl:text-[74px] font-extrabold font-barlow-condensed tracking-tight leading-[0.92]">
                <span className="text-[#1F5A3C] block">MEAT<span className="lowercase">i</span>N</span>
                <span className="text-[#F58408] block uppercase">COMPONENTS</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium max-w-md pt-1 leading-snug">
                An integrated ecosystem designed for safe, scalable and sustainable meat production.
              </p>
            </div>

            {/* 9 Component Capsule Pills with increased text sizes and icon padding */}
            <div className="space-y-2.5 sm:space-y-3 max-w-lg">
              {COMPONENTS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="flex items-center gap-3 group"
                >
                  {/* Green Circular Icon Badge (Replacing Numbers) */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1F5A3C] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110">
                    <Icon
                      icon={item.icon}
                      className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white"
                    />
                  </div>

                  {/* Connecting dashed line stub */}
                  <div className="w-3 sm:w-4 border-t-2 border-dashed border-[#1F5A3C]/40 shrink-0" />

                  {/* White Pill Button with larger font */}
                  <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-full py-2.5 px-4.5 sm:px-5 flex items-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-white hover:border-[#1F5A3C]/30 transition-all duration-200 hover:shadow-md">
                    <span className="text-sm sm:text-[15.5px] lg:text-base font-bold text-slate-800 tracking-tight leading-none truncate">
                      {item.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Meat Worker & 2 Stacked Photo Cards (7 cols) */}
          <div className="lg:col-span-7 relative flex items-end justify-center lg:justify-end">
            
            {/* Center-Right: Meat Worker holding blue crate - FLUSH TO BOTTOM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative z-20 w-[300px] sm:w-[400px] md:w-[450px] lg:w-[480px] xl:w-[530px] 2xl:w-[570px] h-auto pointer-events-none lg:mr-28 xl:mr-36 -mb-1"
            >
              <Image
                src="/AboutUs/infrastructure/infrastructure-person.webp"
                alt="MEATiN Professional Quality Specialist"
                width={700}
                height={900}
                priority
                className="w-full h-auto object-contain block drop-shadow-xl"
              />
            </motion.div>

            {/* Far-Right: 2 Stacked Rounded Photo Cards */}
            <div className="hidden md:flex flex-col gap-4 lg:gap-5 absolute right-0 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
              
              {/* Card 1: Processing Line with Hanging Poultry / Meat */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="relative w-[170px] sm:w-[200px] lg:w-[210px] xl:w-[240px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-[3px] border-white group"
              >
                <Image
                  src="/AboutUs/infrastructure/infrastructure-card-1.webp"
                  alt="MEATiN Processing Facility"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>

              {/* Card 2: Cold Storage Warehouse Racks */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="relative w-[170px] sm:w-[200px] lg:w-[210px] xl:w-[240px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-[3px] border-white group"
              >
                <Image
                  src="/AboutUs/infrastructure/infrastructure-card-2.webp"
                  alt="MEATiN Cold Storage Units"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
