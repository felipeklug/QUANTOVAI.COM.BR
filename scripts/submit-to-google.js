// Script para submeter URLs ao Google Indexing API
import { google } from 'googleapis';
import { generateAllUrls } from './generate-urls.js';

// Configuração da API
const SCOPES = ['https://www.googleapis.com/auth/indexing'];
const SERVICE_ACCOUNT_FILE = './google-service-account.json'; // Você precisará criar este arquivo

class GoogleIndexingSubmitter {
  constructor() {
    this.indexing = null;
    this.auth = null;
  }

  // Inicializar autenticação
  async initialize() {
    try {
      // Autenticação com Service Account
      this.auth = new google.auth.GoogleAuth({
        keyFile: SERVICE_ACCOUNT_FILE,
        scopes: SCOPES,
      });

      // Inicializar API de Indexing
      this.indexing = google.indexing({
        version: 'v3',
        auth: this.auth,
      });

      console.log('✅ Google Indexing API inicializada com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao inicializar Google Indexing API:', error.message);
      return false;
    }
  }

  // Submeter uma URL individual
  async submitUrl(url, type = 'URL_UPDATED') {
    try {
      const response = await this.indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: type, // URL_UPDATED ou URL_DELETED
        },
      });

      console.log(`✅ ${url} - Submetida com sucesso`);
      return { success: true, url, response: response.data };
    } catch (error) {
      console.error(`❌ ${url} - Erro:`, error.message);
      return { success: false, url, error: error.message };
    }
  }

  // Submeter todas as URLs
  async submitAllUrls() {
    const urls = generateAllUrls();
    const results = [];
    
    console.log(`🚀 Iniciando submissão de ${urls.length} URLs...`);
    console.log('');

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`📤 [${i + 1}/${urls.length}] Submetendo: ${url}`);
      
      const result = await this.submitUrl(url);
      results.push(result);
      
      // Delay entre requests para evitar rate limiting
      await this.delay(1000); // 1 segundo entre requests
    }

    return results;
  }

  // Verificar status de uma URL
  async checkUrlStatus(url) {
    try {
      const response = await this.indexing.urlNotifications.getMetadata({
        url: url,
      });

      console.log(`📊 Status de ${url}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao verificar ${url}:`, error.message);
      return null;
    }
  }

  // Delay helper
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Relatório final
  generateReport(results) {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log('');
    console.log('=== RELATÓRIO FINAL ===');
    console.log(`✅ Sucessos: ${successful.length}`);
    console.log(`❌ Falhas: ${failed.length}`);
    console.log(`📊 Total: ${results.length}`);
    
    if (failed.length > 0) {
      console.log('');
      console.log('❌ URLs que falharam:');
      failed.forEach(result => {
        console.log(`   - ${result.url}: ${result.error}`);
      });
    }

    console.log('');
    console.log('🎉 Submissão concluída!');
  }
}

// Função principal
async function main() {
  const submitter = new GoogleIndexingSubmitter();
  
  // Inicializar
  const initialized = await submitter.initialize();
  if (!initialized) {
    console.log('');
    console.log('📋 PRÓXIMOS PASSOS PARA CONFIGURAR:');
    console.log('1. Acesse Google Cloud Console');
    console.log('2. Crie um Service Account');
    console.log('3. Baixe o arquivo JSON de credenciais');
    console.log('4. Renomeie para "google-service-account.json"');
    console.log('5. Coloque na pasta raiz do projeto');
    console.log('6. Execute novamente este script');
    return;
  }

  // Submeter todas as URLs
  const results = await submitter.submitAllUrls();
  
  // Gerar relatório
  submitter.generateReport(results);
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { GoogleIndexingSubmitter };
