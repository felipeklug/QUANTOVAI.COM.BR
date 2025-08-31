import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CalculatorCard } from '../components/CalculatorCard';
import { BackButton } from '../components/BackButton';
import { Search, Calculator } from 'lucide-react';
import { searchCalculators, SearchResult } from '../utils/searchUtils';

interface SearchResultsPageProps {
  query: string;
}

export function SearchResultsPage({ query }: SearchResultsPageProps) {
  const results = searchCalculators(query);

  const getMatchTypeLabel = (matchType: SearchResult['matchType']) => {
    switch (matchType) {
      case 'exact': return 'Correspondência exata';
      case 'partial': return 'Correspondência parcial';
      case 'keyword': return 'Palavra-chave';
      case 'category': return 'Categoria';
      default: return '';
    }
  };

  const getMatchTypeColor = (matchType: SearchResult['matchType']) => {
    switch (matchType) {
      case 'exact': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-blue-100 text-blue-800';
      case 'keyword': return 'bg-yellow-100 text-yellow-800';
      case 'category': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton to="/" className="mb-4" />
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-8 h-8 text-brand-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Resultados da Busca
            </h1>
          </div>
          <p className="text-lg text-neutral-600">
            Resultados para: <span className="font-semibold text-brand-600">"{query}"</span>
          </p>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Calculator className="w-4 h-4" />
              <span>{results.length} calculadora{results.length !== 1 ? 's' : ''} encontrada{results.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((result, index) => (
                <div key={result.calculator.id} className="relative">
                  {/* Match type badge */}
                  <div className="absolute -top-2 -right-2 z-10">
                    <span className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${getMatchTypeColor(result.matchType)}
                    `}>
                      {getMatchTypeLabel(result.matchType)}
                    </span>
                  </div>
                  
                  {/* Relevance score for debugging (remove in production) */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {result.relevanceScore}%
                      </span>
                    </div>
                  )}

                  <CalculatorCard
                    id={result.calculator.id}
                    title={result.calculator.title}
                    description={result.calculator.description}
                    icon={result.calculator.icon}
                    href={`/calculadora/${result.calculator.id}`}
                    priority={index < 3} // High priority for first 3 results
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Nenhum resultado encontrado
            </h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Não encontramos calculadoras que correspondam ao termo "{query}". 
              Tente usar palavras-chave diferentes ou mais específicas.
            </p>
            
            {/* Suggestions */}
            <div className="bg-neutral-50 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-neutral-900 mb-4">Sugestões de busca:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  'pisos', 'tinta', 'concreto', 'telhado', 'grama', 
                  'ar condicionado', 'iluminação', 'argamassa'
                ].map((suggestion) => (
                  <a
                    key={suggestion}
                    href={`/busca?q=${encodeURIComponent(suggestion)}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm
                             bg-white border border-neutral-200 text-neutral-700
                             hover:border-brand-500 hover:text-brand-600
                             transition-colors duration-200"
                  >
                    {suggestion}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to all calculators */}
        <div className="text-center mt-12 pt-8 border-t border-neutral-200">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3
                     bg-brand-500 hover:bg-brand-600 text-white font-semibold
                     rounded-xl transition-colors duration-200"
          >
            <Calculator className="w-5 h-5" />
            Ver Todas as Calculadoras
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
