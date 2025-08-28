import React, { SelectHTMLAttributes, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useGradientBorder } from '../hooks/useTheme';

interface SelectOption {
 value: string;
 label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
 label: string;
 options: SelectOption[];
 error?: string;
 helpText?: string;
 placeholder?: string;
 onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
 label, options, error, helpText, placeholder = 'Selecione uma opção',
 value, onChange, className = '', defaultValue, ...props
}) => {
 const [focused, setFocused] = useState(false);
 const { getGradientBackground } = useGradientBorder();

 return (
 <div className={`space-y-2 ${className}`}>
 <label className="block text-text font-medium text-body">{label}</label>
 <div className="relative">
 <select
 value={value}
 onChange={(e) => onChange?.(e.target.value)}
 onFocus={() => setFocused(true)}
 onBlur={() => setFocused(false)}
 className={`w-full px-4 py-3 text-body bg-surface appearance-none border-2 rounded-lg transition-all duration-200 focus:outline-none min-h-touch
 ${error ? 'border-danger-500 ring-1 ring-danger-500' : focused ? 'border-brand-500 ring-1 ring-brand-500' : 'border-transparent'}
 ${!value ? 'text-neutral-400' : 'text-text'}`}
 style={!error && !focused ? getGradientBackground() : {}}
 aria-invalid={!!error}
 {...props}
 >
 <option value="" disabled>{placeholder}</option>
 {options.map((option) => (
 <option key={option.value} value={option.value}>{option.label}</option>
 ))}
 </select>
 <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors ${focused ? 'text-brand-500' : 'text-neutral-400'}`} />
 </div>
 {helpText && !error && (<p className="text-small text-neutral-700">{helpText}</p>)}
 {error && (<p className="text-small text-danger-500">{error}</p>)}
 </div>
 );
};
