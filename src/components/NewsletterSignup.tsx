import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Gift, TrendingUp } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Por favor, insira um email válido');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simular envio (integrar com serviço real como Mailchimp, ConvertKit, etc.)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você integraria com seu serviço de email marketing
      console.log('Newsletter signup:', email);
      
      setIsSubscribed(true);
      setEmail('');
      
      // Track event for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: 'newsletter'
        });
      }
      
    } catch (err) {
      setError('Erro ao cadastrar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-900 mb-2">
            Inscrição Confirmada! 🎉
          </h3>
          <p className="text-green-700 mb-4">
            Você receberá dicas exclusivas sobre construção e economia em obras.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsSubscribed(false)}
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Cadastrar Outro Email
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-brand-50 to-blue-50 border-brand-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-100 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full opacity-30 translate-y-12 -translate-x-12"></div>
      
      <div className="relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full mb-4">
            <Gift className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">Newsletter Gratuita</span>
          </div>
          
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">
            Dicas Exclusivas de Construção
          </h3>
          <p className="text-neutral-600 max-w-md mx-auto">
            Receba semanalmente dicas para economizar na sua obra, novidades sobre materiais e tutoriais exclusivos.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: TrendingUp, title: 'Economia', desc: 'Dicas para economizar até 30%' },
            { icon: Mail, title: 'Tutoriais', desc: 'Guias práticos semanais' },
            { icon: Gift, title: 'Exclusivo', desc: 'Conteúdo só para assinantes' }
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-3 bg-white/50 rounded-lg">
              <Icon className="w-6 h-6 text-brand-600 mx-auto mb-2" />
              <div className="font-medium text-sm text-neutral-900">{title}</div>
              <div className="text-xs text-neutral-600">{desc}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center"
              required
            />
            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Cadastrando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Quero Receber Dicas Grátis
              </>
            )}
          </Button>
        </form>

        <p className="text-xs text-neutral-500 text-center mt-4">
          Sem spam. Cancele quando quiser. Seus dados estão seguros.
        </p>
      </div>
    </Card>
  );
};
