import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  variant?: 'full' | 'icon-only' | 'responsive';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className,
  variant = 'full',
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-8 md:h-9',
    md: 'h-9 md:h-10 lg:h-11',
    lg: 'h-10 md:h-11 lg:h-12'
  };

  // For responsive variant, show icon-only on mobile, full on desktop
  if (variant === 'responsive') {
    return (
      <>
        {/* Mobile: Icon only */}
        <img
          src="/logo-icon-only.svg"
          alt="QuantoVai"
          className={cn(
            'w-auto md:hidden', // Show only on mobile
            sizeClasses[size],
            'object-contain object-center',
            'transition-transform duration-300',
            'hover:scale-105',
            'flex-shrink-0',
            'max-w-none',
            'overflow-visible',
            className
          )}
          style={{
            imageRendering: 'crisp-edges',
            WebkitImageRendering: 'crisp-edges',
            MozImageRendering: 'crisp-edges',
            objectPosition: 'center',
            ...props.style
          }}
          {...props}
        />
        {/* Desktop: Full logo */}
        <img
          src="/logo-quantovai.svg"
          alt="QuantoVai - Calculadoras para Construção"
          className={cn(
            'w-auto hidden md:block', // Show only on desktop
            sizeClasses[size],
            'object-contain object-center',
            'transition-transform duration-300',
            'hover:scale-105',
            'flex-shrink-0',
            'max-w-none',
            'overflow-visible',
            className
          )}
          style={{
            imageRendering: 'crisp-edges',
            WebkitImageRendering: 'crisp-edges',
            MozImageRendering: 'crisp-edges',
            objectPosition: 'center',
            ...props.style
          }}
          {...props}
        />
      </>
    );
  }

  // Single variant (full or icon-only)
  const logoSrc = variant === 'icon-only' ? '/logo-icon-only.svg' : '/logo-quantovai.svg';

  return (
    <img
      src={logoSrc}
      alt="QuantoVai - Calculadoras para Construção"
      className={cn(
        'w-auto', // Auto width to maintain aspect ratio
        sizeClasses[size], // Responsive sizing
        'object-contain object-center', // Maintain aspect ratio and center
        'transition-transform duration-300', // Smooth hover effects
        'hover:scale-105', // Subtle hover effect
        'max-w-none', // Allow full width
        'flex-shrink-0', // Prevent shrinking
        'overflow-visible', // Allow content to overflow if needed
        className
      )}
      style={{
        imageRendering: 'crisp-edges',
        WebkitImageRendering: 'crisp-edges',
        MozImageRendering: 'crisp-edges',
        ...props.style
      }}
      {...props}
    />
  );
};
