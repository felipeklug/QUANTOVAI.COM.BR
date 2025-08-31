import React from 'react';
import {
 FloorTileIcon, PaintBucketIcon, RoofPitchIcon, ConcreteMixerIcon,
 MortarSackIcon, WallpaperIcon, BulbIcon, PlantPotIcon, ACUnitIcon
} from '../components/icons';
import {
 FloorTilesPremiumIcon,
 ACPremiumIcon,
 PaintPremiumIcon,
 ConcretePremiumIcon,
 MortarPremiumIcon,
 WallpaperPremiumIcon,
 LightingPremiumIcon,
 GrassPremiumIcon,
 GroutPremiumIcon,
 RoofTilesPremiumIcon,
 BaseboardPremiumIcon
} from '../components/PremiumIcons';
import { calcGrout, calcRoofTiles, calcBaseboardAndTrim, ceil } from '../utils/calculationUtils';

export interface CalculatorFieldOption {
 value: string;
 label: string;
}

export interface CalculatorField {
 id: string;
 label: string;
 unit?: string;
 type: 'number' | 'select' | 'radio';
 required?: boolean;
 placeholder?: string;
 options?: CalculatorFieldOption[];
 defaultValue?: string;
 helpText?: string;
 showControls?: boolean;
 step?: number;
 dependsOn?: string; // For conditional rendering
}

export interface CalculatorConfig {
 id: string;
 title: string;
 description: string;
 category: string;
 icon: React.FC<React.SVGProps<SVGSVGElement>>;
 fields: CalculatorField[];
 advancedFields?: CalculatorField[];
 formula: string;
 assumptions: string[];
 calculationFn: (data: Record<string, string>) => any;
 seo: {
 title: string;
 content: string;
 };
}

const num = (val: string) => parseFloat(String(val)?.replace(',', '.') || '0');

