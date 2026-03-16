import { useState, useEffect } from 'react'
import { submitContactMessage, getProfile } from '../lib/supabase'
import VisitorCounter from '../components/VisitorCounter'

export default function Contact() {
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

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
    <>
      <header className="sticky top-0 z-10 glass px-6 md:px-8 py-4">
        <h1 className="text-xl font-bold">Contact</h1>
      </header>

      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight mb-2">Get in Touch</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Have a project in mind or want to collaborate? Send me a message and I'll get back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Reach me card on the left */}
          <div className="md:col-span-1 p-6 rounded-xl glass border border-primary/10">
            <p className="text-slate-400 text-sm mb-4">
              You can also reach me at{' '}
              <a href={profile?.email ? `mailto:${profile.email}` : '#'} className="text-primary font-medium hover:underline">
                {profile?.email || 'hello@portfolio.com'}
              </a>
              {(profile?.linkedin_url || profile?.github_url) && ' or connect via:'}
            </p>
            <div className="flex flex-wrap gap-3">
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-primary/20 text-slate-300 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all text-sm"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-primary/20 text-slate-300 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all text-sm"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                  <span className="font-medium">GitHub</span>
                </a>
              )}
              {profile?.twitter_url && (
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-primary/20 text-slate-300 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all text-sm"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                  <span className="font-medium">Twitter</span>
                </a>
              )}
              {profile?.youtube_url && (
                <a
                  href={profile.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-primary/20 text-slate-300 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all text-sm"
                  aria-label="YouTube"
                >
                  <YouTubeIcon />
                  <span className="font-medium">YouTube</span>
                </a>
              )}
            </div>
          </div>

          {/* Form on the right */}
          <form onSubmit={handleSubmit} className="space-y-6 md:col-span-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-800 dark:bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-800 dark:bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              className="w-full bg-slate-800 dark:bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Project inquiry"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full bg-slate-800 dark:bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {status === 'success' && (
            <p className="text-green-400 text-sm font-medium flex items-center gap-2">
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
            className="w-full md:w-auto px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
    </>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-6 h-6 shrink-0" style={{ color: '#0A66C2' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}
function GitHubIcon() {
  return (
    <svg className="w-6 h-6 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
function TwitterIcon() {
  return (
    <svg className="w-6 h-6 shrink-0" style={{ color: '#1DA1F2' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function YouTubeIcon() {
  return (
    <svg className="w-6 h-6 shrink-0" style={{ color: '#FF0000' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}
