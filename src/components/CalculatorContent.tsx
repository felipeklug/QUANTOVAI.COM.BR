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
 Como Calcular Rejunte Corretamente
 </h2>

 {/* SVG Ilustrativo */}
 <div className="bg-brand-50 rounded-2xl p-6 mb-6">
 <svg viewBox="0 0 400 200" className="w-full h-32 mx-auto">
 <defs>
 <pattern id="groutTilePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
 <rect width="38" height="38" fill="currentColor" className="text-brand-500" opacity="0.8" />
 <rect width="38" height="38" fill="none" stroke="currentColor" className="text-neutral-400" strokeWidth="2" />
 </pattern>
 </defs>
 <rect x="50" y="30" width="300" height="140" fill="url(#groutTilePattern)" />
 <g stroke="currentColor" strokeWidth="4" className="text-neutral-600">
 <line x1="130" y1="30" x2="130" y2="170" />
 <line x1="210" y1="30" x2="210" y2="170" />
 <line x1="290" y1="30" x2="290" y2="170" />
 <line x1="50" y1="70" x2="350" y2="70" />
 <line x1="50" y1="110" x2="350" y2="110" />
 <line x1="50" y1="150" x2="350" y2="150" />
 </g>
 <text x="200" y="20" textAnchor="middle" className="fill-neutral-700 text-sm font-semibold">
 Rejunte entre azulejos
 </text>
 <text x="200" y="190" textAnchor="middle" className="fill-neutral-600 text-xs">
 Fórmula: (L+C)/(L×C) × J × E × d
 </text>
 </svg>
 </div>

 <div className="prose prose-brand max-w-none">
 <p className="text-lg text-neutral-700 leading-relaxed">
 O cálculo preciso do rejunte é fundamental para um acabamento perfeito e evita desperdício. Nossa calculadora usa a fórmula técnica oficial que considera as dimensões das peças e características da junta.
 </p>

 <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">
 Fatores que Influenciam o Consumo
 </h3>

 <div className="grid md:grid-cols-2 gap-4 my-6">
 <div className="text-center p-4 bg-brand-50 rounded-xl">
 <div className="text-2xl font-bold text-brand-600 ">3mm</div>
 <div className="text-sm text-neutral-600 ">Junta padrão</div>
 </div>
 <div className="text-center p-4 bg-brand-50 rounded-xl">
 <div className="text-2xl font-bold text-brand-600 ">1,6</div>
 <div className="text-sm text-neutral-600 ">Densidade kg/dm³</div>
 </div>
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
 <h4 className="font-semibold text-brand-600 mb-2">Tipos de Rejunte</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• Cimentício: Uso geral, econômico</li>
 <li>• Epóxi: Áreas molhadas, alta resistência</li>
 <li>• Acrílico: Fácil aplicação, cores variadas</li>
 <li>• Flexível: Juntas de movimentação</li>
 </ul>
 </div>
 </div>
 </section>
 </div>
 );

 case 'roof-tiles':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Telhas por m²
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
 Quantidade varia por tipo: 10,5 a 24 peças/m²
 </text>
 </svg>
 </div>

 <div className="prose prose-brand max-w-none">
 <p className="text-lg text-neutral-700 leading-relaxed">
 O cálculo correto de telhas garante cobertura adequada e evita falta de material. Cada tipo de telha tem uma quantidade específica por m², baseada em suas dimensões e sobreposição.
 </p>

 <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">
 Tipos e Quantidades
 </h3>

 <div className="grid md:grid-cols-3 gap-4 my-6">
 <div className="text-center p-4 bg-red-50 rounded-xl">
 <div className="text-2xl font-bold text-red-600 ">16</div>
 <div className="text-sm text-neutral-600 ">Romana/Portuguesa</div>
 </div>
 <div className="text-center p-4 bg-red-50 rounded-xl">
 <div className="text-2xl font-bold text-red-600 ">24</div>
 <div className="text-sm text-neutral-600 ">Colonial</div>
 </div>
 <div className="text-center p-4 bg-red-50 rounded-xl">
 <div className="text-2xl font-bold text-red-600 ">10,5</div>
 <div className="text-sm text-neutral-600 ">Concreto</div>
 </div>
 </div>
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
 <strong>Atenção:</strong> Sempre compre 10% a mais para quebras e reposição futura.
 Para telhados com muitos recortes ou formato irregular, considere 15% de margem.
 </p>
 </div>
 </section>
 </div>
 );

 case 'baseboard-trim':
 return (
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-neutral-900 mb-4">
 Como Calcular Rodapé e Guarnição
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

 <div className="prose prose-brand max-w-none">
 <p className="text-lg text-neutral-700 leading-relaxed">
 O cálculo de rodapé e guarnição considera o perímetro dos ambientes e o contorno das portas. Nossa calculadora otimiza o aproveitamento das barras padrão de 2,40m.
 </p>

 <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">
 Fórmulas de Cálculo
 </h3>

 <div className="grid md:grid-cols-2 gap-4 my-6">
 <div className="text-center p-4 bg-amber-50 rounded-xl">
 <div className="text-lg font-bold text-amber-600 ">Rodapé</div>
 <div className="text-sm text-neutral-600 ">2 × (Comprimento + Largura)</div>
 </div>
 <div className="text-center p-4 bg-amber-50 rounded-xl">
 <div className="text-lg font-bold text-amber-600 ">Guarnição</div>
 <div className="text-sm text-neutral-600 ">Lados × (2 × Altura + Largura)</div>
 </div>
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
 <h4 className="font-semibold text-brand-600 mb-2">Rodapé</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• Instale após o piso e pintura</li>
 <li>• Use cola e pregos para fixação</li>
 <li>• Faça emendas em ângulo de 45°</li>
 <li>• Deixe folga de 2mm nas emendas</li>
 </ul>
 </div>

 <div className="p-6 rounded-xl border-2 border-transparent"
 style={getGradientBackground()}>
 <h4 className="font-semibold text-brand-600 mb-2">Guarnição</h4>
 <ul className="text-sm text-neutral-600 space-y-1">
 <li>• Instale após o batente da porta</li>
 <li>• Corte em ângulo de 45° nos cantos</li>
 <li>• Use pregos sem cabeça</li>
 <li>• Vede com massa corrida se necessário</li>
 </ul>
 </div>
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
