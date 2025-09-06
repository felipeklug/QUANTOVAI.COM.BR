import React, { useEffect } from 'react';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  schema?: object;
}

interface SEOHeadProps {
  seo: SEOData;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ seo }) => {
  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Update meta description
    updateMetaTag('description', seo.description);

    // Update keywords if provided
    if (seo.keywords) {
      updateMetaTag('keywords', seo.keywords);
    }

    // Update canonical URL
    if (seo.canonical) {
      updateLinkTag('canonical', seo.canonical);
    }

    // Update Open Graph tags
    updateMetaProperty('og:title', seo.title);
    updateMetaProperty('og:description', seo.description);
    updateMetaProperty('og:url', window.location.href);
    updateMetaProperty('og:type', seo.ogType || 'website');
    
    if (seo.ogImage) {
      updateMetaProperty('og:image', seo.ogImage);
    }

    // Update Twitter Card tags
    updateMetaProperty('twitter:title', seo.title);
    updateMetaProperty('twitter:description', seo.description);
    updateMetaProperty('twitter:url', window.location.href);
    
    if (seo.ogImage) {
      updateMetaProperty('twitter:image', seo.ogImage);
    }

    // Update robots meta tag
    if (seo.noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Add structured data (Schema.org)
    if (seo.schema) {
      addStructuredData(seo.schema);
    }

  }, [seo]);

  return null; // This component doesn't render anything
};

// Helper functions
function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

function addStructuredData(schema: object) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// SEO data generators
export const generateCalculatorSEO = (calculatorId: string, config: any): SEOData => {
  const baseUrl = 'https://quantovai.com.br';
  
  return {
    title: `${config.title} - Calculadora Gratuita | QuantoVai`,
    description: `${config.description} Calcule grátis a quantidade exata de ${config.title.toLowerCase()} para sua obra. Evite desperdício e economize dinheiro.`,
    keywords: `calculadora ${config.title.toLowerCase()}, ${config.title.toLowerCase()} construção, quanto ${config.title.toLowerCase()} preciso, calculadora construção, materiais construção`,
    canonical: `${baseUrl}/calculadora/${calculatorId}`,
    ogImage: `${baseUrl}/og-calculator-${calculatorId}.png`,
    ogType: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": `Calculadora de ${config.title}`,
      "description": config.description,
      "url": `${baseUrl}/calculadora/${calculatorId}`,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL"
      },
      "provider": {
        "@type": "Organization",
        "name": "QuantoVai",
        "url": baseUrl
      }
    }
  };
};

export const generatePageSEO = (pageType: string, customData?: Partial<SEOData>): SEOData => {
  const baseUrl = 'https://quantovai.com.br';
  
  const seoData: Record<string, SEOData> = {
    home: {
      title: 'QuantoVai - Calculadoras Gratuitas para Construção e Jardim',
      description: 'Calcule a quantidade exata de materiais para sua obra ou jardim. Pisos, azulejos, tinta, concreto e muito mais. Grátis, rápido e confiável.',
      keywords: 'calculadora construção, pisos, azulejos, tinta, concreto, materiais construção, jardim, reforma',
      canonical: baseUrl,
      ogImage: `${baseUrl}/og-home.png`,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "QuantoVai",
        "description": "Calculadoras gratuitas para construção e jardim",
        "url": baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/busca?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Fator K Network",
          "url": baseUrl
        }
      }
    },
    calculadoras: {
      title: 'Todas as Calculadoras - QuantoVai',
      description: 'Explore todas as nossas calculadoras gratuitas para construção e jardim. Pisos, azulejos, tinta, concreto, grama e muito mais.',
      keywords: 'calculadoras construção, todas calculadoras, materiais construção, jardim',
      canonical: `${baseUrl}/calculadoras`,
      ogImage: `${baseUrl}/og-calculadoras.png`
    },
    sobre: {
      title: 'Sobre o QuantoVai - Nossa Missão e Filosofia',
      description: 'Conheça a história do QuantoVai e nossa missão de ajudar você a evitar desperdício e economizar dinheiro em sua obra ou projeto.',
      keywords: 'sobre quantovai, fator k network, calculadoras construção, missão',
      canonical: `${baseUrl}/sobre`,
      ogImage: `${baseUrl}/og-sobre.png`
    },
    'como-funciona': {
      title: 'Como Funciona - Guia Completo das Calculadoras QuantoVai',
      description: 'Aprenda como usar nossas calculadoras e entenda as fórmulas e considerações por trás de cada cálculo.',
      keywords: 'como funciona, guia calculadoras, fórmulas construção, tutorial',
      canonical: `${baseUrl}/como-funciona`,
      ogImage: `${baseUrl}/og-como-funciona.png`
    },
    'politica-de-privacidade': {
      title: 'Política de Privacidade - QuantoVai',
      description: 'Nossa política de privacidade e como protegemos seus dados pessoais de acordo com a LGPD.',
      canonical: `${baseUrl}/politica-de-privacidade`,
      noindex: false
    },
    'termos-de-uso': {
      title: 'Termos de Uso - QuantoVai',
      description: 'Termos e condições de uso do site QuantoVai e nossas calculadoras gratuitas.',
      canonical: `${baseUrl}/termos-de-uso`,
      noindex: false
    },
    contato: {
      title: 'Contato - Fale Conosco | QuantoVai',
      description: 'Entre em contato conosco para dúvidas, sugestões ou feedback sobre nossas calculadoras.',
      keywords: 'contato quantovai, suporte, dúvidas, feedback',
      canonical: `${baseUrl}/contato`,
      ogImage: `${baseUrl}/og-contato.png`
    }
  };

  const baseSEO = seoData[pageType] || seoData.home;
  
  return {
    ...baseSEO,
    ...customData
  };
};
