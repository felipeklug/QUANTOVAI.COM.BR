import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: number;
}

// Ícone Premium para Pisos e Azulejos
export const FloorTilesPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="tileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-brand-400" />
 <stop offset="100%" stopColor="currentColor" className="text-brand-600" />
 </linearGradient>
 <pattern id="tilePattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
 <rect width="15" height="15" fill="url(#tileGradient)" stroke="currentColor" strokeWidth="0.5" className="text-brand-700" />
 </pattern>
 </defs>
 
 {/* Base do piso */}
 <rect x="4" y="4" width="56" height="56" rx="4" fill="currentColor" className="text-neutral-200 " />
 
 {/* Azulejos com padrão */}
 <rect x="8" y="8" width="48" height="48" fill="url(#tilePattern)" />
 
 {/* Rejunte destacado */}
 <g stroke="currentColor" strokeWidth="1" className="text-brand-700" opacity="0.8">
 <line x1="24" y1="8" x2="24" y2="56" />
 <line x1="40" y1="8" x2="40" y2="56" />
 <line x1="8" y1="24" x2="56" y2="24" />
 <line x1="8" y1="40" x2="56" y2="40" />
 </g>
 
 {/* Brilho nos azulejos */}
 <rect x="10" y="10" width="12" height="12" fill="currentColor" className="text-white" opacity="0.3" />
 <rect x="26" y="26" width="12" height="12" fill="currentColor" className="text-white" opacity="0.2" />
 <rect x="42" y="10" width="12" height="12" fill="currentColor" className="text-white" opacity="0.25" />
 </svg>
);

// Ícone Premium para Ar Condicionado
export const ACPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="acGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-brand-400" />
 <stop offset="100%" stopColor="currentColor" className="text-brand-600" />
 </linearGradient>
 </defs>
 
 {/* Unidade externa do AC */}
 <rect x="8" y="16" width="48" height="32" rx="6" fill="url(#acGradient)" />
 
 {/* Grades de ventilação */}
 <g stroke="currentColor" strokeWidth="2" className="text-white" opacity="0.9">
 <line x1="12" y1="22" x2="52" y2="22" />
 <line x1="12" y1="28" x2="52" y2="28" />
 <line x1="12" y1="34" x2="52" y2="34" />
 <line x1="12" y1="40" x2="52" y2="40" />
 </g>
 
 {/* Ventilador interno */}
 <circle cx="32" cy="32" r="8" fill="currentColor" className="text-brand-700" />
 <circle cx="32" cy="32" r="6" fill="currentColor" className="text-white" opacity="0.9" />
 
 {/* Pás do ventilador */}
 <g transform="rotate(0 32 32)">
 <ellipse cx="32" cy="26" rx="2" ry="6" fill="currentColor" className="text-brand-600" />
 <ellipse cx="38" cy="32" rx="6" ry="2" fill="currentColor" className="text-brand-600" />
 <ellipse cx="32" cy="38" rx="2" ry="6" fill="currentColor" className="text-brand-600" />
 <ellipse cx="26" cy="32" rx="6" ry="2" fill="currentColor" className="text-brand-600" />
 </g>
 
 {/* Fluxo de ar frio */}
 <g stroke="currentColor" strokeWidth="2" className="text-blue-400" opacity="0.6">
 <path d="M32 48 Q28 54 24 60" fill="none" strokeLinecap="round" />
 <path d="M32 48 Q32 54 32 60" fill="none" strokeLinecap="round" />
 <path d="M32 48 Q36 54 40 60" fill="none" strokeLinecap="round" />
 </g>
 
 {/* Painel de controle */}
 <rect x="44" y="18" width="8" height="12" rx="2" fill="currentColor" className="text-brand-800" />
 <circle cx="48" cy="21" r="1" fill="currentColor" className="text-green-400" />
 <circle cx="48" cy="24" r="1" fill="currentColor" className="text-red-400" />
 <circle cx="48" cy="27" r="1" fill="currentColor" className="text-blue-400" />
 </svg>
);

