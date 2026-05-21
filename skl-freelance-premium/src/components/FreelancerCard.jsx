import { Link } from 'react-router-dom';
import { Star, Briefcase, MapPin, BadgeCheck } from 'lucide-react';

export default function FreelancerCard({ freelancer, compact = false }) {
  return (
    <div className={`group bg-white rounded-xl border border-charcoal-200 transition-all duration-300 hover:shadow-lg hover:border-emerald-200 ${compact ? 'p-5' : 'p-6'}`}>
      <div className="flex gap-4 items-start mb-4">
        <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
          {freelancer.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-bold text-charcoal-900 truncate">{freelancer.name}</h3>
            {freelancer.topRated && <BadgeCheck size={16} className="text-emerald-500 shrink-0" />}
          </div>
          <p className="text-sm text-charcoal-500">{freelancer.title}</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-charcoal-400">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {freelancer.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={12} />
              {freelancer.jobsCompleted} jobs
            </span>
          </div>
        </div>
      </div>

      {!compact && (
        <p className="text-sm text-charcoal-500 leading-relaxed mb-4 line-clamp-2">
          {freelancer.bio}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {freelancer.skills.slice(0, compact ? 4 : 6).map(skill => (
          <span key={skill} className="px-2.5 py-1 bg-charcoal-100 text-charcoal-600 text-xs font-medium rounded-md">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-charcoal-100">
        <span className="text-lg font-bold text-emerald-700">${freelancer.rate}/hr</span>
        <div className="flex items-center gap-1.5">
          <Star size={15} className="text-amber-400" fill="currentColor" />
          <span className="text-sm font-bold text-charcoal-900">{freelancer.rating}</span>
          <span className="text-xs text-charcoal-400">({freelancer.reviews})</span>
        </div>
      </div>
    </div>
  );
}
