import { ChevronDown, ChevronUp } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface ExpandableSectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
  expanded: Record<string, boolean>;
  toggle: (id: string) => void;
}

export default function ExpandableSection({ 
  title, 
  id, 
  children, 
  expanded, 
  toggle 
}: ExpandableSectionProps) {
  const isExpanded = expanded[id];
  
  return (
    <GlassCard variant="secondary" className="p-0 overflow-hidden transition-all duration-500 hover:shadow-blue-500/30 hover:border-blue-500/50 hover:scale-[1.02] group">
      <button
        onClick={() => toggle(id)}
        className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-750/80 hover:to-slate-800/80 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          {title}
        </h2>
        <div className="relative z-10">
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <ChevronDown className="h-6 w-6 text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-1" />
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="p-6 pt-6 space-y-6 bg-gradient-to-b from-slate-850/50 to-slate-900/50 animate-in slide-in-from-top duration-500">
          {children}
        </div>
      )}
    </GlassCard>
  );
}
