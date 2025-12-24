/**
 * Centralized Error Handling Library
 * Provides consistent error handling, logging, and user-friendly error displays
 */

// Error types for categorization
export enum ErrorType {
  NETWORK = 'NETWORK',
  PARSE = 'PARSE',
  VALIDATION = 'VALIDATION',
  RENDER = 'RENDER',
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN = 'UNKNOWN',
}

// Custom error class with additional context
export class AppError extends Error {
  type: ErrorType;
  context?: Record<string, any>;
  timestamp: Date;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.context = context;
    this.timestamp = new Date();
  }
}

// Error logger with console output
export class ErrorLogger {
  private static logToConsole(error: AppError | Error, location: string): void {
    const timestamp = new Date().toISOString();
    const errorInfo = {
      timestamp,
      location,
      message: error.message,
      type: error instanceof AppError ? error.type : ErrorType.UNKNOWN,
      context: error instanceof AppError ? error.context : undefined,
      stack: error.stack,
    };

    console.error(`[${location}]`, errorInfo);
  }

  static log(error: Error | AppError, location: string): void {
    this.logToConsole(error, location);
    
    // Future: Send to analytics/monitoring service
    // this.sendToMonitoring(error, location);
  }

  static logWithContext(
    message: string,
    type: ErrorType,
    location: string,
    context?: Record<string, any>
  ): void {
    const error = new AppError(message, type, context);
    this.log(error, location);
  }
}

// Error handler with retry logic
export class ErrorHandler {
  /**
   * Execute a function with error handling
   */
  static async handle<T>(
    fn: () => Promise<T>,
    location: string,
    errorType: ErrorType = ErrorType.UNKNOWN
  ): Promise<{ data: T | null; error: AppError | null }> {
    try {
      const data = await fn();
      return { data, error: null };
    } catch (error) {
      const appError = error instanceof AppError 
        ? error 
        : new AppError(
            error instanceof Error ? error.message : String(error),
            errorType
          );
      
      ErrorLogger.log(appError, location);
      return { data: null, error: appError };
    }
  }

  /**
   * Execute with retry logic for network failures
   */
  static async handleWithRetry<T>(
    fn: () => Promise<T>,
    location: string,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ): Promise<{ data: T | null; error: AppError | null }> {
    let lastError: AppError | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const data = await fn();
        return { data, error: null };
      } catch (error) {
        lastError = error instanceof AppError
          ? error
          : new AppError(
              error instanceof Error ? error.message : String(error),
              ErrorType.NETWORK,
              { attempt, maxRetries }
            );

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          console.log(`[${location}] Retry attempt ${attempt + 1}/${maxRetries}`);
        }
      }
    }

    if (lastError) {
      ErrorLogger.log(lastError, location);
    }
    
    return { data: null, error: lastError };
  }

  /**
   * Synchronous error handling
   */
  static handleSync<T>(
    fn: () => T,
    location: string,
    errorType: ErrorType = ErrorType.UNKNOWN
  ): { data: T | null; error: AppError | null } {
    try {
      const data = fn();
      return { data, error: null };
    } catch (error) {
      const appError = error instanceof AppError
        ? error
        : new AppError(
            error instanceof Error ? error.message : String(error),
            errorType
          );
      
      ErrorLogger.log(appError, location);
      return { data: null, error: appError };
    }
  }
}

// User-friendly error messages
export const ErrorMessages = {
  [ErrorType.NETWORK]: {
    title: 'Connection Error',
    message: 'Unable to load content. Please check your internet connection and try again.',
    icon: '🌐',
  },
  [ErrorType.PARSE]: {
    title: 'Data Error',
    message: 'The content data is malformed. Please contact support if this persists.',
    icon: '📋',
  },
  [ErrorType.VALIDATION]: {
    title: 'Validation Error',
    message: 'The provided data is invalid. Please check and try again.',
    icon: '⚠️',
  },
  [ErrorType.RENDER]: {
    title: 'Display Error',
    message: 'Unable to display this content. Try refreshing the page.',
    icon: '🎨',
  },
  [ErrorType.NOT_FOUND]: {
    title: 'Not Found',
    message: 'The requested content could not be found.',
    icon: '🔍',
  },
  [ErrorType.UNKNOWN]: {
    title: 'Unexpected Error',
    message: 'Something went wrong. Please try again or contact support.',
    icon: '❌',
  },
};

// Helper to get user-friendly error message
export function getUserFriendlyError(error: AppError | Error): {
  title: string;
  message: string;
  icon: string;
  details?: string;
} {
  const type = error instanceof AppError ? error.type : ErrorType.UNKNOWN;
  const template = ErrorMessages[type];
  
  return {
    ...template,
    details: error.message,
  };
}

// React error boundary helper
export function createErrorBoundaryHandler(componentName: string) {
  return (error: Error, errorInfo: { componentStack: string }) => {
    ErrorLogger.logWithContext(
      error.message,
      ErrorType.RENDER,
      componentName,
      { componentStack: errorInfo.componentStack }
    );
  };
}

// Fetch wrapper with error handling
export async function safeFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; error: AppError | null }> {
  return ErrorHandler.handleWithRetry(
    async () => {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new AppError(
          `HTTP ${response.status}: ${response.statusText}`,
          ErrorType.NETWORK,
          { url, status: response.status }
        );
      }

      try {
        const data = await response.json();
        return data as T;
      } catch (parseError) {
        throw new AppError(
          'Failed to parse JSON response',
          ErrorType.PARSE,
          { url, originalError: parseError }
        );
      }
    },
    `safeFetch: ${url}`,
    2 // Retry 2 times
  );
}

// JSON file loader with validation
export async function loadJsonFile<T>(
  path: string,
  validator?: (data: any) => boolean
): Promise<{ data: T | null; error: AppError | null }> {
  const { data, error } = await safeFetch<T>(path);
  
  if (error || !data) {
    return { data: null, error };
  }

  // Optional validation
  if (validator && !validator(data)) {
    const validationError = new AppError(
      'JSON data validation failed',
      ErrorType.VALIDATION,
      { path }
    );
    ErrorLogger.log(validationError, 'loadJsonFile');
    return { data: null, error: validationError };
  }

  return { data, error: null };
}

// Export everything for easy imports
export default {
  ErrorType,
  AppError,
  ErrorLogger,
  ErrorHandler,
  ErrorMessages,
  getUserFriendlyError,
  createErrorBoundaryHandler,
  safeFetch,
  loadJsonFile,
};
