import { useState } from 'react';
import { Menu, X, Home, FileCode, Info, ExternalLink, GraduationCap } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const practiceLinks = [
    { name: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play' },
    { name: 'TypeScript Exercises', url: 'https://typescript-exercises.github.io/' },
    { name: 'Type Challenges', url: 'https://github.com/type-challenges/type-challenges' },
    { name: 'Exercism TypeScript', url: 'https://exercism.org/tracks/typescript' },
  ];

  return (
    <nav className="bg-slate-800/70 backdrop-blur-xl shadow-2xl mb-8 rounded-2xl border border-slate-700/50 sticky top-4 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="relative">
              <FileCode className="h-8 w-8 text-blue-400" />
              <div className="absolute inset-0 blur-xl bg-blue-400/30"></div>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">TS Cheatsheet</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'text-gray-300 hover:bg-slate-700/50 hover:scale-105'
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'lessons'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'text-gray-300 hover:bg-slate-700/50 hover:scale-105'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Lessons
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'details'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'text-gray-300 hover:bg-slate-700/50 hover:scale-105'
              }`}
            >
              <Info className="h-4 w-4" />
              Details
            </button>

            {/* Practice Links Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-2 hover:scale-105">
                <ExternalLink className="h-4 w-4" />
                Practice Sites
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-10">
                <div className="py-2">
                  {practiceLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-sm text-gray-300 hover:bg-slate-700/50 hover:text-blue-400 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl hover:pl-6"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setActiveTab('home');
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium text-left flex items-center gap-2 ${
                  activeTab === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              <button
                onClick={() => {
                  setActiveTab('lessons');
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium text-left flex items-center gap-2 ${
                  activeTab === 'lessons'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Lessons
              </button>
              <button
                onClick={() => {
                  setActiveTab('details');
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium text-left flex items-center gap-2 ${
                  activeTab === 'details'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Info className="h-4 w-4" />
                Details
              </button>

              {/* Mobile Practice Links */}
              <div className="pt-2 border-t border-gray-700 mt-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Practice Sites</p>
                {practiceLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
