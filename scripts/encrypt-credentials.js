// Script para criptografar credenciais Google OAuth de forma segura
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

class CredentialsEncryptor {
  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.keyLength = 32; // 256 bits
    this.ivLength = 16;  // 128 bits
  }

  // Gerar chave de criptografia segura
  generateEncryptionKey() {
    return crypto.randomBytes(this.keyLength).toString('hex');
  }

  // Criptografar dados
  encrypt(text, key) {
    try {
      const keyBuffer = Buffer.from(key, 'hex');
      const iv = crypto.randomBytes(this.ivLength);

      const cipher = crypto.createCipheriv(this.algorithm, keyBuffer, iv);

      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      return {
        encrypted,
        iv: iv.toString('hex')
      };
    } catch (error) {
      throw new Error(`Erro na criptografia: ${error.message}`);
    }
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

  // Criptografar arquivo de credenciais
  async encryptCredentialsFile(inputFile, outputFile) {
    try {
      console.log('🔐 Iniciando criptografia das credenciais...');
      
      // Verificar se arquivo existe
      if (!fs.existsSync(inputFile)) {
        throw new Error(`Arquivo não encontrado: ${inputFile}`);
      }

      // Ler credenciais originais
      const credentialsData = fs.readFileSync(inputFile, 'utf8');
      console.log('✅ Credenciais lidas com sucesso');

      // Validar JSON
      try {
        const parsed = JSON.parse(credentialsData);
        if (!parsed.web || !parsed.web.client_id || !parsed.web.client_secret) {
          throw new Error('Formato de credenciais inválido');
        }
      } catch (error) {
        throw new Error(`Credenciais inválidas: ${error.message}`);
      }

      // Gerar chave de criptografia
      const encryptionKey = this.generateEncryptionKey();
      console.log('🔑 Chave de criptografia gerada');

      // Criptografar dados
      const encryptedData = this.encrypt(credentialsData, encryptionKey);
      console.log('🔒 Dados criptografados com sucesso');

      // Salvar dados criptografados
      const encryptedContent = {
        version: '1.0',
        algorithm: this.algorithm,
        data: encryptedData,
        timestamp: new Date().toISOString(),
        description: 'QuantoVai Google OAuth Credentials - Encrypted'
      };

      fs.writeFileSync(outputFile, JSON.stringify(encryptedContent, null, 2));
      console.log(`✅ Credenciais criptografadas salvas em: ${outputFile}`);

      // Criar backup do arquivo original
      const backupFile = `${inputFile}.backup`;
      fs.copyFileSync(inputFile, backupFile);
      console.log(`💾 Backup criado: ${backupFile}`);

      // Remover arquivo original
      fs.unlinkSync(inputFile);
      console.log(`🗑️  Arquivo original removido: ${inputFile}`);

      return {
        encryptionKey,
        outputFile,
        backupFile
      };

    } catch (error) {
      console.error('❌ Erro na criptografia:', error.message);
      throw error;
    }
  }

  // Testar descriptografia
  async testDecryption(encryptedFile, key) {
    try {
      console.log('🧪 Testando descriptografia...');
      
      const encryptedContent = JSON.parse(fs.readFileSync(encryptedFile, 'utf8'));
      const decryptedData = this.decrypt(encryptedContent.data, key);
      
      // Validar dados descriptografados
      const parsed = JSON.parse(decryptedData);
      if (parsed.web && parsed.web.client_id && parsed.web.client_secret) {
        console.log('✅ Teste de descriptografia bem-sucedido!');
        return true;
      } else {
        throw new Error('Dados descriptografados inválidos');
      }
    } catch (error) {
      console.error('❌ Erro no teste:', error.message);
      return false;
    }
  }
}

// Função principal
async function main() {
  const encryptor = new CredentialsEncryptor();
  
  console.log('🔐 CRIPTOGRAFIA DE CREDENCIAIS - QUANTOVAI');
  console.log('=========================================');
  console.log('');

  const inputFile = './google-service-account.json';
  const outputFile = './google-credentials.encrypted';

  try {
    // Criptografar credenciais
    const result = await encryptor.encryptCredentialsFile(inputFile, outputFile);
    
    // Testar descriptografia
    const testPassed = await encryptor.testDecryption(outputFile, result.encryptionKey);
    
    if (testPassed) {
      console.log('');
      console.log('🎉 CRIPTOGRAFIA CONCLUÍDA COM SUCESSO!');
      console.log('');
      console.log('📋 INFORMAÇÕES IMPORTANTES:');
      console.log(`   Arquivo criptografado: ${result.outputFile}`);
      console.log(`   Backup original: ${result.backupFile}`);
      console.log('');
      console.log('🔑 CHAVE DE CRIPTOGRAFIA (GUARDE COM SEGURANÇA):');
      console.log(`   ${result.encryptionKey}`);
      console.log('');
      console.log('⚠️  IMPORTANTE:');
      console.log('   1. Adicione a chave ao arquivo .env como GOOGLE_CREDENTIALS_KEY');
      console.log('   2. Nunca compartilhe esta chave');
      console.log('   3. Mantenha o backup em local seguro');
      console.log('   4. O arquivo original foi removido por segurança');
      console.log('');
      console.log('📝 PRÓXIMO PASSO:');
      console.log('   Crie um arquivo .env com:');
      console.log(`   GOOGLE_CREDENTIALS_KEY=${result.encryptionKey}`);
    } else {
      throw new Error('Falha no teste de descriptografia');
    }

  } catch (error) {
    console.error('');
    console.error('❌ ERRO NA CRIPTOGRAFIA:', error.message);
    console.error('');
    console.error('🔧 SOLUÇÕES:');
    console.error('   1. Verifique se o arquivo google-service-account.json existe');
    console.error('   2. Verifique se o arquivo contém credenciais válidas');
    console.error('   3. Verifique permissões de escrita no diretório');
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { CredentialsEncryptor };
