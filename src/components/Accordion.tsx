import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useGradientBorder } from '../hooks/useTheme';

interface AccordionProps {
 title: string;
 children: React.ReactNode;
 defaultOpen?: boolean;
 className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
 title,
 children,
 defaultOpen = false,
 className = ''
}) => {
 const [isOpen, setIsOpen] = useState(defaultOpen);
 const { getGradientBackground } = useGradientBorder();

 return (
 <div className={cn(
 'border-2 border-transparent rounded-xl shadow-lg shadow-brand-500/10',
 'bg-white',
 className
 )}
 style={getGradientBackground()}>
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="w-full px-6 py-5 flex items-center justify-between
 text-left hover:bg-brand-50 transition-colors
 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset
 rounded-t-xl"
 aria-expanded={isOpen}
 >
 <span className="text-neutral-900 font-semibold text-lg">
 {title}
 </span>
 <motion.div
 animate={{ rotate: isOpen ? 180 : 0 }}
 transition={{ duration: 0.2 }}
 >
 <ChevronDown className="w-5 h-5 text-brand-600" />
 </motion.div>
 </button>

 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.2 }}
 className="overflow-hidden"
 >
 <div className="px-6 pb-5 border-t-2 border-transparent"
 style={{
 borderImage: 'linear-gradient(to right, #10B981, #059669, #1F2937) 1'
 }}>
 <div className="pt-4 text-neutral-800 text-base leading-relaxed">
 {children}
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
};
