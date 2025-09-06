import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackButton } from '../components/BackButton';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Mail, MessageSquare, Send, CheckCircle, Building, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio (você pode integrar com um serviço real)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-6">
            <BackButton to="/" variant="minimal" />
          </div>
          
          <div className="text-center">
            <Card className="p-12 max-w-2xl mx-auto">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">Mensagem Enviada!</h1>
              <p className="text-lg text-neutral-600 mb-6">
                Obrigado por entrar em contato. Recebemos sua mensagem e responderemos em breve.
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="mr-4">
                Enviar Nova Mensagem
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Voltar ao Início
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-6">
          <BackButton to="/" variant="minimal" />
        </div>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full mb-4">
            <Mail className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">Contato</span>
          </div>
          <h1 className="text-h1 font-heading text-text mb-4">Entre em Contato</h1>
          <p className="text-body md:text-xl text-neutral-700 max-w-2xl mx-auto">
            Tem dúvidas sobre nossas calculadoras ou sugestões? Estamos aqui para ajudar!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário de Contato */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-brand-600" />
                <h2 className="text-h2 font-heading text-text">Envie sua Mensagem</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    Assunto *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Sobre o que você gostaria de falar?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva sua dúvida, sugestão ou feedback..."
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors resize-vertical"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-brand-600" />
                <h3 className="font-semibold text-neutral-900">Email Direto</h3>
              </div>
              <p className="text-neutral-600 mb-2">
                Para contato direto, envie um email para:
              </p>
              <a 
                href="mailto:contato@quantovai.com.br" 
                className="text-brand-600 hover:text-brand-700 font-medium"
              >
                contato@quantovai.com.br
              </a>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-5 h-5 text-brand-600" />
                <h3 className="font-semibold text-neutral-900">Empresa</h3>
              </div>
              <p className="text-neutral-600">
                <strong>Fator K Network</strong><br />
                Desenvolvimento de soluções digitais<br />
                Brasil
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-brand-600" />
                <h3 className="font-semibold text-neutral-900">Tempo de Resposta</h3>
              </div>
              <p className="text-neutral-600">
                Respondemos normalmente em até <strong>24 horas</strong> em dias úteis.
              </p>
            </Card>

            <Card className="p-6 bg-brand-50 border-brand-200">
              <h3 className="font-semibold text-brand-900 mb-3">Tipos de Contato</h3>
              <ul className="space-y-2 text-sm text-brand-700">
                <li>• Dúvidas sobre calculadoras</li>
                <li>• Sugestões de melhorias</li>
                <li>• Reportar problemas técnicos</li>
                <li>• Parcerias e colaborações</li>
                <li>• Feedback geral</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
