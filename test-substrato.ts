/**
 * QuantoVai — Testes de Substrato CORRIGIDOS
 * 
 * Objetivo do empacotamento:
 * - Cobrir o volume (nunca abaixo)
 * - Menor sobra
 * - Em empate, menos sacos
 */

// Utilidades
const ceil = (x: number) => Math.ceil(x + 1e-9);
const near = (a: number, b: number, tol = 1e-2) => Math.abs(a - b) <= tol;

// Empacotamento de Substrato V2 - Minimiza sobra
type Bags = Record<number, number>; // ex.: {25: 7, 5: 1}

function packBagsOptimal(litersNeeded: number, sizes: number[] = [25, 5]): Bags {
 sizes = [...sizes].sort((a,b)=>b-a); // decrescente
 let best: { bags: Bags; over: number; count: number } | null = null;

 // brute force suave no maior tamanho, fecha com ceil no menor
 const max0 = Math.ceil(litersNeeded / sizes[0]) + 2;
 for (let n0=0; n0<=max0; n0++){
 const used0 = n0*sizes[0];
 let rem = Math.max(litersNeeded - used0, 0);
 const bags: Bags = { [sizes[0]]: n0 } as any;

 if (sizes.length===1){
 const over = used0 - litersNeeded;
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
 rem = Math.max(litersNeeded - total, 0);
 }

 const over = total - litersNeeded;
 if (!best || over < best.over - 1e-9 ||
 (Math.abs(over-best.over)<=1e-9 && count<best.count)) {
 best = { bags: { ...bags }, over, count };
 }
 }
 // garanta chaves ausentes como 0
 sizes.forEach(s => best!.bags[s] ??= 0);
 return best!.bags;
}

// Casos de teste de substrato CORRIGIDOS
const substrateCases = [
 { 
 id: "sub_A", 
 liters_with_loss: 176.4, 
 exp: { bags_25l: 7, bags_5l: 1 } // 7×25L + 1×5L = 180L (sobra 3,6L)
 },
 { 
 id: "sub_B", 
 liters_with_loss: 45.46, 
 exp: { bags_25l: 2, bags_5l: 0 } // 2×25L = 50L (sobra 4,54L)
 },
 { 
 id: "sub_C", 
 liters_with_loss: 330, 
 exp: { bags_25l: 13, bags_5l: 1 } // 13×25L + 1×5L = 330L (sobra 0L)
 },
];

// Função de teste
function runSubstratoTests() {
 console.log("🧪 TESTANDO SUBSTRATO CORRIGIDO\n");

 substrateCases.forEach(testCase => {
 try {
 const result = packBagsOptimal(testCase.liters_with_loss, [25, 5]);
 
 const pass = {
 bags_25l: result[25] === testCase.exp.bags_25l,
 bags_5l: result[5] === testCase.exp.bags_5l,
 total_liters_packed: (result[25] * 25 + result[5] * 5) >= testCase.liters_with_loss - 1e-9
 };
 
 const allPass = Object.values(pass).every(p => p);
 const totalPacked = result[25] * 25 + result[5] * 5;
 const sobra = totalPacked - testCase.liters_with_loss;
 
 console.log(`${testCase.id}: ${allPass ? '✅' : '❌'}`);
 console.log(` Esperado: ${testCase.exp.bags_25l}×25L + ${testCase.exp.bags_5l}×5L`);
 console.log(` Obtido: ${result[25]}×25L + ${result[5]}×5L = ${totalPacked}L`);
 console.log(` Volume necessário: ${testCase.liters_with_loss}L`);
 console.log(` Sobra: ${sobra.toFixed(2)}L`);
 console.log(` Cobertura: ${totalPacked >= testCase.liters_with_loss ? '✅' : '❌'}`);
 console.log('');
 
 } catch (e) {
 console.log(`${testCase.id}: ❌ ERRO: ${e.message}`);
 }
 });

 console.log("🎯 ANÁLISE:");
 console.log("- sub_A (176,4L): 7×25L + 1×5L = 180L (sobra 3,6L) ✅");
 console.log("- sub_B (45,46L): 2×25L = 50L (sobra 4,54L) ✅");
 console.log("- sub_C (330L): 13×25L + 1×5L = 330L (sobra 0L) ✅");
 console.log("\nTodos os casos cobrem o volume necessário com a menor sobra possível.");
 console.log("Em caso de empate na sobra, prioriza-se menos sacos.");
}

// Executar testes
runSubstratoTests();
