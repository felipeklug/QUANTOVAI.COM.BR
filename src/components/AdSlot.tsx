import React, { useEffect, useRef } from "react";
import { cn } from '../lib/utils';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

type AdSlotProps = {
  id: string;
  className?: string;
  load?: boolean;
  slot?: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  style?: React.CSSProperties;
};

export function AdSlot({
  id,
  className = "",
  load = false,
  slot,
  format = 'auto',
  responsive = true,
  style = {}
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adLoadedRef = useRef(false);

  useEffect(() => {
    if (!load || adLoadedRef.current) return;

    // Only load if we have a valid slot ID or if it's auto ads
    if (!slot && format !== 'auto') return;

    try {
      // Initialize adsbygoogle array if not exists
      window.adsbygoogle = window.adsbygoogle || [];

      // Push the ad configuration
      window.adsbygoogle.push({});

      adLoadedRef.current = true;

      // Track ad load for analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'ad_load', {
          event_category: 'monetization',
          event_label: id,
          custom_parameter_1: slot || 'auto'
        });
      }

    } catch (e) {
      console.error("Ad loading failed for slot", id, e);
    }
  }, [load, id, slot, format]);

  // Auto ads don't need specific slots
  if (format === 'auto') {
    return (
      <div
        ref={adRef}
        id={id}
        className={cn("ad-slot-auto", className)}
        aria-label="Espaço publicitário"
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', ...style }}
          data-ad-client="ca-pub-4423698770772857"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Manual ad slots with specific configurations
  const getAdStyle = () => {
    const baseStyle = { display: 'block', ...style };

    switch (format) {
      case 'rectangle':
        return { ...baseStyle, width: '336px', height: '280px' };
      case 'vertical':
        return { ...baseStyle, width: '160px', height: '600px' };
      case 'horizontal':
        return { ...baseStyle, width: '728px', height: '90px' };
      default:
        return baseStyle;
    }
  };

  return (
    <div
      ref={adRef}
      id={id}
      className={cn(
        "ad-slot",
        format === 'rectangle' && "max-w-[336px] mx-auto",
        format === 'vertical' && "max-w-[160px]",
        format === 'horizontal' && "max-w-[728px] mx-auto",
        className
      )}
      aria-label="Espaço publicitário"
    >
      <ins
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client="ca-pub-4423698770772857"
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
