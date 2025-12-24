import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Circle, 
  FileCode, 
  Code2, 
  GraduationCap,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

// =============================================================================
// Types & Configuration
// =============================================================================

interface LessonMetadata {
  id: string;
  title: string;
  description: string;
  lessonFile: string;
  cheatsheetFile: string;
  examplesFile: string;
}

type ContentTab = 'lesson' | 'cheatsheet' | 'examples';

const LESSONS: LessonMetadata[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with TypeScript',
    description: 'Introduction to TypeScript, setup, and your first program',
    lessonFile: 'getting-started.json',
    cheatsheetFile: 'getting-started.json',
    examplesFile: 'getting-started.json'
  },
  {
    id: 'basic-types',
    title: 'Basic Types',
    description: "Understanding TypeScript's fundamental type system",
    lessonFile: 'basic-types.json',
    cheatsheetFile: 'basic-types.json',
    examplesFile: 'basic-types.json'
  },
  {
    id: 'type-inference',
    title: 'Type Inference',
    description: 'Let TypeScript figure out types automatically',
    lessonFile: 'type-inference.json',
    cheatsheetFile: 'type-inference.json',
    examplesFile: 'type-inference.json'
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Typing functions, parameters, and return values',
    lessonFile: 'functions.json',
    cheatsheetFile: 'functions.json',
    examplesFile: 'functions.json'
  },
  {
    id: 'interfaces',
    title: 'Interfaces',
    description: 'Defining object shapes and contracts',
    lessonFile: 'interfaces.json',
    cheatsheetFile: 'interfaces.json',
    examplesFile: 'interfaces.json'
  },
  {
    id: 'type-aliases',
    title: 'Type Aliases',
    description: 'Creating custom type names and reusable type definitions',
    lessonFile: 'type-aliases.json',
    cheatsheetFile: 'type-aliases.json',
    examplesFile: 'type-aliases.json'
  },
  {
    id: 'classes',
    title: 'Classes',
    description: 'Object-oriented programming with TypeScript',
    lessonFile: 'classes.json',
    cheatsheetFile: 'classes.json',
    examplesFile: 'classes.json'
  },
  {
    id: 'generics',
    title: 'Generics',
    description: 'Write reusable, type-safe code',
    lessonFile: 'generics.json',
    cheatsheetFile: 'generics.json',
    examplesFile: 'generics.json'
  },
  {
    id: 'enums',
    title: 'Enums',
    description: 'Named constants with numeric and string values',
    lessonFile: 'enums.json',
    cheatsheetFile: 'enums.json',
    examplesFile: 'enums.json'
  },
  {
    id: 'type-guards',
    title: 'Type Guards',
    description: 'Runtime type checking and narrowing',
    lessonFile: 'type-guards.json',
    cheatsheetFile: 'type-guards.json',
    examplesFile: 'type-guards.json'
  },
  {
    id: 'utility-types',
    title: 'Utility Types',
    description: 'Built-in type transformation helpers',
    lessonFile: 'utility-types.json',
    cheatsheetFile: 'utility-types.json',
    examplesFile: 'utility-types.json'
  },
  {
    id: 'advanced-patterns',
    title: 'Advanced Patterns',
    description: 'Conditional, mapped, and template literal types',
    lessonFile: 'advanced-patterns.json',
    cheatsheetFile: 'advanced-patterns.json',
    examplesFile: 'advanced-patterns.json'
  },
  {
    id: 'tsconfig',
    title: 'TSConfig',
    description: 'Configuring the TypeScript compiler',
    lessonFile: 'tsconfig-lesson.json',
    cheatsheetFile: 'tsconfig-section.json',
    examplesFile: 'tsconfig-example.json'
  },
  {
    id: 'common-patterns',
    title: 'Common Patterns',
    description: 'Best practices and design patterns in TypeScript',
    lessonFile: 'common-patterns.json',
    cheatsheetFile: 'common-patterns.json',
    examplesFile: 'common-patterns.json'
  },
  {
    id: 'common-errors',
    title: 'Common Errors',
    description: 'Understanding and fixing TypeScript errors',
    lessonFile: 'common-errors.json',
    cheatsheetFile: 'common-errors.json',
    examplesFile: 'common-errors.json'
  },
  {
    id: 'quick-reference',
    title: 'Quick Reference',
    description: 'Fast syntax lookup and cheat sheet summary',
    lessonFile: 'quick-reference.json',
    cheatsheetFile: 'quick-reference.json',
    examplesFile: 'quick-reference.json'
  }
];

