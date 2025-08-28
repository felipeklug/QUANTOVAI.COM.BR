import React from "react";
type P = React.SVGProps<SVGSVGElement>;
const C = (p:P)=> <svg width="24" height="24" viewBox="0 0 24 24" className="stroke-current" fill="none" strokeLinecap="round" strokeLinejoin="round" {...p}/>;

export const RoofPitchIcon = (p:P)=> (
 <C {...p} strokeWidth="1.5"><path d="M3 15L12 6l9 9"/><path d="M7 15v5h10v-5"/><path d="M13 11a5 5 0 0 1 4 4"/></C>
);

export const FloorTileIcon = (p:P)=> (
 <C {...p} strokeWidth="1.5">
 {/* Azulejos/pisos com padrão específico */}
 <rect x="2" y="2" width="6" height="6" rx="0.5" />
 <rect x="9" y="2" width="6" height="6" rx="0.5" />
 <rect x="16" y="2" width="6" height="6" rx="0.5" />
 <rect x="2" y="9" width="6" height="6" rx="0.5" />
 <rect x="9" y="9" width="6" height="6" rx="0.5" />
 <rect x="16" y="9" width="6" height="6" rx="0.5" />
 <rect x="2" y="16" width="6" height="6" rx="0.5" />
 <rect x="9" y="16" width="6" height="6" rx="0.5" />
 <rect x="16" y="16" width="6" height="6" rx="0.5" />
 {/* Linhas de rejunte */}
 <path d="M8.5 2v20M15.5 2v20" strokeWidth="0.5" opacity="0.5" />
 <path d="M2 8.5h20M2 15.5h20" strokeWidth="0.5" opacity="0.5" />
 </C>
);

export const WallpaperIcon = (p:P)=> (
 <C {...p} strokeWidth="1.5">
 {/* Rolo de papel de parede */}
 <rect x="4" y="3" width="16" height="18" rx="1" />
 <path d="M4 7h16M4 11h16M4 15h16M4 19h16" strokeWidth="0.5" opacity="0.4" />
 {/* Padrão decorativo */}
 <circle cx="8" cy="5" r="0.5" />
 <circle cx="12" cy="5" r="0.5" />
 <circle cx="16" cy="5" r="0.5" />
 <circle cx="8" cy="9" r="0.5" />
 <circle cx="12" cy="9" r="0.5" />
 <circle cx="16" cy="9" r="0.5" />
 {/* Rolo desenrolando */}
 <path d="M20 3c1 0 2 1 2 2v14c0 1-1 2-2 2" />
 <path d="M2 5v14" strokeWidth="2" />
 </C>
);

export const ConcreteMixerIcon = (p:P)=> (
 <C {...p} strokeWidth="1.5">
 {/* Betoneira mais detalhada */}
 <circle cx="12" cy="12" r="6" />
 <path d="M12 6v12M6 12h12" />
 <path d="M9 9l6 6M15 9l-6 6" />
 <rect x="10" y="18" width="4" height="3" rx="1" />
 <path d="M8 21h8" />
 <circle cx="7" cy="21" r="1" />
 <circle cx="17" cy="21" r="1" />
 </C>
);

export const ACUnitIcon = (p:P)=> (
 <C {...p} strokeWidth="1.5">
 {/* Ar condicionado mais específico */}
 <rect x="2" y="6" width="20" height="12" rx="3" />
 <path d="M6 10h12M6 14h12" />
 <path d="M10 18v2M14 18v2" />
 <path d="M4 2h16v4H4z" />
 <circle cx="8" cy="4" r="0.5" />
 <circle cx="12" cy="4" r="0.5" />
 <circle cx="16" cy="4" r="0.5" />
 <path d="M7 22c0-1 1-2 2-2s2 1 2 2M13 22c0-1 1-2 2-2s2 1 2 2" />
 </C>
);

export const PaintBucketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <C {...props} strokeWidth="1.5">
 {/* Rolo de pintura específico */}
 <rect x="3" y="8" width="12" height="4" rx="2" />
 <path d="M15 10h4" strokeWidth="2" />
 <circle cx="21" cy="10" r="1.5" />
 <path d="M9 12v8" />
 <path d="M7 20h4" />
 {/* Tinta escorrendo */}
 <path d="M5 12c0 1 0 2 1 3s2 1 3 1" strokeWidth="1" opacity="0.6" />
 <path d="M11 12c0 1 0 2-1 3s-2 1-3 1" strokeWidth="1" opacity="0.6" />
 {/* Cabo do rolo */}
 <rect x="8" y="4" width="2" height="4" rx="1" />
 </C>
);

export const BulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <C {...props} strokeWidth="1.5">
 {/* Lâmpada LED moderna */}
 <circle cx="12" cy="9" r="4" />
 <path d="M12 13v3" />
 <rect x="10" y="16" width="4" height="2" rx="1" />
 <path d="M10 18v2h4v-2" />
 {/* Raios de luz */}
 <path d="M12 1v2M4.22 4.22l1.42 1.42M1 12h2M4.22 19.78l1.42-1.42M12 21v2M19.78 19.78l-1.42-1.42M21 12h2M19.78 4.22l-1.42 1.42" strokeWidth="1" opacity="0.6" />
 {/* Filamentos LED */}
 <path d="M10 8h4M10 10h4" strokeWidth="0.5" />
 </C>
);

export const PlantPotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <C {...props} strokeWidth="1.5">
 {/* Grama específica */}
 <path d="M2 20h20" strokeWidth="2" />
 {/* Fios de grama */}
 <path d="M3 20c0-2 1-4 2-6s2-3 2-5" />
 <path d="M6 20c0-1.5 0.5-3 1-4.5s1-2.5 1-4" />
 <path d="M9 20c0-2.5 1-5 2-7s1.5-3.5 1.5-5.5" />
 <path d="M12 20c0-2 0.5-4 1.5-6s2-3 2-5" />
 <path d="M15 20c0-1.8 0.8-3.5 1.5-5s1.2-2.8 1.2-4.5" />
 <path d="M18 20c0-2.2 1-4.5 1.8-6.5s1.5-3.2 1.5-5" />
 <path d="M21 20c0-1.5 0.3-3 0.8-4.5" />
 {/* Raízes */}
 <path d="M5 20v2M8 20v1.5M11 20v2.5M14 20v1.8M17 20v2.2M20 20v1.5" strokeWidth="0.5" opacity="0.4" />
 </C>
);

export const MortarSackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <C {...props} strokeWidth="1.5">
 {/* Saco de argamassa mais específico */}
 <path d="M6 4h12l2 16H4L6 4Z" />
 <path d="M6 4V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" />
 <path d="M8 8h8M8 12h6M8 16h4" />
 <circle cx="10" cy="8" r="0.5" />
 <circle cx="14" cy="12" r="0.5" />
 <circle cx="12" cy="16" r="0.5" />
 <path d="M9 20h6" strokeWidth="2" />
 </C>
);
