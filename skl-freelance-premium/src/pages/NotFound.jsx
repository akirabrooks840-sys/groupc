import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="text-[120px] font-extrabold text-charcoal-200 leading-none select-none">404</div>
        </div>
        <h1 className="text-3xl font-extrabold text-charcoal-900 mb-4">Page Not Found</h1>
        <p className="text-charcoal-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Check the URL or navigate back to safety.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary justify-center">
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/dashboard" className="btn-secondary justify-center">
            <ArrowLeft size={18} /> Go to Dashboard
          </Link>
        </div>
        <div className="mt-8 pt-8 border-t border-charcoal-200">
          <p className="text-sm text-charcoal-400 mb-3">Looking for something?</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Jobs', 'Freelancers', 'Post a Job', 'About', 'Contact'].map(item => (
              <Link
                key={item}
                to={item === 'Jobs' ? '/jobs' : item === 'Freelancers' ? '/freelancers' : item === 'Post a Job' ? '/post-job' : item === 'About' ? '/about' : '/contact'}
                className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-sm text-charcoal-600 hover:border-emerald-300 hover:text-emerald-700 transition-all"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
