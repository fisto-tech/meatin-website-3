'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Eye, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  ThermometerSnowflake, 
  CheckCircle2,
  Layers,
  Utensils,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { 
  CHICKEN_PARTS, 
  PART_GLB_MAP, 
  PART_RECIPES_MAP,
  ChickenPartData 
} from '@/data/knowYourMeatData';

type ProductCategory = 'all' | 'chicken' | 'mutton' | 'beef' | 'specialty';

interface ProductItem {
  id: string;
  name: string;
  category: 'chicken' | 'mutton' | 'beef' | 'specialty';
  categoryLabel: string;
  badge?: string;
  weight: string;
  pouchImg: string;
  platterImg?: string;
  desc: string;
  detailedDesc: string;
  cookingMethods: string[];
  nutrition: {
    protein: string;
    calories: string;
    fat: string;
    carbs: string;
  };
  storage: string;
  idealFor: string;
}

// 18 Products from the original created product catalog
const PRODUCTS: ProductItem[] = [
  // CHICKEN CUTS
  {
    id: 'chicken-breast',
    name: 'Fresh Chicken Breast',
    category: 'chicken',
    categoryLabel: 'Fresh Chicken',
    badge: 'High Protein',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/breast.webp',
    platterImg: '/Product/Chicken/Platters/breast.webp',
    desc: 'Lean, skinless & boneless fillets. The healthiest cut packed with high quality natural protein.',
    detailedDesc: 'Tender, juicy, and 100% trimmed chicken breast fillets without skin or bone. Sourced from antibiotic-free poultry and vacuum-chilled to lock in fresh moisture and essential amino acids.',
    cookingMethods: ['Grilling', 'Pan Searing', 'Salads', 'Diet Meal Prep'],
    nutrition: { protein: '23.0 g', calories: '165 kcal', fat: '3.6 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Fitness diets, grilled fillets, continental salads and stir-fries.',
  },
  {
    id: 'chicken-drumstick',
    name: 'Juicy Chicken Drumsticks',
    category: 'chicken',
    categoryLabel: 'Fresh Chicken',
    badge: 'Best Seller',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/drumstick.webp',
    platterImg: '/Product/Chicken/Platters/drumstick.webp',
    desc: 'Tender and flavorful bone-in drumsticks. Naturally juicy and rich in flavor for roasting and curries.',
    detailedDesc: 'Expertly butchered drumsticks with bone-in succulent meat that stays exceptionally moist and juicy when cooked. Ideal for marination, crispy frying, and slow-simmered rich curries.',
    cookingMethods: ['Tandoor / Roast', 'Deep Frying', 'Kerala Curry', 'Biryani'],
    nutrition: { protein: '20.4 g', calories: '160 kcal', fat: '7.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Tandoori chicken, biryani pieces, and spicy South Indian fry.',
  },
  {
    id: 'chicken-thigh',
    name: 'Prime Chicken Thighs',
    category: 'chicken',
    categoryLabel: 'Fresh Chicken',
    badge: 'Tender & Moist',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/thigh.webp',
    platterImg: '/Product/Chicken/Platters/thigh.webp',
    desc: 'Flavorful bone-in chicken thighs that hold deep moisture and deliver unbeatable aroma.',
    detailedDesc: 'Chicken thighs are revered by chefs for their generous fat-to-meat ratio and tender texture that never dries out during cooking. Perfect for stews, curries, and oven bakes.',
    cookingMethods: ['Slow Curry', 'Oven Bake', 'Biryani', 'BBQ Grill'],
    nutrition: { protein: '18.0 g', calories: '209 kcal', fat: '15.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Dum Biryani, slow-cooked gravies, and braised chicken delicacies.',
  },
  {
    id: 'chicken-wings',
    name: 'Crispy Chicken Wings',
    category: 'chicken',
    categoryLabel: 'Fresh Chicken',
    badge: 'Party Starter',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/wings.webp',
    platterImg: '/Product/Chicken/Platters/wings.webp',
    desc: 'Plump and clean wingettes with skin, crafted for crispy appetizers and spicy glazed party snacks.',
    detailedDesc: 'Carefully trimmed whole wing sections ready to take on dry rubs, marinades, or fiery glazes. Crisp up beautifully on the grill, oven, or air fryer.',
    cookingMethods: ['Air Fry', 'Deep Fry', 'Barbecue', 'Glazed Bake'],
    nutrition: { protein: '18.5 g', calories: '203 kcal', fat: '14.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Hot buffalo wings, honey chili wings, and game day snacks.',
  },
  {
    id: 'whole-chicken-skin',
    name: 'Whole Chicken (With Skin)',
    category: 'chicken',
    categoryLabel: 'Fresh Chicken',
    badge: 'Classic Roast',
    weight: '1.0 kg - 1.2 kg',
    pouchImg: '/Product/Chicken/FullChicken/withskin.webp',
    platterImg: '/Product/Chicken/FullChicken/withskin.webp',
    desc: 'Completely dressed whole bird with skin intact. Golden crisp roast skin and succulent inner meat.',
    detailedDesc: 'Hygienically dressed and cleaned broiler chicken with clean skin retained. The skin insulates the meat while cooking, rendering its natural juices to ensure extreme succulence.',
    cookingMethods: ['Whole Roast', 'Rotisserie', 'Barbecue', 'Broth Base'],
    nutrition: { protein: '19.5 g', calories: '215 kcal', fat: '14.5 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Sunday whole chicken roast, rotisserie, and tandoori whole bird.',
  },
  {
    id: 'whole-chicken-skinless',
    name: 'Whole Chicken (Skinless)',
    category: 'chicken',
    categoryLabel: 'Fresh Chicken',
    badge: 'Lean & Clean',
    weight: '900g - 1.1 kg',
    pouchImg: '/Product/Chicken/FullChicken/withoutskin.webp',
    platterImg: '/Product/Chicken/FullChicken/withoutskin.webp',
    desc: 'Cleanly skinned and dressed whole chicken, ideal for family curries and custom kitchen butchery.',
    detailedDesc: 'Thoroughly gutted, cleaned, and deskin-processed under strict sanitary conditions. Cut it into curry pieces at home or cook whole for a lower-calorie flavorful meal.',
    cookingMethods: ['Home Butchery', 'Traditional Curry', 'Soup Stew', 'Roasting'],
    nutrition: { protein: '21.0 g', calories: '175 kcal', fat: '8.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Traditional South Indian curry cuts, pepper chicken, and stews.',
  },
  {
    id: 'chicken-drumette',
    name: 'Chicken Drumettes',
    category: 'chicken',
    categoryLabel: 'Fresh Chicken',
    badge: 'Snack Favorite',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/drumette.webp',
    platterImg: '/Product/Chicken/Platters/drumette.webp',
    desc: 'Meaty upper wing cuts shaped like mini drumsticks. Highly popular for lollipop & finger food.',
    detailedDesc: 'The meatiest part of the wing, offering pure tender chicken on a convenient small bone. Great for lollipop preparations, glazed skewers, and finger snacks.',
    cookingMethods: ['Chicken Lollipop', 'Deep Fry', 'Air Fry', 'Pan Roast'],
    nutrition: { protein: '19.0 g', calories: '170 kcal', fat: '9.5 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Chicken lollipops, starters, and kid-friendly crispy bites.',
  },
  {
    id: 'chicken-liver',
    name: 'Nutrient Chicken Liver',
    category: 'specialty',
    categoryLabel: 'Specialty Cuts',
    badge: 'Iron & Vitamins',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/liver.webp',
    platterImg: '/Product/Chicken/Platters/liver.webp',
    desc: 'Silky smooth, iron-rich chicken liver cuts. Delicate texture with earthy, authentic gourmet richness.',
    detailedDesc: 'Carefully trimmed and washed chicken liver, exceptionally high in iron, vitamin A, and B vitamins. Cooks quickly to a tender, melt-in-the-mouth texture.',
    cookingMethods: ['Pepper Fry', 'Dry Roast', 'Masala Gravy', 'Pâté'],
    nutrition: { protein: '17.2 g', calories: '119 kcal', fat: '4.8 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 24-48 hours.',
    idealFor: 'Spicy Kerala liver roast, pepper fry, and iron-boosting curries.',
  },
  {
    id: 'chicken-gizzard',
    name: 'Fresh Chicken Gizzard',
    category: 'specialty',
    categoryLabel: 'Specialty Cuts',
    badge: 'Firm Texture',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/gizzard.webp',
    platterImg: '/Product/Chicken/Platters/gizzard.webp',
    desc: 'Clean, firm and muscular gizzard cuts. Becomes meltingly tender and rich with slow braising.',
    detailedDesc: 'Thoroughly sanitized and trimmed gizzards for traditional connoisseurs. Dense muscular texture that develops rich depth of flavor during slow cooking.',
    cookingMethods: ['Slow Braise', 'Pressure Cook Curry', 'Dry Fry', 'Pickle'],
    nutrition: { protein: '18.0 g', calories: '94 kcal', fat: '2.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Spicy gizzard masala, bar bites, and traditional country gravies.',
  },
  {
    id: 'chicken-back',
    name: 'Chicken Back & Broth Cuts',
    category: 'specialty',
    categoryLabel: 'Specialty Cuts',
    badge: 'Rich Collagen',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/back.webp',
    platterImg: '/Product/Chicken/Platters/back.webp',
    desc: 'Clean-cut chicken backs loaded with marrow and gelatin. The gold standard for bone broths.',
    detailedDesc: 'Rich in bone marrow, collagen, and healthy fats. Simmer for hours with aromatics to produce golden, gut-healing chicken bone broth and silky ramen soups.',
    cookingMethods: ['Bone Broth', 'Soup Stock', 'Pressure Stew', 'Base Gravy'],
    nutrition: { protein: '15.0 g', calories: '220 kcal', fat: '17.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Nutritious chicken bone broth, medicinal soups, and rich stocks.',
  },
  {
    id: 'chicken-heart',
    name: 'Tender Chicken Hearts',
    category: 'specialty',
    categoryLabel: 'Specialty Cuts',
    badge: 'Lean Superfood',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/heart.webp',
    platterImg: '/Product/Chicken/Platters/heart.webp',
    desc: 'Firm, clean chicken hearts. High in CoQ10 and lean protein, superb for skewers and stir-fries.',
    detailedDesc: 'Trimmed hearts with excess fat removed. Naturally firm texture with rich mineral profile. A culinary favorite for flame-grilled yakitori and sautéed appetizers.',
    cookingMethods: ['Flame Skewers', 'Stir Fry', 'Pepper Sauté', 'Braising'],
    nutrition: { protein: '16.0 g', calories: '150 kcal', fat: '9.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Yakitori style skewers, garlic pepper roast, and hearty stir fries.',
  },
  {
    id: 'chicken-neck',
    name: 'Chicken Neck Pieces',
    category: 'specialty',
    categoryLabel: 'Specialty Cuts',
    badge: 'Deep Flavor',
    weight: '500g',
    pouchImg: '/Product/Chicken/packed-meat/neck.webp',
    platterImg: '/Product/Chicken/Platters/neck.webp',
    desc: 'Bone-in cuts that infuse deep natural chicken essence into homestyle gravies and stocks.',
    detailedDesc: 'Trimmed neck portions that release rich natural gelatin while cooking. Highly sought-after for thickening and enhancing traditional home curries.',
    cookingMethods: ['Slow Curry', 'Bone Soup', 'Village Masala', 'Stock'],
    nutrition: { protein: '16.0 g', calories: '180 kcal', fat: '12.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Spicy homestyle gravies, soup bases, and slow simmering.',
  },

  // MUTTON & GOAT
  {
    id: 'goat-curry-cut',
    name: 'Premium Goat Curry Cut',
    category: 'mutton',
    categoryLabel: 'Mutton & Goat',
    badge: 'Chef Choice',
    weight: '500g / 1kg',
    pouchImg: '/Product/GoatBeef/goat.webp',
    platterImg: '/Product/GoatBeef/goat.webp',
    desc: 'Tender bone-in & boneless goat cubes. Raised on natural pastures for gentle, sweet meat texture.',
    detailedDesc: 'Carefully butchered from young, healthy pasture-raised goats. Balanced mix of meat-to-bone pieces that soften to perfection under slow cooking, imparting unforgettable aroma.',
    cookingMethods: ['Slow Handi Curry', 'Kerala Mutton Roast', 'Rogan Josh', 'Korma'],
    nutrition: { protein: '20.6 g', calories: '143 kcal', fat: '3.0 g', carbs: '0 g' },
    storage: 'Store chilled at 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Traditional Mutton Curry, Nadan Mutton Roast, and festive meals.',
  },
  {
    id: 'goat-biryani-cut',
    name: 'Tender Goat Biryani Cut',
    category: 'mutton',
    categoryLabel: 'Mutton & Goat',
    badge: 'Biryani Special',
    weight: '1.0 kg',
    pouchImg: '/Product/GoatBeef/goat-image.webp',
    platterImg: '/Product/GoatBeef/goat-image.webp',
    desc: 'Larger, succulently marbled goat cuts created specifically for authentic slow dum biryani.',
    detailedDesc: 'Selected prime cuts including shoulder, leg, and rib pieces sized generously so they remain ultra-juicy and melt in your mouth through 60+ minutes of authentic dum cooking.',
    cookingMethods: ['Dum Biryani', 'Kuzhimanthi', 'Slow Stew', 'Yakhni Pulao'],
    nutrition: { protein: '21.2 g', calories: '155 kcal', fat: '4.2 g', carbs: '0 g' },
    storage: 'Store chilled at 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Thalassery Biryani, Hyderabadi Dum Biryani, and ceremonial feasts.',
  },
  {
    id: 'goat-ribs-chops',
    name: 'Goat Ribs & Tender Chops',
    category: 'mutton',
    categoryLabel: 'Mutton & Goat',
    badge: 'Prime Cut',
    weight: '500g',
    pouchImg: '/Product/GoatBeef/goat-img.webp',
    platterImg: '/Product/GoatBeef/goat-img.webp',
    desc: 'Succulent goat chops with rich bone marrow and tender ribbon meat. Magnificent on the grill.',
    detailedDesc: 'Exquisite rib chops hand-cut by master butchers. The surrounding bone and marrow infuse incredible depth while roasting or pan-searing with rosemary and black pepper.',
    cookingMethods: ['Pan Sear', 'Charcoal Grill', 'Chops Masala', 'Oven Roast'],
    nutrition: { protein: '19.8 g', calories: '168 kcal', fat: '6.5 g', carbs: '0 g' },
    storage: 'Store chilled at 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Mutton chops fry, tawa chops, and barbecue grill feasts.',
  },

  // BEEF & BUFFALO
  {
    id: 'beef-curry-cut',
    name: 'Prime Beef Curry Cut',
    category: 'beef',
    categoryLabel: 'Prime Beef',
    badge: 'Kerala Favorite',
    weight: '500g / 1kg',
    pouchImg: '/Product/GoatBeef/beef.webp',
    platterImg: '/Product/GoatBeef/beef.webp',
    desc: 'Rich, bold beef cubes with the perfect meat-to-fat balance for authentic Kerala beef roast.',
    detailedDesc: 'Derived from certified healthy cattle reared on natural forage. Cleaned and cut into neat bite-sized pieces that soak up spices and caramelize into iconic dark beef fry.',
    cookingMethods: ['Beef Fry (Ularthiyathu)', 'Pepper Roast', 'Chili Beef', 'Curry'],
    nutrition: { protein: '26.1 g', calories: '185 kcal', fat: '7.5 g', carbs: '0 g' },
    storage: 'Store chilled at 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Kerala Beef Roast (Ularthiyathu), Beef Varutharacha Curry, and chili beef.',
  },
  {
    id: 'beef-boneless-steak',
    name: 'Prime Beef Boneless Cut',
    category: 'beef',
    categoryLabel: 'Prime Beef',
    badge: '100% Boneless',
    weight: '500g / 1kg',
    pouchImg: '/Product/GoatBeef/beef-image.webp',
    platterImg: '/Product/GoatBeef/beef-image.webp',
    desc: 'Lean, tender boneless beef steaks. High protein density with zero bone waste.',
    detailedDesc: 'Ultra-clean boneless muscle cuts trimmed of tough silver skin. Offers unmatched tenderness for pan steaks, strips, beef dry fry, or mincing for homemade smash burgers.',
    cookingMethods: ['Steak Searing', 'Stir Fry Strips', 'Smash Burgers', 'Stew'],
    nutrition: { protein: '28.0 g', calories: '172 kcal', fat: '5.2 g', carbs: '0 g' },
    storage: 'Store chilled at 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Steaks, beef strips stir fry, and lean high-protein meals.',
  },
  {
    id: 'buffalo-prime-cut',
    name: 'Tender Buffalo Specialty Cut',
    category: 'beef',
    categoryLabel: 'Prime Beef',
    badge: 'Low Fat / High Iron',
    weight: '500g / 1kg',
    pouchImg: '/Product/GoatBeef/buffalo-img.webp',
    platterImg: '/Product/GoatBeef/buffalo-img.webp',
    desc: 'Naturally lean and mineral-dense buffalo meat. Lower in cholesterol and packed with natural iron.',
    detailedDesc: 'Premium water-buffalo cuts processed under world-class cold chain regulations. Remarkable nutritional profile: lower in fat and cholesterol than traditional red meats.',
    cookingMethods: ['Slow Stewing', 'Traditional Roast', 'Broth', 'Pressure Curry'],
    nutrition: { protein: '24.2 g', calories: '143 kcal', fat: '2.4 g', carbs: '0 g' },
    storage: 'Store chilled at 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Healthy red meat curries, iron-packed roasts, and hearty stews.',
  },
];

/* =========================================================================
   1:1 EXACT INTERACTIVE PRODUCT DETAIL EXPERIENCE (From Know Your Meat Section 3 & Section 4)
   ========================================================================= */
function ProductDetailExperience({ initialPart }: { initialPart: string }) {
  const router = useRouter();
  const [activeViewTab, setActiveViewTab] = useState<'raw' | 'packed' | 'platter' | '3d'>('raw');
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isAutoSwitchStopped, setIsAutoSwitchStopped] = useState(false);
  const [isOrbitHovered, setIsOrbitHovered] = useState(false);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Match initial cut
  const matchedIdx = useMemo(() => {
    const normalized = (initialPart || '').toLowerCase().trim();
    const idx = CHICKEN_PARTS.findIndex((part) => {
      const partName = part.name.toLowerCase().trim();
      if (normalized === 'brest' && partName === 'breast') return true;
      if (normalized === 'bact' && partName === 'back') return true;
      return (
        partName === normalized ||
        normalized.includes(partName) ||
        partName.includes(normalized)
      );
    });
    return idx !== -1 ? idx : 0;
  }, [initialPart]);

  const [selectedPartIdx, setSelectedPartIdx] = useState<number>(matchedIdx);

  useEffect(() => {
    setSelectedPartIdx(matchedIdx);
  }, [matchedIdx]);

  // Responsive Screen Size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setScreenSize('mobile');
      else if (window.innerWidth < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const registerUserInteraction = () => {
    setIsAutoSwitchStopped(true);
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsAutoSwitchStopped(false);
      setIsOrbitHovered(false);
    }, 5000);
  };

  // Auto-switch through the 4 tabs every 3.5s unless hovered or clicked
  useEffect(() => {
    if (isAutoSwitchStopped || isOrbitHovered) return;

    const tabs: ('raw' | 'packed' | 'platter' | '3d')[] = ['raw', 'packed', 'platter', '3d'];
    const timer = setInterval(() => {
      setActiveViewTab((prev) => {
        const idx = tabs.indexOf(prev);
        return tabs[(idx + 1) % tabs.length];
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoSwitchStopped, isOrbitHovered]);

  // Lazily inject Google <model-viewer> web component ONLY when 3D mode is viewed
  useEffect(() => {
    if (activeViewTab === '3d' && typeof window !== 'undefined') {
      if (!document.querySelector('script[src*="model-viewer"]')) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
        document.body.appendChild(script);
      }
    }
  }, [activeViewTab]);

  const currentPart = CHICKEN_PARTS[selectedPartIdx] || CHICKEN_PARTS[0];

  const getPlateStyle = (part: ChickenPartData) => {
    const custom = part?.plateStyle;
    const fallback = {
      mobile: { width: '68%', height: '76%', marginTop: '-12%' },
      tablet: { width: '44%', height: '62%', marginTop: '-10%' },
      desktop: { width: '42%', height: '62%', marginTop: '-10%' },
    };

    if (screenSize === 'mobile') return custom?.mobile || fallback.mobile;
    if (screenSize === 'tablet') return custom?.tablet || fallback.tablet;
    return custom?.desktop || fallback.desktop;
  };

  // Rotating dashed ring with alternating odd Red & even Dark Green dashes
  const renderAlternatingDottedRing = () => {
    const count = 16;
    const radius = 47.5;
    const dashSpan = 13.5;

    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none animate-spin z-0 overflow-visible"
        style={{
          animationDuration: '12s',
          animationTimingFunction: 'linear',
        }}
        viewBox="0 0 100 100"
      >
        {Array.from({ length: count }, (_, i) => {
          const startAngle = (i * 360) / count;
          const endAngle = startAngle + dashSpan;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = 50 + radius * Math.cos(startRad);
          const y1 = 50 + radius * Math.sin(startRad);
          const x2 = 50 + radius * Math.cos(endRad);
          const y2 = 50 + radius * Math.sin(endRad);

          const isOdd = (i + 1) % 2 === 1;
          const color = isOdd ? '#E31E24' : '#15803D';
          const shadowStyle = isOdd
            ? 'drop-shadow(0px 0px 2.5px rgba(227, 30, 36, 0.35))'
            : 'drop-shadow(0px 0px 2.5px rgba(21, 128, 61, 0.35))';

          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
              stroke={color}
              strokeWidth={2.8}
              strokeLinecap="round"
              fill="none"
              style={{ filter: shadowStyle }}
            />
          );
        })}
      </svg>
    );
  };

  // Animated flowing curved arrow with alternating red & dark green dashes entering dead-center into the arrowhead
  const renderAnimatedCurvedArrow = (
    direction: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right',
    isActive: boolean
  ) => {
    let curvePath = '';
    let arrowHead = '';

    if (direction === 'top-left') {
      curvePath = 'M 2 3 C 60 1, 115 12, 145 44';
      arrowHead = 'M 153.2 41.8 L 156.6 56.4 L 142.2 52.0 L 145 44 Z';
    } else if (direction === 'bottom-left') {
      curvePath = 'M 2 61 C 60 63, 115 52, 145 20';
      arrowHead = 'M 142.2 12.0 L 156.6 7.6 L 153.2 22.2 L 145 20 Z';
    } else if (direction === 'top-right') {
      curvePath = 'M 163 3 C 105 1, 50 12, 20 44';
      arrowHead = 'M 11.8 41.8 L 8.4 56.4 L 22.8 52.0 L 20 44 Z';
    } else {
      // bottom-right
      curvePath = 'M 163 61 C 105 63, 50 52, 20 20';
      arrowHead = 'M 22.8 12.0 L 8.4 7.6 L 11.8 22.2 L 20 20 Z';
    }

    if (!isActive) {
      return (
        <svg
          width="165"
          height="65"
          viewBox="0 0 165 65"
          fill="none"
          className="w-full h-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
        >
          <path
            d={curvePath}
            stroke="#000000"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d={arrowHead} fill="#000000" />
        </svg>
      );
    }

    return (
      <svg
        width="165"
        height="65"
        viewBox="0 0 165 65"
        fill="none"
        className="w-full h-auto overflow-visible"
      >
        <style>{`
          @keyframes arrowFlow {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -24; }
          }
        `}</style>
        <path
          d={curvePath}
          stroke="#E31E24"
          strokeWidth="3.8"
          strokeDasharray="14 10"
          strokeLinecap="round"
          style={{
            animation: 'arrowFlow 1.3s linear infinite',
            filter: 'drop-shadow(0px 0px 3px rgba(227, 30, 36, 0.4))',
          }}
        />
        <path
          d={curvePath}
          stroke="#15803D"
          strokeWidth="3.8"
          strokeDasharray="14 10"
          strokeDashoffset="12"
          strokeLinecap="round"
          style={{
            animation: 'arrowFlow 1.3s linear infinite',
            filter: 'drop-shadow(0px 0px 3px rgba(21, 128, 61, 0.4))',
          }}
        />
        <path
          d={arrowHead}
          fill="#E31E24"
          style={{
            filter: 'drop-shadow(0px 0px 3px rgba(227, 30, 36, 0.45))',
          }}
        />
      </svg>
    );
  };

  const currentGlb =
    PART_GLB_MAP[currentPart.name] ||
    PART_GLB_MAP[currentPart.name.toLowerCase()] ||
    '/Product/details/glb/drumstick.glb';

  const partKey = currentPart.name.toLowerCase().trim();
  const rawRecipes = PART_RECIPES_MAP[partKey] || PART_RECIPES_MAP['drumette'] || [];
  const partRecipes = rawRecipes.slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-[#8DC541] flex flex-col font-anek">
      {/* 1. EXACT SECTION 3 DETAILS SECTION (1:1 with Reference Screenshot) */}
      <section className="relative z-30 w-full min-h-[750px] lg:min-h-[820px] xl:min-h-[860px] 2xl:min-h-[920px] h-auto lg:h-[100vh] pt-20 sm:pt-24 lg:pt-[5rem] xl:pt-[5.5rem] 2xl:pt-[6.2rem] pb-6 sm:pb-8 lg:pb-0 flex flex-col justify-between m-0 overflow-x-hidden bg-[#8DC541]">
        {/* Background Image Container */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Layer 1: Background Doodle Pattern Overlay */}
          <div
            className="absolute top-0 inset-x-0 h-[65%] pointer-events-none bg-repeat z-0 opacity-[0.18] filter brightness-0"
            style={{
              backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
              backgroundSize: '700px',
            }}
          />

          {/* Layer 2: Main Section Background Image */}
          <Image
            src="/Product/details/section-images/product-details-bg.webp"
            alt="Section Background"
            fill
            priority
            className="object-cover object-[15%_0%] lg:object-center w-full h-full relative z-10"
          />

          {/* Floating single leaf - right side */}
          <div className="hidden md:block lg:block absolute bottom-[11vw] right-[7vw] w-[5.5vw] h-auto z-10">
            <Image
              src="/Product/details/section-images/single-leaf-image-1.webp"
              alt="Leaf"
              width={140}
              height={140}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Floating single leaf - right corner */}
          <div className="hidden md:block lg:block absolute bottom-[12vw] right-[0vw] w-[3.5vw] h-auto z-10 opacity-90 animate-pulse">
            <Image
              src="/Product/details/section-images/single-leaf-image-right-corner.webp"
              alt="Leaf"
              width={140}
              height={140}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* TOP MAIN CONTENT CONTAINER */}
        <div className="relative w-full max-w-[100vw] mx-auto px-4 lg:px-[3.5vw] flex-1 flex flex-col justify-start z-10 pt-1 lg:pt-[0.5vw]">
          {/* Top Left Slogan Badge: Goodness Begins at Our Farms + Two Leaves */}
          <div className="hidden md:flex lg:flex flex-col items-start absolute top-[1.2rem] lg:top-[1.6rem] xl:top-[2rem] 2xl:top-[2.4rem] left-[2.5vw] md:left-[3.5vw] z-20 pointer-events-none scale-90 md:scale-100">
            <div className="w-[13.5vw] max-w-[240px] h-auto">
              <Image
                src="/Product/details/section-images/goodness-begins-image.webp"
                alt="Goodness Begins at Our Farms"
                width={260}
                height={160}
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
            <div className="w-[8.5vw] max-w-[150px] h-auto ml-[3vw]">
              <Image
                src="/Product/details/section-images/two-leaves-images.webp"
                alt="Leaves"
                width={140}
                height={100}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Top Center Title Header */}
          <div className="text-center w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[42vw] mx-auto z-20 pt-1 lg:pt-[0.2vw] mt-0 lg:mt-1">
            <h4 className="text-xs sm:text-sm lg:text-[1vw] font-medium text-[#d52828] tracking-widest uppercase leading-none">
              FRESH PREMIUM CHICKEN
            </h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold text-[#17442d] tracking-normal uppercase leading-none mt-1 lg:mt-[0.3vw] drop-shadow-sm font-bree">
              {currentPart.name}
            </h2>
            <p className="text-xs sm:text-sm lg:text-[0.82vw] font-semibold text-slate-900 leading-relaxed max-w-[92%] sm:max-w-[80%] lg:max-w-[38vw] mx-auto mt-2 lg:mt-[0.5vw]">
              {currentPart.desc}
            </p>
          </div>

          {/* Top Right Nutrition Card (Desktop only) */}
          <div className="hidden lg:block absolute top-[1.2rem] lg:top-[1.6rem] xl:top-[2rem] 2xl:top-[2.4rem] right-[3vw]">
            <Image
              src="/Product/details/section-images/nutrition-information.svg"
              alt="Nutrition information card"
              width={350}
              height={150}
              className="w-[180px] sm:w-[360px] lg:w-[17vw] max-w-[340px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Leaf - Pure natural nutrition */}
          <div className="hidden lg:block absolute top-[calc(1.2rem+8.2vw)] lg:top-[calc(1.6rem+8.4vw)] xl:top-[calc(2rem+7.5vw)] 2xl:top-[calc(2.4rem+7vw)] right-[6.5vw]">
            <Image
              src="/Product/details/section-images/pure-natural-nutrition.webp"
              alt="Leaf - Pure nutritional information"
              width={350}
              height={150}
              className="w-[180px] sm:w-[360px] lg:w-[9vw] max-w-[170px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Benefits */}
          <div className="hidden lg:block absolute top-[calc(1.2rem+13.8vw)] lg:top-[calc(1.6rem+13.6vw)] xl:top-[calc(2rem+12.8vw)] 2xl:top-[calc(2.4rem+12vw)] right-[6.5vw]">
            <Image
              src="/Product/details/section-images/benefits-texts.svg"
              alt="Benefits"
              width={350}
              height={150}
              className="w-[180px] sm:w-[360px] lg:w-[10.5vw] max-w-[190px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Top Right Decorative Leaf Prop for Tablet Viewports */}
          <div className="hidden md:block lg:hidden absolute top-[2rem] right-[4vw] z-20 pointer-events-none">
            <div className="w-[10vw] max-w-[110px] h-auto opacity-80">
              <Image
                src="/Product/details/section-images/two-leaves-images.webp"
                alt="Leaves"
                width={120}
                height={90}
                className="w-full h-auto object-contain transform rotate-45"
              />
            </div>
          </div>

          {/* CENTER PRODUCT ORBIT DISPLAY */}
          <div className="relative w-full max-w-[85vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[42vw] xl:max-w-[43vw] h-[220px] sm:h-[290px] md:h-[330px] lg:h-[25vw] xl:h-[26vw] mx-auto mt-0 sm:-mt-1 md:-mt-2 lg:-mt-[1.4vw] xl:-mt-[1.6vw] 2xl:-mt-[1.8vw] mb-1 sm:mb-2 flex items-center justify-center">
            {/* Main Center Selected Cut / Model Display */}
            <div className="relative w-[265px] sm:w-[410px] md:w-[470px] lg:w-[36vw] xl:w-[33.5vw] h-[195px] sm:h-[290px] md:h-[330px] lg:h-[26vw] xl:h-[27vw] flex items-center justify-center z-10">
              <AnimatePresence mode="wait">
                {activeViewTab === 'raw' && (
                  <motion.div
                    key={`raw-${selectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* Static Wood Plate */}
                    <img
                      src="/Product/Chicken/ChickenParts/woodPlate.webp"
                      alt="Wood Plate"
                      className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                    />

                    {/* Chicken Part positioned on plate */}
                    <div
                      className="relative z-10 flex items-center justify-center"
                      style={getPlateStyle(currentPart)}
                    >
                      <img
                        src={currentPart.productImg || '/Product/Chicken/ChickenParts/drumstick.webp'}
                        alt={currentPart.name}
                        className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xl"
                      />
                    </div>
                  </motion.div>
                )}

                {activeViewTab === 'packed' && (
                  <motion.div
                    key={`packed-${selectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.82, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -18 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={currentPart.pouchImg || '/Product/details/packedProduct.webp'}
                      alt="Packed Pouch"
                      width={550}
                      height={550}
                      className="w-[180px] sm:w-[250px] md:w-[295px] lg:w-[19vw] xl:w-[19.5vw] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </motion.div>
                )}

                {activeViewTab === 'platter' && (
                  <motion.div
                    key={`platter-${selectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.82, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -18 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={currentPart.platterImg || '/Product/Chicken/Platters/drumstick.webp'}
                      alt="Prepared Platter"
                      width={550}
                      height={420}
                      className="w-[195px] sm:w-[295px] md:w-[345px] lg:w-[27vw] xl:w-[27.5vw] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </motion.div>
                )}

                {activeViewTab === '3d' && (
                  <motion.div
                    key={`3d-${selectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[90%] h-[90%] relative flex items-center justify-center rounded-2xl overflow-hidden drop-shadow-2xl z-20"
                  >
                    <style>{`
                      model-viewer::part(default-progress-bar),
                      model-viewer::part(default-progress-mask),
                      model-viewer > #default-progress-bar {
                        display: none !important;
                      }
                    `}</style>
                    {React.createElement(
                      'model-viewer',
                      {
                        src: currentGlb,
                        alt: `3D model of ${currentPart.name}`,
                        'auto-rotate': true,
                        'auto-rotate-delay': 0,
                        'rotation-per-second': '30deg',
                        'camera-controls': true,
                        'disable-zoom': true,
                        'touch-action': 'pan-y',
                        'shadow-intensity': '1.2',
                        'shadow-softness': '0.8',
                        exposure: '1.15',
                        loading: 'eager',
                        style: {
                          width: '88%',
                          height: '88%',
                          minHeight: '150px',
                          outline: 'none',
                          cursor: 'grab',
                          backgroundColor: 'transparent',
                        },
                      },
                      React.createElement('div', {
                        slot: 'progress-bar',
                        style: { display: 'none' },
                      })
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DESKTOP ORBIT BADGE 1: Top-Left (Single Raw Cut) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('raw');
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:top-[0.8vw] lg:-left-[3.8vw] xl:-left-[4.2vw] z-30 group cursor-pointer"
            >
              <div className="hidden lg:block absolute top-[1.8vw] -right-[5.8vw] w-[5.6vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow('top-left', activeViewTab === 'raw')}
              </div>
              <div
                className={`relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[5.4vw] lg:h-[5.4vw] xl:w-[5vw] xl:h-[5vw] rounded-full flex items-center justify-center p-2 lg:p-[0.6vw] hover:scale-110 transition-all duration-300 ${
                  activeViewTab === 'raw'
                    ? 'border-[1.5px] border-transparent scale-110'
                    : 'border-[1.5px] border-black hover:border-black'
                }`}
              >
                {activeViewTab === 'raw' && renderAlternatingDottedRing()}
                <Image
                  src={currentPart.productImg || '/Product/Chicken/ChickenParts/drumstick.webp'}
                  alt="Raw Cut"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>

            {/* DESKTOP ORBIT BADGE 2: Bottom-Left (Pouch / Packaged) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('packed');
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:bottom-[2.4vw] xl:bottom-[2.6vw] lg:-left-[4.4vw] xl:-left-[4.8vw] z-30 group cursor-pointer"
            >
              <div className="hidden lg:block absolute bottom-[1.8vw] -right-[5.8vw] w-[5.6vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow('bottom-left', activeViewTab === 'packed')}
              </div>
              <div
                className={`relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[5.4vw] lg:h-[5.4vw] xl:w-[5vw] xl:h-[5vw] rounded-full flex items-center justify-center p-2 lg:p-[0.6vw] hover:scale-110 transition-all duration-300 ${
                  activeViewTab === 'packed'
                    ? 'border-[1.5px] border-transparent scale-110'
                    : 'border-[1.5px] border-black hover:border-black'
                }`}
              >
                {activeViewTab === 'packed' && renderAlternatingDottedRing()}
                <Image
                  src={currentPart.pouchImg || '/Product/details/packedProduct.webp'}
                  alt="Pouch Pack"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>

            {/* DESKTOP ORBIT BADGE 3: Top-Right (Bowl / Platter) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('platter');
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:top-[0.8vw] lg:-right-[2.5vw] xl:-right-[2.8vw] z-30 group cursor-pointer"
            >
              <div className="hidden lg:block absolute top-[1.8vw] -left-[5.8vw] w-[5.6vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow('top-right', activeViewTab === 'platter')}
              </div>
              <div
                className={`relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[5.4vw] lg:h-[5.4vw] xl:w-[5vw] xl:h-[5vw] rounded-full flex items-center justify-center p-2 lg:p-[0.6vw] hover:scale-110 transition-all duration-300 ${
                  activeViewTab === 'platter'
                    ? 'border-[1.5px] border-transparent scale-110'
                    : 'border-[1.5px] border-black hover:border-black'
                }`}
              >
                {activeViewTab === 'platter' && renderAlternatingDottedRing()}
                <Image
                  src={currentPart.platterImg || '/Product/Chicken/Platters/drumstick.webp'}
                  alt="Platter"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>

            {/* DESKTOP ORBIT BADGE 4: Bottom-Right (View in 360°) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab(activeViewTab === '3d' ? 'raw' : '3d');
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:bottom-[2.8vw] xl:bottom-[3.2vw] lg:-right-[6.5vw] xl:-right-[6.8vw] z-30 group cursor-pointer"
            >
              <div className="hidden lg:block absolute bottom-[1.8vw] -left-[5.8vw] w-[5.6vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow('bottom-right', activeViewTab === '3d')}
              </div>
              <div
                className={`relative w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] lg:w-[5.8vw] lg:h-[5.8vw] xl:w-[5.4vw] xl:h-[5.4vw] rounded-full flex flex-col items-center justify-center p-1.5 lg:p-[0.4vw] hover:scale-110 transition-all duration-300 ${
                  activeViewTab === '3d'
                    ? 'border-[1.5px] border-transparent scale-110'
                    : 'border-[1.5px] border-black hover:border-black'
                }`}
              >
                {activeViewTab === '3d' && renderAlternatingDottedRing()}
                <Image
                  src="/Product/details/360.webp"
                  alt="360 View"
                  width={50}
                  height={50}
                  className="w-5 h-5 lg:w-[2.8vw] lg:h-[2.8vw] object-contain -mt-[0.25vw] relative z-10"
                />
                <span className="text-[9px] lg:text-[0.62vw] xl:text-[0.68rem] font-black text-slate-800 tracking-tight leading-none mt-0.5 lg:-mt-[0.18vw] uppercase whitespace-nowrap relative z-10">
                  View in 360°
                </span>
              </div>
            </div>
          </div>

          {/* MOBILE / TABLET FLOATING BUTTONS ROW */}
          <div className="grid lg:hidden grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-[340px] sm:max-w-none mx-auto mt-1 mb-2 sm:mt-2 sm:mb-3 z-30 px-3">
            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('raw');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${
                activeViewTab === 'raw'
                  ? 'bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]'
                  : 'bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src={currentPart.productImg || '/Product/Chicken/ChickenParts/drumstick.webp'}
                  alt="Raw Cut"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">Raw Cut</span>
            </button>

            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('packed');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${
                activeViewTab === 'packed'
                  ? 'bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]'
                  : 'bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src={currentPart.pouchImg || '/Product/details/packedProduct.webp'}
                  alt="Packed Pouch"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">Packed</span>
            </button>

            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('platter');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${
                activeViewTab === 'platter'
                  ? 'bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]'
                  : 'bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src={currentPart.platterImg || '/Product/Chicken/Platters/drumstick.webp'}
                  alt="Platter"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">Platter</span>
            </button>

            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab(activeViewTab === '3d' ? 'raw' : '3d');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${
                activeViewTab === '3d'
                  ? 'bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]'
                  : 'bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src="/Product/details/360.webp"
                  alt="360 View"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">360° View</span>
            </button>
          </div>
        </div>

        {/* BOTTOM GREEN FOOTER SECTION */}
        <div className="relative w-full z-30 pb-4 sm:pb-6 lg:pb-[1.5vw] px-4 sm:px-8 lg:px-[3.5vw] mt-4 sm:mt-6 lg:mt-[0.6vw] xl:mt-[0.8vw]">
          {/* Center Stamp Badge */}
          <div className="w-[140px] hidden lg:block lg:w-[7.5vw] xl:w-[7vw] h-auto absolute -top-[16px] sm:-top-[20px] lg:-top-[1.8vw] xl:-top-[2vw] left-1/2 -translate-x-1/2 z-40 drop-shadow-md">
            <Image
              src="/Product/details/section-images/keralas_original-meat.webp"
              alt="Kerala's Original Meat"
              width={170}
              height={110}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Bottom Row */}
          <div className="relative z-30 w-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-[1.5vw] pt-5 sm:pt-6 lg:pt-0">
            {/* 1. Bottom Left Recipe Card */}
            <div className="relative w-full max-w-[350px] sm:max-w-[420px] lg:max-w-none lg:w-[21.5vw] bg-[#FDFBF2] rounded-2xl lg:rounded-[1vw] shadow-lg border border-white/80 flex items-center gap-3 lg:gap-[0.8vw] p-2.5 sm:p-3 lg:p-0 order-3 lg:order-1">
              <div className="absolute -top-3 -left-3 lg:-top-[0.8vw] lg:left-[0.25vw] lg:top-[0.25vw] w-10 h-10 lg:w-[1.85vw] lg:h-[1.85vw] rounded-full shadow-md flex items-center justify-center z-40">
                <Image
                  src="/Product/details/section-images/chef-icon.svg"
                  alt="Chef Icon"
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-20 h-20 lg:w-[9.2vw] lg:h-[7.2vw] rounded-xl lg:rounded-[0] overflow-hidden relative shrink-0 shadow-sm">
                <Image
                  src="/Product/details/bottomCard.webp"
                  alt="Recipe"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="text-xs lg:text-[0.85vw] font-bold text-[#E31E24] uppercase tracking-widest leading-none">
                  WHAT'S COOKING?
                </span>
                <h5 className="text-xs lg:text-[0.75vw] font-bold text-black leading-tight mt-1 lg:mt-[0.35vw] truncate">
                  Spicy Chicken {currentPart.name} Fry
                </h5>
                <p className="text-[10px] lg:text-[0.6vw] font-medium text-slate-900 leading-tight mt-1 lg:mt-[0.2vw] line-clamp-2 max-w-full lg:max-w-[11vw]">
                  A Spicy and flavourful recipe For a perfect family meal.
                </p>

                <Link
                  href={`/recipes?part=${currentPart.name.toLowerCase()}`}
                  className="mt-2 lg:mt-[0.55vw] bg-[#E31E24] hover:bg-[#c9181d] text-white text-[10px] lg:text-[0.6vw] font-extrabold py-1 lg:py-[0.35vw] px-2.5 lg:px-[0.85vw] rounded-md lg:rounded-[0.4vw] uppercase tracking-wider inline-flex items-center gap-1 lg:gap-[0.3vw] shadow transition-colors w-max"
                >
                  <span>EXPLORE RECIPE</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* 2. Center 4 Feature SVGs (1 single row) */}
            <div className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-3 lg:gap-[1.2vw] shrink-0 mt-0 lg:mt-[1.6vw] order-1 lg:order-2 max-w-full overflow-x-auto no-scrollbar">
              <img
                src="/Product/details/section-images/farm-fresh.svg"
                alt="Farm Fresh"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />
              <div className="w-5 h-auto lg:w-[1.5px] lg:h-[3.8vw] bg-white/40" />
              <img
                src="/Product/details/section-images/hygienic-processing.svg"
                alt="Hygienic Processing"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />
              <div className="w-5 h-auto lg:w-[1.5px] lg:h-[3.8vw] bg-white/40" />
              <img
                src="/Product/details/section-images/quality-checked.svg"
                alt="Quality Checked"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />
              <div className="w-5 h-auto lg:w-[1.5px] lg:h-[3.8vw] bg-white/40" />
              <img
                src="/Product/details/section-images/ready-natural-taste.svg"
                alt="Ready Natural Taste"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />
            </div>

            {/* 3. Right Truck Graphic */}
            <div className="hidden lg:flex items-center justify-center lg:justify-end shrink-0 order-2 lg:order-3 mt-1 sm:mt-2 lg:mt-0">
              <img
                src="/Product/details/section-images/keep-fresh-delivered-fresh.svg"
                alt="Keep Fresh Delivered Fresh"
                className="h-9 sm:h-11 lg:h-[4.75vw] w-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXACT RECIPES SECTION (1:1 with Reference Screenshot) */}
      <section className="relative z-20 w-full bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-[4vw] overflow-hidden">
        {/* Background Doodle Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-[0.6] filter brightness-0"
          style={{
            backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
            backgroundSize: '800px',
          }}
        />
        <div className="w-full space-y-12 relative z-10 max-w-[1400px] mx-auto">
          {/* Section Header: Title, Description, and Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-start gap-6 md:gap-10 pb-2">
            {/* Left Column: RECIPES tagline + MEAT MADE DELICIOUS Title */}
            <div className="space-y-2 shrink-0 select-none">
              {/* Tagline */}
              <div className="flex items-center gap-2">
                <span className="w-5 h-[2px] bg-[#8DC541]" />
                <span className="text-[13px] font-bold text-slate-700 tracking-widest uppercase font-manrope">
                  RECIPES
                </span>
              </div>

              {/* Title: {PART} RECIPES DELICIOUS. */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-barlow-condensed tracking-wide uppercase leading-[0.95]">
                <span className="text-[#064823] block">
                  {currentPart.name} RECIPES
                </span>
                <span className="text-[#F7840F] block">
                  DELICIOUS.
                </span>
              </h2>
            </div>

            {/* Vertical Orange Divider Line */}
            <div className="hidden md:block w-[2px] h-[70px] bg-[#F7840F] rounded-full shrink-0" />

            {/* Right Column: Paragraph + Filter buttons */}
            <div className="flex flex-col justify-between py-1 mt-4 md:mt-0 gap-4 md:gap-5">
              <p className="text-[17px] md:text-[18px] font-medium text-slate-700 max-w-[480px] leading-snug font-manrope">
                Explore trending {currentPart.name.toLowerCase()} recipes in quick, easy &amp; delicious short-form videos.
              </p>

              {/* Filter buttons */}
              <div className="flex gap-3">
                <button className="bg-[#064823] hover:bg-[#0a5e30] text-white text-[13px] font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm">
                  Most Popular
                </button>
                <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-[13px] font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm">
                  New Recipes
                </button>
              </div>
            </div>
          </div>

          {/* Recipes Grid (4 Cards matching 1:1 reference screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
            {partRecipes.map((recipe, idx) => (
              <Link
                href={`/recipes?part=${currentPart.name.toLowerCase()}&recipeId=${currentPart.name.toLowerCase()}-${idx + 1}&title=${encodeURIComponent(recipe.title)}`}
                key={idx}
                className="block cursor-pointer group"
              >
                <div className="w-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col select-none border border-slate-200/90 ring-1 ring-black/[0.04]">
                  {/* Compact 16:9.5 Image Header */}
                  <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={recipe.img}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Top-Left Category Badge Pill */}
                    <span className="absolute top-2.5 left-2.5 z-10 bg-[#d62828] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm pointer-events-none">
                      {recipe.label}
                    </span>
                  </div>

                  {/* Distinct Elevated White Card Body */}
                  <div className="p-3.5 pt-2 sm:p-4 sm:pt-2.5 flex-1 flex flex-col justify-between space-y-2 font-inter bg-white">
                    <div className="space-y-1">
                      <h3
                        className="text-sm sm:text-base font-bold text-black tracking-wide uppercase leading-normal group-hover:text-[#064823] transition-colors line-clamp-2 min-h-[2.5rem] flex items-center"
                        title={recipe.title}
                      >
                        {recipe.title}
                      </h3>

                      {/* Spec Row (Difficulty, Cooking Time, Servings) */}
                      <div className="flex items-center justify-between gap-1 text-[11px] font-semibold text-slate-900 font-manrope pt-2 border-t border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <div className="relative w-3.5 h-3.5 shrink-0">
                            <img
                              src="/Product/recipies/easy.svg"
                              alt="Difficulty"
                              className="w-full h-full object-contain opacity-75"
                            />
                          </div>
                          <span>{recipe.diff}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className="relative w-3.5 h-3.5 shrink-0">
                            <img
                              src="/Product/recipies/time.svg"
                              alt="Time"
                              className="w-full h-full object-contain opacity-75"
                            />
                          </div>
                          <span>{recipe.time}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className="relative w-3.5 h-3.5 shrink-0">
                            <Image
                              src="/Product/recipies/servings.png"
                              alt="Servings"
                              fill
                              className="object-contain opacity-75"
                            />
                          </div>
                          <span>{recipe.servings}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="w-full bg-[#F7840F] group-hover:bg-[#e0730b] text-white text-[11px] font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 uppercase tracking-wider transition-colors cursor-pointer font-inter shadow-sm group-hover:shadow mt-1">
                      <span>VIEW RECIPE &amp; STEPS &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   ORIGINAL PRODUCT CATALOG VIEW (When directly accessed without ?part=)
   ========================================================================= */
function ProductCatalogView() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'pack' | 'raw'>('pack');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.idealFor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoriesList: { key: ProductCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Products', count: PRODUCTS.length },
    { key: 'chicken', label: 'Fresh Chicken', count: PRODUCTS.filter((p) => p.category === 'chicken').length },
    { key: 'mutton', label: 'Mutton & Goat', count: PRODUCTS.filter((p) => p.category === 'mutton').length },
    { key: 'beef', label: 'Prime Beef', count: PRODUCTS.filter((p) => p.category === 'beef').length },
    { key: 'specialty', label: 'Specialty Cuts', count: PRODUCTS.filter((p) => p.category === 'specialty').length },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBF9] font-anek relative overflow-hidden">
      {/* Background Doodle Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-40"
        style={{
          backgroundImage: 'url("/Product/Chicken/doodle.webp")',
          backgroundSize: '900px',
          filter: 'brightness(0)',
        }}
      />

      {/* 1. HERO BANNER SECTION */}
      <section 
        className="relative z-10 w-full pt-[120px] pb-16 md:pt-[150px] md:pb-24 overflow-hidden text-white shadow-lg"
        style={{
          background: 'radial-gradient(circle at 50% 20%, #1c683b 0%, #064823 85%, #032b14 100%)',
        }}
      >
        {/* Background Tiled Doodle with Blend */}
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-60 mix-blend-overlay"
          style={{
            backgroundImage: 'url("/Product/Chicken/doodle.webp")',
            backgroundSize: '750px',
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8DC541]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F7840F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl"
          >
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#8DC541] text-xs font-bold uppercase tracking-widest shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#8DC541] animate-pulse" />
              100% Halal & Hygienic Processing
            </div>

            {/* Hero Main Heading with font-bree */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-bree tracking-normal uppercase leading-[1.05] text-white drop-shadow-sm">
              FARM-FRESH <span className="text-[#8DC541]">CUTS</span> &amp;{' '}
              <span className="text-[#F7840F]">PACKS</span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-slate-200 text-xs sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Experience unprocessed purity with zero chemical additives. Handpicked, scientifically vacuum-chilled, and packed under sterile 0°C–4°C standards daily.
            </p>
          </motion.div>

          {/* Quick Assurance Badges */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 w-full max-w-4xl"
          >
            {[
              { icon: ShieldCheck, title: '100% Halal Certified', sub: 'Strict ritual slaughter' },
              { icon: ThermometerSnowflake, title: '0°C - 4°C Cold Chain', sub: 'Chilled, never frozen' },
              { icon: Sparkles, title: '0% Antibiotic Residue', sub: 'No added hormones' },
              { icon: Flame, title: 'Farm-to-Fork Daily', sub: 'Fresh cuts every morning' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 text-left flex items-center gap-3 transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8DC541]/20 flex items-center justify-center shrink-0 text-[#8DC541]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate">{item.title}</p>
                    <p className="text-[10px] sm:text-xs text-slate-300 mt-0.5 truncate">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN CATALOG FILTER & INTERACTIVE TOOLBAR */}
      <section className="relative z-20 w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-100 p-4 sm:p-6 space-y-4">
          {/* Top Row: Search + View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cuts (e.g. Breast, Drumstick, Mutton, Biryani)..."
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear Search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Pack vs Raw Platter View Mode Toggle */}
            <div className="flex items-center gap-2 self-end sm:self-auto bg-[#F1F6EE] p-1 rounded-xl border border-[#D5E8CD]">
              <span className="text-[11px] font-bold text-[#064823] pl-2.5 pr-1 hidden sm:inline">
                Display:
              </span>
              <button
                onClick={() => setViewMode('pack')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'pack'
                    ? 'bg-[#064823] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#064823]'
                }`}
              >
                Retail Pack
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'raw'
                    ? 'bg-[#064823] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#064823]'
                }`}
              >
                Fresh Cut Platter
              </button>
            </div>
          </div>

          {/* Bottom Row: Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-100">
            {categoriesList.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    active
                      ? 'bg-[#064823] text-white shadow-md shadow-[#064823]/20 scale-100'
                      : 'bg-slate-50 hover:bg-[#EEF6E8] text-slate-700 hover:text-[#064823] border border-slate-200/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      active ? 'bg-[#8DC541] text-[#064823]' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID SECTION */}
      <section className="relative z-10 w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Active filtering feedback indicator */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            Showing <span className="text-[#064823] font-extrabold">{filteredProducts.length}</span> premium cuts
            {searchQuery && (
              <span> matching &ldquo;<span className="text-[#F7840F]">{searchQuery}</span>&rdquo;</span>
            )}
          </p>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-bold text-[#D62828] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const displayImage =
                viewMode === 'raw' && product.platterImg
                  ? product.platterImg
                  : product.pouchImg;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl border border-slate-150 shadow-[0_6px_25px_rgba(0,0,0,0.035)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
                >
                  {/* Top Image Showcase Area */}
                  <div className="relative w-full pt-[85%] bg-gradient-to-b from-[#F8FAF7] to-[#F1F6EE] overflow-hidden flex items-center justify-center p-4">
                    {/* Badge top-left */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 z-10 bg-[#064823] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        {product.badge}
                      </span>
                    )}

                    {/* Weight tag top-right */}
                    <span className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {product.weight}
                    </span>

                    {/* Product Image */}
                    <div className="absolute inset-4 flex items-center justify-center">
                      <Image
                        src={displayImage}
                        alt={product.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Quick View Floating Button on Hover */}
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 bg-[#064823] hover:bg-[#0a5e30] text-white p-2.5 rounded-full shadow-lg transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                      title="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#8DC541] uppercase tracking-wider mb-1">
                        <span>{product.categoryLabel}</span>
                        <span className="text-slate-400 font-medium">100% Halal</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#064823] leading-snug group-hover:text-[#F7840F] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1 leading-relaxed">
                        {product.desc}
                      </p>
                    </div>

                    {/* Nutrition Mini Matrix */}
                    <div className="grid grid-cols-2 gap-2 bg-[#F8FAF7] border border-slate-100 rounded-xl p-2.5 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[9.5px]">PROTEIN</span>
                        <span className="font-bold text-[#064823]">{product.nutrition.protein}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9.5px]">ENERGY</span>
                        <span className="font-bold text-[#064823]">{product.nutrition.calories}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalProduct(product)}
                        className="flex-1 bg-[#EEF6E8] hover:bg-[#064823] text-[#064823] hover:text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all duration-300 text-center"
                      >
                        Cut Details
                      </button>
                      <Link
                        href={`/contact?product=${encodeURIComponent(product.name)}`}
                        className="bg-[#064823] hover:bg-[#0a5e30] text-white p-2.5 rounded-xl transition-all duration-300 shadow-md active:scale-95 flex items-center justify-center"
                        title="Enquire / Order this cut"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EEF6E8] text-[#064823] flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#064823]">No matching cuts found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any cuts matching &ldquo;{searchQuery}&rdquo;. Try another cut name or reset your category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-[#064823] hover:bg-[#0a5e30] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition-all uppercase"
            >
              Show All Cuts
            </button>
          </div>
        )}
      </section>

      {/* 4. QUALITY PILLARS / WHY MEATIN MEAT */}
      <section className="relative z-10 w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
        <div className="bg-gradient-to-r from-[#064823] via-[#09592c] to-[#064823] rounded-3xl p-8 sm:p-12 text-white shadow-xl overflow-hidden relative">
          <div
            className="absolute inset-0 pointer-events-none bg-repeat opacity-25"
            style={{
              backgroundImage: 'url("/Product/Chicken/doodle.webp")',
              backgroundSize: '650px',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#8DC541] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> MEATiN Gold Standard
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-bree uppercase tracking-normal">
                Why Chefs &amp; Families Choose MEATiN
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                From biosafety-checked farms to sterile hygienic handling, every cut is chilled at continuous 0°C–4°C temperature. No preservatives, no frozen shelf aging, pure natural taste.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#8DC541] font-bree block">0°C-4°C</span>
                <span className="text-xs font-bold text-white block mt-0.5">Strict Cold Chain</span>
                <span className="text-[10px] text-slate-300">Continuous temp monitoring</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#F7840F] font-bree block">100%</span>
                <span className="text-xs font-bold text-white block mt-0.5">Halal Certified</span>
                <span className="text-[10px] text-slate-300">Ethical ritual processing</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#8DC541] font-bree block">0%</span>
                <span className="text-xs font-bold text-white block mt-0.5">Antibiotic Residue</span>
                <span className="text-[10px] text-slate-300">Clean natural feeds</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#F7840F] font-bree block">Daily</span>
                <span className="text-xs font-bold text-white block mt-0.5">Fresh Farm Dispatch</span>
                <span className="text-[10px] text-slate-300">Direct to outlets &amp; kitchen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. B2B & RETAIL BULK ENQUIRY CTA SECTION */}
      <section className="relative z-10 w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#064823] font-bree uppercase">
              Partner with MEATiN for Bulk &amp; Commercial Supplies
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              Are you a restaurant, supermarket, caterer, or meat distributor? We provide steady, high-volume daily shipments of precision-cut fresh meats.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="bg-[#064823] hover:bg-[#0a5e30] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>Submit Commercial Enquiry</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/know-your-meat"
              className="bg-[#EEF6E8] hover:bg-[#ddead0] text-[#064823] font-bold text-xs sm:text-sm px-5 py-3 rounded-xl uppercase tracking-wider transition-all"
            >
              Explore Cuts 3D
            </Link>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                aria-label="Close Product Details"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Banner */}
              <div className="relative w-full pt-[60%] bg-gradient-to-b from-[#F8FAF7] to-[#F1F6EE] flex items-center justify-center p-6">
                <span className="absolute top-4 left-4 bg-[#064823] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeModalProduct.categoryLabel}
                </span>

                <div className="absolute inset-6 flex items-center justify-center">
                  <Image
                    src={viewMode === 'raw' && activeModalProduct.platterImg ? activeModalProduct.platterImg : activeModalProduct.pouchImg}
                    alt={activeModalProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Title & Detailed Description */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#064823] font-bree">
                    {activeModalProduct.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-2">
                    {activeModalProduct.detailedDesc}
                  </p>
                </div>

                {/* Nutritional Information Breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#064823]">
                    <Layers className="w-4 h-4 text-[#8DC541]" />
                    <span>NUTRITIONAL INFORMATION (PER 100G)</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 bg-[#F8FAF7] border border-slate-200/80 rounded-2xl p-3 text-center">
                    <div>
                      <span className="text-[9.5px] text-slate-400 block uppercase font-bold">Protein</span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#064823]">
                        {activeModalProduct.nutrition.protein}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-slate-400 block uppercase font-bold">Calories</span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#064823]">
                        {activeModalProduct.nutrition.calories}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-slate-400 block uppercase font-bold">Fats</span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#064823]">
                        {activeModalProduct.nutrition.fat}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-slate-400 block uppercase font-bold">Carbs</span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#064823]">
                        {activeModalProduct.nutrition.carbs}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Best Cooking Methods */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#064823]">
                    <Utensils className="w-4 h-4 text-[#F7840F]" />
                    <span>RECOMMENDED COOKING STYLES</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProduct.cookingMethods.map((method, idx) => (
                      <span
                        key={idx}
                        className="bg-[#EEF6E8] text-[#064823] font-bold text-xs px-3 py-1 rounded-lg border border-[#D5E8CD]"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ideal Dishes & Storage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
                  <div>
                    <span className="font-bold text-[#064823] block mb-0.5">Best For:</span>
                    <span className="text-slate-600">{activeModalProduct.idealFor}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#064823] block mb-0.5">Cold Storage:</span>
                    <span className="text-slate-600">{activeModalProduct.storage}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-slate-150 bg-white flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Pack Standard</span>
                  <span className="text-xs sm:text-sm font-bold text-[#064823]">{activeModalProduct.weight} vacuum pack</span>
                </div>
                <Link
                  href={`/contact?product=${encodeURIComponent(activeModalProduct.name)}`}
                  className="bg-[#064823] hover:bg-[#0a5e30] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 flex items-center gap-2"
                >
                  <span>Enquire / Order</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   MASTER ROUTER PAGE WITH SUSPENSE (Handles ?part= URL query parameter)
   ========================================================================= */
function ProductPageContent() {
  const searchParams = useSearchParams();
  const partParam = searchParams.get('part');

  if (partParam) {
    return <ProductDetailExperience initialPart={partParam} />;
  }

  return <ProductCatalogView />;
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBFBF9] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#8DC541] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}
