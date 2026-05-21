import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, DollarSign, Clock, FileText, 
  Briefcase, Layers, AlertCircle
} from 'lucide-react';

export default function PostJob({ user, addToast }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [job, setJob] = useState({
    title: '',
    category: 'web-dev',
    description: '',
    budgetType: 'fixed',
    budgetMin: '',
    budgetMax: '',
    experience: 'intermediate',
    duration: '1-3 months',
    skills: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (s) => {
    const newErrors = {};
    if (s === 1) {
      if (!job.title.trim() || job.title.length < 10) newErrors.title = 'Title must be at least 10 characters';
      if (!job.description.trim() || job.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
    }
    if (s === 2) {
      if (!job.budgetMin || Number(job.budgetMin) < 5) newErrors.budgetMin = 'Minimum budget is $5';
      if (!job.budgetMax || Number(job.budgetMax) <= Number(job.budgetMin)) newErrors.budgetMax = 'Max must be greater than min';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!validateStep(step)) return;

    const newJob = {
      ...job,
      id: Date.now(),
      posted: 'Just now',
      proposals: 0,
      skills: job.skills.split(',').map(s => s.trim()).filter(Boolean),
      client: {
        name: user?.name || 'You',
        rating: 5.0,
        reviews: 0,
        verified: true,
        location: 'Remote',
        spend: '$0',
        memberSince: '2026',
      },
      budget: {
        type: job.budgetType,
        min: Number(job.budgetMin),
        max: Number(job.budgetMax),
      },
      type: job.budgetType,
      featured: false,
    };

    const existing = JSON.parse(localStorage.getItem('talentforge_jobs') || '[]');
    localStorage.setItem('talentforge_jobs', JSON.stringify([newJob, ...existing]));
    setSubmitted(true);
    addToast('Job posted successfully!', 'success');
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-charcoal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-sm border border-charcoal-200 animate-slide-up">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal-900 mb-2">Job Posted!</h2>
          <p className="text-charcoal-500 mb-6">Your project is now live. Freelancers can start submitting proposals immediately.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary w-full">Go to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-charcoal-900 mb-2">Post a New Job</h1>
          <p className="text-charcoal-500">Describe your project to attract the best freelancers</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                s <= step ? 'bg-emerald-600 text-white' : 'bg-charcoal-200 text-charcoal-500'
              }`}>
                {s < step ? <CheckCircle2 size={16} /> : s}
              </div>
              <div className={`h-1 flex-1 rounded-full ${s < step ? 'bg-emerald-600' : 'bg-charcoal-200'}`} />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-charcoal-200 p-6 lg:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal-900 mb-2">Job Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={job.title}
                  onChange={(e) => setJob({ ...job, title: e.target.value })}
                  placeholder="e.g., Senior React Developer for SaaS Dashboard"
                  className={`input-field ${errors.title ? 'border-red-300 focus:ring-red-200' : ''}`}
                />
                {errors.title && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal-900 mb-2">Category</label>
                <select
                  value={job.category}
                  onChange={(e) => setJob({ ...job, category: e.target.value })}
                  className="input-field"
                >
                  <option value="web-dev">Web Development</option>
                  <option value="mobile">Mobile Apps</option>
                  <option value="design">UI/UX Design</option>
                  <option value="data">Data Science</option>
                  <option value="ai">AI / ML</option>
                  <option value="backend">Backend & DevOps</option>
                  <option value="writing">Content & Writing</option>
                  <option value="marketing">Digital Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal-900 mb-2">Description <span className="text-red-500">*</span></label>
                <p className="text-xs text-charcoal-500 mb-2">A great description includes: the goal, deliverables, timeline, and required skills.</p>
                <textarea
                  rows={8}
                  value={job.description}
                  onChange={(e) => setJob({ ...job, description: e.target.value })}
                  placeholder="Describe your project in detail..."
                  className={`input-field ${errors.description ? 'border-red-300 focus:ring-red-200' : ''}`}
                />
                {errors.description && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.description}</p>}
                <p className="text-xs text-charcoal-400 mt-1 text-right">{job.description.length} characters</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal-900 mb-3">Payment Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setJob({ ...job, budgetType: 'fixed' })}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      job.budgetType === 'fixed' ? 'border-emerald-600 bg-emerald-50' : 'border-charcoal-200 hover:border-charcoal-300'
                    }`}
                  >
                    <FileText size={22} className={`mb-2 ${job.budgetType === 'fixed' ? 'text-emerald-600' : 'text-charcoal-400'}`} />
                    <div className="font-bold text-charcoal-900">Fixed Price</div>
                    <div className="text-xs text-charcoal-500 mt-1">Best for well-defined projects with clear deliverables</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setJob({ ...job, budgetType: 'hourly' })}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      job.budgetType === 'hourly' ? 'border-emerald-600 bg-emerald-50' : 'border-charcoal-200 hover:border-charcoal-300'
                    }`}
                  >
                    <Clock size={22} className={`mb-2 ${job.budgetType === 'hourly' ? 'text-emerald-600' : 'text-charcoal-400'}`} />
                    <div className="font-bold text-charcoal-900">Hourly Rate</div>
                    <div className="text-xs text-charcoal-500 mt-1">Best for ongoing work or projects with evolving scope</div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-2">
                    {job.budgetType === 'hourly' ? 'Min Hourly Rate' : 'Min Budget'}
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
                    <input
                      type="number"
                      value={job.budgetMin}
                      onChange={(e) => setJob({ ...job, budgetMin: e.target.value })}
                      className={`input-field pl-10 ${errors.budgetMin ? 'border-red-300' : ''}`}
                    />
                  </div>
                  {errors.budgetMin && <p className="text-xs text-red-500 mt-1">{errors.budgetMin}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-2">
                    {job.budgetType === 'hourly' ? 'Max Hourly Rate' : 'Max Budget'}
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
                    <input
                      type="number"
                      value={job.budgetMax}
                      onChange={(e) => setJob({ ...job, budgetMax: e.target.value })}
                      className={`input-field pl-10 ${errors.budgetMax ? 'border-red-300' : ''}`}
                    />
                  </div>
                  {errors.budgetMax && <p className="text-xs text-red-500 mt-1">{errors.budgetMax}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-2">Experience Level</label>
                  <select
                    value={job.experience}
                    onChange={(e) => setJob({ ...job, experience: e.target.value })}
                    className="input-field"
                  >
                    <option value="entry">Entry Level</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-2">Expected Duration</label>
                  <select
                    value={job.duration}
                    onChange={(e) => setJob({ ...job, duration: e.target.value })}
                    className="input-field"
                  >
                    <option>Less than 1 month</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>6+ months</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal-900 mb-2">Required Skills</label>
                <p className="text-xs text-charcoal-500 mb-2">Separate skills with commas</p>
                <input
                  type="text"
                  value={job.skills}
                  onChange={(e) => setJob({ ...job, skills: e.target.value })}
                  placeholder="React, Node.js, PostgreSQL, AWS..."
                  className="input-field"
                />
              </div>

              <div className="bg-charcoal-50 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-charcoal-900">Review Your Job Post</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Title</span>
                    <span className="font-medium text-charcoal-900 text-right max-w-xs">{job.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Budget</span>
                    <span className="font-medium text-charcoal-900">
                      {job.budgetType === 'hourly' ? `$${job.budgetMin}-$${job.budgetMax}/hr` : `$${Number(job.budgetMin).toLocaleString()}-$${Number(job.budgetMax).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Duration</span>
                    <span className="font-medium text-charcoal-900">{job.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Experience</span>
                    <span className="font-medium text-charcoal-900 capitalize">{job.experience}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-charcoal-600">
                  <span className="font-semibold text-charcoal-900">Free to post.</span> You only pay a 10% platform fee when you hire and pay through TalentForge.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn-ghost">Back</button>
          ) : (
            <button onClick={() => navigate(-1)} className="btn-ghost">Cancel</button>
          )}
          {step < 3 ? (
            <button onClick={handleNext} className="btn-primary">
              Continue <ArrowRight size={18} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">
              <Briefcase size={18} /> Post Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
