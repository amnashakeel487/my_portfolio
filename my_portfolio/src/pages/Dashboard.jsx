import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfile, getProjects, getContactMessages } from '../lib/supabase'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getProfile().then(setProfile)
    getProjects().then(setProjects)
    getContactMessages().then(setMessages)
  }, [])

  const name = profile?.full_name || 'Alex'
  const totalProjects = projects.length

  return (
    <>
      <header className="sticky top-0 z-10 glass px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
          <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
        </div>
      </header>

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        {/* Hero welcome */}
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-background-dark to-background-dark border border-primary/20 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-20 -mt-20" />
          <div className="relative z-10 flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Welcome back, {name.split(' ')[0]}</h1>
            <p className="text-slate-400 max-w-2xl leading-relaxed">
              Your portfolio is live. View analytics and manage content from here or edit data in Supabase Dashboard.
            </p>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
              <a
                href="https://app.supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              >
                Open Supabase
              </a>
              <Link to="/" className="bg-slate-100/5 hover:bg-slate-100/10 border border-slate-100/10 text-slate-100 px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">visibility</span>
                View site
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-xl hover:border-primary/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">folder_special</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">Total Projects</p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">{totalProjects}</h3>
          </div>
          <div className="glass-panel p-6 rounded-xl hover:border-primary/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-accent-pink/10 rounded-lg text-accent-pink">
                <span className="material-symbols-outlined">mail</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">Contact Messages</p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">{messages.length}</h3>
          </div>
          <div className="glass-panel p-6 rounded-xl hover:border-primary/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">Profile</p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">{profile ? 'Set' : 'Default'}</h3>
          </div>
          <div className="glass-panel p-6 rounded-xl hover:border-primary/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                <span className="material-symbols-outlined">link</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">Setup</p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1 text-sm">.env</h3>
          </div>
        </section>

        {/* Recent messages */}
        <section className="glass-panel rounded-xl overflow-hidden">
          <div className="p-6 border-b border-primary/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100">Recent Contact Messages</h2>
            <p className="text-slate-500 text-sm">View all in Supabase Dashboard → Table: contact_messages</p>
          </div>
          <div className="overflow-x-auto">
            {messages.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-primary/5">
                    <th className="px-6 py-4 font-bold">From</th>
                    <th className="px-6 py-4 font-bold">Subject</th>
                    <th className="px-6 py-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {messages.slice(0, 5).map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-100/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-100">{msg.name}</p>
                        <p className="text-xs text-slate-500">{msg.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{msg.subject || '—'}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{new Date(msg.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-slate-500">
                <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                <p>No messages yet. Contact form submissions will appear here (and in Supabase).</p>
              </div>
            )}
          </div>
        </section>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/projects" className="glass p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">work</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-100">Projects</h3>
              <p className="text-sm text-slate-500">{totalProjects} in gallery</p>
            </div>
          </Link>
          <Link to="/about" className="glass p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-100">About & Profile</h3>
              <p className="text-sm text-slate-500">Edit in Supabase → profiles</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
