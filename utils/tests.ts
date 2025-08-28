// Golden tests para as novas calculadoras
import { calcGrout, calcRoofTiles, calcBaseboardAndTrim } from './calculationUtils';

console.log('🧪 TESTANDO CALCULADORAS NOVAS\n');

// Teste 1: Rejunte – 20 m², peça 60×60, junta 3 mm, esp. 8 mm
console.log('1️⃣ REJUNTE:');
console.log('Teste: 20 m², peça 60×60cm, junta 3mm, esp. 8mm');
const groutResult = calcGrout({ 
 area_m2: 20, 
 tile_w_mm: 600, 
 tile_h_mm: 600, 
 joint_mm: 3, 
 depth_mm: 8 
});
console.log(`Resultado: ${groutResult.kg_com_perda.toFixed(2)}kg`);
console.log(`Sacos 5kg: ${groutResult.bags['5kg']} unidades`);
console.log(`Fórmula: ${groutResult.formula}`);
console.log('✅ Esperado: ~2.69kg → 1 saco de 5kg\n');

// Teste 2: Telhas – 100 m², tipo romana
console.log('2️⃣ TELHAS:');
console.log('Teste: 100 m², tipo romana');
const tilesResult = calcRoofTiles({ 
 area_m2: 100, 
 tipo: 'romana' 
});
console.log(`Resultado: ${tilesResult.pecas_com_perda} peças`);
console.log(`Fórmula: ${tilesResult.formula}`);
console.log('✅ Esperado: 1760 peças (1600 + 10%)\n');

// Teste 3: Rodapé – 1 cômodo 5×4 m; 2 portas 0,80×2,10 m (2 lados), barra 2,4 m
console.log('3️⃣ RODAPÉ & GUARNIÇÃO:');
console.log('Teste: 1 cômodo 5×4m, 2 portas 0,80×2,10m (2 lados), barra 2,4m');
const trimResult = calcBaseboardAndTrim({
 rooms: [{ length_m: 5, width_m: 4 }],
 doors: [
 { width_m: 0.8, height_m: 2.1, sides: 2 },
 { width_m: 0.8, height_m: 2.1, sides: 2 }
 ]
});
console.log(`Rodapé: ${trimResult.rodape_ml.toFixed(2)}m → ${trimResult.rodape_barras} barras`);
console.log(`Guarnição: ${trimResult.guarn_ml.toFixed(2)}m → ${trimResult.guarn_barras} barras`);
console.log(`Total: ${trimResult.rodape_barras + trimResult.guarn_barras} barras`);
console.log(`Fórmula rodapé: ${trimResult.formula.rodape}`);
console.log(`Fórmula guarnição: ${trimResult.formula.guarn}`);
console.log('✅ Esperado: Rodapé 18m → 9 barras; Guarnição 20m → 10 barras\n');

console.log('🎉 TODOS OS TESTES CONCLUÍDOS!');
