import { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { loadJsonFile, AppError, ErrorType } from '../utils/errorHandler';
import { Play, Clock, ListVideo, MonitorPlay, ChevronDown, ChevronRight, LayoutGrid, LayoutList, Columns, Layers, CheckCircle2, Circle } from 'lucide-react';
import ErrorDisplay from '../components/ErrorDisplay';

interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  videos: Video[];
}

interface VideoData {
  categories: Category[];
}

type DesignType = 'minimal-list' | 'grid-cards' | 'compact-accordion' | 'modern-tabs';

export default function Watch() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [selectedDesign, setSelectedDesign] = useState<DesignType>('minimal-list');
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());

  // Load watched state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('watched_videos');
    if (saved) {
      try {
        setWatchedVideos(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to parse watched videos', e);
      }
    }
  }, []);

  // Save watched state to localStorage
  useEffect(() => {
    localStorage.setItem('watched_videos', JSON.stringify(Array.from(watchedVideos)));
  }, [watchedVideos]);

  const toggleWatched = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchedVideos(prev => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
      }
      return next;
    });
  };

  const getCategoryProgress = (category: Category) => {
    const total = category.videos.length;
    const watched = category.videos.filter(v => watchedVideos.has(v.id)).length;
    return { total, watched, percentage: total > 0 ? (watched / total) * 100 : 0 };
  };

  const retry = () => {
    fetchVideos();
  };

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: loadError } = await loadJsonFile<VideoData>('/src/data/watch/videos.json');
      
      if (loadError) {
        setError(loadError);
        return;
      }

      if (data && data.categories) {
        setCategories(data.categories);
        // Auto-select first video if available
        if (data.categories.length > 0 && data.categories[0].videos.length > 0) {
          setCurrentVideo(data.categories[0].videos[0]);
        }
        // Expand first category by default
        if (data.categories.length > 0) {
          setExpandedCategories({ [data.categories[0].id]: true });
        }
      }
    } catch (err) {
      setError(new AppError(
        err instanceof Error ? err.message : 'An unexpected error occurred',
        ErrorType.UNKNOWN
      ));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const getEmbedUrl = (url: string) => {
    try {
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
    } catch (e) {
      return '';
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  if (loading) {
    return (
      <div data-testid="watch-page-loading" className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="watch-page-error" className="py-20">
        <ErrorDisplay error={error} onRetry={retry} />
      </div>
    );
  }

  return (
    <div data-testid="watch-page" className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div data-testid="watch-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <MonitorPlay className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Revision Hub
          </h1>
        </div>
      </div>

      {/* Video Player (Top) */}
      <div data-testid="video-player-section" className="w-full space-y-6">
        <GlassCard 
          data-testid="video-player-card"
          className="aspect-video p-0 overflow-hidden relative group shadow-2xl shadow-blue-500/10" 
          padding="sm"
        >
          {currentVideo ? (
            <div className="w-full h-full bg-black relative">
              <iframe
                data-testid="youtube-iframe"
                src={getEmbedUrl(currentVideo.url)}
                title={currentVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div data-testid="no-video-selected" className="flex items-center justify-center h-full text-slate-500">
              Select a video from the library below
            </div>
          )}
        </GlassCard>

        {currentVideo && (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h2 data-testid="video-title" className="text-2xl font-bold text-slate-100 mb-2">{currentVideo.title}</h2>
              <p data-testid="video-description" className="text-slate-400 leading-relaxed max-w-3xl">{currentVideo.description}</p>
            </div>
            <GlassCard variant="secondary" padding="sm" className="flex items-center gap-3 shrink-0">
              <Clock size={16} className="text-blue-400" />
              <span data-testid="video-duration" className="text-sm font-semibold text-slate-200">{currentVideo.duration}</span>
            </GlassCard>
          </div>
        )}
      </div>

      {/* Library Sections (Bottom) */}
      <div data-testid="video-library-section" className="space-y-8 mt-12">
        <div data-testid="video-library-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-xl">
              <ListVideo className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">Video Library</h3>
              <p data-testid="video-total-count" className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-0.5">
                {categories.reduce((acc, cat) => acc + cat.videos.length, 0)} Tutorials Available
              </p>
            </div>
          </div>

          {/* Design Selector - Relocated for better UX */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden lg:block">Layout Mode:</span>
            <div data-testid="design-selector" className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <button 
                data-testid="design-minimal-list"
                onClick={() => setSelectedDesign('minimal-list')}
                className={`p-2 rounded-lg transition-all ${selectedDesign === 'minimal-list' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}
                title="Minimal List"
              >
                <LayoutList size={16} />
              </button>
              <button 
                data-testid="design-grid-cards"
                onClick={() => setSelectedDesign('grid-cards')}
                className={`p-2 rounded-lg transition-all ${selectedDesign === 'grid-cards' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}
                title="Grid Cards"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                data-testid="design-compact-accordion"
                onClick={() => setSelectedDesign('compact-accordion')}
                className={`p-2 rounded-lg transition-all ${selectedDesign === 'compact-accordion' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}
                title="Compact Accordion"
              >
                <Layers size={16} />
              </button>
              <button 
                data-testid="design-modern-tabs"
                onClick={() => setSelectedDesign('modern-tabs')}
                className={`p-2 rounded-lg transition-all ${selectedDesign === 'modern-tabs' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}
                title="Modern Tabs"
              >
                <Columns size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Different Playlist Designs */}
        
        {/* DESIGN 1: Minimal List (Active) */}
        {selectedDesign === 'minimal-list' && (
          <div data-testid="library-minimal-list" className="space-y-4">
            {categories.map((category) => {
              const progress = getCategoryProgress(category);
              return (
                <div key={category.id} data-testid={`category-section-${category.id}`} className="space-y-2">
                  <button 
                    data-testid={`category-toggle-${category.id}`}
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">{category.name}</span>
                      <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700/50">
                        <span className="text-[10px] font-bold text-slate-400">{progress.watched}/{progress.total}</span>
                        <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-500" 
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    {expandedCategories[category.id] ? <ChevronDown size={18} className="text-slate-500" /> : <ChevronRight size={18} className="text-slate-500" />}
                  </button>
                  {expandedCategories[category.id] && (
                    <div data-testid={`category-videos-${category.id}`} className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                      {category.videos.map((video) => (
                        <button
                          key={video.id}
                          data-testid={`video-item-${video.id}`}
                          onClick={() => setCurrentVideo(video)}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all relative ${
                            currentVideo?.id === video.id 
                              ? 'bg-blue-600/10 border border-blue-500/30 ring-1 ring-blue-500/20' 
                              : 'bg-transparent border border-transparent hover:bg-slate-800/40'
                          }`}
                        >
                          <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${currentVideo?.id === video.id ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40' : 'bg-slate-800 text-slate-400'}`}>
                            {watchedVideos.has(video.id) ? <CheckCircle2 size={18} className="text-blue-400" /> : <Play size={16} fill={currentVideo?.id === video.id ? "currentColor" : "none"} />}
                          </div>
                          <div className="text-left flex-1">
                            <h5 className={`text-sm font-semibold mb-0.5 ${currentVideo?.id === video.id ? 'text-white' : 'text-slate-300'}`}>{video.title}</h5>
                            <span className="text-xs text-slate-500">{video.duration}</span>
                          </div>
                          <button
                            data-testid={`toggle-watched-${video.id}`}
                            onClick={(e) => toggleWatched(video.id, e)}
                            className={`p-2 rounded-lg transition-all ${watchedVideos.has(video.id) ? 'text-blue-400 bg-blue-500/10' : 'text-slate-600 hover:text-slate-400 hover:bg-slate-800'}`}
                            title={watchedVideos.has(video.id) ? "Mark as unwatched" : "Mark as watched"}
                          >
                            {watchedVideos.has(video.id) ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                          </button>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* DESIGN 2: Grid Cards */}
        {selectedDesign === 'grid-cards' && (
          <div data-testid="library-grid-cards" className="space-y-10">
            {categories.map((category) => {
              const progress = getCategoryProgress(category);
              return (
                <div key={category.id} data-testid={`category-grid-${category.id}`} className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h4 className="text-lg font-bold text-slate-200 flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                      {category.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-tighter bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-700/50">
                      <span>PROGRESS:</span>
                      <span className="text-blue-400">{progress.watched} / {progress.total}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.videos.map((video) => (
                      <GlassCard 
                        key={video.id}
                        data-testid={`video-card-${video.id}`}
                        variant={currentVideo?.id === video.id ? 'primary' : 'secondary'}
                        className={`cursor-pointer transition-all hover:scale-[1.02] relative group/card ${currentVideo?.id === video.id ? 'ring-2 ring-blue-500/50 bg-blue-500/5' : ''}`}
                        onClick={() => setCurrentVideo(video)}
                        padding="md"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl transition-colors ${currentVideo?.id === video.id ? 'bg-blue-500 text-white' : 'bg-slate-800 text-blue-400'}`}>
                              {watchedVideos.has(video.id) ? <CheckCircle2 size={20} /> : <Play size={20} fill={currentVideo?.id === video.id ? "currentColor" : "none"} />}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800/50 px-2 py-1 rounded-lg">
                                {video.duration}
                              </span>
                              <button
                                data-testid={`grid-toggle-watched-${video.id}`}
                                onClick={(e) => toggleWatched(video.id, e)}
                                className={`p-1.5 rounded-lg transition-all ${watchedVideos.has(video.id) ? 'text-blue-400 bg-blue-500/10 opacity-100' : 'text-slate-600 hover:text-slate-400 hover:bg-slate-800 opacity-0 group-hover/card:opacity-100'}`}
                                title={watchedVideos.has(video.id) ? "Mark as unwatched" : "Mark as watched"}
                              >
                                {watchedVideos.has(video.id) ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-100 mb-2 line-clamp-1">{video.title}</h5>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{video.description}</p>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DESIGN 3: Compact Accordion */}
        {selectedDesign === 'compact-accordion' && (
          <div data-testid="library-compact-accordion" className="border border-slate-800 rounded-3xl overflow-hidden bg-slate-900/50">
            {categories.map((category, idx) => {
              const progress = getCategoryProgress(category);
              return (
                <div key={category.id} data-testid={`accordion-section-${category.id}`} className={idx !== 0 ? 'border-t border-slate-800' : ''}>
                  <button 
                    data-testid={`accordion-toggle-${category.id}`}
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full flex items-center gap-4 p-6 transition-all ${expandedCategories[category.id] ? 'bg-blue-500/5' : 'hover:bg-slate-800/30'}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${expandedCategories[category.id] ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <Layers size={16} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-slate-100">{category.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700/50">
                          {progress.watched}/{progress.total} WATCHED
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{category.videos.length} videos available</p>
                    </div>
                    {expandedCategories[category.id] ? <ChevronDown size={20} className="text-blue-400" /> : <ChevronRight size={20} className="text-slate-600" />}
                  </button>
                  
                  {expandedCategories[category.id] && (
                    <div data-testid={`accordion-videos-${category.id}`} className="bg-slate-950/30 divide-y divide-slate-800/50">
                      {category.videos.map((video) => (
                        <div key={video.id} className="flex items-center group/item">
                          <button
                            data-testid={`accordion-item-${video.id}`}
                            onClick={() => setCurrentVideo(video)}
                            className={`flex-1 flex items-center justify-between p-4 px-8 transition-all ${
                              currentVideo?.id === video.id ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-1.5 h-1.5 rounded-full ${currentVideo?.id === video.id ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]' : 'bg-slate-700'}`} />
                              <span className="text-sm font-medium">{video.title}</span>
                              {watchedVideos.has(video.id) && <CheckCircle2 size={14} className="text-blue-500/70" />}
                            </div>
                            <span className="text-xs font-mono opacity-50">{video.duration}</span>
                          </button>
                          <button
                            data-testid={`accordion-toggle-watched-${video.id}`}
                            onClick={(e) => toggleWatched(video.id, e)}
                            className={`p-4 transition-all border-l border-slate-800/50 ${watchedVideos.has(video.id) ? 'text-blue-400 bg-blue-500/5' : 'text-slate-700 hover:text-slate-400 hover:bg-slate-800'}`}
                            title={watchedVideos.has(video.id) ? "Mark as unwatched" : "Mark as watched"}
                          >
                            {watchedVideos.has(video.id) ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* DESIGN 4: Modern Tabs */}
        {selectedDesign === 'modern-tabs' && (
          <div data-testid="library-modern-tabs" className="space-y-8">
            <div data-testid="tabs-container" className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const progress = getCategoryProgress(category);
                return (
                  <button
                    key={category.id}
                    data-testid={`tab-button-${category.id}`}
                    onClick={() => toggleCategory(category.id)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border flex items-center gap-3 ${
                      expandedCategories[category.id]
                        ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      expandedCategories[category.id] ? 'bg-white/20 text-white' : 'bg-slate-900/50 text-slate-500'
                    }`}>
                      {progress.watched}/{progress.total}
                    </span>
                  </button>
                );
              })}
            </div>
            
            <div data-testid="tab-content-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.filter(c => expandedCategories[c.id]).map(category => (
                category.videos.map((video) => (
                  <div key={video.id} className="group relative">
                    <button
                      data-testid={`tab-video-item-${video.id}`}
                      onClick={() => setCurrentVideo(video)}
                      className={`w-full p-6 rounded-3xl text-left transition-all overflow-hidden h-full ${
                        currentVideo?.id === video.id 
                          ? 'bg-slate-800 border border-blue-500/50 ring-1 ring-blue-500/20' 
                          : 'bg-slate-800/40 border border-slate-700/50 hover:border-slate-600'
                      }`}
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Tutorial</span>
                          {watchedVideos.has(video.id) && <CheckCircle2 size={12} className="text-blue-500/70" />}
                        </div>
                        <span className="text-xs text-slate-500 font-medium">{video.duration}</span>
                      </div>
                      <h5 className={`font-bold leading-snug mb-2 ${currentVideo?.id === video.id ? 'text-blue-400' : 'text-slate-100'}`}>
                        {video.title}
                      </h5>
                      <div className={`mt-4 flex items-center gap-2 text-xs font-bold transition-all ${currentVideo?.id === video.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        <Play size={12} fill="currentColor" />
                        WATCH NOW
                      </div>
                    </button>
                    <button
                      data-testid={`tab-toggle-watched-${video.id}`}
                      onClick={(e) => toggleWatched(video.id, e)}
                      className={`absolute top-4 right-12 p-2 rounded-xl transition-all ${
                        watchedVideos.has(video.id) 
                          ? 'text-blue-400 bg-blue-500/10' 
                          : 'text-slate-600 hover:text-slate-400 hover:bg-slate-800 opacity-0 group-hover:opacity-100'
                      }`}
                      title={watchedVideos.has(video.id) ? "Mark as unwatched" : "Mark as watched"}
                    >
                      {watchedVideos.has(video.id) ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                    </button>
                  </div>
                ))
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
