/**
 * QuantoVai — Testes lógicos para 12 calculadoras (3 casos cada)
 * Execute: ts-node run-tests-all.ts (ou) npx tsx run-tests-all.ts
 */

//// Utils ////
const ceil = (x: number) => Math.ceil(x + 1e-9);
const near = (a: number, b: number, tol = 1e-2) => Math.abs(a - b) <= tol;
const round = (x: number, n = 2) => Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const roundToNearest = (x: number, step = 500) => Math.round(x / step) * step;

//// 7) REJUNTE por m² ////
type GroutParams = { area_m2: number; tile_w_mm: number; tile_h_mm: number; joint_mm?: number; depth_mm?: number; density_kg_dm3?: number; loss_percent?: number; };
type GroutResult = { kg_total: number; kg_com_perda: number; bags: { "1kg": number; "5kg": number; "20kg": number }; formula: string; };
function calcGrout(p: GroutParams): GroutResult {
 const { area_m2, tile_w_mm, tile_h_mm, joint_mm = 3, depth_mm = 8, density_kg_dm3 = 1.6, loss_percent = 5 } = p;
 if (area_m2 <= 0 || tile_w_mm <= 0 || tile_h_mm <= 0) throw new Error("Valores inválidos (rejunte).");
 const kg_per_m2 = ((tile_w_mm + tile_h_mm) / (tile_w_mm * tile_h_mm)) * joint_mm * depth_mm * density_kg_dm3;
 const kg_total = area_m2 * kg_per_m2;
 const kg_com_perda = kg_total * (1 + loss_percent / 100);
 const bags = { "1kg": ceil(kg_com_perda / 1), "5kg": ceil(kg_com_perda / 5), "20kg": ceil(kg_com_perda / 20) };
 const formula = `(${tile_w_mm}+${tile_h_mm})/(${tile_w_mm}×${tile_h_mm}) × ${joint_mm} × ${depth_mm} × ${density_kg_dm3} × ${area_m2} = ${kg_total.toFixed(3)} kg → perdas ${loss_percent}% = ${kg_com_perda.toFixed(3)} kg`;
 return { kg_total, kg_com_perda, bags, formula };
}

//// 8) TELHAS por m² (peças) ////
const PIECES_PER_M2: Record<string, number> = { romana: 16, portuguesa: 16, francesa: 17, colonial: 24, concreto: 10.5 };
type RoofTilesParams = { area_m2: number; tipo: keyof typeof PIECES_PER_M2; loss_percent?: number };
type RoofTilesResult = { pecas: number; pecas_com_perda: number; ppm2: number; formula: string };
function calcRoofTiles(p: RoofTilesParams): RoofTilesResult {
 const { area_m2, tipo, loss_percent = 10 } = p;
 const ppm2 = PIECES_PER_M2[tipo];
 if (!ppm2 || area_m2 <= 0) throw new Error("Dados inválidos (telhas).");
 const pecas = area_m2 * ppm2;
 const pecas_com_perda = ceil(pecas * (1 + loss_percent / 100));
 const formula = `${area_m2} × ${ppm2} = ${pecas.toFixed(2)} → +${loss_percent}% = ${pecas_com_perda}`;
 return { pecas, pecas_com_perda, ppm2, formula };
}

//// 9) RODAPÉ & GUARNIÇÃO ////
type Room = { length_m: number; width_m: number };
type Door = { width_m: number; height_m: number; sides?: 1 | 2 };
type TrimParams = { rooms: Room[]; doors?: Door[]; bar_len_m?: number; loss_percent?: number };
type TrimResult = {
 rodape_ml: number; rodape_ml_com_perda: number; rodape_barras: number;
 guarn_ml: number; guarn_ml_com_perda: number; guarn_barras: number;
 formula: { rodape: string; guarn: string };
};
function calcBaseboardAndTrim(p: TrimParams): TrimResult {
 const bar = p.bar_len_m ?? 2.4;
 const loss = p.loss_percent ?? 10;
 const perimeters = p.rooms.map(r => 2 * (r.length_m + r.width_m));
 const rodape_ml = perimeters.reduce((a, b) => a + b, 0);
 const rodape_ml_com_perda = rodape_ml * (1 + loss / 100);
 const rodape_barras = ceil(rodape_ml_com_perda / bar);
 const doors = p.doors ?? [];
 const guarn_ml = doors.reduce((acc, d) => {
 const sides = d.sides ?? 2;
 return acc + sides * (2 * d.height_m + d.width_m);
 }, 0);
 const guarn_ml_com_perda = guarn_ml * (1 + loss / 100);
 const guarn_barras = ceil(guarn_ml_com_perda / bar);
 return {
 rodape_ml, rodape_ml_com_perda, rodape_barras,
 guarn_ml, guarn_ml_com_perda, guarn_barras,
 formula: {
 rodape: `Σ 2×(C+L) = ${rodape_ml.toFixed(2)} → +${loss}% = ${rodape_ml_com_perda.toFixed(2)} → barras ${bar} m = ${rodape_barras}`,
 guarn: `Σ lados×(2H+W) = ${guarn_ml.toFixed(2)} → +${loss}% = ${guarn_ml_com_perda.toFixed(2)} → barras ${bar} m = ${guarn_barras}`
 }
 };
}

// ===========================
// CASOS DE TESTE (3 por calculadora)

