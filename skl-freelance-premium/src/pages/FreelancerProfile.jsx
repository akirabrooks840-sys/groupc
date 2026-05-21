import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Briefcase, MapPin, Calendar, BadgeCheck, ArrowLeft,
  CheckCircle2, Globe, Mail, MessageSquare, DollarSign
} from 'lucide-react';
import { freelancers } from '../data/mockData';

export default function FreelancerProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const freelancer = freelancers.find(f => f.id === Number(id));

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-charcoal-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Freelancer not found</h2>
          <Link to="/freelancers" className="text-emerald-600 font-semibold">Browse all freelancers</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'history', label: 'Work History' },
    { id: 'skills', label: 'Skills & Certifications' },
  ];

  return (
    <div className="min-h-screen bg-charcoal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/freelancers" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-600 hover:text-charcoal-900 mb-6">
          <ArrowLeft size={16} /> Back to freelancers
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-xl border border-charcoal-200 p-6 lg:p-8 mb-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl lg:text-4xl font-extrabold shrink-0">
              {freelancer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal-900">{freelancer.name}</h1>
                {freelancer.topRated && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                    <BadgeCheck size={14} /> Top Rated Plus
                  </span>
                )}
              </div>
              <p className="text-lg text-charcoal-600 mb-3">{freelancer.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-500 mb-4">
                <span className="flex items-center gap-1.5"><MapPin size={15} /> {freelancer.location}</span>
                <span className="flex items-center gap-1.5"><Calendar size={15} /> Member since {freelancer.memberSince}</span>
                <span className="flex items-center gap-1.5"><Globe size={15} /> {freelancer.availability}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-charcoal-100 text-charcoal-700 text-sm font-medium rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:text-right shrink-0">
              <div className="text-3xl font-extrabold text-emerald-700">${freelancer.rate}/hr</div>
              <div className="flex items-center gap-1.5 text-sm">
                <Star size={16} className="text-amber-400" fill="currentColor" />
                <span className="font-bold text-charcoal-900">{freelancer.rating}</span>
                <span className="text-charcoal-500">({freelancer.reviews} reviews)</span>
              </div>
              <div className="text-sm text-charcoal-500">
                <Briefcase size={14} className="inline mr-1" />
                {freelancer.jobsCompleted} jobs completed
              </div>
              <button className="btn-primary mt-2">
                <MessageSquare size={16} /> Contact {freelancer.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-charcoal-200 overflow-hidden">
          <div className="flex border-b border-charcoal-200 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id 
                    ? 'text-emerald-700 border-emerald-600' 
                    : 'text-charcoal-500 border-transparent hover:text-charcoal-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 lg:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-charcoal-900 mb-3">About</h3>
                  <p className="text-charcoal-600 leading-relaxed">{freelancer.bio}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Job Success', value: '98%', icon: CheckCircle2 },
                    { label: 'On Time', value: '100%', icon: Calendar },
                    { label: 'Repeat Clients', value: '72%', icon: Briefcase },
                  ].map(stat => (
                    <div key={stat.label} className="bg-charcoal-50 rounded-xl p-5 text-center">
                      <stat.icon size={24} className="text-emerald-600 mx-auto mb-2" />
                      <div className="text-2xl font-extrabold text-charcoal-900">{stat.value}</div>
                      <div className="text-sm text-charcoal-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {freelancer.portfolio.map((item, i) => (
                  <div key={i} className="bg-charcoal-50 rounded-xl p-6 border border-charcoal-100 hover:border-emerald-200 transition-colors">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                      <Briefcase size={22} />
                    </div>
                    <h4 className="font-bold text-charcoal-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-charcoal-500">{item.tech}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {freelancer.workHistory.map((work, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-charcoal-50 rounded-xl border border-charcoal-100">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-charcoal-900">{work.client}</span>
                        <div className="flex items-center gap-0.5">
                          <Star size={14} className="text-amber-400" fill="currentColor" />
                          <span className="text-sm font-semibold text-charcoal-700">{work.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-charcoal-600 italic">"{work.review}"</p>
                      <span className="text-xs text-charcoal-400 mt-1">{work.date}</span>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:text-right">
                      <div className="font-bold text-emerald-700">${work.earnings.toLocaleString()}</div>
                      <div className="text-xs text-charcoal-500">Earned</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-charcoal-900 mb-4">Core Technologies</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {freelancer.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-2 p-3 bg-charcoal-50 rounded-lg border border-charcoal-100">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-sm font-medium text-charcoal-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal-900 mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {['AWS Certified Solutions Architect', 'Google Cloud Professional', 'Certified Scrum Master'].map(cert => (
                      <div key={cert} className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                        <BadgeCheck size={20} className="text-emerald-600" />
                        <span className="font-medium text-emerald-900">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
