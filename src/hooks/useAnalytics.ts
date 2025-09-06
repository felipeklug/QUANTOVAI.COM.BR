import { useEffect } from 'react';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    // Initialize Google Analytics 4 if not already loaded
    if (typeof window.gtag === 'undefined') {
      // Load gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, []);

  // Track page views
  const trackPageView = (pagePath: string, pageTitle: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pagePath,
        page_title: pageTitle
      });
    }
  };

  // Track calculator usage
  const trackCalculatorUse = (calculatorId: string, calculatorName: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'calculator_use', {
        event_category: 'engagement',
        event_label: calculatorId,
        custom_parameter_1: calculatorName
      });
    }
  };

  // Track calculation completion
  const trackCalculationComplete = (calculatorId: string, inputValues: Record<string, any>) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'calculation_complete', {
        event_category: 'conversion',
        event_label: calculatorId,
        value: 1
      });
    }
  };

  // Track ad clicks
  const trackAdClick = (adSlotId: string, adPosition: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'ad_click', {
        event_category: 'monetization',
        event_label: adSlotId,
        custom_parameter_1: adPosition
      });
    }
  };

  // Track newsletter signup
  const trackNewsletterSignup = (source: string = 'unknown') => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'newsletter_signup', {
        event_category: 'lead_generation',
        event_label: source,
        value: 1
      });
    }
  };

  // Track blog post clicks
  const trackBlogClick = (postTitle: string, postUrl: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'blog_click', {
        event_category: 'engagement',
        event_label: postTitle,
        custom_parameter_1: postUrl
      });
    }
  };

  // Track search usage
  const trackSearch = (searchTerm: string, resultsCount: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        event_category: 'engagement',
        custom_parameter_1: resultsCount
      });
    }
  };

  // Track time spent on calculator
  const trackTimeOnCalculator = (calculatorId: string, timeSpent: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'time_on_calculator', {
        event_category: 'engagement',
        event_label: calculatorId,
        value: Math.round(timeSpent / 1000) // Convert to seconds
      });
    }
  };

  // Track form submissions
  const trackFormSubmission = (formType: string, success: boolean) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'form_submission', {
        event_category: success ? 'conversion' : 'engagement',
        event_label: formType,
        custom_parameter_1: success ? 'success' : 'error'
      });
    }
  };

  // Track external link clicks
  const trackExternalLink = (url: string, linkText: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'external_link_click', {
        event_category: 'engagement',
        event_label: url,
        custom_parameter_1: linkText
      });
    }
  };

  // Track scroll depth
  const trackScrollDepth = (percentage: number, pagePath: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        event_label: pagePath,
        value: percentage
      });
    }
  };

  return {
    trackPageView,
    trackCalculatorUse,
    trackCalculationComplete,
    trackAdClick,
    trackNewsletterSignup,
    trackBlogClick,
    trackSearch,
    trackTimeOnCalculator,
    trackFormSubmission,
    trackExternalLink,
    trackScrollDepth
  };
};

// Hook for scroll depth tracking
export const useScrollDepthTracking = () => {
  const { trackScrollDepth } = useAnalytics();

  useEffect(() => {
    let maxScrollDepth = 0;
    const thresholds = [25, 50, 75, 90, 100];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track milestone thresholds
        thresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
            trackedThresholds.add(threshold);
            trackScrollDepth(threshold, window.location.pathname);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackScrollDepth]);
};

// Hook for time tracking on calculators
export const useCalculatorTimeTracking = (calculatorId: string) => {
  const { trackTimeOnCalculator } = useAnalytics();

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeSpent = Date.now() - startTime;
      if (timeSpent > 10000) { // Only track if spent more than 10 seconds
        trackTimeOnCalculator(calculatorId, timeSpent);
      }
    };
  }, [calculatorId, trackTimeOnCalculator]);
};
