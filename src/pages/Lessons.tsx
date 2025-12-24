import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Circle, 
  FileCode, 
  Code2, 
  GraduationCap
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import ErrorDisplay from '../components/ErrorDisplay';
import { ErrorHandler, ErrorType, AppError, loadJsonFile } from '../utils/errorHandler';
import { 
  createContentImports, 
  TYPESCRIPT_FILES, 
  TYPESCRIPT_CHEATSHEET_FILES, 
  TYPESCRIPT_EXAMPLES_FILES 
} from '../utils/contentLoader';

// =============================================================================
// Types & Configuration
// =============================================================================

interface LessonsProps {
  selectedTopic: string;
}

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

// TypeScript Content Imports - using reusable contentLoader utility
const LESSON_IMPORTS = createContentImports('typescript', 'lessons', TYPESCRIPT_FILES);
const CHEATSHEET_IMPORTS = createContentImports('typescript', 'cheatsheet', TYPESCRIPT_CHEATSHEET_FILES);
const EXAMPLES_IMPORTS = createContentImports('typescript', 'examples', TYPESCRIPT_EXAMPLES_FILES);

// =============================================================================
// Main Component
// =============================================================================

const Lessons: React.FC<LessonsProps> = ({ selectedTopic }) => {
  const [selectedLesson, setSelectedLesson] = useState<LessonMetadata | null>(null);
  const [activeTab, setActiveTab] = useState<ContentTab>('lesson');
  const [lessonContent, setLessonContent] = useState<any>(null);
  const [cheatsheetContent, setCheatsheetContent] = useState<any>(null);
  const [examplesContent, setExamplesContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const loadAllContent = async (lesson: LessonMetadata) => {
    setSelectedLesson(lesson);
    setActiveTab('lesson');
    setIsLoading(true);
    setError(null);

    try {
      // Validate imports exist
      if (!LESSON_IMPORTS[lesson.lessonFile]) {
        throw new AppError(
          `Lesson file not found: ${lesson.lessonFile}`,
          ErrorType.NOT_FOUND,
          { lesson: lesson.id }
        );
      }
      if (!CHEATSHEET_IMPORTS[lesson.cheatsheetFile]) {
        throw new AppError(
          `Cheatsheet file not found: ${lesson.cheatsheetFile}`,
          ErrorType.NOT_FOUND,
          { lesson: lesson.id }
        );
      }
      if (!EXAMPLES_IMPORTS[lesson.examplesFile]) {
        throw new AppError(
          `Examples file not found: ${lesson.examplesFile}`,
          ErrorType.NOT_FOUND,
          { lesson: lesson.id }
        );
      }

      // Load all content in parallel with error handling
      const [lessonResult, cheatsheetResult, examplesResult] = await Promise.all([
        LESSON_IMPORTS[lesson.lessonFile](),
        CHEATSHEET_IMPORTS[lesson.cheatsheetFile](),
        EXAMPLES_IMPORTS[lesson.examplesFile]()
      ]);

      // Check for errors
      if (lessonResult.error) throw lessonResult.error;
      if (cheatsheetResult.error) throw cheatsheetResult.error;
      if (examplesResult.error) throw examplesResult.error;

      setLessonContent(lessonResult.data);
      setCheatsheetContent(cheatsheetResult.data);
      setExamplesContent(examplesResult.data);
    } catch (err: any) {
      const appError = err instanceof AppError 
        ? err 
        : new AppError(
            err.message || 'Failed to load content',
            ErrorType.NETWORK,
            { lesson: lesson.id }
          );
      setError(appError);
      ErrorHandler.handleSync(() => { throw appError; }, 'Lessons.loadAllContent');
    } finally {
      setIsLoading(false);
    }
  };

  const markComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const isCompleted = (lessonId: string) => completedLessons.has(lessonId);

  // Render lesson sections - handles all possible fields from lesson JSON files
  const renderLessonContent = () => {
    if (!lessonContent?.sections) return <p className="text-slate-400">No lesson content available.</p>;
    
    try {
      return (
        <div className="space-y-6">
          {/* Description at top if available */}
          {lessonContent.description && (
            <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
              <p className="text-slate-300">{lessonContent.description}</p>
            </div>
          )}
          
          {lessonContent.sections.map((section: any, idx: number) => (
          <div key={idx} className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </span>
              {section.title}
            </h3>
            
            {/* Main content */}
            {section.content && <p className="text-slate-300 mb-4">{section.content}</p>}
            
            {/* Quick Reference - for quick-reference.json */}
            {section.quick_ref && Array.isArray(section.quick_ref) && section.quick_ref.length > 0 && (
              <div className="bg-slate-900/50 rounded-xl p-4 mb-4 border border-slate-700/50">
                <div className="space-y-3">
                  {section.quick_ref.map((ref: any, i: number) => (
                    <div key={i} className="flex flex-col gap-1">
                      <code className="text-cyan-400 text-sm bg-slate-800/50 px-2 py-1 rounded font-mono">
                        {ref.syntax}
                      </code>
                      <p className="text-slate-400 text-sm pl-2">→ {ref.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Explanation (separate from content) */}
            {section.explanation && (
              <div className="bg-slate-700/30 rounded-xl p-4 mb-4 border-l-4 border-slate-500">
                <span className="text-slate-300">{section.explanation}</span>
              </div>
            )}
            
            {/* Analogy */}
            {section.analogy && (
              <div className="bg-purple-500/10 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
                <span className="text-purple-400 font-semibold">💡 Analogy: </span>
                <span className="text-slate-300">{section.analogy}</span>
              </div>
            )}
            
            {/* Warning */}
            {section.warning && (
              <div className="bg-red-500/10 border-l-4 border-red-400 rounded-r-xl p-4 mb-4">
                <span className="text-red-400 font-semibold">⚠️ Warning: </span>
                <span className="text-slate-300">{section.warning}</span>
              </div>
            )}
            
            {/* Best Practice */}
            {section.bestPractice && (
              <div className="bg-green-500/10 border-l-4 border-green-400 rounded-r-xl p-4 mb-4">
                <span className="text-green-400 font-semibold">✅ Best Practice: </span>
                <span className="text-slate-300">{section.bestPractice}</span>
              </div>
            )}
            
            {/* Note */}
            {section.note && (
              <div className="bg-yellow-500/10 border-l-4 border-yellow-400 rounded-r-xl p-4 mb-4">
                <span className="text-yellow-400 font-semibold">📝 Note: </span>
                <span className="text-slate-300">{section.note}</span>
              </div>
            )}
            
            {/* When to Use - string or array */}
            {section.whenToUse && (
              <div className="bg-cyan-500/10 rounded-xl p-4 mb-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-2">🎯 When to Use</h4>
                {typeof section.whenToUse === 'string' ? (
                  <p className="text-slate-300">{section.whenToUse}</p>
                ) : Array.isArray(section.whenToUse) ? (
                  <ul className="space-y-1">
                    {section.whenToUse.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="text-cyan-400">→</span>{item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
            
            {/* Two Syntaxes */}
            {section.twoSyntaxes && (
              <div className="bg-indigo-500/10 rounded-xl p-4 mb-4 border border-indigo-500/20">
                <h4 className="text-indigo-400 font-semibold mb-2">📐 Two Syntaxes</h4>
                {section.twoSyntaxes.description && <p className="text-slate-300 mb-2">{section.twoSyntaxes.description}</p>}
                <div className="space-y-1 font-mono text-sm">
                  {section.twoSyntaxes.syntax1 && <p className="text-slate-300">1. <code className="bg-slate-700/50 px-2 py-1 rounded">{section.twoSyntaxes.syntax1}</code></p>}
                  {section.twoSyntaxes.syntax2 && <p className="text-slate-300">2. <code className="bg-slate-700/50 px-2 py-1 rounded">{section.twoSyntaxes.syntax2}</code></p>}
                </div>
              </div>
            )}
            
            {/* Difference object */}
            {section.difference && (
              <div className="bg-orange-500/10 rounded-xl p-4 mb-4 border border-orange-500/20">
                <h4 className="text-orange-400 font-semibold mb-2">⚖️ Difference</h4>
                <div className="space-y-2">
                  {Object.entries(section.difference).map(([key, value]: [string, any]) => (
                    <p key={key} className="text-slate-300">
                      <span className="text-orange-400 font-semibold">{key}:</span> {value}
                    </p>
                  ))}
                </div>
              </div>
            )}
            
            {/* VS comparison */}
            {section.vsArray && (
              <div className="bg-pink-500/10 rounded-xl p-4 mb-4 border border-pink-500/20">
                <h4 className="text-pink-400 font-semibold mb-2">🔄 Comparison</h4>
                <pre className="text-slate-300 text-sm whitespace-pre-wrap">{section.vsArray}</pre>
              </div>
            )}
            
            {/* strictNullChecks */}
            {section.strictNullChecks && (
              <div className="bg-blue-500/10 rounded-xl p-4 mb-4 border border-blue-500/20">
                <h4 className="text-blue-400 font-semibold mb-2">⚙️ strictNullChecks</h4>
                <p className="text-slate-300">{section.strictNullChecks}</p>
              </div>
            )}
            
            {/* Single example (code string) */}
            {section.example && typeof section.example === 'string' && (
              <CodeBlock title="Example">{section.example}</CodeBlock>
            )}
            
            {/* Single example (object with code) */}
            {section.example && typeof section.example === 'object' && section.example.code && (
              <CodeBlock title={section.example.title || 'Example'}>{section.example.code}</CodeBlock>
            )}
            
            {/* Multiple examples array */}
            {section.examples && Array.isArray(section.examples) && section.examples.length > 0 && (
              <div className="space-y-3 mb-4">
                <h4 className="text-blue-400 font-semibold">📝 Examples</h4>
                {section.examples.map((ex: any, i: number) => (
                  <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-600/30">
                    <CodeBlock title={`Example ${i + 1}`}>{ex.code}</CodeBlock>
                    {ex.explanation && (
                      <p className="text-slate-400 text-sm mt-2 italic">↳ {ex.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Common Operations */}
            {section.commonOperations && (
              <div className="bg-emerald-500/10 rounded-xl p-4 mb-4 border border-emerald-500/20">
                <h4 className="text-emerald-400 font-semibold mb-2">🔧 Common Operations</h4>
                <ul className="space-y-1">
                  {section.commonOperations.map((op: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm font-mono">
                      <span className="text-emerald-400">•</span>{op}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Use Cases */}
            {section.useCases && (
              <div className="bg-violet-500/10 rounded-xl p-4 mb-4 border border-violet-500/20">
                <h4 className="text-violet-400 font-semibold mb-2">💼 Use Cases</h4>
                <ul className="space-y-1">
                  {section.useCases.map((uc: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-violet-400">→</span>{uc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Tips array */}
            {section.tips && (
              <div className="space-y-3 mb-4">
                <h4 className="text-amber-400 font-semibold">💡 Tips</h4>
                {section.tips.map((tipItem: any, i: number) => (
                  <div key={i} className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                    <p className="text-amber-400 font-semibold mb-2">{tipItem.tip}</p>
                    {tipItem.example && <CodeBlock title="Example">{tipItem.example}</CodeBlock>}
                    {tipItem.explanation && <p className="text-slate-400 text-sm mt-2">{tipItem.explanation}</p>}
                  </div>
                ))}
              </div>
            )}
            
            {/* Key Points */}
            {section.keyPoints && (
              <div className="bg-blue-500/10 rounded-xl p-4 mt-4 border border-blue-500/20">
                <h4 className="text-blue-400 font-semibold mb-2">🔑 Key Points</h4>
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
            
            {/* Problem/Solution (from generics) */}
            {section.problem && (
              <div className="bg-red-500/10 rounded-xl p-4 mb-4 border border-red-500/20">
                <h4 className="text-red-400 font-semibold mb-2">❌ Problem</h4>
                {section.problem.description && <p className="text-slate-300 mb-3">{section.problem.description}</p>}
                {section.problem.code && <CodeBlock title="Problematic Code">{section.problem.code}</CodeBlock>}
                {section.problem.issue && <p className="text-red-400 text-sm mt-2 italic">⚠️ {section.problem.issue}</p>}
              </div>
            )}
            
            {section.solution && (
              <div className="bg-green-500/10 rounded-xl p-4 mb-4 border border-green-500/20">
                <h4 className="text-green-400 font-semibold mb-2">✅ Solution</h4>
                {section.solution.description && <p className="text-slate-300 mb-3">{section.solution.description}</p>}
                {section.solution.code && <CodeBlock title="Solution">{section.solution.code}</CodeBlock>}
                {section.solution.benefit && <p className="text-green-400 text-sm mt-2 italic">💡 {section.solution.benefit}</p>}
              </div>
            )}
            
            {/* Syntax (string or object) */}
            {section.syntax && (
              <div className="bg-indigo-500/10 rounded-xl p-4 mb-4 border border-indigo-500/20">
                <h4 className="text-indigo-400 font-semibold mb-2">📐 Syntax</h4>
                {typeof section.syntax === 'string' ? (
                  <code className="text-slate-300 font-mono bg-slate-700/50 px-3 py-2 rounded block">{section.syntax}</code>
                ) : (
                  <>
                    {section.syntax.function && <code className="text-slate-300 font-mono bg-slate-700/50 px-3 py-2 rounded block mb-2">{section.syntax.function}</code>}
                    {section.syntax.explanation && <p className="text-slate-400 text-sm">{section.syntax.explanation}</p>}
                  </>
                )}
              </div>
            )}
            
            {/* Conventions for Type Parameters */}
            {section.conventionsForTypeParameters && (
              <div className="bg-teal-500/10 rounded-xl p-4 mb-4 border border-teal-500/20">
                <h4 className="text-teal-400 font-semibold mb-2">📝 Type Parameter Conventions</h4>
                <ul className="space-y-1">
                  {section.conventionsForTypeParameters.map((conv: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm font-mono">
                      <span className="text-teal-400">•</span>{conv}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Patterns */}
            {section.patterns && (
              <div className="space-y-4 mb-4">
                <h4 className="text-purple-400 font-semibold">🔮 Common Patterns</h4>
                {section.patterns.map((pattern: any, i: number) => (
                  <div key={i} className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                    <h5 className="text-purple-300 font-semibold mb-2">{pattern.name}</h5>
                    {pattern.code && <CodeBlock title={pattern.name}>{pattern.code}</CodeBlock>}
                    {pattern.explanation && <p className="text-slate-400 text-sm mt-2">{pattern.explanation}</p>}
                  </div>
                ))}
              </div>
            )}
            
            {/* Practices (best practices) */}
            {section.practices && (
              <div className="space-y-4 mb-4">
                <h4 className="text-emerald-400 font-semibold">⭐ Best Practices</h4>
                {section.practices.map((p: any, i: number) => (
                  <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
                    <p className="text-emerald-400 font-semibold mb-3">{p.practice}</p>
                    {p.why && <p className="text-slate-400 text-sm mb-3 italic">Why: {p.why}</p>}
                    {p.bad && (
                      <div className="mb-3">
                        <span className="text-red-400 text-xs font-semibold">❌ BAD:</span>
                        <CodeBlock title="Don't do this">{p.bad}</CodeBlock>
                      </div>
                    )}
                    {p.good && (
                      <div className="mb-3">
                        <span className="text-green-400 text-xs font-semibold">✅ GOOD:</span>
                        <CodeBlock title="Do this instead">{p.good}</CodeBlock>
                      </div>
                    )}
                    {p.verbose && (
                      <div className="mb-3">
                        <span className="text-yellow-400 text-xs font-semibold">📝 VERBOSE:</span>
                        <CodeBlock title="Works but verbose">{p.verbose}</CodeBlock>
                      </div>
                    )}
                    {p.better && (
                      <div className="mb-3">
                        <span className="text-green-400 text-xs font-semibold">✨ BETTER:</span>
                        <CodeBlock title="Cleaner approach">{p.better}</CodeBlock>
                      </div>
                    )}
                    {p.code && !p.bad && !p.good && (
                      <CodeBlock title="Example">{p.code}</CodeBlock>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Benefits */}
            {section.benefits && (
              <div className="bg-green-500/10 rounded-xl p-4 mb-4 border border-green-500/20">
                <h4 className="text-green-400 font-semibold mb-2">✨ Benefits</h4>
                <ul className="space-y-1">
                  {section.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-green-400">✓</span>{benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Steps */}
            {section.steps && (
              <div className="space-y-4 mb-4">
                <h4 className="text-cyan-400 font-semibold">📋 Steps</h4>
                {section.steps.map((stepItem: any, i: number) => (
                  <div key={i} className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-cyan-300 font-semibold">{stepItem.step}</p>
                        {stepItem.description && <p className="text-slate-400 text-sm mt-1">{stepItem.description}</p>}
                      </div>
                    </div>
                    {stepItem.command && (
                      <CodeBlock title="Command">{stepItem.command}</CodeBlock>
                    )}
                    {stepItem.explanation && (
                      <p className="text-slate-400 text-xs mt-2 italic">💡 {stepItem.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Process */}
            {section.process && (
              <div className="bg-indigo-500/10 rounded-xl p-4 mb-4 border border-indigo-500/20">
                <h4 className="text-indigo-400 font-semibold mb-2">⚙️ Process</h4>
                <ol className="space-y-2">
                  {section.process.map((step: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-indigo-400 font-bold">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            
            {/* Workflow */}
            {section.workflow && (
              <div className="space-y-3 mb-4">
                <h4 className="text-purple-400 font-semibold">🔄 Workflow</h4>
                {section.workflow.map((phase: any, i: number) => (
                  <div key={i} className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-start gap-3">
                      <span className="text-purple-400 font-bold text-lg">→</span>
                      <div>
                        <p className="text-purple-300 font-semibold">{phase.phase}</p>
                        {phase.description && <p className="text-slate-400 text-sm mt-1">{phase.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Tips */}
            {section.tips && Array.isArray(section.tips) && (
              <div className="bg-amber-500/10 rounded-xl p-4 mb-4 border border-amber-500/20">
                <h4 className="text-amber-400 font-semibold mb-3">💡 Quick Tips</h4>
                <ul className="space-y-2">
                  {section.tips.map((tipItem: any, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-amber-400">→</span>
                      <span>{tipItem.tip || tipItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Mistakes */}
            {section.mistakes && (
              <div className="space-y-3 mb-4">
                <h4 className="text-red-400 font-semibold">⚠️ Common Mistakes</h4>
                {section.mistakes.map((mistakeItem: any, i: number) => (
                  <div key={i} className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                    <p className="text-red-300 font-semibold mb-2">❌ {mistakeItem.mistake}</p>
                    {(mistakeItem.fix || mistakeItem.solution) && (
                      <div className="bg-green-500/10 rounded-lg p-3 border-l-4 border-green-400 mt-2">
                        <span className="text-green-400 font-semibold text-sm">✓ Fix: </span>
                        <span className="text-slate-300 text-sm">{mistakeItem.fix || mistakeItem.solution}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Shortcuts */}
            {section.shortcuts && Array.isArray(section.shortcuts) && (
              <div className="bg-purple-500/10 rounded-xl p-4 mb-4 border border-purple-500/20">
                <h4 className="text-purple-400 font-semibold mb-3">⌨️ Keyboard Shortcuts</h4>
                <div className="space-y-2">
                  {section.shortcuts.map((shortcut: any, i: number) => (
                    <div key={i} className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-slate-300">{shortcut.action}</span>
                      <div className="flex gap-2">
                        {shortcut.mac && (
                          <code className="bg-slate-800/50 px-2 py-1 rounded text-purple-300 text-xs">Mac: {shortcut.mac}</code>
                        )}
                        {shortcut.win && (
                          <code className="bg-slate-800/50 px-2 py-1 rounded text-purple-300 text-xs">Win: {shortcut.win}</code>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Commands */}
            {section.commands && Array.isArray(section.commands) && (
              <div className="bg-cyan-500/10 rounded-xl p-4 mb-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-3">⚡ CLI Commands</h4>
                <div className="space-y-3">
                  {section.commands.map((cmd: any, i: number) => (
                    <div key={i} className="flex flex-col gap-1">
                      <code className="text-cyan-300 text-sm bg-slate-800/50 px-2 py-1 rounded font-mono">
                        {cmd.command}
                      </code>
                      {cmd.desc && <p className="text-slate-400 text-sm pl-2">→ {cmd.desc}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Note (single note for decorator section) */}
            {section.note && (
              <div className="bg-yellow-500/10 border-l-4 border-yellow-400 rounded-r-xl p-4 mb-4">
                <span className="text-yellow-400 font-semibold">📝 Note: </span>
                <span className="text-slate-300">{section.note}</span>
              </div>
            )}
            
            {/* Resources (array of objects with name and url) */}
            {section.resources && Array.isArray(section.resources) && (
              <div className="bg-blue-500/10 rounded-xl p-4 mb-4 border border-blue-500/20">
                <h4 className="text-blue-400 font-semibold mb-3">📚 Useful Resources</h4>
                <ul className="space-y-2">
                  {section.resources.map((resource: any, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-400">📖</span>
                      {resource.url ? (
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:text-blue-200 underline"
                        >
                          {resource.name || resource}
                        </a>
                      ) : (
                        <span className="text-slate-300">{resource.name || resource}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
    } catch (err) {
      const error = err instanceof AppError ? err : new AppError(
        err instanceof Error ? err.message : String(err),
        ErrorType.RENDER,
        { contentType: 'lesson' }
      );
      return <ErrorDisplay error={error} compact />;
    }
  };

  // Render cheatsheet content
  const renderCheatsheetContent = () => {
    if (!cheatsheetContent) return <p className="text-slate-400">No cheatsheet content available.</p>;
    
    try {
      return (
        <div className="space-y-6">
        {/* Title */}
        {cheatsheetContent.title && (
          <h2 className="text-2xl font-bold text-cyan-400">{cheatsheetContent.title}</h2>
        )}
        
        {/* Explanation */}
        {cheatsheetContent.explanation && (
          <div className="bg-cyan-500/10 rounded-2xl p-6 border border-cyan-500/20">
            <p className="text-slate-300">{cheatsheetContent.explanation}</p>
          </div>
        )}
        
        {/* Code Blocks */}
        {cheatsheetContent.codeBlocks?.map((block: any, idx: number) => (
          <CodeBlock key={idx} title={block.title}>{block.code}</CodeBlock>
        ))}
        
        {/* Key Points */}
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
        
        {/* Tip */}
        {cheatsheetContent.tip && (
          <div className="bg-amber-500/10 border-l-4 border-amber-400 rounded-r-xl p-4">
            <span className="text-amber-400 font-semibold">💡 Tip: </span>
            <span className="text-slate-300">{cheatsheetContent.tip}</span>
          </div>
        )}
        </div>
      );
    } catch (err) {
      const error = err instanceof AppError ? err : new AppError(
        err instanceof Error ? err.message : String(err),
        ErrorType.RENDER,
        { contentType: 'cheatsheet' }
      );
      return <ErrorDisplay error={error} compact />;
    }
  };

  // Render examples content
  const renderExamplesContent = () => {
    if (!examplesContent?.examples) return <p className="text-slate-400">No examples available.</p>;
    
    try {
      return (
        <div className="space-y-6">
        {/* Title */}
        {examplesContent.title && (
          <h2 className="text-2xl font-bold text-green-400">{examplesContent.title}</h2>
        )}
        
        {/* Description */}
        {examplesContent.description && (
          <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/20">
            <p className="text-slate-300">{examplesContent.description}</p>
          </div>
        )}
        
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
    } catch (err) {
      const error = err instanceof AppError ? err : new AppError(
        err instanceof Error ? err.message : String(err),
        ErrorType.RENDER,
        { contentType: 'examples' }
      );
      return <ErrorDisplay error={error} compact />;
    }
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
              <ErrorDisplay 
                error={error} 
                onRetry={() => selectedLesson && loadAllContent(selectedLesson)}
              />
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
