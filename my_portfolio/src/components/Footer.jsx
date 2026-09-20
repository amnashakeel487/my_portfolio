import { useState, useEffect } from 'react'

export default function Footer({ profile }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const year = new Date().getFullYear()
  const name = profile?.full_name || 'Amna Shakeel'
  const email = profile?.email
  const location = profile?.location || 'Pakistan'
  
  const socials = [
    { 
      key: 'linkedin', 
      url: profile?.linkedin_url, 
      label: 'LinkedIn', 
      icon: 'fab fa-linkedin-in',
      color: 'hover:text-[#0077B5] hover:bg-[#0077B5]/10'
    },
    { 
      key: 'github', 
      url: profile?.github_url, 
      label: 'GitHub', 
      icon: 'fab fa-github',
      color: 'hover:text-white hover:bg-gray-800'
    },
    { 
      key: 'twitter', 
      url: profile?.twitter_url, 
      label: 'Twitter', 
      icon: 'fab fa-twitter',
      color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10'
    },
    { 
      key: 'youtube', 
      url: profile?.youtube_url, 
      label: 'YouTube', 
      icon: 'fab fa-youtube',
      color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10'
    },
  ].filter(s => s.url)

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">AS</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{name}</h3>
                  <p className="text-blue-400 text-sm">Software Engineer & Developer</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Building innovative web applications and bringing ideas to life through code. 
                Passionate about creating digital experiences that make a difference.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {email && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-400 text-sm">mail</span>
                    </div>
                    <a href={`mailto:${email}`} className="text-gray-400 hover:text-white transition-colors">
                      {email}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-400 text-sm">location_on</span>
                  </div>
                  <span className="text-gray-400">{location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-400 text-sm">schedule</span>
                  </div>
                  <span className="text-gray-400">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Local Time
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
                Quick Links
              </h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Social & CTA */}
            <div className="lg:col-span-4">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
                Let's Connect
              </h4>
              
              {/* Social Links */}
              {socials.length > 0 && (
                <div className="flex gap-3 mb-6">
                  {socials.map((social) => (
                    <a
                      key={social.key}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:border-current hover:transform hover:-translate-y-1`}
                      aria-label={social.label}
                    >
                      <i className={`${social.icon} text-sm`}></i>
                    </a>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-white font-medium mb-2">Ready to start a project?</p>
                <p className="text-gray-400 text-sm mb-4">Let's discuss your ideas and bring them to life.</p>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {year} {name}. All rights reserved.
              </p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs">Available for work</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <span>Made with ❤️ using React & Supabase</span>
              <button
                onClick={() => scrollToSection('#home')}
                className="flex items-center gap-1 hover:text-blue-400 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
                Back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
