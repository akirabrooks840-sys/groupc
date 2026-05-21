import { useState } from 'react';
import { X, Send, DollarSign, Calendar, FileText, CheckCircle } from 'lucide-react';

export default function ProposalModal({ job, onClose, onSubmit, user }) {
  const [step, setStep] = useState(1);
  const [proposal, setProposal] = useState({
    coverLetter: '',
    bidAmount: job?.budget?.type === 'hourly' ? job.budget.min : Math.floor((job?.budget?.min + job?.budget?.max) / 2),
    duration: '2 weeks',
    milestones: [{ description: 'Initial delivery', amount: 0, dueDate: '' }],
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const platformFee = 0.10;
  const netEarnings = proposal.bidAmount * (1 - platformFee);

  const validateStep = (s) => {
    const newErrors = {};
    if (s === 1) {
      if (!proposal.coverLetter.trim() || proposal.coverLetter.length < 50) {
        newErrors.coverLetter = 'Cover letter must be at least 50 characters';
      }
    }
    if (s === 2) {
      if (!proposal.bidAmount || proposal.bidAmount < 10) {
        newErrors.bidAmount = 'Bid amount must be at least $10';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(step)) {
      const proposalData = {
        ...proposal,
        jobId: job.id,
        jobTitle: job.title,
        freelancerId: user?.id || 999,
        freelancerName: user?.name || 'Guest',
        submittedAt: new Date().toISOString(),
        status: 'pending',
        platformFee: proposal.bidAmount * platformFee,
        netEarnings,
      };
      onSubmit(proposalData);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-slide-up">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-charcoal-900 mb-2">Proposal Submitted!</h3>
          <p className="text-charcoal-500 mb-6">Your proposal for "{job.title}" has been sent. The client will review it shortly.</p>
          <button onClick={onClose} className="btn-primary w-full">Go to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-charcoal-200 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold text-charcoal-900">Submit a Proposal</h2>
            <p className="text-sm text-charcoal-500">{job.title}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-charcoal-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 bg-charcoal-50">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  s <= step ? 'bg-emerald-600 text-white' : 'bg-charcoal-200 text-charcoal-500'
                }`}>
                  {s < step ? <CheckCircle size={16} /> : s}
                </div>
                <div className={`h-1 flex-1 rounded-full ${s < step ? 'bg-emerald-600' : 'bg-charcoal-200'}`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-charcoal-500">
            <span>Cover Letter</span>
            <span>Pricing</span>
            <span>Review</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal-900 mb-2">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-charcoal-500 mb-2">
                  Introduce yourself, explain why you're a great fit, and highlight relevant experience.
                </p>
                <textarea
                  rows={8}
                  value={proposal.coverLetter}
                  onChange={(e) => setProposal({ ...proposal, coverLetter: e.target.value })}
                  placeholder="Dear Hiring Manager, I am excited to apply for this position because..."
                  className={`input-field ${errors.coverLetter ? 'border-red-300 focus:ring-red-200' : ''}`}
                />
                {errors.coverLetter && <p className="text-xs text-red-500 mt-1">{errors.coverLetter}</p>}
                <p className="text-xs text-charcoal-400 mt-1 text-right">{proposal.coverLetter.length} characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal-900 mb-2">Estimated Duration</label>
                <select
                  value={proposal.duration}
                  onChange={(e) => setProposal({ ...proposal, duration: e.target.value })}
                  className="input-field"
                >
                  <option>Less than 1 week</option>
                  <option>1-2 weeks</option>
                  <option>2 weeks</option>
                  <option>1 month</option>
                  <option>1-3 months</option>
                  <option>3-6 months</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal-900 mb-2">
                  <span className="flex items-center gap-2">
                    <DollarSign size={16} />
                    {job.budget.type === 'hourly' ? 'Hourly Rate' : 'Total Bid Amount'}
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400 font-semibold">$</span>
                  <input
                    type="number"
                    value={proposal.bidAmount}
                    onChange={(e) => setProposal({ ...proposal, bidAmount: Number(e.target.value) })}
                    className={`input-field pl-8 ${errors.bidAmount ? 'border-red-300' : ''}`}
                  />
                </div>
                {errors.bidAmount && <p className="text-xs text-red-500 mt-1">{errors.bidAmount}</p>}
                <p className="text-xs text-charcoal-500 mt-1">
                  Client budget: {job.budget.type === 'hourly' ? `$${job.budget.min}-$${job.budget.max}/hr` : `$${job.budget.min.toLocaleString()}-$${job.budget.max.toLocaleString()}`}
                </p>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-charcoal-50 rounded-xl p-5 space-y-3">
                <h4 className="font-semibold text-sm text-charcoal-900">Fee Breakdown</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-600">Your bid</span>
                  <span className="font-semibold">${proposal.bidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-600">Platform fee (10%)</span>
                  <span className="font-semibold text-red-500">-${(proposal.bidAmount * platformFee).toLocaleString()}</span>
                </div>
                <div className="border-t border-charcoal-200 pt-2 flex justify-between">
                  <span className="font-semibold text-charcoal-900">You'll receive</span>
                  <span className="font-bold text-emerald-700 text-lg">${netEarnings.toLocaleString()}</span>
                </div>
              </div>

              {job.budget.type === 'fixed' && (
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-2">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      Milestones
                    </span>
                  </label>
                  <div className="space-y-3">
                    {proposal.milestones.map((m, i) => (
                      <div key={i} className="flex gap-3">
                        <input
                          placeholder="Milestone description"
                          value={m.description}
                          onChange={(e) => {
                            const newM = [...proposal.milestones];
                            newM[i].description = e.target.value;
                            setProposal({ ...proposal, milestones: newM });
                          }}
                          className="input-field flex-1"
                        />
                        <div className="relative w-28">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400">$</span>
                          <input
                            type="number"
                            value={m.amount}
                            onChange={(e) => {
                              const newM = [...proposal.milestones];
                              newM[i].amount = Number(e.target.value);
                              setProposal({ ...proposal, milestones: newM });
                            }}
                            className="input-field pl-7"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <h4 className="font-semibold text-emerald-900 mb-3">Proposal Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Job</span>
                    <span className="font-medium text-charcoal-900 max-w-xs text-right">{job.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Your bid</span>
                    <span className="font-bold text-charcoal-900">${proposal.bidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Duration</span>
                    <span className="font-medium text-charcoal-900">{proposal.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Net earnings</span>
                    <span className="font-bold text-emerald-700">${netEarnings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-charcoal-50 rounded-xl p-4">
                <h4 className="font-semibold text-charcoal-900 mb-2 text-sm">Cover Letter Preview</h4>
                <p className="text-sm text-charcoal-600 leading-relaxed line-clamp-6">{proposal.coverLetter}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-charcoal-200 flex justify-between">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn-ghost">
              Back
            </button>
          ) : (
            <button onClick={onClose} className="btn-ghost">Cancel</button>
          )}
          {step < 3 ? (
            <button onClick={handleNext} className="btn-primary">
              Continue <Send size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">
              Submit Proposal <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
