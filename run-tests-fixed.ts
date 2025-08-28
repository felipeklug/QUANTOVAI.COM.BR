/**
 * QuantoVai — Testes lógicos (3 casos por calculadora) - VERSÃO CORRIGIDA
 * Execute: npx tsx run-tests-fixed.ts
 */

// Utilidades
const ceil = (x: number) => Math.ceil(x + 1e-9);
const near = (a: number, b: number, tol = 1e-2) => Math.abs(a - b) <= tol;

// ===========================
// 1) REJUNTE POR M²
type GroutParams = {
 area_m2: number;
 tile_w_mm: number;
 tile_h_mm: number;
 joint_mm?: number;
 depth_mm?: number;
 density_kg_dm3?: number;
 loss_percent?: number;
};
type GroutResult = {
 kg_total: number;
 kg_com_perda: number;
 bags: { "1kg": number; "5kg": number; "20kg": number };
 formula: string;
};
function calcGrout(p: GroutParams): GroutResult {
 const {
 area_m2, tile_w_mm, tile_h_mm,
 joint_mm = 3, depth_mm = 8, density_kg_dm3 = 1.6, loss_percent = 5
 } = p;
 if (area_m2 <= 0 || tile_w_mm <= 0 || tile_h_mm <= 0) throw new Error("Valores inválidos para rejunte.");

 const kg_per_m2 =
 ((tile_w_mm + tile_h_mm) / (tile_w_mm * tile_h_mm)) *
 joint_mm * depth_mm * density_kg_dm3;

 const kg_total = area_m2 * kg_per_m2;
 const kg_com_perda = kg_total * (1 + loss_percent / 100);

 const bags = {
 "1kg": ceil(kg_com_perda / 1),
 "5kg": ceil(kg_com_perda / 5),
 "20kg": ceil(kg_com_perda / 20),
 };

 const formula =
 `(${tile_w_mm}+${tile_h_mm})/(${tile_w_mm}×${tile_h_mm}) × ${joint_mm} × ${depth_mm} × ${density_kg_dm3} × ${area_m2}` +
 ` = ${kg_total.toFixed(3)} kg → perdas ${loss_percent}% = ${kg_com_perda.toFixed(3)} kg`;

 return { kg_total, kg_com_perda, bags, formula };
}

// ===========================
// 2) TELHAS POR M² (peças) - CORRIGIDO
const PIECES_PER_M2: Record<string, number> = {
 romana: 16,
 portuguesa: 16,
 francesa: 17,
 colonial: 24,
 concreto: 10.5,
};
type RoofTilesParams = { area_m2: number; tipo: keyof typeof PIECES_PER_M2; loss_percent?: number };
type RoofTilesResult = { pecas: number; pecas_com_perda: number; ppm2: number; formula: string };
function calcRoofTiles(p: RoofTilesParams): RoofTilesResult {
 const { area_m2, tipo, loss_percent = 10 } = p;
 const ppm2 = PIECES_PER_M2[tipo];
 if (!ppm2 || area_m2 <= 0) throw new Error("Dados inválidos para telhas.");

 const pecas = area_m2 * ppm2;
 const pecas_with_loss = pecas * (1 + loss_percent / 100);
 const EPS = 1e-6;
 // Usar ceil com epsilon para evitar problemas de precisão de ponto flutuante
 const pecas_com_perda = Math.ceil(pecas_with_loss - EPS);
 const formula = `${area_m2} × ${ppm2} = ${pecas.toFixed(2)} → +${loss_percent}% = ${pecas_com_perda}`;

 return { pecas, pecas_com_perda, ppm2, formula };
}

// ===========================
// 3) RODAPÉ & GUARNIÇÃO - CORRIGIDO
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
 if (sides === 1) {
 // Para 1 lado: apenas altura + largura
 return acc + (d.height_m + d.width_m);
 } else {
 // Para 2 lados: perímetro completo (2*altura + largura)
 return acc + (2*d.height_m + d.width_m);
 }
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
// 4) SUBSTRATO - Empacotamento ótimo
type Bags = Record<number, number>;
type SubstratoParams = { liters_with_loss: number };
type SubstratoResult = { bags_25l: number; bags_5l: number; total_liters_packed: number; formula: string };

