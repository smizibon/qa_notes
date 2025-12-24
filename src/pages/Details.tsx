import { Info, Settings, Package, Terminal } from 'lucide-react';

export default function Details() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 hover:shadow-blue-500/20 transition-all duration-500">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6 flex items-center gap-3">
          <div className="relative">
            <Info className="h-10 w-10 text-blue-400 relative z-10" />
            <div className="absolute inset-0 blur-xl bg-blue-400/40"></div>
          </div>
          Project Details
        </h1>

        {/* About Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">About This Project</h2>
          <p className="text-gray-300 mb-4">
            QA Notes is a comprehensive TypeScript learning platform built with React and TypeScript.
            It provides quick access to TypeScript syntax, types, patterns, and best practices.
          </p>
          <p className="text-gray-300">
            The project uses a modular architecture with separated concerns - content is stored in JSON
            files while components handle the presentation logic.
          </p>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Package className="h-6 w-6" />
            Tech Stack
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-700 bg-gray-750 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">React 18.2.0</h3>
              <p className="text-sm text-gray-400">UI library with modern hooks</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">TypeScript 5.0.0</h3>
              <p className="text-sm text-gray-600">Strict mode enabled for type safety</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Vite 4.5.14</h3>
              <p className="text-sm text-gray-600">Fast development server and build tool</p>
            </div>
            <div className="border border-gray-700 bg-gray-750 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Tailwind CSS</h3>
              <p className="text-sm text-gray-400">Utility-first CSS framework</p>
            </div>
            <div className="border border-gray-700 bg-gray-750 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">lucide-react</h3>
              <p className="text-sm text-gray-400">Beautiful icon components</p>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Project Structure
          </h2>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`cheat/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navigation.tsx
│   │   ├── Header.tsx
│   │   ├── ExpandableSection.tsx
│   │   ├── CodeBlock.tsx
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Details.tsx
│   │   └── Examples.tsx
│   ├── sections/        # Cheatsheet sections
│   │   ├── BasicTypesSection.tsx
│   │   ├── FunctionsSection.tsx
│   │   └── ...
│   ├── data/           # JSON content files
│   │   ├── basic-types.json
│   │   ├── functions.json
│   │   └── ...
│   ├── App.tsx         # Main application
│   └── main.tsx        # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md`}
            </pre>
          </div>
        </section>

        {/* Setup Instructions */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Terminal className="h-6 w-6" />
            Setup & Development
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">1. Install Dependencies</h3>
              <code className="block bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                npm install
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">2. Start Development Server</h3>
              <code className="block bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                npm run dev
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">3. Build for Production</h3>
              <code className="block bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                npm run build
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">4. Preview Production Build</h3>
              <code className="block bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                npm run preview
              </code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
