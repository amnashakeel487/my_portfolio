import { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/about', icon: 'person', label: 'About Me' },
  { to: '/projects', icon: 'work', label: 'Projects' },
  { to: '/services', icon: 'architecture', label: 'Services' },
  { to: '/skills', icon: 'bolt', label: 'Skills' },
  { to: '/contact', icon: 'mail', label: 'Contact' },
]

export default function Layout() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar - hidden on small screens */}
      <aside className="w-64 border-r border-primary/10 bg-background-light dark:bg-background-dark hidden md:flex flex-col sticky top-0 h-screen flex-shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">grid_view</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Portfolio</h2>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'text-primary sidebar-item-active' : 'text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary'
                }`
              }
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile header + menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 glass px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Portfolio</h2>
        <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg text-primary" aria-label="Toggle menu">
          <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 pt-16 bg-background-dark/95 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)}>
          <nav className="p-6 flex flex-col gap-2" onClick={e => e.stopPropagation()}>
            {navItems.map(({ to, icon, label }) => (
              <NavLink key={to} to={to} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-primary/10 hover:text-primary">
                <span className="material-symbols-outlined">{icon}</span>
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-h-screen flex flex-col">
        <div className={isDashboard ? '' : 'pt-16 md:pt-0'}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
