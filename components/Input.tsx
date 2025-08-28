import React, { InputHTMLAttributes, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useGradientBorder } from '../hooks/useTheme';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
 label: string;
 unit?: string;
 error?: string;
 helpText?: string;
 showControls?: boolean;
 step?: number;
 onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
 label, unit, error, helpText, showControls = false, step = 0.1,
 placeholder, value, onChange, className = '', defaultValue, ...props
}) => {
 const [focused, setFocused] = useState(false);
 const { getGradientBackground } = useGradientBorder();

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 onChange?.(e.target.value);
 };

 const handleControlChange = (increment: boolean) => {
 const currentValue = parseFloat((value as string)?.replace(',', '.')) || 0;
 const newValue = increment ? currentValue + step : currentValue - step;
 const maxDecimals = String(step).includes('.') ? String(step).split('.')[1].length : 0;
 onChange?.(Math.max(0, newValue).toFixed(maxDecimals).replace('.', ','));
 };

 return (
 <div className={`space-y-2 ${className}`}>
 <label className="block text-neutral-900 font-semibold text-sm">{label}</label>
 <div className="relative">
 <div className={`flex items-center border-2 rounded-xl transition-all duration-200
 ${error ? 'border-danger-500 ring-1 ring-danger-500' : focused ? 'border-brand-500 ring-1 ring-brand-500' : 'border-transparent'}`}
 style={!error && !focused ? getGradientBackground() : { background: 'white' }}>

 {showControls && (
 <button type="button" onClick={() => handleControlChange(false)} className="p-3 text-neutral-700 hover:text-brand-500 :text-brand-400 transition-colors border-r border-brand-500">
 <Minus className="w-4 h-4" />
 </button>
 )}

 <input
 type="text" inputMode="decimal" value={value} onChange={handleChange}
 onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
 placeholder={placeholder}
 className={`flex-1 px-4 py-3 text-base bg-transparent focus:outline-none text-neutral-900 placeholder:text-neutral-500 :text-neutral-400 ${showControls ? 'text-center' : ''}`}
 aria-invalid={!!error}
 aria-describedby={helpText ? `${props.id}-help` : undefined}
 {...props}
 />

 {unit && !showControls && (
 <div className="px-4 py-3 text-neutral-700 border-l border-brand-500 bg-brand-50 font-medium">{unit}</div>
 )}

 {showControls && (
 <button type="button" onClick={() => handleControlChange(true)} className="p-3 text-neutral-700 hover:text-brand-500 :text-brand-400 transition-colors border-l border-brand-500">
 <Plus className="w-4 h-4" />
 </button>
 )}
 </div>
 </div>

 {helpText && !error && (<p id={`${props.id}-help`} className="text-sm text-neutral-600 ">{helpText}</p>)}
 {error && (<p className="text-sm text-danger-500 flex items-center space-x-1"><span>{error}</span></p>)}
 </div>
 );
};
