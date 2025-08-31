import React from 'react';
import { AdSlot } from './AdSlot';
import { useGradientBorder } from '../hooks/useTheme';

interface CalculatorContentProps {
 calculatorId: string;
 title: string;
}

export const CalculatorContent: React.FC<CalculatorContentProps> = ({ calculatorId, title }) => {
 const { getGradientBackground } = useGradientBorder();

 const getContent = () => {
 switch (calculatorId) {
 case 'floor-tiles':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Pisos e Azulejos Corretamente
 </h2>
 
 {/* SVG Ilustrativo */}
 <div className="bg-brand-50 rounded-2xl p-8 mb-8">
 <svg viewBox="0 0 600 300" className="w-full h-64 mx-auto">
 <defs>
 <pattern id="tilePattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
 <rect width="28" height="28" fill="currentColor" className="text-brand-500" opacity="0.8" />
 <rect width="28" height="28" fill="none" stroke="currentColor" className="text-brand-700" strokeWidth="1" />
 </pattern>
 <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-neutral-600" />
 </marker>
 </defs>

 {/* Área principal */}
 <rect x="100" y="80" width="400" height="160" fill="url(#tilePattern)" rx="4" />

 {/* Bordas */}
 <rect x="95" y="75" width="410" height="170" fill="none" stroke="currentColor" className="text-neutral-600" strokeWidth="2" rx="6" />

 {/* Dimensões */}
 <line x1="100" y1="60" x2="500" y2="60" stroke="currentColor" className="text-neutral-600" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
 <text x="300" y="50" textAnchor="middle" className="fill-neutral-700 text-sm font-semibold">
 Comprimento (m)
 </text>

 <line x1="80" y1="80" x2="80" y2="240" stroke="currentColor" className="text-neutral-600" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
 <text x="70" y="160" textAnchor="middle" className="fill-neutral-700 text-sm font-semibold" transform="rotate(-90, 70, 160)">
 Largura (m)
 </text>

 {/* Título */}
 <text x="300" y="25" textAnchor="middle" className="fill-neutral-800 text-lg font-bold">
 Cálculo de Área para Pisos e Azulejos
 </text>

 {/* Fórmula */}
 <text x="300" y="275" textAnchor="middle" className="fill-neutral-600 text-sm font-medium">
 Área Total = (Comprimento × Largura) + 10% para perdas
 </text>
 </svg>
 </div>

 <div className="prose prose-brand max-w-none">
 <p className="text-lg text-neutral-700 leading-relaxed mb-6">
 O cálculo correto de pisos e azulejos é fundamental para evitar desperdício e garantir que você tenha material suficiente para completar sua obra. Nossa calculadora considera todos os fatores importantes para um resultado preciso, incluindo perdas por recortes, quebras e ajustes.
 </p>

 <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-xl p-6 mb-8 border-l-4 border-brand-500">
 <h4 className="text-lg font-semibold text-brand-800 mb-3">
 💡 Por que usar nossa calculadora?
 </h4>
 <ul className="space-y-2 text-neutral-700 ">
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Precisão profissional:</strong> Baseada em normas técnicas da construção civil</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Economia garantida:</strong> Evita compras excessivas ou insuficientes</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Fácil de usar:</strong> Interface intuitiva para qualquer pessoa</span>
 </li>
 </ul>
 </div>

 {/* Primeiro slot de AdSense */}
 <AdSlot className="my-8" />

 <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
 Fatores Importantes no Cálculo de Pisos e Azulejos
 </h3>
 
 <ul className="space-y-2 text-neutral-700 ">
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Margem de perdas:</strong> Sempre inclua 10-15% para recortes, quebras e futuras manutenções</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Tamanho das peças:</strong> Peças maiores geram menos perdas, mas são mais difíceis de cortar</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Layout:</strong> Instalação diagonal aumenta as perdas para 15-20%</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Mesmo lote:</strong> Compre sempre do mesmo lote para evitar diferenças de tonalidade</span>
 </li>
 </ul>
 </div>
 </section>

 {/* Slot para AdSense */}
 <AdSlot />

 <section>
 <h3 className="text-xl font-semibold text-neutral-900 mb-4">
 Dicas Profissionais
 </h3>
 
 <div className="grid md:grid-cols-2 gap-6">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-brand-600 mb-2">Antes da Compra</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• Meça o ambiente pelo menos duas vezes</li>
 <li>• Considere o sentido de instalação</li>
 <li>• Verifique se há desníveis no piso</li>
 <li>• Calcule também rejunte e argamassa</li>
 </ul>
 </div>
 
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-brand-600 mb-2">Durante a Instalação</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• Comece sempre por um canto reto</li>
 <li>• Use espaçadores para juntas uniformes</li>
 <li>• Guarde algumas peças para futuras trocas</li>
 <li>• Limpe o rejunte antes que seque</li>
 </ul>
 </div>
 </div>

 {/* Segundo slot de AdSense */}
 <AdSlot className="my-8" />

 <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
 Tipos de Pisos e Azulejos: Guia Completo
 </h3>

 <div className="grid md:grid-cols-3 gap-6 mb-8">
 <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
 <h4 className="font-semibold text-blue-800 mb-3">Cerâmicos</h4>
 <p className="text-sm text-blue-700 mb-3">Ideais para áreas secas e de baixo tráfego</p>
 <ul className="text-xs text-blue-600 space-y-1">
 <li>• Absorção: 10-20%</li>
 <li>• Uso: Paredes internas</li>
 <li>• Preço: Econômico</li>
 </ul>
 </div>

 <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
 <h4 className="font-semibold text-green-800 mb-3">Grês</h4>
 <p className="text-sm text-green-700 mb-3">Versáteis para pisos e paredes</p>
 <ul className="text-xs text-green-600 space-y-1">
 <li>• Absorção: 3-10%</li>
 <li>• Uso: Áreas internas</li>
 <li>• Preço: Intermediário</li>
 </ul>
 </div>

 <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
 <h4 className="font-semibold text-purple-800 mb-3">Porcelanato</h4>
 <p className="text-sm text-purple-700 mb-3">Alta resistência e durabilidade</p>
 <ul className="text-xs text-purple-600 space-y-1">
 <li>• Absorção: 0-3%</li>
 <li>• Uso: Qualquer ambiente</li>
 <li>• Preço: Premium</li>
 </ul>
 </div>
 </div>

 <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
 Como Escolher o Tamanho Ideal
 </h3>

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-6">
 <h4 className="font-semibold text-amber-800 mb-3">
 📏 Regra dos Tamanhos
 </h4>
 <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700 ">
 <div>
 <strong>Ambientes pequenos (até 10m²):</strong>
 <ul className="mt-1 space-y-1">
 <li>• 30x30cm ou 45x45cm</li>
 <li>• Cores claras ampliam o espaço</li>
 <li>• Evite muitas juntas</li>
 </ul>
 </div>
 <div>
 <strong>Ambientes grandes (acima de 20m²):</strong>
 <ul className="mt-1 space-y-1">
 <li>• 60x60cm ou maiores</li>
 <li>• Formatos retangulares modernizam</li>
 <li>• Menos juntas = mais elegância</li>
 </ul>
 </div>
 </div>
 </div>
 </section>
 </div>
 );

 case 'ac-btus':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular BTUs do Ar Condicionado
 </h2>
 
 {/* SVG Ilustrativo */}
 <div className="bg-brand-50 rounded-2xl p-6 mb-6">
 <svg viewBox="0 0 400 200" className="w-full h-32 mx-auto">
 <rect x="50" y="60" width="300" height="80" rx="8" fill="currentColor" className="text-brand-500" opacity="0.8" />
 <rect x="60" y="70" width="280" height="15" fill="currentColor" className="text-white" opacity="0.9" />
 <rect x="60" y="90" width="280" height="15" fill="currentColor" className="text-white" opacity="0.9" />
 <rect x="60" y="110" width="280" height="15" fill="currentColor" className="text-white" opacity="0.9" />
 
 {/* Fluxo de ar */}
 <path d="M200 140 Q180 160 160 180 M200 140 Q200 160 200 180 M200 140 Q220 160 240 180" 
 stroke="currentColor" className="text-brand-600" strokeWidth="2" fill="none" opacity="0.6" />
 
 <text x="200" y="50" textAnchor="middle" className="fill-neutral-700 text-sm font-semibold">
 Ar Condicionado
 </text>
 <text x="200" y="195" textAnchor="middle" className="fill-neutral-600 text-xs">
 Cálculo considera área, pessoas e exposição solar
 </text>
 </svg>
 </div>

 <div className="prose prose-brand max-w-none">
 <p className="text-lg text-neutral-700 leading-relaxed">
 Escolher a capacidade correta do ar condicionado é essencial para garantir conforto térmico e eficiência energética. Um equipamento subdimensionado não resfriará adequadamente, enquanto um superdimensionado consumirá energia desnecessariamente.
 </p>

 <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">
 Fatores que Influenciam o Cálculo
 </h3>
 
 <div className="grid md:grid-cols-3 gap-4 my-6">
 <div className="text-center p-4 bg-brand-50 rounded-xl">
 <div className="text-2xl font-bold text-brand-600 ">600-800</div>
 <div className="text-sm text-neutral-600 ">BTU/m² base</div>
 </div>
 <div className="text-center p-4 bg-brand-50 rounded-xl">
 <div className="text-2xl font-bold text-brand-600 ">+600</div>
 <div className="text-sm text-neutral-600 ">BTU por pessoa</div>
 </div>
 <div className="text-center p-4 bg-brand-50 rounded-xl">
 <div className="text-2xl font-bold text-brand-600 ">+20%</div>
 <div className="text-sm text-neutral-600 ">Sol direto</div>
 </div>
 </div>
 </div>
 </section>

 {/* Slot para AdSense */}
 <AdSlot />

 <section>
 <h3 className="text-xl font-semibold text-neutral-900 mb-4">
 Tabela de Referência Rápida
 </h3>
 
 <div className="overflow-x-auto">
 <table className="w-full border-collapse border-2 border-transparent rounded-lg"
 style={getGradientBackground()}>
 <thead>
 <tr className="bg-brand-500 text-white">
 <th className="border border-brand-500 p-3 text-left">Área (m²)</th>
 <th className="border border-brand-500 p-3 text-left">BTUs Recomendados</th>
 <th className="border border-brand-500 p-3 text-left">Capacidade</th>
 </tr>
 </thead>
 <tbody className="text-neutral-700 ">
 <tr>
 <td className="border border-brand-500 p-3">Até 12m²</td>
 <td className="border border-brand-500 p-3">7.000 - 9.000</td>
 <td className="border border-brand-500 p-3">9.000 BTU/h</td>
 </tr>
 <tr className="bg-brand-50 ">
 <td className="border border-brand-500 p-3">12 - 18m²</td>
 <td className="border border-brand-500 p-3">9.000 - 12.000</td>
 <td className="border border-brand-500 p-3">12.000 BTU/h</td>
 </tr>
 <tr>
 <td className="border border-brand-500 p-3">18 - 25m²</td>
 <td className="border border-brand-500 p-3">12.000 - 18.000</td>
 <td className="border border-brand-500 p-3">18.000 BTU/h</td>
 </tr>
 </tbody>
 </table>
 </div>
 </section>
 </div>
 );

 case 'grout':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Rejunte com Precisão Técnica (NBR 14992)
 </h2>

 {/* SVG Ilustrativo Melhorado */}
 <div className="bg-gray-50 rounded-2xl p-8 mb-8">
 <svg viewBox="0 0 600 300" className="w-full h-64 mx-auto">
 <defs>
 <pattern id="groutTilePattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
 <rect width="58" height="58" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" />
 </pattern>
 <marker id="arrowhead-grout" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-neutral-600" />
 </marker>
 </defs>

 {/* Área de azulejos */}
 <rect x="100" y="100" width="400" height="120" fill="url(#groutTilePattern)" />

 {/* Destaque das juntas */}
 <g stroke="#dc2626" strokeWidth="3" fill="#dc2626" opacity="0.7">
 <line x1="160" y1="100" x2="160" y2="220" />
 <line x1="220" y1="100" x2="220" y2="220" />
 <line x1="280" y1="100" x2="280" y2="220" />
 <line x1="340" y1="100" x2="340" y2="220" />
 <line x1="400" y1="100" x2="400" y2="220" />
 <line x1="460" y1="100" x2="460" y2="220" />

 <line x1="100" y1="160" x2="500" y2="160" />
 </g>

 {/* Medidas */}
 <line x1="100" y1="80" x2="160" y2="80" stroke="currentColor" className="text-blue-600" strokeWidth="2" markerEnd="url(#arrowhead-grout)" markerStart="url(#arrowhead-grout)" />
 <text x="130" y="70" textAnchor="middle" className="fill-blue-700 text-xs font-semibold">
 Largura (L)
 </text>

 <line x1="80" y1="100" x2="80" y2="160" stroke="currentColor" className="text-green-600" strokeWidth="2" markerEnd="url(#arrowhead-grout)" markerStart="url(#arrowhead-grout)" />
 <text x="70" y="130" className="fill-green-700 text-xs font-semibold" transform="rotate(-90, 70, 130)">
 Comprimento (C)
 </text>

 {/* Junta destacada */}
 <line x1="160" y1="240" x2="220" y2="240" stroke="#dc2626" strokeWidth="6" />
 <text x="190" y="255" textAnchor="middle" className="fill-red-700 text-xs font-semibold">
 Largura da Junta (l)
 </text>

 {/* Profundidade */}
 <rect x="520" y="120" width="60" height="80" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" />
 <line x1="540" y1="120" x2="540" y2="200" stroke="#dc2626" strokeWidth="4" />
 <text x="590" y="160" className="fill-red-700 text-xs font-semibold" transform="rotate(-90, 590, 160)">
 Profundidade (p)
 </text>

 {/* Fórmula NBR 14992 */}
 <text x="300" y="40" textAnchor="middle" className="fill-neutral-700 text-sm font-bold">
 NBR 14992: Consumo/m² = ((L + C) ÷ (L × C)) × l × p × 1,6
 </text>

 {/* Tipos de rejunte */}
 <g transform="translate(120, 270)">
 <rect x="0" y="0" width="80" height="20" fill="#6b7280" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-white text-xs font-semibold">Cimentício</text>
 </g>

 <g transform="translate(220, 270)">
 <rect x="0" y="0" width="80" height="20" fill="#3b82f6" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-white text-xs font-semibold">Acrílico</text>
 </g>

 <g transform="translate(320, 270)">
 <rect x="0" y="0" width="80" height="20" fill="#059669" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-white text-xs font-semibold">Epóxi</text>
 </g>
 </svg>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-red-600 mb-2">Fórmula NBR 14992</h4>
 <ul className="text-sm text-neutral-600 space-y-2">
 <li><strong>L:</strong> Largura da peça (mm)</li>
 <li><strong>C:</strong> Comprimento da peça (mm)</li>
 <li><strong>l:</strong> Largura da junta (mm)</li>
 <li><strong>p:</strong> Profundidade da junta (mm)</li>
 <li><strong>1,6:</strong> Fator de densidade</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-blue-600 mb-2">Larguras Recomendadas</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>Porcelanato:</strong> 2-3mm</li>
 <li>• <strong>Cerâmica:</strong> 3-5mm</li>
 <li>• <strong>Peças &gt;60cm:</strong> Mín. 3mm</li>
 <li>• <strong>Áreas externas:</strong> 4-6mm</li>
 </ul>
 </div>
 </div>
 </section>

 {/* Slot para AdSense */}
 <AdSlot />

 <section>
 <h3 className="text-xl font-semibold text-neutral-900 mb-4">
 Dicas Profissionais
 </h3>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-brand-600 mb-2">Aplicação</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• Misture apenas a quantidade que usará em 30 min</li>
 <li>• Aplique em movimentos diagonais</li>
 <li>• Remova o excesso antes que seque</li>
 <li>• Use esponja úmida para acabamento</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-green-600 mb-2">Tipos de Rejunte</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>Cimentício:</strong> Uso geral (fator 1,0)</li>
 <li>• <strong>Acrílico:</strong> Flexível, áreas úmidas (fator 0,9)</li>
 <li>• <strong>Epóxi:</strong> Alta resistência, piscinas (fator 1,2)</li>
 </ul>
 </div>
 </div>

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
 <p className="text-amber-800">
 <strong>Dica Técnica NBR 14992:</strong> Use espaçadores para garantir uniformidade das juntas.
 Para juntas acima de 8mm, verifique a especificação do fabricante.
 A profundidade da junta deve ser igual à espessura da peça cerâmica.
 </p>
 </div>
 </section>
 </div>
 );

 case 'roof-pitch':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular a Inclinação Ideal do Telhado
 </h2>

 {/* SVG Ilustrativo da Inclinação */}
 <div className="bg-blue-50 rounded-2xl p-8 mb-8">
 <svg viewBox="0 0 600 300" className="w-full h-64 mx-auto">
 <defs>
 <marker id="arrowhead-roof" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-neutral-600" />
 </marker>
 </defs>

 {/* Base da casa */}
 <rect x="150" y="200" width="300" height="80" fill="currentColor" className="text-neutral-300" stroke="currentColor" strokeWidth="2" />

 {/* Telhado */}
 <polygon points="150,200 300,120 450,200" fill="currentColor" className="text-red-500" opacity="0.8" stroke="#dc2626" strokeWidth="2" />

 {/* Linha de avanço horizontal */}
 <line x1="150" y1="200" x2="300" y2="200" stroke="currentColor" className="text-blue-600" strokeWidth="3" strokeDasharray="5,5" />

 {/* Linha de altura vertical */}
 <line x1="300" y1="200" x2="300" y2="120" stroke="currentColor" className="text-green-600" strokeWidth="3" strokeDasharray="5,5" />

 {/* Setas de medição */}
 <line x1="150" y1="220" x2="300" y2="220" stroke="currentColor" className="text-blue-600" strokeWidth="2" markerEnd="url(#arrowhead-roof)" markerStart="url(#arrowhead-roof)" />
 <text x="225" y="240" textAnchor="middle" className="fill-blue-700 text-sm font-semibold">
 Avanço Horizontal (m)
 </text>

 <line x1="320" y1="200" x2="320" y2="120" stroke="currentColor" className="text-green-600" strokeWidth="2" markerEnd="url(#arrowhead-roof)" markerStart="url(#arrowhead-roof)" />
 <text x="340" y="160" className="fill-green-700 text-sm font-semibold">
 Altura
 </text>
 <text x="340" y="175" className="fill-green-700 text-sm font-semibold">
 Vertical (m)
 </text>

 {/* Ângulo de inclinação */}
 <path d="M 150 200 A 30 30 0 0 0 170 185" fill="none" stroke="currentColor" className="text-purple-600" strokeWidth="2" />
 <text x="175" y="195" className="fill-purple-700 text-xs font-semibold">θ</text>

 {/* Fórmula */}
 <text x="300" y="50" textAnchor="middle" className="fill-neutral-700 text-lg font-bold">
 Inclinação (%) = (Altura ÷ Avanço) × 100
 </text>
 </svg>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-blue-600 mb-2">Inclinações Mínimas</h4>
 <ul className="text-sm text-neutral-600 space-y-2">
 <li><strong>Cerâmica/Barro:</strong> 30% (16,7°)</li>
 <li><strong>Fibrocimento:</strong> 10% (5,7°)</li>
 <li><strong>Metálica:</strong> 5% (2,9°)</li>
 <li><strong>Concreto:</strong> 30% (16,7°)</li>
 <li><strong>Shingle:</strong> 17% (9,6°)</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-green-600 mb-2">Fórmulas de Cálculo</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>%:</strong> (Altura ÷ Avanço) × 100</li>
 <li>• <strong>Graus:</strong> arctan(Altura ÷ Avanço)</li>
 <li>• <strong>Empena:</strong> √(Avanço² + Altura²)</li>
 <li>• <strong>Área:</strong> Avanço × Comprimento × 2</li>
 </ul>
 </div>
 </div>

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
 <p className="text-amber-800">
 <strong>Importante:</strong> Uma inclinação abaixo do mínimo recomendado pode causar infiltrações,
 acúmulo de água e problemas estruturais. Sempre consulte as especificações do fabricante da telha.
 </p>
 </div>
 </section>
 </div>
 );

 case 'roof-tiles':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Telhas com Precisão Técnica
 </h2>

 {/* SVG Ilustrativo */}
 <div className="bg-brand-50 rounded-2xl p-6 mb-6">
 <svg viewBox="0 0 400 200" className="w-full h-32 mx-auto">
 <path d="M50 100 L200 40 L350 100 L300 100 L200 60 L100 100 Z" fill="currentColor" className="text-neutral-300 " />
 <g fill="currentColor" className="text-red-500">
 <path d="M100 100 Q110 95 120 100 Q130 105 140 100 Q150 95 160 100 Q170 105 180 100 Q190 95 200 100 Q210 105 220 100 Q230 95 240 100 Q250 105 260 100 Q270 95 280 100 Q290 105 300 100 L300 120 L100 120 Z" />
 <path d="M100 120 Q110 115 120 120 Q130 125 140 120 Q150 115 160 120 Q170 125 180 120 Q190 115 200 120 Q210 125 220 120 Q230 115 240 120 Q250 125 260 120 Q270 115 280 120 Q290 125 300 120 L300 140 L100 140 Z" />
 <path d="M100 140 Q110 135 120 140 Q130 145 140 140 Q150 135 160 140 Q170 145 180 140 Q190 135 200 140 Q210 145 220 140 Q230 135 240 140 Q250 145 260 140 Q270 135 280 140 Q290 145 300 140 L300 160 L100 160 Z" />
 </g>
 <text x="200" y="30" textAnchor="middle" className="fill-neutral-700 text-sm font-semibold">
 Telhado com telhas cerâmicas
 </text>
 <text x="200" y="185" textAnchor="middle" className="fill-neutral-600 text-xs">
 Consumo: Romana 16/m², Colonial 24/m², Plan 10/m², Fibrocimento 0,33/m²
 </text>
 </svg>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-red-600 mb-2">Consumo por Tipo</h4>
 <ul className="text-sm text-neutral-600 space-y-2">
 <li><strong>Romana:</strong> 16 peças/m² (2,5kg/peça)</li>
 <li><strong>Colonial:</strong> 24 peças/m² (2,0kg/peça)</li>
 <li><strong>Portuguesa:</strong> 17 peças/m² (2,3kg/peça)</li>
 <li><strong>Plan:</strong> 10 peças/m² (4,0kg/peça)</li>
 <li><strong>Fibrocimento:</strong> 0,33 peças/m² (15kg/peça)</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-orange-600 mb-2">Fatores de Inclinação</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>30%:</strong> Fator 1,15</li>
 <li>• <strong>40%:</strong> Fator 1,31</li>
 <li>• <strong>50%:</strong> Fator 1,55</li>
 <li>• <strong>60%:</strong> Fator 1,73</li>
 <li>• <strong>70%+:</strong> Fator 2,00</li>
 </ul>
 </div>
 </div>
 </section>

 {/* Slot para AdSense */}
 <AdSlot />

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
 <p className="text-amber-800">
 <strong>Dica Técnica:</strong> Margem de 8% padrão para quebras e recortes.
 Para telhados complexos, aumente para 10-12%. Considere a inclinação no cálculo da área real.
 Para áreas &gt; 500m², é obrigatório cálculo estrutural profissional.
 </p>
 </div>
 </div>
 );

 case 'baseboard-trim':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Rodapé e Guarnição com Precisão Técnica
 </h2>

 {/* SVG Ilustrativo */}
 <div className="bg-brand-50 rounded-2xl p-6 mb-6">
 <svg viewBox="0 0 400 200" className="w-full h-32 mx-auto">
 <rect x="50" y="30" width="300" height="100" rx="4" fill="currentColor" className="text-neutral-200 " />
 <rect x="50" y="130" width="300" height="40" rx="2" fill="currentColor" className="text-neutral-300 " />
 <rect x="50" y="120" width="300" height="15" rx="2" fill="currentColor" className="text-amber-500" />
 <rect x="150" y="30" width="100" height="90" rx="2" fill="currentColor" className="text-neutral-100 " />
 <rect x="145" y="30" width="5" height="90" fill="currentColor" className="text-amber-500" />
 <rect x="250" y="30" width="5" height="90" fill="currentColor" className="text-amber-500" />
 <rect x="145" y="30" width="110" height="5" fill="currentColor" className="text-amber-500" />
 <circle cx="230" cy="75" r="3" fill="currentColor" className="text-neutral-600" />
 <text x="200" y="20" textAnchor="middle" className="fill-neutral-700 text-sm font-semibold">
 Rodapé e guarnição de porta
 </text>
 <text x="200" y="190" textAnchor="middle" className="fill-neutral-600 text-xs">
 Barras padrão: 2,40m
 </text>
 </svg>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-amber-600 mb-2">Fórmulas de Cálculo</h4>
 <ul className="text-sm text-neutral-600 space-y-2">
 <li><strong>Perímetro:</strong> 2 × (Comprimento + Largura)</li>
 <li><strong>Rodapé:</strong> Perímetro × Número de Cômodos</li>
 <li><strong>Guarnição:</strong> (2 × Altura + Largura) × Portas</li>
 <li><strong>Barras:</strong> ⌈Metros ÷ Comprimento da Barra⌉</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-brown-600 mb-2">Alturas de Rodapé</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>7cm:</strong> Pé-direito baixo</li>
 <li>• <strong>10cm:</strong> Padrão residencial</li>
 <li>• <strong>15cm:</strong> Pé-direito alto</li>
 <li>• <strong>20cm:</strong> Pé-direito muito alto</li>
 </ul>
 </div>
 </div>
 </section>

 {/* Slot para AdSense */}
 <AdSlot />

 <section>
 <h3 className="text-xl font-semibold text-neutral-900 mb-4">
 Dicas de Instalação
 </h3>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-amber-600 mb-2">Barras Comerciais</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>2,20m:</strong> Padrão econômico</li>
 <li>• <strong>2,40m:</strong> Mais comum</li>
 <li>• <strong>2,60m:</strong> Reduz emendas</li>
 </ul>
 </div>
 </div>

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
 <p className="text-amber-800">
 <strong>Dica Técnica:</strong> Margem de 8% padrão para cortes e emendas.
 Rodapé = acabamento entre piso e parede. Guarnição = acabamento que cobre batente e parede.
 Altura do rodapé deve ser proporcional ao pé-direito do ambiente.
 </p>
 </div>
 </section>
 </div>
 );

 case 'wallpaper':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Papel de Parede com Precisão Técnica
 </h2>

 {/* SVG Ilustrativo do Papel de Parede */}
 <div className="bg-purple-50 rounded-2xl p-8 mb-8">
 <svg viewBox="0 0 600 300" className="w-full h-64 mx-auto">
 <defs>
 <pattern id="wallpaperPattern" x="0" y="0" width="40" height="60" patternUnits="userSpaceOnUse">
 <rect width="40" height="60" fill="#f3e8ff" />
 <circle cx="20" cy="15" r="3" fill="#8b5cf6" opacity="0.6" />
 <circle cx="20" cy="45" r="3" fill="#8b5cf6" opacity="0.6" />
 <path d="M10 30 Q20 25 30 30 Q20 35 10 30" fill="#a855f7" opacity="0.4" />
 </pattern>
 <marker id="arrowhead-wallpaper" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-neutral-600" />
 </marker>
 </defs>

 {/* Parede com papel */}
 <rect x="100" y="80" width="400" height="160" fill="url(#wallpaperPattern)" stroke="#8b5cf6" strokeWidth="2" rx="4" />

 {/* Porta */}
 <rect x="180" y="160" width="60" height="80" fill="white" stroke="#6b7280" strokeWidth="2" rx="2" />
 <circle cx="230" cy="200" r="2" fill="#6b7280" />

 {/* Janela */}
 <rect x="320" y="120" width="80" height="60" fill="white" stroke="#6b7280" strokeWidth="2" rx="2" />
 <line x1="360" y1="120" x2="360" y2="180" stroke="#6b7280" strokeWidth="1" />
 <line x1="320" y1="150" x2="400" y2="150" stroke="#6b7280" strokeWidth="1" />

 {/* Medidas */}
 <line x1="100" y1="60" x2="500" y2="60" stroke="currentColor" className="text-purple-600" strokeWidth="2" markerEnd="url(#arrowhead-wallpaper)" markerStart="url(#arrowhead-wallpaper)" />
 <text x="300" y="50" textAnchor="middle" className="fill-purple-700 text-sm font-semibold">
 Perímetro das Paredes
 </text>

 <line x1="80" y1="80" x2="80" y2="240" stroke="currentColor" className="text-green-600" strokeWidth="2" markerEnd="url(#arrowhead-wallpaper)" markerStart="url(#arrowhead-wallpaper)" />
 <text x="70" y="160" textAnchor="middle" className="fill-green-700 text-sm font-semibold" transform="rotate(-90, 70, 160)">
 Altura (Pé-direito)
 </text>

 {/* Rapport */}
 <line x1="520" y1="95" x2="520" y2="155" stroke="currentColor" className="text-orange-600" strokeWidth="3" strokeDasharray="3,3" />
 <text x="530" y="125" className="fill-orange-700 text-xs font-semibold">
 Rapport
 </text>
 <text x="530" y="140" className="fill-orange-700 text-xs font-semibold">
 (32cm)
 </text>

 {/* Fórmula */}
 <text x="300" y="280" textAnchor="middle" className="fill-neutral-700 text-sm font-bold">
 Rolos = ⌈(Perímetro × Altura - Aberturas) × (1 + Perdas%) ÷ Área do Rolo⌉
 </text>
 </svg>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-purple-600 mb-2">Entendendo o Rapport</h4>
 <ul className="text-sm text-neutral-600 space-y-2">
 <li><strong>0cm:</strong> Sem padrão (liso ou textura)</li>
 <li><strong>16-32cm:</strong> Padrão pequeno (mais comum)</li>
 <li><strong>32-64cm:</strong> Padrão médio (atenção ao consumo)</li>
 <li><strong>&gt;64cm:</strong> Padrão grande (alto consumo)</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-green-600 mb-2">Padrões Brasileiros</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>Largura:</strong> 0,52m (52cm)</li>
 <li>• <strong>Comprimento:</strong> 10m por rolo</li>
 <li>• <strong>Área:</strong> 5,2 m² por rolo</li>
 <li>• <strong>Cola:</strong> 200g por m²</li>
 </ul>
 </div>
 </div>

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
 <p className="text-amber-800">
 <strong>Dica Profissional:</strong> Se a altura da parede for maior que o comprimento do rolo,
 serão necessárias emendas horizontais. Para rapport &gt; 30cm, considere aumentar a margem para 15%.
 Sempre compre rolos do mesmo lote para evitar diferenças de cor.
 </p>
 </div>
 </section>
 </div>
 );

 case 'mortar':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Argamassa com Precisão Técnica
 </h2>

 {/* SVG Ilustrativo da Aplicação de Argamassa */}
 <div className="bg-orange-50 rounded-2xl p-8 mb-8">
 <svg viewBox="0 0 600 300" className="w-full h-64 mx-auto">
 <defs>
 <pattern id="brickPattern" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
 <rect width="60" height="30" fill="#d97706" />
 <rect x="2" y="2" width="56" height="26" fill="#ea580c" />
 <line x1="30" y1="0" x2="30" y2="30" stroke="#92400e" strokeWidth="1" />
 </pattern>
 <marker id="arrowhead-mortar" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-neutral-600" />
 </marker>
 </defs>

 {/* Parede de tijolos */}
 <rect x="100" y="100" width="400" height="120" fill="url(#brickPattern)" stroke="#92400e" strokeWidth="2" rx="4" />

 {/* Camada de argamassa */}
 <rect x="95" y="95" width="410" height="8" fill="#a3a3a3" stroke="#737373" strokeWidth="1" rx="2" />
 <text x="300" y="90" textAnchor="middle" className="fill-neutral-700 text-xs font-semibold">
 Camada de Argamassa
 </text>

 {/* Espessura */}
 <line x1="80" y1="95" x2="80" y2="103" stroke="currentColor" className="text-orange-600" strokeWidth="2" markerEnd="url(#arrowhead-mortar)" markerStart="url(#arrowhead-mortar)" />
 <text x="70" y="100" className="fill-orange-700 text-xs font-semibold" transform="rotate(-90, 70, 100)">
 Espessura
 </text>

 {/* Área */}
 <line x1="100" y1="80" x2="500" y2="80" stroke="currentColor" className="text-blue-600" strokeWidth="2" markerEnd="url(#arrowhead-mortar)" markerStart="url(#arrowhead-mortar)" />
 <text x="300" y="70" textAnchor="middle" className="fill-blue-700 text-sm font-semibold">
 Área Total (m²)
 </text>

 {/* Tipos de aplicação */}
 <g transform="translate(120, 240)">
 <rect x="0" y="0" width="80" height="20" fill="#fbbf24" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-neutral-800 text-xs font-semibold">Chapisco</text>
 </g>

 <g transform="translate(220, 240)">
 <rect x="0" y="0" width="80" height="20" fill="#f59e0b" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-neutral-800 text-xs font-semibold">Reboco</text>
 </g>

 <g transform="translate(320, 240)">
 <rect x="0" y="0" width="80" height="20" fill="#d97706" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-neutral-800 text-xs font-semibold">Contrapiso</text>
 </g>

 {/* Fórmula */}
 <text x="300" y="40" textAnchor="middle" className="fill-neutral-700 text-sm font-bold">
 Kg Total = Área × Fator × Espessura × (1 + Perdas%)
 </text>
 </svg>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-orange-600 mb-2">Fatores de Consumo</h4>
 <ul className="text-sm text-neutral-600 space-y-2">
 <li><strong>Chapisco:</strong> 3,0 kg/m²/cm</li>
 <li><strong>Reboco:</strong> 1,2 kg/m²/mm</li>
 <li><strong>Contrapiso:</strong> 2,0 kg/m²/cm</li>
 <li><strong>Assentamento:</strong> 1,0-1,5 kg/m²/mm</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-green-600 mb-2">Espessuras Padrão</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>Chapisco:</strong> 3-8mm</li>
 <li>• <strong>Reboco:</strong> 10-20mm</li>
 <li>• <strong>Contrapiso:</strong> 15-30mm</li>
 <li>• <strong>Assentamento:</strong> 3-10mm</li>
 </ul>
 </div>
 </div>

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
 <p className="text-amber-800">
 <strong>Dica Técnica:</strong> Para espessuras acima de 30mm, aplique em duas camadas para evitar
 trincas e garantir aderência adequada. Superfícies irregulares podem precisar de 15% a mais de argamassa.
 </p>
 </div>
 </section>
 </div>
 );

 case 'concrete':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Concreto com Traços Técnicos Precisos
 </h2>

 {/* SVG Ilustrativo do Concreto */}
 <div className="bg-gray-50 rounded-2xl p-8 mb-8">
 <svg viewBox="0 0 600 300" className="w-full h-64 mx-auto">
 <defs>
 <pattern id="concretePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
 <rect width="20" height="20" fill="#e5e7eb" />
 <circle cx="5" cy="5" r="2" fill="#6b7280" />
 <circle cx="15" cy="15" r="1.5" fill="#9ca3af" />
 <circle cx="10" cy="18" r="1" fill="#6b7280" />
 </pattern>
 <marker id="arrowhead-concrete" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-neutral-600" />
 </marker>
 </defs>

 {/* Estrutura de concreto */}
 <rect x="100" y="120" width="400" height="80" fill="url(#concretePattern)" stroke="#6b7280" strokeWidth="2" rx="4" />

 {/* Componentes do concreto */}
 <g transform="translate(120, 140)">
 <circle cx="0" cy="0" r="8" fill="#8b5cf6" />
 <text x="15" y="5" className="fill-purple-700 text-xs font-semibold">Cimento</text>
 </g>

 <g transform="translate(200, 160)">
 <circle cx="0" cy="0" r="6" fill="#f59e0b" />
 <text x="15" y="5" className="fill-amber-700 text-xs font-semibold">Areia</text>
 </g>

 <g transform="translate(280, 150)">
 <circle cx="0" cy="0" r="10" fill="#6b7280" />
 <text x="15" y="5" className="fill-gray-700 text-xs font-semibold">Brita</text>
 </g>

 <g transform="translate(360, 170)">
 <circle cx="0" cy="0" r="4" fill="#3b82f6" />
 <text x="15" y="5" className="fill-blue-700 text-xs font-semibold">Água</text>
 </g>

 {/* Volume */}
 <line x1="100" y1="100" x2="500" y2="100" stroke="currentColor" className="text-blue-600" strokeWidth="2" markerEnd="url(#arrowhead-concrete)" markerStart="url(#arrowhead-concrete)" />
 <text x="300" y="90" textAnchor="middle" className="fill-blue-700 text-sm font-semibold">
 Volume (m³)
 </text>

 {/* FCK */}
 <text x="300" y="250" textAnchor="middle" className="fill-neutral-700 text-lg font-bold">
 FCK = Resistência à Compressão (MPa)
 </text>

 {/* Traços */}
 <g transform="translate(120, 220)">
 <rect x="0" y="0" width="80" height="20" fill="#8b5cf6" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-white text-xs font-semibold">FCK 15</text>
 </g>

 <g transform="translate(220, 220)">
 <rect x="0" y="0" width="80" height="20" fill="#7c3aed" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-white text-xs font-semibold">FCK 20</text>
 </g>

 <g transform="translate(320, 220)">
 <rect x="0" y="0" width="80" height="20" fill="#6d28d9" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-white text-xs font-semibold">FCK 25</text>
 </g>

 <g transform="translate(420, 220)">
 <rect x="0" y="0" width="80" height="20" fill="#5b21b6" rx="2" />
 <text x="40" y="13" textAnchor="middle" className="fill-white text-xs font-semibold">FCK 30</text>
 </g>

 {/* Fórmula */}
 <text x="300" y="40" textAnchor="middle" className="fill-neutral-700 text-sm font-bold">
 Materiais = Volume × Consumo FCK × Traço do Método
 </text>
 </svg>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-purple-600 mb-2">Consumos por FCK</h4>
 <ul className="text-sm text-neutral-600 space-y-2">
 <li><strong>FCK 15:</strong> 280 kg/m³</li>
 <li><strong>FCK 20:</strong> 320 kg/m³</li>
 <li><strong>FCK 25:</strong> 360 kg/m³</li>
 <li><strong>FCK 30:</strong> 400 kg/m³</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-green-600 mb-2">Traços por Método</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>Manual:</strong> 1:3:4</li>
 <li>• <strong>Betoneira pequena:</strong> 1:2,5:3,5</li>
 <li>• <strong>Betoneira média:</strong> 1:2,3:3,2</li>
 <li>• <strong>Betoneira grande:</strong> 1:2,2:3,0</li>
 </ul>
 </div>
 </div>

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
 <p className="text-amber-800">
 <strong>Dica Técnica:</strong> Para volumes acima de 5m³, considere bombeamento.
 Acima de 50m³, recomende concreto usinado. FCK estrutural (25+ MPa) sempre consulte um engenheiro.
 Água limpa e proporções corretas são fundamentais para a resistência.
 </p>
 </div>
 </section>
 </div>
 );

 case 'lawn-grass':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Grama com Precisão Técnica
 </h2>

 {/* SVG Ilustrativo da Grama */}
 <div className="bg-green-50 rounded-2xl p-8 mb-8">
 <svg viewBox="0 0 600 300" className="w-full h-64 mx-auto">
 <defs>
 <pattern id="grassPattern" x="0" y="0" width="15" height="20" patternUnits="userSpaceOnUse">
 <rect width="15" height="20" fill="#dcfce7" />
 <path d="M3 20 Q7.5 15 3 10 Q7.5 5 3 0" stroke="#16a34a" strokeWidth="1" fill="none" />
 <path d="M8 20 Q12.5 15 8 10 Q12.5 5 8 0" stroke="#15803d" strokeWidth="1" fill="none" />
 <path d="M13 20 Q17.5 15 13 10 Q17.5 5 13 0" stroke="#16a34a" strokeWidth="1" fill="none" />
 </pattern>
 <marker id="arrowhead-grass" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-neutral-600" />
 </marker>
 </defs>

 {/* Área do gramado */}
 <rect x="100" y="120" width="400" height="120" fill="url(#grassPattern)" stroke="#16a34a" strokeWidth="2" rx="8" />

 {/* Tipos de grama */}
 <g transform="translate(120, 140)">
 <rect x="0" y="0" width="60" height="30" fill="#22c55e" rx="4" />
 <text x="30" y="20" textAnchor="middle" className="fill-white text-xs font-semibold">Rolo</text>
 <text x="30" y="45" textAnchor="middle" className="fill-green-700 text-xs">0,40 m²</text>
 </g>

 <g transform="translate(200, 140)">
 <rect x="0" y="0" width="60" height="30" fill="#16a34a" rx="4" />
 <text x="30" y="20" textAnchor="middle" className="fill-white text-xs font-semibold">Placa</text>
 <text x="30" y="45" textAnchor="middle" className="fill-green-700 text-xs">0,135 m²</text>
 </g>

 <g transform="translate(280, 140)">
 <rect x="0" y="0" width="60" height="30" fill="#15803d" rx="4" />
 <text x="30" y="20" textAnchor="middle" className="fill-white text-xs font-semibold">Sementes</text>
 <text x="30" y="45" textAnchor="middle" className="fill-green-700 text-xs">35 m²/kg</text>
 </g>

 <g transform="translate(360, 140)">
 <rect x="0" y="0" width="60" height="30" fill="#166534" rx="4" />
 <text x="30" y="20" textAnchor="middle" className="fill-white text-xs font-semibold">Adubo</text>
 <text x="30" y="45" textAnchor="middle" className="fill-green-700 text-xs">50g/m²</text>
 </g>

 {/* Área */}
 <line x1="100" y1="100" x2="500" y2="100" stroke="currentColor" className="text-green-600" strokeWidth="2" markerEnd="url(#arrowhead-grass)" markerStart="url(#arrowhead-grass)" />
 <text x="300" y="90" textAnchor="middle" className="fill-green-700 text-sm font-semibold">
 Área do Gramado (m²)
 </text>

 {/* Variedades */}
 <text x="300" y="270" textAnchor="middle" className="fill-neutral-700 text-lg font-bold">
 Variedades: São Carlos • Esmeralda • Batatais • Bermuda
 </text>

 {/* Fórmula */}
 <text x="300" y="40" textAnchor="middle" className="fill-neutral-700 text-sm font-bold">
 Quantidade = ⌈Área × (1 + Perdas%) ÷ Cobertura por Unidade⌉
 </text>
 </svg>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-green-600 mb-2">Coberturas por Tipo</h4>
 <ul className="text-sm text-neutral-600 space-y-2">
 <li><strong>Rolo:</strong> 0,40 m² (≈15kg)</li>
 <li><strong>Placa:</strong> 0,135 m² (≈5kg)</li>
 <li><strong>Sementes:</strong> 35 m²/kg</li>
 <li><strong>Adubo:</strong> 50g/m² inicial</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-blue-600 mb-2">Variedades Principais</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• <strong>São Carlos:</strong> Sol/meia-sombra</li>
 <li>• <strong>Esmeralda:</strong> Sol pleno</li>
 <li>• <strong>Batatais:</strong> Resistente</li>
 <li>• <strong>Bermuda:</strong> Esportiva</li>
 </ul>
 </div>
 </div>

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
 <p className="text-amber-800">
 <strong>Dica de Paisagismo:</strong> Para áreas acima de 500m², considere plantio por etapas.
 Rolos oferecem resultado imediato, placas são econômicas e sementes são ideais para grandes áreas.
 Sempre prepare o solo adequadamente e mantenha irrigação constante nos primeiros 30 dias.
 </p>
 </div>
 </section>
 </div>
 );

 default:
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Guia Completo: {title}
 </h2>

 <div className="prose prose-brand max-w-none">
 <p className="text-lg text-neutral-700 leading-relaxed">
 Nossa calculadora de {title.toLowerCase()} foi desenvolvida para fornecer resultados precisos e confiáveis, baseados em normas técnicas e boas práticas da construção civil.
 </p>

 <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">
 Por que usar nossa calculadora?
 </h3>

 <ul className="space-y-2 text-neutral-700 ">
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Precisão técnica:</strong> Baseada em normas e padrões da indústria</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Fácil de usar:</strong> Interface intuitiva e resultados claros</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Margem de segurança:</strong> Inclui percentuais adequados para perdas</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></span>
 <span><strong>Gratuito:</strong> Sem custos ou limitações de uso</span>
 </li>
 </ul>
 </div>
 </section>

 {/* Slot para AdSense */}
 <AdSlot />

 <section>
 <h3 className="text-xl font-semibold text-neutral-900 mb-4">
 Dicas Importantes
 </h3>

 <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
 <p className="text-amber-800 ">
 <strong>Lembre-se:</strong> Os resultados são estimativas baseadas em padrões técnicos.
 Para projetos complexos ou de grande porte, sempre consulte um profissional qualificado.
 </p>
 </div>
 </section>
 </div>
 );
 }
 };

 return (
 <div className="max-w-4xl mx-auto px-4 py-8">
 {getContent()}
 </div>
 );
};
