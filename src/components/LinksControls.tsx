import { RefreshCw, LayoutGrid, List, X } from 'lucide-react';

interface LinksControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onSetViewMode: (mode: 'grid' | 'list') => void;
  refreshing: boolean;
  onRefresh: () => void;
}

export default function LinksControls({
  searchQuery,
  onSearchChange,
  viewMode,
  onSetViewMode,
  refreshing,
  onRefresh
}: LinksControlsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 bg-slate-800/70 backdrop-blur-xl border border-slate-700/60 rounded-2xl px-2 py-2">
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className={`p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all ${refreshing ? 'animate-pulse' : ''}`}
          title="Refresh links"
          data-testid="links-refresh-button"
        >
          <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
        <div className="flex bg-slate-700/40 p-1 rounded-lg border border-slate-600/40">
          <button
            onClick={() => onSetViewMode('grid')}
            data-testid="links-view-grid-button"
            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-300 hover:text-white'}`}
            title="Grid View"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => onSetViewMode('list')}
            data-testid="links-view-list-button"
            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-300 hover:text-white'}`}
            title="List View"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search links..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="ml-2 flex-1 py-2 px-3 bg-transparent border-0 text-white placeholder-slate-500 focus:outline-none"
          data-testid="links-search-input"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition"
            data-testid="links-search-clear"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
