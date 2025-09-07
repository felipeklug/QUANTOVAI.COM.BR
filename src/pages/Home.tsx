import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CalculatorCard } from "../components/CalculatorCard";
import { ModernCard } from "../components/ModernCard";
import { AdSlot } from "../components/AdSlot";
import { useAdLoader } from '../hooks/useAdLoader';
import { useGradientBorder } from '../hooks/useTheme';
import { Search } from "lucide-react";
import { Accordion } from "../components/Accordion";
import { CategoryButton } from "../components/CategoryButton";
import { SuggestionChip } from "../components/SuggestionChip";
import { BlogSection } from "../components/BlogSection";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { StickyAd, useStickyAd } from "../components/StickyAd";
import { InFeedAd, BlogSectionAd } from "../components/InFeedAd";
import { SEOHead, generatePageSEO } from "../components/SEOHead";
import { calculatorConfigs } from "../data/calculatorConfigs";
import { findBestMatch, hasMultipleMatches } from "../utils/searchUtils";

const POPULAR_CALCS_IDS = ['roof-pitch', 'wallpaper', 'floor-tiles', 'paint', 'mortar', 'roof-tiles'];

export function Home(){
 const { adsVisible, triggerAdLoad } = useAdLoader();
 const { shouldShow: shouldShowStickyAd } = useStickyAd();
 const { getGradientBackground } = useGradientBorder();

 const [searchQuery, setSearchQuery] = useState("");

 const allCalculators = Object.values(calculatorConfigs);
 const popularCalculators = POPULAR_CALCS_IDS.map(id => calculatorConfigs[id]).filter(Boolean);

 // Função de busca aprimorada
 const handleSearch = (e: React.FormEvent) => {
   e.preventDefault();
   if (searchQuery.trim()) {
     const query = searchQuery.trim();

     // Usar o sistema de busca aprimorado
     const bestMatch = findBestMatch(query);
     const multipleMatches = hasMultipleMatches(query);

     if (bestMatch && !multipleMatches) {
       // Se há uma correspondência clara, navegar diretamente
       window.location.href = `/calculadora/${bestMatch.id}`;
     } else if (bestMatch || multipleMatches) {
       // Se há múltiplas correspondências, mostrar página de resultados
       window.location.href = `/busca?q=${encodeURIComponent(query)}`;
     } else {
       // Se não encontrar nada, rolar para seção de calculadoras
       const calculatorSection = document.getElementById('calculadoras');
       if (calculatorSection) {
         calculatorSection.scrollIntoView({ behavior: 'smooth' });
       }
     }
   }
 };

 const handleKeyPress = (e: React.KeyboardEvent) => {
   if (e.key === 'Enter') {
     handleSearch(e as any);
   }
 };

 return (
 <div className="min-h-screen bg-surface" onClick={triggerAdLoad} onFocus={triggerAdLoad} onScroll={triggerAdLoad}>
 <SEOHead seo={generatePageSEO('home')} />
 <Header />
 <main className="mx-auto max-w-6xl px-4">
 {/* Hero */}
 <section className="py-12 md:py-16 text-center">
 <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-text">Calcule antes de comprar</h1>
 <p className="mt-3 max-w-2xl mx-auto text-body text-neutral-700">
 Descubra a quantidade exata de material para sua obra ou jardim — rápido e sem desperdício.
 </p>
 {/* Search */}
 <div className="mt-8 max-w-4xl mx-auto">
 <form onSubmit={handleSearch} className="relative p-1 rounded-3xl bg-gradient-to-r from-brand-500 via-brand-600 to-neutral-800">
 <div className="relative">
 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-8">
 <Search className="w-8 h-8 text-brand-600 " />
 </div>
 <input
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 onKeyPress={handleKeyPress}
 placeholder="O que você quer calcular? Ex: pisos, tinta, concreto..."
 className="w-full h-20 rounded-3xl border-0
 bg-white
 pl-20 pr-32 text-xl text-neutral-900
 placeholder:text-neutral-500
 outline-none shadow-xl shadow-brand-500/20
 focus:ring-4 focus:ring-brand-500/30
 hover:shadow-2xl hover:shadow-brand-500/30
 transition-all duration-300 font-medium backdrop-blur-sm"
 />
 {/* Search Button */}
 <button
 type="submit"
 className="absolute inset-y-0 right-0 flex items-center pr-4
 text-white font-bold text-lg
 bg-gradient-to-r from-brand-500 to-brand-600
 hover:from-brand-600 hover:to-brand-700
 rounded-r-3xl px-6
 transition-all duration-300
 hover:shadow-lg hover:shadow-brand-500/30
 focus:outline-none focus:ring-4 focus:ring-brand-500/30
 active:scale-95"
 >
 Buscar
 </button>
 </div>
 </form>
 </div>

 {/* Sugestões rápidas */}
 <div className="mt-6 flex flex-wrap justify-center gap-3">
 {[
 { name: 'Pisos', id: 'floor-tiles' },
 { name: 'Tinta', id: 'paint' },
 { name: 'Concreto', id: 'concrete' },
 { name: 'Ar Condicionado', id: 'ac-btus' },
 { name: 'Grama', id: 'lawn-grass' }
 ].map((suggestion) => (
 <SuggestionChip
 key={suggestion.id}
 href={`/calculator/${suggestion.id}`}
 >
 {suggestion.name}
 </SuggestionChip>
 ))}
 </div>
 </section>

 {/* Category Buttons */}
 <section className="py-4">
 <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
 {allCalculators.map((config) => (
 <CategoryButton 
 key={config.id}
 href={`/calculator/${config.id}`}
 title={config.title}
 Icon={config.icon}
 />
 ))}
 </div>
 </section>
 
 {/* Anúncio estratégico após categorias */}
 <AdSlot
 id="home-ad-1"
 className="my-8"
 load={adsVisible}
 format="auto"
 />

 {/* Main Grid */}
 <section id="calculadoras" className="py-8">
 <div className="text-center mb-12">
 <h2 className="text-4xl font-bold font-heading text-neutral-900 mb-4">
 Calculadoras Populares
 </h2>
 <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
 As ferramentas mais utilizadas para seus projetos de construção e jardim
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {popularCalculators.map((config, index) => (
 <React.Fragment key={config.id}>
 <ModernCard
 href={`/calculator/${config.id}`}
 title={config.title}
 desc={config.description}
 Icon={config.icon}
 />
 {/* Anúncio in-feed após 3ª calculadora */}
 {index === 2 && (
 <div className="md:col-span-2 lg:col-span-3">
 <InFeedAd
 id="home-infeed-1"
 load={adsVisible}
 title="Materiais Recomendados"
 />
 </div>
 )}
 </React.Fragment>
 ))}
 </div>

 {/* Call to action para ver todas */}
 <div className="text-center mt-12">
 <a href="/calculadoras"
 className="inline-flex items-center gap-3 px-8 py-4
 bg-brand-500 hover:bg-brand-600
 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25
 hover:shadow-xl hover:shadow-brand-500/40
 transition-all duration-300 transform hover:scale-105
 border-2 border-brand-500 hover:border-brand-600">
 <span>Ver Todas as Calculadoras</span>
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
 </svg>
 </a>
 </div>
 </section>

 {/* How it works */}
 <section className="py-12 my-12 bg-card-surface border border-neutral-200/80 rounded-2xl">
 <h2 className="text-center text-h2 font-heading text-text">Simples, rápido e confiável</h2>
 <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
 {[
 {n:"1",t:"Informe as medidas",d:"Preencha campos simples e com unidades claras, como metros e centímetros."},
 {n:"2",t:"Calcule na hora",d:"Nosso sistema gera o resultado com uma margem de segurança para evitar perdas."},
 {n:"3",t:"Compre certo",d:"Use a lista de materiais para comprar a quantidade exata, sem desperdício."}
 ].map(s=>(
 <div key={s.n} className="text-center p-4">
 <div className="text-brand-500 text-5xl font-bold font-heading mb-3">{s.n}</div>
 <div className="font-semibold mt-1 text-h3 text-text">{s.t}</div>
 <p className="text-body text-neutral-700 mt-2">{s.d}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Blog Section */}
 <div className="grid lg:grid-cols-4 gap-8">
 <div className="lg:col-span-3">
 <BlogSection />
 </div>
 <div className="lg:col-span-1">
 <BlogSectionAd id="blog-sidebar-ad" load={adsVisible} />
 </div>
 </div>

 {/* Newsletter Signup */}
 <section className="py-16 max-w-4xl mx-auto px-4">
 <NewsletterSignup />
 </section>

 {/* FAQ */}
 <section className="py-16 max-w-4xl mx-auto">
 <div className="text-center mb-12">
 <h2 className="text-4xl font-bold font-heading text-neutral-900 mb-4">
 Perguntas Frequentes
 </h2>
 <p className="text-lg text-neutral-600 ">
 Tire suas dúvidas sobre nossas calculadoras
 </p>
 </div>

 <div className="space-y-4">
 <Accordion title="Os cálculos são 100% precisos?">
 Nossas calculadoras fornecem estimativas de alta precisão baseadas em padrões da indústria da construção civil. Incluímos margens de segurança para perdas e recortes, mas sempre recomendamos comprar uma pequena quantidade extra e consultar um profissional qualificado para projetos complexos.
 </Accordion>

 <Accordion title="O site é realmente gratuito?">
 Sim! Todas as nossas calculadoras são 100% gratuitas para uso pessoal e profissional. Mantemos o site através de anúncios discretos e parcerias com fornecedores, sem nenhum custo para você.
 </Accordion>

 <Accordion title="Posso confiar nos resultados para comprar materiais?">
 Nossos cálculos são baseados em fórmulas técnicas reconhecidas e incluem margens de segurança. No entanto, sempre recomendamos consultar um profissional para projetos grandes ou complexos, pois cada obra tem suas particularidades.
 </Accordion>

 <Accordion title="Como vocês calculam as margens de perda?">
 Utilizamos percentuais padrão da indústria: 10% para pisos em layout reto, 15% para layouts diagonais, 5-10% para tintas dependendo da superfície, e margens específicas para cada tipo de material baseadas em boas práticas da construção.
 </Accordion>

 <Accordion title="Posso usar as calculadoras para projetos comerciais?">
 Sim! Nossas calculadoras são adequadas tanto para projetos residenciais quanto comerciais. Para obras de grande porte, recomendamos sempre a validação dos resultados com um engenheiro ou arquiteto.
 </Accordion>

 <Accordion title="Vocês têm calculadoras para outros materiais?">
 Estamos constantemente expandindo nossa biblioteca de calculadoras. Se você tem sugestões de novos materiais ou cálculos que gostaria de ver no site, entre em contato conosco!
 </Accordion>

 <Accordion title="Os resultados consideram diferentes marcas de materiais?">
 Nossos cálculos são baseados em medidas e especificações padrão do mercado. Sempre verifique as especificações do fabricante do material escolhido, pois pode haver pequenas variações entre marcas.
 </Accordion>
 </div>
 </section>
 
 {/* Anúncio final - alta conversão */}
 <AdSlot
 id="home-ad-2"
 className="my-10"
 load={adsVisible}
 format="rectangle"
 />
 </main>
 <Footer />

 {/* Sticky Ad - aparece após scroll */}
 <StickyAd
 position="bottom"
 load={shouldShowStickyAd && adsVisible}
 />
 </div>
 );
}
