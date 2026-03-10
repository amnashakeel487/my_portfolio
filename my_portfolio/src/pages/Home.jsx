import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../lib/supabase'

export default function Home() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getProfile().then(setProfile)
  }, [])

  const name = profile?.full_name || 'Your Name'
  const tagline = profile?.tagline || 'Creative Designer & Developer'
  const bioShort = profile?.bio_short || "Designing digital experiences with purpose. I blend aesthetics with usability to create impactful designs."
  const location = profile?.location || 'San Francisco, CA'

  const socialLinks = [
    { key: 'linkedin', label: 'LinkedIn', url: profile?.linkedin_url, icon: LinkedInIcon },
    { key: 'twitter', label: 'Twitter', url: profile?.twitter_url, icon: TwitterIcon },
    { key: 'github', label: 'GitHub', url: profile?.github_url, icon: GitHubIcon },
    { key: 'youtube', label: 'YouTube', url: profile?.youtube_url, icon: YouTubeIcon },
  ]

  return (
    <>
      <header className="sticky top-0 z-10 glass px-6 md:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Overview</h1>
        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all"
          >
            Let's Talk
          </Link>
        </div>
      </header>

      <div className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto">
        {/* Hero - pic left, text right */}
        <section className="relative rounded-3xl overflow-hidden min-h-[380px] flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 bg-gradient-to-b from-background-dark via-primary/10 to-background-dark border border-white/5">
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/30 flex-shrink-0 shadow-xl shadow-primary/20 order-2 md:order-1 bg-slate-800 flex items-center justify-center">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-6xl md:text-7xl text-slate-500">person</span>
            )}
          </div>
          <div className="flex-1 text-center md:text-left order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-dark/80 border border-primary/30 mb-4">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-white text-xs font-bold tracking-widest uppercase">Available for new opportunities</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2">
              {tagline.split(/[&,]/)[0].trim()}
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight mb-4">
              Architecting the Web
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
              Hi, I'm {name.split(' ')[0]}. {bioShort}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                View my work
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-bold border border-slate-500 hover:bg-white/10 hover:border-slate-400 transition-all">
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        {/* Quick stats + About teaser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 glass-card rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 size-64 bg-primary/20 blur-[100px] rounded-full" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">auto_stories</span>
                <h2 className="text-2xl font-bold text-white tracking-tight">My Story</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {profile?.bio?.slice(0, 280) || "With over 8 years of experience in the design industry, my journey started with a fascination for how colors and shapes influence human behavior. Today, I blend aesthetics with usability to create impactful designs."}
                ...
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Read full story <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </section>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-dark dark:bg-card-dark border border-white/5 rounded-3xl p-6 flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Location</h4>
                <p className="text-white font-bold text-lg">{location}</p>
              </div>
            </div>
            <div className="bg-surface-dark dark:bg-card-dark border border-white/5 rounded-3xl p-6 flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">work</span>
              </div>
              <div>
                <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Experience</h4>
                <p className="text-white font-bold text-lg">{profile?.experience_years || '8+ Years'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Resume + Contact + Follow Me */}
        <section className="space-y-6 pb-10">
          <div className="flex flex-wrap gap-4">
            <a
              href={profile?.cv_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                profile?.cv_url
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
              }`}
              {...(!profile?.cv_url && { 'aria-disabled': true, onClick: (e) => e.preventDefault() })}
            >
              <span className="material-symbols-outlined">download</span>
              Download Resume
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined">mail</span>
              Contact Me
            </Link>
          </div>

          <div className="glass rounded-2xl border border-primary/10 p-8 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Follow Me</h2>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map(({ key, label, url, icon: Icon }) => (
                url ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/20 transition-all"
                  >
                    <span className="flex-shrink-0 text-[24px]"><Icon /></span>
                    <span className="font-medium text-white">{label}</span>
                  </a>
                ) : null
              ))}
            </div>
            {!socialLinks.some(s => s.url) && (
              <p className="text-slate-500 text-sm text-center py-4">Add social links in Admin → Profile to show them here.</p>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-6 h-6 shrink-0" style={{ color: '#0A66C2' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
  )
}
function TwitterIcon() {
  return (
    <svg className="w-6 h-6 shrink-0" style={{ color: '#1DA1F2' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  )
}
function GitHubIcon() {
  return (
    <svg className="w-6 h-6 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
  )
}
function YouTubeIcon() {
  return (
    <svg className="w-6 h-6 shrink-0" style={{ color: '#FF0000' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
  )
}
