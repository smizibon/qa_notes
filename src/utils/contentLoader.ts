/**
 * Content Loader Utility
 * Creates import maps for dynamic content loading across topics
 * Eliminates code duplication and enables scalability for multiple topics
 */

import { loadJsonFile } from './errorHandler';

/**
 * Creates a map of file names to loader functions for a specific topic and content type
 * 
 * @param topic - The topic name (e.g., 'typescript', 'playwright', 'api-testing')
 * @param contentType - Type of content ('lessons', 'cheatsheet', 'examples')
 * @param fileNames - Array of JSON file names
 * @returns Record mapping file names to loader functions
 * 
 * @example
 * const lessons = createContentImports('typescript', 'lessons', [
 *   'getting-started.json',
 *   'basic-types.json'
 * ]);
 * 
 * // Usage
 * const { data, error } = await lessons['getting-started.json']();
 */
export function createContentImports(
  topic: string,
  contentType: 'lessons' | 'cheatsheet' | 'examples',
  fileNames: string[]
): Record<string, () => Promise<any>> {
  return fileNames.reduce((acc, fileName) => {
    acc[fileName] = () => loadJsonFile(`/src/data/${topic}/${contentType}/${fileName}`);
    return acc;
  }, {} as Record<string, () => Promise<any>>);
}

/**
 * Creates all three content import maps (lessons, cheatsheet, examples) for a topic
 * 
 * @param topic - The topic name
 * @param fileNames - Array of JSON file names (same files used across all content types)
 * @returns Object with lessons, cheatsheet, and examples import maps
 * 
 * @example
 * const imports = createTopicImports('typescript', [
 *   'getting-started.json',
 *   'basic-types.json'
 * ]);
 * 
 * const { data } = await imports.lessons['getting-started.json']();
 */
export function createTopicImports(
  topic: string,
  fileNames: string[]
): {
  lessons: Record<string, () => Promise<any>>;
  cheatsheet: Record<string, () => Promise<any>>;
  examples: Record<string, () => Promise<any>>;
} {
  return {
    lessons: createContentImports(topic, 'lessons', fileNames),
    cheatsheet: createContentImports(topic, 'cheatsheet', fileNames),
    examples: createContentImports(topic, 'examples', fileNames),
  };
}

/**
 * Standard file names for TypeScript topic
 * Can be reused or customized for other topics
 */
export const TYPESCRIPT_FILES = [
  'getting-started.json',
  'basic-types.json',
  'type-inference.json',
  'functions.json',
  'interfaces.json',
  'type-aliases.json',
  'classes.json',
  'generics.json',
  'enums.json',
  'type-guards.json',
  'utility-types.json',
  'advanced-patterns.json',
  'tsconfig-lesson.json',
  'common-patterns.json',
  'common-errors.json',
  'quick-reference.json',
];

/**
 * Cheatsheet has slightly different file name for tsconfig
 */
export const TYPESCRIPT_CHEATSHEET_FILES = [
  ...TYPESCRIPT_FILES.slice(0, 12), // First 12 files are the same
  'tsconfig-section.json', // Different file name
  ...TYPESCRIPT_FILES.slice(13), // Rest are the same
];

/**
 * Examples has slightly different file name for tsconfig
 */
export const TYPESCRIPT_EXAMPLES_FILES = [
  ...TYPESCRIPT_FILES.slice(0, 12), // First 12 files are the same
  'tsconfig-example.json', // Different file name
  ...TYPESCRIPT_FILES.slice(13), // Rest are the same
];

/**
 * Prompt Engineering files for LLM & AI topic
 * All three content types use the same file names
 */
export const PROMPT_ENGINEERING_FILES = [
  'foundation-understanding.json',
  'core-components.json',
  'context-mastery.json',
  'advanced-techniques.json',
];
