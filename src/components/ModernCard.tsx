import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useGradientBorder } from '../hooks/useTheme';

interface ModernCardProps {
 href: string;
 title: string;
 desc: string;
 Icon: React.FC<React.SVGProps<SVGSVGElement>>;
 featured?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({
 href,
 title,
 desc,
 Icon,
 featured = false
}) => {
 const { getGradientBackground } = useGradientBorder();

 return (
 <motion.a
 href={href}
 whileHover={{
 y: -6,
 scale: 1.02,
 }}
 whileTap={{ scale: 0.98 }}
 className="group relative block p-6 rounded-2xl
 border-2 border-transparent
 shadow-lg shadow-brand-500/10 
 hover:shadow-xl hover:shadow-brand-500/20 :shadow-brand-500/10
 transition-all duration-300
 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
 style={getGradientBackground()}
 >

 <div className="flex items-start gap-4">
 {/* Icon Container */}
 <div className="flex-shrink-0 w-20 h-20 rounded-2xl
 bg-gradient-to-br from-brand-500 to-brand-600
 
 flex items-center justify-center shadow-lg shadow-brand-500/25
 group-hover:shadow-xl group-hover:shadow-brand-500/40
 group-hover:scale-110 transition-all duration-300
 border border-brand-500/30">
 <Icon className="w-14 h-14 text-white drop-shadow-sm" />
 </div>

 {/* Content */}
 <div className="flex-1">
 <h3 className="text-xl font-bold text-neutral-900 mb-2
 group-hover:text-brand-600 :text-brand-400
 transition-colors duration-300">
 {title}
 </h3>

 <p className="text-neutral-600 text-sm leading-relaxed">
 {desc}
 </p>
 </div>

 {/* Action Indicator */}
 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-500/10 
 flex items-center justify-center
 group-hover:bg-brand-500 :bg-brand-400
 transition-all duration-300">
 <ArrowRight className="w-4 h-4 text-brand-600 
 group-hover:text-white transition-colors duration-300" />
 </div>
 </div>
 </motion.a>
 );
};
