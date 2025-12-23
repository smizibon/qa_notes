import { FileCode } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-6 md:p-10 mb-6 relative overflow-hidden group hover:shadow-blue-500/20 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="flex items-center gap-4 mb-3 relative z-10">
        <div className="relative">
          <FileCode className="w-10 md:w-12 h-10 md:h-12 text-blue-400 relative z-10" />
          <div className="absolute inset-0 blur-2xl bg-blue-400/40 animate-pulse"></div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">TypeScript Beginner Cheatsheet</h1>
      </div>
      <p className="text-gray-300 text-base md:text-lg relative z-10 ml-14 md:ml-16">Complete guide with explanations, examples, and best practices</p>
    </div>
  );
}
