import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../lib/supabase'
import Footer from './Footer'

const navItems = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About me' },
  { to: 'experience', label: 'Experience' },
  { to: 'projects', label: 'Projects' },
  { to: 'services', label: 'Services' },
  { to: 'skills', label: 'Skills' },
  { to: 'contact', label: 'Contact' },
]

export default function SinglePageLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    getProfile().then(setProfile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    navItems.forEach(({ to }) => {
      const element = document.getElementById(to)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="font-bold text-white text-lg">Amna Shakeel</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map(({ to, label }) => (
                <button
                  key={to}
                  onClick={() => scrollToSection(to)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === to
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                Let's talk
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
              <div className="flex flex-col gap-2">
                {navItems.map(({ to, label }) => (
                  <button
                    key={to}
                    onClick={() => scrollToSection(to)}
                    className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeSection === to
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contact')}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium text-center"
                >
                  Let's talk
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      <Footer profile={profile} />
    </div>
  )
}