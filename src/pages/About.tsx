import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackButton } from '../components/BackButton';
import { Card } from '../components/Card';

export const AboutPage: React.FC = () => {
 return (
 <div className="min-h-screen bg-surface">
 <Header />
 <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
 <div className="mb-6">
 <BackButton to="/" variant="minimal" />
 </div>
 <h1 className="text-h1 font-heading text-text text-center mb-4">Sobre o QuantoVai</h1>
 <p className="text-body md:text-xl text-neutral-700 text-center mb-12">
 Nossa missão é simples: ajudar você a evitar desperdício e economizar dinheiro na sua obra ou projeto de jardinagem.
 </p>

 <Card className="p-8 mb-8">
 <h2 className="text-h2 font-heading text-text mb-4">Nossa Filosofia</h2>
 <div className="prose prose-neutral max-w-none text-body space-y-4">
 <p>
 Acreditamos que todo projeto, grande ou pequeno, começa com um bom planejamento. Uma das maiores fontes de estresse e custo extra em uma obra é a compra incorreta de materiais. Comprar de menos causa atrasos, enquanto comprar demais gera desperdício de material e dinheiro.
 </p>
 <p>
 O <strong>quantovai.com.br</strong> nasceu para resolver esse problema. Criamos calculadoras online, gratuitas e fáceis de usar, que fornecem estimativas precisas e confiáveis. Tudo com transparência total sobre as fórmulas e suposições utilizadas.
 </p>
 <p>
 O <strong>QuantoVai.com.br é um ativo digital da Fator K Network</strong>, uma rede especializada em desenvolvimento de soluções digitais inovadoras para diversos setores, sempre com foco na qualidade, usabilidade e valor agregado para os usuários.
 </p>
 </div>
 </Card>

 <Card className="p-8 mb-8">
 <h2 className="text-h2 font-heading text-text mb-4">Como Ganhamos Dinheiro?</h2>
 <div className="prose prose-neutral max-w-none text-body space-y-4">
 <p>
 Manter um serviço de qualidade tem custos. Para que o QuantoVai continue gratuito para todos, nossa monetização é baseada em duas fontes principais:
 </p>
 <ul>
 <li><strong>Anúncios (Ads):</strong> Exibimos publicidade de forma discreta e não intrusiva em nosso site. Nunca colocaremos um anúncio que atrapalhe o uso da calculadora.</li>
 <li><strong>Links de Afiliados:</strong> Quando você usa nossos links para comprar materiais em lojas parceiras, podemos receber uma pequena comissão, sem nenhum custo adicional para você.</li>
 </ul>
 <p>
 Este modelo nos permite continuar desenvolvendo novas ferramentas e mantendo as existentes sempre atualizadas.
 </p>
 </div>
 </Card>

 <Card className="p-8">
 <h2 className="text-h2 font-heading text-text mb-4">Nossa Responsabilidade</h2>
 <div className="prose prose-neutral max-w-none text-body space-y-4">
 <p>
 Entendemos a importância de fornecer informações corretas. Nossos cálculos são baseados em manuais técnicos e boas práticas da construção civil. No entanto, eles são <strong>estimativas</strong>. Fatores como a habilidade do profissional, a qualidade do material e as condições específicas do local podem influenciar o consumo real.
 </p>
 <p>
 Por isso, sempre recomendamos:
 </p>
 <ul>
 <li>Incluir uma margem de segurança (perda), que já vem sugerida em nossas calculadoras.</li>
 <li>Consultar um profissional qualificado para validar as quantidades antes de grandes compras.</li>
 <li>Ler as especificações de rendimento na embalagem do produto que você escolheu.</li>
 </ul>
 </div>
 </Card>

 </main>
 <Footer />
 </div>
 );
};
