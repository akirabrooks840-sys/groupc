import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Briefcase, CheckCircle2 } from 'lucide-react';

export default function Register({ login, addToast }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'freelancer' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (step === 1) {
      if (!form.name.trim()) newErrors.name = 'Full name is required';
      if (!form.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';
      if (!form.password) newErrors.password = 'Password is required';
      else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: form.role,
        avatar: form.name.split(' ').map(n => n[0]).join('').slice(0,2),
      };
      login(mockUser);
      addToast(`Welcome to TalentForge, ${form.name}!`, 'success');
      navigate('/dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-charcoal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-charcoal-900">TalentForge</span>
          </Link>
          <h1 className="text-2xl font-bold text-charcoal-900 mb-2">Create your account</h1>
          <p className="text-charcoal-500">Join the world's premier tech talent marketplace</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-charcoal-200 p-8">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-emerald-600' : 'bg-charcoal-200'}`} />
            <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-emerald-600' : 'bg-charcoal-200'}`} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-2">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className={`input-field pl-11 ${errors.name ? 'border-red-300' : ''}`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={`input-field pl-11 ${errors.email ? 'border-red-300' : ''}`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-2">Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Min. 8 characters"
                      className={`input-field pl-11 pr-11 ${errors.password ? 'border-red-300' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full btn-primary justify-center"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-3">I want to join as...</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, role: 'freelancer' })}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        form.role === 'freelancer' 
                          ? 'border-emerald-600 bg-emerald-50' 
                          : 'border-charcoal-200 hover:border-charcoal-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                        form.role === 'freelancer' ? 'bg-emerald-600 text-white' : 'bg-charcoal-100 text-charcoal-600'
                      }`}>
                        <Briefcase size={20} />
                      </div>
                      <div className="font-bold text-charcoal-900 mb-1">Freelancer</div>
                      <div className="text-xs text-charcoal-500">I'm looking for work and want to build my portfolio</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, role: 'client' })}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        form.role === 'client' 
                          ? 'border-emerald-600 bg-emerald-50' 
                          : 'border-charcoal-200 hover:border-charcoal-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                        form.role === 'client' ? 'bg-emerald-600 text-white' : 'bg-charcoal-100 text-charcoal-600'
                      }`}>
                        <User size={20} />
                      </div>
                      <div className="font-bold text-charcoal-900 mb-1">Client</div>
                      <div className="text-xs text-charcoal-500">I want to hire talented professionals for my projects</div>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-charcoal-50 rounded-xl">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-charcoal-600">
                    <span className="font-semibold text-charcoal-900">Free to join.</span> No credit card required. 
                    Platform fee is only 10% when you earn or pay through TalentForge.
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 btn-ghost justify-center"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] btn-primary justify-center disabled:opacity-60"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Create Account <ArrowRight size={18} /></>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-charcoal-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
