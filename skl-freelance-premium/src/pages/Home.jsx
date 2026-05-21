import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Search, Users, Shield, Zap, Star, Briefcase, 
  Code, Palette, Brain, Globe, Server, BarChart3, Smartphone, PenTool, TrendingUp, Grid3X3,
  ChevronRight, CheckCircle2
} from 'lucide-react';
import { jobs, freelancers, testimonials, stats, categories } from '../data/mockData';
import JobCard from '../components/JobCard';
import FreelancerCard from '../components/FreelancerCard';

const iconMap = {
  Code: Code, Palette: Palette, Brain: Brain, Globe: Globe, Server: Server,
  BarChart3: BarChart3, Smartphone: Smartphone, PenTool: PenTool, TrendingUp: TrendingUp, Grid3X3: Grid3X3,
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const featuredJobs = jobs.filter(j => j.featured).slice(0, 3);
  const topFreelancers = freelancers.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-charcoal-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
              <Zap size={14} />
              Trusted by 12,400+ freelancers worldwide
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
              Hire elite tech talent.{' '}
              <span className="text-emerald-400">Delivered.</span>
            </h1>

            <p className="text-xl text-charcoal-300 leading-relaxed mb-10 max-w-2xl">
              Connect with the world's top developers, designers, and data scientists. 
              Post a job, review proposals, and hire in under 48 hours.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What skill are you looking for?"
                  className="w-full pl-11 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <Link 
                to={`/jobs?search=${encodeURIComponent(searchQuery)}`}
                className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all active:scale-[0.98] text-center"
              >
                Search
              </Link>
            </div>

            {/* Trusted By */}
            <div className="mt-12 flex items-center gap-6 text-charcoal-500 text-sm">
              <span>Trusted by teams at</span>
              <div className="flex items-center gap-5">
                {['Google', 'Stripe', 'Airbnb', 'Spotify'].map(company => (
                  <span key={company} className="font-bold text-charcoal-400">{company}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: IconName }) => {
              const Icon = iconMap[IconName] || Users;
              return (
                <div key={label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                    <Icon size={24} />
                  </div>
                  <div className="text-3xl font-extrabold text-charcoal-900">{value}</div>
                  <div className="text-sm text-charcoal-500 font-medium mt-1">{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-charcoal-50" data-section="categories">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible.categories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">Find specialized talent across every major technology discipline</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(1).map(cat => {
              const Icon = iconMap[cat.icon] || Code;
              return (
                <Link
                  key={cat.id}
                  to={`/jobs?category=${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className="group bg-white rounded-xl border border-charcoal-200 p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-charcoal-100 rounded-xl flex items-center justify-center text-charcoal-600 mx-auto mb-3 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <Icon size={22} />
                  </div>
                  <span className="text-sm font-semibold text-charcoal-800">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 bg-white" data-section="jobs">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible.jobs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal-900 mb-3">Featured Projects</h2>
              <p className="text-lg text-charcoal-500">High-priority opportunities from verified clients</p>
            </div>
            <Link to="/jobs" className="hidden sm:flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors">
              View all jobs <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/jobs" className="inline-flex items-center gap-2 text-emerald-700 font-semibold">
              View all jobs <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="py-20 bg-charcoal-950" data-section="freelancers">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible.freelancers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">Top-Rated Freelancers</h2>
              <p className="text-lg text-charcoal-400">Vetted experts with proven track records</p>
            </div>
            <Link to="/freelancers" className="hidden sm:flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
              Browse all <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFreelancers.map(f => <FreelancerCard key={f.id} freelancer={f} />)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white" data-section="how">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible.how ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal-900 mb-4">How TalentForge Works</h2>
            <p className="text-lg text-charcoal-500">From posting to payment in four simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Post a Job', desc: 'Describe your project, set your budget, and define the skills you need.' },
              { step: '02', title: 'Review Proposals', desc: 'Receive detailed proposals from qualified freelancers within hours.' },
              { step: '03', title: 'Collaborate', desc: 'Work together using our built-in messaging, file sharing, and milestone tracking.' },
              { step: '04', title: 'Pay Securely', desc: 'Release payment only when work is completed to your satisfaction.' },
            ].map(item => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-extrabold text-charcoal-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-charcoal-900 mb-2">{item.title}</h3>
                <p className="text-charcoal-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-emerald-50" data-section="testimonials">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal-900 mb-4">Loved by Teams Worldwide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-xl p-8 shadow-sm border border-charcoal-100">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-amber-400" fill="currentColor" />)}
                </div>
                <p className="text-charcoal-700 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal-900 text-sm">{t.name}</div>
                    <div className="text-xs text-charcoal-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to build something great?
          </h2>
          <p className="text-xl text-charcoal-400 mb-10 max-w-2xl mx-auto">
            Join thousands of companies and freelancers who trust TalentForge for their most important projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all active:scale-[0.98]">
              Get Started Free
            </Link>
            <Link to="/jobs" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              Browse Jobs
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-charcoal-500">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> No credit card required</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Free to post jobs</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> 10% platform fee</span>
          </div>
        </div>
      </section>
    </div>
  );
}
