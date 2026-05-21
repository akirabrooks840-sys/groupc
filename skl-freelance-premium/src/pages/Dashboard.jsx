import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, DollarSign, Star, MessageSquare, TrendingUp, 
  Clock, CheckCircle2, XCircle, Send, Eye, ArrowRight,
  BarChart3, Users, FileText, Award
} from 'lucide-react';
import { DashboardSkeleton } from '../components/SkeletonLoader';

export default function Dashboard({ user, currentRole, toggleRole }) {
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedProposals = JSON.parse(localStorage.getItem('talentforge_proposals') || '[]');
      const storedJobs = JSON.parse(localStorage.getItem('talentforge_jobs') || '[]');
      setProposals(storedProposals);
      setPostedJobs(storedJobs);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const stats = currentRole === 'freelancer' ? [
    { label: 'Active Proposals', value: proposals.filter(p => p.status === 'pending').length, icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Contracts', value: proposals.filter(p => p.status === 'accepted').length, icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Earnings', value: `$${proposals.filter(p => p.status === 'accepted').reduce((sum, p) => sum + (p.netEarnings || 0), 0).toLocaleString()}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Profile Views', value: '142', icon: Eye, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ] : [
    { label: 'Active Jobs', value: postedJobs.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Proposals', value: proposals.length, icon: Send, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Spend', value: `$${postedJobs.reduce((sum, j) => sum + (j.budget?.max || 0), 0).toLocaleString()}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Hires', value: '8', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-charcoal-900">Dashboard</h1>
            <p className="text-charcoal-500 mt-1">Welcome back, {user?.name?.split(' ')[0] || 'User'}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-charcoal-500">View as:</span>
            <div className="flex bg-white rounded-lg border border-charcoal-200 p-1">
              <button
                onClick={() => toggleRole('freelancer')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  currentRole === 'freelancer' ? 'bg-emerald-600 text-white shadow-sm' : 'text-charcoal-600 hover:bg-charcoal-50'
                }`}
              >
                Freelancer
              </button>
              <button
                onClick={() => toggleRole('client')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  currentRole === 'client' ? 'bg-emerald-600 text-white shadow-sm' : 'text-charcoal-600 hover:bg-charcoal-50'
                }`}
              >
                Client
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-charcoal-200 p-5">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center ${stat.color} mb-3`}>
                <stat.icon size={20} />
              </div>
              <div className="text-2xl font-extrabold text-charcoal-900">{stat.value}</div>
              <div className="text-sm text-charcoal-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            {currentRole === 'freelancer' ? (
              <>
                {/* Proposals */}
                <div className="bg-white rounded-xl border border-charcoal-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-charcoal-100 flex items-center justify-between">
                    <h3 className="font-bold text-charcoal-900">My Proposals</h3>
                    <Link to="/jobs" className="text-sm text-emerald-600 font-semibold hover:text-emerald-700">Find work</Link>
                  </div>
                  {proposals.length === 0 ? (
                    <div className="p-8 text-center">
                      <Send size={40} className="text-charcoal-300 mx-auto mb-3" />
                      <p className="text-charcoal-500 mb-4">You haven't submitted any proposals yet</p>
                      <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-charcoal-100">
                      {proposals.map((p, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-charcoal-50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <Link to={`/job/${p.jobId}`} className="font-semibold text-charcoal-900 hover:text-emerald-700 transition-colors truncate block">
                              {p.jobTitle}
                            </Link>
                            <div className="flex items-center gap-3 mt-1 text-xs text-charcoal-500">
                              <span className="flex items-center gap-1"><DollarSign size={12} /> ${p.bidAmount?.toLocaleString()}</span>
                              <span className="flex items-center gap-1"><Clock size={12} /> {p.duration}</span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ml-4 ${
                            p.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                            p.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            'bg-red-50 text-red-700 border border-red-100'
                          }`}>
                            {p.status === 'pending' ? 'Under Review' : p.status === 'accepted' ? 'Accepted' : 'Declined'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Earnings Chart Placeholder */}
                <div className="bg-white rounded-xl border border-charcoal-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-charcoal-900">Earnings Overview</h3>
                    <select className="text-sm border border-charcoal-200 rounded-lg px-3 py-1.5">
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>This year</option>
                    </select>
                  </div>
                  <div className="h-48 bg-charcoal-50 rounded-xl flex items-end justify-around p-4 gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 60, 85, 50, 75, 95].map((h, i) => (
                      <div key={i} className="flex-1 bg-emerald-500 rounded-t-sm transition-all hover:bg-emerald-600" style={{ height: `${h}%`, opacity: 0.7 + (i * 0.02) }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-charcoal-400">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Posted Jobs */}
                <div className="bg-white rounded-xl border border-charcoal-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-charcoal-100 flex items-center justify-between">
                    <h3 className="font-bold text-charcoal-900">My Job Postings</h3>
                    <Link to="/post-job" className="text-sm text-emerald-600 font-semibold hover:text-emerald-700">Post new job</Link>
                  </div>
                  {postedJobs.length === 0 ? (
                    <div className="p-8 text-center">
                      <FileText size={40} className="text-charcoal-300 mx-auto mb-3" />
                      <p className="text-charcoal-500 mb-4">No active job postings</p>
                      <Link to="/post-job" className="btn-primary">Post a Job</Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-charcoal-100">
                      {postedJobs.map((job, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-charcoal-50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-charcoal-900 truncate">{job.title}</div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-charcoal-500">
                              <span>{job.proposals || 0} proposals</span>
                              <span>•</span>
                              <span>{job.budget?.type === 'hourly' ? `$${job.budget.min}-$${job.budget.max}/hr` : `$${job.budget?.min?.toLocaleString()}-$${job.budget?.max?.toLocaleString()}`}</span>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0 ml-4">
                            Active
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Incoming Proposals */}
                <div className="bg-white rounded-xl border border-charcoal-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-charcoal-100">
                    <h3 className="font-bold text-charcoal-900">Incoming Proposals</h3>
                  </div>
                  {proposals.length === 0 ? (
                    <div className="p-8 text-center text-charcoal-500">No proposals received yet</div>
                  ) : (
                    <div className="divide-y divide-charcoal-100">
                      {proposals.slice(0, 5).map((p, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-charcoal-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-charcoal-100 rounded-full flex items-center justify-center text-charcoal-600 font-bold text-sm">
                              {p.freelancerName?.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold text-charcoal-900 text-sm">{p.freelancerName}</div>
                              <div className="text-xs text-charcoal-500">Bid: ${p.bidAmount?.toLocaleString()} • {p.duration}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors">
                              Accept
                            </button>
                            <button className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                              Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-charcoal-200 p-6">
              <h3 className="font-bold text-charcoal-900 mb-4">Profile Completeness</h3>
              <div className="w-full h-3 bg-charcoal-100 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }} />
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-charcoal-500">78% complete</span>
                <span className="text-emerald-600 font-semibold">+22% to Top Rated</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Add portfolio items', done: true },
                  { label: 'Verify identity', done: true },
                  { label: 'Add certifications', done: false },
                  { label: 'Link social profiles', done: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    {item.done ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <XCircle size={16} className="text-charcoal-300" />
                    )}
                    <span className={item.done ? 'text-charcoal-500 line-through' : 'text-charcoal-700'}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-600 rounded-xl p-6 text-white">
              <Award size={24} className="mb-3" />
              <h3 className="font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-sm text-emerald-100 mb-4">Get featured placement, reduced fees, and priority support.</p>
              <button className="w-full py-2.5 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors text-sm">
                Learn More
              </button>
            </div>

            <div className="bg-white rounded-xl border border-charcoal-200 p-6">
              <h3 className="font-bold text-charcoal-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {currentRole === 'freelancer' ? [
                  { label: 'Browse Jobs', to: '/jobs', icon: Briefcase },
                  { label: 'Edit Profile', to: '/profile', icon: Users },
                  { label: 'View Earnings', to: '#', icon: BarChart3 },
                ] : [
                  { label: 'Post a Job', to: '/post-job', icon: FileText },
                  { label: 'Browse Talent', to: '/freelancers', icon: Users },
                  { label: 'Payment Methods', to: '#', icon: DollarSign },
                ].map(action => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-charcoal-50 transition-colors text-sm font-medium text-charcoal-700"
                  >
                    <action.icon size={16} className="text-charcoal-400" />
                    {action.label}
                    <ArrowRight size={14} className="ml-auto text-charcoal-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
