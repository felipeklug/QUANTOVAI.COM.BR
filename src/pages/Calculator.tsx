import React, { useState, useEffect } from 'react';
import { Settings, Download, Share2, ChevronDown, Lock } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { RadioGroup } from '../components/RadioGroup';
import { Button } from '../components/Button';
import { BackButton } from '../components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Accordion } from '../components/Accordion';
import { AdSlot } from '../components/AdSlot';
import { CalculatorContent } from '../components/CalculatorContent';
import { Toast } from '../components/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { calculatorConfigs, CalculatorField } from '../data/calculatorConfigs';
import { NotFoundPage } from './NotFound';
import { useAdLoader } from '../hooks/useAdLoader';
import { CalculatorResultAd } from '../components/InFeedAd';
import { StickyAd, useStickyAd } from '../components/StickyAd';

interface CalculatorPageProps {
 calculatorId: string;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ calculatorId }) => {
 const config = calculatorConfigs[calculatorId];
 const { adsVisible, triggerAdLoad } = useAdLoader();
 const { shouldShow: shouldShowStickyAd } = useStickyAd();

 // Early return if config is not found
 if (!config) {
 return <NotFoundPage />;
 }
 
 const IconComponent = config.icon;

 const [formData, setFormData] = useState<Record<string, string>>({});
 const [errors, setErrors] = useState<Record<string, string>>({});
 const [showAdvanced, setShowAdvanced] = useState(false);
 const [result, setResult] = useState<any>(null);
 const [isCalculating, setIsCalculating] = useState(false);
 const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; visible: boolean }>({
 message: '', type: 'info', visible: false
 });

 useEffect(() => {
 const initialData: Record<string, string> = {};
 [...config.fields, ...(config.advancedFields || [])].forEach(field => {
 if (field.defaultValue) {
 initialData[field.id] = field.defaultValue;
 }
 });
 setFormData(initialData);
 setResult(null);
 setErrors({});
 setShowAdvanced(false);
 }, [config]);

 const handleInputChange = (fieldId: string, value: string) => {
 setFormData(prev => ({ ...prev, [fieldId]: value }));
 if (errors[fieldId]) {
 setErrors(prev => {
 const newErrors = { ...prev };
 delete newErrors[fieldId];
 return newErrors;
 });
 }
 };

 const validateForm = (): boolean => {
 const newErrors: Record<string, string> = {};
 const allFields = [...config.fields, ...(showAdvanced ? config.advancedFields || [] : [])];
 
 allFields.forEach(field => {
 // A better implementation would have a more robust dependency system
 const areaMode = formData['areaMode'];
 const tileSize = formData['tileSize'];
 if(areaMode === 'dimensions' && field.id === 'totalArea') return;
 if(areaMode === 'area' && (field.id === 'length' || field.id === 'width')) return;
 if(tileSize !== 'custom-size' && (field.id === 'customTileWidth' || field.id === 'customTileHeight')) return;

 if (field.required && (!formData[field.id] || String(formData[field.id]).trim() === '')) {
 newErrors[field.id] = 'Este campo é obrigatório.';
 } else if (field.type === 'number' && formData[field.id]) {
 const num = parseFloat(String(formData[field.id]).replace(',', '.'));
 if (isNaN(num) || num <= 0) {
 newErrors[field.id] = 'Use um valor válido maior que 0. Ex: 2,50';
 }
 // Validação específica para dimensões de peças personalizadas
 if ((field.id === 'customTileWidth' || field.id === 'customTileHeight') && num > 200) {
 newErrors[field.id] = 'Dimensão muito grande. Máximo: 200cm';
 }
 if ((field.id === 'customTileWidth' || field.id === 'customTileHeight') && num < 5) {
 newErrors[field.id] = 'Dimensão muito pequena. Mínimo: 5cm';
 }
 }
 });

 setErrors(newErrors);
 return Object.keys(newErrors).length === 0;
 };

 const calculate = () => {
 triggerAdLoad();
 if (!validateForm()) {
 setToast({ message: 'Por favor, corrija os erros no formulário.', type: 'error', visible: true });
 return;
 }
 setIsCalculating(true);
 setTimeout(() => {
 try {
 const calculationResult = config.calculationFn(formData);
 setResult(calculationResult);
 setIsCalculating(false);
 setToast({ message: 'Cálculo realizado com sucesso!', type: 'success', visible: true });
 if (window.innerWidth < 1024) {
 document.getElementById('result-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
 }
 } catch (error) {
 setIsCalculating(false);
 setToast({ message: 'Erro ao calcular. Verifique os valores.', type: 'error', visible: true });
 }
 }, 500);
 };

 const renderField = (field: CalculatorField) => {
 if (field.dependsOn) {
 if (formData.areaMode !== 'dimensions' && (field.id === 'length' || field.id === 'width')) return null;
 if (formData.areaMode !== 'area' && field.id === 'totalArea') return null;
 if (formData.tileSize !== 'custom-size' && (field.id === 'customTileWidth' || field.id === 'customTileHeight')) return null;
 }

 switch (field.type) {
 case 'number': return <Input key={field.id} {...field} value={formData[field.id] || ''} onChange={(value) => handleInputChange(field.id, value)} error={errors[field.id]} />;
 case 'select': return <Select key={field.id} {...field} value={formData[field.id] || ''} onChange={(value) => handleInputChange(field.id, value)} error={errors[field.id]} />;
 case 'radio': return <RadioGroup key={field.id} {...field} value={formData[field.id] || ''} onChange={(value) => handleInputChange(field.id, value)} options={field.options || []} />;
 default: return null;
 }
 };

 return (
 <div className="min-h-screen bg-surface">
 <Header />
 
 <main>
 <div className="bg-brand-50 border-b border-neutral-200 ">
 <div className="max-w-7xl mx-auto px-4 py-6">
 <div className="mb-4">
 <BackButton to="/" variant="minimal" className="mb-3" />
 <div className="text-caption text-neutral-600 ">
 <a href="/" className="text-brand-600 hover:underline">Home</a>
 <span className="mx-2">/</span>
 <span className="text-text font-medium">{config.title}</span>
 </div>
 </div>
 <div className="flex items-center space-x-4">
 <div className="w-16 h-16 bg-brand-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
 <IconComponent className="w-10 h-10" />
 </div>
 <div><h1 className="text-h1 font-heading text-text">{config.title}</h1><p className="text-body text-neutral-700 mt-1">{config.description}</p></div>
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-12">
 <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
 <div className="lg:col-span-3 space-y-4 md:space-y-6">
 <Card>
 <CardHeader><CardTitle>Dados do Projeto</CardTitle></CardHeader>
 <CardContent className="space-y-6">
 {config.fields.map(renderField)}
 {config.advancedFields && (
 <div className="pt-6 border-t border-neutral-200 ">
 <button
 onClick={() => setShowAdvanced(!showAdvanced)}
 className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-brand-300 bg-brand-50/50 hover:bg-brand-100/50 :bg-brand-900/30 transition-all duration-200 group"
 >
 <div className="flex items-center space-x-3">
 <Settings className="w-5 h-5 text-brand-600 group-hover:rotate-90 transition-transform duration-200" />
 <div className="text-left">
 <span className="text-brand-700 font-semibold block">Ajustes avançados</span>
 <span className="text-brand-600/70 text-sm">Personalize o cálculo com mais opções</span>
 </div>
 </div>
 <motion.div
 animate={{ rotate: showAdvanced ? 180 : 0 }}
 transition={{ duration: 0.2 }}
 >
 <ChevronDown className="w-5 h-5 text-brand-600 " />
 </motion.div>
 </button>
 <AnimatePresence>
 {showAdvanced && (
 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
 <div className="space-y-6 pt-6">{config.advancedFields.map(renderField)}</div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 )}
 </CardContent>
 </Card>
 <div className="hidden lg:block"><Button onClick={calculate} isLoading={isCalculating} fullWidth size="lg">Calcular</Button></div>
 </div>

 <div className="lg:col-span-4 space-y-4 md:space-y-6">
 <div className="lg:sticky lg:top-24">
 <AnimatePresence>
 {result && (
 <motion.div id="result-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
 <Card>
 <CardHeader><CardTitle>Resultado</CardTitle></CardHeader>
 <CardContent>
 <div className="text-lg font-medium text-text mb-6 p-4 bg-brand-50 rounded-lg">{result.summary}</div>
 <div className="space-y-3 mb-6">
 {result.details.map((detail: any, index: number) => (
 <div key={index} className="flex justify-between items-center text-body">
 <span className="text-neutral-700">{detail.label}</span>
 <span className={`font-medium ${detail.highlight ? 'text-brand-600 ' : 'text-text'}`}>{detail.value}</span>
 </div>
 ))}
 </div>

 {/* Anúncio após resultado */}
 <CalculatorResultAd
 id={`calc-result-ad-${calculatorId}`}
 load={adsVisible}
 />
 <div className="mt-6 space-y-3">
 {/* Botão principal com animação chamativa */}
 <motion.div
 animate={{
 scale: [1, 1.02, 1],
 boxShadow: [
 "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
 "0 10px 15px -3px rgba(34, 197, 94, 0.3)",
 "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
 ]
 }}
 transition={{
 duration: 2,
 repeat: Infinity,
 repeatType: "loop",
 ease: "easeInOut"
 }}
 >
 <Button fullWidth className="relative overflow-hidden">
 <motion.div
 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
 animate={{
 x: ["-100%", "100%"]
 }}
 transition={{
 duration: 2,
 repeat: Infinity,
 repeatType: "loop",
 ease: "linear"
 }}
 />
 Ver ofertas de materiais
 </Button>
 </motion.div>

 {/* Botão premium com cadeado */}
 <Button
 variant="secondary"
 fullWidth
 className="relative opacity-60 cursor-not-allowed"
 disabled
 >
 <Lock className="w-4 h-4 mr-2" />
 Pedir orçamento de instalador
 <span className="absolute -top-1 -right-1 bg-yellow-500 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full font-medium">
 PRO
 </span>
 </Button>
 </div>
 </CardContent>
 </Card>

 {/* Botões premium com cadeado */}
 <div className="flex items-center justify-end space-x-2">
 <Button
 variant="tertiary"
 size="sm"
 className="relative opacity-60 cursor-not-allowed"
 disabled
 >
 <Lock className="w-3 h-3 mr-1" />
 <Download className="w-4 h-4 mr-2" />
 Baixar PDF
 <span className="absolute -top-1 -right-1 bg-yellow-500 text-yellow-900 text-xs px-1 py-0.5 rounded-full font-medium text-[10px]">
 PRO
 </span>
 </Button>
 <Button
 variant="tertiary"
 size="sm"
 className="relative opacity-60 cursor-not-allowed"
 disabled
 >
 <Lock className="w-3 h-3 mr-1" />
 <Share2 className="w-4 h-4 mr-2" />
 Compartilhar
 <span className="absolute -top-1 -right-1 bg-yellow-500 text-yellow-900 text-xs px-1 py-0.5 rounded-full font-medium text-[10px]">
 PRO
 </span>
 </Button>
 </div>
 <AdSlot type="in-article" isVisible={adsVisible} />
 </motion.div>
 )}
 </AnimatePresence>
 {!result && !isCalculating && (
 <div className="p-6 text-center border-2 border-dashed border-neutral-200 rounded-lg h-full flex items-center justify-center">
 <p className="text-neutral-700">O resultado do seu cálculo aparecerá aqui.</p>
 </div>
 )}
 </div>
 </div>
 </div>

 <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-surface/80 backdrop-blur-sm border-t border-neutral-200 z-30">
 <Button onClick={calculate} isLoading={isCalculating} fullWidth size="lg">Calcular</Button>
 </div>

 {result && (
 <div className="mt-12 max-w-4xl mx-auto space-y-12">
 <Accordion title="Ver fórmulas e suposições">
 <div className="space-y-4">
 <div><h4 className="font-medium text-text mb-2">Fórmula utilizada:</h4><pre className="text-caption text-neutral-700 bg-neutral-100 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">{config.formula}</pre></div>
 <div><h4 className="font-medium text-text mb-2">Considerações:</h4><ul className="space-y-1 list-disc list-inside text-body text-neutral-700">{config.assumptions.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
 </div>
 </Accordion>
 <div className="prose prose-neutral max-w-none text-body">
 <h3 className="text-h2 font-heading text-text">{config.seo.title}</h3>
 <div dangerouslySetInnerHTML={{ __html: config.seo.content }} />
 </div>
 </div>
 )}
 </div>

 {/* Conteúdo tipo blog */}
 <CalculatorContent calculatorId={calculatorId} title={config.title} />
 </main>

 <Toast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={() => setToast(p => ({ ...p, visible: false }))} />
 <Footer />

 {/* Sticky Ad para calculadoras */}
 <StickyAd
 position="bottom"
 load={shouldShowStickyAd && adsVisible}
 />

 <div className="lg:hidden h-24" />
 </div>
 );
};
