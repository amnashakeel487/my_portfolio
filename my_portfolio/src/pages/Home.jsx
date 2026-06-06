import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfile, getProjects, getAllSkills } from '../lib/supabase'
import QuoteGenerator from '../components/QuoteGenerator'

const TECH_STACK = ['MongoDB', 'Express.js', 'React', 'Node.js', 'OpenAI API', 'Tailwind CSS']

export default function Home() {
  const [profile, setProfile] = useState(null)
  const [projectCount, setProjectCount] = useState(0)
  const [skillCount, setSkillCount] = useState(0)

  useEffect(() => {
    getProfile().then(setProfile)
    getProjects().then(p => setProjectCount(p?.length || 0))
    getAllSkills().then(s => setSkillCount(s?.length || 0))
  }, [])

  const name = profile?.full_name || 'Your Name'
  const tagline = profile?.tagline || 'Creative Designer & Developer'
  const bioShort = profile?.bio_short || "Designing digital experiences with purpose. I blend aesthetics with usability to create impactful designs."
  const location = profile?.location || 'San Francisco, CA'
  const experience = profile?.experience_years || '8+ Years'

  const socialLinks = [
    { key: 'linkedin', label: 'LinkedIn', url: profile?.linkedin_url, icon: LinkedInIcon },
    { key: 'twitter', label: 'Twitter', url: profile?.twitter_url, icon: TwitterIcon },
    { key: 'github', label: 'GitHub', url: profile?.github_url, icon: GitHubIcon },
    { key: 'youtube', label: 'YouTube', url: profile?.youtube_url, icon: YouTubeIcon },
  ]

  const stats = [
    { value: projectCount || '10+', label: 'Projects' },
    { value: experience.replace(/ experience/i, ''), label: 'Years Experience' },
    { value: skillCount || '15+', label: 'Technologies' },
    { value: '98%', label: 'Client Satisfaction' },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-72 h-72 bg-purple-600/20 -top-20 -left-20" style={{ animationDelay: '0s' }} />
      <div className="orb w-96 h-96 bg-pink-600/10 top-40 -right-32" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-20 space-y-16">

        {/* ── Hero ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="badge-available mb-6 animate-fade-up">
              <span className="pulse-dot" />
              Available for new opportunities
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-3 animate-fade-up-delay-1"
              style={{ letterSpacing: '-1.5px' }}
            >
              {tagline.split(/[&,]/)[0].trim()}
            </h1>

            <p className="text-3xl md:text-4xl font-black gradient-text mb-4 animate-fade-up-delay-2">
              Architecting the Web
            </p>

            <p className="typewriter text-purple-text text-lg font-medium mb-6 animate-fade-up-delay-2">
              {tagline}
            </p>

            <p className="text-muted text-base leading-relaxed mb-8 animate-fade-up-delay-3">
              Hi, I'm {name.split(' ')[0]}. {bioShort}
            </p>

            <div className="flex flex-wrap gap-4 mb-8 animate-fade-up-delay-3">
              <Link to="/projects" className="btn-gradient inline-flex items-center gap-2">
                View my work
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
              <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
                Get in touch
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 animate-fade-up-delay-4">
              {TECH_STACK.map(tech => (
                <span key={tech} className="tech-pill">{tech}</span>
              ))}
            </div>
          </div>

          {/* Right — Avatar */}
          <div className="flex justify-center lg:justify-end animate-fade-up-delay-2">
            <div className="avatar-wrapper">
              <div className="avatar-border">
                <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden bg-card-surface flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-7xl text-muted">person</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="card-surface grid grid-cols-2 md:grid-cols-4 overflow-hidden">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`py-8 px-6 text-center stat-divider ${i % 2 === 1 ? 'border-r-0 md:border-r' : ''}`}
            >
              <p className="text-3xl md:text-4xl font-black text-white mb-1">{value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">{label}</p>
            </div>
          ))}
        </section>

        <QuoteGenerator />

        {/* ── My Story + Location/Experience ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 card-surface p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-purple-text">auto_stories</span>
              <h2 className="text-2xl font-bold text-white">My Story</h2>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              {profile?.bio?.slice(0, 280) || "With over 8 years of experience in the design industry, my journey started with a fascination for how colors and shapes influence human behavior. Today, I blend aesthetics with usability to create impactful designs."}
              ...
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-purple-text font-semibold hover:text-purple-light">
              Read full story <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </section>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="card-surface p-6 flex items-center gap-4">
              <div className="size-12 rounded-xl icon-gradient-box">
                <span className="material-symbols-outlined text-white">location_on</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Location</p>
                <p className="text-white font-bold text-lg">{location}</p>
              </div>
            </div>
            <div className="card-surface p-6 flex items-center gap-4">
              <div className="size-12 rounded-xl icon-gradient-box">
                <span className="material-symbols-outlined text-white">work</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Experience</p>
                <p className="text-white font-bold text-lg">{experience}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Resume + Follow Me ── */}
        <section className="space-y-6 pb-4">
          <div className="flex flex-wrap gap-4">
            <a
              href={profile?.cv_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium ${
                profile?.cv_url ? 'btn-gradient' : 'bg-card-surface text-muted cursor-not-allowed border border-purple-500/10'
              }`}
              {...(!profile?.cv_url && { 'aria-disabled': true, onClick: (e) => e.preventDefault() })}
            >
              <span className="material-symbols-outlined">download</span>
              Download Resume
            </a>
            <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
              <span className="material-symbols-outlined">mail</span>
              Contact Me
            </Link>
          </div>

          <div className="card-surface p-8 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Follow Me</h2>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map(({ key, label, url, icon: Icon }) => (
                url ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 hover:bg-purple-500/5"
                  >
                    <Icon />
                    <span className="font-medium text-white">{label}</span>
                  </a>
                ) : null
              ))}
            </div>
            {!socialLinks.some(s => s.url) && (
              <p className="text-muted text-sm text-center py-4">Add social links in Admin → Profile to show them here.</p>
            )}
          </div>
        </section>
      </div>
    </div>
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
