import { useState } from 'react';
import Home from './pages/Home';
import Navigation from './components/Navigation.tsx';
import Lessons from './pages/Lessons';
import Watch from './pages/Watch';
import AboutMe from './pages/AboutMe';
import Footer from './components/Footer';

export default function TypeScriptCheatsheet() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTopic, setSelectedTopic] = useState('typescript');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'about':
        return <AboutMe />;
      case 'lessons':
        return <Lessons selectedTopic={selectedTopic} />;
      case 'watch':
        return <Watch />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-4 md:p-8 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTYzZWIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} setSelectedTopic={setSelectedTopic} />
        {renderPage()}
        <Footer />
      </div>
    </div>
  );
}
