import { useState, useEffect } from 'react'
import { submitContactMessage, getProfile } from '../lib/supabase'
import SectionHeader from '../components/SectionHeader'

export default function Contact() {
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    getProfile().then(setProfile)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const { ok, error } = await submitContactMessage(form)
    if (ok) {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } else {
      setStatus('error')
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
      <SectionHeader
        tag="Contact"
        title="Get in Touch"
        subtitle="Have a project in mind or want to collaborate? Send me a message and I'll get back to you."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left card */}
        <div className="card-surface p-8">
          <h3 className="text-xl font-bold text-white mb-2">Let's Connect</h3>
          <p className="text-muted text-sm mb-8 leading-relaxed">
            You can also reach me directly via email or social platforms. I typically respond within 24 hours.
          </p>

          <div className="space-y-4 mb-8">
            <a
              href={profile?.email ? `mailto:${profile.email}` : '#'}
              className="flex items-center gap-4 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 hover:bg-purple-500/5 group"
            >
              <div className="size-10 icon-gradient-box shrink-0">
                <span className="material-symbols-outlined text-white text-lg">mail</span>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider font-bold">Email</p>
                <p className="text-sm text-purple-light group-hover:text-white transition-colors">
                  {profile?.email || 'hello@portfolio.com'}
                </p>
              </div>
            </a>

            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 hover:bg-purple-500/5 group"
              >
                <div className="size-10 icon-gradient-box shrink-0">
                  <span className="material-symbols-outlined text-white text-lg">link</span>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-bold">LinkedIn</p>
                  <p className="text-sm text-purple-light group-hover:text-white transition-colors">Connect on LinkedIn</p>
                </div>
              </a>
            )}

            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 hover:bg-purple-500/5 group"
              >
                <div className="size-10 icon-gradient-box shrink-0">
                  <span className="material-symbols-outlined text-white text-lg">code</span>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-bold">GitHub</p>
                  <p className="text-sm text-purple-light group-hover:text-white transition-colors">View my repositories</p>
                </div>
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-purple-500/10">
            <span className="badge-available text-[10px] py-1.5 px-3">
              <span className="pulse-dot" />
              Available for work
            </span>
            <span className="tech-pill text-[10px]">Remote Friendly</span>
            <span className="tech-pill text-[10px]">Freelance</span>
          </div>
        </div>

        {/* Right card — form */}
        <div className="card-surface p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-purple-light mb-2">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-light mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="form-input"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-purple-light mb-2">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                className="form-input"
                placeholder="Project inquiry"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-purple-light mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="form-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {status === 'success' && (
              <p className="text-available text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined">error</span>
                Something went wrong. Check your connection or try again later.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-gradient w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-8 py-3"
            >
              {status === 'sending' ? (
                <>Sending...</>
              ) : (
                <>
                  <span className="material-symbols-outlined">send</span>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
