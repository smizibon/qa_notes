import { useState, useEffect } from 'react';
import { Menu, X, Home, FileCode, ExternalLink, GraduationCap, BookOpen, Code, Smartphone, GitBranch, Container, Workflow, Brain, ClipboardCheck } from 'lucide-react';
import { loadJsonFile, ErrorHandler } from '../utils/errorHandler';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSelectedTopic: (topic: string) => void;
}

interface Link {
  name: string;
  url: string;
  tooltip: string;
}

export default function Navigation({ activeTab, setActiveTab, setSelectedTopic }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);

  // Load links from JSON with error handling
  useEffect(() => {
    const loadLinks = async () => {
      const { data, error } = await loadJsonFile<{ links: Link[] }>('/src/data/links/links.json');
      if (data && data.links) {
        setLinks(data.links);
      } else if (error) {
        console.error('Failed to load links:', error);
        // Provide fallback links
        setLinks([
          { name: 'TypeScript Docs', url: 'https://www.typescriptlang.org/', tooltip: 'Official TypeScript documentation' }
        ]);
      }
    };
    loadLinks();
  }, []);

  const topics = [
    { id: 'typescript', name: 'TypeScript', icon: FileCode, status: 'complete', color: 'blue' },
    { id: 'test-cases', name: 'Test Cases', icon: ClipboardCheck, status: 'planned', color: 'purple' },
    { id: 'api-testing', name: 'API Testing', icon: Code, status: 'planned', color: 'green' },
    { id: 'playwright', name: 'Playwright', icon: BookOpen, status: 'planned', color: 'orange' },
    { id: 'appium', name: 'Appium', icon: Smartphone, status: 'planned', color: 'pink' },
    { id: 'cicd', name: 'CI/CD', icon: GitBranch, status: 'planned', color: 'indigo' },
    { id: 'docker', name: 'Docker', icon: Container, status: 'planned', color: 'cyan' },
    { id: 'n8n', name: 'N8N', icon: Workflow, status: 'planned', color: 'red' },
    { id: 'llm-testing', name: 'LLM Testing', icon: Brain, status: 'planned', color: 'violet' },
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
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">QA Notes</span>
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

            {/* Topics Mega Menu */}
            <div 
              className="relative group/topics"
            >
              <button
                onMouseEnter={() => setIsTopicsOpen(true)}
                onClick={() => setActiveTab('lessons')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'lessons'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : 'text-gray-300 hover:bg-slate-700/50 hover:scale-105'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Topics
              </button>

              {/* Mega Menu Dropdown */}
              {isTopicsOpen && (
                <div 
                  className="absolute left-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl z-10"
                  onMouseEnter={() => setIsTopicsOpen(true)}
                  onMouseLeave={() => setIsTopicsOpen(false)}
                >
                  <div className="p-3">
                    <div className="mb-2 px-3 py-2">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Learning Topics</h3>
                    </div>
                    <div className="space-y-1">
                      {topics.map((topic) => {
                        const Icon = topic.icon;
                        const isActive = topic.status === 'complete';
                        return (
                          <button
                            key={topic.id}
                            onClick={() => {
                              if (isActive) {
                                setSelectedTopic(topic.id);
                                setActiveTab('lessons');
                                setIsTopicsOpen(false);
                              }
                            }}
                            disabled={!isActive}
                            className={`w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                              isActive
                                ? 'hover:bg-slate-700/50 hover:pl-4 cursor-pointer text-white'
                                : 'opacity-50 cursor-not-allowed text-gray-500'
                            }`}
                          >
                            <div className={`p-2 rounded-lg flex-shrink-0 ${
                              isActive 
                                ? 'bg-blue-500/20' 
                                : 'bg-slate-700/50'
                            }`}>
                              <Icon className={`h-4 w-4 ${
                                isActive 
                                  ? 'text-blue-400' 
                                  : 'text-gray-500'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${
                                  isActive ? 'text-gray-200' : 'text-gray-500'
                                }`}>
                                  {topic.name}
                                </span>
                                {topic.status === 'complete' && (
                                  <span className="px-1.5 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded">
                                    ✓
                                  </span>
                                )}
                              </div>
                              {topic.status === 'complete' && (
                                <p className="text-xs text-gray-400 mt-0.5">
                                  16 lessons
                                </p>
                              )}
                              {topic.status === 'planned' && (
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Coming soon
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Links Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-2 hover:scale-105">
                <ExternalLink className="h-4 w-4" />
                Links
              </button>
              <div className="absolute right-0 mt-2 w-72 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-10">
                <div className="py-2">
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-sm hover:bg-slate-700/50 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl hover:pl-6 group/item"
                    >
                      <div className="font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">
                        {link.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {link.tooltip}
                      </div>
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

              {/* Mobile Topics Section */}
              <div className="pt-2 border-t border-gray-700">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Topics</p>
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  const isActive = topic.status === 'complete';
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        if (isActive) {
                          setSelectedTopic(topic.id);
                          setActiveTab('lessons');
                          setIsMenuOpen(false);
                        }
                      }}
                      disabled={!isActive}
                      className={`w-full px-4 py-3 text-sm text-left flex items-center gap-3 ${
                        isActive
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                          : 'text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1">{topic.name}</span>
                      {topic.status === 'complete' && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                          ✓
                        </span>
                      )}
                      {topic.status === 'planned' && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-slate-700 text-gray-400 rounded-full">
                          Soon
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Links */}
              <div className="pt-2 border-t border-gray-700 mt-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Links</p>
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="font-medium text-gray-200 hover:text-blue-400">
                      {link.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {link.tooltip}
                    </div>
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
