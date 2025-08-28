import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
 message: string;
 type: 'success' | 'error' | 'info';
 isVisible: boolean;
 onClose: () => void;
 autoClose?: boolean;
 duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
 message,
 type,
 isVisible,
 onClose,
 autoClose = true,
 duration = 4000
}) => {
 useEffect(() => {
 if (isVisible && autoClose) {
 const timer = setTimeout(onClose, duration);
 return () => clearTimeout(timer);
 }
 }, [isVisible, autoClose, duration, onClose]);

 const getIcon = () => {
 switch (type) {
 case 'success':
 return <CheckCircle className="w-5 h-5 text-brand-500" />;
 case 'error':
 return <AlertCircle className="w-5 h-5 text-danger-500" />;
 default:
 return <AlertCircle className="w-5 h-5 text-accent-500" />;
 }
 };

 const getBgColor = () => {
 switch (type) {
 case 'success':
 return 'bg-brand-200';
 case 'error':
 return 'bg-red-100';
 default:
 return 'bg-yellow-100';
 }
 };

 return (
 <AnimatePresence>
 {isVisible && (
 <motion.div
 initial={{ opacity: 0, y: -50 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -50 }}
 className="fixed top-4 right-4 z-50"
 >
 <div className={`
 ${getBgColor()} border border-neutral-200 rounded-lg shadow-md
 p-4 flex items-center space-x-3 max-w-sm
 `}>
 {getIcon()}
 <span className="flex-1 text-neutral-950 text-body">
 {message}
 </span>
 <button
 onClick={onClose}
 className="p-1 text-neutral-700 hover:text-neutral-950 transition-colors"
 >
 <X className="w-4 h-4" />
 </button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
};
