import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Home } from './pages/Home';
import { CalculatorPage } from './pages/Calculator';
import { AboutPage } from './pages/About';
import { HowItWorksPage } from './pages/HowItWorks';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { NotFoundPage } from './pages/NotFound';

function App() {
 // Initialize theme hook
 useTheme();

 const renderPage = () => {
 const path = window.location.pathname;

 if (path === '/') {
 return <Home />;
 }
 if (path.startsWith('/calculator/')) {
 const id = path.split('/')[2];
 return <CalculatorPage calculatorId={id} />;
 }
 if (path === '/sobre') {
 return <AboutPage />;
 }
 if (path === '/como-funciona') {
 return <HowItWorksPage />;
 }
 if (path === '/blog') {
 return <BlogPage />;
 }
 if (path.startsWith('/blog/')) {
 const slug = path.split('/')[2];
 return <BlogPostPage postSlug={slug} />;
 }
 // A route for all calculators page
 if (path === '/calculadoras') {
 return <Home />;
 }
 return <NotFoundPage />;
 };

 return (
 <div className="app">
 {renderPage()}
 </div>
 );
}

export default App;
