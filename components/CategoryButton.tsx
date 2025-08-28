import React from 'react';
import { motion } from 'framer-motion';

interface CategoryButtonProps {
 href: string;
 title: string;
 Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({ href, title, Icon }) => {
 return (
 <motion.a
 href={href}
 whileHover={{
 y: -6,
 scale: 1.03,
 boxShadow: '0 20px 40px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.2)'
 }}
 whileTap={{ scale: 0.97 }}
 className="flex flex-col items-center justify-center text-center p-4 rounded-2xl
 bg-gradient-to-br from-white to-neutral-50/50
 
 border border-neutral-200/60 
 shadow-lg shadow-neutral-500/10 
 hover:border-brand-500 :border-brand-500
 hover:shadow-xl hover:shadow-brand-500/20 :shadow-brand-500/10
 transition-all duration-300 group
 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500
 h-40 relative overflow-hidden"
 >
 {/* Efeito de brilho sutil */}
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
 opacity-0 group-hover:opacity-100 transition-opacity duration-500
 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]" />

 <div className="w-20 h-20 mb-3 flex items-center justify-center rounded-2xl
 bg-gradient-to-br from-brand-500 to-brand-600
 
 shadow-lg shadow-brand-500/25
 group-hover:shadow-xl group-hover:shadow-brand-500/40
 group-hover:scale-110 transition-all duration-300
 border border-brand-500/30 relative z-10">
 <Icon className="w-14 h-14 text-white drop-shadow-sm" />
 </div>

 <span className="font-semibold text-sm text-neutral-900 leading-tight
 group-hover:text-brand-700 :text-brand-300
 transition-colors duration-300 text-center relative z-10">
 {title}
 </span>
 </motion.a>
 );
};
