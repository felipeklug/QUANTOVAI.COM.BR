import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackButton } from '../components/BackButton';
import { blogPosts } from '../data/blogPosts';
import { NotFoundPage } from './NotFound';
import { Share2 } from 'lucide-react';
import { Button } from '../components/Button';

interface BlogPostPageProps {
 postSlug: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ postSlug }) => {
 const post = blogPosts.find(p => p.slug === postSlug);

 if (!post) {
 return <NotFoundPage />;
 }

 return (
 <div className="min-h-screen bg-surface">
 <Header />
 <main className="py-12 md:py-16">
 <article className="max-w-4xl mx-auto px-4">
 <div className="mb-6">
 <BackButton to="/blog" variant="minimal" label="Voltar ao Blog" />
 </div>
 <header className="text-center mb-12">
 <h1 className="text-h1 md:text-5xl font-heading text-text mb-4">{post.title}</h1>
 <p className="text-body text-neutral-700">{post.excerpt}</p>
 <div className="flex items-center justify-center space-x-4 mt-6">
 <img src={post.authorAvatarUrl} alt={post.authorName} className="w-12 h-12 rounded-full" />
 <div>
 <p className="font-medium text-text">{post.authorName}</p>
 <p className="text-neutral-700 text-caption">{new Date(post.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
 </div>
 </div>
 </header>

 <div className="aspect-video rounded-lg overflow-hidden mb-12 shadow-md">
 <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
 </div>

 <div 
 className="prose prose-lg max-w-2xl mx-auto"
 dangerouslySetInnerHTML={{ __html: post.content }}
 />

 <footer className="max-w-2xl mx-auto mt-12 pt-8 border-t border-neutral-200/80 flex items-center justify-between">
 <p className="text-caption text-neutral-700 font-medium">Gostou do artigo?</p>
 <Button variant="tertiary">
 <Share2 className="w-4 h-4 mr-2" />
 Compartilhar
 </Button>
 </footer>
 </article>
 </main>
 <Footer />
 </div>
 );
};