// Ícone Premium para Pintura
export const PaintPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="paintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-brand-400" />
 <stop offset="100%" stopColor="currentColor" className="text-brand-600" />
 </linearGradient>
 </defs>
 
 {/* Rolo de pintura */}
 <rect x="12" y="20" width="32" height="12" rx="6" fill="url(#paintGradient)" />
 
 {/* Cabo do rolo */}
 <rect x="44" y="24" width="16" height="4" rx="2" fill="currentColor" className="text-neutral-600 " />
 
 {/* Punho */}
 <rect x="58" y="22" width="4" height="8" rx="2" fill="currentColor" className="text-neutral-700 " />
 
 {/* Tinta escorrendo */}
 <g fill="currentColor" className="text-brand-500" opacity="0.8">
 <path d="M16 32 Q14 36 12 40 Q10 44 8 48" strokeWidth="2" stroke="currentColor" fill="none" />
 <path d="M24 32 Q22 36 20 40 Q18 44 16 48" strokeWidth="2" stroke="currentColor" fill="none" />
 <path d="M32 32 Q30 36 28 40 Q26 44 24 48" strokeWidth="2" stroke="currentColor" fill="none" />
 <path d="M40 32 Q38 36 36 40 Q34 44 32 48" strokeWidth="2" stroke="currentColor" fill="none" />
 </g>
 
 {/* Gotas de tinta */}
 <circle cx="14" cy="48" r="2" fill="currentColor" className="text-brand-500" />
 <circle cx="22" cy="50" r="1.5" fill="currentColor" className="text-brand-500" />
 <circle cx="30" cy="52" r="1" fill="currentColor" className="text-brand-500" />
 
 {/* Balde de tinta */}
 <path d="M8 52 L20 52 L18 60 L10 60 Z" fill="currentColor" className="text-neutral-300 " />
 <ellipse cx="14" cy="52" rx="6" ry="2" fill="currentColor" className="text-brand-500" />
 
 {/* Alça do balde */}
 <path d="M8 52 Q6 48 8 44" stroke="currentColor" strokeWidth="2" className="text-neutral-400" fill="none" />
 <path d="M20 52 Q22 48 20 44" stroke="currentColor" strokeWidth="2" className="text-neutral-400" fill="none" />
 </svg>
);

// Ícone Premium para Concreto/Betoneira
export const ConcretePremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="concreteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-brand-400" />
 <stop offset="100%" stopColor="currentColor" className="text-brand-600" />
 </linearGradient>
 </defs>
 
 {/* Base da betoneira */}
 <rect x="20" y="48" width="24" height="8" rx="4" fill="currentColor" className="text-neutral-600 " />
 
 {/* Rodas */}
 <circle cx="24" cy="56" r="4" fill="currentColor" className="text-neutral-700 " />
 <circle cx="40" cy="56" r="4" fill="currentColor" className="text-neutral-700 " />
 <circle cx="24" cy="56" r="2" fill="currentColor" className="text-neutral-500" />
 <circle cx="40" cy="56" r="2" fill="currentColor" className="text-neutral-500" />
 
 {/* Tambor da betoneira */}
 <ellipse cx="32" cy="32" rx="16" ry="20" fill="url(#concreteGradient)" />
 
 {/* Abertura do tambor */}
 <ellipse cx="32" cy="16" rx="8" ry="4" fill="currentColor" className="text-brand-700" />
 
 {/* Concreto dentro */}
 <ellipse cx="32" cy="35" rx="12" ry="15" fill="currentColor" className="text-neutral-400 " />
 
 {/* Pás misturadoras */}
 <g stroke="currentColor" strokeWidth="2" className="text-brand-700">
 <path d="M24 28 L40 36" />
 <path d="M40 28 L24 36" />
 <path d="M32 24 L32 40" />
 </g>
 
 {/* Motor */}
 <rect x="48" y="28" width="8" height="12" rx="2" fill="currentColor" className="text-neutral-700 " />
 <circle cx="52" cy="34" r="2" fill="currentColor" className="text-red-500" />
 
 {/* Cabo de força */}
 <path d="M56 34 Q60 30 62 26" stroke="currentColor" strokeWidth="2" className="text-neutral-800 " fill="none" />
 
 {/* Partículas de concreto */}
 <g fill="currentColor" className="text-neutral-500" opacity="0.6">
 <circle cx="28" cy="20" r="1" />
 <circle cx="36" cy="18" r="0.8" />
 <circle cx="30" cy="22" r="0.6" />
 <circle cx="34" cy="20" r="0.7" />
 </g>
 </svg>
);

