import { useState, useEffect } from 'react';
import { Menu, X, FileCode, ExternalLink, GraduationCap, BookOpen, Code, Smartphone, GitBranch, Container, Workflow, Brain, ClipboardCheck, TestTube2, Award, Wrench, MonitorPlay } from 'lucide-react';
import { loadJsonFile } from '../utils/errorHandler';

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

interface LinkCategory {
  name: string;
  icon: string;
  links: Link[];
}

// Icon mapping
const iconMap: Record<string, any> = {
  FileCode,
  TestTube2,
  Code,
  GitBranch,
  Smartphone,
  Award,
  Workflow,
  Brain,
  Wrench
};

export default function Navigation({ activeTab, setActiveTab, setSelectedTopic }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const [categories, setCategories] = useState<LinkCategory[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Load links from JSON with error handling
  useEffect(() => {
    const loadLinks = async () => {
      const { data, error } = await loadJsonFile<{ categories: LinkCategory[] }>('/src/data/links/links.json');
      if (data && data.categories) {
        setCategories(data.categories);
      } else if (error) {
        console.error('Failed to load links:', error);
        // Provide fallback category
        setCategories([
          { 
            name: 'TypeScript', 
            icon: 'FileCode',
            links: [{ name: 'TypeScript Docs', url: 'https://www.typescriptlang.org/', tooltip: 'Official TypeScript documentation' }]
          }
        ]);
      }
    };
    loadLinks();
  }, []);

  const topics = [
    { id: 'typescript', name: 'TypeScript', icon: FileCode, status: 'complete', color: 'blue', subtopics: [] },
    { id: 'test-cases', name: 'Test Cases', icon: ClipboardCheck, status: 'planned', color: 'purple', subtopics: [] },
    { id: 'api-testing', name: 'API Testing', icon: Code, status: 'planned', color: 'green', subtopics: [] },
    { id: 'playwright', name: 'Playwright', icon: BookOpen, status: 'planned', color: 'orange', subtopics: [] },
    { id: 'appium', name: 'Appium', icon: Smartphone, status: 'planned', color: 'pink', subtopics: [] },
    { id: 'cicd', name: 'CI/CD', icon: GitBranch, status: 'planned', color: 'indigo', subtopics: [] },
    { id: 'docker', name: 'Docker', icon: Container, status: 'planned', color: 'cyan', subtopics: [] },
    { id: 'n8n', name: 'N8N', icon: Workflow, status: 'planned', color: 'red', subtopics: [] },
    { 
      id: 'llm-ai', 
      name: 'LLM & AI', 
      icon: Brain, 
      status: 'in-progress', 
      color: 'violet',
      subtopics: [
        { id: 'llm-ai', name: 'Prompt Engineering' }
      ]
    },
  ];

  return (
    <nav data-testid="navigation" className="bg-slate-800/70 backdrop-blur-xl shadow-2xl mb-8 rounded-2xl border border-slate-700/50 sticky top-4 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - Acts as Home Button */}
          <button 
            data-testid="nav-home-button"
            onClick={() => setActiveTab('home')}
            className="flex-shrink-0 flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-slate-700/50 hover:scale-105 group"
          >
            <div className="relative">
              <FileCode className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute inset-0 blur-xl bg-blue-400/30 group-hover:bg-blue-400/50 transition-all"></div>
            </div>
            <div>
              <span className="block text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:from-blue-300 group-hover:to-cyan-300 bg-clip-text text-transparent transition-all">QA Notes</span>
              <span className="block text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Your Revision Companion</span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div data-testid="desktop-menu" className="hidden md:flex items-center space-x-1">
            {/* Topics Mega Menu */}
            <div 
              data-testid="topics-dropdown-container"
              className="relative group/topics"
              onMouseEnter={() => setIsTopicsOpen(true)}
              onMouseLeave={() => setIsTopicsOpen(false)}
            >
              <button
                data-testid="nav-topics-button"
                onClick={() => setActiveTab('lessons')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'lessons'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : 'text-gray-300 hover:bg-blue-500/20 hover:text-blue-300 hover:scale-105'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Topics
              </button>

              {/* Unified Mega Menu Dropdown */}
              <div 
                data-testid="topics-dropdown-menu"
                className={`absolute left-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl shadow-black/20 transition-all duration-300 ${
                  isTopicsOpen 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-2'
                } z-10`}
              >
                <div className="p-3">
                  {/* Section Header */}
                  <div className="mb-2 px-3 py-2">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Learning Topics</h3>
                  </div>
                  
                  {/* Topics List */}
                  <div className="space-y-1">
                    {topics.map((topic) => {
                      const Icon = topic.icon;
                      const isActive = topic.status === 'complete' || topic.status === 'in-progress';
                      const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;
                      const showSubtopics = hoveredTopic === topic.id && hasSubtopics;
                      
                      return (
                        <div 
                          key={topic.id}
                          className="relative"
                          onMouseEnter={() => setHoveredTopic(topic.id)}
                          onMouseLeave={() => setHoveredTopic(null)}
                        >
                          <button
                            data-testid={`topic-${topic.id}`}
                            onClick={() => {
                              if (isActive && !hasSubtopics) {
                                setSelectedTopic(topic.id);
                                setActiveTab('lessons');
                                setIsTopicsOpen(false);
                              }
                            }}
                            disabled={!isActive}
                            className={`w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group/item ${
                              isActive
                                ? 'hover:bg-slate-700/50 hover:pl-4 cursor-pointer'
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                          >
                          {/* Icon Container */}
                          <div className={`p-2 rounded-lg flex-shrink-0 transition-all duration-200 ${
                            isActive 
                              ? 'bg-blue-500/20 group-hover/item:bg-blue-500/30' 
                              : 'bg-slate-700/50'
                          }`}>
                            <Icon className={`h-4 w-4 transition-colors ${
                              isActive 
                                ? 'text-blue-400 group-hover/item:text-blue-300' 
                                : 'text-slate-500'
                            }`} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium transition-colors ${
                                isActive 
                                  ? 'text-slate-200 group-hover/item:text-white' 
                                  : 'text-slate-500'
                              }`}>
                                {topic.name}
                              </span>
                              {topic.status === 'complete' && (
                                <span className="px-1.5 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded">
                                  ✓
                                </span>
                              )}
                            </div>
                            <p className={`text-xs mt-0.5 transition-colors ${
                              topic.status === 'complete' 
                                ? 'text-slate-400 group-hover/item:text-slate-300' 
                                : 'text-slate-600'
                            }`}>
                              {topic.status === 'complete' ? '16 lessons' : topic.status === 'in-progress' ? 'In Progress' : 'Coming soon'}
                            </p>
                          </div>
                          
                          {/* Arrow indicator for items with subtopics */}
                          {hasSubtopics && (
                            <div className={`flex-shrink-0 transition-colors ${
                              isActive 
                                ? 'text-slate-400 group-hover/item:text-blue-400' 
                                : 'text-slate-600'
                            }`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                        
                        {/* Subtopics Submenu */}
                        {showSubtopics && (
                          <div 
                            className="absolute right-full top-0 mr-1 w-64 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-xl shadow-2xl shadow-black/20 p-2 z-20"
                          >
                            <div className="mb-1 px-2 py-1">
                              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{topic.name}</h4>
                            </div>
                            <div className="space-y-1">
                              {topic.subtopics.map((subtopic) => (
                                <button
                                  key={subtopic.id}
                                  onClick={() => {
                                    setSelectedTopic(subtopic.id);
                                    setActiveTab('lessons');
                                    setIsTopicsOpen(false);
                                    setHoveredTopic(null);
                                  }}
                                  className="w-full p-2 rounded-lg text-left transition-all duration-200 hover:bg-slate-700/50 hover:pl-3 group/sub"
                                >
                                  <span className="text-sm text-slate-200 group-hover/sub:text-white transition-colors">
                                    {subtopic.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Watch Button */}
            <button
              data-testid="nav-watch-button"
              onClick={() => setActiveTab('watch')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'watch'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/50 scale-105'
                  : 'text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300 hover:scale-105'
              }`}
            >
              <MonitorPlay className="h-4 w-4" />
              Watch
            </button>

            {/* About Me Button */}
            <button
              data-testid="nav-about-button"
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'about'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50 scale-105'
                  : 'text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 hover:scale-105'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              About Me
            </button>

            {/* Links Dropdown */}
            <div 
              data-testid="links-dropdown-container"
              className="relative group/links"
              onMouseEnter={() => {}}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button data-testid="nav-links-button" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300 flex items-center gap-2 hover:scale-105">
                <ExternalLink className="h-4 w-4" />
                Links
              </button>
              
              {/* Categories Dropdown */}
              <div data-testid="links-dropdown-menu" className="absolute right-0 mt-2 w-72 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl shadow-black/20 opacity-0 invisible group-hover/links:opacity-100 group-hover/links:visible transition-all duration-300 transform group-hover/links:translate-y-0 -translate-y-2 z-10">
                <div className="p-3">
                  {/* Section Header */}
                  <div className="mb-2 px-3 py-2">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">External Resources</h3>
                  </div>
                  
                  {/* Categories List */}
                  <div className="space-y-1">
                    {categories.map((category) => {
                      const IconComponent = iconMap[category.icon] || ExternalLink;
                      const isHovered = hoveredCategory === category.name;
                      
                      return (
                        <div
                          key={category.name}
                          className="relative"
                          onMouseEnter={() => setHoveredCategory(category.name)}
                          onMouseLeave={() => {}}
                        >
                          <div
                            data-testid={`link-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block p-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 hover:pl-4 group/item cursor-pointer"
                          >
                            <div className="flex items-center justify-between gap-3">
                              {/* Icon */}
                              <div className="p-2 rounded-lg bg-slate-700/50 group-hover/item:bg-blue-500/20 flex-shrink-0 transition-all duration-200">
                                <IconComponent className="h-4 w-4 text-slate-400 group-hover/item:text-blue-400 transition-colors" />
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-slate-200 group-hover/item:text-white transition-colors text-sm">
                                  {category.name}
                                </div>
                                <div className="text-xs text-slate-400 group-hover/item:text-slate-300 transition-colors">
                                  {category.links.length} links
                                </div>
                              </div>
                              
                              {/* Arrow indicator */}
                              <div className="text-slate-400 group-hover/item:text-blue-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Submenu for Links */}
                          {isHovered && (
                            <div 
                              data-testid={`submenu-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="absolute right-full top-0 mr-1 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl shadow-black/20 z-20 max-h-96 overflow-y-auto"
                            >
                              <div className="p-3">
                                <div className="mb-2 px-3 py-2">
                                  <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{category.name}</h4>
                                </div>
                                <div className="space-y-1">
                                  {category.links.map((link) => (
                                    <a
                                      key={link.name}
                                      data-testid={`external-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block p-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 hover:pl-4 group/link"
                                    >
                                      <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div className="p-2 rounded-lg bg-slate-700/50 group-hover/link:bg-blue-500/20 flex-shrink-0 transition-all duration-200">
                                          <ExternalLink className="h-3 w-3 text-slate-400 group-hover/link:text-blue-400 transition-colors" />
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                          <div className="font-medium text-slate-200 group-hover/link:text-white transition-colors text-sm">
                                            {link.name}
                                          </div>
                                          <div className="text-xs text-slate-400 group-hover/link:text-slate-300 mt-0.5 transition-colors line-clamp-2">
                                            {link.tooltip}
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              data-testid="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div data-testid="mobile-menu" className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {/* Mobile Home */}
              <div className="pt-2 border-t border-gray-700">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                >
                  Home
                </button>
              </div>

              {/* Mobile Topics Section */}
              <div className="pt-2 border-t border-gray-700">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Topics</p>
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  const isActive = topic.status === 'complete' || topic.status === 'in-progress';
                  return (
                    <button
                      key={topic.id}
                      data-testid={`mobile-topic-${topic.id}`}
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

              {/* Watch and About */}
              <div className="pt-2 border-t border-gray-700">
                <button
                  onClick={() => {
                    setActiveTab('watch');
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 ${
                    activeTab === 'watch'
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400'
                  }`}
                >
                  <MonitorPlay className="h-4 w-4" />
                  Watch
                </button>
                
                <button
                  data-testid="mobile-about-button"
                  onClick={() => {
                    setActiveTab('about');
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm ${
                    activeTab === 'about'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-purple-400'
                  }`}
                >
                  About Me
                </button>
              </div>

              {/* Mobile Links */}
              <div className="pt-2 border-t border-gray-700 mt-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">External Resources</p>
                {categories.map((category) => (
                  <div key={category.name}>
                    <p className="px-4 py-1 text-[10px] font-bold text-gray-500 uppercase pl-6">{category.name}</p>
                    {category.links.map((link) => (
                      <a
                        key={link.name}
                        data-testid={`mobile-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm hover:bg-gray-700 pl-8"
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
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
