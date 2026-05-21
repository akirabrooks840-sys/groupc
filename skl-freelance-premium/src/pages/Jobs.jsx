import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { jobs } from '../data/mockData';
import JobCard from '../components/JobCard';
import FilterSidebar from '../components/FilterSidebar';
import { JobCardSkeleton } from '../components/SkeletonLoader';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    budgetMin: 0,
    budgetMax: 200,
    experience: [],
    duration: [],
    type: [],
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesExp = filters.experience.length === 0 || filters.experience.includes(job.experience);
    const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
    const matchesDuration = filters.duration.length === 0 || filters.duration.includes(job.duration);

    let matchesBudget = true;
    if (job.budget.type === 'hourly') {
      matchesBudget = job.budget.min <= filters.budgetMax && job.budget.max >= filters.budgetMin;
    }

    return matchesSearch && matchesExp && matchesType && matchesDuration && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-charcoal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-charcoal-900 mb-2">Find Work</h1>
          <p className="text-charcoal-500">Browse {jobs.length}+ open projects from verified clients</p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, job title, or keyword..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-charcoal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
          <FilterSidebar filters={filters} onFilterChange={setFilters} jobCount={filteredJobs.length} />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-charcoal-500">
                Showing <span className="font-semibold text-charcoal-900">{filteredJobs.length}</span> results
              </span>
              <select className="px-3 py-2 bg-white border border-charcoal-200 rounded-lg text-sm text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Budget: High to Low</option>
                <option>Budget: Low to High</option>
              </select>
            </div>

            {loading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {[1,2,3,4].map(i => <JobCardSkeleton key={i} />)}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl border border-charcoal-200 p-12 text-center">
                <SlidersHorizontal size={48} className="text-charcoal-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-charcoal-900 mb-2">No jobs found</h3>
                <p className="text-charcoal-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredJobs.map(job => <JobCard key={job.id} job={job} compact={viewMode === 'list'} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