// Ícone Premium para Argamassa
export const MortarPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="mortarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-brand-400" />
 <stop offset="100%" stopColor="currentColor" className="text-brand-600" />
 </linearGradient>
 </defs>

 {/* Saco de argamassa */}
 <path d="M16 12 L48 12 L50 52 L14 52 Z" fill="url(#mortarGradient)" />

 {/* Dobra superior do saco */}
 <path d="M16 12 L20 8 L44 8 L48 12" fill="currentColor" className="text-brand-600" />

 {/* Texto/marca no saco */}
 <rect x="20" y="18" width="24" height="8" rx="2" fill="currentColor" className="text-white" opacity="0.9" />
 <rect x="22" y="20" width="20" height="1" fill="currentColor" className="text-brand-600" />
 <rect x="22" y="22" width="16" height="1" fill="currentColor" className="text-brand-600" />
 <rect x="22" y="24" width="12" height="1" fill="currentColor" className="text-brand-600" />

 {/* Textura do saco */}
 <g stroke="currentColor" strokeWidth="0.5" className="text-brand-700" opacity="0.4">
 <line x1="18" y1="30" x2="46" y2="30" />
 <line x1="18" y1="35" x2="46" y2="35" />
 <line x1="18" y1="40" x2="46" y2="40" />
 <line x1="18" y1="45" x2="46" y2="45" />
 </g>

 {/* Argamassa derramando */}
 <path d="M32 52 Q30 56 28 60 Q26 62 24 62" stroke="currentColor" strokeWidth="3" className="text-neutral-400" fill="none" strokeLinecap="round" />
 <path d="M36 52 Q38 56 40 60 Q42 62 44 62" stroke="currentColor" strokeWidth="2" className="text-neutral-400" fill="none" strokeLinecap="round" />

 {/* Pilha de argamassa */}
 <ellipse cx="34" cy="60" rx="8" ry="3" fill="currentColor" className="text-neutral-300 " />

 {/* Desempenadeira */}
 <rect x="52" y="32" width="8" height="16" rx="1" fill="currentColor" className="text-neutral-600 " />
 <rect x="54" y="30" width="4" height="2" fill="currentColor" className="text-neutral-700 " />

 {/* Cabo da desempenadeira */}
 <rect x="56" y="20" width="2" height="12" rx="1" fill="currentColor" className="text-amber-600" />
 </svg>
);

