# 🔍 Configuração Google Indexing API - QuantoVai

## 📋 Pré-requisitos

### 1. Google Cloud Console
- Acesse: https://console.cloud.google.com/
- Crie um novo projeto ou use existente
- Ative a "Google Indexing API"

### 2. Service Account
1. Vá em "IAM & Admin" > "Service Accounts"
2. Clique "Create Service Account"
3. Nome: `quantovai-indexing`
4. Descrição: `Service account para indexação automática do QuantoVai`

### 3. Credenciais
1. Clique no service account criado
2. Vá em "Keys" > "Add Key" > "Create New Key"
3. Escolha "JSON"
4. Baixe o arquivo
5. Renomeie para `google-service-account.json`
6. Coloque na pasta raiz do projeto

### 4. Google Search Console
1. Acesse: https://search.google.com/search-console/
2. Adicione a propriedade: `https://quantovai.com.br`
3. Verifique a propriedade
4. Vá em "Settings" > "Users and permissions"
5. Adicione o email do service account com permissão "Owner"

## 🚀 Como Usar

### 1. Instalar Dependências
```bash
npm install googleapis
```

### 2. Executar Scripts

#### Gerar Sitemap
```bash
node scripts/generate-sitemap.js
```

#### Submeter URLs para Google
```bash
node scripts/submit-to-google.js
```

#### Listar todas as URLs
```bash
node scripts/generate-urls.js
```

## 📊 URLs do QuantoVai

### Páginas Principais (4)
- https://quantovai.com.br/
- https://quantovai.com.br/calculadoras
- https://quantovai.com.br/sobre
- https://quantovai.com.br/como-funciona

### Calculadoras (11)
- https://quantovai.com.br/calculadora/floor-tiles
- https://quantovai.com.br/calculadora/wallpaper
- https://quantovai.com.br/calculadora/paint
- https://quantovai.com.br/calculadora/mortar
- https://quantovai.com.br/calculadora/concrete
- https://quantovai.com.br/calculadora/roof-tiles
- https://quantovai.com.br/calculadora/roof-pitch
- https://quantovai.com.br/calculadora/grout
- https://quantovai.com.br/calculadora/baseboard
- https://quantovai.com.br/calculadora/grass-seed
- https://quantovai.com.br/calculadora/air-conditioning

**Total: 15 páginas**

## 🎯 Benefícios

### ✅ Indexação Rápida
- URLs submetidas são indexadas em minutos/horas
- Sem esperar o crawling natural do Google

### ✅ Controle Total
- Saber exatamente quais páginas foram submetidas
- Relatórios de sucesso/falha

### ✅ SEO Otimizado
- Sitemap.xml automático
- Robots.txt configurado
- Meta tags otimizadas

## 📈 Monitoramento

### Google Search Console
- Verifique indexação em "Coverage"
- Monitore performance em "Performance"
- Submeta sitemap em "Sitemaps"

### Logs dos Scripts
- Relatórios detalhados de submissão
- Status de cada URL
- Erros e sucessos

## 🔄 Automação

### Executar Periodicamente
```bash
# Adicionar ao crontab para execução semanal
0 9 * * 1 cd /path/to/quantovai && node scripts/submit-to-google.js
```

### CI/CD Integration
- Executar após cada deploy
- Submeter apenas URLs modificadas
- Relatórios automáticos

## 🛠️ Troubleshooting

### Erro de Autenticação
- Verifique se o arquivo JSON está correto
- Confirme permissões no Search Console

### Rate Limiting
- Scripts incluem delay entre requests
- Máximo 200 URLs por dia

### URLs não Indexadas
- Verifique se a página existe
- Confirme que não há erro 404
- Verifique robots.txt

## 📞 Suporte

Para dúvidas sobre a implementação:
1. Verifique logs dos scripts
2. Consulte documentação da Google Indexing API
3. Monitore Google Search Console
