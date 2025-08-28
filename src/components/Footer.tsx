import React from 'react';
import { Logo } from './Logo';
import { Calculator, Home, Mail, Shield, FileText, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
 const currentYear = new Date().getFullYear();
 return (
 <footer className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white overflow-hidden">
 {/* Padrão de fundo decorativo */}
 <div className="absolute inset-0 opacity-5">
 <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full" />
 <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full" />
 <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full" />
 </div>

 <div className="relative mx-auto max-w-6xl px-6 py-16">
 <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
 {/* Seção principal da marca */}
 <div className="md:col-span-5">
 <a href="/" className="inline-block mb-6 group" aria-label="Página inicial do QuantoVai">
 <Logo className="h-12 text-white transition-transform duration-300 group-hover:scale-105" />
 </a>
 <p className="text-neutral-200 text-lg leading-relaxed mb-6 max-w-md">
 Calculadoras gratuitas e precisas para sua obra e jardim.
 <span className="text-brand-200 font-medium"> Planeje, calcule e economize</span> com confiança.
 </p>

 {/* Estatísticas */}
 <div className="grid grid-cols-2 gap-4 mb-6">
 <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
 <div className="text-2xl font-bold text-brand-200">9+</div>
 <div className="text-sm text-neutral-300">Calculadoras</div>
 </div>
 <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
 <div className="text-2xl font-bold text-brand-200">100%</div>
 <div className="text-sm text-neutral-300">Gratuito</div>
 </div>
 </div>
 </div>

 {/* Navegação */}
 <div className="md:col-span-3">
 <h4 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
 <Home className="w-5 h-5 text-brand-300" />
 Navegação
 </h4>
 <div className="space-y-4">
 {[
 { href: "/", label: "Calculadoras", icon: Calculator },
 { href: "/blog", label: "Blog", icon: FileText },
 { href: "/como-funciona", label: "Como Funciona", icon: Shield },
 { href: "/sobre", label: "Sobre", icon: Heart }
 ].map(({ href, label, icon: Icon }) => (
 <a key={href} href={href}
 className="flex items-center gap-3 text-neutral-300 hover:text-brand-200
 transition-all duration-300 group py-1">
 <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
 <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
 </a>
 ))}
 </div>
 </div>

 {/* Legal e Contato */}
 <div className="md:col-span-4">
 <h4 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
 <Shield className="w-5 h-5 text-brand-300" />
 Legal & Contato
 </h4>
 <div className="space-y-4 mb-6">
 {[
 { href: "#", label: "Termos de Uso" },
 { href: "#", label: "Política de Privacidade" },
 { href: "#", label: "Contato" }
 ].map(({ href, label }) => (
 <a key={label} href={href}
 className="flex items-center gap-3 text-neutral-300 hover:text-brand-200
 transition-all duration-300 group py-1">
 <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
 <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
 </a>
 ))}
 </div>

 {/* Badge de qualidade */}
 <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-700/50 rounded-full border border-brand-500/30">
 <Shield className="w-4 h-4 text-brand-300" />
 <span className="text-sm font-medium text-brand-200">Cálculos Verificados</span>
 </div>
 </div>
 </div>

 {/* Linha divisória com gradiente */}
 <div className="relative my-12">
 <div className="absolute inset-0 flex items-center">
 <div className="w-full border-t border-gradient-to-r from-transparent via-white/20 to-transparent"></div>
 </div>
 <div className="relative flex justify-center">
 <div className="bg-brand-800 px-6 py-2 rounded-full border border-white/10">
 <Calculator className="w-5 h-5 text-brand-300" />
 </div>
 </div>
 </div>

 {/* Copyright */}
 <div className="text-center">
 <p className="text-neutral-400 text-sm leading-relaxed max-w-4xl mx-auto">
 © {currentYear} <span className="text-brand-200 font-medium">QuantoVai</span>.
 Todos os direitos reservados. As calculadoras fornecem estimativas baseadas em padrões da construção civil
 e não substituem a orientação de um profissional qualificado.
 </p>
 <p className="text-neutral-500 text-xs mt-2">
 Desenvolvido com <Heart className="w-3 h-3 inline text-red-400" /> para facilitar seus projetos
 </p>
 </div>
 </div>
 </footer>
 );
};
