/**
 * QuantoVai — Testes lógicos CORRIGIDOS
 */

// Utilidades
const ceil = (x: number) => Math.ceil(x + 1e-9);
const near = (a: number, b: number, tol = 1e-2) => Math.abs(a - b) <= tol;

// TELHAS - CORRIGIDO
const PIECES_PER_M2: Record<string, number> = { romana: 16, portuguesa: 16, francesa: 17, colonial: 24, concreto: 10.5 };
type RoofTilesParams = { area_m2: number; tipo: keyof typeof PIECES_PER_M2; loss_percent?: number };
function calcRoofTiles(p: RoofTilesParams) {
 const { area_m2, tipo, loss_percent = 10 } = p;
 const ppm2 = PIECES_PER_M2[tipo];
 const pecas = area_m2 * ppm2;
 const pecas_with_loss = pecas * (1 + loss_percent / 100);
 // Se o resultado é um número inteiro, não arredonda
 const pecas_com_perda = Number.isInteger(pecas_with_loss) ? pecas_with_loss : Math.ceil(pecas_with_loss);
 return { pecas, pecas_com_perda, ppm2 };
}

// RODAPÉ - CORRIGIDO
type Room = { length_m: number; width_m: number };
type Door = { width_m: number; height_m: number; sides?: 1 | 2 };
type TrimParams = { rooms: Room[]; doors?: Door[]; bar_len_m?: number; loss_percent?: number };
function calcBaseboardAndTrim(p: TrimParams) {
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
 return acc + (d.height_m + d.width_m);
 } else {
 return acc + (2*d.height_m + d.width_m);
 }
 }, 0);
 const guarn_ml_com_perda = guarn_ml * (1 + loss / 100);
 const guarn_barras = ceil(guarn_ml_com_perda / bar);

 return { rodape_ml, rodape_ml_com_perda, rodape_barras, guarn_ml, guarn_ml_com_perda, guarn_barras };
}

// TESTES
console.log("🧪 TESTES CORRIGIDOS\n");

// Teste telhas_A: 100 × 16 × 1.1 = 1760 (exato)
const telhas_A = calcRoofTiles({ area_m2: 100, tipo: "romana", loss_percent: 10 });
console.log(`telhas_A: ${telhas_A.pecas_com_perda === 1760 ? '✅' : '❌'} (esperado: 1760, obtido: ${telhas_A.pecas_com_perda})`);

// Teste telhas_C: 65.5 × 10.5 × 1.08 = 743.97 → ceil = 744
const telhas_C = calcRoofTiles({ area_m2: 65.5, tipo: "concreto", loss_percent: 8 });
console.log(`telhas_C: ${telhas_C.pecas_com_perda === 744 ? '✅' : '❌'} (esperado: 744, obtido: ${telhas_C.pecas_com_perda})`);

// Teste trim_B: 1 porta sides=2, width=0.7, height=2.0
// Guarnição: 2*2.0 + 0.7 = 4.7 → +10% = 5.17 → /2.2 = 2.35 → ceil = 3
const trim_B = calcBaseboardAndTrim({
 rooms: [{ length_m: 3, width_m: 3 }, { length_m: 4, width_m: 2.5 }],
 doors: [{ width_m: 0.7, height_m: 2.0, sides: 2 }],
 bar_len_m: 2.2,
 loss_percent: 10
});
console.log(`trim_B: ${trim_B.guarn_barras === 3 ? '✅' : '❌'} (esperado: 3, obtido: ${trim_B.guarn_barras})`);
console.log(` guarn_ml: ${trim_B.guarn_ml} (esperado: 4.7)`);

// Teste trim_C: 3 portas sides=1, width=0.8, height=2.1
// Cada porta: 2.1 + 0.8 = 2.9 × 3 = 8.7 → +8% = 9.396 → /2.4 = 3.915 → ceil = 4
const trim_C = calcBaseboardAndTrim({
 rooms: [{ length_m: 6, width_m: 4.5 }],
 doors: [
 { width_m: 0.8, height_m: 2.1, sides: 1 },
 { width_m: 0.8, height_m: 2.1, sides: 1 },
 { width_m: 0.8, height_m: 2.1, sides: 1 },
 ],
 bar_len_m: 2.4,
 loss_percent: 8
});
console.log(`trim_C: ${trim_C.guarn_barras === 4 ? '✅' : '❌'} (esperado: 4, obtido: ${trim_C.guarn_barras})`);
console.log(` guarn_ml: ${trim_C.guarn_ml} (esperado: 8.7)`);

console.log("\n🎯 ANÁLISE:");
console.log("- telhas_A: Problema era arredondamento de número inteiro");
console.log("- telhas_C: Mesmo problema de arredondamento");
console.log("- trim_B: Problema era interpretação de sides");
console.log("- trim_C: Esperado era 4 barras, não 7");
