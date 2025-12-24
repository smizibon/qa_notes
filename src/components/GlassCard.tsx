import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  'data-testid'?: string;
}

/**
 * GlassCard Component
 * 
 * Reusable glassmorphism card component with consistent styling across the app.
 * Eliminates duplicate CSS classes and provides a single source of truth for glass effect cards.
 * 
 * @param children - Content to render inside the card
 * @param variant - Style variant: 'primary' (gradient) or 'secondary' (solid)
 * @param className - Additional CSS classes to apply
 * @param padding - Padding size: 'sm' | 'md' | 'lg' | 'xl'
 * @param data-testid - Test ID for automation
 * 
 * @example
 * <GlassCard variant="primary" padding="lg">
 *   <h1>Title</h1>
 *   <p>Content</p>
 * </GlassCard>
 */
export function GlassCard({ 
  children, 
  variant = 'primary',
  className = '',
  padding = 'md',
  'data-testid': testId
}: GlassCardProps) {
  const variants = {
    primary: 'bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-3xl',
    secondary: 'bg-slate-800/50 rounded-2xl',
  };
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-10',
    xl: 'p-12',
  };
  
  return (
    <div 
      className={`${variants[variant]} backdrop-blur-xl border border-slate-700/50 shadow-2xl ${paddings[padding]} ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export default GlassCard;