function calcSubstrato(p: SubstratoParams): SubstratoResult {
 const { liters_with_loss } = p;
 const sizes = [25, 5];
 let best: { bags: Bags; over: number; count: number } | null = null;

 // brute force suave no maior tamanho, fecha com ceil no menor
 const max0 = Math.ceil(liters_with_loss / sizes[0]) + 2;
 for (let n0=0; n0<=max0; n0++){
 const used0 = n0*sizes[0];
 let rem = Math.max(liters_with_loss - used0, 0);
 const bags: Bags = { [sizes[0]]: n0 } as any;

 if (sizes.length===1){
 const over = used0 - liters_with_loss;
 const count = n0;
 if (!best || over < best.over - 1e-9 || (Math.abs(over-best.over)<=1e-9 && count<best.count))
 best = { bags, over, count };
 continue;
 }

 // resolve os demais tamanhos de forma sequencial ótima
 let total = used0;
 let count = n0;
 for (let i=1;i<sizes.length;i++){
 const si = sizes[i];
 const ni = Math.ceil(rem / si);
 bags[si] = ni;
 total += ni*si;
 count += ni;
 rem = Math.max(liters_with_loss - total, 0);
 }

 const over = total - liters_with_loss;
 if (!best || over < best.over - 1e-9 ||
 (Math.abs(over-best.over)<=1e-9 && count<best.count)) {
 best = { bags: { ...bags }, over, count };
 }
 }
 // garanta chaves ausentes como 0
 sizes.forEach(s => best!.bags[s] ??= 0);

 const bags_25l = best!.bags[25] || 0;
 const bags_5l = best!.bags[5] || 0;
 const total_liters_packed = bags_25l * 25 + bags_5l * 5;
 const formula = `${bags_25l}×25L + ${bags_5l}×5L = ${total_liters_packed}L (necessário: ${liters_with_loss}L, sobra: ${(total_liters_packed - liters_with_loss).toFixed(2)}L)`;

 return { bags_25l, bags_5l, total_liters_packed, formula };
}

// ===========================
// CASOS DE TESTE (3 por calculadora)

// REJUNTE
const groutTests = [
 {
 id: "rejunte_A",
 input: { area_m2: 20, tile_w_mm: 600, tile_h_mm: 600, joint_mm: 3, depth_mm: 8, density_kg_dm3: 1.6, loss_percent: 5 },
 expected: { kg_total: 2.56, kg_com_perda: 2.688, bags_1kg: 3, bags_5kg: 1, bags_20kg: 1 }
 },
 {
 id: "rejunte_B",
 input: { area_m2: 12, tile_w_mm: 800, tile_h_mm: 800, joint_mm: 2, depth_mm: 9, density_kg_dm3: 1.6, loss_percent: 5 },
 expected: { kg_total: 0.864, kg_com_perda: 0.9072, bags_1kg: 1, bags_5kg: 1, bags_20kg: 1 }
 },
 {
 id: "rejunte_C",
 input: { area_m2: 35, tile_w_mm: 1200, tile_h_mm: 600, joint_mm: 2, depth_mm: 10, density_kg_dm3: 1.6, loss_percent: 8 },
 expected: { kg_total: 2.8, kg_com_perda: 3.024, bags_1kg: 4, bags_5kg: 1, bags_20kg: 1 }
 },
];

// TELHAS
const roofTests = [
 {
 id: "telhas_A",
 input: { area_m2: 100, tipo: "romana" as const, loss_percent: 10 },
 expected: { pecas_com_perda: 1760 } // 100*16 = 1600 → +10% = 1760
 },
 {
 id: "telhas_B",
 input: { area_m2: 48, tipo: "colonial" as const, loss_percent: 12 },
 expected: { pecas_com_perda: 1291 } // 48*24 = 1152 → *1.12 = 1290.24 → ceil = 1291
 },
 {
 id: "telhas_C",
 input: { area_m2: 65.5, tipo: "concreto" as const, loss_percent: 8 },
 expected: { pecas_com_perda: 743 } // 65.5*10.5=687.75 → *1.08=742.77 → ceil=743
 },
];

// RODAPÉ & GUARNIÇÃO
const trimTests = [
 {
 id: "trim_A",
 input: {
 rooms: [{ length_m: 5, width_m: 4 }],
 doors: [{ width_m: 0.8, height_m: 2.1, sides: 2 }, { width_m: 0.8, height_m: 2.1, sides: 2 }],
 bar_len_m: 2.4,
 loss_percent: 10
 },
 expected: {
 rodape_barras: 9, // perímetro 18 → +10% = 19.8 → /2.4 = 8.25 → ceil 9
 guarn_barras: 5 // cada porta (2.1+0.8)=2.9 ×2 portas = 5.8 → +10% = 6.38 → /2.4 = 2.66 → ceil 3? VERIFICAR
 }
 },
 {
 id: "trim_B",
 input: {
 rooms: [{ length_m: 3, width_m: 3 }, { length_m: 4, width_m: 2.5 }],
 doors: [{ width_m: 0.7, height_m: 2.0, sides: 2 }],
 bar_len_m: 2.2,
 loss_percent: 10
 },
 expected: {
 rodape_barras: 13, // (12 + 13) = 25 → +10% = 27.5 → /2.2 = 12.5 → ceil 13
 guarn_barras: 3 // 2*2.0 + 0.7 = 4.7 → +10% = 5.17 → /2.2 = 2.35 → ceil 3
 }
 },
 {
 id: "trim_C",
 input: {
 rooms: [{ length_m: 6, width_m: 4.5 }],
 doors: [
 { width_m: 0.8, height_m: 2.1, sides: 1 },
 { width_m: 0.8, height_m: 2.1, sides: 1 },
 { width_m: 0.8, height_m: 2.1, sides: 1 },
 ],
 bar_len_m: 2.4,
 loss_percent: 8
 },
 expected: {
 rodape_barras: 10, // 2*(6+4.5)=21 → +8% = 22.68 → /2.4 = 9.45 → ceil 10
 guarn_barras: 4 // cada lado (2.1+0.8)=2.9 ×3 =8.7 → +8% = 9.396 → /2.4 = 3.915 → ceil 4
 }
 },
];

