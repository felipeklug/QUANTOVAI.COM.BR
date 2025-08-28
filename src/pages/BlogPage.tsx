import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackButton } from '../components/BackButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { blogPosts } from '../data/blogPosts';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, TrendingUp, Clock } from 'lucide-react';

const BlogPostCard: React.FC<{ post: typeof blogPosts[0] }> = ({ post }) => {
 return (
 <motion.a
 href={`/blog/${post.slug}`}
 whileHover={{
 y: -8,
 scale: 1.02,
 boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1)'
 }}
 whileTap={{ scale: 0.98 }}
 className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl group"
 >
 <Card className="h-full overflow-hidden border-0 shadow-lg shadow-neutral-500/10
 bg-gradient-to-br from-white to-neutral-50/50
 
 hover:shadow-xl hover:shadow-emerald-500/10
 transition-all duration-500">
 <div className="aspect-video overflow-hidden relative">
 <img
 src={post.imageUrl}
 alt={post.title}
 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

 {/* Badge de categoria */}
 <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500/90 backdrop-blur-sm
 text-white text-xs font-semibold rounded-full">
 Construção
 </div>

 {/* Tempo de leitura */}
 <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1
 bg-black/20 backdrop-blur-sm text-white text-xs rounded-full">
 <Clock className="w-3 h-3" />
 <span>5 min</span>
 </div>
 </div>

 <CardHeader className="pb-3">
 <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium mb-2">
 <Calendar className="w-3 h-3" />
 {new Date(post.publishedDate).toLocaleDateString('pt-BR', {
 year: 'numeric',
 month: 'long',
 day: 'numeric'
 })}
 </div>
 <CardTitle className="text-lg font-bold text-neutral-900 
 group-hover:text-emerald-700 :text-emerald-300
 transition-colors duration-300 line-clamp-2">
 {post.title}
 </CardTitle>
 </CardHeader>

 <CardContent className="pt-0">
 <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed mb-4">
 {post.excerpt}
 </p>

 {/* Autor */}
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <img
 src={post.authorAvatarUrl}
 alt={post.authorName}
 className="w-6 h-6 rounded-full border border-neutral-200 "
 />
 <span className="text-xs text-neutral-500 font-medium">
 {post.authorName}
 </span>
 </div>

 {/* Indicador de leitura */}
 <div className="flex items-center gap-1 text-emerald-600 
 opacity-0 group-hover:opacity-100 transition-all duration-300
 transform translate-x-2 group-hover:translate-x-0">
 <span className="text-xs font-medium">Ler mais</span>
 <ArrowRight className="w-3 h-3" />
 </div>
 </div>
 </CardContent>
 </Card>
 </motion.a>
 );
};