// =============================================================================
// Import Maps for Dynamic Loading
// =============================================================================

const LESSON_IMPORTS: Record<string, () => Promise<any>> = {
  'getting-started.json': () => import('../data/lessons/getting-started.json'),
  'basic-types.json': () => import('../data/lessons/basic-types.json'),
  'type-inference.json': () => import('../data/lessons/type-inference.json'),
  'functions.json': () => import('../data/lessons/functions.json'),
  'interfaces.json': () => import('../data/lessons/interfaces.json'),
  'type-aliases.json': () => import('../data/lessons/type-aliases.json'),
  'classes.json': () => import('../data/lessons/classes.json'),
  'generics.json': () => import('../data/lessons/generics.json'),
  'enums.json': () => import('../data/lessons/enums.json'),
  'type-guards.json': () => import('../data/lessons/type-guards.json'),
  'utility-types.json': () => import('../data/lessons/utility-types.json'),
  'advanced-patterns.json': () => import('../data/lessons/advanced-patterns.json'),
  'tsconfig-lesson.json': () => import('../data/lessons/tsconfig-lesson.json'),
  'common-patterns.json': () => import('../data/lessons/common-patterns.json'),
  'common-errors.json': () => import('../data/lessons/common-errors.json'),
  'quick-reference.json': () => import('../data/lessons/quick-reference.json'),
};

const CHEATSHEET_IMPORTS: Record<string, () => Promise<any>> = {
  'getting-started.json': () => import('../data/cheatsheet/getting-started.json'),
  'basic-types.json': () => import('../data/cheatsheet/basic-types.json'),
  'type-inference.json': () => import('../data/cheatsheet/type-inference.json'),
  'functions.json': () => import('../data/cheatsheet/functions.json'),
  'interfaces.json': () => import('../data/cheatsheet/interfaces.json'),
  'type-aliases.json': () => import('../data/cheatsheet/type-aliases.json'),
  'classes.json': () => import('../data/cheatsheet/classes.json'),
  'generics.json': () => import('../data/cheatsheet/generics.json'),
  'enums.json': () => import('../data/cheatsheet/enums.json'),
  'type-guards.json': () => import('../data/cheatsheet/type-guards.json'),
  'utility-types.json': () => import('../data/cheatsheet/utility-types.json'),
  'advanced-patterns.json': () => import('../data/cheatsheet/advanced-patterns.json'),
  'tsconfig-section.json': () => import('../data/cheatsheet/tsconfig-section.json'),
  'common-patterns.json': () => import('../data/cheatsheet/common-patterns.json'),
  'common-errors.json': () => import('../data/cheatsheet/common-errors.json'),
  'quick-reference.json': () => import('../data/cheatsheet/quick-reference.json'),
};

const EXAMPLES_IMPORTS: Record<string, () => Promise<any>> = {
  'getting-started.json': () => import('../data/examples/getting-started.json'),
  'basic-types.json': () => import('../data/examples/basic-types.json'),
  'type-inference.json': () => import('../data/examples/type-inference.json'),
  'functions.json': () => import('../data/examples/functions.json'),
  'interfaces.json': () => import('../data/examples/interfaces.json'),
  'type-aliases.json': () => import('../data/examples/type-aliases.json'),
  'classes.json': () => import('../data/examples/classes.json'),
  'generics.json': () => import('../data/examples/generics.json'),
  'enums.json': () => import('../data/examples/enums.json'),
  'type-guards.json': () => import('../data/examples/type-guards.json'),
  'utility-types.json': () => import('../data/examples/utility-types.json'),
  'advanced-patterns.json': () => import('../data/examples/advanced-patterns.json'),
  'tsconfig-example.json': () => import('../data/examples/tsconfig-example.json'),
  'common-patterns.json': () => import('../data/examples/common-patterns.json'),
  'common-errors.json': () => import('../data/examples/common-errors.json'),
  'quick-reference.json': () => import('../data/examples/quick-reference.json'),
};

