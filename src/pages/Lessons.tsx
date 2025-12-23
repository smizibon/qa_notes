import React, { useState } from 'react';
import { BookOpen, ChevronRight, CheckCircle, Circle } from 'lucide-react';

interface LessonMetadata {
  id: string;
  title: string;
  description: string;
  file: string;
}

const lessons: LessonMetadata[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with TypeScript',
    description: 'Introduction to TypeScript, setup, and your first program',
    file: 'getting-started.json'
  },
  {
    id: 'basic-types',
    title: 'Basic Types',
    description: 'Understanding TypeScript\'s fundamental type system',
    file: 'basic-types.json'
  },
  {
    id: 'type-inference',
    title: 'Type Inference',
    description: 'Let TypeScript figure out types automatically',
    file: 'type-inference.json'
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Typing functions, parameters, and return values',
    file: 'functions.json'
  },
  {
    id: 'interfaces',
    title: 'Interfaces',
    description: 'Defining object shapes and contracts',
    file: 'interfaces.json'
  },
  {
    id: 'type-aliases',
    title: 'Type Aliases',
    description: 'Creating custom type names and reusable type definitions',
    file: 'type-aliases.json'
  },
  {
    id: 'classes',
    title: 'Classes',
    description: 'Object-oriented programming with TypeScript',
    file: 'classes.json'
  },
  {
    id: 'generics',
    title: 'Generics',
    description: 'Write reusable, type-safe code',
    file: 'generics.json'
  },
  {
    id: 'enums',
    title: 'Enums',
    description: 'Named constants with numeric and string values',
    file: 'enums.json'
  },
  {
    id: 'type-guards',
    title: 'Type Guards',
    description: 'Runtime type checking and narrowing',
    file: 'type-guards.json'
  },
  {
    id: 'utility-types',
    title: 'Utility Types',
    description: 'Built-in type transformation helpers',
    file: 'utility-types.json'
  },
  {
    id: 'advanced-patterns',
    title: 'Advanced Patterns',
    description: 'Conditional, mapped, and template literal types',
    file: 'advanced-patterns.json'
  },
  {
    id: 'tsconfig',
    title: 'TSConfig',
    description: 'Configuring the TypeScript compiler',
    file: 'tsconfig-lesson.json'
  },
  {
    id: 'common-patterns',
    title: 'Common Patterns',
    description: 'Best practices and design patterns in TypeScript',
    file: 'common-patterns.json'
  },
  {
    id: 'common-errors',
    title: 'Common Errors',
    description: 'Understanding and fixing TypeScript errors',
    file: 'common-errors.json'
  },
  {
    id: 'quick-reference',
    title: 'Quick Reference',
    description: 'Fast syntax lookup and cheat sheet summary',
    file: 'quick-reference.json'
  }
];

const Lessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [lessonContent, setLessonContent] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const loadLesson = async (lessonId: string, file: string) => {
    setSelectedLesson(lessonId);
    try {
      let content;
      switch (file) {
        case 'getting-started.json':
          content = await import('../data/lessons/getting-started.json');
          break;
        case 'basic-types.json':
          content = await import('../data/lessons/basic-types.json');
          break;
        case 'type-inference.json':
          content = await import('../data/lessons/type-inference.json');
          break;
        case 'functions.json':
          content = await import('../data/lessons/functions.json');
          break;
        case 'interfaces.json':
          content = await import('../data/lessons/interfaces.json');
          break;
        case 'type-aliases.json':
          content = await import('../data/lessons/type-aliases.json');
          break;
        case 'classes.json':
          content = await import('../data/lessons/classes.json');
          break;
        case 'generics.json':
          content = await import('../data/lessons/generics.json');
          break;
        case 'enums.json':
          content = await import('../data/lessons/enums.json');
          break;
        case 'type-guards.json':
          content = await import('../data/lessons/type-guards.json');
          break;
        case 'utility-types.json':
          content = await import('../data/lessons/utility-types.json');
          break;
        case 'advanced-patterns.json':
          content = await import('../data/lessons/advanced-patterns.json');
          break;
        case 'tsconfig-lesson.json':
          content = await import('../data/lessons/tsconfig-lesson.json');
          break;
        case 'common-patterns.json':
          content = await import('../data/lessons/common-patterns.json');
          break;
        case 'common-errors.json':
          content = await import('../data/lessons/common-errors.json');
          break;
        case 'quick-reference.json':
          content = await import('../data/lessons/quick-reference.json');
          break;
        default:
          throw new Error(`Unknown lesson file: ${file}`);
      }
      setLessonContent(content.default);
    } catch (error) {
      console.error('Failed to load lesson:', error);
      setLessonContent(null);
    }
  };

  const markComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const isCompleted = (lessonId: string) => completedLessons.has(lessonId);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/20">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              TypeScript Lessons
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Complete beginner-friendly tutorials that explain TypeScript from the ground up. 
            Start here before diving into the cheatsheet!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/70 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
                Curriculum
              </h2>
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => loadLesson(lesson.id, lesson.file)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                      selectedLesson === lesson.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/50 shadow-lg shadow-blue-500/20'
                        : 'bg-slate-700/30 hover:bg-slate-700/50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        isCompleted(lesson.id)
                          ? 'bg-green-500/20 text-green-400'
                          : selectedLesson === lesson.id
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-600/30 text-slate-400'
                      }`}>
                        {isCompleted(lesson.id) ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm mb-1 ${
                          selectedLesson === lesson.id ? 'text-blue-400' : 'text-white'
                        }`}>
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {lesson.description}
                        </p>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        selectedLesson === lesson.id ? 'text-blue-400 translate-x-1' : 'text-slate-500'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-300">Progress</span>
                  <span className="text-blue-400 font-semibold">
                    {completedLessons.size}/{lessons.length}
                  </span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${(completedLessons.size / lessons.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {!selectedLesson ? (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 text-center">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl mb-6">
                  <BookOpen className="w-16 h-16 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Select a Lesson to Begin
                </h2>
                <p className="text-lg text-slate-300 max-w-md mx-auto">
                  Choose a lesson from the sidebar to start your TypeScript learning journey. 
                  Each lesson builds on the previous ones.
                </p>
              </div>
            ) : lessonContent ? (
              <div className="space-y-6">
                {/* Lesson Header */}
                <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                    {lessonContent.title}
                  </h1>
                  <p className="text-xl text-slate-300 mb-6">
                    {lessonContent.description}
                  </p>
                  {!isCompleted(selectedLesson) && (
                    <button
                      onClick={() => markComplete(selectedLesson)}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Mark as Complete
                    </button>
                  )}
                </div>

                {/* Lesson Sections */}
                {lessonContent.sections?.map((section: any, index: number) => (
                  <div
                    key={index}
                    className="bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      {section.title}
                    </h2>

                    {section.content && (
                      <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        {section.content}
                      </p>
                    )}

                    {section.analogy && (
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-400 rounded-xl p-6 mb-6">
                        <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                          <span className="text-xl">💡</span>
                          Analogy
                        </h3>
                        <p className="text-slate-300">{section.analogy}</p>
                      </div>
                    )}

                    {section.example && section.example.code && (
                      <div className="mb-6">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-6 border border-slate-700/50">
                          <pre className="text-cyan-300 text-sm overflow-x-auto">
                            <code>{section.example.code}</code>
                          </pre>
                        </div>
                        {section.example.explanation && (
                          <p className="text-slate-400 text-sm mt-3 italic">
                            → {section.example.explanation}
                          </p>
                        )}
                      </div>
                    )}

                    {section.examples && Array.isArray(section.examples) && (
                      <div className="space-y-4">
                        {section.examples.map((ex: any, exIndex: number) => (
                          <div key={exIndex} className="bg-slate-900/50 rounded-xl p-6">
                            {ex.title && (
                              <h4 className="text-cyan-400 font-semibold mb-3">{ex.title}</h4>
                            )}
                            {ex.code && (
                              <div className="bg-slate-950 rounded-lg p-4 mb-3">
                                <pre className="text-cyan-300 text-sm overflow-x-auto">
                                  <code>{ex.code}</code>
                                </pre>
                              </div>
                            )}
                            {ex.explanation && (
                              <p className="text-slate-400 text-sm italic">
                                → {ex.explanation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.keyPoints && Array.isArray(section.keyPoints) && (
                      <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                        <h3 className="text-blue-400 font-semibold mb-3">Key Points</h3>
                        <ul className="space-y-2">
                          {section.keyPoints.map((point: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300">
                              <Circle className="w-2 h-2 text-blue-400 flex-shrink-0 mt-2" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.benefits && Array.isArray(section.benefits) && (
                      <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                        <h3 className="text-green-400 font-semibold mb-3">Benefits</h3>
                        <ul className="space-y-2">
                          {section.benefits.map((benefit: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300">
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-slate-300 mt-4">Loading lesson...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
