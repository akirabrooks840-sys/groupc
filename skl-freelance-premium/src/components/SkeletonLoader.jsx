export function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-charcoal-200 p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="skeleton h-5 w-20 rounded-full" />
        <div className="skeleton h-4 w-24 rounded" />
      </div>
      <div className="skeleton h-6 w-3/4 rounded" />
      <div className="space-y-2">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-charcoal-100">
        <div className="skeleton h-5 w-28 rounded" />
        <div className="skeleton h-5 w-20 rounded" />
      </div>
    </div>
  );
}

export function FreelancerCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-charcoal-200 p-6 space-y-4">
      <div className="flex gap-4 items-center">
        <div className="skeleton h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-5 w-32 rounded" />
          <div className="skeleton h-4 w-24 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-charcoal-100">
        <div className="skeleton h-5 w-16 rounded" />
        <div className="skeleton h-5 w-24 rounded" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-xl border border-charcoal-200 p-5 space-y-3">
            <div className="skeleton h-8 w-8 rounded" />
            <div className="skeleton h-7 w-20 rounded" />
            <div className="skeleton h-4 w-28 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-charcoal-200 p-6 space-y-4">
        <div className="skeleton h-6 w-40 rounded" />
        {[1,2,3].map(i => (
          <div key={i} className="flex gap-4 items-center py-3 border-b border-charcoal-100 last:border-0">
            <div className="skeleton h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-5 w-48 rounded" />
              <div className="skeleton h-4 w-32 rounded" />
            </div>
            <div className="skeleton h-8 w-24 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