// =============================================================================
// Main Component
// =============================================================================

const Lessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonMetadata | null>(null);
  const [activeTab, setActiveTab] = useState<ContentTab>('lesson');
  const [lessonContent, setLessonContent] = useState<any>(null);
  const [cheatsheetContent, setCheatsheetContent] = useState<any>(null);
  const [examplesContent, setExamplesContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const loadAllContent = async (lesson: LessonMetadata) => {
    console.log('[Lessons] Loading topic:', lesson.id);
    setSelectedLesson(lesson);
    setActiveTab('lesson');
    setIsLoading(true);
    setError(null);

    try {
      // Validate imports exist
      if (!LESSON_IMPORTS[lesson.lessonFile]) {
        throw new Error('Lesson file not found: ' + lesson.lessonFile);
      }
      if (!CHEATSHEET_IMPORTS[lesson.cheatsheetFile]) {
        throw new Error('Cheatsheet file not found: ' + lesson.cheatsheetFile);
      }
      if (!EXAMPLES_IMPORTS[lesson.examplesFile]) {
        throw new Error('Examples file not found: ' + lesson.examplesFile);
      }

      // Load all content in parallel
      const [lessonMod, cheatsheetMod, examplesMod] = await Promise.all([
        LESSON_IMPORTS[lesson.lessonFile](),
        CHEATSHEET_IMPORTS[lesson.cheatsheetFile](),
        EXAMPLES_IMPORTS[lesson.examplesFile]()
      ]);

      setLessonContent(lessonMod.default);
      setCheatsheetContent(cheatsheetMod.default);
      setExamplesContent(examplesMod.default);
      console.log('[Lessons] Successfully loaded all content for:', lesson.id);
    } catch (err: any) {
      console.error('[Lessons] ERROR loading content:', err);
      setError(err.message || 'Failed to load content');
    } finally {
      setIsLoading(false);
    }
  };

  const markComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const isCompleted = (lessonId: string) => completedLessons.has(lessonId);

  // Render lesson sections
  const renderLessonContent = () => {
    if (!lessonContent?.sections) return <p className="text-slate-400">No lesson content available.</p>;
    
    return (
      <div className="space-y-6">
        {lessonContent.sections.map((section: any, idx: number) => (
          <div key={idx} className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </span>
              {section.title}
            </h3>
            {section.content && <p className="text-slate-300 mb-4">{section.content}</p>}
            {section.analogy && (
              <div className="bg-purple-500/10 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
                <span className="text-purple-400 font-semibold">💡 </span>
                <span className="text-slate-300">{section.analogy}</span>
              </div>
            )}
            {section.example?.code && (
              <CodeBlock title={section.example.title || 'Example'}>
                {section.example.code}
              </CodeBlock>
            )}
            {section.keyPoints && (
              <div className="bg-blue-500/10 rounded-xl p-4 mt-4 border border-blue-500/20">
                <h4 className="text-blue-400 font-semibold mb-2">Key Points</h4>
                <ul className="space-y-1">
                  {section.keyPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <Circle className="w-1.5 h-1.5 text-blue-400 flex-shrink-0 mt-2" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render cheatsheet content
  const renderCheatsheetContent = () => {
    if (!cheatsheetContent) return <p className="text-slate-400">No cheatsheet content available.</p>;
    
    return (
      <div className="space-y-6">
        {cheatsheetContent.explanation && (
          <div className="bg-cyan-500/10 rounded-2xl p-6 border border-cyan-500/20">
            <p className="text-slate-300">{cheatsheetContent.explanation}</p>
          </div>
        )}
        {cheatsheetContent.codeBlocks?.map((block: any, idx: number) => (
          <CodeBlock key={idx} title={block.title}>{block.code}</CodeBlock>
        ))}
        {cheatsheetContent.keyPoints && (
          <div className="bg-cyan-500/10 rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-cyan-400 font-bold mb-3">📝 Key Points</h3>
            <ul className="space-y-2">
              {cheatsheetContent.keyPoints.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400">→</span>{point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Render examples content
  const renderExamplesContent = () => {
    if (!examplesContent?.examples) return <p className="text-slate-400">No examples available.</p>;
    
    return (
      <div className="space-y-6">
        {examplesContent.examples.map((example: any, idx: number) => (
          <div key={idx} className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </span>
              <h3 className="text-xl font-bold text-white">{example.title}</h3>
              {example.difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  example.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                  example.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {example.difficulty}
                </span>
              )}
            </div>
            {example.description && <p className="text-slate-400 mb-4">{example.description}</p>}
            {example.code && <CodeBlock title="Code">{example.code}</CodeBlock>}
            {example.explanation && (
              <div className="mt-4 bg-green-500/10 rounded-xl p-4 border-l-4 border-green-400">
                <span className="text-green-400 font-semibold">Explanation: </span>
                <span className="text-slate-300">{example.explanation}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/20">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              TypeScript Lessons
            </h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Complete tutorials with cheatsheets and practical examples for each topic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 sticky top-24">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Topics ({LESSONS.length})
              </h2>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
                {LESSONS.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => loadAllContent(lesson)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                      selectedLesson?.id === lesson.id
                        ? 'bg-blue-500/20 border border-blue-400/50'
                        : 'hover:bg-slate-700/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted(lesson.id) ? 'bg-green-500/20 text-green-400' :
                        selectedLesson?.id === lesson.id ? 'bg-blue-500/20 text-blue-400' :
                        'bg-slate-600/30 text-slate-400'
                      }`}>
                        {isCompleted(lesson.id) ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <span className={`text-sm font-medium truncate ${
                        selectedLesson?.id === lesson.id ? 'text-blue-400' : 'text-white'
                      }`}>
                        {lesson.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Progress */}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-blue-400 font-semibold">{completedLessons.size}/{LESSONS.length}</span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                    style={{ width: (completedLessons.size / LESSONS.length * 100) + '%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!selectedLesson ? (
              <div className="bg-slate-800/50 rounded-2xl p-12 border border-slate-700/50 text-center">
                <BookOpen className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Select a Topic</h2>
                <p className="text-slate-300">Choose from {LESSONS.length} topics to see lessons, cheatsheets, and examples.</p>
              </div>
            ) : isLoading ? (
              <div className="bg-slate-800/50 rounded-2xl p-12 border border-slate-700/50 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto" />
                <p className="text-slate-300 mt-4">Loading...</p>
              </div>
            ) : error ? (
              <div className="bg-red-900/30 rounded-2xl p-8 border border-red-500/50 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
                <p className="text-red-300 mb-4">{error}</p>
                <button
                  onClick={() => selectedLesson && loadAllContent(selectedLesson)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl"
                >
                  <RefreshCw className="w-4 h-4" /> Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header with Tabs */}
                <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700/50">
                  <h1 className="text-2xl font-bold text-white mb-2">{selectedLesson.title}</h1>
                  <p className="text-slate-400 mb-4">{selectedLesson.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab('lesson')}
                      className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all ${
                        activeTab === 'lesson'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" /> Lesson
                    </button>
                    <button
                      onClick={() => setActiveTab('cheatsheet')}
                      className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all ${
                        activeTab === 'cheatsheet'
                          ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <FileCode className="w-4 h-4" /> Cheatsheet
                    </button>
                    <button
                      onClick={() => setActiveTab('examples')}
                      className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all ${
                        activeTab === 'examples'
                          ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Code2 className="w-4 h-4" /> Examples
                    </button>
                    
                    {!isCompleted(selectedLesson.id) && (
                      <button
                        onClick={() => markComplete(selectedLesson.id)}
                        className="ml-auto px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" /> Mark Complete
                      </button>
                    )}
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'lesson' && renderLessonContent()}
                {activeTab === 'cheatsheet' && renderCheatsheetContent()}
                {activeTab === 'examples' && renderExamplesContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
