import React from 'react';
import { ExternalLink, Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useBlogPosts, cleanExcerpt, formatDate } from '../hooks/useBlogPosts';
import { Card } from './Card';

export const BlogSection: React.FC = () => {
  const { posts, loading, error } = useBlogPosts(3);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-medium text-brand-700">Blog QuantoVai</span>
            </div>
            <h2 className="text-4xl font-bold font-heading text-neutral-900 mb-4">
              Últimas do Blog
            </h2>
            <p className="text-lg text-neutral-600">
              Carregando artigos mais recentes...
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-neutral-200 rounded mb-4"></div>
                <div className="h-6 bg-neutral-200 rounded mb-3"></div>
                <div className="h-3 bg-neutral-200 rounded mb-2"></div>
                <div className="h-3 bg-neutral-200 rounded mb-4"></div>
                <div className="h-8 bg-neutral-200 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-medium text-brand-700">Blog QuantoVai</span>
            </div>
            <h2 className="text-4xl font-bold font-heading text-neutral-900 mb-4">
              Últimas do Blog
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Dicas, tutoriais e novidades sobre construção e reforma
            </p>
            
            <Card className="p-8 max-w-md mx-auto">
              <BookOpen className="w-12 h-12 text-brand-500 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">
                Não foi possível carregar os posts do blog no momento.
              </p>
              <a 
                href="https://blog.quantovai.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
              >
                Visitar Blog
                <ExternalLink className="w-4 h-4" />
              </a>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-brand-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-brand-200 rounded-full opacity-30 blur-2xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">Blog QuantoVai</span>
          </div>
          <h2 className="text-4xl font-bold font-heading text-neutral-900 mb-4">
            Últimas do Blog
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Dicas práticas, tutoriais detalhados e novidades sobre construção, reforma e jardinagem
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {posts.map((post, index) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg"
            >
              <div className="p-6">
                {/* Badge de categoria */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                  <span className="text-xs font-medium text-brand-600 uppercase tracking-wide">
                    {index === 0 ? 'Mais Recente' : 'Artigo'}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors">
                  {post.title.rendered}
                </h3>

                {/* Excerpt */}
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {cleanExcerpt(post.excerpt.rendered)}
                </p>

                {/* Data */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.date)}</span>
                </div>

                {/* Link */}
                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm group-hover:gap-3 transition-all"
                >
                  Ler artigo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <a 
            href="https://blog.quantovai.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-medium"
          >
            <BookOpen className="w-5 h-5" />
            Ver todos os artigos
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