export const calculatorConfigs: Record<string, CalculatorConfig> = {
 'floor-tiles': {
 id: 'floor-tiles',
 title: 'Pisos e Azulejos',
 description: 'Calcule caixas e peças para sua área.',
 category: 'Revestimentos',
 icon: FloorTilesPremiumIcon,
 fields: [
 { id: 'areaMode', label: 'Como você quer informar a área?', type: 'radio', options: [{ value: 'dimensions', label: 'Sei as medidas do ambiente' }, { value: 'area', label: 'Já sei a área total' }], defaultValue: 'dimensions' },
 { id: 'length', label: 'Comprimento do ambiente', unit: 'm', type: 'number', required: true, placeholder: 'ex: 5,50', dependsOn: 'dimensions' },
 { id: 'width', label: 'Largura do ambiente', unit: 'm', type: 'number', required: true, placeholder: 'ex: 4,20', dependsOn: 'dimensions' },
 { id: 'totalArea', label: 'Área total', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 23,10', dependsOn: 'area' },
 { id: 'tileSize', label: 'Tamanho da peça', type: 'select', required: true, options: [
 { value: '45x45', label: '45cm x 45cm' }, { value: '60x60', label: '60cm x 60cm' }, { value: '80x80', label: '80cm x 80cm' }, { value: '90x90', label: '90cm x 90cm' }, { value: '120x120', label: '120cm x 120cm' }, { value: 'custom-size', label: 'Tamanho personalizado' }, { value: 'custom', label: 'Outro (informar m² por caixa)' }
 ], defaultValue: '60x60' },
 { id: 'customTileWidth', label: 'Largura da peça personalizada', unit: 'cm', type: 'number', required: true, placeholder: 'ex: 120', helpText: 'Largura da peça em centímetros', showControls: true, step: 1, dependsOn: 'custom-size' },
 { id: 'customTileHeight', label: 'Altura da peça personalizada', unit: 'cm', type: 'number', required: true, placeholder: 'ex: 120', helpText: 'Altura da peça em centímetros', showControls: true, step: 1, dependsOn: 'custom-size' },
 ],
 advancedFields: [
 { id: 'waste', label: 'Porcentagem de perda', unit: '%', type: 'number', defaultValue: '10', helpText: 'Padrão de 10% para recortes. Aumente para 15% em layouts diagonais.', showControls: true, step: 1 },
 { id: 'boxArea', label: 'Área coberta por caixa (opcional)', unit: 'm²', type: 'number', placeholder: 'ex: 2,50', helpText: 'Informe se souber a área exata da embalagem. Se não preencher, usaremos 2,2 m² (padrão do mercado).', showControls: true, step: 0.1 }
 ],
 formula: 'Área Total = (Comprimento × Largura) × (1 + Perda / 100)\nNº de Caixas = ArredondarParaCima(Área Total / Área por Caixa)',
 assumptions: ['Perda padrão de 10% para recortes.', 'Resultado de caixas sempre arredondado para cima.', 'Não inclui cálculo de rejunte ou rodapé.'],
 calculationFn: (data) => {
 const area = data.areaMode === 'dimensions' ? num(data.length) * num(data.width) : num(data.totalArea);
 const waste = num(data.waste) || 10;
 const totalAreaWithWaste = area * (1 + waste / 100);

 let boxArea = num(data.boxArea);

 // Se não foi informada a área por caixa, tentar calcular pelo tamanho da peça
 if (boxArea === 0 && data.tileSize && data.tileSize !== 'custom') {
 try {
 let tileW, tileH;

 if (data.tileSize === 'custom-size') {
 // Usar dimensões personalizadas
 tileW = num(data.customTileWidth) / 100; // converter cm para m
 tileH = num(data.customTileHeight) / 100; // converter cm para m
 } else {
 // Usar dimensões padrão
 [tileW, tileH] = data.tileSize.split('x').map(d => num(d) / 100);
 }

 const tileArea = tileW * tileH;
 // Approximation: standard boxes cover around 2 to 2.5 m²
 const piecesPerBox = Math.floor(2.2 / tileArea);
 boxArea = piecesPerBox * tileArea;
 } catch (error) {
 // Se houver erro no parsing, usar valor padrão
 boxArea = 2.2;
 }
 }

 // Fallback: se ainda não temos boxArea, usar valor padrão de 2.2 m² por caixa
 if (boxArea === 0 || isNaN(boxArea)) {
 boxArea = 2.2; // Valor padrão baseado no mercado brasileiro
 }

 const boxes = Math.ceil(totalAreaWithWaste / boxArea);
 const sparePieces = Math.ceil((totalAreaWithWaste - area) / (boxArea / boxes));

 // Validações para evitar NaN
 const safeArea = isNaN(area) ? 0 : area;
 const safeTotalArea = isNaN(totalAreaWithWaste) ? 0 : totalAreaWithWaste;
 const safeBoxArea = isNaN(boxArea) ? 2.2 : boxArea;
 const safeBoxes = isNaN(boxes) ? 0 : boxes;
 const safeSparePieces = isNaN(sparePieces) ? 0 : sparePieces;

 return {
 summary: `Você precisará de ${safeBoxes} ${safeBoxes > 1 ? 'caixas' : 'caixa'}.`,
 details: [
 { label: 'Área do ambiente', value: `${safeArea.toFixed(2)} m²` },
 { label: `Área com perda (${waste}%)`, value: `${safeTotalArea.toFixed(2)} m²` },
 { label: 'Área por caixa (aprox.)', value: `${safeBoxArea.toFixed(2)} m²` },
 { label: 'Total de caixas', value: `${safeBoxes}`, highlight: true },
 { label: 'Peças sobressalentes', value: `~${Math.round(safeSparePieces)} peças`, highlight: false },
 ]
 };
 },
 seo: {
 title: 'Dicas para Comprar Pisos e Azulejos',
 content: `<p>O cálculo de pisos deve sempre considerar uma margem de segurança. Nossa calculadora sugere 10%, mas para ambientes com muitos recortes (diagonais, colunas), considere aumentar para 15-20%.</p><p>Sempre compre caixas do mesmo lote para evitar diferenças de tonalidade.</p>`
 }
 },
 'roof-pitch': {
 id: 'roof-pitch',
 title: 'Inclinação de Telhado',
 description: 'Calcule a inclinação ideal para seu telhado conforme o tipo de telha.',
 category: 'Cobertura',
 icon: RoofTilesPremiumIcon,
 fields: [
 { id: 'run', label: 'Avanço horizontal (meio vão)', unit: 'm', type: 'number', required: true, placeholder: 'ex: 4,50', helpText: 'Meça da parede até onde seria o centro do telhado.', showControls: true, step: 0.1 },
 { id: 'rise', label: 'Altura da cumeeira', unit: 'm', type: 'number', required: true, placeholder: 'ex: 1,20', helpText: 'Altura do ponto mais alto em relação à base.', showControls: true, step: 0.1 },
 { id: 'tileType', label: 'Tipo de telha', type: 'select', required: true, options: [
 { value: 'ceramic', label: 'Cerâmica/Barro (mín. 30%)' },
 { value: 'fiber', label: 'Fibrocimento (mín. 10%)' },
 { value: 'metal', label: 'Metálica (mín. 5%)' },
 { value: 'concrete', label: 'Concreto (mín. 30%)' },
 { value: 'shingle', label: 'Shingle (mín. 17%)' }
 ], defaultValue: 'ceramic', helpText: 'Cada material tem inclinação mínima diferente.' },
 ],
 advancedFields: [
 { id: 'roofLength', label: 'Comprimento do telhado (opcional)', unit: 'm', type: 'number', placeholder: 'ex: 8,00', helpText: 'Para calcular área total do telhado.', showControls: true, step: 0.5 },
 { id: 'waste', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: 'Margem extra para cortes e reposição.', showControls: true, step: 1 }
 ],
 formula: 'Inclinação (%) = (Altura / Avanço) × 100\nInclinação (°) = arctan(Altura / Avanço) × (180/π)\nComprimento empena = √(Avanço² + Altura²)\nÁrea total = (Avanço × Comprimento × 2) × (1 + Perdas%/100)',
 assumptions: [
 'Cálculo baseado em telhado de duas águas simétrico',
 'Inclinações mínimas conforme normas técnicas brasileiras',
 'Área calculada considera ambas as águas do telhado',
 'Consulte sempre o manual do fabricante da telha'
 ],
 calculationFn: (data) => {
 const run = num(data.run);
 const rise = num(data.rise);
 const roofLength = num(data.roofLength) || 0;
 const waste = num(data.waste) || 10;

 // Validações rigorosas
 if (run < 0.5) throw new Error('Avanço muito pequeno. Mínimo: 50cm');
 if (run > 50) throw new Error('Avanço muito grande. Máximo: 50m');
 if (rise < 0.1) throw new Error('Altura muito baixa. Mínimo: 10cm');
 if (rise > 10) throw new Error('Altura muito alta. Máximo: 10m');
 if (rise > run * 2) throw new Error('Altura desproporcional ao avanço');

 // Cálculos principais
 const slopePercent = (rise / run) * 100;
 const slopeDegrees = Math.atan(rise / run) * (180 / Math.PI);
 const rafterLength = Math.sqrt(run * run + rise * rise);

 // Inclinações mínimas por tipo de telha
 const minSlopes = {
 ceramic: 30, // Cerâmica/barro
 fiber: 10, // Fibrocimento
 metal: 5, // Metálica
 concrete: 30, // Concreto
 shingle: 17 // Shingle
 };

 const minRequired = minSlopes[data.tileType as keyof typeof minSlopes] || 30;

 // Sistema de conformidade
 let status = '';
 let statusColor = '';
 let statusIcon = '';

 if (slopePercent < 5) {
 status = 'Inclinação crítica - risco de infiltração severa';
 statusColor = 'text-red-600';
 statusIcon = '❌';
 } else if (slopePercent < minRequired) {
 status = `Inclinação abaixo do recomendado para ${data.tileType} - risco de infiltração`;
 statusColor = 'text-red-600';
 statusIcon = '❌';
 } else if (slopePercent < minRequired + 5) {
 status = `Inclinação no limite mínimo - atenção especial na instalação`;
 statusColor = 'text-yellow-600';
 statusIcon = '⚠️';
 } else {
 status = `Inclinação adequada para telha ${data.tileType}`;
 statusColor = 'text-green-600';
 statusIcon = '✅';
 }

 // Cálculo de área (se comprimento informado)
 let areaDetails = [];
 if (roofLength > 0) {
 const baseArea = run * roofLength * 2; // Duas águas
 const totalArea = baseArea * (1 + waste / 100);
 areaDetails = [
 { label: 'Área base (duas águas)', value: `${baseArea.toFixed(2)} m²` },
 { label: 'Área total (com perdas)', value: `${totalArea.toFixed(2)} m²`, highlight: true }
 ];
 }

 return {
 summary: `${statusIcon} Inclinação: ${slopePercent.toFixed(1)}% (${slopeDegrees.toFixed(1)}°) - ${status}`,
 details: [
 { label: 'Inclinação em porcentagem', value: `${slopePercent.toFixed(2)}%`, highlight: true },
 { label: 'Inclinação em graus', value: `${slopeDegrees.toFixed(2)}°`, highlight: true },
 { label: 'Comprimento da empena', value: `${rafterLength.toFixed(2)} m` },
 { label: `Mínimo para ${data.tileType}`, value: `${minRequired}%` },
 { label: 'Status de conformidade', value: status, highlight: true, color: statusColor },
 ...areaDetails
 ]
 };
 },
 seo: {
 title: 'Calculadora de Inclinação de Telhado - Normas Técnicas Brasileiras',
 content: `
 <h2>Como Calcular a Inclinação Ideal do Telhado</h2>
 <p>A inclinação correta do telhado é fundamental para garantir o escoamento adequado da água da chuva e evitar infiltrações. Nossa calculadora segue as normas técnicas brasileiras e considera as especificações de cada tipo de telha.</p>

 <h3>Inclinações Mínimas por Tipo de Telha</h3>
 <ul>
 <li><strong>Telha Cerâmica/Barro:</strong> Mínimo 30% (16,7°) - Material tradicional que requer maior inclinação</li>
 <li><strong>Telha de Fibrocimento:</strong> Mínimo 10% (5,7°) - Versátil para diferentes projetos</li>
 <li><strong>Telha Metálica:</strong> Mínimo 5% (2,9°) - Ideal para grandes vãos</li>
 <li><strong>Telha de Concreto:</strong> Mínimo 30% (16,7°) - Resistente e durável</li>
 <li><strong>Telha Shingle:</strong> Mínimo 17% (9,6°) - Estética moderna</li>
 </ul>

 <h3>Fórmulas de Cálculo</h3>
 <p>Nossa calculadora utiliza as seguintes fórmulas matemáticas precisas:</p>
 <ul>
 <li><strong>Inclinação em %:</strong> (Altura ÷ Avanço) × 100</li>
 <li><strong>Inclinação em graus:</strong> arctan(Altura ÷ Avanço) × (180/π)</li>
 <li><strong>Comprimento da empena:</strong> √(Avanço² + Altura²)</li>
 </ul>

 <h3>Importância da Inclinação Adequada</h3>
 <p>Uma inclinação inadequada pode causar:</p>
 <ul>
 <li>Infiltrações e goteiras</li>
 <li>Acúmulo de água e detritos</li>
 <li>Sobrecarga na estrutura</li>
 <li>Redução da vida útil do telhado</li>
 <li>Problemas de garantia do fabricante</li>
 </ul>

 <p>Use nossa calculadora para garantir que seu telhado tenha a inclinação correta e evite problemas futuros.</p>
 `
 }
 },
 'wallpaper': {
 id: 'wallpaper',
 title: 'Papel de Parede',
 description: 'Calcule rolos, cola e custos com precisão técnica.',
 category: 'Acabamento',
 icon: WallpaperPremiumIcon,
 fields: [
 { id: 'wallHeight', label: 'Altura da parede (pé-direito)', unit: 'm', type: 'number', required: true, placeholder: 'ex: 2,70', helpText: 'Meça do chão ao teto, sem considerar rodapés.', showControls: true, step: 0.05 },
 { id: 'wallPerimeter', label: 'Perímetro total das paredes', unit: 'm', type: 'number', required: true, placeholder: 'ex: 18,50', helpText: 'Some todas as paredes que receberão papel. Ex: 4m + 3m + 4m + 3m = 14m', showControls: true, step: 0.1 },
 { id: 'doors', label: 'Quantidade de portas', type: 'number', required: true, defaultValue: '2', helpText: 'Conte apenas portas na área que receberá papel.', showControls: true, step: 1 },
 { id: 'windows', label: 'Quantidade de janelas', type: 'number', required: true, defaultValue: '3', helpText: 'Inclua janelas, vitrôs e outras aberturas.', showControls: true, step: 1 }
 ],
 advancedFields: [
 { id: 'paperWidth', label: 'Largura do rolo', unit: 'm', type: 'number', defaultValue: '0.52', helpText: 'Largura padrão brasileira é 0,52m (52cm).', showControls: true, step: 0.01 },
 { id: 'paperLength', label: 'Comprimento do rolo', unit: 'm', type: 'number', defaultValue: '10.0', helpText: 'Comprimento padrão é 10m.', showControls: true, step: 0.5 },
 { id: 'rapport', label: 'Rapport do desenho', unit: 'cm', type: 'number', defaultValue: '0', helpText: 'Distância de repetição do padrão - consulte a embalagem. Se não souber, deixe em 0.', showControls: true, step: 1 },
 { id: 'waste', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: '10% padrão para recortes e alinhamento. Aumente para 15% com rapport complexo.', showControls: true, step: 1 },
 { id: 'doorWidth', label: 'Largura média das portas', unit: 'm', type: 'number', defaultValue: '0.80', helpText: 'Largura padrão de porta residencial.', showControls: true, step: 0.05 },
 { id: 'doorHeight', label: 'Altura média das portas', unit: 'm', type: 'number', defaultValue: '2.10', helpText: 'Altura padrão de porta residencial.', showControls: true, step: 0.05 },
 { id: 'windowWidth', label: 'Largura média das janelas', unit: 'm', type: 'number', defaultValue: '1.20', helpText: 'Largura média de janela residencial.', showControls: true, step: 0.05 },
 { id: 'windowHeight', label: 'Altura média das janelas', unit: 'm', type: 'number', defaultValue: '1.00', helpText: 'Altura média de janela residencial.', showControls: true, step: 0.05 }
 ],
 formula: 'Área Total = Perímetro × Altura\nÁrea Deduções = (Portas × Larg × Alt) + (Janelas × Larg × Alt)\nÁrea Líquida = Área Total - Área Deduções\nAjuste Rapport = Área Líquida × (1 + Rapport/Altura)\nÁrea Final = Área Ajustada × (1 + Perdas%)\nRolos = ⌈Área Final ÷ (Largura × Comprimento)⌉',
 assumptions: [
 'Padrão brasileiro: rolo de 0,52m × 10m = 5,2 m²',
 'Rapport é a distância entre repetições do desenho',
 'Margem de 10% é recomendada para recortes e alinhamento',
 'Papéis com rapport complexo podem precisar de 15-20% de margem',
 'Cola: aproximadamente 200g por m² de área líquida',
 'Medidas personalizáveis para portas e janelas'
 ],
 calculationFn: (data) => {
 const height = num(data.wallHeight);
 const perimeter = num(data.wallPerimeter);
 const doors = num(data.doors) || 0;
 const windows = num(data.windows) || 0;
 const paperWidth = num(data.paperWidth) || 0.52;
 const paperLength = num(data.paperLength) || 10.0;
 const rapport = num(data.rapport) || 0;
 const waste = (num(data.waste) || 10) / 100;

 // Dimensões personalizadas das aberturas
 const doorWidth = num(data.doorWidth) || 0.80;
 const doorHeight = num(data.doorHeight) || 2.10;
 const windowWidth = num(data.windowWidth) || 1.20;
 const windowHeight = num(data.windowHeight) || 1.00;

 // Validações rigorosas
 if (height < 2.0) throw new Error('Altura muito baixa. Mínimo: 2,0m');
 if (height > 6.0) throw new Error('Altura muito alta. Máximo: 6,0m');
 if (perimeter < 5.0) throw new Error('Perímetro muito pequeno. Mínimo: 5,0m');
 if (perimeter > 200.0) throw new Error('Perímetro muito grande. Máximo: 200m');
 if (paperWidth < 0.30) throw new Error('Largura do papel muito pequena. Mínimo: 30cm');
 if (paperWidth > 1.50) throw new Error('Largura do papel muito grande. Máximo: 1,50m');
 if (paperLength < 5.0) throw new Error('Comprimento do rolo muito pequeno. Mínimo: 5m');
 if (paperLength > 25.0) throw new Error('Comprimento do rolo muito grande. Máximo: 25m');
 if (rapport > 100) throw new Error('Rapport muito alto. Máximo: 100cm');

 // Cálculos de área
 const totalArea = height * perimeter;
 const doorArea = doors * doorWidth * doorHeight;
 const windowArea = windows * windowWidth * windowHeight;
 const deductionArea = doorArea + windowArea;
 const netArea = Math.max(0, totalArea - deductionArea);

 // Validação de área de deduções
 if (deductionArea > totalArea * 0.8) {
 throw new Error('Área de deduções muito grande (>80% da área total)');
 }

 // Ajuste por rapport (se aplicável)
 let adjustedArea = netArea;
 let rapportFactor = 1;
 if (rapport > 0) {
 rapportFactor = 1 + (rapport / (height * 100));
 adjustedArea = netArea * rapportFactor;
 }

 // Área final com perdas
 const finalArea = adjustedArea * (1 + waste);

 // Área por rolo
 const areaPerRoll = paperWidth * paperLength;

 // Número de rolos
 const rollsNeeded = Math.ceil(finalArea / areaPerRoll);

 // Cola necessária (200g por m²)
 const glueKg = Math.ceil((netArea * 0.2) * 10) / 10;

 // Verificações e alertas
 let alerts = [];
 let alertLevel = 'success'; // success, warning, error

 // Alerta crítico: altura > comprimento do rolo
 if (height > paperLength) {
 alerts.push('⚠️ Altura maior que o rolo: serão necessárias emendas horizontais');
 alertLevel = 'error';
 }

 // Alerta rapport alto
 if (rapport > 30) {
 alerts.push('📏 Rapport alto detectado: considere aumentar a margem para 15%');
 if (alertLevel !== 'error') alertLevel = 'warning';
 }

 // Configuração ideal
 if (height <= paperLength && rapport <= 30) {
 alerts.push('✅ Configuração ideal: sem necessidade de emendas');
 }

 // Custo estimado
 const rollPrice = 45; // R$ 45 por rolo
 const gluePrice = 25; // R$ 25 por kg
 const totalCost = (rollsNeeded * rollPrice) + (glueKg * gluePrice);

 // Status summary com alertas
 let summary = `Você precisará de ${rollsNeeded} rolos de papel de parede e ${glueKg}kg de cola.`;
 if (alerts.length > 0) {
 summary += ` ${alerts[0]}`;
 }

 return {
 summary,
 details: [
 { label: 'Área total das paredes', value: `${totalArea.toFixed(2)} m²` },
 { label: 'Área de deduções', value: `${deductionArea.toFixed(2)} m²` },
 { label: 'Área líquida', value: `${netArea.toFixed(2)} m²` },
 ...(rapport > 0 ? [{ label: 'Ajuste por rapport', value: `+${((rapportFactor - 1) * 100).toFixed(1)}%` }] : []),
 { label: 'Área com perdas', value: `${finalArea.toFixed(2)} m²` },
 { label: 'Rolos necessários', value: `${rollsNeeded} rolos`, highlight: true },
 { label: 'Área por rolo', value: `${areaPerRoll.toFixed(2)} m²` },
 { label: 'Cola recomendada', value: `${glueKg}kg`, highlight: true },
 { label: 'Emendas necessárias', value: height > paperLength ? 'Sim' : 'Não' },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Margem de perdas', value: `${(waste * 100).toFixed(0)}%` },
 ...(alerts.length > 1 ? alerts.slice(1).map(alert => ({ label: 'Observação', value: alert })) : [])
 ],
 alertLevel,
 alerts
 };
 },
 seo: {
 title: 'Calculadora de Papel de Parede - Cálculo Técnico Preciso',
 content: `
 <h2>Como Calcular Papel de Parede com Precisão Técnica</h2>
 <p>Nossa calculadora profissional considera todos os aspectos técnicos para um cálculo preciso: rapport, dimensões personalizadas de aberturas, margem de perdas ajustável e alertas técnicos.</p>

 <h3>Fatores Técnicos Considerados</h3>
 <ul>
 <li><strong>Rapport do Desenho:</strong> Distância de repetição do padrão que afeta o consumo</li>
 <li><strong>Dimensões Reais:</strong> Medidas personalizáveis para portas e janelas</li>
 <li><strong>Margem de Perdas:</strong> 10% padrão, ajustável conforme complexidade</li>
 <li><strong>Emendas Horizontais:</strong> Alerta quando altura excede comprimento do rolo</li>
 </ul>

 <h3>Padrões da Indústria</h3>
 <ul>
 <li><strong>Largura Padrão:</strong> 0,52m (52cm) no mercado brasileiro</li>
 <li><strong>Comprimento Padrão:</strong> 10m por rolo = 5,2 m² de cobertura</li>
 <li><strong>Cola Necessária:</strong> Aproximadamente 200g por m² de área líquida</li>
 <li><strong>Rapport Típico:</strong> 0 a 64cm, sendo 32cm o mais comum</li>
 </ul>

 <h3>Dicas Profissionais</h3>
 <ul>
 <li>Sempre compre rolos do mesmo lote para evitar diferenças de cor</li>
 <li>Para rapport > 30cm, considere aumentar a margem para 15%</li>
 <li>Meça cada parede individualmente para maior precisão</li>
 <li>Compre 1 rolo extra para reparos futuros</li>
 <li>Verifique se a altura da parede não excede o comprimento do rolo</li>
 </ul>

 <p>Use nossa calculadora para evitar desperdício e garantir cobertura completa do seu projeto de decoração.</p>
 `
 }
 },
 'mortar': {
 id: 'mortar',
 title: 'Argamassa',
 description: 'Calcule quantidade exata considerando tipo de aplicação e espessura.',
 category: 'Revestimentos',
 icon: MortarPremiumIcon,
 fields: [
 { id: 'area', label: 'Área total a ser aplicada', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 25,50', helpText: 'Some todas as áreas que receberão argamassa.', showControls: true, step: 0.1 },
 { id: 'thickness', label: 'Espessura da aplicação', unit: 'mm', type: 'number', required: true, placeholder: 'ex: 15', helpText: 'Espessura padrão: chapisco 5mm, reboco 15mm, contrapiso 20mm.', showControls: true, step: 1 },
 { id: 'applicationType', label: 'Tipo de aplicação', type: 'select', required: true, options: [
 { value: 'chapisco', label: 'Chapisco (camada de aderência)' },
 { value: 'reboco', label: 'Reboco/Emboço (acabamento de parede)' },
 { value: 'contrapiso', label: 'Contrapiso (nivelamento de piso)' },
 { value: 'assentamento_piso', label: 'Assentamento de pisos' },
 { value: 'assentamento_azulejo', label: 'Assentamento de azulejos' }
 ], defaultValue: 'reboco', helpText: 'Cada aplicação tem consumo específico por espessura.' }
 ],
 advancedFields: [
 { id: 'bagWeight', label: 'Peso da embalagem', type: 'select', options: [
 { value: '20', label: '20kg (padrão)' },
 { value: '25', label: '25kg (médio)' },
 { value: '40', label: '40kg (saco grande)' }
 ], defaultValue: '20', helpText: 'Peso padrão da embalagem de argamassa.' },
 { id: 'waste', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: '10% padrão para desperdício e irregularidades. Aumente para 15% em superfícies muito irregulares.', showControls: true, step: 1 },
 { id: 'coats', label: 'Número de demãos', type: 'number', defaultValue: '1', helpText: 'Chapisco geralmente é aplicado em uma demão.', showControls: true, step: 1 },
 { id: 'surface', label: 'Tipo de superfície', type: 'select', options: [
 { value: 'smooth', label: 'Lisa (bloco de concreto)' },
 { value: 'medium', label: 'Média (tijolo comum)' },
 { value: 'rough', label: 'Rugosa (tijolo baiano)' }
 ], defaultValue: 'medium', helpText: 'Superfícies rugosas consomem mais argamassa.' }
 ],
 formula: 'Consumo/m² = Fator × Espessura × Demãos\nKg Total = Área × Consumo/m² × (1 + Perdas%)\nSacos = ⌈Kg Total ÷ Peso do Saco⌉\nRendimento = Área ÷ Sacos',
 assumptions: [
 'Fatores de consumo por tipo: Chapisco 3,0 kg/m²/cm, Reboco 1,2 kg/m²/mm',
 'Contrapiso 2,0 kg/m²/cm, Assentamento piso 1,5 kg/m²/mm, Azulejo 1,0 kg/m²/mm',
 'Considera tipo de superfície e número de demãos',
 'Margem de 10% padrão para desperdício e irregularidades',
 'Embalagens disponíveis: 20kg, 25kg e 40kg',
 'Valores baseados em normas técnicas e fabricantes nacionais'
 ],
 calculationFn: (data) => {
 const area = num(data.area);
 const thickness = num(data.thickness);
 const bagWeight = num(data.bagWeight) || 20;
 const waste = (num(data.waste) || 10) / 100;
 const coats = num(data.coats) || 1;

 // Validações rigorosas
 if (area < 1.0) throw new Error('Área muito pequena. Mínimo: 1,0m²');
 if (area > 10000) throw new Error('Área muito grande. Máximo: 10.000m²');
 if (thickness < 3) throw new Error('Espessura muito fina. Mínimo: 3mm');
 if (thickness > 50) throw new Error('Espessura muito grossa. Máximo: 50mm');
 if (coats < 1 || coats > 3) throw new Error('Número de demãos deve ser entre 1 e 3');

 // Fatores de consumo por tipo de aplicação (kg/m²/mm ou kg/m²/cm)
 const consumptionFactors = {
 chapisco: 3.0,        // kg/m²/cm (mais espesso)
 reboco: 1.2,          // kg/m²/mm
 contrapiso: 2.0,      // kg/m²/cm (mais denso)
 assentamento_piso: 1.5, // kg/m²/mm
 assentamento_azulejo: 1.0 // kg/m²/mm
 };

 const factor = consumptionFactors[data.applicationType] || consumptionFactors.reboco;

 // Cálculo do consumo por m²
 let consumptionPerM2;
 if (data.applicationType === 'chapisco' || data.applicationType === 'contrapiso') {
 // Para chapisco e contrapiso, usar cm
 consumptionPerM2 = factor * (thickness / 10); // converter mm para cm
 } else {
 // Para outros tipos, usar mm diretamente
 consumptionPerM2 = factor * thickness;
 }

 // Aplicar número de demãos
 consumptionPerM2 = consumptionPerM2 * coats;

 // Fator de correção por tipo de superfície
 const surfaceMultiplier = {
 smooth: 1.0,
 medium: 1.1,
 rough: 1.2
 }[data.surface] || 1.1;

 // Consumo total em kg
 const totalKg = area * consumptionPerM2 * surfaceMultiplier * (1 + waste);

 // Número de sacos necessários
 const bagsNeeded = Math.ceil(totalKg / bagWeight);

 // Rendimento por saco
 const yieldPerBag = (area * surfaceMultiplier) / bagsNeeded;

 // Alertas e recomendações
 let alerts = [];
 let alertLevel = 'success';

 // Alerta para espessura alta
 if (thickness > 30) {
 alerts.push('⚠️ Espessura alta: considere aplicação em duas camadas');
 alertLevel = 'warning';
 }

 // Alerta para espessura crítica
 if (thickness > 40) {
 alerts.push('🔴 Espessura crítica: risco estrutural - consulte um profissional');
 alertLevel = 'error';
 }

 // Alerta para área grande
 if (area > 1000) {
 alerts.push('📦 Área grande: considere compra fracionada');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Recomendação para contrapiso
 if (data.applicationType === 'contrapiso' && thickness < 15) {
 alerts.push('📏 Para contrapiso, espessura mínima recomendada: 15mm');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Configuração ideal
 if (thickness <= 30 && area <= 1000) {
 alerts.push('✅ Espessura adequada para o tipo de aplicação');
 }

 // Custo estimado
 const bagPrice = bagWeight === 20 ? 12 : bagWeight === 25 ? 15 : 24; // Preços por peso
 const totalCost = bagsNeeded * bagPrice;

 // Dicas por tipo de aplicação
 const tips = {
 chapisco: 'Chapisco: camada de aderência (3-8mm). Aplique com broxa ou rolo.',
 reboco: 'Reboco/Emboço: acabamento de parede (10-20mm). Aplique em camadas uniformes.',
 contrapiso: 'Contrapiso: nivelamento de piso (15-30mm). Use régua para nivelamento.',
 assentamento_piso: 'Assentamento: fixação de pisos (3-10mm). Use desempenadeira dentada.',
 assentamento_azulejo: 'Assentamento: fixação de azulejos (3-8mm). Aplique uniformemente.'
 };

 const tip = tips[data.applicationType] || tips.reboco;

 // Summary com alertas
 let summary = `Você precisará de ${bagsNeeded} sacos de argamassa de ${bagWeight}kg.`;
 if (alerts.length > 0 && alertLevel !== 'success') {
 summary += ` ${alerts[0]}`;
 }

 return {
 summary,
 details: [
 { label: 'Área total', value: `${area.toFixed(2)} m²` },
 { label: 'Espessura aplicada', value: `${thickness}mm` },
 { label: 'Número de demãos', value: `${coats}x` },
 { label: 'Consumo por m²', value: `${consumptionPerM2.toFixed(2)} kg/m²` },
 { label: 'Consumo total', value: `${totalKg.toFixed(0)} kg`, highlight: true },
 { label: `Sacos necessários (${bagWeight}kg)`, value: `${bagsNeeded} sacos`, highlight: true },
 { label: 'Rendimento por saco', value: `${yieldPerBag.toFixed(2)} m²` },
 { label: 'Perda aplicada', value: `${(totalKg * waste / (1 + waste)).toFixed(0)} kg (${(waste * 100).toFixed(0)}%)` },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Tipo de aplicação', value: data.applicationType.replace('_', ' ') },
 { label: 'Dica técnica', value: tip },
 ...(alerts.length > 1 ? alerts.slice(1).map(alert => ({ label: 'Observação', value: alert })) : [])
 ],
 alertLevel,
 alerts
 };
 },
 seo: {
 title: 'Calculadora de Argamassa - Cálculo Técnico Preciso por Tipo de Aplicação',
 content: `
 <h2>Como Calcular Argamassa com Precisão Técnica</h2>
 <p>Nossa calculadora profissional considera fatores técnicos específicos para cada tipo de aplicação: chapisco, reboco, contrapiso e assentamento. Cálculos baseados em normas técnicas e padrões da indústria.</p>

 <h3>Fatores de Consumo por Aplicação</h3>
 <ul>
 <li><strong>Chapisco:</strong> 3,0 kg/m²/cm - Camada de aderência (3-8mm)</li>
 <li><strong>Reboco/Emboço:</strong> 1,2 kg/m²/mm - Acabamento de parede (10-20mm)</li>
 <li><strong>Contrapiso:</strong> 2,0 kg/m²/cm - Nivelamento de piso (15-30mm)</li>
 <li><strong>Assentamento de Pisos:</strong> 1,5 kg/m²/mm - Fixação (3-10mm)</li>
 <li><strong>Assentamento de Azulejos:</strong> 1,0 kg/m²/mm - Fixação (3-8mm)</li>
 </ul>

 <h3>Espessuras Recomendadas</h3>
 <ul>
 <li><strong>Chapisco:</strong> 3-8mm (camada de aderência)</li>
 <li><strong>Reboco padrão:</strong> 10-20mm (acabamento)</li>
 <li><strong>Contrapiso:</strong> 15-30mm (nivelamento)</li>
 <li><strong>Assentamento:</strong> 3-10mm (fixação)</li>
 </ul>

 <h3>Tipos de Superfície</h3>
 <ul>
 <li><strong>Lisa (bloco de concreto):</strong> Fator 1,0 - menor consumo</li>
 <li><strong>Média (tijolo comum):</strong> Fator 1,1 - consumo padrão</li>
 <li><strong>Rugosa (tijolo baiano):</strong> Fator 1,2 - maior consumo</li>
 </ul>

 <h3>Dicas Técnicas</h3>
 <ul>
 <li>Para espessuras > 30mm, aplique em duas camadas</li>
 <li>Superfícies irregulares: aumente margem para 15%</li>
 <li>Contrapiso: espessura mínima 15mm</li>
 <li>Prepare bem a superfície para melhor aderência</li>
 <li>Mantenha a argamassa úmida durante aplicação</li>
 </ul>

 <p>Use nossa calculadora para evitar desperdício e garantir qualidade técnica em sua obra.</p>
 `
 }
 },
 'concrete': {
 id: 'concrete',
 title: 'Concreto',
 description: 'Calcule traços precisos considerando resistência e tipo de preparo.',
 category: 'Estrutura',
 icon: ConcretePremiumIcon,
 fields: [
 { id: 'volume', label: 'Volume de concreto necessário', unit: 'm³', type: 'number', required: true, placeholder: 'ex: 2,50', helpText: 'Para lajes: comprimento × largura × espessura. Para pilares: seção × altura.', showControls: true, step: 0.05 },
 { id: 'strength', label: 'Resistência do concreto (FCK)', type: 'select', required: true, options: [
 { value: 'fck15', label: 'FCK 15 MPa (uso residencial leve)' },
 { value: 'fck20', label: 'FCK 20 MPa (uso residencial padrão)' },
 { value: 'fck25', label: 'FCK 25 MPa (uso estrutural)' },
 { value: 'fck30', label: 'FCK 30 MPa (uso estrutural pesado)' }
 ], defaultValue: 'fck20', helpText: 'FCK = resistência do concreto. Quanto maior, mais forte e durável.' },
 { id: 'mixType', label: 'Método de preparo', type: 'select', required: true, options: [
 { value: 'manual', label: 'Manual (pá e enxada)' },
 { value: 'betoneira_pequena', label: 'Betoneira pequena (120-150L)' },
 { value: 'betoneira_media', label: 'Betoneira média (300-400L)' },
 { value: 'betoneira_grande', label: 'Betoneira grande (500L+)' }
 ], defaultValue: 'betoneira_media', helpText: 'Método de preparo afeta o traço e rendimento.' }
 ],
 advancedFields: [
 { id: 'cementBagWeight', label: 'Peso da embalagem de cimento', type: 'select', options: [
 { value: '40', label: '40kg' },
 { value: '50', label: '50kg (padrão)' }
 ], defaultValue: '50', helpText: 'Peso padrão da embalagem de cimento.' },
 { id: 'waste', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: '10% padrão para desperdício. Aumente para 15% em concretagens complexas.', showControls: true, step: 1 },
 { id: 'aggregateType', label: 'Tipo de brita', type: 'select', options: [
 { value: 'brita0', label: 'Brita 0 (4,8-9,5mm)' },
 { value: 'brita1', label: 'Brita 1 (9,5-19mm)' },
 { value: 'brita2', label: 'Brita 2 (19-25mm)' },
 { value: 'brita_mista', label: 'Brita mista' }
 ], defaultValue: 'brita1', helpText: 'Brita 1 é padrão para uso residencial.' }
 ],
 formula: 'Consumo Cimento = Volume × Fator FCK (kg/m³)\nTraço = Proporções por Método de Preparo\nKg Cimento = Volume × (1 + Perdas%) × Consumo\nSacos = ⌈Kg Cimento ÷ Peso Saco⌉\nAreia/Brita = Volume × Proporção do Traço',
 assumptions: [
 'Consumos de cimento: FCK15=280kg/m³, FCK20=320kg/m³, FCK25=360kg/m³, FCK30=400kg/m³',
 'Traços otimizados por método: Manual 1:3:4, Betoneira pequena 1:2,5:3,5, Média 1:2,3:3,2, Grande 1:2,2:3,0',
 'Relação água/cimento varia de 0,50 a 0,60 conforme método',
 'Margem de 10% padrão para desperdício e irregularidades',
 'Cálculos baseados em normas ABNT NBR 6118 e NBR 12655',
 'Densidade: areia 1600kg/m³, brita 1500kg/m³'
 ],
 calculationFn: (data) => {
 const volume = num(data.volume);
 const cementBagWeight = num(data.cementBagWeight) || 50;
 const waste = (num(data.waste) || 10) / 100;

 // Validações rigorosas
 if (volume < 0.1) throw new Error('Volume muito pequeno. Mínimo: 0,1m³ (100 litros)');
 if (volume > 100) throw new Error('Volume muito grande. Máximo: 100m³');

 // Consumos de cimento por FCK (kg/m³)
 const cementConsumption = {
 fck15: 280,  // kg/m³
 fck20: 320,  // kg/m³
 fck25: 360,  // kg/m³
 fck30: 400   // kg/m³
 };

 // Traços por tipo de preparo (proporções cimento:areia:brita:água)
 const mixRatios = {
 manual: { cement: 1, sand: 3, gravel: 4, water: 0.6, name: 'Manual (pá e enxada)' },
 betoneira_pequena: { cement: 1, sand: 2.5, gravel: 3.5, water: 0.55, name: 'Betoneira pequena' },
 betoneira_media: { cement: 1, sand: 2.3, gravel: 3.2, water: 0.52, name: 'Betoneira média' },
 betoneira_grande: { cement: 1, sand: 2.2, gravel: 3.0, water: 0.50, name: 'Betoneira grande' }
 };

 const consumption = cementConsumption[data.strength] || cementConsumption.fck20;
 const ratio = mixRatios[data.mixType] || mixRatios.betoneira_media;

 // Volume com perdas
 const volumeWithWaste = volume * (1 + waste);

 // Cálculo do cimento
 const cementKg = volumeWithWaste * consumption;
 const cementBags = Math.ceil(cementKg / cementBagWeight);

 // Cálculo dos agregados baseado no traço
 const cementVolume = cementKg / 1400; // densidade do cimento ≈ 1400 kg/m³
 const sandM3 = cementVolume * ratio.sand;
 const gravelM3 = cementVolume * ratio.gravel;
 const waterLiters = cementKg * ratio.water;

 // Conversões úteis
 const sandCarrinhos = Math.ceil(sandM3 / 0.06); // 1 carrinho ≈ 0,06 m³
 const gravelCarrinhos = Math.ceil(gravelM3 / 0.06);

 // Peso total
 const totalWeight = cementKg + (sandM3 * 1600) + (gravelM3 * 1500) + waterLiters;

 // Alertas e recomendações
 let alerts = [];
 let alertLevel = 'success';

 // Alerta para volume grande
 if (volume > 50) {
 alerts.push('🔴 Volume grande: recomendamos concreto usinado para volumes grandes');
 alertLevel = 'error';
 } else if (volume > 20) {
 alerts.push('🟡 Volume médio: considere bombeamento ou concreto usinado');
 alertLevel = 'warning';
 } else if (volume > 5) {
 alerts.push('🟡 Volume considerável: considere bombeamento');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Alerta para FCK estrutural
 if (data.strength === 'fck25' || data.strength === 'fck30') {
 alerts.push('🏗️ FCK estrutural: consulte engenheiro para dimensionamento');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Configuração ideal
 if (volume <= 5 && (data.strength === 'fck15' || data.strength === 'fck20')) {
 alerts.push('✅ Traço adequado para o tipo de preparo selecionado');
 }

 // Custos estimados
 const costs = {
 cement: cementBags * (cementBagWeight === 50 ? 35 : 28), // R$ por saco
 sand: sandM3 * 45, // R$ 45 por m³
 gravel: gravelM3 * 55, // R$ 55 por m³
 water: waterLiters * 0.01 // R$ 0,01 por litro
 };
 const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);

 // Dicas por tipo de preparo
 const preparationTips = {
 manual: 'Manual: misture primeiro os materiais secos, depois adicione água gradualmente.',
 betoneira_pequena: 'Betoneira pequena: adicione brita e água, depois cimento e areia.',
 betoneira_media: 'Betoneira média: ordem ideal - brita, água, cimento, areia.',
 betoneira_grande: 'Betoneira grande: mistura mais eficiente, menor relação água/cimento.'
 };

 const preparationTip = preparationTips[data.mixType] || preparationTips.betoneira_media;

 // Informações sobre FCK
 const fckInfo = {
 fck15: 'FCK 15: calçadas e contrapisos',
 fck20: 'FCK 20: lajes e vigas residenciais',
 fck25: 'FCK 25: estrutural padrão',
 fck30: 'FCK 30: estrutural pesado'
 };

 // Summary com alertas
 let summary = `Para ${volume}m³ de concreto ${data.strength.toUpperCase()}, você precisará de ${cementBags} sacos de cimento de ${cementBagWeight}kg, ${sandM3.toFixed(1)}m³ de areia e ${gravelM3.toFixed(1)}m³ de brita.`;
 if (alerts.length > 0 && alertLevel !== 'success') {
 summary += ` ${alerts[0]}`;
 }

 return {
 summary,
 details: [
 { label: 'Volume com perdas', value: `${volumeWithWaste.toFixed(2)} m³` },
 { label: `Sacos de cimento (${cementBagWeight}kg)`, value: `${cementBags} sacos`, highlight: true },
 { label: 'Areia', value: `${sandM3.toFixed(2)} m³ (≈${sandCarrinhos} carrinhos)`, highlight: true },
 { label: 'Brita', value: `${gravelM3.toFixed(2)} m³ (≈${gravelCarrinhos} carrinhos)`, highlight: true },
 { label: 'Água', value: `${waterLiters.toFixed(0)} litros` },
 { label: 'Peso total', value: `${(totalWeight / 1000).toFixed(1)} toneladas` },
 { label: 'Traço utilizado', value: `1:${ratio.sand}:${ratio.gravel} (cimento:areia:brita)` },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Tipo de concreto', value: fckInfo[data.strength] },
 { label: 'Dica de preparo', value: preparationTip },
 ...(alerts.length > 1 ? alerts.slice(1).map(alert => ({ label: 'Observação', value: alert })) : [])
 ],
 alertLevel,
 alerts
 };
 },
 seo: {
 title: 'Calculadora de Concreto - Traços Técnicos Precisos por FCK e Método',
 content: `
 <h2>Como Calcular Concreto com Traços Técnicos Precisos</h2>
 <p>Nossa calculadora profissional utiliza consumos de cimento baseados em normas ABNT e traços otimizados por método de preparo. Cálculos precisos para FCK 15, 20, 25 e 30 MPa.</p>

 <h3>Consumos de Cimento por FCK</h3>
 <ul>
 <li><strong>FCK 15 MPa:</strong> 280 kg/m³ - Uso residencial leve (calçadas, contrapisos)</li>
 <li><strong>FCK 20 MPa:</strong> 320 kg/m³ - Uso residencial padrão (lajes, vigas)</li>
 <li><strong>FCK 25 MPa:</strong> 360 kg/m³ - Uso estrutural padrão</li>
 <li><strong>FCK 30 MPa:</strong> 400 kg/m³ - Uso estrutural pesado</li>
 </ul>

 <h3>Traços Otimizados por Método de Preparo</h3>
 <ul>
 <li><strong>Manual (pá e enxada):</strong> 1:3:4 - Relação água/cimento 0,60</li>
 <li><strong>Betoneira pequena (120-150L):</strong> 1:2,5:3,5 - Relação água/cimento 0,55</li>
 <li><strong>Betoneira média (300-400L):</strong> 1:2,3:3,2 - Relação água/cimento 0,52</li>
 <li><strong>Betoneira grande (500L+):</strong> 1:2,2:3,0 - Relação água/cimento 0,50</li>
 </ul>

 <h3>Conversões Úteis</h3>
 <ul>
 <li>1 m³ de concreto FCK 20 ≈ 6,4 sacos de cimento de 50kg</li>
 <li>1 carrinho de pedreiro ≈ 0,06 m³</li>
 <li>Para volumes > 5m³, considere bombeamento</li>
 <li>Para volumes > 50m³, recomende concreto usinado</li>
 </ul>

 <p>Use nossa calculadora para garantir traços precisos e economia em sua obra.</p>
 `
 }
 },
 'paint': {
 id: 'paint',
 title: 'Pintura',
 description: 'Calcule a quantidade de tinta necessária.',
 category: 'Acabamento',
 icon: PaintPremiumIcon,
 fields: [
 { id: 'wallArea', label: 'Área total das paredes', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 45,5', helpText: 'Some todas as paredes a serem pintadas', showControls: true, step: 0.5 },
 { id: 'doors', label: 'Número de portas', type: 'number', required: true, defaultValue: '2', helpText: 'Portas não serão pintadas', showControls: true, step: 1 },
 { id: 'windows', label: 'Número de janelas', type: 'number', required: true, defaultValue: '3', helpText: 'Janelas não serão pintadas', showControls: true, step: 1 },
 { id: 'coats', label: 'Número de demãos', type: 'select', required: true, options: [
 { value: '1', label: '1 demão (retoque)' },
 { value: '2', label: '2 demãos (padrão)' },
 { value: '3', label: '3 demãos (cobertura total)' }
 ], defaultValue: '2' }
 ],
 advancedFields: [
 { id: 'paintType', label: 'Tipo de tinta', type: 'select', options: [
 { value: 'acrylic', label: 'Acrílica (12-14 m²/L)' },
 { value: 'latex', label: 'Látex PVA (10-12 m²/L)' },
 { value: 'enamel', label: 'Esmalte (8-10 m²/L)' },
 { value: 'texture', label: 'Textura (6-8 m²/L)' }
 ], defaultValue: 'acrylic', helpText: 'Rendimento varia por tipo de tinta' },
 { id: 'surface', label: 'Tipo de superfície', type: 'select', options: [
 { value: 'smooth', label: 'Lisa (gesso, massa corrida)' },
 { value: 'textured', label: 'Texturizada (reboco)' },
 { value: 'rough', label: 'Rugosa (tijolo aparente)' }
 ], defaultValue: 'smooth', helpText: 'Superfícies rugosas consomem mais tinta' }
 ],
 formula: 'Área Líquida = Área Total - (Portas × 1,5m²) - (Janelas × 1m²)\nLitros = (Área Líquida × Demãos) ÷ Rendimento da Tinta',
 assumptions: [
 'Área padrão: porta = 1,5m², janela = 1m²',
 'Rendimentos baseados em superfícies preparadas',
 'Inclui margem de segurança de 10%',
 'Primer/fundo não incluído no cálculo'
 ],
 calculationFn: (data) => {
 const wallArea = num(data.wallArea);
 const doors = num(data.doors) || 0;
 const windows = num(data.windows) || 0;
 const coats = num(data.coats) || 2;

 // Área das aberturas
 const doorArea = doors * 1.5; // 1,5m² por porta
 const windowArea = windows * 1.0; // 1m² por janela

 // Área líquida a ser pintada
 const netArea = Math.max(0, wallArea - doorArea - windowArea);

 // Rendimento por tipo de tinta (m²/L)
 const paintRendement = {
 'acrylic': 13,
 'latex': 11,
 'enamel': 9,
 'texture': 7
 }[data.paintType] || 13;

 // Ajuste por tipo de superfície
 const surfaceMultiplier = {
 'smooth': 1.0,
 'textured': 0.85,
 'rough': 0.7
 }[data.surface] || 1.0;

 const adjustedRendement = paintRendement * surfaceMultiplier;

 // Cálculo de litros necessários
 const totalAreaToPaint = netArea * coats;
 let litersNeeded = totalAreaToPaint / adjustedRendement;

 // Margem de segurança de 10%
 litersNeeded *= 1.1;

 // Arredondar para cima para latas inteiras
 const cans18L = Math.ceil(litersNeeded / 18);
 const cans36L = Math.ceil(litersNeeded / 3.6);

 let recommendation = '';
 if (litersNeeded <= 3.6) {
 recommendation = `${cans36L} lata${cans36L > 1 ? 's' : ''} de 3,6L`;
 } else if (litersNeeded <= 18) {
 recommendation = `1 lata de 18L`;
 } else {
 recommendation = `${cans18L} lata${cans18L > 1 ? 's' : ''} de 18L`;
 }

 return {
 summary: `Você precisará de aproximadamente ${litersNeeded.toFixed(1)}L de tinta (${recommendation}).`,
 details: [
 { label: 'Área líquida a pintar', value: `${netArea.toFixed(1)} m²` },
 { label: 'Área total com demãos', value: `${totalAreaToPaint.toFixed(1)} m²` },
 { label: 'Litros necessários', value: `${litersNeeded.toFixed(1)}L`, highlight: true },
 { label: 'Recomendação de compra', value: recommendation, highlight: true },
 { label: 'Rendimento aplicado', value: `${adjustedRendement.toFixed(1)} m²/L` },
 { label: 'Margem de segurança', value: '10% incluída' },
 { label: 'Área de portas descontada', value: `${doorArea.toFixed(1)} m²` },
 { label: 'Área de janelas descontada', value: `${windowArea.toFixed(1)} m²` }
 ]
 };
 },
 seo: {
 title: 'Como Calcular Quantidade de Tinta',
 content: `<p>O cálculo correto da tinta evita desperdício e garante cobertura adequada. Nossa calculadora considera o tipo de tinta, superfície e número de demãos.</p><p>Lembre-se: superfícies rugosas consomem mais tinta, e cores escuras sobre claras podem precisar de demãos extras.</p>`
 }
 },
 'lumens': {
 id: 'lumens',
 title: 'Iluminação',
 description: 'Calcule lumens e lâmpadas ideais.',
 category: 'Elétrica',
 icon: LightingPremiumIcon,
 fields: [
 { id: 'area', label: 'Área do ambiente', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 25,5', helpText: 'Comprimento × largura do ambiente', showControls: true, step: 0.5 },
 { id: 'roomType', label: 'Tipo do ambiente', type: 'select', required: true, options: [
 { value: 'living', label: 'Sala de estar (150-200 lux)' },
 { value: 'kitchen', label: 'Cozinha (300-500 lux)' },
 { value: 'bedroom', label: 'Quarto (100-150 lux)' },
 { value: 'bathroom', label: 'Banheiro (200-300 lux)' },
 { value: 'office', label: 'Escritório (300-500 lux)' },
 { value: 'garage', label: 'Garagem/Depósito (100 lux)' }
 ], defaultValue: 'living' },
 { id: 'lampType', label: 'Tipo de lâmpada', type: 'select', required: true, options: [
 { value: 'led', label: 'LED (80-100 lm/W)' },
 { value: 'fluorescent', label: 'Fluorescente (50-70 lm/W)' },
 { value: 'halogen', label: 'Halógena (15-25 lm/W)' },
 { value: 'incandescent', label: 'Incandescente (10-15 lm/W)' }
 ], defaultValue: 'led' }
 ],
 advancedFields: [
 { id: 'ceiling', label: 'Altura do teto', unit: 'm', type: 'number', defaultValue: '2.7', helpText: 'Altura padrão é 2,7m', showControls: true, step: 0.1 },
 { id: 'efficiency', label: 'Fator de eficiência', unit: '%', type: 'number', defaultValue: '70', helpText: 'Considera perdas por reflexão e sujeira', showControls: true, step: 5 }
 ],
 formula: 'Lumens Necessários = Área × Lux Recomendado ÷ Fator de Eficiência\nPotência = Lumens ÷ Eficiência da Lâmpada',
 assumptions: [
 'Valores de lux baseados em normas técnicas (NBR 5413)',
 'Considera fator de eficiência de 70%',
 'Eficiência das lâmpadas baseada em valores médios',
 'Para ambientes com tarefas visuais, considere valores maiores'
 ],
 calculationFn: (data) => {
 const area = num(data.area);
 const ceiling = num(data.ceiling) || 2.7;
 const efficiency = (num(data.efficiency) || 70) / 100;

 // Lux recomendado por tipo de ambiente
 const luxValues = {
 'living': 150,
 'kitchen': 400,
 'bedroom': 125,
 'bathroom': 250,
 'office': 400,
 'garage': 100
 };

 const recommendedLux = luxValues[data.roomType] || 150;

 // Ajuste por altura do teto
 let luxAdjustment = 1.0;
 if (ceiling > 3.0) luxAdjustment = 1.2;
 else if (ceiling < 2.5) luxAdjustment = 0.9;

 const adjustedLux = recommendedLux * luxAdjustment;

 // Lumens necessários
 const lumensNeeded = (area * adjustedLux) / efficiency;

 // Eficiência por tipo de lâmpada (lumens por watt)
 const lampEfficiency = {
 'led': 90,
 'fluorescent': 60,
 'halogen': 20,
 'incandescent': 12
 };

 const efficiency_lm_w = lampEfficiency[data.lampType] || 90;

 // Potência necessária
 const wattsNeeded = lumensNeeded / efficiency_lm_w;

 // Sugestões de lâmpadas
 let lampSuggestion = '';
 if (data.lampType === 'led') {
 if (wattsNeeded <= 12) lampSuggestion = '1 lâmpada LED de 12W';
 else if (wattsNeeded <= 24) lampSuggestion = '2 lâmpadas LED de 12W ou 1 de 24W';
 else if (wattsNeeded <= 36) lampSuggestion = '3 lâmpadas LED de 12W ou 1 de 36W';
 else lampSuggestion = `${Math.ceil(wattsNeeded / 12)} lâmpadas LED de 12W`;
 } else {
 lampSuggestion = `${Math.ceil(wattsNeeded)}W em lâmpadas ${data.lampType}`;
 }

 // Custo estimado anual (considerando 5h/dia)
 const dailyKwh = (wattsNeeded * 5) / 1000;
 const monthlyKwh = dailyKwh * 30;
 const monthlyCost = monthlyKwh * 0.65; // R$ 0,65 por kWh

 return {
 summary: `Para ${area}m² você precisa de ${lumensNeeded.toFixed(0)} lumens (${wattsNeeded.toFixed(0)}W). Sugestão: ${lampSuggestion}.`,
 details: [
 { label: 'Área do ambiente', value: `${area.toFixed(1)} m²` },
 { label: 'Lux recomendado', value: `${adjustedLux.toFixed(0)} lux` },
 { label: 'Lumens necessários', value: `${lumensNeeded.toFixed(0)} lm`, highlight: true },
 { label: 'Potência necessária', value: `${wattsNeeded.toFixed(0)}W`, highlight: true },
 { label: 'Sugestão de lâmpadas', value: lampSuggestion, highlight: true },
 { label: 'Eficiência da lâmpada', value: `${efficiency_lm_w} lm/W` },
 { label: 'Custo mensal estimado', value: `R$ ${monthlyCost.toFixed(2)}` },
 { label: 'Consumo mensal', value: `${monthlyKwh.toFixed(1)} kWh` }
 ]
 };
 },
 seo: {
 title: 'Como Calcular Iluminação Ideal',
 content: `<p>O cálculo correto da iluminação garante conforto visual e economia de energia. Nossa calculadora considera o tipo de ambiente e lâmpada.</p><p>LEDs são mais eficientes e duráveis, sendo a melhor opção para a maioria dos ambientes.</p>`
 }
 },
 'lawn-grass': {
 id: 'lawn-grass',
 title: 'Grama',
 description: 'Calcule quantidade exata considerando tipo, variedade e perdas técnicas.',
 category: 'Jardim',
 icon: GrassPremiumIcon,
 fields: [
 { id: 'area', label: 'Área total do gramado', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 45,50', helpText: 'Para jardins irregulares, divida em seções retangulares e some as áreas.', showControls: true, step: 0.1 },
 { id: 'grassType', label: 'Tipo de grama', type: 'select', required: true, options: [
 { value: 'rolo', label: 'Rolo (cobertura: 0,40 m²/rolo)' },
 { value: 'placa', label: 'Placa/Tapete (cobertura: 0,135 m²/placa)' },
 { value: 'sementes', label: 'Sementes (cobertura: 35 m²/kg)' }
 ], defaultValue: 'rolo', helpText: 'Rolos: instalação rápida. Placas: mais econômico. Sementes: mais barato.' },
 { id: 'grassVariety', label: 'Variedade da grama', type: 'select', required: true, options: [
 { value: 'sao-carlos', label: 'São Carlos (sol/meia-sombra)' },
 { value: 'esmeralda', label: 'Esmeralda (sol pleno)' },
 { value: 'batatais', label: 'Batatais (resistente)' },
 { value: 'bermuda', label: 'Bermuda (esportiva)' },
 { value: 'santo-agostinho', label: 'Santo Agostinho (sombra)' },
 { value: 'zoysia', label: 'Zoysia (premium)' }
 ], defaultValue: 'sao-carlos', helpText: 'Escolha conforme local e uso.' }
 ],
 advancedFields: [
 { id: 'waste', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: 'Adicione 10% extra para cortes nas bordas e irregularidades.', showControls: true, step: 1 },
 { id: 'soilCondition', label: 'Condição do solo', type: 'select', options: [
 { value: 'preparado', label: 'Preparado' },
 { value: 'necessita_preparo', label: 'Necessita preparo' },
 { value: 'compactado', label: 'Solo compactado' }
 ], defaultValue: 'preparado', helpText: 'Afeta a quantidade de adubo necessário.' }
 ],
 formula: 'Área com Perdas = Área × (1 + Perdas%)\nRolos = ⌈Área com Perdas ÷ 0,40⌉\nPlacas = ⌈Área com Perdas ÷ 0,135⌉\nSementes = ⌈Área com Perdas ÷ 35⌉ kg\nAdubo = Área × 0,05 kg/m²',
 assumptions: [
 'Rolo padrão: 0,40 m² (cobertura real)',
 'Placa/Tapete padrão: 0,135 m² (30cm × 45cm)',
 'Sementes: rendimento 35 m²/kg conforme variedade',
 'Adubo inicial: 50g por m² (NPK 10-10-10)',
 'Margem de 10% padrão para cortes nas bordas',
 'Peso: rolo ≈15kg, placa ≈5kg'
 ],
 calculationFn: (data) => {
 const area = num(data.area);
 const waste = (num(data.waste) || 10) / 100;

 // Validações rigorosas
 if (area < 1.0) throw new Error('Área muito pequena. Mínimo: 1,0m²');
 if (area > 10000) throw new Error('Área muito grande. Máximo: 10.000m²');

 // Coberturas por tipo (valores técnicos precisos)
 const coverage = {
 rolo: 0.40,      // m² por rolo
 placa: 0.135,    // m² por placa (30cm × 45cm)
 sementes: 35     // m² por kg
 };

 // Área com perdas
 const areaWithWaste = area * (1 + waste);

 // Cálculos por tipo
 let quantity = 0;
 let unit = '';
 let totalWeight = 0;
 let price = 0;

 if (data.grassType === 'rolo') {
 quantity = Math.ceil(areaWithWaste / coverage.rolo);
 unit = 'rolos';
 totalWeight = quantity * 15; // 15kg por rolo
 price = quantity * 12; // R$ 12 por rolo
 } else if (data.grassType === 'placa') {
 quantity = Math.ceil(areaWithWaste / coverage.placa);
 unit = 'placas';
 totalWeight = quantity * 5; // 5kg por placa
 price = quantity * 4; // R$ 4 por placa
 } else if (data.grassType === 'sementes') {
 quantity = Math.ceil(areaWithWaste / coverage.sementes * 10) / 10; // kg, arredondado para 100g
 unit = 'kg de sementes';
 totalWeight = quantity; // peso = quantidade em kg
 price = quantity * 150; // R$ 150 por kg
 }

 // Adubo inicial (50g por m²)
 const fertilizerKg = Math.ceil(area * 0.05 * 10) / 10; // arredondado para 100g

 // Custo adicional por condição do solo
 let soilCost = 0;
 if (data.soilCondition === 'necessita_preparo') {
 soilCost = area * 8; // R$ 8 por m² para preparo básico
 } else if (data.soilCondition === 'compactado') {
 soilCost = area * 15; // R$ 15 por m² para descompactação e preparo
 }

 // Custo do adubo
 const fertilizerCost = fertilizerKg * 8; // R$ 8 por kg de NPK

 const totalCost = price + soilCost + fertilizerCost;

 // Estimativa de irrigação (5L por m² por dia)
 const dailyWaterLiters = area * 5;

 // Estimativa de tempo de plantio
 let plantingTimeHours = 0;
 if (data.grassType === 'rolo') {
 plantingTimeHours = Math.ceil(area / 20); // 20m² por hora
 } else if (data.grassType === 'placa') {
 plantingTimeHours = Math.ceil(area / 15); // 15m² por hora
 } else {
 plantingTimeHours = Math.ceil(area / 50); // 50m² por hora (semeadura)
 }

 // Alertas e recomendações
 let alerts = [];
 let alertLevel = 'success';

 // Alerta para área grande
 if (area > 5000) {
 alerts.push('🔴 Área muito grande: recomendamos plantio profissional');
 alertLevel = 'error';
 } else if (area > 2000) {
 alerts.push('🟡 Área considerável: considere ajuda profissional');
 alertLevel = 'warning';
 } else if (area > 500) {
 alerts.push('🟡 Área média: considere plantio por etapas');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Alerta para solo
 if (data.soilCondition === 'compactado') {
 alerts.push('🌱 Solo compactado: descompactação é essencial para sucesso');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Configuração ideal
 if (area <= 500 && data.soilCondition === 'preparado') {
 alerts.push('✅ Quantidade adequada para plantio doméstico');
 }

 // Dicas por variedade
 const varietyTips = {
 'sao-carlos': 'São Carlos: mais versátil, adapta-se a sol e meia-sombra.',
 'esmeralda': 'Esmeralda: mais resistente ao sol, folhas finas e densas.',
 'batatais': 'Batatais: muito resistente à seca e pisoteio.',
 'bermuda': 'Bermuda: ideal para campos esportivos, sol pleno.',
 'santo-agostinho': 'Santo Agostinho: tolera sombra, folhas largas.',
 'zoysia': 'Zoysia: premium, crescimento lento, muito densa.'
 };

 const varietyTip = varietyTips[data.grassVariety] || '';

 // Dicas por tipo
 const typeTips = {
 rolo: 'Rolos: resultado imediato, mais caro, ideal para áreas pequenas.',
 placa: 'Placas: bom custo-benefício, instalação média, boa para áreas médias.',
 sementes: 'Sementes: mais econômico, demora 30-60 dias, ideal para áreas grandes.'
 };

 const typeTip = typeTips[data.grassType] || '';

 // Summary com alertas
 let summary = `Para ${area}m² você precisará de ${quantity} ${unit}, ${fertilizerKg}kg de adubo e ${dailyWaterLiters}L de água por dia.`;
 if (alerts.length > 0 && alertLevel !== 'success') {
 summary += ` ${alerts[0]}`;
 }

 return {
 summary,
 details: [
 { label: 'Área total', value: `${area.toFixed(1)} m²` },
 { label: 'Área com perdas', value: `${areaWithWaste.toFixed(1)} m²` },
 { label: 'Quantidade necessária', value: `${quantity} ${unit}`, highlight: true },
 { label: 'Peso total', value: `${totalWeight.toFixed(0)} kg` },
 { label: 'Adubo inicial', value: `${fertilizerKg} kg (NPK 10-10-10)`, highlight: true },
 { label: 'Custo da grama', value: `R$ ${price.toFixed(0)}` },
 { label: 'Custo do adubo', value: `R$ ${fertilizerCost.toFixed(0)}` },
 ...(soilCost > 0 ? [{ label: 'Custo preparo solo', value: `R$ ${soilCost.toFixed(0)}` }] : []),
 { label: 'Custo total estimado', value: `R$ ${totalCost.toFixed(0)}`, highlight: true },
 { label: 'Tempo de plantio', value: `${plantingTimeHours} horas` },
 { label: 'Irrigação diária', value: `${dailyWaterLiters} litros` },
 { label: 'Dica da variedade', value: varietyTip },
 { label: 'Dica do tipo', value: typeTip },
 ...(alerts.length > 1 ? alerts.slice(1).map(alert => ({ label: 'Observação', value: alert })) : [])
 ],
 alertLevel,
 alerts
 };
 },
 seo: {
 title: 'Calculadora de Grama - Cálculo Técnico por Tipo e Variedade',
 content: `
 <h2>Como Calcular Grama com Precisão Técnica</h2>
 <p>Nossa calculadora profissional considera coberturas reais por tipo de grama, variedades específicas e condições do solo. Cálculos precisos para rolos, placas e sementes.</p>

 <h3>Coberturas por Tipo de Grama</h3>
 <ul>
 <li><strong>Rolo:</strong> 0,40 m² por rolo (peso ≈15kg) - Instalação rápida</li>
 <li><strong>Placa/Tapete:</strong> 0,135 m² por placa (30cm × 45cm, peso ≈5kg) - Econômico</li>
 <li><strong>Sementes:</strong> 35 m² por kg - Mais barato, demora 30-60 dias</li>
 </ul>

 <h3>Variedades e Características</h3>
 <ul>
 <li><strong>São Carlos:</strong> Sol/meia-sombra, mais versátil, crescimento médio</li>
 <li><strong>Esmeralda:</strong> Sol pleno, folhas finas, ornamental</li>
 <li><strong>Batatais:</strong> Muito resistente à seca e pisoteio</li>
 <li><strong>Bermuda:</strong> Esportiva, sol pleno, alta resistência</li>
 <li><strong>Santo Agostinho:</strong> Tolera sombra, folhas largas</li>
 <li><strong>Zoysia:</strong> Premium, crescimento lento, muito densa</li>
 </ul>

 <h3>Preparação do Solo</h3>
 <ul>
 <li><strong>Solo preparado:</strong> Pronto para plantio</li>
 <li><strong>Necessita preparo:</strong> Adicionar terra vegetal e adubo</li>
 <li><strong>Solo compactado:</strong> Descompactação obrigatória</li>
 </ul>

 <h3>Dicas Técnicas</h3>
 <ul>
 <li>Margem de 10% para cortes nas bordas e irregularidades</li>
 <li>Adubo inicial: 50g por m² (NPK 10-10-10)</li>
 <li>Irrigação: 5 litros por m² por dia nos primeiros 30 dias</li>
 <li>Para áreas > 500m², considere plantio por etapas</li>
 <li>Rolos: resultado imediato, ideal para áreas pequenas</li>
 <li>Sementes: mais econômico para áreas grandes</li>
 </ul>

 <p>Use nossa calculadora para garantir quantidade correta e economia em seu projeto de paisagismo.</p>
 `
 }
 },
 'ac-btus': {
 id: 'ac-btus',
 title: 'Ar Condicionado',
 description: 'Calcule BTUs necessários considerando carga térmica e condições específicas.',
 category: 'Climatização',
 icon: ACPremiumIcon,
 fields: [
 { id: 'area', label: 'Área do ambiente', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 25,50', helpText: 'Para ambientes irregulares, divida em seções retangulares e some as áreas.', showControls: true, step: 0.1 },
 { id: 'people', label: 'Número de pessoas no ambiente', type: 'number', required: true, defaultValue: '2', helpText: 'Considere o número máximo de pessoas que ficam no ambiente simultaneamente. Cada pessoa adiciona 600 BTUs.', showControls: true, step: 1 },
 { id: 'sunExposure', label: 'Exposição solar do ambiente', type: 'select', required: true, options: [
 { value: 'baixa', label: 'Baixa (pouco sol, face sul/sudeste)' },
 { value: 'media', label: 'Média (sol parcial, face leste/oeste)' },
 { value: 'alta', label: 'Alta (sol intenso, face norte/noroeste)' }
 ], defaultValue: 'media', helpText: 'Ambientes com sol da tarde (oeste/noroeste) precisam mais BTUs.' },
 { id: 'roomType', label: 'Tipo de ambiente', type: 'select', required: true, options: [
 { value: 'quarto', label: 'Quarto (residencial)' },
 { value: 'sala', label: 'Sala de estar (residencial)' },
 { value: 'cozinha', label: 'Cozinha (maior carga térmica)' },
 { value: 'escritorio', label: 'Escritório (comercial)' },
 { value: 'comercio', label: 'Loja/Comércio (alta rotatividade)' }
 ], defaultValue: 'sala', helpText: 'Cada tipo tem características específicas de carga térmica.' }
 ],
 advancedFields: [
 { id: 'electronics', label: 'Equipamentos eletrônicos', type: 'number', defaultValue: '2', helpText: 'TV, computador, geladeira, freezer - cada um adiciona 600 BTUs. Conte equipamentos que geram calor.', showControls: true, step: 1 },
 { id: 'ceiling', label: 'Altura do teto (pé-direito)', unit: 'm', type: 'number', defaultValue: '2.70', helpText: 'Tetos altos aumentam o volume de ar a climatizar. Padrão residencial: 2,70m.', showControls: true, step: 0.05 },
 { id: 'insulation', label: 'Qualidade do isolamento térmico', type: 'select', options: [
 { value: 'bom', label: 'Bom' },
 { value: 'medio', label: 'Médio' },
 { value: 'ruim', label: 'Ruim' }
 ], defaultValue: 'medio', helpText: 'Isolamento ruim aumenta a necessidade de BTUs.' }
 ],
 formula: 'BTU Base = Área × (600 até 12m² + 500 acima)\nBTU Pessoas = (N-1) × 600\nBTU Eletrônicos = N × 600\nBTU Exposição = 0/400/800 (baixa/média/alta)\nBTU Pé-direito = (altura-3,0) × área × 100\nBTU Isolamento = área × 0/100/200 (bom/médio/ruim)\nBTU Total = Soma de todos os fatores',
 assumptions: [
 'Base: 600 BTU/m² até 12m², depois 500 BTU/m² (norma ABNT NBR 16401)',
 'Pessoas: primeira incluída na base, demais +600 BTU cada',
 'Eletrônicos: 600 BTU por equipamento (TV, PC, geladeira)',
 'Exposição alta: +800 BTU, média: +400 BTU, baixa: sem acréscimo',
 'Pé-direito > 3,0m: +100 BTU/m² por metro adicional',
 'Isolamento ruim: +200 BTU/m², médio: +100 BTU/m²',
 'Modelos comerciais: 9.000, 12.000, 18.000, 24.000, 30.000, 36.000 BTU/h'
 ],
 calculationFn: (data) => {
 const area = num(data.area);
 const people = num(data.people) || 2;
 const electronics = num(data.electronics) || 2;
 const ceiling = num(data.ceiling) || 2.70;

 // Validações rigorosas
 if (area < 4.0) throw new Error('Área muito pequena. Mínimo: 4,0m²');
 if (area > 200) throw new Error('Área muito grande. Máximo: 200m²');
 if (people < 1) throw new Error('Número de pessoas deve ser pelo menos 1');
 if (people > 20) throw new Error('Número de pessoas muito alto. Máximo: 20');

 // Base de cálculo por área (norma ABNT NBR 16401)
 let btuBase = 0;
 if (area <= 12) {
 btuBase = area * 600; // 600 BTU/m² até 12m²
 } else {
 btuBase = (12 * 600) + ((area - 12) * 500); // 500 BTU/m² acima de 12m²
 }

 // BTUs por pessoas (primeira pessoa já incluída na base)
 const btuPeople = (people - 1) * 600;

 // BTUs por equipamentos eletrônicos
 const btuElectronics = electronics * 600;

 // BTUs por exposição solar
 const btuSunExposure = {
 baixa: 0,
 media: 400,
 alta: 800
 }[data.sunExposure] || 400;

 // BTUs por pé-direito alto
 const btuCeiling = ceiling > 3.0 ? (ceiling - 3.0) * area * 100 : 0;

 // BTUs por isolamento térmico
 const btuInsulation = {
 bom: 0,
 medio: area * 100,
 ruim: area * 200
 }[data.insulation] || area * 100;

 // BTUs por tipo de ambiente
 const btuRoomType = {
 quarto: 0,
 sala: 0,
 cozinha: area * 300,
 escritorio: area * 200,
 comercio: area * 400
 }[data.roomType] || 0;

 // Cálculo total
 const totalBtu = btuBase + btuPeople + btuElectronics + btuSunExposure + btuCeiling + btuInsulation + btuRoomType;

 // Modelos comerciais disponíveis
 const commercialModels = [9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000];
 const recommendedModel = commercialModels.find(model => model >= totalBtu) || commercialModels[commercialModels.length - 1];

 // Estimativa de consumo (kWh/mês)
 const monthlyConsumption = Math.round((recommendedModel * 0.293 * 8 * 30) / 1000); // 8h/dia, 30 dias
 const monthlyCost = Math.round(monthlyConsumption * 0.65); // R$ 0,65/kWh média

 // Alertas e recomendações
 let alerts = [];
 let alertLevel = 'success';

 // Alerta para área grande
 if (area > 100) {
 alerts.push('🔴 Área muito grande: recomendamos sistema central ou cálculo técnico profissional');
 alertLevel = 'error';
 } else if (area > 50) {
 alerts.push('🟡 Área considerável: considere split hi-wall ou dois equipamentos');
 alertLevel = 'warning';
 }

 // Alerta para exposição alta
 if (data.sunExposure === 'alta') {
 alerts.push('🌡️ Exposição solar alta: escolha o próximo modelo acima para conforto');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Alerta para isolamento ruim
 if (data.insulation === 'ruim') {
 alerts.push('🏠 Isolamento ruim: considere melhorar isolamento para economia');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Configuração ideal
 if (area <= 50 && data.sunExposure !== 'alta' && data.insulation !== 'ruim') {
 alerts.push('✅ Dimensionamento adequado para uso residencial');
 }

 // Eficiência energética recomendada
 let efficiencyRecommendation = '';
 if (recommendedModel <= 12000) {
 efficiencyRecommendation = 'Selo A recomendado (economia de até 40%)';
 } else if (recommendedModel <= 24000) {
 efficiencyRecommendation = 'Selo A ou B recomendado (boa eficiência)';
 } else {
 efficiencyRecommendation = 'Selo A obrigatório para grandes capacidades';
 }

 // Summary com alertas
 let summary = `Recomendamos um ar condicionado de ${recommendedModel.toLocaleString('pt-BR')} BTU/h.`;
 if (alerts.length > 0 && alertLevel !== 'success') {
 summary += ` ${alerts[0]}`;
 }

 return {
 summary,
 details: [
 { label: 'BTUs calculados', value: `${totalBtu.toLocaleString('pt-BR')} BTU/h` },
 { label: 'Modelo comercial sugerido', value: `${recommendedModel.toLocaleString('pt-BR')} BTU/h`, highlight: true },
 { label: 'Área coberta', value: `${area.toFixed(1)} m²` },
 { label: 'Consumo estimado', value: `${monthlyConsumption} kWh/mês` },
 { label: 'Custo mensal estimado', value: `R$ ${monthlyCost}`, highlight: true },
 { label: 'Eficiência energética', value: efficiencyRecommendation },
 { label: 'BTU base (área)', value: `${btuBase.toLocaleString('pt-BR')} BTU/h` },
 { label: 'BTU pessoas', value: `${btuPeople.toLocaleString('pt-BR')} BTU/h` },
 { label: 'BTU eletrônicos', value: `${btuElectronics.toLocaleString('pt-BR')} BTU/h` },
 { label: 'BTU exposição solar', value: `${btuSunExposure.toLocaleString('pt-BR')} BTU/h` },
 ...(btuCeiling > 0 ? [{ label: 'BTU pé-direito alto', value: `${btuCeiling.toLocaleString('pt-BR')} BTU/h` }] : []),
 ...(btuInsulation > 0 ? [{ label: 'BTU isolamento', value: `${btuInsulation.toLocaleString('pt-BR')} BTU/h` }] : []),
 ...(btuRoomType > 0 ? [{ label: 'BTU tipo ambiente', value: `${btuRoomType.toLocaleString('pt-BR')} BTU/h` }] : []),
 ...(alerts.length > 1 ? alerts.slice(1).map(alert => ({ label: 'Observação', value: alert })) : [])
 ],
 alertLevel,
 alerts
 };
 },
 seo: {
 title: 'Calculadora de BTUs - Dimensionamento Técnico de Ar Condicionado',
 content: `
 <h2>Como Calcular BTUs com Precisão Técnica</h2>
 <p>Nossa calculadora profissional utiliza normas ABNT NBR 16401 e ASHRAE para dimensionamento preciso de ar condicionado. Considera carga térmica, exposição solar, isolamento e características específicas do ambiente.</p>

 <h3>Fórmula de Cálculo Técnico</h3>
 <ul>
 <li><strong>Base por área:</strong> 600 BTU/m² até 12m², depois 500 BTU/m²</li>
 <li><strong>Pessoas:</strong> Primeira incluída na base, demais +600 BTU cada</li>
 <li><strong>Equipamentos:</strong> 600 BTU por equipamento eletrônico</li>
 <li><strong>Exposição solar:</strong> Baixa +0, Média +400, Alta +800 BTU</li>
 <li><strong>Pé-direito alto:</strong> +100 BTU/m² por metro acima de 3,0m</li>
 <li><strong>Isolamento:</strong> Ruim +200, Médio +100, Bom +0 BTU/m²</li>
 </ul>

 <h3>Modelos Comerciais Disponíveis</h3>
 <ul>
 <li><strong>9.000 BTU/h:</strong> Até 15m² (quartos pequenos)</li>
 <li><strong>12.000 BTU/h:</strong> 15-20m² (quartos médios)</li>
 <li><strong>18.000 BTU/h:</strong> 20-30m² (salas pequenas)</li>
 <li><strong>24.000 BTU/h:</strong> 30-40m² (salas médias)</li>
 <li><strong>30.000 BTU/h:</strong> 40-50m² (salas grandes)</li>
 <li><strong>36.000+ BTU/h:</strong> Acima de 50m² (ambientes grandes)</li>
 </ul>

 <h3>Fatores que Aumentam a Necessidade de BTUs</h3>
 <ul>
 <li>Exposição solar intensa (face norte/noroeste)</li>
 <li>Muitas pessoas no ambiente</li>
 <li>Equipamentos eletrônicos (TV, PC, geladeira)</li>
 <li>Pé-direito alto (acima de 3,0m)</li>
 <li>Isolamento térmico deficiente</li>
 <li>Cozinhas e ambientes comerciais</li>
 </ul>

 <h3>Dicas de Eficiência Energética</h3>
 <ul>
 <li>Escolha equipamentos com Selo A (economia até 40%)</li>
 <li>Para exposição solar alta, considere o próximo modelo</li>
 <li>Melhore o isolamento térmico para reduzir consumo</li>
 <li>Para áreas > 50m², considere split hi-wall ou central</li>
 <li>Manutenção regular aumenta eficiência</li>
 </ul>

 <p>Use nossa calculadora para dimensionamento preciso e economia de energia em seu projeto de climatização.</p>
 `
 }
 },

 'grout': {
 id: 'grout',
 title: 'Rejunte',
 description: 'Calcule quantidade exata considerando dimensões das peças e tipo de junta.',
 category: 'Acabamento',
 icon: GroutPremiumIcon,
 fields: [
 { id: 'area', label: 'Área total a rejuntar', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 15,50', helpText: 'Some todas as áreas que receberão rejunte.', showControls: true, step: 0.1 },
 { id: 'tileWidth', label: 'Largura da peça cerâmica', unit: 'mm', type: 'number', required: true, placeholder: 'ex: 300', helpText: 'Medida da menor dimensão da peça.', showControls: true, step: 5 },
 { id: 'tileHeight', label: 'Comprimento da peça cerâmica', unit: 'mm', type: 'number', required: true, placeholder: 'ex: 600', helpText: 'Medida da maior dimensão da peça.', showControls: true, step: 5 },
 { id: 'jointWidth', label: 'Largura da junta', unit: 'mm', type: 'number', required: true, defaultValue: '3', helpText: 'Espaço entre as peças. Padrão: 2-3mm para porcelanato, 3-5mm para cerâmica.', showControls: true, step: 0.5 },
 { id: 'jointDepth', label: 'Profundidade da junta', unit: 'mm', type: 'number', required: true, defaultValue: '8', helpText: 'Geralmente igual à espessura da peça. Padrão: 6-10mm.', showControls: true, step: 1 }
 ],
 advancedFields: [
 { id: 'groutType', label: 'Tipo de rejunte', type: 'select', options: [
 { value: 'cimenticio', label: 'Cimentício (uso geral)' },
 { value: 'acrilico', label: 'Acrílico (flexível, áreas úmidas)' },
 { value: 'epoxi', label: 'Epóxi (alta resistência, piscinas)' }
 ], defaultValue: 'cimenticio', helpText: 'Cada tipo tem densidade e aplicação específica.' },
 { id: 'bagWeight', label: 'Peso da embalagem', type: 'select', options: [
 { value: '1', label: '1kg' },
 { value: '5', label: '5kg (padrão)' },
 { value: '20', label: '20kg' }
 ], defaultValue: '5', helpText: 'Peso padrão da embalagem de rejunte.' },
 { id: 'loss', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: '10% padrão para desperdício. Aumente para 15% em aplicações complexas.', showControls: true, step: 1 }
 ],
 formula: 'Consumo/m² = ((L + C) ÷ (L × C)) × l × p × 1,6\nL = largura da peça (mm), C = comprimento da peça (mm)\nl = largura da junta (mm), p = profundidade da junta (mm)\n1,6 = fator de densidade (NBR 14992)\nTotal = Área × Consumo/m² × Fator Tipo × (1 + Perdas%)',
 assumptions: [
 'Fórmula oficial NBR 14992 - Rejunte para revestimentos cerâmicos',
 'Fator 1,6: densidade média do rejunte em pó',
 'Fatores por tipo: Cimentício 1,0 | Acrílico 0,9 | Epóxi 1,2',
 'Margem de 10% padrão para desperdício e irregularidades',
 'Embalagens disponíveis: 1kg, 5kg e 20kg',
 'Variação possível conforme fabricante (±15%)'
 ],
 calculationFn: (data) => {
 const area = num(data.area);
 const tileWidth = num(data.tileWidth);
 const tileHeight = num(data.tileHeight);
 const jointWidth = num(data.jointWidth) || 3;
 const jointDepth = num(data.jointDepth) || 8;
 const bagWeight = num(data.bagWeight) || 5;
 const loss = (num(data.loss) || 10) / 100;

 // Validações rigorosas
 if (area < 1.0) throw new Error('Área muito pequena. Mínimo: 1,0m²');
 if (area > 1000) throw new Error('Área muito grande. Máximo: 1.000m²');
 if (tileWidth < 50 || tileWidth > 1200) throw new Error('Largura da peça deve estar entre 50mm e 1.200mm');
 if (tileHeight < 50 || tileHeight > 1200) throw new Error('Comprimento da peça deve estar entre 50mm e 1.200mm');
 if (jointWidth < 1 || jointWidth > 10) throw new Error('Largura da junta deve estar entre 1mm e 10mm');
 if (jointDepth < 3 || jointDepth > 20) throw new Error('Profundidade da junta deve estar entre 3mm e 20mm');

 // Fórmula oficial NBR 14992
 // Consumo/m² = ((L + C) ÷ (L × C)) × l × p × 1,6
 const consumptionPerM2 = ((tileWidth + tileHeight) / (tileWidth * tileHeight)) * jointWidth * jointDepth * 1.6;

 // Ajuste por tipo de rejunte
 const groutTypeFactor = {
 cimenticio: 1.0,
 acrilico: 0.9,    // menor densidade
 epoxi: 1.2        // maior densidade
 }[data.groutType] || 1.0;

 // Consumo ajustado por tipo
 const adjustedConsumption = consumptionPerM2 * groutTypeFactor;

 // Consumo total com perdas
 const totalConsumption = area * adjustedConsumption * (1 + loss);

 // Número de sacos necessários
 const bagsNeeded = Math.ceil(totalConsumption / bagWeight);

 // Rendimento por saco
 const yieldPerBag = (area * groutTypeFactor) / bagsNeeded;

 // Alertas e recomendações
 let alerts = [];
 let alertLevel = 'success';

 // Alerta para junta muito larga
 if (jointWidth > 8) {
 alerts.push('🔴 Junta muito larga: verifique especificação do fabricante');
 alertLevel = 'error';
 } else if (jointWidth > 6) {
 alerts.push('🟡 Junta larga: consumo alto de rejunte');
 alertLevel = 'warning';
 }

 // Alerta para área grande
 if (area > 500) {
 alerts.push('📦 Área grande: considere compra fracionada');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Recomendação para peças grandes
 if (tileWidth > 600 || tileHeight > 600) {
 alerts.push('📏 Para peças grandes (>60cm): junta mínima 3mm');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Configuração ideal
 if (jointWidth >= 2 && jointWidth <= 5 && area <= 500) {
 alerts.push('✅ Dimensões adequadas para aplicação padrão');
 }

 // Custo estimado
 const bagPrice = bagWeight === 1 ? 8 : bagWeight === 5 ? 25 : 80; // Preços por peso
 const totalCost = bagsNeeded * bagPrice;

 // Dicas por tipo de rejunte
 const groutTypeTips = {
 cimenticio: 'Rejunte cimentício: uso geral, mais econômico.',
 acrilico: 'Rejunte acrílico: flexível, ideal para áreas úmidas.',
 epoxi: 'Rejunte epóxi: alta resistência, piscinas e áreas industriais.'
 };

 const groutTypeTip = groutTypeTips[data.groutType] || groutTypeTips.cimenticio;

 // Summary com alertas
 let summary = `Você precisará de ${totalConsumption.toFixed(2)}kg de rejunte. Sugestão: ${bagsNeeded} sacos de ${bagWeight}kg.`;
 if (alerts.length > 0 && alertLevel !== 'success') {
 summary += ` ${alerts[0]}`;
 }

 return {
 summary,
 details: [
 { label: 'Área total', value: `${area.toFixed(1)} m²` },
 { label: 'Tamanho da peça', value: `${tileWidth}×${tileHeight} mm` },
 { label: 'Largura da junta', value: `${jointWidth} mm` },
 { label: 'Profundidade da junta', value: `${jointDepth} mm` },
 { label: 'Consumo por m²', value: `${adjustedConsumption.toFixed(3)} kg/m²` },
 { label: 'Consumo total', value: `${totalConsumption.toFixed(2)} kg`, highlight: true },
 { label: `Sacos necessários (${bagWeight}kg)`, value: `${bagsNeeded} sacos`, highlight: true },
 { label: 'Perda aplicada', value: `${(totalConsumption * loss / (1 + loss)).toFixed(2)} kg (${(loss * 100).toFixed(0)}%)` },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Rendimento por saco', value: `${yieldPerBag.toFixed(2)} m²` },
 { label: 'Tipo de rejunte', value: data.groutType || 'cimentício' },
 { label: 'Dica técnica', value: groutTypeTip },
 { label: 'Observação', value: 'Variação possível conforme fabricante (±15%)' },
 ...(alerts.length > 1 ? alerts.slice(1).map(alert => ({ label: 'Recomendação', value: alert })) : [])
 ],
 alertLevel,
 alerts
 };
 },
 seo: {
 title: 'Calculadora de Rejunte - Cálculo Técnico Conforme NBR 14992',
 content: `
 <h2>Como Calcular Rejunte com Precisão Técnica</h2>
 <p>Nossa calculadora profissional utiliza a fórmula oficial NBR 14992 para cálculo preciso de rejunte. Considera dimensões das peças, largura e profundidade da junta, tipo de rejunte e perdas técnicas.</p>

 <h3>Fórmula Oficial NBR 14992</h3>
 <p><strong>Consumo/m² = ((L + C) ÷ (L × C)) × l × p × 1,6</strong></p>
 <ul>
 <li><strong>L:</strong> Largura da peça (mm)</li>
 <li><strong>C:</strong> Comprimento da peça (mm)</li>
 <li><strong>l:</strong> Largura da junta (mm)</li>
 <li><strong>p:</strong> Profundidade da junta (mm)</li>
 <li><strong>1,6:</strong> Fator de densidade média do rejunte</li>
 </ul>

 <h3>Tipos de Rejunte e Aplicações</h3>
 <ul>
 <li><strong>Cimentício:</strong> Uso geral, mais econômico (fator 1,0)</li>
 <li><strong>Acrílico:</strong> Flexível, áreas úmidas (fator 0,9)</li>
 <li><strong>Epóxi:</strong> Alta resistência, piscinas (fator 1,2)</li>
 </ul>

 <h3>Larguras de Junta Recomendadas</h3>
 <ul>
 <li><strong>Porcelanato retificado:</strong> 2-3mm</li>
 <li><strong>Cerâmica comum:</strong> 3-5mm</li>
 <li><strong>Peças grandes (>60cm):</strong> Mínimo 3mm</li>
 <li><strong>Áreas externas:</strong> 4-6mm</li>
 </ul>

 <h3>Embalagens Disponíveis</h3>
 <ul>
 <li><strong>1kg:</strong> Pequenos reparos e retoques</li>
 <li><strong>5kg:</strong> Padrão para uso residencial</li>
 <li><strong>20kg:</strong> Grandes áreas e uso profissional</li>
 </ul>

 <h3>Dicas Técnicas</h3>
 <ul>
 <li>Margem de 10% para desperdício e irregularidades</li>
 <li>Profundidade da junta = espessura da peça</li>
 <li>Use espaçadores para garantir uniformidade</li>
 <li>Variação possível conforme fabricante (±15%)</li>
 <li>Para juntas > 8mm, verifique especificação técnica</li>
 </ul>

 <p>Use nossa calculadora para dimensionamento preciso e economia em seu projeto de revestimento.</p>
 `
 }
 },

 'roof-tiles': {
 id: 'roof-tiles',
 title: 'Telhas',
 description: 'Calcule quantidade exata considerando tipo, inclinação e perdas técnicas.',
 category: 'Cobertura',
 icon: RoofTilesPremiumIcon,
 fields: [
 { id: 'area', label: 'Área total do telhado', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 85,50', helpText: 'Para telhados complexos, divida em seções e some as áreas.', showControls: true, step: 0.1 },
 { id: 'tileType', label: 'Tipo de telha', type: 'select', required: true, options: [
 { value: 'romana', label: 'Romana (16 peças/m²)' },
 { value: 'colonial', label: 'Colonial (24 peças/m²)' },
 { value: 'portuguesa', label: 'Portuguesa (17 peças/m²)' },
 { value: 'francesa', label: 'Francesa (17 peças/m²)' },
 { value: 'plan', label: 'Plan/Concreto (10 peças/m²)' },
 { value: 'fibrocimento', label: 'Fibrocimento (1 placa ≈ 3,0 m²)' }
 ], defaultValue: 'romana', helpText: 'Cada tipo tem rendimento específico por m².' },
 { id: 'ridgeLength', label: 'Comprimento de cumeeira', unit: 'm', type: 'number', required: false, placeholder: 'ex: 12,50', helpText: 'Comprimento total das cumeeiras do telhado. Deixe vazio se não houver.', showControls: true, step: 0.1 }
 ],
 advancedFields: [
 { id: 'loss', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '8', helpText: '8% padrão para quebras e recortes. Aumente para 10-12% em telhados complexos.', showControls: true, step: 1 },
 { id: 'roofSlope', label: 'Inclinação do telhado', type: 'select', options: [
 { value: '30', label: '30% (fator 1,15)' },
 { value: '40', label: '40% (fator 1,31)' },
 { value: '50', label: '50% (fator 1,55)' },
 { value: '60', label: '60% (fator 1,73)' },
 { value: '70', label: '70%+ (fator 2,00)' }
 ], defaultValue: '30', helpText: 'Inclinação afeta o fator de correção da área.' }
 ],
 formula: 'Área Corrigida = Área × Fator Inclinação\nTelhas = ⌈Área Corrigida × Peças/m² × (1 + Perdas%)⌉\nCumeeiras = ⌈Comprimento ÷ 0,40m⌉\nPeso Total = Telhas × Peso/Peça',
 assumptions: [
 'Consumos: Romana 16/m², Colonial 24/m², Portuguesa 17/m², Francesa 17/m², Plan 10/m², Fibrocimento 0,33/m²',
 'Fatores de inclinação: 30%=1,15 | 40%=1,31 | 50%=1,55 | 60%=1,73 | 70%+=2,00',
 'Cumeeiras: largura útil 0,40m por peça',
 'Margem de 8% padrão para quebras e recortes',
 'Peso estimado: Romana 2,5kg, Colonial 2,0kg, Plan 4,0kg, Fibrocimento 15kg/peça',
 'Cálculos baseados em normas ABNT NBR 15575 e NBR 9575'
 ],
 calculationFn: (data) => {
 const area = num(data.area);
 const ridgeLength = num(data.ridgeLength) || 0;
 const loss = (num(data.loss) || 8) / 100;
 const roofSlope = num(data.roofSlope) || 30;

 // Validações rigorosas
 if (area < 1.0) throw new Error('Área muito pequena. Mínimo: 1,0m²');
 if (area > 1000) throw new Error('Área muito grande. Máximo: 1.000m²');
 if (ridgeLength < 0 || ridgeLength > 200) throw new Error('Comprimento de cumeeira deve estar entre 0m e 200m');

 // Consumo por tipo de telha (peças/m²)
 const tileConsumption = {
 romana: 16,
 colonial: 24,
 portuguesa: 17,
 francesa: 17,
 plan: 10,
 fibrocimento: 0.33  // 1 placa = 3m²
 };

 // Fator de correção por inclinação
 const slopeFactors = {
 30: 1.15,
 40: 1.31,
 50: 1.55,
 60: 1.73,
 70: 2.00
 };

 // Peso por tipo de telha (kg/peça)
 const tileWeight = {
 romana: 2.5,
 colonial: 2.0,
 portuguesa: 2.3,
 francesa: 2.3,
 plan: 4.0,
 fibrocimento: 15.0
 };

 const consumption = tileConsumption[data.tileType] || tileConsumption.romana;
 const slopeFactor = slopeFactors[roofSlope] || slopeFactors[30];
 const weightPerTile = tileWeight[data.tileType] || tileWeight.romana;

 // Área corrigida pela inclinação
 const correctedArea = area * slopeFactor;

 // Cálculo de telhas
 const tilesNeeded = Math.ceil(correctedArea * consumption * (1 + loss));

 // Cálculo de cumeeiras (largura útil: 0,40m por peça)
 const ridgeTilesNeeded = ridgeLength > 0 ? Math.ceil(ridgeLength / 0.40) : 0;

 // Peso total estimado
 const totalWeight = (tilesNeeded * weightPerTile) + (ridgeTilesNeeded * 2.0); // cumeeira ≈ 2kg

 // Alertas e recomendações
 let alerts = [];
 let alertLevel = 'success';

 // Alerta para área grande
 if (area > 500) {
 alerts.push('🔴 Área muito grande: recomendamos cálculo estrutural profissional');
 alertLevel = 'error';
 } else if (area > 200) {
 alerts.push('🟡 Área considerável: considere cálculo estrutural');
 alertLevel = 'warning';
 }

 // Alerta para inclinação baixa
 if (roofSlope < 30) {
 alerts.push('📐 Inclinação baixa: verifique adequação do tipo de telha');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Recomendações por tipo de telha
 if (data.tileType === 'fibrocimento' && area > 100) {
 alerts.push('🏗️ Fibrocimento: considere estrutura adequada para o peso');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Configuração ideal
 if (area <= 200 && roofSlope >= 30) {
 alerts.push('✅ Dimensionamento adequado para telhado residencial');
 }

 // Custo estimado
 const tilePrices = {
 romana: 2.5,
 colonial: 2.0,
 portuguesa: 2.8,
 francesa: 2.8,
 plan: 3.5,
 fibrocimento: 25.0
 };

 const tilePrice = tilePrices[data.tileType] || tilePrices.romana;
 const ridgePrice = 8.0; // R$ 8 por cumeeira
 const totalCost = (tilesNeeded * tilePrice) + (ridgeTilesNeeded * ridgePrice);

 // Dicas por tipo de telha
 const tileTips = {
 romana: 'Telha Romana: inclinação mínima 30%, boa para clima tropical.',
 colonial: 'Telha Colonial: inclinação mínima 30%, tradicional e econômica.',
 portuguesa: 'Telha Portuguesa: inclinação mínima 30%, design moderno.',
 francesa: 'Telha Francesa: inclinação mínima 30%, alta qualidade.',
 plan: 'Telha Plan: inclinação mínima 15%, ideal para design moderno.',
 fibrocimento: 'Fibrocimento: inclinação mínima 5%, estrutura reforçada necessária.'
 };

 const tileTip = tileTips[data.tileType] || tileTips.romana;

 // Summary com alertas
 let summary = `Para ${area}m² você precisará de ${tilesNeeded} telhas do tipo ${data.tileType}`;
 if (ridgeTilesNeeded > 0) {
 summary += ` e ${ridgeTilesNeeded} cumeeiras`;
 }
 summary += '.';
 if (alerts.length > 0 && alertLevel !== 'success') {
 summary += ` ${alerts[0]}`;
 }

 return {
 summary,
 details: [
 { label: 'Área do telhado', value: `${area.toFixed(1)} m²` },
 { label: 'Área corrigida (inclinação)', value: `${correctedArea.toFixed(1)} m²` },
 { label: 'Fator de inclinação', value: `${slopeFactor} (${roofSlope}%)` },
 { label: 'Tipo de telha', value: data.tileType },
 { label: 'Consumo por m²', value: `${consumption} peças/m²` },
 { label: 'Telhas necessárias', value: `${tilesNeeded} peças`, highlight: true },
 ...(ridgeTilesNeeded > 0 ? [{ label: 'Cumeeiras necessárias', value: `${ridgeTilesNeeded} peças`, highlight: true }] : []),
 { label: 'Peso total estimado', value: `${totalWeight.toFixed(0)} kg` },
 { label: 'Margem de perdas', value: `${(loss * 100).toFixed(0)}%` },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Dica técnica', value: tileTip },
 ...(alerts.length > 1 ? alerts.slice(1).map(alert => ({ label: 'Observação', value: alert })) : [])
 ],
 alertLevel,
 alerts
 };
 },
 seo: {
 title: 'Calculadora de Telhas - Cálculo Técnico com Inclinação e Perdas',
 content: `
 <h2>Como Calcular Telhas com Precisão Técnica</h2>
 <p>Nossa calculadora profissional considera tipo de telha, inclinação do telhado, cumeeiras e perdas técnicas. Cálculos baseados em normas ABNT NBR 15575 e NBR 9575 para coberturas.</p>

 <h3>Consumo por Tipo de Telha</h3>
 <ul>
 <li><strong>Telha Romana:</strong> 16 peças/m² - Inclinação mínima 30%</li>
 <li><strong>Telha Colonial:</strong> 24 peças/m² - Inclinação mínima 30%</li>
 <li><strong>Telha Portuguesa:</strong> 17 peças/m² - Inclinação mínima 30%</li>
 <li><strong>Telha Francesa:</strong> 17 peças/m² - Inclinação mínima 30%</li>
 <li><strong>Telha Plan/Concreto:</strong> 10 peças/m² - Inclinação mínima 15%</li>
 <li><strong>Fibrocimento:</strong> 0,33 peças/m² (1 placa = 3m²) - Inclinação mínima 5%</li>
 </ul>

 <h3>Fatores de Correção por Inclinação</h3>
 <ul>
 <li><strong>30%:</strong> Fator 1,15 - Inclinação padrão residencial</li>
 <li><strong>40%:</strong> Fator 1,31 - Inclinação média</li>
 <li><strong>50%:</strong> Fator 1,55 - Inclinação alta</li>
 <li><strong>60%:</strong> Fator 1,73 - Inclinação muito alta</li>
 <li><strong>70%+:</strong> Fator 2,00 - Inclinação máxima</li>
 </ul>

 <h3>Dicas Técnicas</h3>
 <ul>
 <li>Margem de 8% padrão para quebras e recortes</li>
 <li>Para telhados complexos, aumente para 10-12%</li>
 <li>Área > 500m²: obrigatório cálculo estrutural</li>
 <li>Cumeeiras: largura útil 0,40m por peça</li>
 <li>Inclinação mínima varia por tipo de telha</li>
 </ul>

 <p>Use nossa calculadora para dimensionamento preciso e economia em seu projeto de cobertura.</p>
 `
 }
 },

 'baseboard-trim': {
 id: 'baseboard-trim',
 title: 'Rodapé & Guarnição',
 description: 'Calcule quantidade exata considerando dimensões dos cômodos, portas e perdas técnicas.',
 category: 'Acabamento',
 icon: BaseboardPremiumIcon,
 fields: [
 { id: 'roomCount', label: 'Número de cômodos', type: 'number', required: true, defaultValue: '1', helpText: 'Conte todos os cômodos que receberão rodapé.', showControls: true, step: 1 },
 { id: 'room1Length', label: 'Comprimento do cômodo', unit: 'm', type: 'number', required: true, placeholder: 'ex: 4,50', helpText: 'Medidas internas do cômodo (sem considerar paredes).', showControls: true, step: 0.1 },
 { id: 'room1Width', label: 'Largura do cômodo', unit: 'm', type: 'number', required: true, placeholder: 'ex: 3,50', helpText: 'Medidas internas do cômodo (sem considerar paredes).', showControls: true, step: 0.1 },
 { id: 'doorCount', label: 'Número total de portas', type: 'number', required: true, defaultValue: '2', helpText: 'Total de portas que receberão guarnição.', showControls: true, step: 1 },
 { id: 'doorWidth', label: 'Largura da porta', unit: 'm', type: 'number', required: true, defaultValue: '0.80', helpText: 'Medidas do vão da porta. Padrão residencial: 0,80 × 2,10m.', showControls: true, step: 0.05 },
 { id: 'doorHeight', label: 'Altura da porta', unit: 'm', type: 'number', required: true, defaultValue: '2.10', helpText: 'Medidas do vão da porta. Padrão residencial: 0,80 × 2,10m.', showControls: true, step: 0.05 }
 ],
 advancedFields: [
 { id: 'baseboardHeight', label: 'Altura do rodapé', type: 'select', options: [
 { value: '7', label: '7cm' },
 { value: '10', label: '10cm (padrão)' },
 { value: '15', label: '15cm' },
 { value: '20', label: '20cm' }
 ], defaultValue: '10', helpText: 'Altura padrão residencial: 10cm. Pé-direito alto: 15cm.' },
 { id: 'barLength', label: 'Comprimento da barra', type: 'select', options: [
 { value: '2.20', label: '2,20m' },
 { value: '2.40', label: '2,40m (padrão)' },
 { value: '2.60', label: '2,60m' }
 ], defaultValue: '2.40', helpText: 'Comprimento padrão comercial das barras.' },
 { id: 'loss', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '8', helpText: '8% padrão para cortes e emendas. Aumente para 10% em projetos complexos.', showControls: true, step: 1 }
 ],
 formula: 'Perímetro Cômodo = 2 × (Comprimento + Largura)\nRodapé Total = Perímetro × Número de Cômodos\nGuarnição por Porta = 2 × Altura + Largura\nGuarnição Total = Guarnição por Porta × Número de Portas\nBarras = ⌈(Metros Lineares × (1 + Perdas%)) ÷ Comprimento da Barra⌉',
 assumptions: [
 'Rodapé: acabamento entre piso e parede',
 'Guarnição: acabamento que cobre o encontro entre batente e parede',
 'Barras comerciais: 2,20m, 2,40m ou 2,60m',
 'Margem de 8% padrão para cortes e emendas',
 'Altura do rodapé proporcional ao pé-direito',
 'Arredondamento sempre para cima'
 ],
 calculationFn: (data) => {
 const roomCount = num(data.roomCount) || 1;
 const roomLength = num(data.room1Length);
 const roomWidth = num(data.room1Width);
 const doorCount = num(data.doorCount) || 0;
 const doorWidth = num(data.doorWidth) || 0.80;
 const doorHeight = num(data.doorHeight) || 2.10;
 const barLength = num(data.barLength) || 2.40;
 const loss = (num(data.loss) || 8) / 100;

 // Validações rigorosas
 if (roomCount < 1 || roomCount > 20) throw new Error('Número de cômodos deve estar entre 1 e 20');
 if (roomLength < 1.0 || roomLength > 20.0) throw new Error('Comprimento do cômodo deve estar entre 1,0m e 20,0m');
 if (roomWidth < 1.0 || roomWidth > 20.0) throw new Error('Largura do cômodo deve estar entre 1,0m e 20,0m');
 if (doorCount < 0 || doorCount > 50) throw new Error('Número de portas deve estar entre 0 e 50');
 if (doorCount > 0) {
 if (doorWidth < 0.60 || doorWidth > 1.50) throw new Error('Largura da porta deve estar entre 0,60m e 1,50m');
 if (doorHeight < 2.00 || doorHeight > 2.80) throw new Error('Altura da porta deve estar entre 2,00m e 2,80m');
 }

 // Cálculo do perímetro por cômodo
 const perimeterPerRoom = 2 * (roomLength + roomWidth);

 // Total de rodapé necessário
 const baseboardTotalMeters = perimeterPerRoom * roomCount;

 // Guarnição por porta (perímetro do vão)
 const trimPerDoor = doorCount > 0 ? (2 * doorHeight + doorWidth) : 0;

 // Total de guarnição necessária
 const trimTotalMeters = trimPerDoor * doorCount;

 // Aplicar perdas
 const baseboardWithLoss = baseboardTotalMeters * (1 + loss);
 const trimWithLoss = trimTotalMeters * (1 + loss);

 // Barras necessárias
 const baseboardBars = Math.ceil(baseboardWithLoss / barLength);
 const trimBars = Math.ceil(trimWithLoss / barLength);

 // Total geral
 const totalBars = baseboardBars + trimBars;
 const totalLinearMeters = baseboardTotalMeters + trimTotalMeters;

 // Alertas e recomendações
 let alerts = [];
 let alertLevel = 'success';

 // Alerta para cômodo muito grande
 if (perimeterPerRoom > 50) {
 alerts.push('⚠️ Cômodo muito grande: verifique se as medidas estão corretas');
 alertLevel = 'warning';
 }

 // Alerta para muitos cômodos ou portas
 if (roomCount > 10 || doorCount > 20) {
 alerts.push('🔍 Muitos cômodos ou portas: verifique as medidas');
 if (alertLevel === 'success') alertLevel = 'warning';
 }

 // Recomendação para altura do rodapé
 const baseboardHeight = num(data.baseboardHeight) || 10;
 if (baseboardHeight === 7) {
 alerts.push('📏 Rodapé 7cm: ideal para pé-direito baixo (<2,50m)');
 } else if (baseboardHeight === 15) {
 alerts.push('📏 Rodapé 15cm: ideal para pé-direito alto (>2,70m)');
 } else if (baseboardHeight === 20) {
 alerts.push('📏 Rodapé 20cm: ideal para pé-direito muito alto (>3,00m)');
 }

 // Configuração ideal
 if (roomCount <= 5 && doorCount <= 10 && perimeterPerRoom <= 30) {
 alerts.push('✅ Dimensionamento adequado para projeto residencial');
 }

 // Custo estimado
 const baseboardPrice = baseboardHeight <= 10 ? 25 : baseboardHeight <= 15 ? 35 : 45; // Preço por altura
 const trimPrice = 30; // R$ 30 por barra de guarnição
 const totalCost = (baseboardBars * baseboardPrice) + (trimBars * trimPrice);

 // Estimativa de tempo de instalação
 const installationTimeHours = Math.ceil(totalLinearMeters / 10); // 10m lineares por hora

 // Summary com alertas
 let summary = `Você precisará de ${baseboardBars} barras para rodapé e ${trimBars} barras para guarnição. Total: ${totalBars} barras.`;
 if (alerts.length > 0 && alertLevel !== 'success') {
 summary += ` ${alerts[0]}`;
 }

 return {
 summary,
 details: [
 { label: 'Número de cômodos', value: `${roomCount} cômodo${roomCount > 1 ? 's' : ''}` },
 { label: 'Perímetro por cômodo', value: `${perimeterPerRoom.toFixed(2)} m` },
 { label: 'Metros lineares de rodapé', value: `${baseboardTotalMeters.toFixed(1)} m` },
 { label: 'Barras de rodapé', value: `${baseboardBars} barras de ${barLength}m`, highlight: true },
 ...(doorCount > 0 ? [
 { label: 'Número de portas', value: `${doorCount} porta${doorCount > 1 ? 's' : ''}` },
 { label: 'Guarnição por porta', value: `${trimPerDoor.toFixed(2)} m` },
 { label: 'Metros lineares de guarnição', value: `${trimTotalMeters.toFixed(1)} m` },
 { label: 'Barras de guarnição', value: `${trimBars} barras de ${barLength}m`, highlight: true }
 ] : []),
 { label: 'Total de barras', value: `${totalBars} barras`, highlight: true },
 { label: 'Total de metros lineares', value: `${totalLinearMeters.toFixed(1)} m` },
 { label: 'Perda aplicada', value: `${((baseboardWithLoss + trimWithLoss) - totalLinearMeters).toFixed(1)} m (${(loss * 100).toFixed(0)}%)` },
 { label: 'Altura do rodapé', value: `${baseboardHeight}cm` },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Tempo de instalação', value: `${installationTimeHours} horas` },
 ...(alerts.length > 1 ? alerts.slice(1).map(alert => ({ label: 'Dica', value: alert })) : [])
 ],
 alertLevel,
 alerts
 };
 },
 seo: {
 title: 'Calculadora de Rodapé e Guarnição - Cálculo Técnico Preciso',
 content: `
 <h2>Como Calcular Rodapé e Guarnição com Precisão</h2>
 <p>Nossa calculadora profissional considera perímetro dos cômodos, dimensões das portas, altura do rodapé e perdas técnicas. Cálculos precisos para acabamentos internos residenciais e comerciais.</p>

 <h3>Fórmulas de Cálculo</h3>
 <ul>
 <li><strong>Perímetro do Cômodo:</strong> 2 × (Comprimento + Largura)</li>
 <li><strong>Rodapé Total:</strong> Perímetro × Número de Cômodos</li>
 <li><strong>Guarnição por Porta:</strong> 2 × Altura + Largura</li>
 <li><strong>Barras Necessárias:</strong> ⌈Metros Lineares × (1 + Perdas%) ÷ Comprimento da Barra⌉</li>
 </ul>

 <h3>Alturas de Rodapé Recomendadas</h3>
 <ul>
 <li><strong>7cm:</strong> Pé-direito baixo (&lt;2,50m)</li>
 <li><strong>10cm:</strong> Pé-direito padrão (2,50-2,70m) - Mais comum</li>
 <li><strong>15cm:</strong> Pé-direito alto (2,70-3,00m)</li>
 <li><strong>20cm:</strong> Pé-direito muito alto (&gt;3,00m)</li>
 </ul>

 <h3>Comprimentos de Barras Comerciais</h3>
 <ul>
 <li><strong>2,20m:</strong> Padrão econômico</li>
 <li><strong>2,40m:</strong> Padrão mais comum</li>
 <li><strong>2,60m:</strong> Padrão para reduzir emendas</li>
 </ul>

 <h3>Dicas de Instalação</h3>
 <ul>
 <li>Margem de 8% padrão para cortes e emendas</li>
 <li>Rodapé: acabamento entre piso e parede</li>
 <li>Guarnição: acabamento que cobre batente e parede</li>
 <li>Sempre arredonde para cima o número de barras</li>
 </ul>

 <p>Use nossa calculadora para dimensionamento preciso e economia em seu projeto de acabamento.</p>
 `
 }
 },
};
