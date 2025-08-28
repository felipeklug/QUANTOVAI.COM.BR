import { useEffect } from 'react';

export type Theme = 'light';

export const useTheme = (): void => {
 useEffect(() => {
 // Sempre garantir que o tema seja claro
 document.documentElement.removeAttribute('data-theme');
 document.documentElement.classList.remove('dark');
 localStorage.removeItem('quantovai-theme');
 }, []);
};

export const useGradientBorder = () => {
 const getGradientBackground = (baseColor?: string) => {
 // Sempre usar cores do tema claro
 const bg = baseColor || 'white';
 return {
 border: '2px solid transparent',
 background: bg,
 backgroundImage: `linear-gradient(${bg}, ${bg}), linear-gradient(to right, #10B981, #059669, #1F2937)`,
 backgroundOrigin: 'border-box',
 backgroundClip: 'padding-box, border-box'
 };
 };

 return { getGradientBackground, isDark: false };
};
