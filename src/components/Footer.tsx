import { Heart, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              QA Notes
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              Syed Monowarul Islam's personal revision companion for QA interview preparation. 
              Covering TypeScript, testing frameworks, automation, and more.
            </p>
            <a 
              href="https://www.linkedin.com/in/smizibon/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/smizibon/qa_notes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://www.typescriptlang.org/docs/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  TypeScript Docs
                </a>
              </li>
              <li>
                <a 
                  href="https://playwright.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Playwright Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>✅ 16 TypeScript Lessons</li>
              <li>✅ Progress Tracking</li>
              <li>✅ Error Handling System</li>
              <li>✅ Responsive Design</li>
              <li>🚧 More Topics Coming Soon</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 pb-4 border-t border-slate-700/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-slate-400 text-center md:text-left">
            Made with <Heart className="w-4 h-4 inline text-red-400 mx-1" /> for QA Engineers
          </div>
          
          <div className="flex items-center gap-4 text-slate-500">
            <span>Version 2.0.0</span>
            <span className="hidden md:inline">•</span>
            <span>December 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