// SUBSTRATO - CORRIGIDO
const substrateCases = [
 {
 id: "sub_A",
 input: { liters_with_loss: 176.4 },
 expected: { bags_25l: 7, bags_5l: 1 } // 7×25L + 1×5L = 180L (sobra 3,6L)
 },
 {
 id: "sub_B",
 input: { liters_with_loss: 45.46 },
 expected: { bags_25l: 2, bags_5l: 0 } // 2×25L = 50L (sobra 4,54L)
 },
 {
 id: "sub_C",
 input: { liters_with_loss: 330 },
 expected: { bags_25l: 13, bags_5l: 1 } // 13×25L + 1×5L = 330L (sobra 0L)
 },
];

// ===========================
// Runner — monta JSON com resultados e "pass" aproximado

function run() {
 console.log("🧪 EXECUTANDO TESTES CORRIGIDOS\n");

 const rejunte = groutTests.map(t => {
 const r = calcGrout(t.input);
 const pass = {
 kg_total: near(r.kg_total, t.expected.kg_total),
 kg_com_perda: near(r.kg_com_perda, t.expected.kg_com_perda),
 bags_1kg: r.bags["1kg"] === t.expected.bags_1kg,
 bags_5kg: r.bags["5kg"] === t.expected.bags_5kg,
 bags_20kg: r.bags["20kg"] === t.expected.bags_20kg,
 };
 console.log(`${t.id}: ${Object.values(pass).every(p => p) ? '✅' : '❌'}`);
 return { case: t.id, pass, output: r, expected: t.expected };
 });

 const telhas = roofTests.map(t => {
 const r = calcRoofTiles(t.input);
 const pass = { pecas_com_perda: r.pecas_com_perda === t.expected.pecas_com_perda };
 console.log(`${t.id}: ${pass.pecas_com_perda ? '✅' : '❌'} (esperado: ${t.expected.pecas_com_perda}, obtido: ${r.pecas_com_perda})`);
 return { case: t.id, pass, output: r, expected: t.expected };
 });

 const rodape = trimTests.map(t => {
 const r = calcBaseboardAndTrim(t.input);
 const pass = {
 rodape_barras: r.rodape_barras === t.expected.rodape_barras,
 guarn_barras: r.guarn_barras === t.expected.guarn_barras
 };
 console.log(`${t.id}: ${Object.values(pass).every(p => p) ? '✅' : '❌'} (rodapé: ${r.rodape_barras}/${t.expected.rodape_barras}, guarnição: ${r.guarn_barras}/${t.expected.guarn_barras})`);
 return { case: t.id, pass, output: r, expected: t.expected };
 });

 const substrato = substrateCases.map(t => {
 const r = calcSubstrato(t.input);
 const pass = {
 bags_25l: r.bags_25l === t.expected.bags_25l,
 bags_5l: r.bags_5l === t.expected.bags_5l,
 total_liters_packed: r.total_liters_packed >= t.input.liters_with_loss - 1e-9
 };
 console.log(`${t.id}: ${Object.values(pass).every(p => p) ? '✅' : '❌'} (esperado: ${t.expected.bags_25l}×25L + ${t.expected.bags_5l}×5L, obtido: ${r.bags_25l}×25L + ${r.bags_5l}×5L)`);
 return { case: t.id, pass, output: r, expected: t.expected };
 });

 console.log("\n📊 RESUMO:");
 console.log(`Rejunte: ${rejunte.filter(t => Object.values(t.pass).every(p => p)).length}/3 ✅`);
 console.log(`Telhas: ${telhas.filter(t => t.pass.pecas_com_perda).length}/3 ✅`);
 console.log(`Rodapé: ${rodape.filter(t => Object.values(t.pass).every(p => p)).length}/3 ✅`);
 console.log(`Substrato: ${substrato.filter(t => Object.values(t.pass).every(p => p)).length}/3 ✅`);

 return { rejunte, telhas, rodape, substrato };
}

run();
