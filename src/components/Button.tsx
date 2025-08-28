import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: 'primary' | 'secondary' | 'tertiary';
 size?: 'sm' | 'md' | 'lg';
 isLoading?: boolean;
 fullWidth?: boolean;
 children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
 variant = 'primary',
 size = 'md',
 isLoading = false,
 fullWidth = false,
 className = '',
 children,
 disabled,
 ...props
}) => {
 const baseClasses = `
 inline-flex items-center justify-center font-bold rounded-xl
 transition-all duration-300 focus:outline-none focus:ring-2
 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed
 shadow-lg hover:shadow-xl transform hover:scale-105
 `;

 const variantClasses = {
 primary: `
 bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700
 shadow-brand-500/25 hover:shadow-brand-500/40
 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:shadow-none disabled:transform-none
 `,
 secondary: `
 border-2 border-brand-500 text-brand-500 bg-white
 hover:bg-brand-500 hover:text-white active:bg-brand-600 active:border-brand-600
 shadow-brand-500/10 hover:shadow-brand-500/25
 disabled:border-neutral-300 disabled:text-neutral-500 disabled:bg-neutral-100 disabled:shadow-none disabled:transform-none
 `,
 tertiary: `
 text-brand-500 bg-brand-50 hover:bg-brand-100 active:bg-brand-200
 shadow-brand-500/10 hover:shadow-brand-500/20
 disabled:text-neutral-500 disabled:bg-neutral-100 disabled:shadow-none disabled:transform-none
 `
 };

 const sizeClasses = {
 sm: 'px-4 py-2 text-sm',
 md: 'px-6 py-3 text-base',
 lg: 'px-8 py-4 text-lg'
 };

 const widthClass = fullWidth ? 'w-full' : '';

 return (
 <motion.button
 whileTap={{ scale: 0.98 }}
 className={`
 ${baseClasses}
 ${variantClasses[variant]}
 ${sizeClasses[size]}
 ${widthClass}
 ${className}
 `}
 disabled={disabled || isLoading}
 {...props}
 >
 {isLoading ? (
 <div className="flex items-center space-x-2">
 <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
 <span>Calculando...</span>
 </div>
 ) : (
 children
 )}
 </motion.button>
 );
};