// Ícone Premium para Papel de Parede
export const WallpaperPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="wallpaperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-brand-400" />
 <stop offset="100%" stopColor="currentColor" className="text-brand-600" />
 </linearGradient>
 <pattern id="wallpaperPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
 <circle cx="4" cy="4" r="1.5" fill="currentColor" className="text-brand-300" opacity="0.6" />
 </pattern>
 </defs>

 {/* Parede de fundo */}
 <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" className="text-neutral-200 " />

 {/* Papel de parede aplicado */}
 <rect x="8" y="8" width="32" height="48" fill="url(#wallpaperGradient)" />
 <rect x="8" y="8" width="32" height="48" fill="url(#wallpaperPattern)" />

 {/* Rolo de papel */}
 <rect x="40" y="12" width="16" height="40" rx="2" fill="currentColor" className="text-amber-100 " />

 {/* Papel desenrolando */}
 <path d="M40 20 Q36 22 32 20 Q28 18 24 20" stroke="currentColor" strokeWidth="2" className="text-brand-500" fill="none" />
 <path d="M40 28 Q36 30 32 28 Q28 26 24 28" stroke="currentColor" strokeWidth="2" className="text-brand-500" fill="none" />
 <path d="M40 36 Q36 38 32 36 Q28 34 24 36" stroke="currentColor" strokeWidth="2" className="text-brand-500" fill="none" />

 {/* Núcleo do rolo */}
 <rect x="42" y="14" width="12" height="36" rx="6" fill="currentColor" className="text-neutral-400 " />

 {/* Padrão decorativo no papel */}
 <g fill="currentColor" className="text-white" opacity="0.8">
 <circle cx="16" cy="16" r="1" />
 <circle cx="24" cy="16" r="1" />
 <circle cx="16" cy="24" r="1" />
 <circle cx="24" cy="24" r="1" />
 <circle cx="16" cy="32" r="1" />
 <circle cx="24" cy="32" r="1" />
 <circle cx="16" cy="40" r="1" />
 <circle cx="24" cy="40" r="1" />
 <circle cx="16" cy="48" r="1" />
 <circle cx="24" cy="48" r="1" />
 </g>

 {/* Estilete/cortador */}
 <rect x="4" y="30" width="8" height="2" rx="1" fill="currentColor" className="text-red-500" />
 <rect x="2" y="29" width="2" height="4" rx="1" fill="currentColor" className="text-neutral-600" />
 </svg>
);

// Ícone Premium para Iluminação
export const LightingPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-yellow-300" />
 <stop offset="100%" stopColor="currentColor" className="text-yellow-500" />
 </linearGradient>
 <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
 <stop offset="0%" stopColor="currentColor" className="text-yellow-200" opacity="0.8" />
 <stop offset="100%" stopColor="currentColor" className="text-yellow-200" opacity="0" />
 </radialGradient>
 </defs>

 {/* Glow effect */}
 <circle cx="32" cy="24" r="20" fill="url(#glowGradient)" />

 {/* Lâmpada LED */}
 <circle cx="32" cy="24" r="12" fill="url(#lightGradient)" />

 {/* Base da lâmpada */}
 <rect x="28" y="36" width="8" height="6" rx="1" fill="currentColor" className="text-neutral-300 " />

 {/* Rosca */}
 <g stroke="currentColor" strokeWidth="1" className="text-neutral-400">
 <line x1="28" y1="38" x2="36" y2="38" />
 <line x1="28" y1="40" x2="36" y2="40" />
 </g>

 {/* Filamentos LED */}
 <g stroke="currentColor" strokeWidth="1.5" className="text-yellow-600" opacity="0.8">
 <line x1="28" y1="20" x2="36" y2="20" />
 <line x1="28" y1="24" x2="36" y2="24" />
 <line x1="28" y1="28" x2="36" y2="28" />
 </g>

 {/* Raios de luz */}
 <g stroke="currentColor" strokeWidth="2" className="text-yellow-400" opacity="0.6">
 <line x1="32" y1="4" x2="32" y2="8" strokeLinecap="round" />
 <line x1="48" y1="24" x2="52" y2="24" strokeLinecap="round" />
 <line x1="12" y1="24" x2="16" y2="24" strokeLinecap="round" />
 <line x1="44" y1="10" x2="46" y2="8" strokeLinecap="round" />
 <line x1="20" y1="10" x2="18" y2="8" strokeLinecap="round" />
 <line x1="44" y1="38" x2="46" y2="40" strokeLinecap="round" />
 <line x1="20" y1="38" x2="18" y2="40" strokeLinecap="round" />
 </g>

 {/* Suporte/luminária */}
 <rect x="30" y="42" width="4" height="8" fill="currentColor" className="text-neutral-600 " />
 <rect x="26" y="50" width="12" height="4" rx="2" fill="currentColor" className="text-neutral-700 " />

 {/* Cabo */}
 <path d="M34 50 Q38 52 40 56 Q42 60 44 62" stroke="currentColor" strokeWidth="2" className="text-neutral-800 " fill="none" />
 </svg>
);

