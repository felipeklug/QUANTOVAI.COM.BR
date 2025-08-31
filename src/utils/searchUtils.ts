import { calculatorConfigs, CalculatorConfig } from '../data/calculatorConfigs';

// Keyword mapping for common search terms
export const searchKeywords: Record<string, string[]> = {
  'floor-tiles': [
    'piso', 'pisos', 'azulejo', 'azulejos', 'ceramica', 'cerâmica', 
    'porcelanato', 'revestimento', 'ladrilho', 'ladrilhos', 'tile', 'tiles'
  ],
  'roof-pitch': [
    'telhado', 'telhados', 'inclinacao', 'inclinação', 'caimento', 
    'declividade', 'roof', 'pitch', 'cobertura'
  ],
  'roof-tiles': [
    'telha', 'telhas', 'cobertura', 'telhado', 'roof', 'tiles'
  ],
  'paint': [
    'tinta', 'tintas', 'pintura', 'paint', 'latex', 'acrilica', 'acrílica',
    'esmalte', 'verniz', 'primer', 'selador'
  ],
  'concrete': [
    'concreto', 'concrete', 'cimento', 'massa', 'argamassa', 'beton',
    'laje', 'fundacao', 'fundação', 'sapata'
  ],
  'mortar': [
    'argamassa', 'mortar', 'reboco', 'emboço', 'chapisco', 'massa',
    'assentamento', 'colante'
  ],
  'wallpaper': [
    'papel', 'parede', 'wallpaper', 'revestimento', 'decoracao', 'decoração'
  ],
  'lumens': [
    'luz', 'iluminacao', 'iluminação', 'lampada', 'lâmpada', 'led',
    'lumens', 'lighting', 'luminaria', 'luminária'
  ],
  'lawn-grass': [
    'grama', 'gramado', 'grass', 'lawn', 'jardim', 'verde', 'paisagismo'
  ],
  'ac-btus': [
    'ar', 'condicionado', 'btu', 'btus', 'refrigeracao', 'refrigeração',
    'climatizacao', 'climatização', 'split', 'janela'
  ],
  'grout': [
    'rejunte', 'grout', 'junta', 'juntas', 'acabamento'
  ],
  'baseboard': [
    'rodape', 'rodapé', 'guarnição', 'guarnição', 'acabamento', 'baseboard'
  ]
};

// Reverse mapping for quick lookup
export const keywordToCalculator: Record<string, string> = {};
Object.entries(searchKeywords).forEach(([calculatorId, keywords]) => {
  keywords.forEach(keyword => {
    keywordToCalculator[keyword.toLowerCase()] = calculatorId;
  });
});

export interface SearchResult {
  calculator: CalculatorConfig;
  relevanceScore: number;
  matchType: 'exact' | 'partial' | 'keyword' | 'category';
}

export function searchCalculators(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  const allCalculators = Object.values(calculatorConfigs);

  // Check for direct keyword matches first
  const directMatch = keywordToCalculator[searchTerm];
  if (directMatch && calculatorConfigs[directMatch]) {
    results.push({
      calculator: calculatorConfigs[directMatch],
      relevanceScore: 100,
      matchType: 'exact'
    });
  }

  // Search through all calculators
  allCalculators.forEach(calc => {
    // Skip if already found as direct match
    if (directMatch === calc.id) return;

    let relevanceScore = 0;
    let matchType: 'exact' | 'partial' | 'keyword' | 'category' = 'partial';

    // Exact title match
    if (calc.title.toLowerCase() === searchTerm) {
      relevanceScore = 95;
      matchType = 'exact';
    }
    // Partial title match
    else if (calc.title.toLowerCase().includes(searchTerm)) {
      relevanceScore = 80;
      matchType = 'partial';
    }
    // Description match
    else if (calc.description.toLowerCase().includes(searchTerm)) {
      relevanceScore = 60;
      matchType = 'partial';
    }
    // Category match
    else if (calc.category && calc.category.toLowerCase().includes(searchTerm)) {
      relevanceScore = 50;
      matchType = 'category';
    }
    // Keyword match
    else {
      const keywords = searchKeywords[calc.id] || [];
      const keywordMatch = keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm) || 
        searchTerm.includes(keyword.toLowerCase())
      );
      if (keywordMatch) {
        relevanceScore = 70;
        matchType = 'keyword';
      }
    }

    if (relevanceScore > 0) {
      results.push({
        calculator: calc,
        relevanceScore,
        matchType
      });
    }
  });

  // Sort by relevance score (highest first)
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export function findBestMatch(query: string): CalculatorConfig | null {
  const results = searchCalculators(query);
  return results.length > 0 ? results[0].calculator : null;
}

export function hasMultipleMatches(query: string): boolean {
  const results = searchCalculators(query);
  return results.length > 1;
}
