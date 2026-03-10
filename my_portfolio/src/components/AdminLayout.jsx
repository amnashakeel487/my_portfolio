import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/admin', icon: 'dashboard', label: 'Dashboard' },
  { to: '/admin/profile', icon: 'person', label: 'Profile' },
  { to: '/admin/projects', icon: 'work', label: 'Projects' },
  { to: '/admin/skills', icon: 'bolt', label: 'Skills' },
  { to: '/admin/education', icon: 'school', label: 'Education' },
  { to: '/admin/expertise', icon: 'psychology', label: 'Expertise' },
  { to: '/admin/honors', icon: 'workspace_premium', label: 'Honors' },
  { to: '/admin/services', icon: 'architecture', label: 'Services' },
  { to: '/admin/messages', icon: 'mail', label: 'Messages' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const { user } = useAuth()

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-background-dark font-display text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-card-dark border-r border-white/5 flex flex-col justify-between py-6">
        <div className="flex flex-col gap-6 h-full">
          {/* Logo / Brand */}
          <div className="px-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent-pink flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">admin_panel_settings</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Admin</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-4 flex-1 overflow-y-auto custom-scrollbar">
            {navItems.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`material-symbols-outlined text-lg ${isActive ? 'text-white' : ''}`}>{icon}</span>
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 pt-4 border-t border-white/5 space-y-2">
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-all group"
            >
              <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">open_in_new</span>
              View Live Site
            </a>
            
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 mt-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-sm">person</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-slate-200 truncate" title={user?.email}>{user?.email}</p>
                  <p className="text-[10px] text-slate-500">Admin Account</p>
                </div>
              </div>
              <button 
                onClick={handleSignOut} 
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold transition-all"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background-dark custom-scrollbar">
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
