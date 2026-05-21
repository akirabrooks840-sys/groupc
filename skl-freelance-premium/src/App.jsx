import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Freelancers from './pages/Freelancers';
import FreelancerProfile from './pages/FreelancerProfile';
import PostJob from './pages/PostJob';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { useAuth } from './hooks/useAuth';
import { useToast } from './hooks/useToast';

export default function App() {
  const { user, isAuthenticated, login, logout, updateUser } = useAuth();
  const { toasts, addToast, removeToast } = useToast();
  const [currentRole, setCurrentRole] = useState(user?.role || 'freelancer');
  const location = useLocation();

  const toggleRole = (role) => {
    setCurrentRole(role);
    if (user) {
      updateUser({ role });
    }
  };

  const hideNavFooter = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-charcoal-50">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {!hideNavFooter && (
        <Navbar 
          user={user} 
          isAuthenticated={isAuthenticated} 
          logout={logout}
          toggleRole={toggleRole}
          currentRole={currentRole}
        />
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login login={login} addToast={addToast} />} />
          <Route path="/register" element={<Register login={login} addToast={addToast} />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetail user={user} isAuthenticated={isAuthenticated} addToast={addToast} />} />
          <Route path="/freelancers" element={<Freelancers />} />
          <Route path="/freelancer/:id" element={<FreelancerProfile />} />
          <Route path="/post-job" element={<PostJob user={user} addToast={addToast} />} />
          <Route path="/dashboard" element={<Dashboard user={user} currentRole={currentRole} toggleRole={toggleRole} />} />
          <Route path="/profile" element={<Profile user={user} updateUser={updateUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact addToast={addToast} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideNavFooter && <Footer />}
    </div>
  );
}
