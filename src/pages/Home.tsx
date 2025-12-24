import { 
  FileCode, 
  Zap, 
  BookOpen, 
  Code2, 
  Target,
  Rocket,
  Brain,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Globe,
  Award,
  Users,
  TestTube2,
  Smartphone,
  Monitor,
  Container,
  GitBranch,
  Workflow,
  Bot,
  ArrowRight,
  Star,
  Clock
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export default function Home() {
  const topics = [
    { id: 'typescript', name: 'TypeScript', icon: FileCode, color: 'blue', status: 'complete' },
    { id: 'test-cases', name: 'Test Cases', icon: CheckCircle2, color: 'green', status: 'soon' },
    { id: 'api-testing', name: 'API Testing', icon: Code2, color: 'purple', status: 'soon' },
    { id: 'playwright', name: 'Playwright', icon: Monitor, color: 'cyan', status: 'soon' },
    { id: 'appium', name: 'Appium', icon: Smartphone, color: 'orange', status: 'soon' },
    { id: 'cicd', name: 'CI/CD', icon: GitBranch, color: 'pink', status: 'soon' },
    { id: 'docker', name: 'Docker', icon: Container, color: 'sky', status: 'soon' },
    { id: 'n8n', name: 'N8N', icon: Workflow, color: 'rose', status: 'soon' },
    { id: 'llm-ai', name: 'LLM & AI', icon: Brain, color: 'violet', status: 'soon' }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Quick Reference',
      description: 'Fast access to syntax, types, and patterns. Perfect for quick lookups during development.',
      color: 'yellow'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Lessons',
      description: 'Detailed tutorials covering all essential QA engineering concepts with real-world examples.',
      color: 'green'
    },
    {
      icon: TestTube2,
      title: 'Practical Examples',
      description: 'Real-world code examples with step-by-step explanations for immediate application.',
      color: 'purple'
    },
    {
      icon: Target,
      title: 'Interview Ready',
      description: 'Structured content designed specifically for QA interview preparation and revision.',
      color: 'red'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Track your learning journey with completion status and progress indicators.',
      color: 'cyan'
    },
    {
      icon: Award,
      title: 'Best Practices',
      description: 'Learn industry-standard patterns and professional approaches to QA engineering.',
      color: 'amber'
    }
  ];

  const stats = [
    { icon: FileCode, label: '9 Topics', value: 'Comprehensive', color: 'blue' },
    { icon: BookOpen, label: '16+ Lessons', value: 'Per Topic', color: 'green' },
    { icon: Target, label: 'Interview', value: 'Focused', color: 'purple' },
    { icon: Clock, label: 'Quick', value: 'Revision', color: 'cyan' }
  ];

  return (
    <div data-testid="home-page" className="space-y-12">
      {/* Hero Section */}
      <GlassCard 
        variant="primary" 
        padding="xl" 
        className="text-center relative overflow-hidden group hover:shadow-blue-500/30 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Animated Icon */}
        <div className="relative mx-auto mb-8 w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur-3xl opacity-60 animate-pulse"></div>
          <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center">
            <Rocket className="h-12 w-12 text-white animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-black mb-4 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            QA Notes
          </span>
        </h1>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
          <p className="text-2xl md:text-3xl text-slate-200 font-bold">
            Your Revision Companion
          </p>
          <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
        </div>

        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Comprehensive QA interview preparation covering <span className="text-cyan-400 font-semibold">9 essential topics</span>. 
          Everything you need to ace your QA engineering interview in one place.
        </p>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-${stat.color}-500/50 transition-all duration-300 group/stat`}
              >
                <Icon className={`h-6 w-6 text-${stat.color}-400 mx-auto mb-2 group-hover/stat:scale-110 transition-transform`} />
                <div className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Topics Grid */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-8 w-8 text-blue-400" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            9 Comprehensive Topics
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon;
            const isComplete = topic.status === 'complete';
            
            return (
              <GlassCard
                key={topic.id}
                variant="secondary"
                padding="md"
                className={`hover:shadow-${topic.color}-500/20 hover:border-${topic.color}-500/50 transition-all duration-500 hover:scale-105 group/topic cursor-pointer relative`}
              >
                {isComplete && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg z-10">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div className="relative w-fit mb-3 mx-auto">
                  <Icon className={`h-10 w-10 text-${topic.color}-400 relative z-10 group-hover/topic:scale-110 transition-transform`} />
                  <div className={`absolute inset-0 blur-2xl bg-${topic.color}-400/30 group-hover/topic:bg-${topic.color}-400/50 transition-all duration-500`}></div>
                </div>
                
                <h3 className="text-sm font-bold text-white text-center mb-1">{topic.name}</h3>
                
                {!isComplete && (
                  <div className="text-xs text-slate-400 text-center bg-slate-700/50 rounded-full px-2 py-1">
                    Coming Soon
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Star className="h-8 w-8 text-yellow-400" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
            Why QA Notes?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <GlassCard
                key={index}
                variant="secondary"
                padding="md"
                className={`hover:shadow-${feature.color}-500/20 hover:border-${feature.color}-500/50 transition-all duration-500 hover:scale-105 group/feature`}
              >
                <div className="relative w-fit mb-4">
                  <Icon className={`h-12 w-12 text-${feature.color}-400 relative z-10 group-hover/feature:scale-110 transition-transform`} />
                  <div className={`absolute inset-0 blur-2xl bg-${feature.color}-400/30 group-hover/feature:bg-${feature.color}-400/50 transition-all duration-500`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Getting Started Section */}
      <GlassCard 
        variant="primary" 
        padding="lg" 
        className="hover:shadow-cyan-500/20 transition-all duration-500"
      >
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="h-8 w-8 text-cyan-400" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Getting Started
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 group/step hover:translate-x-2 transition-transform">
              <div className="bg-blue-500/20 rounded-xl p-3 group-hover/step:bg-blue-500/30 transition-colors">
                <FileCode className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">1. Choose Your Topic</h4>
                <p className="text-slate-300">
                  Navigate through 9 comprehensive topics covering all essential QA engineering skills.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group/step hover:translate-x-2 transition-transform">
              <div className="bg-green-500/20 rounded-xl p-3 group-hover/step:bg-green-500/30 transition-colors">
                <BookOpen className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">2. Learn with Lessons</h4>
                <p className="text-slate-300">
                  Study detailed tutorials with real-world examples and comprehensive explanations.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 group/step hover:translate-x-2 transition-transform">
              <div className="bg-purple-500/20 rounded-xl p-3 group-hover/step:bg-purple-500/30 transition-colors">
                <Code2 className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">3. Practice with Examples</h4>
                <p className="text-slate-300">
                  Apply your knowledge with practical code examples and hands-on exercises.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group/step hover:translate-x-2 transition-transform">
              <div className="bg-cyan-500/20 rounded-xl p-3 group-hover/step:bg-cyan-500/30 transition-colors">
                <Target className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">4. Track Your Progress</h4>
                <p className="text-slate-300">
                  Mark lessons complete and monitor your preparation journey to interview readiness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-purple-500/30 rounded-2xl border-2 border-blue-400/40 shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 cursor-pointer group/cta">
            <span className="text-lg font-bold text-blue-300">Start Learning Now</span>
            <ArrowRight className="h-5 w-5 text-blue-300 group-hover/cta:translate-x-1 transition-transform" />
          </div>
        </div>
      </GlassCard>

      {/* About Creator */}
      <GlassCard 
        variant="secondary" 
        padding="lg"
        className="hover:shadow-purple-500/20 transition-all duration-500"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl ring-4 ring-blue-500/30">
              <Users className="h-16 w-16 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-3 shadow-xl border-4 border-slate-900">
              <Award className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Syed Monowarul Islam</h3>
            <p className="text-cyan-400 font-semibold mb-3">Sr. Software Engineer in Test</p>
            <p className="text-slate-300 leading-relaxed mb-4">
              10+ years of experience in QA engineering across global companies. 
              This platform is my personal revision companion for interview preparation, 
              now shared with the QA community.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300 border border-blue-500/30">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-300 border border-green-500/30">
                Test Automation
              </span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30">
                CI/CD
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
