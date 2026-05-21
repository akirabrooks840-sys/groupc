import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Briefcase, Users, PlusCircle, User, Bell, Menu, X, 
  ChevronDown, LogOut, LayoutDashboard, Settings 
} from 'lucide-react';

export default function Navbar({ user, isAuthenticated, logout, toggleRole, currentRole }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/jobs', label: 'Find Work', icon: Search, show: !user || user.role === 'freelancer' },
    { to: '/freelancers', label: 'Hire Talent', icon: Users, show: !user || user.role === 'client' },
    { to: '/post-job', label: 'Post a Job', icon: PlusCircle, show: !user || user.role === 'client' },
  ];

  const notifications = [
    { id: 1, text: 'New proposal received on "SaaS Dashboard"', time: '5m ago', unread: true },
    { id: 2, text: 'Your proposal was viewed by CloudScale Systems', time: '2h ago', unread: true },
    { id: 3, text: 'Payment of $4,200 processed successfully', time: '1d ago', unread: false },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-charcoal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-charcoal-900 tracking-tight">TalentForge</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.filter(l => l.show).map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(link.to) 
                    ? 'text-emerald-700 bg-emerald-50' 
                    : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-50'
                }`}
              >
                <link.icon size={17} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user && (
              <>
                {/* Role Toggle */}
                <div className="hidden lg:flex items-center bg-charcoal-100 rounded-lg p-1 mr-2">
                  <button
                    onClick={() => toggleRole('freelancer')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      currentRole === 'freelancer' ? 'bg-white text-emerald-700 shadow-sm' : 'text-charcoal-500'
                    }`}
                  >
                    Freelancer
                  </button>
                  <button
                    onClick={() => toggleRole('client')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      currentRole === 'client' ? 'bg-white text-emerald-700 shadow-sm' : 'text-charcoal-500'
                    }`}
                  >
                    Client
                  </button>
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="relative p-2 rounded-lg text-charcoal-500 hover:bg-charcoal-100 hover:text-charcoal-900 transition-all"
                  >
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                  </button>
                  {notifOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-charcoal-200 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-charcoal-100 flex justify-between items-center">
                          <span className="font-semibold text-sm">Notifications</span>
                          <span className="text-xs text-emerald-600 font-medium cursor-pointer">Mark all read</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map(n => (
                            <div key={n.id} className={`px-4 py-3 border-b border-charcoal-50 hover:bg-charcoal-50 cursor-pointer transition-colors ${n.unread ? 'bg-emerald-50/30' : ''}`}>
                              <p className="text-sm text-charcoal-800 leading-snug">{n.text}</p>
                              <p className="text-xs text-charcoal-400 mt-1">{n.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-charcoal-100 transition-all"
                  >
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name?.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <ChevronDown size={16} className="text-charcoal-400" />
                  </button>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-charcoal-200 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-charcoal-100">
                          <p className="font-semibold text-sm text-charcoal-900">{user.name}</p>
                          <p className="text-xs text-charcoal-500 capitalize">{user.role} Account</p>
                        </div>
                        <div className="py-1">
                          <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-charcoal-50 transition-colors">
                            <LayoutDashboard size={16} /> Dashboard
                          </Link>
                          <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-charcoal-50 transition-colors">
                            <User size={16} /> Profile
                          </Link>
                          <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-charcoal-50 transition-colors">
                            <Settings size={16} /> Settings
                          </Link>
                        </div>
                        <div className="border-t border-charcoal-100 py-1">
                          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors">
                            <LogOut size={16} /> Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {!isAuthenticated && (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-charcoal-700 hover:text-charcoal-900 transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all active:scale-[0.98]">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-charcoal-600 hover:bg-charcoal-100 transition-all"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-charcoal-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.filter(l => !user || l.show).map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  isActive(link.to) ? 'text-emerald-700 bg-emerald-50' : 'text-charcoal-600'
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-2 border-t border-charcoal-100 mt-2 space-y-1">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-charcoal-700">
                  Log In
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-emerald-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
