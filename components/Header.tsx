import React, { useState } from "react";
import { useTheme } from '../hooks/useTheme';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

// Sheet component inspired by shadcn/ui
const Sheet: React.FC<{
 isOpen: boolean;
 onClose: () => void;
 children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
 return (
 <AnimatePresence>
 {isOpen && (
 <>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.3 }}
 onClick={onClose}
 className="fixed inset-0 bg-black/60 z-40 md:hidden"
 aria-hidden="true"
 />
 <motion.div
 initial={{ x: '100%' }}
 animate={{ x: 0 }}
 exit={{ x: '100%' }}
 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
 className="fixed top-0 right-0 h-full w-full max-w-xs bg-surface z-50 shadow-lg md:hidden"
 role="dialog"
 aria-modal="true"
 >
 {children}
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
};

export function Header() {
 useTheme(); // Inicializa o tema claro
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const navLinks = [
 { href: "/", label: "Calculadoras" },
 { href: "/blog", label: "Blog" },
 { href: "/como-funciona", label: "Como funciona" },
 { href: "/sobre", label: "Sobre" },
 ];

 return (
 <header className="sticky top-0 z-50 w-full border-b-2 border-transparent
 bg-white/90 backdrop-blur-xl
 shadow-sm shadow-brand-500/5"
 style={{
 borderImage: 'linear-gradient(to right, #10B981, #059669, #1F2937) 1'
 }}>
 <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
 <a href="/" aria-label="Página inicial do QuantoVai"
 className="transition-transform duration-300 hover:scale-105">
 <Logo className="h-10" />
 </a>

 <nav className="hidden md:flex items-center gap-10 text-base">
 {navLinks.map(link => (
 <a key={link.href}
 href={link.href}
 className="relative font-semibold text-neutral-700
 hover:text-brand-600
 transition-all duration-300 group py-2 px-1">
 {link.label}
 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-500 to-brand-600
 group-hover:w-full transition-all duration-300 rounded-full" />
 </a>
 ))}
 </nav>
 
 <div className="md:hidden">
 <button
 onClick={() => setIsMenuOpen(true)}
 className="p-3 text-neutral-700
 bg-gradient-to-br from-neutral-100 to-neutral-200
 hover:from-brand-100 hover:to-brand-200
 hover:text-brand-700
 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md
 border border-neutral-200/50
 hover:border-brand-500"
 aria-label="Abrir menu"
 >
 <Menu className="h-5 w-5" />
 </button>
 </div>
 </div>

 <Sheet isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
 <div className="p-4 h-full flex flex-col">
 <div className="flex items-center justify-between mb-8">
 <a href="/" aria-label="Página inicial do QuantoVai">
 <Logo className="h-8" />
 </a>
 <button onClick={() => setIsMenuOpen(false)} className="p-2" aria-label="Fechar menu">
 <X className="h-6 w-6 text-neutral-700" />
 </button>
 </div>
 <nav className="flex-grow space-y-3">
 {navLinks.map(link => (
 <a key={link.href} href={link.href} className="block text-neutral-700 hover:text-brand-500 transition-colors py-2 font-medium text-lg">{link.label}</a>
 ))}
 </nav>
 </div>
 </Sheet>
 </header>
 );
}
