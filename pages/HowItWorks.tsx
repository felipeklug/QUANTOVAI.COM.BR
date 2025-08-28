import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackButton } from '../components/BackButton';
import { Card } from '../components/Card';
import { calculatorConfigs } from '../data/calculatorConfigs';

export const HowItWorksPage: React.FC = () => {
 return (
 <div className="min-h-screen bg-surface">
 <Header />
 <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
 <div className="mb-6">
 <BackButton to="/" variant="minimal" />
 </div>
 <h1 className="text-h1 font-heading text-text text-center mb-4">Como Nossos Cálculos Funcionam</h1>
 <p className="text-body md:text-xl text-neutral-700 text-center mb-12">
 Transparência é fundamental. Veja aqui os princípios e as fórmulas por trás de cada calculadora.
 </p>

 <Card className="p-8 mb-8">
 <h2 className="text-h2 font-heading text-text mb-4">Princípios Gerais</h2>
 <div className="prose prose-neutral max-w-none text-body space-y-4">
 <p>
 Todas as nossas calculadoras seguem três regras de ouro para garantir resultados úteis e seguros para o seu bolso:
 </p>
 <ol>
 <li><strong>Cálculos Determinísticos:</strong> Usamos fórmulas matemáticas e físicas padrão da indústria. Não há "mágica", apenas ciência aplicada.</li>
 <li><strong>Parâmetros Ajustáveis:</strong> Sempre que possível, permitimos que você ajuste variáveis importantes, como a porcentagem de perda ou o rendimento específico de um produto.</li>
 <li><strong>Arredondamento Inteligente:</strong> Para itens vendidos em unidades fechadas (caixas, sacos, rolos), sempre arredondamos o resultado <strong>para cima</strong>. É melhor sobrar um pouco do que faltar no meio do serviço.</li>
 </ol>
 </div>
 </Card>

 <h2 className="text-h2 font-heading text-text text-center my-12">Detalhes por Calculadora</h2>

 <div className="space-y-8">
 {Object.values(calculatorConfigs).map(config => {
 const IconComponent = config.icon;
 return (
 <Card key={config.id} className="p-6 md:p-8" id={config.id}>
 <div className="flex items-center space-x-4 mb-4">
 <div className="w-10 h-10 bg-brand-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
 <IconComponent className="w-6 h-6" />
 </div>
 <h3 className="text-h2 font-heading text-text">{config.title}</h3>
 </div>
 <div className="prose prose-neutral max-w-none text-body space-y-4">
 <p>{config.description}</p>
 <h4 className="font-medium text-text">O que consideramos:</h4>
 <ul className="list-disc list-inside">
 {config.assumptions.map((item, index) => (
 <li key={index}>{item}</li>
 ))}
 </ul>
 <h4 className="font-medium text-text mt-4">Fórmula Principal:</h4>
 <pre className="text-caption text-neutral-700 bg-neutral-100 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">{config.formula}</pre>
 </div>
 </Card>
 )
 })}
 </div>
 </main>
 <Footer />
 </div>
 );
};
