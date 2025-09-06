import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackButton } from '../components/BackButton';
import { Card } from '../components/Card';
import { Shield, Eye, Cookie, Mail, AlertCircle } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-6">
          <BackButton to="/" variant="minimal" />
        </div>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full mb-4">
            <Shield className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">Política de Privacidade</span>
          </div>
          <h1 className="text-h1 font-heading text-text mb-4">Política de Privacidade</h1>
          <p className="text-body md:text-xl text-neutral-700">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">1. Informações que Coletamos</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                O QuantoVai coleta informações para fornecer e melhorar nossos serviços de calculadoras online. As informações coletadas incluem:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dados de Uso:</strong> Informações sobre como você usa nossas calculadoras, páginas visitadas e tempo de permanência</li>
                <li><strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador, sistema operacional e dados de dispositivo</li>
                <li><strong>Cookies:</strong> Pequenos arquivos armazenados em seu dispositivo para melhorar a experiência</li>
                <li><strong>Dados de Contato:</strong> Quando você nos contata voluntariamente através de formulários</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">2. Cookies e Tecnologias Similares</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Utilizamos cookies e tecnologias similares para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Melhorar a funcionalidade do site</li>
                <li>Analisar o tráfego e uso do site</li>
                <li>Personalizar conteúdo e anúncios</li>
                <li>Lembrar suas preferências</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 mb-1">Google AdSense</p>
                    <p className="text-amber-700 text-sm">
                      Utilizamos o Google AdSense para exibir anúncios. O Google pode usar cookies para veicular anúncios baseados em suas visitas anteriores a este e outros sites. Você pode desativar a publicidade personalizada visitando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline">Configurações de Anúncios do Google</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">3. Como Usamos suas Informações</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>Usamos as informações coletadas para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer e manter nossos serviços de calculadoras</li>
                <li>Melhorar e personalizar a experiência do usuário</li>
                <li>Analisar como nosso site é usado</li>
                <li>Comunicar com você quando necessário</li>
                <li>Cumprir obrigações legais</li>
                <li>Exibir anúncios relevantes através do Google AdSense</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">4. Compartilhamento de Informações</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> Para análise de tráfego e comportamento do usuário</li>
                <li><strong>Google AdSense:</strong> Para exibição de anúncios personalizados</li>
                <li><strong>Cumprimento Legal:</strong> Quando exigido por lei ou autoridades competentes</li>
                <li><strong>Proteção de Direitos:</strong> Para proteger nossos direitos, propriedade ou segurança</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">5. Seus Direitos (LGPD)</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirmação da existência de tratamento de dados</li>
                <li>Acesso aos seus dados pessoais</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                <li>Anonimização, bloqueio ou eliminação de dados</li>
                <li>Portabilidade dos dados</li>
                <li>Eliminação dos dados tratados com consentimento</li>
                <li>Revogação do consentimento</li>
              </ul>
              <p className="mt-4">
                Para exercer seus direitos, entre em contato conosco através do email: <strong>contato@quantovai.com.br</strong>
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">6. Segurança e Retenção</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Implementamos medidas de segurança adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Os dados são retidos apenas pelo tempo necessário para cumprir os propósitos descritos nesta política.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">7. Contato</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> contato@quantovai.com.br</li>
                <li><strong>Site:</strong> https://quantovai.com.br</li>
                <li><strong>Empresa:</strong> Fator K Network</li>
              </ul>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};
