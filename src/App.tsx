import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Home } from './pages/Home';
import { CalculatorPage } from './pages/Calculator';
import { AboutPage } from './pages/About';
import { HowItWorksPage } from './pages/HowItWorks';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { SearchResultsPage } from './pages/SearchResults';
import { NotFoundPage } from './pages/NotFound';

function App() {
 // Initialize theme hook
 useTheme();

 const renderPage = () => {
 const path = window.location.pathname;
 const urlParams = new URLSearchParams(window.location.search);

 if (path === '/') {
 return <Home />;
 }
 if (path.startsWith('/calculadora/')) {
 const id = path.split('/')[2];
 return <CalculatorPage calculatorId={id} />;
 }
 if (path.startsWith('/calculator/')) {
 const id = path.split('/')[2];
 return <CalculatorPage calculatorId={id} />;
 }
 if (path === '/busca' || path === '/search') {
 const query = urlParams.get('q') || '';
 return <SearchResultsPage query={query} />;
 }
 if (path === '/sobre') {
 return <AboutPage />;
 }
 if (path === '/como-funciona') {
 return <HowItWorksPage />;
 }
 // A route for all calculators page
 if (path === '/calculadoras') {
 return <CalculatorsPage />;
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
