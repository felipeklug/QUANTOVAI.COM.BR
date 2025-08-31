import React from 'react';
import { cn } from '../lib/utils';
import { useGradientBorder } from '../hooks/useTheme';

interface RadioGroupProps {
 label: string;
 value: string;
 onChange: (value: string) => void;
 options: { value: string; label: string }[];
 className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, value, onChange, options, className }) => {
 const { getGradientBackground } = useGradientBorder();

 return (
 <fieldset className={cn('space-y-4 mb-6', className)}>
 <legend className="block text-text font-medium text-body mb-3">{label}</legend>
 <div className="flex flex-wrap gap-3">
 {options.map((option) => (
 <div key={option.value}>
 <input
 type="radio"
 id={`${label}-${option.value}`}
 name={label}
 value={option.value}
 checked={value === option.value}
 onChange={(e) => onChange(e.target.value)}
 className="sr-only"
 />
 <label
 htmlFor={`${label}-${option.value}`}
 className={cn(
 'inline-block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border-2 min-h-[44px] flex items-center',
 value === option.value
 ? 'bg-brand-500 text-white border-brand-500 shadow-md'
 : 'bg-surface text-text border-transparent hover:border-brand-500 hover:shadow-sm'
 )}
 style={value !== option.value ? getGradientBackground() : {}}
 >
 {option.label}
 </label>
 </div>
 ))}
 </div>
 </fieldset>
 );
};
