import { useState, useEffect } from 'react';

export interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  date: string;
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

interface UseBlogPostsReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

export const useBlogPosts = (limit: number = 3): UseBlogPostsReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // URL da API REST do WordPress
        const apiUrl = `https://blog.quantovai.com.br/wp-json/wp/v2/posts?per_page=${limit}&_embed=wp:featuredmedia`;
        
        const response = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar posts: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Erro ao carregar posts do blog:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        
        // Fallback com posts fictícios para desenvolvimento
        setPosts([
          {
            id: 1,
            title: { rendered: 'Como Calcular Pisos para Sua Casa - Guia Completo' },
            excerpt: { rendered: 'Aprenda a calcular a quantidade exata de pisos necessária para sua obra, evitando desperdícios e economizando dinheiro...' },
            link: 'https://blog.quantovai.com.br/como-calcular-pisos-casa-guia-completo',
            date: new Date().toISOString(),
          },
          {
            id: 2,
            title: { rendered: '5 Erros Que Fazem Você Gastar Mais em Material de Construção' },
            excerpt: { rendered: 'Descubra os principais erros que podem aumentar significativamente o custo da sua obra e como evitá-los...' },
            link: 'https://blog.quantovai.com.br/5-erros-gastar-mais-material-construcao',
            date: new Date().toISOString(),
          },
          {
            id: 3,
            title: { rendered: 'Calculadora de Tinta: Economize até 30% na Sua Pintura' },
            excerpt: { rendered: 'Use nossa calculadora de tinta para descobrir exatamente quanto você precisa e economize dinheiro na sua pintura...' },
            link: 'https://blog.quantovai.com.br/calculadora-tinta-economize-30-pintura',
            date: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  return { posts, loading, error };
};

// Função utilitária para limpar HTML do excerpt
export const cleanExcerpt = (excerpt: string): string => {
  return excerpt
    .replace(/<[^>]*>/g, '') // Remove tags HTML
    .replace(/&[^;]+;/g, '') // Remove entidades HTML
    .trim()
    .substring(0, 150) + (excerpt.length > 150 ? '...' : '');
};

// Função utilitária para formatar data
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
