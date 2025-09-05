// Script para submeter URLs ao Google Indexing API
import { google } from 'googleapis';
import { loadGoogleCredentials, checkCredentialsAvailability } from './decrypt-credentials.js';

// Configuração da API
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

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

class GoogleIndexingSubmitter {
  constructor() {
    this.indexing = null;
    this.auth = null;
  }

  // Inicializar autenticação
  async initialize() {
    try {
      // Verificar disponibilidade das credenciais
      if (!checkCredentialsAvailability()) {
        throw new Error('Credenciais criptografadas não disponíveis. Execute: npm run encrypt-credentials');
      }

      // Carregar credenciais descriptografadas
      const credentials = loadGoogleCredentials();

      // Configurar OAuth2
      const oauth2Client = new google.auth.OAuth2(
        credentials.web.client_id,
        credentials.web.client_secret,
        'urn:ietf:wg:oauth:2.0:oob' // Para aplicações desktop
      );

      // Informações seguras (sem expor client_secret)
      console.log('🔓 Credenciais descriptografadas com sucesso');
      console.log(`📋 Client ID: ${credentials.web.client_id}`);
      console.log(`📋 Project ID: ${credentials.web.project_id}`);
      console.log(`🔒 Client Secret: [PROTEGIDO]`);

      // Inicializar API de Indexing
      this.indexing = google.indexing({
        version: 'v3',
        auth: oauth2Client,
      });

      console.log('✅ Google Indexing API configurada com credenciais criptografadas!');
      console.log('⚠️  Para usar a API, você precisa autorizar o acesso primeiro.');
      return true;
    } catch (error) {
      console.error('❌ Erro ao inicializar Google Indexing API:', error.message);
      console.error('💡 Dica: Verifique se o arquivo .env contém GOOGLE_CREDENTIALS_KEY');
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
