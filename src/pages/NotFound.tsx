import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';

export const NotFoundPage: React.FC = () => {
 return (
 <div className="min-h-screen bg-surface flex flex-col">
 <Header />
 <main className="flex-grow flex items-center justify-center text-center px-4">
 <div>
 <h1 className="text-6xl font-heading font-bold text-brand-500 mb-4">404</h1>
 <h2 className="text-h1 font-heading text-text mb-2">Página não encontrada</h2>
 <p className="text-body text-neutral-700 mb-8">
 A calculadora ou página que você procurou não existe ou foi movida.
 </p>
 <a href="/">
 <Button size="lg">Voltar para a Home</Button>
 </a>
 </div>
 </main>
 <Footer />
 </div>
 );
};