// 7) Rejunte
const groutCases = [
 { id:"rejunte_A", in:{ area_m2:20, tile_w_mm:600, tile_h_mm:600, joint_mm:3, depth_mm:8, density_kg_dm3:1.6, loss_percent:5 }, exp:{ kg_total:2.56, kg_com_perda:2.688, bags_1kg:3, bags_5kg:1, bags_20kg:1 } },
 { id:"rejunte_B", in:{ area_m2:12, tile_w_mm:800, tile_h_mm:800, joint_mm:2, depth_mm:9, density_kg_dm3:1.6, loss_percent:5 }, exp:{ kg_total:0.864, kg_com_perda:0.9072, bags_1kg:1, bags_5kg:1, bags_20kg:1 } },
 { id:"rejunte_C", in:{ area_m2:35, tile_w_mm:1200, tile_h_mm:600, joint_mm:2, depth_mm:10, density_kg_dm3:1.6, loss_percent:8 }, exp:{ kg_total:2.8, kg_com_perda:3.024, bags_1kg:4, bags_5kg:1, bags_20kg:1 } },
];

// 8) Telhas por m²
const roofTilesCases = [
 { id:"telhas_A", in:{ area_m2:100, tipo:"romana" as const, loss_percent:10 }, exp:{ pecas_com_perda:1760 } }, // 100*16=1600 → +10% = 1760
 { id:"telhas_B", in:{ area_m2:48, tipo:"colonial" as const, loss_percent:12 }, exp:{ pecas_com_perda:1291 } }, // 48*24=1152 → *1.12=1290.24 → ceil 1291
 { id:"telhas_C", in:{ area_m2:65.5,tipo:"concreto" as const, loss_percent:8 }, exp:{ pecas_com_perda:744 } }, // 65.5*10.5=687.75 → *1.08=743.97 → ceil 744
];

// 9) Rodapé & Guarnição
const trimCases = [
 { id:"trim_A", in:{ rooms:[{length_m:5,width_m:4}], doors:[{width_m:0.8,height_m:2.1,sides:1},{width_m:0.8,height_m:2.1,sides:1}], bar_len_m:2.4, loss_percent:10 }, exp:{ rodape_barras:9, guarn_barras:5 } },
 { id:"trim_B", in:{ rooms:[{length_m:3,width_m:3},{length_m:4,width_m:2.5}], doors:[{width_m:0.7,height_m:2.0,sides:1}], bar_len_m:2.2, loss_percent:10 }, exp:{ rodape_barras:13, guarn_barras:3 } },
 { id:"trim_C", in:{ rooms:[{length_m:6,width_m:4.5}], doors:[{width_m:0.8,height_m:2.1,sides:1},{width_m:0.8,height_m:2.1,sides:1},{width_m:0.8,height_m:2.1,sides:1}], bar_len_m:2.4, loss_percent:8 }, exp:{ rodape_barras:10, guarn_barras:7 } },
];

// ===========================
// Runner — executa testes das 3 novas calculadoras

function runTests() {
 console.log("🧪 TESTANDO AS 3 NOVAS CALCULADORAS\n");

 // Teste Rejunte
 console.log("1️⃣ REJUNTE:");
 groutCases.forEach(t => {
 try {
 const r = calcGrout(t.in);
 const pass = {
 kg_total: near(r.kg_total, t.exp.kg_total),
 kg_com_perda: near(r.kg_com_perda, t.exp.kg_com_perda),
 bags_1kg: r.bags["1kg"] === t.exp.bags_1kg,
 bags_5kg: r.bags["5kg"] === t.exp.bags_5kg,
 bags_20kg: r.bags["20kg"] === t.exp.bags_20kg,
 };
 const allPass = Object.values(pass).every(p => p);
 console.log(` ${t.id}: ${allPass ? '✅' : '❌'} (${r.kg_com_perda.toFixed(3)}kg, sacos 5kg: ${r.bags["5kg"]})`);
 } catch (e) {
 console.log(` ${t.id}: ❌ ERRO: ${e.message}`);
 }
 });

 // Teste Telhas
 console.log("\n2️⃣ TELHAS:");
 roofTilesCases.forEach(t => {
 try {
 const r = calcRoofTiles(t.in);
 const pass = r.pecas_com_perda === t.exp.pecas_com_perda;
 console.log(` ${t.id}: ${pass ? '✅' : '❌'} (esperado: ${t.exp.pecas_com_perda}, obtido: ${r.pecas_com_perda})`);
 } catch (e) {
 console.log(` ${t.id}: ❌ ERRO: ${e.message}`);
 }
 });

 // Teste Rodapé
 console.log("\n3️⃣ RODAPÉ & GUARNIÇÃO:");
 trimCases.forEach(t => {
 try {
 const r = calcBaseboardAndTrim(t.in);
 const pass = {
 rodape: r.rodape_barras === t.exp.rodape_barras,
 guarn: r.guarn_barras === t.exp.guarn_barras
 };
 const allPass = Object.values(pass).every(p => p);
 console.log(` ${t.id}: ${allPass ? '✅' : '❌'} (rodapé: ${r.rodape_barras}/${t.exp.rodape_barras}, guarnição: ${r.guarn_barras}/${t.exp.guarn_barras})`);
 } catch (e) {
 console.log(` ${t.id}: ❌ ERRO: ${e.message}`);
 }
 });

 console.log("\n🎯 TESTES DAS 3 NOVAS CALCULADORAS CONCLUÍDOS!");
}

runTests();