// Ícone Premium para Grama
export const GrassPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-green-400" />
 <stop offset="100%" stopColor="currentColor" className="text-green-600" />
 </linearGradient>
 </defs>

 {/* Solo */}
 <rect x="4" y="48" width="56" height="12" rx="2" fill="currentColor" className="text-amber-800 " />

 {/* Fios de grama */}
 <g stroke="url(#grassGradient)" strokeWidth="2" fill="none" strokeLinecap="round">
 <path d="M8 48 Q6 40 4 32 Q2 24 6 16" />
 <path d="M12 48 Q10 42 8 36 Q6 30 10 24" />
 <path d="M16 48 Q14 40 12 32 Q10 24 14 16" />
 <path d="M20 48 Q18 42 16 36 Q14 30 18 24" />
 <path d="M24 48 Q22 40 20 32 Q18 24 22 16" />
 <path d="M28 48 Q26 42 24 36 Q22 30 26 24" />
 <path d="M32 48 Q30 40 28 32 Q26 24 30 16" />
 <path d="M36 48 Q34 42 32 36 Q30 30 34 24" />
 <path d="M40 48 Q38 40 36 32 Q34 24 38 16" />
 <path d="M44 48 Q42 42 40 36 Q38 30 42 24" />
 <path d="M48 48 Q46 40 44 32 Q42 24 46 16" />
 <path d="M52 48 Q50 42 48 36 Q46 30 50 24" />
 <path d="M56 48 Q54 40 52 32 Q50 24 54 16" />
 <path d="M60 48 Q58 42 56 36 Q54 30 58 24" />
 </g>

 {/* Flores pequenas */}
 <g fill="currentColor" className="text-yellow-400">
 <circle cx="18" cy="20" r="1.5" />
 <circle cx="34" cy="18" r="1.5" />
 <circle cx="50" cy="22" r="1.5" />
 </g>

 {/* Pétalas das flores */}
 <g fill="currentColor" className="text-white" opacity="0.8">
 <circle cx="17" cy="19" r="0.5" />
 <circle cx="19" cy="19" r="0.5" />
 <circle cx="17" cy="21" r="0.5" />
 <circle cx="19" cy="21" r="0.5" />

 <circle cx="33" cy="17" r="0.5" />
 <circle cx="35" cy="17" r="0.5" />
 <circle cx="33" cy="19" r="0.5" />
 <circle cx="35" cy="19" r="0.5" />

 <circle cx="49" cy="21" r="0.5" />
 <circle cx="51" cy="21" r="0.5" />
 <circle cx="49" cy="23" r="0.5" />
 <circle cx="51" cy="23" r="0.5" />
 </g>

 {/* Raízes */}
 <g stroke="currentColor" strokeWidth="1" className="text-amber-600" opacity="0.6" fill="none">
 <path d="M8 48 Q6 52 4 56" />
 <path d="M16 48 Q14 52 12 56" />
 <path d="M24 48 Q22 52 20 56" />
 <path d="M32 48 Q30 52 28 56" />
 <path d="M40 48 Q38 52 36 56" />
 <path d="M48 48 Q46 52 44 56" />
 <path d="M56 48 Q54 52 52 56" />
 </g>
 </svg>
);

