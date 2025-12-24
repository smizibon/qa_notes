import { AlertCircle, RefreshCw } from 'lucide-react';
import { AppError, getUserFriendlyError } from '../utils/errorHandler';

interface ErrorDisplayProps {
  error: AppError | Error | string;
  onRetry?: () => void;
  showDetails?: boolean;
  compact?: boolean;
}

export default function ErrorDisplay({ 
  error, 
  onRetry, 
  showDetails = false,
  compact = false 
}: ErrorDisplayProps) {
  const errorObj = typeof error === 'string' 
    ? new Error(error) 
    : error;
  
  const { title, message, icon, details } = getUserFriendlyError(errorObj);

  if (compact) {
    return (
      <div data-testid="error-display-compact" className="bg-red-500/10 border-l-4 border-red-400 rounded-r-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{icon}</span>
          <div className="flex-1">
            <p data-testid="error-title" className="text-red-400 font-semibold text-sm">{title}</p>
            <p data-testid="error-message" className="text-slate-300 text-sm mt-1">{message}</p>
          </div>
          {onRetry && (
            <button
              data-testid="error-retry-button"
              onClick={onRetry}
              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="error-display-full" className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 max-w-2xl mx-auto">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-red-500/20 rounded-xl">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{icon}</span>
            <h3 data-testid="error-title" className="text-xl font-bold text-red-400">{title}</h3>
          </div>
          
          <p data-testid="error-message" className="text-slate-300 mb-4">{message}</p>
          
          {showDetails && details && (
            <div data-testid="error-details" className="bg-slate-900/50 rounded-xl p-4 mb-4 border border-slate-700/50">
              <p className="text-slate-400 text-sm font-mono">{details}</p>
            </div>
          )}
          
          {onRetry && (
            <button
              data-testid="error-retry-button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
