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
      '/know-your-meat',
      '/recipes',
      '/franchise',
      '/team',
      '/vlog',
      '/contact',
      '/about',
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
      // Use higher worker concurrency (16) so hundreds of assets load in parallel
      const engine = new AssetPreloadEngine(PRELOAD_ASSETS, {
        concurrency: 16,
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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F4F2] transition-opacity duration-500 ease-in-out"
      style={{ opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      <style>{`
        body.preloader-active > *:not(#preloader-root) {
          opacity: 0 !important;
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 10px 40px -10px rgba(6, 72, 35, 0.18), 0 0 0 1px rgba(141, 197, 65, 0.2);
          }
          50% {
            box-shadow: 0 16px 50px -8px rgba(6, 72, 35, 0.26), 0 0 0 1px rgba(141, 197, 65, 0.4);
          }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .preloader-card {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        .preloader-mascot {
          animation: gentleFloat 2.4s ease-in-out infinite;
        }
      `}</style>

      {/* Main Glassmorphic Container Card */}
      <div className="relative flex flex-col items-center">
        {/* Ambient Backlight Glow */}
        <div className="absolute -inset-8 bg-gradient-to-tr from-[#064823]/10 via-[#8DC541]/15 to-[#F7840F]/10 rounded-full blur-2xl pointer-events-none -z-10" />

        {/* Circular Hub with Smooth SVG Circular Progress Indicator */}
        <div className="preloader-card relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white flex items-center justify-center p-3 transition-all duration-300">
          
          {/* Precise Circular SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1.5" viewBox="0 0 100 100">
            {/* Background Track Ring */}
            <circle
              cx="50"
              cy="50"
              r="46"
              className="text-[#E8ECE7]"
              strokeWidth="3"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated Dynamic Gradient Fill Ring */}
            <defs>
              <linearGradient id="meatinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8DC541" />
                <stop offset="50%" stopColor="#064823" />
                <stop offset="100%" stopColor="#F7840F" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="url(#meatinGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="transparent"
              style={{
                strokeDasharray: 2 * Math.PI * 46,
                strokeDashoffset: 2 * Math.PI * 46 * (1 - progress / 100),
                transition: 'stroke-dashoffset 0.35s ease-out',
              }}
            />
          </svg>

          {/* Inner Content Display */}
          <div className="relative z-10 w-full h-full rounded-full flex flex-col items-center justify-center px-4 py-2 select-none">
            {/* Clean Cropped Running Mascot */}
            <div className="preloader-mascot relative w-28 h-24 sm:w-32 sm:h-28 flex items-center justify-center -mt-1">
              <Image
                src="/preloader-running-clean.gif"
                alt="MEATiN Mascot"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>

            {/* Official MEATiN Logo Badge */}
            <div className="relative w-28 sm:w-32 h-9 sm:h-10 mt-0.5">
              <Image
                src="/meatin-logo.webp"
                alt="MEATiN"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Status Block with Elegant Progress & Live Percentage */}
        <div className="mt-8 flex flex-col items-center gap-2 text-center select-none">
          {/* Linear Progress Bar Accent */}
          <div className="w-48 sm:w-56 h-1.5 bg-[#E2E8E0] rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#8DC541] via-[#064823] to-[#F7840F] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.max(6, progress)}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-48 sm:w-56 px-0.5 mt-1">
            <span className="text-[11px] font-bold text-[#064823]/70 uppercase tracking-widest font-manrope">
              {progress < 40 ? 'Preparing Experience' : progress < 80 ? 'Seasoning Quality' : 'Ready to Serve'}
            </span>
            <span className="text-xs font-black text-[#064823] font-manrope tabular-nums">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
