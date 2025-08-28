import React from 'react';
import { cn } from '../lib/utils';
import { useGradientBorder } from '../hooks/useTheme';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
 const { getGradientBackground } = useGradientBorder();

 return (
 <div
 ref={ref}
 className={cn('rounded-2xl border-2 border-transparent shadow-lg shadow-brand-500/10', className)}
 style={getGradientBackground()}
 {...props}
 />
 );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
 <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6 border-b-2 border-transparent', className)}
 style={{
 borderImage: 'linear-gradient(to right, #10B981, #059669, #1F2937) 1'
 }}
 {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
 <h3 ref={ref} className={cn('text-xl font-bold text-neutral-900 leading-none tracking-tight', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
 <p ref={ref} className={cn('text-sm text-neutral-600 ', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
 <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
 <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
