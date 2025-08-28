import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './Button';

interface BackButtonProps {
 to?: string;
 label?: string;
 className?: string;
 variant?: 'default' | 'minimal';
}

export const BackButton: React.FC<BackButtonProps> = ({
 to,
 label = 'Voltar',
 className = '',
 variant = 'default'
}) => {
 const handleBack = () => {
 if (to) {
 window.location.href = to;
 } else {
 window.history.back();
 }
 };

 if (variant === 'minimal') {
 return (
 <div className="relative">
 <button
 onClick={handleBack}
 className={`relative inline-flex items-center px-3 py-2 md:px-4 md:py-2 text-sm font-medium
 text-white hover:text-emerald-50
 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900
 rounded-lg shadow-lg hover:shadow-xl
 transition-all duration-300 group touch-manipulation overflow-hidden ${className}`}
 style={{
 background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
 border: '2px solid transparent',
 backgroundClip: 'padding-box'
 }}
 >
 {/* Gradient border effect */}
 <div
 className="absolute inset-0 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"
 style={{
 background: 'linear-gradient(135deg, #000000 0%, #1f2937 50%, #000000 100%)',
 margin: '-2px',
 zIndex: -1
 }}
 />
 <ArrowLeft className="w-4 h-4 mr-1.5 md:mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
 <span className="text-xs md:text-sm font-semibold">{label}</span>
 </button>
 </div>
 );
 }

 return (
 <Button
 variant="tertiary"
 size="sm"
 onClick={handleBack}
 className={`inline-flex items-center ${className}`}
 >
 <ArrowLeft className="w-4 h-4 mr-2" />
 {label}
 </Button>
 );
};
