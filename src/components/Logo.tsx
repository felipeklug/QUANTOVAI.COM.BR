import React from 'react';
import { cn } from '../lib/utils';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('w-auto', className)}
    {...props}
  >
    <defs>
      <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" className="text-brand-500" />
        <stop offset="50%" stopColor="currentColor" className="text-brand-600" />
        <stop offset="100%" stopColor="currentColor" className="text-brand-700" />
      </linearGradient>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" className="text-neutral-800 dark:text-white" />
        <stop offset="50%" stopColor="currentColor" className="text-brand-700 dark:text-brand-400" />
        <stop offset="100%" stopColor="currentColor" className="text-brand-600 dark:text-brand-300" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <g className="group">
      {/* Casa moderna premium */}
      <g transform="translate(2, 4)">
        {/* Base da casa */}
        <rect x="4" y="16" width="20" height="16" rx="1" fill="url(#houseGradient)" />

        {/* Telhado moderno */}
        <path d="M2 16L14 6L26 16H24L14 8L4 16H2Z" fill="url(#houseGradient)" opacity="0.9" />

        {/* Janelas modernas */}
        <rect x="7" y="19" width="4" height="5" rx="0.5" className="fill-white/95" />
        <rect x="17" y="19" width="4" height="5" rx="0.5" className="fill-white/95" />
        <path d="M9 19v5M7 21.5h4M19 19v5M17 21.5h4" className="stroke-brand-600" strokeWidth="0.5" />

        {/* Porta de entrada premium */}
        <rect x="11" y="25" width="6" height="7" rx="0.5" className="fill-white/98" />
        <circle cx="15.5" cy="28" r="0.3" className="fill-brand-600" />
        <path d="M11 29h6" className="stroke-brand-600" strokeWidth="0.3" />

        {/* Elementos arquitetônicos */}
        <rect x="3" y="15" width="22" height="1" className="fill-brand-600" opacity="0.7" />
        <rect x="13" y="12" width="2" height="4" className="fill-brand-700" />

        {/* Calculadora integrada no design */}
        <rect x="26" y="20" width="6" height="8" rx="1" className="fill-brand-600" opacity="0.9" filter="url(#glow)" />
        <rect x="27" y="21" width="1" height="1" className="fill-white" opacity="0.95" />
        <rect x="29" y="21" width="1" height="1" className="fill-white" opacity="0.95" />
        <rect x="31" y="21" width="1" height="1" className="fill-white" opacity="0.95" />
        <rect x="27" y="23" width="1" height="1" className="fill-white" opacity="0.95" />
        <rect x="29" y="23" width="1" height="1" className="fill-white" opacity="0.95" />
        <rect x="31" y="23" width="1" height="1" className="fill-white" opacity="0.95" />
        <rect x="27" y="25" width="4" height="1" className="fill-white" opacity="0.95" />
      </g>

      {/* Texto QUANTOVAI premium */}
      <text
        x="40"
        y="18"
        fill="url(#textGradient)"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          fontWeight: '800',
          letterSpacing: '-0.03em'
        }}
      >
        QUANTO
      </text>
      <text
        x="40"
        y="32"
        className="fill-current text-brand-500"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          fontWeight: '800',
          letterSpacing: '-0.03em'
        }}
      >
        VAI
      </text>

      {/* Tagline premium */}
      <text
        x="110"
        y="20"
        className="fill-current text-neutral-600 dark:text-neutral-400"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '9px',
          fontWeight: '600',
          letterSpacing: '0.1em'
        }}
      >
        CALCULADORAS
      </text>
      <text
        x="110"
        y="30"
        className="fill-current text-neutral-500 dark:text-neutral-500"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '8px',
          fontWeight: '500',
          letterSpacing: '0.05em'
        }}
      >
        CONSTRUÇÃO
      </text>
    </g>
  </svg>
);
