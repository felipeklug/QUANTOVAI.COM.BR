// Script para verificar status de indexação das URLs
import https from 'https';
import { URL } from 'url';

// URLs do QuantoVai para verificar
const SITE_URL = 'https://quantovai.com.br';
const urls = [
  // Páginas principais
  `${SITE_URL}`,
  `${SITE_URL}/calculadoras`,
  `${SITE_URL}/sobre`,
  `${SITE_URL}/como-funciona`,
  
  // Calculadoras populares
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

class IndexingChecker {
  constructor() {
    this.results = [];
  }

  // Verificar se URL está indexada no Google
  async checkGoogleIndex(url) {
    return new Promise((resolve) => {
      const searchQuery = `site:${new URL(url).hostname} "${url}"`;
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      
      console.log(`🔍 Verificando: ${url}`);
      
      // Simular verificação (Google não permite scraping direto)
      // Na prática, você verificaria isso manualmente no Search Console
      setTimeout(() => {
        resolve({
          url,
          indexed: 'unknown', // Seria determinado pela verificação real
          searchUrl: googleSearchUrl
        });
      }, 100);
    });
  }

  // Verificar se URL responde corretamente
  async checkUrlStatus(url) {
    return new Promise((resolve) => {
      const urlObj = new URL(url);
      
      const options = {
        hostname: urlObj.hostname,
        port: 443,
        path: urlObj.pathname,
        method: 'HEAD',
        timeout: 5000
      };

      const req = https.request(options, (res) => {
        resolve({
          url,
          status: res.statusCode,
          ok: res.statusCode >= 200 && res.statusCode < 300
        });
      });

      req.on('error', (error) => {
        resolve({
          url,
          status: 'ERROR',
          ok: false,
          error: error.message
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          url,
          status: 'TIMEOUT',
          ok: false,
          error: 'Request timeout'
        });
      });

      req.end();
    });
  }

  // Verificar todas as URLs
  async checkAllUrls() {
    console.log('🚀 Verificando status de todas as URLs do QuantoVai...');
    console.log('');

    const results = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`📡 [${i + 1}/${urls.length}] Verificando: ${url}`);
      
      const statusResult = await this.checkUrlStatus(url);
      results.push(statusResult);
      
      // Delay entre requests
      await this.delay(500);
    }

    return results;
  }

  // Gerar relatório
  generateReport(results) {
    const working = results.filter(r => r.ok);
    const broken = results.filter(r => !r.ok);

    console.log('');
    console.log('=== RELATÓRIO DE STATUS DAS URLs ===');
    console.log(`✅ URLs funcionando: ${working.length}`);
    console.log(`❌ URLs com problema: ${broken.length}`);
    console.log(`📊 Total verificadas: ${results.length}`);
    console.log('');

    if (working.length > 0) {
      console.log('✅ URLs FUNCIONANDO:');
      working.forEach(result => {
        console.log(`   ✅ ${result.url} (${result.status})`);
      });
      console.log('');
    }

    if (broken.length > 0) {
      console.log('❌ URLs COM PROBLEMA:');
      broken.forEach(result => {
        console.log(`   ❌ ${result.url} (${result.status}) - ${result.error || 'Erro HTTP'}`);
      });
      console.log('');
    }

    console.log('📋 PRÓXIMOS PASSOS:');
    console.log('1. Verifique URLs com problema');
    console.log('2. Use Google Search Console para verificar indexação');
    console.log('3. Use a ferramenta de inspeção de URL para cada página');
    console.log('4. Solicite indexação manual se necessário');
  }

  // Delay helper
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Função principal
async function main() {
  const checker = new IndexingChecker();
  
  console.log('🔍 VERIFICADOR DE INDEXAÇÃO - QUANTOVAI');
  console.log('=====================================');
  console.log('');
  
  const results = await checker.checkAllUrls();
  checker.generateReport(results);
  
  console.log('');
  console.log('💡 DICA: Para verificar indexação real, use:');
  console.log('   1. Google Search Console > Cobertura');
  console.log('   2. Ferramenta de inspeção de URL');
  console.log('   3. Busca manual: site:quantovai.com.br');
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { IndexingChecker };
