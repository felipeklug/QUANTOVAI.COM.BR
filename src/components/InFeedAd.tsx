import React from 'react';
import { AdSlot } from './AdSlot';
import { Card } from './Card';

interface InFeedAdProps {
  id: string;
  load?: boolean;
  className?: string;
  title?: string;
}

export const InFeedAd: React.FC<InFeedAdProps> = ({ 
  id, 
  load = false, 
  className = '',
  title = 'Conteúdo Patrocinado'
}) => {
  return (
    <Card className={`p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 border-neutral-200 ${className}`}>
      {/* Ad label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
          {title}
        </span>
        <span className="text-xs text-neutral-500 bg-neutral-200 px-2 py-1 rounded-full">
          Anúncio
        </span>
      </div>

      {/* Ad content */}
      <div className="min-h-[200px] flex items-center justify-center">
        <AdSlot
          id={id}
          load={load}
          format="auto"
          className="w-full"
          style={{ minHeight: '200px' }}
        />
      </div>

      {/* Disclaimer */}
      <div className="mt-3 pt-3 border-t border-neutral-200">
        <p className="text-xs text-neutral-500 text-center">
          Este conteúdo é fornecido por nossos parceiros publicitários
        </p>
      </div>
    </Card>
  );
};

// Specialized in-feed ad for calculator results
export const CalculatorResultAd: React.FC<{ id: string; load?: boolean }> = ({ id, load }) => {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          💡 Produtos Recomendados
        </h3>
        <p className="text-sm text-blue-700">
          Encontre os melhores materiais para seu projeto
        </p>
      </div>
      
      <AdSlot
        id={id}
        load={load}
        format="rectangle"
        className="mx-auto"
      />
      
      <div className="mt-4 text-center">
        <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
          Conteúdo Patrocinado
        </span>
      </div>
    </div>
  );
};

// Ad for blog section
export const BlogSectionAd: React.FC<{ id: string; load?: boolean }> = ({ id, load }) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm font-medium text-neutral-700">Recomendado para você</span>
        <span className="text-xs text-neutral-500 ml-auto">Anúncio</span>
      </div>
      
      <AdSlot
        id={id}
        load={load}
        format="auto"
        className="min-h-[250px]"
      />
    </div>
  );
};
