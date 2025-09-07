import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AdSlot } from './AdSlot';

interface StickyAdProps {
  position?: 'bottom' | 'top';
  className?: string;
  load?: boolean;
}

export const StickyAd: React.FC<StickyAdProps> = ({ 
  position = 'bottom', 
  className = '',
  load = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Show sticky ad after 3 seconds of page load
    const timer = setTimeout(() => {
      if (!isClosed) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isClosed]);

  useEffect(() => {
    // Auto-hide on mobile after 10 seconds to improve UX
    if (isVisible && window.innerWidth < 768) {
      const autoHideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      return () => clearTimeout(autoHideTimer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    
    // Track ad close for analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'ad_close', {
        event_category: 'monetization',
        event_label: 'sticky_ad',
        custom_parameter_1: position
      });
    }
  };

  if (!isVisible || isClosed) {
    return null;
  }

  const positionClasses = position === 'bottom' 
    ? 'bottom-0 border-t' 
    : 'top-0 border-b';

  return (
    <div 
      className={`
        fixed left-0 right-0 z-50 
        bg-white/95 backdrop-blur-sm 
        border-neutral-200 shadow-lg
        ${positionClasses}
        ${className}
      `}
      role="banner"
      aria-label="Anúncio"
    >
      <div className="relative max-w-screen-xl mx-auto px-4 py-2">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="
            absolute top-2 right-2 z-10
            w-6 h-6 rounded-full 
            bg-neutral-800/80 hover:bg-neutral-900
            text-white text-xs
            flex items-center justify-center
            transition-colors duration-200
          "
          aria-label="Fechar anúncio"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Ad content */}
        <div className="flex items-center justify-center min-h-[60px] md:min-h-[90px]">
          <AdSlot
            id={`sticky-ad-${position}`}
            load={load}
            format="horizontal"
            className="w-full max-w-[728px]"
            style={{ minHeight: '60px' }}
          />
        </div>

        {/* Small disclaimer */}
        <div className="text-center">
          <span className="text-xs text-neutral-500">Publicidade</span>
        </div>
      </div>
    </div>
  );
};

// Hook for managing sticky ad visibility
export const useStickyAd = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    let hasScrolled = false;

    const handleScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true;
        
        // Show sticky ad after user scrolls
        scrollTimer = setTimeout(() => {
          setShouldShow(true);
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return { shouldShow };
};
