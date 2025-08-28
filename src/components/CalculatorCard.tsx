import React from 'react';
import { motion } from 'framer-motion';
import { useGradientBorder } from '../hooks/useTheme';

interface CalculatorCardProps {
 href: string;
 title: string;
 desc: string;
 Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ href, title, desc, Icon }) => {
 const { getGradientBackground } = useGradientBorder();

 return (
 <motion.a
 href={href}
 whileHover={{
 y: -8,
 scale: 1.02,
 boxShadow: '0 20px 40px rgba(46, 139, 87, 0.15), 0 0 0 1px rgba(46, 139, 87, 0.2)'
 }}
 whileTap={{ scale: 0.98 }}
 className="block p-6 rounded-2xl bg-gradient-to-br from-white to-brand-50/30
 
 border-2 border-transparent bg-gradient-to-r from-brand-500 via-brand-600 to-neutral-800
 shadow-lg shadow-brand-500/10 
 hover:from-brand-400 hover:via-brand-500 hover:to-neutral-700
 hover:shadow-xl hover:shadow-brand-500/20 :shadow-brand-500/10
 transition-all duration-300 group
 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500
 relative overflow-hidden"
 style={getGradientBackground()}
 >
 {/* Efeito de brilho sutil */}
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
 opacity-0 group-hover:opacity-100 transition-opacity duration-500
 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]" />

 <div className="flex items-start gap-4 relative z-10">
 <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600
 
 flex items-center justify-center shadow-lg shadow-brand-500/25
 group-hover:shadow-xl group-hover:shadow-brand-500/40 transition-all duration-300">
 <Icon className="w-10 h-10 text-white drop-shadow-sm" />
 </div>
 <div className="flex-1">
 <h3 className="font-bold text-lg text-neutral-900 mb-2
 group-hover:text-brand-700 :text-brand-300
 transition-colors duration-300">
 {title}
 </h3>
 <p className="text-sm text-neutral-600 leading-relaxed">
 {desc}
 </p>
 </div>
 </div>

 {/* Indicador de ação */}
 <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-brand-500/20
 flex items-center justify-center opacity-0 group-hover:opacity-100
 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
 <svg className="w-3 h-3 text-brand-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
 </svg>
 </div>
 </motion.a>
 );
};
