import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { experienceLevels } from '../data/mockData';

export default function FilterSidebar({ filters, onFilterChange, jobCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState({
    budget: true,
    experience: true,
    duration: true,
    type: true,
  });

  const durations = ['Less than 1 month', '1-3 months', '3-6 months', '6+ months'];
  const types = ['Hourly', 'Fixed Price'];

  const toggleSection = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const FilterSection = ({ title, keyName, children }) => (
    <div className="border-b border-charcoal-100 last:border-0">
      <button
        onClick={() => toggleSection(keyName)}
        className="w-full flex items-center justify-between py-4 text-sm font-semibold text-charcoal-900"
      >
        {title}
        <ChevronDown size={16} className={`text-charcoal-400 transition-transform ${expanded[keyName] ? 'rotate-180' : ''}`} />
      </button>
      {expanded[keyName] && (
        <div className="pb-4">{children}</div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-charcoal-900">Filters</h3>
        <button 
          onClick={() => onFilterChange({ budgetMin: 0, budgetMax: 200, experience: [], duration: [], type: [] })}
          className="text-xs text-emerald-600 font-semibold hover:text-emerald-700"
        >
          Clear all
        </button>
      </div>

      <FilterSection title="Hourly Rate" keyName="budget">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-charcoal-600">${filters.budgetMin}</span>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.budgetMin}
              onChange={(e) => onFilterChange({ ...filters, budgetMin: Number(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm font-medium text-charcoal-600">${filters.budgetMax}+</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.budgetMin}
              onChange={(e) => onFilterChange({ ...filters, budgetMin: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-charcoal-300 rounded-lg text-sm"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.budgetMax}
              onChange={(e) => onFilterChange({ ...filters, budgetMax: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-charcoal-300 rounded-lg text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Experience Level" keyName="experience">
        <div className="space-y-2">
          {experienceLevels.map(level => (
            <label key={level.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.experience.includes(level.id)}
                onChange={(e) => {
                  const newExp = e.target.checked
                    ? [...filters.experience, level.id]
                    : filters.experience.filter(x => x !== level.id);
                  onFilterChange({ ...filters, experience: newExp });
                }}
                className="mt-0.5 w-4 h-4 rounded border-charcoal-300 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="text-sm font-medium text-charcoal-800 group-hover:text-emerald-700 transition-colors">{level.name}</span>
                <p className="text-xs text-charcoal-400">{level.description}</p>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Project Duration" keyName="duration">
        <div className="space-y-2">
          {durations.map(d => (
            <label key={d} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.duration.includes(d)}
                onChange={(e) => {
                  const newDur = e.target.checked
                    ? [...filters.duration, d]
                    : filters.duration.filter(x => x !== d);
                  onFilterChange({ ...filters, duration: newDur });
                }}
                className="w-4 h-4 rounded border-charcoal-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-charcoal-700">{d}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Payment Type" keyName="type">
        <div className="space-y-2">
          {types.map(t => (
            <label key={t} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.type.includes(t.toLowerCase())}
                onChange={(e) => {
                  const val = t.toLowerCase();
                  const newType = e.target.checked
                    ? [...filters.type, val]
                    : filters.type.filter(x => x !== val);
                  onFilterChange({ ...filters, type: newType });
                }}
                className="w-4 h-4 rounded border-charcoal-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-charcoal-700">{t}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-charcoal-200 rounded-lg text-sm font-semibold text-charcoal-700 mb-4"
      >
        <SlidersHorizontal size={16} />
        Filters
        {jobCount > 0 && <span className="ml-1 text-emerald-600">({jobCount})</span>}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 bg-white rounded-xl border border-charcoal-200 p-5">
          {sidebarContent}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 p-5 overflow-y-auto lg:hidden animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-charcoal-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}
