import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { freelancers } from '../data/mockData';
import FreelancerCard from '../components/FreelancerCard';
import { FreelancerCardSkeleton } from '../components/SkeletonLoader';

export default function Freelancers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [rateFilter, setRateFilter] = useState([0, 150]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filtered = freelancers.filter(f => {
    const matchesSearch = !searchQuery ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRate = f.rate >= rateFilter[0] && f.rate <= rateFilter[1];
    return matchesSearch && matchesRate;
  });

  return (
    <div className="min-h-screen bg-charcoal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-charcoal-900 mb-2">Hire Top Talent</h1>
          <p className="text-charcoal-500">Browse {freelancers.length}+ verified freelancers across all tech disciplines</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skill, or title..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-charcoal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl border transition-all ${viewMode === 'grid' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-charcoal-200 text-charcoal-500'}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl border transition-all ${viewMode === 'list' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-charcoal-200 text-charcoal-500'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-charcoal-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-charcoal-900">Filters</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-3">Hourly Rate</label>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-charcoal-600">${rateFilter[0]}</span>
                    <input
                      type="range"
                      min="0"
                      max="150"
                      value={rateFilter[1]}
                      onChange={(e) => setRateFilter([rateFilter[0], Number(e.target.value)])}
                      className="flex-1"
                    />
                    <span className="text-sm text-charcoal-600">${rateFilter[1]}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-3">Availability</label>
                  {['Full-time', 'Part-time', 'Hourly'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-charcoal-300 text-emerald-600" />
                      <span className="text-sm text-charcoal-700">{opt}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-900 mb-3">Rating</label>
                  {['4.9 & up', '4.7 & up', '4.5 & up'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-charcoal-300 text-emerald-600" />
                      <span className="text-sm text-charcoal-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-charcoal-500">
                Showing <span className="font-semibold text-charcoal-900">{filtered.length}</span> results
              </span>
            </div>

            {loading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {[1,2,3,4].map(i => <FreelancerCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-charcoal-200 p-12 text-center">
                <SlidersHorizontal size={48} className="text-charcoal-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-charcoal-900 mb-2">No freelancers found</h3>
                <p className="text-charcoal-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {filtered.map(f => <FreelancerCard key={f.id} freelancer={f} compact={viewMode === 'list'} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