// Ícone Premium para Rejunte
export const GroutPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="groutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-brand-400" />
 <stop offset="100%" stopColor="currentColor" className="text-brand-600" />
 </linearGradient>
 </defs>

 {/* Base com azulejos */}
 <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" className="text-neutral-200 " />

 {/* Azulejos com rejunte */}
 <g fill="url(#groutGradient)">
 <rect x="10" y="10" width="20" height="20" />
 <rect x="34" y="10" width="20" height="20" />
 <rect x="10" y="34" width="20" height="20" />
 <rect x="34" y="34" width="20" height="20" />
 </g>

 {/* Linhas de rejunte destacadas */}
 <g stroke="currentColor" strokeWidth="3" className="text-neutral-400 ">
 <line x1="32" y1="10" x2="32" y2="54" />
 <line x1="10" y1="32" x2="54" y2="32" />
 </g>

 {/* Saco de rejunte */}
 <rect x="48" y="40" width="12" height="16" rx="1" fill="currentColor" className="text-amber-100 " />
 <rect x="50" y="42" width="8" height="3" rx="0.5" fill="currentColor" className="text-brand-600" />
 <rect x="50" y="46" width="6" height="1" fill="currentColor" className="text-brand-600" />
 <rect x="50" y="48" width="4" height="1" fill="currentColor" className="text-brand-600" />

 {/* Rejunte sendo aplicado */}
 <path d="M45 35 Q42 38 40 42" stroke="currentColor" strokeWidth="2" className="text-neutral-400" fill="none" strokeLinecap="round" />
 <circle cx="40" cy="42" r="1.5" fill="currentColor" className="text-neutral-400" />

 {/* Desempenadeira/rodo */}
 <rect x="2" y="20" width="12" height="3" rx="1" fill="currentColor" className="text-neutral-600 " />
 <rect x="0" y="21" width="2" height="1" fill="currentColor" className="text-amber-600" />
 </svg>
);

// Ícone Premium para Telhas
export const RoofTilesPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="tilesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-red-400" />
 <stop offset="100%" stopColor="currentColor" className="text-red-600" />
 </linearGradient>
 </defs>

 {/* Estrutura do telhado */}
 <path d="M8 32 L32 12 L56 32 L48 32 L32 20 L16 32 Z" fill="currentColor" className="text-neutral-300 " />

 {/* Fileiras de telhas */}
 <g fill="url(#tilesGradient)">
 {/* Primeira fileira */}
 <path d="M16 32 Q18 30 20 32 Q22 34 24 32 Q26 30 28 32 Q30 34 32 32 Q34 30 36 32 Q38 34 40 32 Q42 30 44 32 Q46 34 48 32 L48 38 L16 38 Z" />

 {/* Segunda fileira */}
 <path d="M16 38 Q18 36 20 38 Q22 40 24 38 Q26 36 28 38 Q30 40 32 38 Q34 36 36 38 Q38 40 40 38 Q42 36 44 38 Q46 40 48 38 L48 44 L16 44 Z" />

 {/* Terceira fileira */}
 <path d="M16 44 Q18 42 20 44 Q22 46 24 44 Q26 42 28 44 Q30 46 32 44 Q34 42 36 44 Q38 46 40 44 Q42 42 44 44 Q46 46 48 44 L48 50 L16 50 Z" />

 {/* Quarta fileira */}
 <path d="M16 50 Q18 48 20 50 Q22 52 24 50 Q26 48 28 50 Q30 52 32 50 Q34 48 36 50 Q38 52 40 50 Q42 48 44 50 Q46 52 48 50 L48 56 L16 56 Z" />
 </g>

 {/* Cumeeira */}
 <rect x="30" y="12" width="4" height="20" rx="2" fill="currentColor" className="text-red-700" />

 {/* Detalhes das telhas */}
 <g stroke="currentColor" strokeWidth="0.5" className="text-red-700" opacity="0.6">
 <line x1="20" y1="32" x2="20" y2="56" />
 <line x1="24" y1="32" x2="24" y2="56" />
 <line x1="28" y1="32" x2="28" y2="56" />
 <line x1="32" y1="32" x2="32" y2="56" />
 <line x1="36" y1="32" x2="36" y2="56" />
 <line x1="40" y1="32" x2="40" y2="56" />
 <line x1="44" y1="32" x2="44" y2="56" />
 </g>

 {/* Calha */}
 <rect x="14" y="56" width="36" height="4" rx="2" fill="currentColor" className="text-neutral-500 " />

 {/* Água escorrendo */}
 <g stroke="currentColor" strokeWidth="1" className="text-blue-400" opacity="0.6" fill="none">
 <path d="M20 60 Q18 62 16 64" strokeLinecap="round" />
 <path d="M32 60 Q30 62 28 64" strokeLinecap="round" />
 <path d="M44 60 Q42 62 40 64" strokeLinecap="round" />
 </g>
 </svg>
);

