import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle,
  MessageSquare, Clock, Globe
} from 'lucide-react';

export default function Contact({ addToast }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 20) newErrors.message = 'Message must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      addToast('Message sent successfully! We will reply within 24 hours.', 'success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Header */}
      <div className="bg-charcoal-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-charcoal-400 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Our team typically responds within 24 hours.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-charcoal-200 p-6">
              <h3 className="font-bold text-charcoal-900 mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@talentforge.io' },
                  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                  { icon: MapPin, label: 'Office', value: '350 Mission St, San Francisco, CA 94105' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-charcoal-900">{item.label}</div>
                      <div className="text-sm text-charcoal-500">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-charcoal-200 p-6">
              <h3 className="font-bold text-charcoal-900 mb-4">Support Hours</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: 'Monday - Friday', value: '9:00 AM - 8:00 PM EST' },
                  { icon: Globe, label: 'Weekend Support', value: 'Priority tickets only' },
                  { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7 for Pro users' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon size={16} className="text-charcoal-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-charcoal-800">{item.label}</div>
                      <div className="text-xs text-charcoal-500">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-charcoal-200 p-6 lg:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal-900 mb-2">Message Sent!</h3>
                  <p className="text-charcoal-500 mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-900 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`input-field ${errors.name ? 'border-red-300' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-900 mb-2">Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`input-field ${errors.email ? 'border-red-300' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal-900 mb-2">Subject <span className="text-red-500">*</span></label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={`input-field ${errors.subject ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select a topic</option>
                      <option>General Inquiry</option>
                      <option>Sales & Enterprise</option>
                      <option>Technical Support</option>
                      <option>Billing & Payments</option>
                      <option>Partnerships</option>
                      <option>Press & Media</option>
                    </select>
                    {errors.subject && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal-900 mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`input-field ${errors.message ? 'border-red-300' : ''}`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
                    <p className="text-xs text-charcoal-400 mt-1 text-right">{form.message.length} characters</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center disabled:opacity-60"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
