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
 <fieldset className={cn('space-y-2', className)}>
 <legend className="block text-text font-medium text-body">{label}</legend>
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
 'px-4 py-2 rounded-lg text-caption font-medium transition-all duration-200 cursor-pointer border-2',
 value === option.value
 ? 'bg-brand-500 text-white border-brand-500'
 : 'bg-surface text-text border-transparent hover:border-brand-500'
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
