// Script para gerar sitemap.xml automaticamente
import { writeFileSync } from 'fs';

function generateSitemap() {
  // URLs do QuantoVai
  const SITE_URL = 'https://quantovai.com.br';

  const urls = [
    // Páginas principais
    `${SITE_URL}`,
    `${SITE_URL}/calculadoras`,
    `${SITE_URL}/sobre`,
    `${SITE_URL}/como-funciona`,

    // Calculadoras individuais
    `${SITE_URL}/calculadora/floor-tiles`,
    `${SITE_URL}/calculadora/wallpaper`,
    `${SITE_URL}/calculadora/paint`,
    `${SITE_URL}/calculadora/mortar`,
    `${SITE_URL}/calculadora/concrete`,
    `${SITE_URL}/calculadora/roof-tiles`,
    `${SITE_URL}/calculadora/roof-pitch`,
    `${SITE_URL}/calculadora/grout`,
    `${SITE_URL}/calculadora/baseboard`,
    `${SITE_URL}/calculadora/grass-seed`,
    `${SITE_URL}/calculadora/air-conditioning`,
  ];
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Prioridades por tipo de página
  const getPriority = (url) => {
    if (url.endsWith('quantovai.com.br')) return '1.0'; // Homepage
    if (url.includes('/calculadoras')) return '0.9';   // Página de calculadoras
    if (url.includes('/calculadora/')) return '0.8';   // Calculadoras individuais
    if (url.includes('/sobre') || url.includes('/como-funciona')) return '0.7';
    return '0.6';
  };

  // Frequência de mudança
  const getChangeFreq = (url) => {
    if (url.endsWith('quantovai.com.br')) return 'weekly';
    if (url.includes('/calculadoras')) return 'weekly';
    if (url.includes('/calculadora/')) return 'monthly';
    return 'monthly';
  };

  // Gerar XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach(url => {
    sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${getChangeFreq(url)}</changefreq>
    <priority>${getPriority(url)}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Salvar arquivo
  writeFileSync('public/sitemap.xml', sitemap);
  
  console.log('✅ Sitemap gerado com sucesso!');
  console.log(`📄 Arquivo: public/sitemap.xml`);
  console.log(`🔗 URLs incluídas: ${urls.length}`);
  console.log('');
  console.log('📋 Próximos passos:');
  console.log('1. Faça commit e push do sitemap.xml');
  console.log('2. Submeta o sitemap no Google Search Console');
  console.log('3. URL do sitemap: https://quantovai.com.br/sitemap.xml');
  
  return sitemap;
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap };
