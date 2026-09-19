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
    <section className="relative w-full bg-[#F4F4EA] overflow-hidden flex flex-col justify-end pt-10 sm:pt-14 lg:pt-[3.6vw] pb-0 select-none">
      
      {/* Background Factory Facility Building Image - Half height on desktop docked top right */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-full lg:w-[68vw] h-full lg:h-[58%] opacity-65 lg:opacity-100">
          <Image
            src="/AboutUs/infrastructure/infrastructure-background-building.webp"
            alt="MEATiN Infrastructure Facility"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle soft gradient fade into #F4F4EA from the left and bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F4EA] via-[#F4F4EA]/90 lg:via-[#F4F4EA]/40 via-[30%] to-transparent" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-[#F4F4EA] via-transparent to-transparent" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-[3.6vw] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end">
          
          {/* LEFT COLUMN: Headings & 9 Pill Items */}
          <div className="lg:col-span-5 pb-6 sm:pb-10 lg:pb-[2.8vw] z-10">
            
            {/* Eyebrow & Main Headings */}
            <div className="mb-3.5 sm:mb-5 lg:mb-[1.5vw]">
              {/* Eyebrow label with left line */}
              <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-[0.5vw] mb-1.5 lg:mb-[0.4vw]">
                <span className="w-4 sm:w-6 lg:w-[1.4vw] h-[2px] lg:h-[0.16vw] bg-[#D4A437]" />
                <span className="text-[11px] sm:text-xs lg:text-[0.72vw] font-bold tracking-[0.24em] text-[#D4A437] uppercase font-manrope">
                  OUR INFRASTURCTURE
                </span>
              </div>

              {/* Main Titles */}
              <h2 className="font-extrabold font-barlow-condensed tracking-normal leading-[0.9] text-5xl sm:text-6xl lg:text-[4.6vw]">
                <span className="text-[#1F5A3C] block">MEAT<span className="lowercase">i</span>N</span>
                <span className="text-[#F58408] block uppercase">COMPONENTS</span>
              </h2>

              {/* Subheading text */}
              <p className="text-slate-800 font-medium leading-snug mt-2 lg:mt-[0.55vw] text-sm sm:text-base lg:text-[1.12vw] max-w-sm sm:max-w-md lg:max-w-[24vw]">
                An integrated ecosystem designed for safe, scalable and sustainable meat production.
              </p>
            </div>

            {/* 9 Component Capsule Pills - Extends right to gracefully tuck behind worker's blue crate */}
            <div className="space-y-2 sm:space-y-2.5 lg:space-y-[0.55vw] max-w-lg lg:max-w-none lg:w-[37.5vw] relative z-10">
              {COMPONENTS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.035 }}
                  style={{
                    backgroundColor: '#F9FCF7',
                    border: '1.21768px solid #EEF4EE',
                    boxShadow: '0px 2px 6.7px rgba(0, 0, 0, 0.25)',
                    borderRadius: '164.387px',
                  }}
                  className="w-full py-1.5 sm:py-2 lg:py-[0.44vw] pl-3.5 sm:pl-4 lg:pl-[1.1vw] pr-4 sm:pr-6 lg:pr-[2.5vw] flex items-center gap-3 sm:gap-3.5 lg:gap-[0.9vw] transition-all duration-200 group cursor-default"
                >
                  {/* Dark Green Icon with #063D26 */}
                  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[1.25vw] lg:h-[1.25vw] flex items-center justify-center shrink-0 text-[#063D26] group-hover:scale-110 transition-transform duration-200">
                    <Icon
                      icon={item.icon}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Component Title with slightly increased font size and clean normal/medium weight */}
                  <span className="text-[14px] sm:text-[15.5px] lg:text-[1.1vw] font-medium text-slate-800 tracking-normal leading-none whitespace-nowrap">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Meat Worker & 2 Stacked Photo Cards */}
          <div className="lg:col-span-7 relative flex items-end justify-center lg:justify-end z-20">
            
            {/* Center-Right: Meat Worker holding blue crate - Shifted left to cover/hide the ends of the cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative z-20 w-[330px] sm:w-[440px] md:w-[500px] lg:w-[43vw] h-auto pointer-events-none lg:mr-[17vw] xl:mr-[19vw] -mb-1 lg:-ml-[15vw]"
            >
              <Image
                src="/AboutUs/infrastructure/infrastructure-person.webp"
                alt="MEATiN Professional Quality Specialist"
                width={700}
                height={900}
                priority
                className="w-full h-auto object-contain block drop-shadow-2xl"
              />
            </motion.div>

            {/* Far-Right: 2 Stacked Rounded Photo Cards */}
            <div className="hidden md:flex flex-col gap-3.5 sm:gap-4 lg:gap-[1.3vw] absolute right-0 top-[45%] lg:top-[53%] -translate-y-1/2 z-30 pointer-events-auto">
              
              {/* Card 1: Processing Line with Workers */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="relative w-[180px] sm:w-[210px] lg:w-[15.5vw] aspect-[16/10] rounded-2xl sm:rounded-3xl lg:rounded-[1.5vw] overflow-hidden shadow-xl border-[3px] lg:border-[0.22vw] border-white group bg-slate-100"
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
                className="relative w-[180px] sm:w-[210px] lg:w-[15.5vw] aspect-[16/10] rounded-2xl sm:rounded-3xl lg:rounded-[1.5vw] overflow-hidden shadow-xl border-[3px] lg:border-[0.22vw] border-white group bg-slate-100"
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


