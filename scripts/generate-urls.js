// Script para gerar todas as URLs do QuantoVai para indexação
import { calculatorConfigs } from '../src/data/calculatorConfigs.js';

const SITE_URL = 'https://quantovai.com.br';

// Função para gerar todas as URLs do site
function generateAllUrls() {
  const urls = [];
  
  // Páginas principais
  const mainPages = [
    '',                    // Homepage
    '/calculadoras',       // Página de calculadoras
    '/sobre',             // About
    '/como-funciona',     // How it works
  ];
  
  // Adicionar páginas principais
  mainPages.forEach(path => {
    urls.push(`${SITE_URL}${path}`);
  });
  
  // Adicionar todas as calculadoras
  Object.keys(calculatorConfigs).forEach(calculatorId => {
    urls.push(`${SITE_URL}/calculadora/${calculatorId}`);
  });
  
  return urls;
}

// Gerar e exibir URLs
const allUrls = generateAllUrls();

console.log('=== TODAS AS URLs DO QUANTOVAI ===');
console.log(`Total de páginas: ${allUrls.length}`);
console.log('');

allUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

console.log('');
console.log('=== FORMATO JSON PARA INDEXING API ===');
console.log(JSON.stringify(allUrls, null, 2));

export { generateAllUrls };
