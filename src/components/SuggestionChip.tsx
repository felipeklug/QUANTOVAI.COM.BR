import React from 'react';
import { useGradientBorder } from '../hooks/useTheme';

interface SuggestionChipProps {
 href: string;
 children: React.ReactNode;
 className?: string;
}

export const SuggestionChip: React.FC<SuggestionChipProps> = ({
 href,
 children,
 className = ''
}) => {
 return (
 <a
 href={href}
 className={`px-6 py-3 text-sm font-semibold text-white
 bg-brand-500 hover:bg-brand-600
 rounded-full hover:scale-105 active:scale-95
 shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30
 transition-all duration-300 backdrop-blur-sm
 hover:text-white inline-block ${className}`}
 >
 {children}
 </a>
 );
};
