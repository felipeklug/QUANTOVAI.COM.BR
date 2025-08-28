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
 description: '% e graus com alerta de mínimo.',
 icon: RoofTilesPremiumIcon,
 fields: [
 { id: 'run', label: 'Avanço horizontal (metade do vão)', unit: 'm', type: 'number', required: true, placeholder: 'ex: 5,00', helpText: 'Distância da parede até o centro do telhado.', showControls: true, step: 0.1 },
 { id: 'rise', label: 'Altura vertical (cumeeira)', unit: 'm', type: 'number', required: true, placeholder: 'ex: 1,50', helpText: 'Altura do ponto mais alto do telhado.', showControls: true, step: 0.1 },
 ],
 advancedFields: [
 { id: 'tileType', label: 'Tipo de telha (para referência)', type: 'select', options: [
 { value: '30', label: 'Cerâmica (mín. 30%)' }, { value: '15', label: 'Fibrocimento (mín. 15%)' }, { value: '5', label: 'Metálica (mín. 5%)' }
 ], helpText: 'A inclinação mínima varia por telha.' }
 ],
 formula: 'Inclinação (%) = (Altura / Avanço) × 100\nInclinação (°) = arctan(Altura / Avanço)',
 assumptions: ['Cálculo baseado em um telhado de duas águas simétrico.', 'A verificação com o tipo de telha é apenas uma referência.', 'Consulte sempre o manual do fabricante da telha.'],
 calculationFn: (data) => {
 const slopePercent = (num(data.rise) / num(data.run)) * 100;
 const slopeDegrees = Math.atan(num(data.rise) / num(data.run)) * (180 / Math.PI);
 const minRequired = num(data.tileType) || 0;
 let recommendation = '';
 if (minRequired > 0) {
 recommendation = slopePercent >= minRequired ? '✓ Adequada' : '✗ Insuficiente';
 }
 return {
 summary: `A inclinação é de ${slopePercent.toFixed(1)}% ou ${slopeDegrees.toFixed(1)}°.`,
 details: [
 { label: 'Inclinação em porcentagem', value: `${slopePercent.toFixed(2)}%`, highlight: true },
 { label: 'Inclinação em graus', value: `${slopeDegrees.toFixed(2)}°`, highlight: true },
 ...(minRequired > 0 ? [{ label: `Recomendação para telha (${minRequired}%)`, value: recommendation, highlight: slopePercent >= minRequired }] : [])
 ]
 };
 },
 seo: {
 title: 'Entendendo a Inclinação do Telhado',
 content: `<p>A inclinação correta é crucial para o escoamento da água e para a durabilidade do telhado. Uma inclinação abaixo do recomendado pelo fabricante pode causar infiltrações e sobrecarga na estrutura.</p>`
 }
 },
 'wallpaper': {
 id: 'wallpaper',
 title: 'Papel de Parede',
 description: 'Calcule rolos e cola necessários.',
 icon: WallpaperPremiumIcon,
 fields: [
 { id: 'wallHeight', label: 'Altura da parede', unit: 'm', type: 'number', required: true, placeholder: 'ex: 2,7', helpText: 'Altura do pé direito', showControls: true, step: 0.1 },
 { id: 'wallPerimeter', label: 'Perímetro das paredes', unit: 'm', type: 'number', required: true, placeholder: 'ex: 18,5', helpText: 'Soma de todas as paredes a revestir', showControls: true, step: 0.5 },
 { id: 'doors', label: 'Número de portas', type: 'number', required: true, defaultValue: '2', helpText: 'Portas não recebem papel', showControls: true, step: 1 },
 { id: 'windows', label: 'Número de janelas', type: 'number', required: true, defaultValue: '3', helpText: 'Janelas não recebem papel', showControls: true, step: 1 }
 ],
 advancedFields: [
 { id: 'paperWidth', label: 'Largura do papel', unit: 'cm', type: 'number', defaultValue: '53', helpText: 'Largura padrão é 53cm', showControls: true, step: 1 },
 { id: 'paperLength', label: 'Comprimento do rolo', unit: 'm', type: 'number', defaultValue: '10', helpText: 'Comprimento padrão é 10m', showControls: true, step: 0.5 },
 { id: 'waste', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '15', helpText: 'Padrão de 15% para recortes e emendas', showControls: true, step: 1 }
 ],
 formula: 'Área Líquida = (Perímetro × Altura) - (Portas × 1,5m²) - (Janelas × 1m²)\nRolos = Área Líquida ÷ (Largura × Comprimento do Rolo)',
 assumptions: [
 'Largura padrão do papel: 53cm',
 'Comprimento padrão do rolo: 10m',
 'Área padrão: porta = 1,5m², janela = 1m²',
 'Inclui margem de 15% para perdas e emendas'
 ],
 calculationFn: (data) => {
 const height = num(data.wallHeight);
 const perimeter = num(data.wallPerimeter);
 const doors = num(data.doors) || 0;
 const windows = num(data.windows) || 0;
 const paperWidth = (num(data.paperWidth) || 53) / 100; // converter cm para m
 const paperLength = num(data.paperLength) || 10;
 const waste = (num(data.waste) || 15) / 100;

 // Área das aberturas
 const doorArea = doors * 1.5; // 1,5m² por porta
 const windowArea = windows * 1.0; // 1m² por janela

 // Área líquida
 const totalArea = perimeter * height;
 const netArea = Math.max(0, totalArea - doorArea - windowArea);

 // Área com margem de perdas
 const areaWithWaste = netArea * (1 + waste);

 // Área por rolo
 const areaPerRoll = paperWidth * paperLength;

 // Número de rolos
 const rollsNeeded = Math.ceil(areaWithWaste / areaPerRoll);

 // Cola necessária (aproximadamente 200g por m²)
 const glueKg = Math.ceil((netArea * 0.2) * 10) / 10; // arredondar para 100g

 // Custo estimado
 const rollPrice = 45; // R$ 45 por rolo
 const gluePrice = 25; // R$ 25 por kg
 const totalCost = (rollsNeeded * rollPrice) + (glueKg * gluePrice);

 return {
 summary: `Você precisará de ${rollsNeeded} rolos de papel de parede e ${glueKg}kg de cola.`,
 details: [
 { label: 'Área total das paredes', value: `${totalArea.toFixed(1)} m²` },
 { label: 'Área líquida (sem aberturas)', value: `${netArea.toFixed(1)} m²` },
 { label: 'Área com margem de perdas', value: `${areaWithWaste.toFixed(1)} m²` },
 { label: 'Rolos necessários', value: `${rollsNeeded} rolos`, highlight: true },
 { label: 'Cola necessária', value: `${glueKg}kg`, highlight: true },
 { label: 'Área por rolo', value: `${areaPerRoll.toFixed(2)} m²` },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Margem de perdas', value: `${(waste * 100).toFixed(0)}%` }
 ]
 };
 },
 seo: {
 title: 'Como Calcular Papel de Parede',
 content: `<p>O cálculo correto do papel de parede evita desperdício e garante cobertura completa. Nossa calculadora considera altura, perímetro e aberturas.</p><p>Sempre compre rolos do mesmo lote para evitar diferenças de cor e textura.</p>`
 }
 },
 'mortar': {
 id: 'mortar',
 title: 'Argamassa',
 description: 'Calcule sacos de argamassa para assentamento.',
 icon: MortarPremiumIcon,
 fields: [
 { id: 'area', label: 'Área a revestir', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 35,5', helpText: 'Área total das paredes ou pisos', showControls: true, step: 0.5 },
 { id: 'thickness', label: 'Espessura da argamassa', unit: 'mm', type: 'select', required: true, options: [
 { value: '5', label: '5mm (assentamento de azulejos)' },
 { value: '10', label: '10mm (chapisco/emboço fino)' },
 { value: '15', label: '15mm (emboço padrão)' },
 { value: '20', label: '20mm (emboço grosso)' },
 { value: '30', label: '30mm (reboco grosso)' }
 ], defaultValue: '15' },
 { id: 'mortarType', label: 'Tipo de argamassa', type: 'select', required: true, options: [
 { value: 'laying', label: 'Assentamento (pisos/azulejos)' },
 { value: 'coating', label: 'Revestimento (paredes)' },
 { value: 'structural', label: 'Estrutural (blocos/tijolos)' }
 ], defaultValue: 'coating' }
 ],
 advancedFields: [
 { id: 'waste', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: 'Padrão de 10% para perdas', showControls: true, step: 1 },
 { id: 'surface', label: 'Tipo de superfície', type: 'select', options: [
 { value: 'smooth', label: 'Lisa (bloco de concreto)' },
 { value: 'medium', label: 'Média (tijolo comum)' },
 { value: 'rough', label: 'Rugosa (tijolo baiano)' }
 ], defaultValue: 'medium', helpText: 'Superfícies rugosas consomem mais argamassa' }
 ],
 formula: 'Volume = Área × Espessura × Fator de Superfície\nSacos = Volume ÷ Rendimento por Saco',
 assumptions: [
 'Rendimento baseado em sacos de 20kg',
 'Considera diferentes tipos de superfície',
 'Inclui margem para perdas e retoques',
 'Valores baseados em fabricantes nacionais'
 ],
 calculationFn: (data) => {
 const area = num(data.area);
 const thickness = num(data.thickness) / 1000; // converter mm para metros
 const waste = (num(data.waste) || 10) / 100;

 // Fator de correção por tipo de superfície
 const surfaceMultiplier = {
 'smooth': 1.0,
 'medium': 1.1,
 'rough': 1.2
 }[data.surface] || 1.1;

 // Rendimento por tipo de argamassa (m³ por saco de 20kg)
 const yields = {
 'laying': 0.012, // 12L por saco
 'coating': 0.015, // 15L por saco
 'structural': 0.010 // 10L por saco
 };

 const yieldPerBag = yields[data.mortarType] || yields['coating'];

 // Cálculo do volume
 const baseVolume = area * thickness;
 const adjustedVolume = baseVolume * surfaceMultiplier * (1 + waste);

 // Número de sacos necessários
 const bagsNeeded = Math.ceil(adjustedVolume / yieldPerBag);

 // Custo estimado
 const bagPrice = 12; // R$ 12 por saco de 20kg
 const totalCost = bagsNeeded * bagPrice;

 // Dicas por tipo
 const tips = {
 'laying': 'Para assentamento: use desempenadeira dentada apropriada para o tamanho da peça.',
 'coating': 'Para revestimento: aplique em camadas uniformes, sarrafeando bem.',
 'structural': 'Para estrutural: mantenha juntas uniformes e prumo das paredes.'
 };

 const tip = tips[data.mortarType] || tips['coating'];

 return {
 summary: `Você precisará de ${bagsNeeded} sacos de argamassa de 20kg.`,
 details: [
 { label: 'Área a revestir', value: `${area.toFixed(1)} m²` },
 { label: 'Espessura aplicada', value: `${num(data.thickness)}mm` },
 { label: 'Volume de argamassa', value: `${(adjustedVolume * 1000).toFixed(0)}L` },
 { label: 'Sacos necessários (20kg)', value: `${bagsNeeded} sacos`, highlight: true },
 { label: 'Rendimento por saco', value: `${(yieldPerBag * 1000).toFixed(0)}L` },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Margem de perdas', value: `${(waste * 100).toFixed(0)}%` },
 { label: 'Dica de aplicação', value: tip }
 ]
 };
 },
 seo: {
 title: 'Como Calcular Argamassa para Revestimento',
 content: `<p>O cálculo correto da argamassa evita desperdício e garante qualidade no acabamento. Nossa calculadora considera espessura, tipo de superfície e aplicação.</p><p>Lembre-se: a preparação da superfície é fundamental para aderência e durabilidade do revestimento.</p>`
 }
 },
 'concrete': {
 id: 'concrete',
 title: 'Concreto',
 description: 'Calcule materiais para concreto.',
 icon: ConcretePremiumIcon,
 fields: [
 { id: 'volume', label: 'Volume de concreto', unit: 'm³', type: 'number', required: true, placeholder: 'ex: 2,5', helpText: 'Comprimento × largura × espessura', showControls: true, step: 0.1 },
 { id: 'strength', label: 'Resistência do concreto', type: 'select', required: true, options: [
 { value: 'fck15', label: 'FCK 15 MPa (uso geral)' },
 { value: 'fck20', label: 'FCK 20 MPa (lajes, vigas)' },
 { value: 'fck25', label: 'FCK 25 MPa (estrutural)' },
 { value: 'fck30', label: 'FCK 30 MPa (alta resistência)' }
 ], defaultValue: 'fck20' },
 { id: 'mixType', label: 'Tipo de preparo', type: 'select', required: true, options: [
 { value: 'manual', label: 'Manual (betoneira pequena)' },
 { value: 'machine', label: 'Mecânico (betoneira grande)' },
 { value: 'ready', label: 'Concreto usinado' }
 ], defaultValue: 'machine' }
 ],
 advancedFields: [
 { id: 'waste', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '5', helpText: 'Padrão de 5% para perdas e sobras', showControls: true, step: 1 },
 { id: 'aggregateSize', label: 'Tamanho do agregado', type: 'select', options: [
 { value: 'small', label: 'Brita 0 (4,8-9,5mm)' },
 { value: 'medium', label: 'Brita 1 (9,5-19mm)' },
 { value: 'large', label: 'Brita 2 (19-25mm)' }
 ], defaultValue: 'medium', helpText: 'Brita 1 é mais comum para uso geral' }
 ],
 formula: 'Traço varia por resistência: FCK20 = 1:2:3 (cimento:areia:brita)\nMateriais = Volume × Traço × Fator de Conversão',
 assumptions: [
 'Traços baseados em normas técnicas (ABNT)',
 'Considera densidade dos materiais',
 'Inclui margem para perdas e sobras',
 'Água: aproximadamente 50% do peso do cimento'
 ],
 calculationFn: (data) => {
 const volume = num(data.volume);
 const waste = (num(data.waste) || 5) / 100;
 const adjustedVolume = volume * (1 + waste);

 // Traços por resistência (cimento:areia:brita em volume)
 const mixes = {
 'fck15': { cement: 1, sand: 2.5, gravel: 3.5, name: 'FCK 15 MPa' },
 'fck20': { cement: 1, sand: 2, gravel: 3, name: 'FCK 20 MPa' },
 'fck25': { cement: 1, sand: 1.5, gravel: 2.5, name: 'FCK 25 MPa' },
 'fck30': { cement: 1, sand: 1.2, gravel: 2.2, name: 'FCK 30 MPa' }
 };

 const mix = mixes[data.strength] || mixes['fck20'];
 const totalParts = mix.cement + mix.sand + mix.gravel;

 // Cálculo dos materiais
 const cementVolume = (adjustedVolume * mix.cement) / totalParts;
 const sandVolume = (adjustedVolume * mix.sand) / totalParts;
 const gravelVolume = (adjustedVolume * mix.gravel) / totalParts;

 // Conversões para unidades práticas
 const cementBags = Math.ceil(cementVolume * 28.57); // 1m³ = ~28,57 sacos de 50kg
 const sandM3 = sandVolume;
 const gravelM3 = gravelVolume;
 const waterLiters = cementBags * 25; // ~25L por saco de cimento

 // Custos estimados (valores aproximados)
 const costs = {
 cement: cementBags * 35, // R$ 35 por saco
 sand: sandM3 * 45, // R$ 45 por m³
 gravel: gravelM3 * 55, // R$ 55 por m³
 water: waterLiters * 0.01 // R$ 0,01 por litro
 };
 const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);

 let preparationTip = '';
 if (data.mixType === 'manual') {
 preparationTip = 'Para preparo manual: misture primeiro os materiais secos, depois adicione água gradualmente.';
 } else if (data.mixType === 'machine') {
 preparationTip = 'Para betoneira: adicione brita e água, depois cimento e areia.';
 } else {
 preparationTip = 'Concreto usinado: especifique FCK, slump e aditivos necessários.';
 }

 return {
 summary: `Para ${volume}m³ de ${mix.name}, você precisará de ${cementBags} sacos de cimento, ${sandM3.toFixed(1)}m³ de areia e ${gravelM3.toFixed(1)}m³ de brita.`,
 details: [
 { label: 'Volume com perdas', value: `${adjustedVolume.toFixed(2)} m³` },
 { label: 'Cimento (sacos 50kg)', value: `${cementBags} sacos`, highlight: true },
 { label: 'Areia média', value: `${sandM3.toFixed(1)} m³`, highlight: true },
 { label: 'Brita', value: `${gravelM3.toFixed(1)} m³`, highlight: true },
 { label: 'Água aproximada', value: `${waterLiters}L` },
 { label: 'Traço utilizado', value: `1:${mix.sand}:${mix.gravel}` },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Dica de preparo', value: preparationTip }
 ]
 };
 },
 seo: {
 title: 'Como Calcular Materiais para Concreto',
 content: `<p>O cálculo correto dos materiais para concreto garante resistência e economia. Nossa calculadora usa traços técnicos baseados nas normas ABNT.</p><p>Lembre-se: a qualidade da água e dos agregados influencia diretamente na resistência final do concreto.</p>`
 }
 },
 'paint': {
 id: 'paint',
 title: 'Pintura',
 description: 'Calcule a quantidade de tinta necessária.',
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
 description: 'Calcule rolos de grama ou sementes.',
 icon: GrassPremiumIcon,
 fields: [
 { id: 'area', label: 'Área do gramado', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 150,5', helpText: 'Área total a ser gramada', showControls: true, step: 0.5 },
 { id: 'grassType', label: 'Tipo de grama', type: 'select', required: true, options: [
 { value: 'roll', label: 'Grama em rolo (pronta)' },
 { value: 'seed', label: 'Sementes de grama' },
 { value: 'plug', label: 'Mudas/Placas' }
 ], defaultValue: 'roll' },
 { id: 'grassVariety', label: 'Variedade da grama', type: 'select', required: true, options: [
 { value: 'bermuda', label: 'Bermuda (sol pleno)' },
 { value: 'sao-carlos', label: 'São Carlos (meia sombra)' },
 { value: 'esmeralda', label: 'Esmeralda (ornamental)' },
 { value: 'santo-agostinho', label: 'Santo Agostinho (sombra)' },
 { value: 'coreana', label: 'Coreana (resistente)' }
 ], defaultValue: 'sao-carlos' }
 ],
 advancedFields: [
 { id: 'waste', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: 'Padrão de 10% para recortes e falhas', showControls: true, step: 1 },
 { id: 'soilPrep', label: 'Preparação do solo', type: 'select', options: [
 { value: 'basic', label: 'Básica (limpeza e nivelamento)' },
 { value: 'complete', label: 'Completa (terra, adubo, drenagem)' }
 ], defaultValue: 'basic', helpText: 'Influencia no custo total' }
 ],
 formula: 'Quantidade = Área × (1 + Margem de Perdas)\nRolos = Área ÷ Área por Rolo\nSementes = Área × Taxa de Semeadura',
 assumptions: [
 'Rolo padrão: 0,625m² (1,25m × 0,5m)',
 'Taxa de semeadura: 30-50g/m² conforme variedade',
 'Inclui margem para perdas e recortes',
 'Preços baseados em valores médios do mercado'
 ],
 calculationFn: (data) => {
 const area = num(data.area);
 const waste = (num(data.waste) || 10) / 100;
 const areaWithWaste = area * (1 + waste);

 // Área por rolo padrão
 const areaPerRoll = 0.625; // 1,25m × 0,5m

 // Cálculos por tipo
 let quantity = 0;
 let unit = '';
 let price = 0;
 let seedRate = 0;

 if (data.grassType === 'roll') {
 quantity = Math.ceil(areaWithWaste / areaPerRoll);
 unit = 'rolos';
 price = quantity * 8; // R$ 8 por rolo
 } else if (data.grassType === 'seed') {
 // Taxa de semeadura por variedade (g/m²)
 const seedRates = {
 'bermuda': 30,
 'sao-carlos': 40,
 'esmeralda': 35,
 'santo-agostinho': 45,
 'coreana': 35
 };
 seedRate = seedRates[data.grassVariety] || 35;
 quantity = Math.ceil((areaWithWaste * seedRate) / 1000 * 10) / 10; // kg, arredondado para 100g
 unit = 'kg de sementes';
 price = quantity * 120; // R$ 120 por kg
 } else { // plugs
 quantity = Math.ceil(areaWithWaste * 4); // 4 mudas por m²
 unit = 'mudas/placas';
 price = quantity * 2; // R$ 2 por muda
 }

 // Custo adicional para preparação completa do solo
 let soilCost = 0;
 if (data.soilPrep === 'complete') {
 soilCost = area * 15; // R$ 15 por m² para preparação completa
 }

 const totalCost = price + soilCost;

 // Dicas por variedade
 const varietyTips = {
 'bermuda': 'Ideal para sol pleno, resistente ao pisoteio.',
 'sao-carlos': 'Boa para meia sombra, crescimento médio.',
 'esmeralda': 'Ornamental, folhas finas, pouco pisoteio.',
 'santo-agostinho': 'Tolera sombra, folhas largas.',
 'coreana': 'Muito resistente, ideal para áreas de tráfego.'
 };

 const tip = varietyTips[data.grassVariety] || '';

 return {
 summary: `Para ${area}m² você precisará de ${quantity} ${unit}.`,
 details: [
 { label: 'Área do gramado', value: `${area.toFixed(1)} m²` },
 { label: 'Área com margem', value: `${areaWithWaste.toFixed(1)} m²` },
 { label: 'Quantidade necessária', value: `${quantity} ${unit}`, highlight: true },
 { label: 'Custo da grama', value: `R$ ${price.toFixed(0)}` },
 ...(soilCost > 0 ? [{ label: 'Custo preparação solo', value: `R$ ${soilCost.toFixed(0)}` }] : []),
 { label: 'Custo total estimado', value: `R$ ${totalCost.toFixed(0)}`, highlight: true },
 ...(seedRate > 0 ? [{ label: 'Taxa de semeadura', value: `${seedRate}g/m²` }] : []),
 { label: 'Dica da variedade', value: tip }
 ]
 };
 },
 seo: {
 title: 'Como Calcular Grama para Jardim',
 content: `<p>O cálculo correto da grama garante cobertura uniforme e economia. Nossa calculadora considera tipo, variedade e preparação do solo.</p><p>A escolha da variedade deve considerar exposição solar, uso e manutenção desejada.</p>`
 }
 },
 'ac-btus': {
 id: 'ac-btus',
 title: 'Ar Condicionado',
 description: 'Calcule os BTUs ideais para seu ambiente.',
 icon: ACPremiumIcon,
 fields: [
 { id: 'area', label: 'Área do ambiente', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 25,5', helpText: 'Comprimento × largura do cômodo', showControls: true, step: 0.5 },
 { id: 'people', label: 'Número de pessoas', type: 'number', required: true, defaultValue: '2', helpText: 'Quantidade média de pessoas no ambiente', showControls: true, step: 1 },
 { id: 'sunExposure', label: 'Exposição solar', type: 'select', required: true, options: [
 { value: 'low', label: 'Pouca (face sul, sombra)' },
 { value: 'medium', label: 'Média (face leste/oeste)' },
 { value: 'high', label: 'Muita (face norte, sol direto)' }
 ], defaultValue: 'medium' },
 { id: 'roomType', label: 'Tipo do ambiente', type: 'select', required: true, options: [
 { value: 'bedroom', label: 'Quarto' },
 { value: 'living', label: 'Sala de estar' },
 { value: 'kitchen', label: 'Cozinha' },
 { value: 'office', label: 'Escritório' }
 ], defaultValue: 'living' }
 ],
 advancedFields: [
 { id: 'ceiling', label: 'Altura do teto', unit: 'm', type: 'number', defaultValue: '2.7', helpText: 'Altura padrão é 2,7m', showControls: true, step: 0.1 },
 { id: 'appliances', label: 'Equipamentos eletrônicos', type: 'select', options: [
 { value: 'few', label: 'Poucos (TV, alguns aparelhos)' },
 { value: 'normal', label: 'Normal (TV, computador, etc)' },
 { value: 'many', label: 'Muitos (home office, gaming)' }
 ], defaultValue: 'normal', helpText: 'Equipamentos geram calor adicional' }
 ],
 formula: 'BTU = (Área × Fator Base) + (Pessoas × 600) + Ajustes por Exposição Solar + Ajustes por Tipo de Ambiente',
 assumptions: [
 'Cálculo baseado em normas técnicas brasileiras',
 'Considera clima tropical brasileiro',
 'Inclui margem de segurança de 10%',
 'Para ambientes muito grandes (>50m²), considere múltiplos aparelhos'
 ],
 calculationFn: (data) => {
 const area = num(data.area);
 const people = num(data.people) || 2;
 const ceiling = num(data.ceiling) || 2.7;

 // Fator base por m² (BTU/m²)
 let baseFactor = 600; // Padrão para clima tropical

 // Ajuste por altura do teto
 if (ceiling > 3.0) baseFactor += 100;
 else if (ceiling < 2.5) baseFactor -= 50;

 // Ajuste por exposição solar
 const sunMultiplier = {
 'low': 0.9,
 'medium': 1.0,
 'high': 1.2
 }[data.sunExposure] || 1.0;

 // Ajuste por tipo de ambiente
 const roomMultiplier = {
 'bedroom': 0.9,
 'living': 1.0,
 'kitchen': 1.3,
 'office': 1.1
 }[data.roomType] || 1.0;

 // Ajuste por equipamentos
 const appliancesBtu = {
 'few': 300,
 'normal': 600,
 'many': 1200
 }[data.appliances] || 600;

 // Cálculo principal
 let totalBtu = (area * baseFactor * sunMultiplier * roomMultiplier) + (people * 600) + appliancesBtu;

 // Margem de segurança de 10%
 totalBtu *= 1.1;

 // Arredondar para múltiplos de 1000
 totalBtu = Math.round(totalBtu / 1000) * 1000;

 // Determinar capacidade recomendada
 let capacity = '';
 if (totalBtu <= 7500) capacity = '7.500 BTU/h';
 else if (totalBtu <= 9000) capacity = '9.000 BTU/h';
 else if (totalBtu <= 12000) capacity = '12.000 BTU/h';
 else if (totalBtu <= 18000) capacity = '18.000 BTU/h';
 else if (totalBtu <= 24000) capacity = '24.000 BTU/h';
 else if (totalBtu <= 30000) capacity = '30.000 BTU/h';
 else capacity = `${Math.ceil(totalBtu / 6000) * 6000} BTU/h (considere múltiplos aparelhos)`;

 return {
 summary: `Recomendamos um ar condicionado de ${capacity}.`,
 details: [
 { label: 'BTUs calculados', value: `${totalBtu.toLocaleString('pt-BR')} BTU/h`, highlight: true },
 { label: 'Capacidade recomendada', value: capacity, highlight: true },
 { label: 'Área do ambiente', value: `${area.toFixed(1)} m²` },
 { label: 'Pessoas no ambiente', value: `${people} pessoa${people > 1 ? 's' : ''}` },
 { label: 'Fator base aplicado', value: `${Math.round(baseFactor * sunMultiplier * roomMultiplier)} BTU/m²` },
 { label: 'Margem de segurança', value: '10% incluída' }
 ]
 };
 },
 seo: {
 title: 'Como Calcular BTUs do Ar Condicionado',
 content: `<p>O cálculo correto dos BTUs é essencial para escolher o ar condicionado ideal. Nossa calculadora considera área, número de pessoas, exposição solar e tipo de ambiente.</p><p>Para ambientes brasileiros, recomendamos entre 550-800 BTU/m², dependendo das condições específicas.</p>`
 }
 },

 'grout': {
 id: 'grout',
 title: 'Rejunte',
 description: 'Calcule kg de rejunte por m².',
 icon: GroutPremiumIcon,
 fields: [
 { id: 'area', label: 'Área total', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 25,5', helpText: 'Área total a ser rejuntada', showControls: true, step: 0.5 },
 { id: 'tileWidth', label: 'Largura da peça', unit: 'mm', type: 'number', required: true, placeholder: 'ex: 600', helpText: 'Largura da peça em milímetros', showControls: true, step: 10 },
 { id: 'tileHeight', label: 'Comprimento da peça', unit: 'mm', type: 'number', required: true, placeholder: 'ex: 600', helpText: 'Comprimento da peça em milímetros', showControls: true, step: 10 },
 { id: 'jointWidth', label: 'Largura da junta', unit: 'mm', type: 'number', required: true, defaultValue: '3', helpText: 'Largura da junta entre peças', showControls: true, step: 0.5 },
 { id: 'jointDepth', label: 'Profundidade da junta', unit: 'mm', type: 'number', required: true, defaultValue: '8', helpText: 'Profundidade ≈ espessura da peça', showControls: true, step: 1 }
 ],
 advancedFields: [
 { id: 'density', label: 'Densidade do rejunte', unit: 'kg/dm³', type: 'number', defaultValue: '1.6', helpText: 'Para rejunte cimentício padrão', showControls: true, step: 0.1 },
 { id: 'loss', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '5', helpText: 'Padrão de 5% para rejunte', showControls: true, step: 1 }
 ],
 formula: 'kg/m² = (L+C)/(L×C) × J × E × d\nL=comprimento, C=largura, J=junta, E=profundidade, d=densidade',
 assumptions: [
 'Fórmula baseada em normas técnicas de rejuntamento',
 'Densidade padrão: 1,6 kg/dm³ para rejunte cimentício',
 'Margem de 5% para perdas e desperdícios',
 'Arredondamento para cima nas embalagens'
 ],
 calculationFn: (data) => {
 try {
 const result = calcGrout({
 area_m2: num(data.area),
 tile_w_mm: num(data.tileWidth),
 tile_h_mm: num(data.tileHeight),
 joint_mm: num(data.jointWidth) || 3,
 depth_mm: num(data.jointDepth) || 8,
 density_kg_dm3: num(data.density) || 1.6,
 loss_percent: num(data.loss) || 5
 });

 return {
 summary: `Você precisará de ${result.kg_com_perda.toFixed(2)}kg de rejunte. Sugestão: ${result.bags['5kg']} sacos de 5kg.`,
 details: [
 { label: 'Área total', value: `${num(data.area).toFixed(1)} m²` },
 { label: 'Tamanho da peça', value: `${data.tileWidth}×${data.tileHeight} mm` },
 { label: 'Largura da junta', value: `${data.jointWidth || 3} mm` },
 { label: 'Consumo por m²', value: `${(result.kg_total / num(data.area)).toFixed(3)} kg/m²` },
 { label: 'Total sem perdas', value: `${result.kg_total.toFixed(2)} kg` },
 { label: 'Total com perdas', value: `${result.kg_com_perda.toFixed(2)} kg`, highlight: true },
 { label: 'Sacos de 1kg', value: `${result.bags['1kg']} unidades` },
 { label: 'Sacos de 5kg', value: `${result.bags['5kg']} unidades`, highlight: true },
 { label: 'Sacos de 20kg', value: `${result.bags['20kg']} unidades` },
 { label: 'Fórmula aplicada', value: result.formula }
 ]
 };
 } catch (error) {
 return {
 summary: 'Erro no cálculo. Verifique os valores informados.',
 details: [{ label: 'Erro', value: error.message }]
 };
 }
 },
 seo: {
 title: 'Como Calcular Rejunte por m²',
 content: `<p>O cálculo preciso do rejunte evita desperdício e garante acabamento perfeito. Nossa calculadora usa a fórmula técnica oficial considerando dimensões das peças e juntas.</p><p>Para peças 60×60cm com junta de 3mm, o consumo médio é de 0,128 kg/m².</p>`
 }
 },

 'roof-tiles': {
 id: 'roof-tiles',
 title: 'Telhas',
 description: 'Calcule peças de telha por m².',
 icon: RoofTilesPremiumIcon,
 fields: [
 { id: 'area', label: 'Área do telhado', unit: 'm²', type: 'number', required: true, placeholder: 'ex: 120,5', helpText: 'Área total da cobertura', showControls: true, step: 0.5 },
 { id: 'tileType', label: 'Tipo de telha', type: 'select', required: true, options: [
 { value: 'romana', label: 'Romana (16 peças/m²)' },
 { value: 'portuguesa', label: 'Portuguesa (16 peças/m²)' },
 { value: 'francesa', label: 'Francesa (17 peças/m²)' },
 { value: 'colonial', label: 'Colonial (24 peças/m²)' },
 { value: 'concreto', label: 'Concreto (10,5 peças/m²)' }
 ], defaultValue: 'romana' }
 ],
 advancedFields: [
 { id: 'customPiecesPerM2', label: 'Peças por m² (personalizado)', unit: 'peças/m²', type: 'number', helpText: 'Deixe vazio para usar valor padrão do tipo', showControls: true, step: 0.5 },
 { id: 'loss', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: 'Padrão de 10% para telhas', showControls: true, step: 1 }
 ],
 formula: 'Peças = Área × Peças/m² × (1 + Perdas%)\nArredondamento para cima',
 assumptions: [
 'Valores baseados em padrões da indústria cerâmica',
 'Margem de 10% para quebras e reposição',
 'Arredondamento sempre para cima',
 'Para chapas metálicas, use cálculo por m² útil'
 ],
 calculationFn: (data) => {
 try {
 const area = num(data.area);
 const customPieces = data.customPiecesPerM2 ? num(data.customPiecesPerM2) : null;
 const loss = num(data.loss) || 10;

 let result;
 if (customPieces) {
 // Usar valor personalizado
 const pecas = area * customPieces;
 const pecas_com_perda = ceil(pecas * (1 + loss / 100));
 result = {
 pecas,
 pecas_com_perda,
 formula: `${area} m² × ${customPieces} peças/m² = ${pecas.toFixed(1)} → perdas ${loss}% = ${pecas_com_perda} peças`
 };
 } else {
 // Usar valor padrão do tipo
 result = calcRoofTiles({
 area_m2: area,
 tipo: data.tileType as any,
 loss_percent: loss
 });
 }

 const piecesPerM2 = customPieces || (result.pecas / area);
 const estimatedCost = result.pecas_com_perda * 2.5; // R$ 2,50 por telha média

 return {
 summary: `Para ${area}m² você precisará de ${result.pecas_com_perda} telhas do tipo ${data.tileType}.`,
 details: [
 { label: 'Área do telhado', value: `${area.toFixed(1)} m²` },
 { label: 'Tipo de telha', value: data.tileType },
 { label: 'Peças por m²', value: `${piecesPerM2.toFixed(1)} peças/m²` },
 { label: 'Peças sem perdas', value: `${result.pecas.toFixed(0)} peças` },
 { label: 'Peças com perdas', value: `${result.pecas_com_perda} peças`, highlight: true },
 { label: 'Margem de perdas', value: `${loss}%` },
 { label: 'Custo estimado', value: `R$ ${estimatedCost.toFixed(0)}` },
 { label: 'Cálculo aplicado', value: result.formula }
 ]
 };
 } catch (error) {
 return {
 summary: 'Erro no cálculo. Verifique os valores informados.',
 details: [{ label: 'Erro', value: error.message }]
 };
 }
 },
 seo: {
 title: 'Como Calcular Telhas por m²',
 content: `<p>O cálculo correto de telhas evita falta de material e garante cobertura adequada. Nossa calculadora considera os tipos mais comuns e suas respectivas quantidades por m².</p><p>Telhas romanas e portuguesas: 16 peças/m². Telhas coloniais: 24 peças/m². Sempre inclua margem para quebras.</p>`
 }
 },

 'baseboard-trim': {
 id: 'baseboard-trim',
 title: 'Rodapé & Guarnição',
 description: 'Calcule barras para rodapé e guarnição.',
 icon: BaseboardPremiumIcon,
 fields: [
 { id: 'roomCount', label: 'Número de cômodos', type: 'number', required: true, defaultValue: '1', helpText: 'Quantos ambientes terão rodapé', showControls: true, step: 1 },
 { id: 'room1Length', label: 'Comprimento do 1º cômodo', unit: 'm', type: 'number', required: true, placeholder: 'ex: 5,00', helpText: 'Maior medida do ambiente', showControls: true, step: 0.1 },
 { id: 'room1Width', label: 'Largura do 1º cômodo', unit: 'm', type: 'number', required: true, placeholder: 'ex: 4,00', helpText: 'Menor medida do ambiente', showControls: true, step: 0.1 },
 { id: 'doorCount', label: 'Número de portas', type: 'number', required: true, defaultValue: '2', helpText: 'Portas que receberão guarnição', showControls: true, step: 1 },
 { id: 'door1Width', label: 'Largura da 1ª porta', unit: 'm', type: 'number', required: true, defaultValue: '0.8', helpText: 'Largura padrão: 0,80m', showControls: true, step: 0.1 },
 { id: 'door1Height', label: 'Altura da 1ª porta', unit: 'm', type: 'number', required: true, defaultValue: '2.1', helpText: 'Altura padrão: 2,10m', showControls: true, step: 0.1 }
 ],
 advancedFields: [
 { id: 'room2Length', label: 'Comprimento do 2º cômodo', unit: 'm', type: 'number', placeholder: 'ex: 3,50', helpText: 'Deixe vazio se não houver', showControls: true, step: 0.1 },
 { id: 'room2Width', label: 'Largura do 2º cômodo', unit: 'm', type: 'number', placeholder: 'ex: 3,00', helpText: 'Deixe vazio se não houver', showControls: true, step: 0.1 },
 { id: 'door2Width', label: 'Largura da 2ª porta', unit: 'm', type: 'number', defaultValue: '0.8', helpText: 'Deixe vazio se não houver', showControls: true, step: 0.1 },
 { id: 'door2Height', label: 'Altura da 2ª porta', unit: 'm', type: 'number', defaultValue: '2.1', helpText: 'Deixe vazio se não houver', showControls: true, step: 0.1 },
 { id: 'barLength', label: 'Comprimento da barra', unit: 'm', type: 'number', defaultValue: '2.4', helpText: 'Comprimento padrão das barras', showControls: true, step: 0.1 },
 { id: 'doorSides', label: 'Lados da guarnição', type: 'select', options: [
 { value: '2', label: '2 lados (padrão)' },
 { value: '1', label: '1 lado apenas' }
 ], defaultValue: '2', helpText: 'Quantos lados da porta terão guarnição' },
 { id: 'loss', label: 'Margem para perdas', unit: '%', type: 'number', defaultValue: '10', helpText: 'Padrão de 10% para emendas e cortes', showControls: true, step: 1 }
 ],
 formula: 'Rodapé: Σ 2×(C+L) metros lineares\nGuarnição: Σ lados×(2H+W) metros lineares\nBarras = metros ÷ comprimento da barra (arredondado para cima)',
 assumptions: [
 'Barra padrão: 2,40m de comprimento',
 'Guarnição padrão: 2 lados da porta',
 'Margem de 10% para emendas e cortes',
 'Arredondamento sempre para cima'
 ],
 calculationFn: (data) => {
 try {
 const rooms = [];
 const doors = [];

 // Primeiro cômodo (obrigatório)
 rooms.push({
 length_m: num(data.room1Length),
 width_m: num(data.room1Width)
 });

 // Segundo cômodo (opcional)
 if (data.room2Length && data.room2Width) {
 rooms.push({
 length_m: num(data.room2Length),
 width_m: num(data.room2Width)
 });
 }

 // Primeira porta (obrigatória)
 doors.push({
 width_m: num(data.door1Width),
 height_m: num(data.door1Height),
 sides: parseInt(data.doorSides) as 1 | 2
 });

 // Segunda porta (opcional)
 if (data.door2Width && data.door2Height) {
 doors.push({
 width_m: num(data.door2Width),
 height_m: num(data.door2Height),
 sides: parseInt(data.doorSides) as 1 | 2
 });
 }

 const result = calcBaseboardAndTrim({
 rooms,
 doors,
 bar_len_m: num(data.barLength) || 2.4,
 loss_percent: num(data.loss) || 10
 });

 const totalBars = result.rodape_barras + result.guarn_barras;
 const barPrice = 25; // R$ 25 por barra
 const totalCost = totalBars * barPrice;

 return {
 summary: `Você precisará de ${result.rodape_barras} barras para rodapé e ${result.guarn_barras} barras para guarnição. Total: ${totalBars} barras.`,
 details: [
 { label: 'Rodapé necessário', value: `${result.rodape_ml.toFixed(2)} m lineares` },
 { label: 'Rodapé com perdas', value: `${result.rodape_ml_com_perda.toFixed(2)} m lineares` },
 { label: 'Barras para rodapé', value: `${result.rodape_barras} barras`, highlight: true },
 { label: 'Guarnição necessária', value: `${result.guarn_ml.toFixed(2)} m lineares` },
 { label: 'Guarnição com perdas', value: `${result.guarn_ml_com_perda.toFixed(2)} m lineares` },
 { label: 'Barras para guarnição', value: `${result.guarn_barras} barras`, highlight: true },
 { label: 'Total de barras', value: `${totalBars} barras`, highlight: true },
 { label: 'Comprimento da barra', value: `${data.barLength || 2.4}m` },
 { label: 'Custo estimado', value: `R$ ${totalCost.toFixed(0)}` },
 { label: 'Cálculo rodapé', value: result.formula.rodape },
 { label: 'Cálculo guarnição', value: result.formula.guarn }
 ]
 };
 } catch (error) {
 return {
 summary: 'Erro no cálculo. Verifique os valores informados.',
 details: [{ label: 'Erro', value: error.message }]
 };
 }
 },
 seo: {
 title: 'Como Calcular Rodapé e Guarnição',
 content: `<p>O cálculo correto de rodapé e guarnição garante acabamento perfeito e evita desperdício. Nossa calculadora considera perímetros dos ambientes e contornos das portas.</p><p>Barras padrão de 2,40m. Sempre inclua margem para emendas e cortes.</p>`
 }
 },
};
