import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Award, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Users, 
  Globe,
  Linkedin,
  Github,
  Mail,
  TrendingUp,
  Building2,
  Rocket,
  Target,
  Heart,
  Zap,
  Shield,
  TestTube2,
  Smartphone,
  Monitor
} from 'lucide-react';
import { loadJsonFile, AppError } from '../utils/errorHandler';
import ErrorDisplay from '../components/ErrorDisplay';
import { GlassCard } from '../components/GlassCard';

interface Experience {
  company: string;
  position: string;
  location?: string;
  type: 'current' | 'past';
}

interface ProfileData {
  name: string;
  title: string;
  currentRole: string;
  tagline: string;
  bio: string;
  experience: Experience[];
  specializations: string[];
  yearsOfExperience: string;
  experienceDescription: string;
}

export default function AboutMe() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error } = await loadJsonFile<ProfileData>('/src/data/profile/about.json');
      
      if (error) {
        setError(error);
      } else {
        setProfile(data);
      }
      setIsLoading(false);
    };

    loadProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const currentExperience = profile.experience.filter(exp => exp.type === 'current');
  const pastExperience = profile.experience.filter(exp => exp.type === 'past');

  return (
    <div data-testid="about-me-page" className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <GlassCard variant="primary" padding="xl">
          <div data-testid="about-hero-section" className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left Side - Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl ring-4 ring-blue-500/30 hover:ring-blue-400/50 transition-all duration-300 group overflow-hidden p-1">
                  <img 
                    src="/images/profile/smizibon.jpg" 
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const span = document.createElement('span');
                        span.className = 'text-8xl font-bold text-white group-hover:scale-110 transition-transform';
                        span.textContent = profile.name.split(' ').map(n => n[0]).join('');
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 blur-3xl opacity-40 animate-pulse -z-10"></div>
                {/* Active Status Badge */}
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-4 shadow-xl border-4 border-slate-900 animate-bounce">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                {/* Verified Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3 shadow-xl border-4 border-slate-900">
                  <Award className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Right Side - Information */}
            <div className="flex-1 space-y-5">
              {/* Name and Title with Enhanced Typography */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    {profile.name}
                  </span>
                </h1>
                <div className="flex flex-col gap-2">
                  <p className="text-xl md:text-2xl text-slate-200 font-bold">{profile.title}</p>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Briefcase className="h-5 w-5 text-blue-400" />
                    <p className="text-base md:text-lg">{profile.currentRole}</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Tagline */}
              <div className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-purple-500/30 rounded-2xl border-2 border-blue-400/40 shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 w-fit">
                <div className="flex items-center gap-3 text-blue-300">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span className="text-sm font-bold">{profile.tagline}</span>
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
              </div>

              {/* Bio with Enhanced Styling */}
              {profile.bio && (
                <div>
                  <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light">
                    {profile.bio}
                  </p>
                </div>
              )}

              {/* Social Media Links */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.linkedin.com/in/smizibon/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="about-hero-linkedin-link"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group"
                >
                  <Linkedin className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white">LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/smizibon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="about-hero-github-link"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-500/20 group"
                >
                  <Github className="h-5 w-5 text-slate-400 group-hover:text-white" />
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white">GitHub</span>
                </a>
                <a 
                  href="mailto:zibon@outlook.com"
                  data-testid="about-hero-email-link"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group"
                >
                  <Mail className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300" />
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white">zibon@outlook.com</span>
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-5">
                <div className="text-left group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/20 mb-2 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-7 w-7 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{profile.yearsOfExperience}</div>
                  <div className="text-xs text-slate-400 mt-1">Years Experience</div>
                </div>
                <div className="text-left group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/20 mb-2 group-hover:scale-110 transition-transform">
                    <Target className="h-7 w-7 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">{profile.specializations.length}</div>
                  <div className="text-xs text-slate-400 mt-1">Specializations</div>
                </div>
                <div className="text-left group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/20 mb-2 group-hover:scale-110 transition-transform">
                    <Building2 className="h-7 w-7 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-purple-400">{profile.experience.length}</div>
                  <div className="text-xs text-slate-400 mt-1">Companies</div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Current Roles */}
        <GlassCard variant="secondary" padding="lg">
          <div data-testid="about-current-roles" className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Briefcase className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Current Roles</h2>
              <p className="text-slate-400 text-sm">Where I'm making an impact today</p>
            </div>
          </div>

          <div className="space-y-4">
            {currentExperience.map((exp, index) => (
              <div 
                key={index}
                className="p-5 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-green-500/50 transition-all duration-300 hover:bg-slate-700/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{exp.position}</h3>
                    <p className="text-blue-400 font-medium mb-2">{exp.company}</p>
                    {exp.location && (
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30 flex items-center gap-1">
                    <Rocket className="h-3 w-3" />
                    Current
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Past Experience */}
        <GlassCard variant="secondary" padding="lg">
          <div data-testid="about-past-experience" className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Calendar className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Professional Journey</h2>
              <p className="text-slate-400 text-sm">Building expertise across the globe</p>
            </div>
          </div>

          <div className="space-y-4">
            {pastExperience.map((exp, index) => (
              <div 
                key={index}
                className="p-5 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-700/50"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{exp.position}</h3>
                    <p className="text-blue-400 font-medium mb-2">{exp.company}</p>
                    {exp.location && (
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Globe className="h-4 w-4" />
                        {exp.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Specializations */}
        <GlassCard variant="secondary" padding="lg">
          <div data-testid="about-specializations" className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Award className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Areas of Expertise</h2>
              <p className="text-slate-400 text-sm">Specialized skills and focus areas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.specializations.map((specialization, index) => {
              // Map specializations to specific icons
              const iconMap: Record<string, any> = {
                'Owner of STLC': Shield,
                'Mobile automation': Smartphone,
                'Web automation': Monitor,
                'Community contribution': Heart,
                'Community Building': Users
              };
              const colorMap: Record<string, string> = {
                'Owner of STLC': 'blue',
                'Mobile automation': 'green',
                'Web automation': 'cyan',
                'Community contribution': 'pink',
                'Community Building': 'purple'
              };
              
              const Icon = iconMap[specialization] || TestTube2;
              const color = colorMap[specialization] || 'blue';

              return (
                <div 
                  key={index}
                  className={`p-4 bg-slate-700/30 rounded-xl border border-${color}-500/20 hover:border-${color}-500/50 transition-all duration-300 hover:bg-slate-700/50 group`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${color}-500/20 rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 text-${color}-400`} />
                    </div>
                    <span className="text-slate-200 font-medium">{specialization}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Professional Highlights - New Section */}
        <GlassCard variant="secondary" padding="lg">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/20 rounded-xl">
                <Rocket className="h-6 w-6 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Professional Highlights</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-blue-500/20 rounded-2xl">
                    <Globe className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Global Experience</h3>
                  <p className="text-slate-300 text-center">Worked across Singapore, Sweden, and Bangladesh</p>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-green-500/20 rounded-2xl">
                    <TestTube2 className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Test Automation Expert</h3>
                  <p className="text-slate-300 text-center">Specialized in mobile and web automation</p>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-purple-500/20 rounded-2xl">
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Community Leader</h3>
                  <p className="text-slate-300 text-center">Active contributor and community builder</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Call to Action */}
        <GlassCard variant="primary" padding="lg">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Let's Connect</h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Interested in collaboration, consulting, or just want to chat about QA, automation, and testing? 
              Feel free to reach out!
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                data-testid="about-linkedin-link"
                href="https://www.linkedin.com/in/smizibon/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                <Linkedin className="h-5 w-5" />
                Connect on LinkedIn
              </a>
              <a
                data-testid="about-github-link"
                href="https://github.com/smizibon"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                View GitHub
              </a>
              <a
                data-testid="about-email-link"
                href="mailto:contact@example.com"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Send Email
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
