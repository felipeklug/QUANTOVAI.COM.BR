export interface BlogPost {
 id: string;
 slug: string;
 title: string;
 excerpt: string;
 content: string;
 imageUrl: string;
 authorName: string;
 authorAvatarUrl: string;
 publishedDate: string;
}

export const blogPosts: BlogPost[] = [
 {
 id: '1',
 slug: 'como-calcular-pisos-azulejos',
 title: 'Como Calcular a Quantidade de Pisos e Azulejos para sua Obra',
 excerpt: 'Aprenda a calcular corretamente a quantidade de pisos e azulejos necessários para sua obra, evitando desperdícios e garantindo que não falte material.',
 content: 'Calcular a quantidade correta de pisos e azulejos é fundamental para o sucesso de qualquer obra. Neste artigo, você aprenderá as técnicas e fórmulas essenciais para fazer esses cálculos de forma precisa.',
 imageUrl: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=400&fit=crop',
 authorName: 'João Silva',
 authorAvatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
 publishedDate: '2024-01-15',
 },
 {
 id: '2',
 slug: 'dicas-economia-materiais-construcao',
 title: 'Dicas para Economizar em Materiais de Construção',
 excerpt: 'Descubra estratégias eficazes para reduzir custos com materiais de construção sem comprometer a qualidade da sua obra.',
 content: 'A economia em materiais de construção é possível com planejamento adequado e conhecimento das melhores práticas do mercado.',
 imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
 authorName: 'Maria Santos',
 authorAvatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
 publishedDate: '2024-01-10',
 }
];
export const getBlogPost = (slug: string): BlogPost | undefined => {
 return blogPosts.find(post => post.slug === slug);
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
 return blogPosts
 .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
 .slice(0, limit);
};
