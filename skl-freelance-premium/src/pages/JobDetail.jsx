import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, DollarSign, Star, MapPin, BadgeCheck, 
  Briefcase, Calendar, Globe, Send, Bookmark, Share2, CheckCircle2
} from 'lucide-react';
import { jobs } from '../data/mockData';
import ProposalModal from '../components/ProposalModal';

export default function JobDetail({ user, isAuthenticated, addToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProposal, setShowProposal] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = jobs.find(j => j.id === Number(id));
      setJob(found || null);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  const handleProposalSubmit = (proposal) => {
    const existing = JSON.parse(localStorage.getItem('talentforge_proposals') || '[]');
    localStorage.setItem('talentforge_proposals', JSON.stringify([...existing, proposal]));
    addToast('Proposal submitted successfully!', 'success');
    setShowProposal(false);
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      addToast('Please sign in to save jobs', 'info');
      navigate('/login');
      return;
    }
    setSaved(!saved);
    addToast(saved ? 'Job removed from saved' : 'Job saved for later', 'success');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-charcoal-200 rounded mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 w-3/4 bg-charcoal-200 rounded" />
                <div className="h-4 w-1/2 bg-charcoal-200 rounded" />
                <div className="h-32 w-full bg-charcoal-200 rounded-xl" />
              </div>
              <div className="h-64 bg-charcoal-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-charcoal-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Job not found</h2>
          <Link to="/jobs" className="text-emerald-600 font-semibold hover:text-emerald-700">Browse all jobs</Link>
        </div>
      </div>
    );
  }

  const formatBudget = () => {
    if (job.budget.type === 'hourly') {
      return `$${job.budget.min}-$${job.budget.max}/hr`;
    }
    return `$${job.budget.min.toLocaleString()}-$${job.budget.max.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-charcoal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-600 hover:text-charcoal-900 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-charcoal-200 p-6 lg:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mb-3">
                    {job.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal-900 leading-tight">{job.title}</h1>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleSave}
                    className={`p-2.5 rounded-lg border transition-all ${saved ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-charcoal-200 text-charcoal-500 hover:bg-charcoal-50'}`}
                  >
                    <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2.5 rounded-lg border border-charcoal-200 text-charcoal-500 hover:bg-charcoal-50 transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-charcoal-500">
                <span className="flex items-center gap-1.5"><Clock size={15} /> Posted {job.posted}</span>
                <span className="flex items-center gap-1.5"><Globe size={15} /> {job.client.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={15} /> {job.proposals} proposals</span>
              </div>

              <div className="prose prose-charcoal max-w-none">
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">Project Details</h3>
                <p className="text-charcoal-600 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-charcoal-100 text-charcoal-700 text-sm font-medium rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">Activity on this job</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                      <Send size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal-900">{job.proposals}</div>
                      <div className="text-xs text-charcoal-500">Proposals received</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal-900">Interviewing</div>
                      <div className="text-xs text-charcoal-500">3 freelancers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal-900">{job.duration}</div>
                      <div className="text-xs text-charcoal-500">Expected duration</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-charcoal-200 p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-sm text-charcoal-500 mb-1">Budget</div>
                <div className="text-2xl font-extrabold text-charcoal-900">{formatBudget()}</div>
                <div className="text-sm text-charcoal-500 mt-1 capitalize">{job.type} price • {job.experience} level</div>
              </div>

              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    addToast('Please sign in to submit a proposal', 'info');
                    navigate('/login');
                    return;
                  }
                  setShowProposal(true);
                }}
                className="w-full btn-primary mb-3"
              >
                <Send size={16} /> Submit a Proposal
              </button>
              <button 
                onClick={handleSave}
                className="w-full btn-ghost justify-center border border-charcoal-200"
              >
                <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save Job'}
              </button>

              <div className="mt-6 pt-6 border-t border-charcoal-100">
                <div className="text-sm font-semibold text-charcoal-900 mb-3">About the Client</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-charcoal-100 rounded-lg flex items-center justify-center text-charcoal-600 font-bold text-lg">
                    {job.client.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-charcoal-900">{job.client.name}</span>
                      {job.client.verified && <BadgeCheck size={16} className="text-emerald-500" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-charcoal-500">
                      <Star size={12} className="text-amber-400" fill="currentColor" />
                      <span className="font-semibold text-charcoal-700">{job.client.rating}</span>
                      <span>({job.client.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Member since</span>
                    <span className="font-medium text-charcoal-900">{job.client.memberSince}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Total spend</span>
                    <span className="font-medium text-charcoal-900">{job.client.spend}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Hires</span>
                    <span className="font-medium text-charcoal-900">{Math.floor(job.client.reviews * 0.7)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showProposal && (
        <ProposalModal 
          job={job} 
          onClose={() => setShowProposal(false)} 
          onSubmit={handleProposalSubmit}
          user={user}
        />
      )}
    </div>
  );
}
