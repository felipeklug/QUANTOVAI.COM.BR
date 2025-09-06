import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackButton } from '../components/BackButton';
import { Card } from '../components/Card';
import { FileText, AlertTriangle, Scale, Shield, Users } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-6">
          <BackButton to="/" variant="minimal" />
        </div>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full mb-4">
            <FileText className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">Termos de Uso</span>
          </div>
          <h1 className="text-h1 font-heading text-text mb-4">Termos de Uso</h1>
          <p className="text-body md:text-xl text-neutral-700">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">1. Aceitação dos Termos</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Ao acessar e usar o site QuantoVai (quantovai.com.br), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nosso site.
              </p>
              <p>
                O QuantoVai é operado pela <strong>Fator K Network</strong>, e estes termos constituem um acordo legal entre você e nossa empresa.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">2. Descrição do Serviço</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                O QuantoVai oferece calculadoras online gratuitas para auxiliar em projetos de construção, reforma e jardinagem. Nossos serviços incluem:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Calculadoras de materiais de construção</li>
                <li>Estimativas de quantidades necessárias</li>
                <li>Informações educativas sobre construção e jardinagem</li>
                <li>Conteúdo do blog relacionado aos temas</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h2 className="text-h2 font-heading text-text">3. Limitações e Responsabilidades</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="font-medium text-amber-800 mb-2">⚠️ IMPORTANTE:</p>
                <p className="text-amber-700">
                  As calculadoras do QuantoVai fornecem <strong>estimativas</strong> baseadas em padrões da construção civil e não substituem a orientação de um profissional qualificado.
                </p>
              </div>
              <p>
                <strong>Limitações de Responsabilidade:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Os resultados são estimativas e podem variar conforme condições específicas do projeto</li>
                <li>Recomendamos sempre consultar um profissional qualificado</li>
                <li>Não nos responsabilizamos por perdas ou danos decorrentes do uso das calculadoras</li>
                <li>É responsabilidade do usuário verificar a adequação dos resultados ao seu projeto</li>
                <li>Sempre considere uma margem de segurança adicional nos cálculos</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">4. Uso Aceitável</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Ao usar o QuantoVai, você concorda em:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usar o site apenas para fins legais e legítimos</li>
                <li>Não interferir no funcionamento do site</li>
                <li>Não tentar acessar áreas restritas do sistema</li>
                <li>Não usar o site para atividades comerciais não autorizadas</li>
                <li>Respeitar os direitos de propriedade intelectual</li>
              </ul>
              <p>
                <strong>Proibições:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Copiar ou reproduzir o conteúdo sem autorização</li>
                <li>Usar bots ou scripts automatizados</li>
                <li>Tentar comprometer a segurança do site</li>
                <li>Enviar conteúdo malicioso ou spam</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">5. Propriedade Intelectual</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Todo o conteúdo do QuantoVai, incluindo mas não limitado a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Algoritmos e fórmulas das calculadoras</li>
                <li>Design e layout do site</li>
                <li>Textos, imagens e gráficos</li>
                <li>Marca e logotipos</li>
              </ul>
              <p>
                São propriedade da Fator K Network e estão protegidos por leis de direitos autorais e propriedade intelectual.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">6. Publicidade e Links</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                O QuantoVai pode exibir anúncios e conter links para sites de terceiros:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizamos o Google AdSense para exibir anúncios relevantes</li>
                <li>Podemos incluir links de afiliados para produtos relacionados</li>
                <li>Não somos responsáveis pelo conteúdo de sites de terceiros</li>
                <li>Os anúncios não constituem endosso dos produtos ou serviços</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">7. Modificações dos Termos</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Reservamos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. É sua responsabilidade revisar periodicamente estes termos.
              </p>
              <p>
                O uso continuado do site após as modificações constitui aceitação dos novos termos.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">8. Lei Aplicável e Jurisdição</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-brand-600" />
              <h2 className="text-h2 font-heading text-text">9. Contato</h2>
            </div>
            <div className="prose prose-neutral max-w-none text-body space-y-4">
              <p>
                Para questões sobre estes Termos de Uso, entre em contato:
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
