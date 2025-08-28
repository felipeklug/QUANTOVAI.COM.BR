import React from 'react';
import { useGradientBorder } from '../hooks/useTheme';

interface ChipProps {
 children: React.ReactNode;
 active?: boolean;
 onClick?: () => void;
 className?: string;
}

export const Chip: React.FC<ChipProps> = ({
 children,
 active = false,
 onClick,
 className = ''
}) => {
 const { getGradientBackground } = useGradientBorder();

 return (
 <button
 onClick={onClick}
 className={`
 inline-flex items-center px-4 py-2 rounded-lg text-caption
 font-medium transition-all duration-200 whitespace-nowrap
 min-h-touch space-x-2 border-2 border-transparent
 ${active
 ? 'bg-brand-500 text-white'
 : 'text-text hover:bg-brand-200 hover:text-brand-700'
 }
 ${className}
 `}
 style={!active ? getGradientBackground() : {}}
 >
 {children}
 </button>
 );
};
