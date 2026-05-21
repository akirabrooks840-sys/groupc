import { Link } from 'react-router-dom';
import { Clock, DollarSign, MessageSquare, Star, MapPin, BadgeCheck } from 'lucide-react';

export default function JobCard({ job, compact = false }) {
  const formatBudget = () => {
    if (job.budget.type === 'hourly') {
      return `$${job.budget.min}-$${job.budget.max}/hr`;
    }
    return `$${job.budget.min.toLocaleString()}-$${job.budget.max.toLocaleString()}`;
  };

  return (
    <div className={`group bg-white rounded-xl border border-charcoal-200 transition-all duration-300 hover:shadow-lg hover:border-emerald-200 ${compact ? 'p-5' : 'p-6'}`}>
      <div className="flex justify-between items-start mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
          {job.category.replace('-', ' ').replace(/\w/g, l => l.toUpperCase())}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-charcoal-400">
          <Clock size={13} />
          {job.posted}
        </span>
      </div>

      <Link to={`/job/${job.id}`} className="block mb-3">
        <h3 className="text-lg font-bold text-charcoal-900 leading-snug group-hover:text-emerald-700 transition-colors">
          {job.title}
        </h3>
      </Link>

      {!compact && (
        <p className="text-sm text-charcoal-500 leading-relaxed mb-4 line-clamp-2">
          {job.description.substring(0, 140)}...
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, compact ? 3 : 4).map(skill => (
          <span key={skill} className="px-2.5 py-1 bg-charcoal-100 text-charcoal-600 text-xs font-medium rounded-md">
            {skill}
          </span>
        ))}
        {job.skills.length > (compact ? 3 : 4) && (
          <span className="px-2.5 py-1 bg-charcoal-100 text-charcoal-500 text-xs font-medium rounded-md">
            +{job.skills.length - (compact ? 3 : 4)}
          </span>
        )}
      </div>

      <div className={`flex ${compact ? 'flex-col gap-2' : 'justify-between items-center'} pt-4 border-t border-charcoal-100`}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm font-bold text-charcoal-900">
            <DollarSign size={15} className="text-emerald-600" />
            {formatBudget()}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-charcoal-500">
            <MessageSquare size={14} />
            {job.proposals} proposals
          </span>
        </div>

        <div className="flex items-center gap-2">
          {job.client.verified && <BadgeCheck size={16} className="text-emerald-500" />}
          <span className="text-xs text-charcoal-500">{job.client.name}</span>
          <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-500">
            <Star size={12} fill="currentColor" />
            {job.client.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
