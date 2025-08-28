import React from 'react';
import { motion } from 'framer-motion';

interface PremiumIconWrapperProps {
 children: React.ReactNode;
 className?: string;
 size?: 'sm' | 'md' | 'lg' | 'xl';
 variant?: 'default' | 'gradient' | 'glass' | 'neon';
 color?: 'brand' | 'blue' | 'purple' | 'amber' | 'red';
}

const sizeClasses = {
 sm: 'w-8 h-8',
 md: 'w-12 h-12',
 lg: 'w-16 h-16',
 xl: 'w-20 h-20'
};

const colorClasses = {
 brand: {
 gradient: 'from-brand-500 to-brand-600',
 shadow: 'shadow-brand-500/25',
 glow: 'group-hover:shadow-brand-500/40',
 border: 'border-brand-400/20'
 },
 blue: {
 gradient: 'from-blue-500 to-blue-600',
 shadow: 'shadow-blue-500/25',
 glow: 'group-hover:shadow-blue-500/40',
 border: 'border-blue-400/20'
 },
 purple: {
 gradient: 'from-purple-500 to-purple-600',
 shadow: 'shadow-purple-500/25',
 glow: 'group-hover:shadow-purple-500/40',
 border: 'border-purple-400/20'
 },
 amber: {
 gradient: 'from-amber-500 to-amber-600',
 shadow: 'shadow-amber-500/25',
 glow: 'group-hover:shadow-amber-500/40',
 border: 'border-amber-400/20'
 },
 red: {
 gradient: 'from-red-500 to-red-600',
 shadow: 'shadow-red-500/25',
 glow: 'group-hover:shadow-red-500/40',
 border: 'border-red-400/20'
 }
};

export const PremiumIconWrapper: React.FC<PremiumIconWrapperProps> = ({
 children,
 className = '',
 size = 'md',
 variant = 'gradient',
 color = 'brand'
}) => {
 const colorConfig = colorClasses[color];
 
 const getVariantClasses = () => {
 switch (variant) {
 case 'gradient':
 return `bg-gradient-to-br ${colorConfig.gradient} ${colorConfig.shadow} ${colorConfig.glow} ${colorConfig.border}`;
 
 case 'glass':
 return `bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg ${colorConfig.glow}`;
 
 case 'neon':
 return `bg-gradient-to-br ${colorConfig.gradient} ${colorConfig.shadow} ${colorConfig.glow} ${colorConfig.border} 
 ring-2 ring-offset-2 ring-offset-transparent ring-current/20`;
 
 default:
 return `bg-gradient-to-br ${colorConfig.gradient} ${colorConfig.shadow} ${colorConfig.glow} ${colorConfig.border}`;
 }
 };

 return (
 <motion.div
 whileHover={{ scale: 1.05, rotate: 2 }}
 whileTap={{ scale: 0.95 }}
 className={`
 ${sizeClasses[size]}
 ${getVariantClasses()}
 rounded-2xl flex items-center justify-center
 shadow-lg hover:shadow-xl
 transition-all duration-300
 border relative overflow-hidden
 ${className}
 `}
 >
 {/* Efeito de brilho */}
 <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl" />
 
 {/* Conteúdo do ícone */}
 <div className="relative z-10 text-white drop-shadow-sm">
 {children}
 </div>
 
 {/* Pequenos pontos decorativos */}
 <div className="absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full" />
 <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white/30 rounded-full" />
 </motion.div>
 );
};
