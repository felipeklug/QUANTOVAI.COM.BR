// Script para descriptografar credenciais Google OAuth de forma segura
import crypto from 'crypto';
import fs from 'fs';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

class CredentialsDecryptor {
  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.encryptedFile = './google-credentials.encrypted';
  }

  // Descriptografar dados
  decrypt(encryptedData, key) {
    try {
      const keyBuffer = Buffer.from(key, 'hex');
      const iv = Buffer.from(encryptedData.iv, 'hex');

      const decipher = crypto.createDecipheriv(this.algorithm, keyBuffer, iv);

      let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      throw new Error(`Erro na descriptografia: ${error.message}`);
    }
  }

  // Carregar e descriptografar credenciais
  loadCredentials() {
    try {
      // Verificar se arquivo criptografado existe
      if (!fs.existsSync(this.encryptedFile)) {
        throw new Error(`Arquivo criptografado não encontrado: ${this.encryptedFile}`);
      }

      // Verificar se chave está disponível
      const encryptionKey = process.env.GOOGLE_CREDENTIALS_KEY;
      if (!encryptionKey) {
        throw new Error('Chave de criptografia não encontrada. Defina GOOGLE_CREDENTIALS_KEY no arquivo .env');
      }

      // Ler arquivo criptografado
      const encryptedContent = JSON.parse(fs.readFileSync(this.encryptedFile, 'utf8'));
      
      // Verificar versão e algoritmo
      if (encryptedContent.algorithm !== this.algorithm) {
        throw new Error(`Algoritmo incompatível: ${encryptedContent.algorithm}`);
      }

      // Descriptografar dados
      const decryptedData = this.decrypt(encryptedContent.data, encryptionKey);
      
      // Validar e retornar credenciais
      const credentials = JSON.parse(decryptedData);
      
      if (!credentials.web || !credentials.web.client_id || !credentials.web.client_secret) {
        throw new Error('Credenciais descriptografadas inválidas');
      }

      return credentials;

    } catch (error) {
      throw new Error(`Erro ao carregar credenciais: ${error.message}`);
    }
  }

  // Obter credenciais de forma segura (apenas em memória)
  getCredentials() {
    return this.loadCredentials();
  }

  // Verificar se credenciais estão disponíveis
  areCredentialsAvailable() {
    try {
      this.loadCredentials();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Obter informações das credenciais sem expor dados sensíveis
  getCredentialsInfo() {
    try {
      const credentials = this.loadCredentials();
      return {
        available: true,
        clientId: credentials.web.client_id,
        projectId: credentials.web.project_id,
        authorizedOrigins: credentials.web.javascript_origins || [],
        hasClientSecret: !!credentials.web.client_secret
      };
    } catch (error) {
      return {
        available: false,
        error: error.message
      };
    }
  }
}

// Função para uso em outros scripts
export function loadGoogleCredentials() {
  const decryptor = new CredentialsDecryptor();
  return decryptor.getCredentials();
}

// Função para verificar disponibilidade
export function checkCredentialsAvailability() {
  const decryptor = new CredentialsDecryptor();
  return decryptor.areCredentialsAvailable();
}

// Função para obter informações seguras
export function getCredentialsInfo() {
  const decryptor = new CredentialsDecryptor();
  return decryptor.getCredentialsInfo();
}

// Função principal para teste
async function main() {
  console.log('🔓 TESTE DE DESCRIPTOGRAFIA - QUANTOVAI');
  console.log('======================================');
  console.log('');

  const decryptor = new CredentialsDecryptor();

  try {
    // Verificar disponibilidade
    console.log('🔍 Verificando disponibilidade das credenciais...');
    const available = decryptor.areCredentialsAvailable();
    
    if (!available) {
      throw new Error('Credenciais não disponíveis');
    }

    console.log('✅ Credenciais disponíveis!');
    console.log('');

    // Obter informações seguras
    console.log('📋 Informações das credenciais:');
    const info = decryptor.getCredentialsInfo();
    
    console.log(`   Client ID: ${info.clientId}`);
    console.log(`   Project ID: ${info.projectId}`);
    console.log(`   Tem Client Secret: ${info.hasClientSecret ? 'Sim' : 'Não'}`);
    console.log(`   Origens autorizadas: ${info.authorizedOrigins.length}`);
    
    if (info.authorizedOrigins.length > 0) {
      info.authorizedOrigins.forEach((origin, index) => {
        console.log(`     ${index + 1}. ${origin}`);
      });
    }

    console.log('');
    console.log('✅ Teste de descriptografia bem-sucedido!');
    console.log('🔒 Credenciais carregadas com segurança em memória');

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    console.error('');
    console.error('🔧 Soluções possíveis:');
    console.error('   1. Verifique se o arquivo .env existe com GOOGLE_CREDENTIALS_KEY');
    console.error('   2. Verifique se o arquivo google-credentials.encrypted existe');
    console.error('   3. Verifique se a chave de criptografia está correta');
    console.error('   4. Execute npm run encrypt-credentials se necessário');
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { CredentialsDecryptor };