// Ícone Premium para Rodapé & Guarnição
export const BaseboardPremiumIcon: React.FC<IconProps> = ({ size = 48, className, ...props }) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 {...props}
 >
 <defs>
 <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="currentColor" className="text-amber-400" />
 <stop offset="100%" stopColor="currentColor" className="text-amber-600" />
 </linearGradient>
 </defs>

 {/* Parede de fundo */}
 <rect x="4" y="4" width="56" height="40" rx="2" fill="currentColor" className="text-neutral-200 " />

 {/* Piso */}
 <rect x="4" y="44" width="56" height="16" rx="1" fill="currentColor" className="text-neutral-300 " />

 {/* Rodapé horizontal */}
 <rect x="4" y="40" width="56" height="8" rx="1" fill="url(#woodGradient)" />

 {/* Textura do rodapé */}
 <g stroke="currentColor" strokeWidth="0.5" className="text-amber-700" opacity="0.6">
 <line x1="4" y1="42" x2="60" y2="42" />
 <line x1="4" y1="44" x2="60" y2="44" />
 <line x1="4" y1="46" x2="60" y2="46" />
 </g>

 {/* Porta com guarnição */}
 <rect x="24" y="4" width="16" height="36" rx="1" fill="currentColor" className="text-neutral-100 " />

 {/* Guarnição da porta */}
 <g fill="url(#woodGradient)">
 {/* Lateral esquerda */}
 <rect x="22" y="4" width="2" height="36" />
 {/* Lateral direita */}
 <rect x="40" y="4" width="2" height="36" />
 {/* Superior */}
 <rect x="22" y="4" width="20" height="2" />
 </g>

 {/* Maçaneta */}
 <circle cx="36" cy="24" r="1" fill="currentColor" className="text-neutral-600" />

 {/* Barras de rodapé empilhadas */}
 <g transform="translate(48, 8)">
 <rect x="0" y="0" width="12" height="2" rx="1" fill="url(#woodGradient)" />
 <rect x="0" y="3" width="12" height="2" rx="1" fill="url(#woodGradient)" />
 <rect x="0" y="6" width="12" height="2" rx="1" fill="url(#woodGradient)" />
 <rect x="0" y="9" width="12" height="2" rx="1" fill="url(#woodGradient)" />
 <rect x="0" y="12" width="12" height="2" rx="1" fill="url(#woodGradient)" />
 </g>

 {/* Etiqueta "2,40m" */}
 <rect x="50" y="16" width="8" height="3" rx="0.5" fill="currentColor" className="text-white" />
 <text x="54" y="18.5" textAnchor="middle" className="fill-neutral-700 text-xs font-bold">2,4m</text>

 {/* Serra/cortador */}
 <g transform="translate(8, 52)">
 <rect x="0" y="0" width="16" height="3" rx="0.5" fill="currentColor" className="text-neutral-600" />
 <rect x="0" y="3" width="2" height="6" fill="currentColor" className="text-amber-600" />
 <g stroke="currentColor" strokeWidth="0.5" className="text-neutral-400">
 <line x1="2" y1="0" x2="2" y2="3" />
 <line x1="4" y1="0" x2="4" y2="3" />
 <line x1="6" y1="0" x2="6" y2="3" />
 <line x1="8" y1="0" x2="8" y2="3" />
 <line x1="10" y1="0" x2="10" y2="3" />
 <line x1="12" y1="0" x2="12" y2="3" />
 <line x1="14" y1="0" x2="14" y2="3" />
 </g>
 </g>
 </svg>
);
