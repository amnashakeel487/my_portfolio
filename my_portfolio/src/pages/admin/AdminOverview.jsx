import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProfile, getProjects, getContactMessages, getSkills } from '../../lib/supabase'

export default function AdminOverview() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    getProfile().then(setProfile)
    getProjects().then(setProjects)
    getContactMessages().then(setMessages)
    getSkills().then(setSkills)
  }, [])

  const name = profile?.full_name || 'Admin'
  const tagline = profile?.tagline || 'Creative Product Designer'
  const totalProjects = projects.length
  const experienceYears = profile?.experience_years ? profile.experience_years.replace(/[^0-9]/g, '') : '0'

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      
      {/* Hero Welcome Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card-dark to-[#1f1631] border border-primary/10 p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-pink/5 blur-[80px] rounded-full -ml-10 -mb-10"></div>
        
        <div className="relative z-10 w-28 h-28 flex-shrink-0">
          <div className="w-full h-full rounded-2xl bg-slate-800 bg-cover bg-center border-2 border-primary/20 shadow-lg shadow-primary/10" 
               style={{ backgroundImage: profile?.avatar_url ? `url(${profile.avatar_url})` : undefined }} />
        </div>
        
        <div className="relative z-10 flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2 tracking-tight">Welcome back, {name.split(' ')[0]}</h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            {tagline}. Manage your portfolio content, view contact messages, and monitor your site's status from here.
          </p>
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
            <Link to="/admin/profile" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Profile
            </Link>
            <a href="/" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">open_in_new</span> View Site
            </a>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card-dark p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">folder_special</span>
            </div>
            <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">Live</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Total Projects</p>
          <h3 className="text-3xl font-black text-slate-100 mt-1">{totalProjects}</h3>
          <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${Math.min(totalProjects * 10, 100)}%` }}></div>
          </div>
        </div>
        
        <div className="bg-card-dark p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent-pink/10 rounded-xl text-accent-pink group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">military_tech</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-1 rounded">Milestone</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Experience</p>
          <h3 className="text-3xl font-black text-slate-100 mt-1">{experienceYears} Years</h3>
          <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-accent-pink" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-card-dark p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">mail</span>
            </div>
            {messages.length > 0 && <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">New</span>}
          </div>
          <p className="text-slate-400 text-sm font-medium">Messages</p>
          <h3 className="text-3xl font-black text-slate-100 mt-1">{messages.length}</h3>
          <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400" style={{ width: `${Math.min(messages.length * 20, 100)}%` }}></div>
          </div>
        </div>

        <div className="bg-card-dark p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">bolt</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Skills Listed</p>
          <h3 className="text-3xl font-black text-slate-100 mt-1">{skills.length}</h3>
          <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400" style={{ width: `${Math.min(skills.length * 10, 100)}%` }}></div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <section className="bg-card-dark p-6 rounded-2xl border border-white/5">
          <h2 className="text-lg font-bold text-slate-100 mb-6">Manage Content</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/projects" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all flex flex-col items-center text-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">work</span>
              </div>
              <span className="text-sm font-semibold text-slate-200">Projects</span>
            </Link>
            <Link to="/admin/skills" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all flex flex-col items-center text-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">bolt</span>
              </div>
              <span className="text-sm font-semibold text-slate-200">Skills</span>
            </Link>
            <Link to="/admin/education" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all flex flex-col items-center text-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">school</span>
              </div>
              <span className="text-sm font-semibold text-slate-200">Education</span>
            </Link>
            <Link to="/admin/services" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all flex flex-col items-center text-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">architecture</span>
              </div>
              <span className="text-sm font-semibold text-slate-200">Services</span>
            </Link>
          </div>
        </section>

        {/* Recent Messages */}
        <section className="lg:col-span-2 bg-card-dark rounded-2xl border border-white/5 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">inbox</span>
              Recent Inbox
            </h2>
            <Link to="/admin/messages" className="text-xs font-bold text-primary hover:text-white transition-colors bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary">View All</Link>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
            {messages.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                <span className="material-symbols-outlined text-4xl mb-3 opacity-30">mark_email_read</span>
                <p className="text-sm font-medium">Inbox is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.slice(0, 3).map((m) => (
                  <div key={m.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all gap-4">
                    <div className="truncate pr-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold uppercase">
                        {m.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-200 truncate">{m.name}</p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{m.subject || m.message.slice(0, 50)}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap bg-background-dark px-2.5 py-1 rounded-md self-start sm:self-auto">
                      {new Date(m.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
