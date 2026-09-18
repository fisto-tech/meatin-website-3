'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import { PRELOAD_ASSETS } from './preloaderAssets';
import { AssetPreloadEngine } from './preloadEngine';

export const Preloader: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Pre-warm Next.js route bundles on client router
  useEffect(() => {
    const routesToPrewarm = [
      '/',
      '/about',
      '/know-your-meat',
      '/product',
      '/recipes',
      '/franchise',
      '/team',
      '/vlog',
      '/contact',
    ];

    routesToPrewarm.forEach((routePath) => {
      try {
        router.prefetch(routePath);
      } catch (e) {
        // Safe fallback
      }
    });
  }, [router]);

  // Listen for immediate completion if already visited
  useEffect(() => {
    // Check if session preloaded
    if (typeof window !== 'undefined' && sessionStorage.getItem('meatin_preloaded') === 'true') {
      setLoading(false);
      document.body.classList.remove('preloader-active');
      document.body.style.overflow = '';
      return;
    }

    setMounted(true);
    if (typeof document !== 'undefined') {
      document.body.classList.add('preloader-active');
      document.body.style.overflow = 'hidden';
    }

    let isFinished = false;
    let assetsLoaded = false;
    let windowLoaded = typeof document !== 'undefined' && document.readyState === 'complete';

    const finishLoading = () => {
      if (isFinished) return;
      isFinished = true;
      setProgress(100);

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('meatin_preloaded', 'true');
      }

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (typeof document !== 'undefined') {
            document.body.classList.remove('preloader-active');
            document.body.style.overflow = '';
          }
          setLoading(false);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('scroll'));
          }
        }, 350);
      }, 150);
    };

    const checkReady = () => {
      if (assetsLoaded && windowLoaded) {
        finishLoading();
      }
    };

    // Listen for actual window load event
    if (!windowLoaded && typeof window !== 'undefined') {
      const handleWindowLoad = () => {
        windowLoaded = true;
        checkReady();
      };
      window.addEventListener('load', handleWindowLoad, { once: true });
    }

    // Asset preload engine tracking
    if (typeof window !== 'undefined') {
      // Use concurrency 8 to ensure smooth multiplexing on tablets and mobile without socket choking
      const engine = new AssetPreloadEngine(PRELOAD_ASSETS, {
        concurrency: 8,
        onProgress: (percent) => {
          setProgress((prev) => Math.max(prev, percent));
          // Once 80%+ of prioritized assets are ready and DOM is ready, dismiss preloader to keep UX snappy
          if (percent >= 80 && (document.readyState === 'complete' || document.readyState === 'interactive')) {
            finishLoading();
          }
        },
        onComplete: () => {
          assetsLoaded = true;
          finishLoading();
        },
      });

      engine.start();
    }

    // Safety timeout ensuring user is never stuck indefinitely (e.g. slow connection)
    const maxTimeout = setTimeout(() => {
      finishLoading();
    }, 4500);

    return () => {
      clearTimeout(maxTimeout);
      if (typeof document !== 'undefined') {
        document.body.classList.remove('preloader-active');
        document.body.style.overflow = '';
      }
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      id="preloader-root"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F6F5F0] transition-all duration-500 ease-out"
      style={{
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <style>{`
        body.preloader-active > *:not(#preloader-root) {
          opacity: 0 !important;
        }
        @keyframes subtleShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes mascotBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(0.85); opacity: 0.15; }
        }
        .mascot-runner {
          animation: mascotBob 1.6s ease-in-out infinite;
        }
        .mascot-shadow {
          animation: shadowPulse 1.6s ease-in-out infinite;
        }
        .shimmer-track {
          animation: subtleShimmer 2.2s infinite linear;
        }
      `}</style>

      {/* Ambient Radial Brand Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#8DC541]/10 via-[#064823]/8 to-[#F7840F]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Cohesive Brand Preloader Layout */}
      <div className="relative flex flex-col items-center px-6 max-w-sm sm:max-w-md w-full select-none text-center">
        
        {/* 1. Official MEATiN Brand Logo */}
        <div className="relative w-44 sm:w-52 h-14 sm:h-16 mb-1">
          <Image
            src="/meatin-logo.webp"
            alt="MEATiN Logo"
            fill
            className="object-contain object-center"
            priority
          />
        </div>

        {/* 2. Subtitle with Gold Divider Accents */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <span className="h-[1px] w-5 sm:w-7 bg-[#D4A437]/70" />
          <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.22em] text-[#064823]/75 uppercase font-manrope">
            South India&apos;s Multi Species Meat Plant
          </span>
          <span className="h-[1px] w-5 sm:w-7 bg-[#D4A437]/70" />
        </div>

        {/* 3. Mascot Running Stage */}
        <div className="relative flex flex-col items-center justify-center my-2 sm:my-3">
          <div className="mascot-runner relative w-32 h-28 sm:w-36 sm:h-32">
            <Image
              src="/preloader-running-clean.gif"
              alt="MEATiN Mascot"
              fill
              className="object-contain object-center"
              priority
              unoptimized
            />
          </div>
          {/* Ground Soft Ambient Shadow */}
          <div className="mascot-shadow w-24 sm:w-28 h-2.5 bg-[#064823]/25 rounded-full blur-[3px] -mt-2" />
        </div>

        {/* 4. Sleek Dynamic Progress Component */}
        <div className="w-full max-w-[260px] sm:max-w-[290px] mt-6 sm:mt-8 flex flex-col items-center gap-2.5">
          {/* Progress Pill Track */}
          <div className="w-full h-2 bg-[#E2E7DF] rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] relative">
            <div
              className="h-full bg-gradient-to-r from-[#8DC541] via-[#064823] to-[#F7840F] rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${Math.max(6, progress)}%` }}
            >
              {/* Highlight Shimmer Beam */}
              <div className="shimmer-track absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>

          {/* Status Label & Live Percentage */}
          <div className="flex items-center justify-between w-full px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC541] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#064823]/80 uppercase tracking-widest font-manrope">
                {progress < 35
                  ? 'Inspecting Quality'
                  : progress < 70
                  ? 'Cold-Chain Logistics'
                  : progress < 96
                  ? 'Seasoning Freshness'
                  : 'Ready to Serve'}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-black text-[#064823] font-barlow tabular-nums tracking-wider">
              {progress}<span className="text-[10px] font-bold text-[#F7840F] ml-0.5">%</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
