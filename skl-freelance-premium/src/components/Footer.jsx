import { Link } from 'react-router-dom';
import { Briefcase, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Briefcase size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">TalentForge</span>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed max-w-sm mb-6">
              The world's most trusted freelance marketplace for elite tech talent. 
              Connect with top developers, designers, and data scientists to build the future.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-charcoal-800 flex items-center justify-center text-charcoal-400 hover:bg-emerald-600 hover:text-white transition-all duration-200">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">For Clients</h4>
            <ul className="space-y-3">
              {['How to Hire', 'Talent Marketplace', 'Project Catalog', 'Enterprise', 'Payroll Services'].map(item => (
                <li key={item}><a href="#" className="text-sm text-charcoal-400 hover:text-emerald-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">For Talent</h4>
            <ul className="space-y-3">
              {['How to Find Work', 'Direct Contracts', 'Find Jobs Worldwide', 'Winning Proposals', 'Skill Certifications'].map(item => (
                <li key={item}><a href="#" className="text-sm text-charcoal-400 hover:text-emerald-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Careers', 'Blog', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <Link to={item === 'About Us' ? '/about' : item === 'Contact' ? '/contact' : '#'} 
                    className="text-sm text-charcoal-400 hover:text-emerald-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-charcoal-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-charcoal-500">
            © 2026 TalentForge Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Terms', 'Privacy', 'Cookies'].map(item => (
              <a key={item} href="#" className="text-sm text-charcoal-500 hover:text-charcoal-300 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
