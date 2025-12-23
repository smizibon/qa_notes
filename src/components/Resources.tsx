export default function Resources() {
  return (
    <div className="mt-12 bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 hover:shadow-blue-500/20 transition-all duration-500">
      <h2 className="text-2xl font-bold text-white mb-6">Additional Resources</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-lg text-blue-400 mb-2">Official Resources</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• TypeScript Handbook: typescriptlang.org/docs</li>
            <li>• TypeScript Playground: typescriptlang.org/play</li>
            <li>• DefinitelyTyped: github.com/DefinitelyTyped</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-blue-400 mb-2">Practice Tips</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Start with strict mode enabled</li>
            <li>• Use TypeScript with your next project</li>
            <li>• Read error messages carefully</li>
            <li>• Explore type definitions of libraries you use</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
