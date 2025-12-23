import { FileCode, Zap, BookOpen, Code2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden group hover:shadow-blue-500/30 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative mx-auto mb-6 w-20 h-20">
          <FileCode className="h-20 w-20 text-blue-400 mx-auto relative z-10" />
          <div className="absolute inset-0 blur-3xl bg-blue-400/40 animate-pulse"></div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-6 relative z-10">
          TypeScript Cheatsheet
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto relative z-10">
          Your comprehensive guide to mastering TypeScript. From basics to advanced patterns,
          everything you need in one place.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-6 hover:shadow-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 group">
          <div className="relative w-fit mb-4">
            <Zap className="h-12 w-12 text-yellow-400 relative z-10" />
            <div className="absolute inset-0 blur-2xl bg-yellow-400/30 group-hover:bg-yellow-400/50 transition-all duration-500"></div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Quick Reference</h3>
          <p className="text-gray-300">
            Fast access to TypeScript syntax, types, and patterns. Perfect for quick lookups
            during development.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-6 hover:shadow-green-500/20 hover:border-green-500/50 transition-all duration-500 hover:scale-105 group">
          <div className="relative w-fit mb-4">
            <BookOpen className="h-12 w-12 text-green-400 relative z-10" />
            <div className="absolute inset-0 blur-2xl bg-green-400/30 group-hover:bg-green-400/50 transition-all duration-500"></div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Comprehensive Examples</h3>
          <p className="text-gray-300">
            Real-world code examples covering all TypeScript features with detailed explanations.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-6 hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 group">
          <div className="relative w-fit mb-4">
            <Code2 className="h-12 w-12 text-purple-400 relative z-10" />
            <div className="absolute inset-0 blur-2xl bg-purple-400/30 group-hover:bg-purple-400/50 transition-all duration-500"></div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Best Practices</h3>
          <p className="text-gray-300">
            Learn common patterns, avoid pitfalls, and write better TypeScript code.
          </p>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-10 hover:shadow-blue-500/20 transition-all duration-500">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Getting Started</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            <strong>1. Explore the Cheatsheet:</strong> Navigate through 16 comprehensive sections
            covering everything from basic types to advanced patterns.
          </p>
          <p>
            <strong>2. Check Examples:</strong> See real-world TypeScript code in action with
            detailed explanations.
          </p>
          <p>
            <strong>3. Practice:</strong> Use the practice site links in the menu to test your
            knowledge and improve your skills.
          </p>
          <p>
            <strong>4. Reference Details:</strong> Dive deep into TypeScript configuration,
            compiler options, and project setup.
          </p>
        </div>
      </div>
    </div>
  );
}
