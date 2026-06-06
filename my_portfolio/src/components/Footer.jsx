import { Link } from 'react-router-dom'

export default function Footer({ profile }) {
  const year = new Date().getFullYear()
  const socials = [
    { key: 'linkedin', url: profile?.linkedin_url, label: 'LinkedIn', icon: 'link' },
    { key: 'github', url: profile?.github_url, label: 'GitHub', icon: 'code' },
    { key: 'twitter', url: profile?.twitter_url, label: 'Twitter', icon: 'alternate_email' },
    { key: 'youtube', url: profile?.youtube_url, label: 'YouTube', icon: 'play_circle' },
  ].filter(s => s.url)

  return (
    <footer className="border-t border-purple-500/10 bg-[#050312] mt-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-gradient-accent flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">grid_view</span>
          </div>
          <span className="text-sm text-muted">
            © {year} {profile?.full_name || 'Portfolio'}. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-4">
          {socials.map(({ key, url, label, icon }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-purple-text transition-colors"
            >
              <span className="material-symbols-outlined text-xl">{icon}</span>
            </a>
          ))}
          {socials.length === 0 && (
            <Link to="/contact" className="text-sm text-muted hover:text-purple-text">
              Get in touch
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
