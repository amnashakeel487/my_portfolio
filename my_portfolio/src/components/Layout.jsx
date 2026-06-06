import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import { getProfile } from '../lib/supabase'
import Footer from './Footer'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Me' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getProfile().then(setProfile)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      {/* Top Navbar */}
      <nav className="navbar sticky top-0 z-50 px-6 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="size-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">grid_view</span>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Portfolio</span>
          </Link>

          {/* Center nav links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-gradient hidden sm:inline-flex">
              Let's Talk
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-purple-text"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 flex flex-col gap-1 border-t border-purple-500/10 pt-4">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'text-white bg-purple-500/10' : 'text-purple-light hover:text-white'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gradient text-center mt-2"
            >
              Let's Talk
            </Link>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer profile={profile} />
    </div>
  )
}
