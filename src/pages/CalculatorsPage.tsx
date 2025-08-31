import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { calculatorConfigs } from '../data/calculatorConfigs';
import { Calculator, ArrowRight } from 'lucide-react';

export function CalculatorsPage() {
  // Group calculators by category
  const calculatorsByCategory = Object.values(calculatorConfigs).reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, typeof calculatorConfigs[keyof typeof calculatorConfigs][]>);

  const categories = Object.keys(calculatorsByCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl shadow-lg">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Todas as Calculadoras
            </h1>
          </div>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Descubra todas as nossas calculadoras especializadas para construção, reforma e projetos. 
            Ferramentas precisas para profissionais e proprietários.
          </p>
        </div>
      </section>

      {/* Calculators Grid by Category */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-16">
              {/* Category Header */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                  {category}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"></div>
              </div>

              {/* Calculators Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {calculatorsByCategory[category].map((calculator) => {
                  const IconComponent = calculator.icon;
                  
                  return (
                    <a
                      key={calculator.id}
                      href={`/calculadora/${calculator.id}`}
                      className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl 
                      transition-all duration-300 border border-neutral-200/50 
                      hover:border-brand-300 hover:-translate-y-1"
                    >
                      {/* Icon */}
                      <div className="flex items-center justify-center w-14 h-14 
                      bg-gradient-to-br from-brand-100 to-brand-200 
                      group-hover:from-brand-500 group-hover:to-brand-600
                      rounded-xl mb-4 transition-all duration-300">
                        <IconComponent className="h-7 w-7 text-brand-600 group-hover:text-white transition-colors duration-300" />
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-neutral-900 group-hover:text-brand-600 transition-colors duration-300">
                          {calculator.title}
                        </h3>
                        
                        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
                          {calculator.description}
                        </p>

                        {/* Action */}
                        <div className="flex items-center gap-2 text-brand-600 group-hover:text-brand-700 transition-colors duration-300">
                          <span className="text-sm font-medium">Calcular agora</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
