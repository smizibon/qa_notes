import { FileCode } from 'lucide-react';

interface CodeBlockProps {
  title?: string;
  children: React.ReactNode;
}

export default function CodeBlock({ title, children }: CodeBlockProps) {
  return (
    <div data-testid="code-block" className="my-4 group">
      {title && (
        <div data-testid="code-block-title" className="flex items-center gap-2 mb-3 px-1">
          <div className="relative">
            <FileCode className="h-5 w-5 text-blue-400 relative z-10" />
            <div className="absolute inset-0 blur-lg bg-blue-400/30"></div>
          </div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
      )}
      <div className="relative rounded-xl overflow-hidden border border-slate-700/50 group-hover:border-blue-500/30 transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <pre data-testid="code-block-content" className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 overflow-x-auto relative z-10">
          <code className="text-sm text-gray-100 font-mono">{children}</code>
        </pre>
      </div>
    </div>
  );
}