export const BlogPage: React.FC = () => {
 const [featuredPost, ...otherPosts] = blogPosts;
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('Todos');

 const categories = ['Todos', 'Construção', 'Materiais', 'Dicas', 'Tendências'];

 const filteredPosts = otherPosts.filter(post => {
 const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
 post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
 return matchesSearch;
 });

 return (
 <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white ">
 <Header />

 <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
 <BackButton to="/" variant="minimal" />
 </div>

 {/* Hero Section Premium */}
 <section className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 text-white">
 <div className="absolute inset-0 opacity-20" style={{
 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
 }} />

 <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
 <div className="text-center max-w-4xl mx-auto">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 >
 <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
 Blog <span className="text-emerald-300">QuantoVai</span>
 </h1>
 <p className="text-xl md:text-2xl text-emerald-100 mb-8 leading-relaxed">
 Insights, dicas e tendências para seus projetos de construção
 </p>

 {/* Estatísticas */}
 <div className="flex flex-wrap justify-center gap-8 mb-12">
 <div className="text-center">
 <div className="text-3xl font-bold text-brand-300">100k+</div>
 <div className="text-sm text-brand-200">Leitores mensais</div>
 </div>
 <div className="text-center">
 <div className="text-3xl font-bold text-brand-300">500+</div>
 <div className="text-sm text-brand-200">Artigos publicados</div>
 </div>
 <div className="text-center">
 <div className="text-3xl font-bold text-brand-300">50+</div>
 <div className="text-sm text-brand-200">Especialistas</div>
 </div>
 </div>
 </motion.div>
 </div>
 </div>
 </section>

 <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
 {/* Barra de pesquisa e filtros premium */}
 <div className="mb-12">
 <div className="max-w-2xl mx-auto mb-8">
 <div className="relative">
 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
 <input
 type="text"
 placeholder="Pesquisar artigos..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 
 bg-white text-neutral-900 
 focus:ring-2 focus:ring-brand-500 focus:border-brand-500
 shadow-lg shadow-neutral-500/10 transition-all duration-300
 placeholder:text-neutral-500"
 />
 </div>
 </div>

 {/* Filtros de categoria */}
 <div className="flex flex-wrap justify-center gap-3">
 {categories.map((category) => (
 <button
 key={category}
 onClick={() => setSelectedCategory(category)}
 className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
 selectedCategory === category
 ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
 : 'bg-neutral-100 text-neutral-600 hover:bg-brand-50 :bg-neutral-700'
 }`}
 >
 {category}
 </button>
 ))}
 </div>
 </div>

 {/* Featured Post Premium */}
 <motion.a
 href={`/blog/${featuredPost.slug}`}
 className="block mb-16 group"
 whileHover={{ scale: 1.01 }}
 transition={{ duration: 0.3 }}
 >
 <Card className="grid md:grid-cols-5 overflow-hidden border-0 shadow-2xl shadow-neutral-500/20
 bg-gradient-to-br from-white via-neutral-50/50 to-brand-50/30
 
 hover:shadow-3xl hover:shadow-brand-500/20 transition-all duration-500">
 <div className="md:col-span-3 aspect-video md:aspect-auto overflow-hidden relative">
 <img
 src={featuredPost.imageUrl}
 alt={featuredPost.title}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

 {/* Badge premium */}
 <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2
 bg-gradient-to-r from-brand-500 to-brand-600
 text-white text-sm font-bold rounded-full shadow-lg">
 <TrendingUp className="w-4 h-4" />
 Artigo em Destaque
 </div>
 </div>

 <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
 <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mb-4">
 <Calendar className="w-4 h-4" />
 {new Date(featuredPost.publishedDate).toLocaleDateString('pt-BR', {
 year: 'numeric',
 month: 'long',
 day: 'numeric'
 })}
 </div>

 <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6
 group-hover:text-emerald-700 :text-emerald-300
 transition-colors duration-300 leading-tight">
 {featuredPost.title}
 </h2>

 <p className="text-lg text-neutral-600 mb-8 line-clamp-4 leading-relaxed">
 {featuredPost.excerpt}
 </p>

 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <img
 src={featuredPost.authorAvatarUrl}
 alt={featuredPost.authorName}
 className="w-12 h-12 rounded-full border-2 border-emerald-200 "
 />
 <div>
 <p className="font-semibold text-neutral-900 ">
 {featuredPost.authorName}
 </p>
 <p className="text-sm text-neutral-500 ">
 Especialista em Construção
 </p>
 </div>
 </div>

 <div className="flex items-center gap-2 text-brand-600 
 opacity-0 group-hover:opacity-100 transition-all duration-300
 transform translate-x-4 group-hover:translate-x-0">
 <span className="font-medium">Ler artigo</span>
 <ArrowRight className="w-5 h-5" />
 </div>
 </div>
 </div>
 </Card>
 </motion.a>

 {/* Seção de artigos com título premium */}
 <div className="mb-12">
 <div className="text-center mb-8">
 <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
 Últimos Artigos
 </h2>
 <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
 Mantenha-se atualizado com as melhores práticas e tendências da construção civil
 </p>
 </div>
 </div>

 {/* Grid de artigos premium */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
 {filteredPosts.map((post, index) => (
 <motion.div
 key={post.id}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 >
 <BlogPostCard post={post} />
 </motion.div>
 ))}
 </div>

 {/* Newsletter premium */}
 <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-3xl p-8 md:p-12 text-white text-center">
 <h3 className="text-2xl md:text-3xl font-bold mb-4">
 Receba nossos melhores conteúdos
 </h3>
 <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
 Cadastre-se em nossa newsletter e receba semanalmente dicas exclusivas,
 novos artigos e tendências do mercado de construção.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
 <input
 type="email"
 placeholder="Seu melhor e-mail"
 className="flex-1 px-4 py-3 rounded-xl text-neutral-900 placeholder:text-neutral-500
 focus:ring-2 focus:ring-brand-300 focus:outline-none"
 />
 <button className="px-8 py-3 bg-white text-brand-700 font-semibold rounded-xl
 hover:bg-emerald-50 transition-colors duration-300
 shadow-lg hover:shadow-xl">
 Inscrever-se
 </button>
 </div>
 </div>
 </main>
 <Footer />
 </div>
 );
};
