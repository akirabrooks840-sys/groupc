import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Mail, MapPin, Globe, Briefcase, Star, Edit3, Camera,
  CheckCircle2, Award, TrendingUp, Calendar, DollarSign, FileText
} from 'lucide-react';

export default function Profile({ user, updateUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || 'Alex Morgan',
    title: user?.role === 'freelancer' ? 'Senior Full-Stack Developer' : 'Product Manager at TechCorp',
    bio: 'Passionate about building scalable web applications and mentoring junior developers. 6+ years of experience in React, Node.js, and cloud architecture.',
    location: 'San Francisco, CA',
    website: 'alexmorgan.dev',
    rate: 75,
    availability: 'Full-time',
  });

  const handleSave = () => {
    updateUser?.({ name: form.name });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-charcoal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover & Profile */}
        <div className="bg-white rounded-xl border border-charcoal-200 overflow-hidden mb-6">
          <div className="h-48 bg-charcoal-900 relative">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-20 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]" />
              <div className="absolute bottom-10 right-20 w-48 h-48 bg-indigo-500 rounded-full blur-[100px]" />
            </div>
          </div>
          <div className="px-6 lg:px-8 pb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-end -mt-12 mb-6 gap-4">
              <div className="relative">
                <div className="w-24 h-24 lg:w-28 lg:h-28 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold border-4 border-white shadow-lg">
                  {form.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full border border-charcoal-200 flex items-center justify-center text-charcoal-500 hover:bg-charcoal-50 shadow-sm">
                  <Camera size={14} />
                </button>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-extrabold text-charcoal-900">{form.name}</h1>
                <p className="text-charcoal-500">{form.title}</p>
              </div>
              <div className="flex gap-2">
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="btn-secondary">
                    <Edit3 size={16} /> Edit Profile
                  </button>
                ) : (
                  <button onClick={handleSave} className="btn-primary">
                    <CheckCircle2 size={16} /> Save Changes
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-charcoal-500">
              <span className="flex items-center gap-1.5"><MapPin size={15} /> {form.location}</span>
              <span className="flex items-center gap-1.5"><Globe size={15} /> {form.website}</span>
              <span className="flex items-center gap-1.5"><Calendar size={15} /> Member since 2022</span>
              <span className="flex items-center gap-1.5"><DollarSign size={15} /> ${form.rate}/hr</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-xl border border-charcoal-200 p-6">
              <h3 className="font-bold text-charcoal-900 mb-3">About</h3>
              {editing ? (
                <textarea
                  rows={4}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="input-field"
                />
              ) : (
                <p className="text-charcoal-600 leading-relaxed">{form.bio}</p>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-charcoal-200 p-6">
              <h3 className="font-bold text-charcoal-900 mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Redis', 'Tailwind CSS', 'Next.js'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-charcoal-100 text-charcoal-700 text-sm font-medium rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl border border-charcoal-200 p-6">
              <h3 className="font-bold text-charcoal-900 mb-4">Portfolio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'E-commerce Platform', tech: 'Next.js + Stripe + Prisma', color: 'bg-emerald-100 text-emerald-700' },
                  { title: 'Real-time Chat App', tech: 'React + Socket.io + Redis', color: 'bg-indigo-100 text-indigo-700' },
                  { title: 'Analytics Dashboard', tech: 'D3.js + Node.js + MongoDB', color: 'bg-amber-100 text-amber-700' },
                ].map(item => (
                  <div key={item.title} className="p-5 rounded-xl border border-charcoal-100 hover:border-emerald-200 transition-colors cursor-pointer">
                    <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Briefcase size={18} />
                    </div>
                    <h4 className="font-bold text-charcoal-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-charcoal-500">{item.tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-charcoal-200 p-6">
              <h3 className="font-bold text-charcoal-900 mb-4">Stats</h3>
              <div className="space-y-4">
                {[
                  { label: 'Job Success Score', value: '98%', icon: TrendingUp, color: 'text-emerald-600' },
                  { label: 'Total Earnings', value: '$142,500', icon: DollarSign, color: 'text-amber-600' },
                  { label: 'Jobs Completed', value: '47', icon: Briefcase, color: 'text-blue-600' },
                  { label: 'Hours Worked', value: '2,340', icon: Calendar, color: 'text-indigo-600' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-charcoal-50 rounded-lg flex items-center justify-center">
                      <stat.icon size={18} className={stat.color} />
                    </div>
                    <div>
                      <div className="font-bold text-charcoal-900">{stat.value}</div>
                      <div className="text-xs text-charcoal-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-600 rounded-xl p-6 text-white">
              <Award size={24} className="mb-3" />
              <h3 className="font-bold mb-2">Top Rated Plus</h3>
              <p className="text-sm text-emerald-100 mb-4">You're in the top 3% of freelancers on TalentForge. Keep up the excellent work!</p>
              <div className="flex items-center gap-1 text-sm text-emerald-200">
                <Star size={14} fill="currentColor" />
                <span>4.98 average rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
