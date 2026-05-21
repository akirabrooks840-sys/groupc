import { Link } from 'react-router-dom';
import { 
  Target, Users, Shield, Zap, Globe, Heart, 
  ArrowRight, CheckCircle2, Briefcase, Star, TrendingUp
} from 'lucide-react';

export default function About() {
  const values = [
    { icon: Target, title: 'Mission-Driven', desc: 'We exist to democratize access to world-class tech talent, enabling startups and enterprises to build faster and better.' },
    { icon: Shield, title: 'Trust First', desc: 'Every freelancer is vetted. Every payment is protected. Every review is verified. Your trust is our foundation.' },
    { icon: Zap, title: 'Speed Matters', desc: 'Our AI-powered matching reduces time-to-hire from weeks to hours. Post a job and start interviewing today.' },
    { icon: Heart, title: 'People Over Profits', desc: 'We take only 10% — the lowest in the industry. Freelancers keep more of what they earn.' },
  ];

  const team = [
    { name: 'David Chen', role: 'CEO & Co-Founder', bio: 'Former engineering lead at Stripe. Built payment systems processing $2B+ annually.' },
    { name: 'Sarah Williams', role: 'CTO & Co-Founder', bio: 'Ex-Google Staff Engineer. 15 years building distributed systems at scale.' },
    { name: 'Marcus Johnson', role: 'Head of Product', bio: 'Previously led product at Figma. Obsessed with developer experience.' },
    { name: 'Elena Rodriguez', role: 'Head of Talent', bio: 'Built engineering teams at Netflix and Airbnb. Knows what great looks like.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-charcoal-950 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
            <Zap size={14} />
            Founded in 2024
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6 max-w-4xl mx-auto">
            Building the future of <span className="text-emerald-400">work, together.</span>
          </h1>
          <p className="text-xl text-charcoal-400 max-w-2xl mx-auto leading-relaxed">
            TalentForge is the premium marketplace where world-class engineers, designers, and data scientists 
            connect with ambitious companies to build extraordinary products.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '$48M+', label: 'Paid to Freelancers' },
              { value: '12,400+', label: 'Active Freelancers' },
              { value: '89,000+', label: 'Projects Completed' },
              { value: '4.9/5', label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-extrabold text-charcoal-900 mb-2">{stat.value}</div>
                <div className="text-sm text-charcoal-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal-900 mb-4">Our Values</h2>
            <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">The principles that guide every decision we make</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-xl border border-charcoal-200 p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                  <v.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-charcoal-900 mb-2">{v.title}</h3>
                <p className="text-charcoal-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Compare */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-charcoal-900 mb-4">Why TalentForge?</h2>
          </div>
          <div className="bg-charcoal-950 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 gap-0">
              <div className="p-6 border-b border-charcoal-800">
                <span className="text-charcoal-400 text-sm font-semibold">Feature</span>
              </div>
              <div className="p-6 border-b border-charcoal-800 bg-emerald-900/20">
                <span className="text-emerald-400 text-sm font-bold">TalentForge</span>
              </div>
              <div className="p-6 border-b border-charcoal-800">
                <span className="text-charcoal-400 text-sm font-semibold">Others</span>
              </div>

              {[
                ['Platform Fee', '10%', '20%'],
                ['Avg. Time to Hire', '48 hours', '2-3 weeks'],
                ['Freelancer Vetting', 'Rigorous + Portfolio', 'Basic'],
                ['Payment Protection', 'Escrow + Milestones', 'Limited'],
                ['Support', '24/7 Dedicated', 'Business hours'],
              ].map(([feature, us, them]) => (
                <>
                  <div key={`${feature}-label`} className="p-6 border-b border-charcoal-800 text-sm text-charcoal-300">{feature}</div>
                  <div key={`${feature}-us`} className="p-6 border-b border-charcoal-800 bg-emerald-900/20">
                    <span className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                      <CheckCircle2 size={16} /> {us}
                    </span>
                  </div>
                  <div key={`${feature}-them`} className="p-6 border-b border-charcoal-800 text-sm text-charcoal-500">{them}</div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal-900 mb-4">Meet the Team</h2>
            <p className="text-lg text-charcoal-500">The people building the future of freelance work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="bg-white rounded-xl border border-charcoal-200 p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-charcoal-900 mb-1">{member.name}</h3>
                <p className="text-sm text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-charcoal-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-charcoal-400 mb-10">Join thousands of companies and freelancers already on TalentForge.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all active:scale-[0.98]">
              Create Free Account
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
