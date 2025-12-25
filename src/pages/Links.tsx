import { useState, useEffect } from 'react';
import { Globe, MousePointer2, Copy, Check, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { loadJsonFile } from '../utils/errorHandler';
import GlassCard from '../components/GlassCard';
import LinksControls from '../components/LinksControls';
import { FileCode, TestTube2, Code, GitBranch, Smartphone, Award, Workflow, Brain, Wrench } from 'lucide-react';

interface Link {
  name: string;
  url: string;
  tooltip: string;
  favicon?: string;
}

interface LinkCategory {
  name: string;
  icon: string;
  links: Link[];
}

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

interface LinksProps {
  selectedTopic: string;
}

export default function Links({ selectedTopic }: LinksProps) {
  const [categories, setCategories] = useState<LinkCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLinks, setSelectedLinks] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [copiedSingles, setCopiedSingles] = useState<Set<string>>(new Set());
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [categoriesPanelCollapsed, setCategoriesPanelCollapsed] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [collapsedCategoryBodies, setCollapsedCategoryBodies] = useState<Set<string>>(new Set());
  const [visitedLinks, setVisitedLinks] = useState<Set<string>>(new Set());
  const [failedFavicons, setFailedFavicons] = useState<Set<string>>(new Set());
  const [clickAnimating, setClickAnimating] = useState<Set<string>>(new Set());

  const fetchLinks = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    else setRefreshing(true);
    
    const { data } = await loadJsonFile<{ categories: LinkCategory[] }>('/src/data/links/links.json');
    if (data) {
      setCategories(data.categories);
    }
    
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('visitedLinks');
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        setVisitedLinks(new Set(arr));
      }
    } catch {}
  }, []);

  const markVisited = (url: string) => {
    const next = new Set(visitedLinks);
    next.add(url);
    setVisitedLinks(next);
    try {
      localStorage.setItem('visitedLinks', JSON.stringify([...next]));
    } catch {}
  };

  // Auto-sync with selectedTopic
  useEffect(() => {
    if (selectedTopic && categories.length > 0) {
      // Find matching category (e.g., 'typescript' matches 'TypeScript', 'playwright' matches 'Testing Frameworks' if we search links or just names)
      // For now, let's match by category name or link content
      const match = categories.find(c => 
        c.name.toLowerCase().includes(selectedTopic.toLowerCase().split('-')[0]) ||
        c.links.some(l => l.name.toLowerCase().includes(selectedTopic.toLowerCase().split('-')[0]))
      );
      
      if (match) {
        setSelectedCategory(match.name);
        setSelectedCategories(prev => {
          const next = new Set(prev);
          next.add(match.name);
          return next;
        });
      }
    }
  }, [selectedTopic, categories]);

  const toggleSelect = (url: string) => {
    const newSelected = new Set(selectedLinks);
    if (newSelected.has(url)) {
      newSelected.delete(url);
    } else {
      newSelected.add(url);
    }
    setSelectedLinks(newSelected);
  };

  const toggleCategoryCollapse = (name: string) => {
    const next = new Set(collapsedCategoryBodies);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setCollapsedCategoryBodies(next);
  };

  const toggleMultiCategory = (name: string) => {
    const next = new Set(selectedCategories);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setSelectedCategories(next);
    setSelectedCategory(null);
  };

  const clearMultiCategories = () => {
    setSelectedCategories(new Set());
    setSelectedCategory(null);
  };

  const copySelectedToClipboard = async () => {
    const linksToCopy = categories
      .flatMap(c => c.links)
      .filter(l => selectedLinks.has(l.url))
      .map(l => `${l.name}: ${l.url}`)
      .join('\n');

    if (linksToCopy) {
      try {
        await navigator.clipboard.writeText(linksToCopy);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = linksToCopy;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand('copy');
        } finally {
          document.body.removeChild(textarea);
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearSelection = () => {
    setSelectedLinks(new Set());
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    links: category.links.filter(link => 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.tooltip.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => {
    const bySingle = selectedCategory ? category.name === selectedCategory : true;
    const byMulti = selectedCategories.size > 0 ? selectedCategories.has(category.name) : true;
    return bySingle && byMulti && category.links.length > 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]" data-testid="links-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" data-testid="links-page">
      {/* Selection Floating Bar */}
      {selectedLinks.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-8 duration-500" data-testid="links-selection-bar">
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-blue-500/50 px-6 py-4 rounded-3xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm" data-testid="links-selected-count">{selectedLinks.size} links selected</span>
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">Ready to export</span>
            </div>
            
            <div className="h-8 w-px bg-slate-700/50"></div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={copySelectedToClipboard}
                data-testid="links-copy-all-button"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy All
                  </>
                )}
              </button>
              
              <button
                onClick={clearSelection}
                data-testid="links-clear-selection-button"
                className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all"
                title="Clear selection"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-white">Resource Hub</h1>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Live</span>
            </div>
          </div>
          <button
            onClick={() => setControlsCollapsed(!controlsCollapsed)}
            data-testid="links-controls-toggle"
            className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition"
            title="Toggle controls"
          >
            {controlsCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </button>
        </div>
        {!controlsCollapsed && (
          <div className="flex flex-col gap-4">
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50" data-testid="links-categories-panel">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-200">Categories</span>
                  <span className="text-xs text-slate-400">
                    {selectedCategories.size > 0 ? `${selectedCategories.size} selected` : 'All'}
                  </span>
                </div>
                <button
                  onClick={() => setCategoriesPanelCollapsed(!categoriesPanelCollapsed)}
                  data-testid="links-categories-collapse"
                  className="px-2 py-1 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                  title="Collapse categories panel"
                >
                  {categoriesPanelCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </button>
              </div>
              {!categoriesPanelCollapsed && (
                <div className="flex flex-wrap gap-2 p-3 pt-0">
                  <button
                    onClick={clearMultiCategories}
                    data-testid="links-categories-clear"
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                    title="Clear categories"
                  >
                    Clear
                  </button>
                  {categories.map(category => (
                    <button
                      key={`panel-${category.name}`}
                      onClick={() => toggleMultiCategory(category.name)}
                      data-testid={`links-category-chip-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                        selectedCategories.has(category.name)
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900/50 border border-slate-700/50">{category.links.length}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <LinksControls
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              refreshing={refreshing}
              onRefresh={() => fetchLinks(false)}
            />
          </div>
        )}
      </div>

      {/* Links Grid/List */}
      <div className="space-y-3">
        {filteredCategories.map((category) => {
          const Icon = iconMap[category.icon] || Globe;
          return (
            <div key={category.name} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <button
                  onClick={() => toggleCategoryCollapse(category.name)}
                  data-testid={`category-collapse-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition"
                  title="Collapse category"
                >
                  {collapsedCategoryBodies.has(category.name) ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </button>
                <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-700/50 to-transparent"></div>
              </div>

              {!collapsedCategoryBodies.has(category.name) && (
                <div className="flex flex-col gap-0.5">
                {category.links.map((link) => (
                  <GlassCard
                    key={link.url}
                    variant="secondary"
                    padding="sm"
                    className={`group transform-gpu transition-transform duration-250 ease-out relative ${
                      clickAnimating.has(link.url) ? 'scale-[0.98] ring-2 ring-blue-400' : ''
                    } ${
                      selectedLinks.has(link.url)
                        ? 'ring-2 ring-blue-500 bg-blue-500/10 scale-[1.02]'
                        : visitedLinks.has(link.url)
                          ? 'ring-1 ring-violet-400/60 bg-violet-500/10 shadow-[0_0_0_2px_rgba(139,92,246,0.35)]'
                          : 'hover:border-blue-500/30'
                    } rounded-lg shadow-none border-0`}
                    onMouseDown={(e) => {
                      const target = e.target as HTMLElement;
                      if (
                        target.closest('button') ||
                        target.closest('[data-testid^="copy-link-"]') ||
                        target.closest('[data-testid^="select-link-"]')
                      ) {
                        return;
                      }
                      setClickAnimating(prev => {
                        const next = new Set(prev);
                        next.add(link.url);
                        return next;
                      });
                    }}
                    onMouseUp={() => {
                      setClickAnimating(prev => {
                        const next = new Set(prev);
                        next.delete(link.url);
                        return next;
                      });
                    }}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (
                        target.closest('button') ||
                        target.closest('[data-testid^="copy-link-"]') ||
                        target.closest('[data-testid^="select-link-"]')
                      ) {
                        return;
                      }
                      setClickAnimating(prev => {
                        const next = new Set(prev);
                        next.add(link.url);
                        return next;
                      });
                      setTimeout(() => {
                        setClickAnimating(prev => {
                          const next = new Set(prev);
                          next.delete(link.url);
                          return next;
                        });
                      }, 180);
                      markVisited(link.url);
                      window.open(link.url, '_blank', 'noopener,noreferrer');
                    }}
                    data-testid={`open-link-card-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div
                      className="flex items-center h-full"
                    >
                      <div className="flex items-center w-full gap-3 md:gap-4">
                            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                              <button
                                onMouseDown={(e) => { e.stopPropagation(); }}
                                onClick={(e) => { e.stopPropagation(); toggleSelect(link.url); }}
                                className={`p-1.5 rounded-lg transition-all ${
                                  selectedLinks.has(link.url)
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                                    : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-700/50'
                                }`}
                                title={selectedLinks.has(link.url) ? "Deselect link" : "Select link to copy"}
                                data-testid={`select-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                {selectedLinks.has(link.url) ? (
                                  <Check className="h-3.5 w-3.5" />
                                ) : (
                                  <MousePointer2 className="h-3.5 w-3.5" />
                                )}
                              </button>
                              <button
                                onMouseDown={(e) => { e.stopPropagation(); }}
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  const text = link.url;
                                  setCopiedSingles(prev => {
                                    const next = new Set(prev);
                                    next.add(link.url);
                                    return next;
                                  });
                                  const btnEl = e.currentTarget as HTMLElement;
                                  btnEl.classList.add('bg-green-500', 'text-white');
                                  try {
                                    await navigator.clipboard.writeText(text);
                                  } catch {
                                    const textarea = document.createElement('textarea');
                                    textarea.value = text;
                                    textarea.style.position = 'fixed';
                                    textarea.style.left = '-9999px';
                                    document.body.appendChild(textarea);
                                    textarea.focus();
                                    textarea.select();
                                    try {
                                      document.execCommand('copy');
                                    } finally {
                                      document.body.removeChild(textarea);
                                    }
                                  }
                                  setTimeout(() => {
                                    setCopiedSingles(prev => {
                                      const next = new Set(prev);
                                      next.delete(link.url);
                                      return next;
                                    });
                                    btnEl.classList.remove('bg-green-500', 'text-white');
                                  }, 1500);
                                }}
                                data-testid={`copy-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="p-1.5 rounded-lg transition-all bg-slate-700/30 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 active:scale-95"
                                title="Copy single link"
                              >
                                {copiedSingles.has(link.url) ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                              </button>
                              
                              <div className="p-1.5 rounded-lg transition-colors bg-slate-700/30 group-hover:bg-blue-500/20">
                                {(() => {
                                  const host = new URL(link.url).hostname.toLowerCase();
                                  const s2 = `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
                                  const src = link.favicon || s2;
                                  if (failedFavicons.has(link.url)) {
                                    return <Globe className="h-4 w-4 text-slate-400 group-hover:text-blue-400" data-testid={`link-fallback-icon-${link.name.toLowerCase().replace(/\s+/g, '-')}`} />;
                                  }
                                  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
                                    const originFavicon = `${new URL(link.url).origin}/favicon.ico`;
                                    const img = e.currentTarget as HTMLImageElement;
                                    if (img.src !== originFavicon) {
                                      img.src = originFavicon;
                                    } else {
                                      setFailedFavicons(prev => {
                                        const next = new Set(prev);
                                        next.add(link.url);
                                        return next;
                                      });
                                    }
                                  };
                                  return <img src={src} onError={handleError} alt="site icon" className="h-4 w-4 rounded-sm" data-testid={`link-favicon-${link.name.toLowerCase().replace(/\s+/g, '-')}`} />;
                                })()}
                              </div>
                              <span className="text-sm font-semibold text-white truncate max-w-[55%] md:max-w-[65%]">{link.name}</span>
                              {visitedLinks.has(link.url) && (
                                <span
                                  className="ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                  data-testid={`visited-badge-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                                  title="Previously opened"
                                >
                                  Visited
                                </span>
                              )}
                              <span className="hidden md:block text-xs text-slate-400 truncate flex-1 text-right">{link.tooltip}</span>
                            </div>
                            <div className="hidden"></div>

                        <div className="hidden">
                          {copiedSingles.has(link.url) && (
                            <span
                              className="px-2 py-1 rounded-md text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 animate-in fade-in slide-in-from-top-2"
                              data-testid={`copy-feedback-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              Copied!
                            </span>
                          )}
                        </div>
                        {/* Grid title row with favicon */}
                        <div className="hidden">
                          <div className={`p-2 rounded-lg transition-colors ${
                            selectedLinks.has(link.url)
                              ? 'bg-blue-500/20'
                              : visitedLinks.has(link.url)
                                ? 'bg-violet-500/20'
                                : 'bg-slate-700/30 group-hover:bg-blue-500/20'
                            }`}>
                            {(() => {
                              const host = new URL(link.url).hostname.toLowerCase();
                              const s2 = `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
                              const src = link.favicon || s2;
                              if (failedFavicons.has(link.url)) {
                                const color = selectedLinks.has(link.url)
                                  ? 'text-blue-400'
                                  : visitedLinks.has(link.url)
                                    ? 'text-violet-400'
                                    : 'text-slate-400 group-hover:text-blue-400';
                                return <Globe className={`h-5 w-5 ${color}`} data-testid={`link-fallback-icon-${link.name.toLowerCase().replace(/\s+/g, '-')}`} />;
                              } else {
                                const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
                                  const originFavicon = `${new URL(link.url).origin}/favicon.ico`;
                                  const img = e.currentTarget as HTMLImageElement;
                                  if (img.src !== originFavicon) {
                                    img.src = originFavicon;
                                  } else {
                                    setFailedFavicons(prev => {
                                      const next = new Set(prev);
                                      next.add(link.url);
                                      return next;
                                    });
                                  }
                                };
                                return (
                                  <img
                                    src={src}
                                    onError={handleError}
                                    alt="site icon"
                                    className="h-5 w-5 rounded-sm"
                                    data-testid={`link-favicon-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                                  />
                                );
                              }
                            })()}
                          </div>
                          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                            {link.name}
                          </h3>
                        </div>
                        <p className="hidden">
                          {link.tooltip}
                        </p>
                        
                        {false && (
                          <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-start text-xs text-slate-500">
                            <span className="truncate">{new URL(link.url).hostname}</span>
                          </div>
                        )}
                      </div>

                    </div>
                  </GlassCard>
                ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700">
          <Globe className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">No links found</h3>
          <p className="text-slate-400 mt-2">Try adjusting your search or category filters</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
            className="mt-6 text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
