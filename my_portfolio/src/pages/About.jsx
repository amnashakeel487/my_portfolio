import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfile, getEducation, getExpertise, getHonors } from '../lib/supabase'

export default function About() {
  const [profile, setProfile] = useState(null)
  const [education, setEducation] = useState([])
  const [expertise, setExpertise] = useState([])
  const [honors, setHonors] = useState([])

  useEffect(() => {
    getProfile().then(setProfile)
    getEducation().then(setEducation)
    getExpertise().then(setExpertise)
    getHonors().then(setHonors)
  }, [])

  const name = profile?.full_name || 'Alex Rivers'
  const tagline = profile?.tagline || 'Senior UI/UX Designer & Creative Technologist'
  const bio = profile?.bio || "Passionate about building digital experiences that merge aesthetics with deep functionality. I specialize in crafting clean, user-centric interfaces that solve complex business challenges."
  const location = profile?.location || 'San Francisco, CA'
  const experience = profile?.experience_years || '8+ Years Experience'
  const languages = profile?.languages || 'English, French'
  const avatarUrl = profile?.avatar_url

  return (
    <>
      <header className="sticky top-0 z-10 glass px-6 md:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Profile Overview</h1>
        <div className="flex items-center gap-2">
          {profile?.cv_url && (
            <a href={profile.cv_url} className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90">
              Download CV
            </a>
          )}
          <Link to="/contact" className="px-4 py-2 rounded-xl glass text-slate-200 border border-primary/20 text-sm font-medium hover:bg-primary/10">
            Let's Talk
          </Link>
        </div>
      </header>

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        {/* Hero Profile Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-background-dark to-background-dark border border-primary/20 p-6 md:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
            <div className="size-32 md:size-40 rounded-2xl border-4 border-primary/30 overflow-hidden flex-shrink-0 bg-slate-800 flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-5xl text-slate-500">person</span>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold">{name}</h2>
              <p className="text-primary font-medium mt-1">{tagline}</p>
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <span className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                  {location}
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                  {experience}
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="material-symbols-outlined text-primary text-sm">language</span>
                  {languages}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                {profile?.cv_url && (
                  <a href={profile.cv_url} className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    Download CV
                  </a>
                )}
                <Link to="/contact" className="px-6 py-2.5 glass text-slate-200 rounded-xl font-medium border border-primary/20 hover:bg-primary/10 transition-all">
                  Let's Talk
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="glass p-6 md:p-8 rounded-xl border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">description</span>
                <h3 className="text-xl font-bold">Professional Bio</h3>
              </div>
              <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed whitespace-pre-line">
                {bio}
              </div>
            </section>
            <section className="glass p-6 md:p-8 rounded-xl border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">bolt</span>
                <h3 className="text-xl font-bold">Core Expertise</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertise.length > 0 ? (
                  expertise.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-primary/5 border border-primary/5 hover:border-primary/20 transition-all">
                      <p className="font-bold text-slate-200">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    </div>
                  ))
                ) : (
                  ['Interface Design', 'User Experience', 'Interaction Design', 'Strategic Thinking'].map((title, i) => (
                    <div key={i} className="p-4 rounded-xl bg-primary/5 border border-primary/5 hover:border-primary/20 transition-all">
                      <p className="font-bold text-slate-200">{title}</p>
                      <p className="text-xs text-slate-500 mt-1">Expertise area</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <section className="glass p-6 md:p-8 rounded-xl border border-primary/10 h-full">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary">school</span>
                <h3 className="text-xl font-bold">Academic Journey</h3>
              </div>
              <div className="relative border-l border-primary/20 ml-3 space-y-10">
                {education.length > 0 ? (
                  education.map((item, i) => (
                    <div key={item.id} className="relative pl-8">
                      <div className={`absolute -left-[9px] top-1 size-4 rounded-full border-4 border-background-dark ${i === 0 ? 'bg-primary' : 'bg-primary/40'}`} />
                      <p className="text-primary text-sm font-bold mb-1">{item.period}</p>
                      <h4 className="text-slate-200 font-bold">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.institution}</p>
                      {item.description && <p className="text-sm text-slate-400 mt-2 italic">{item.description}</p>}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="relative pl-8">
                      <div className="absolute -left-[9px] top-1 size-4 rounded-full bg-primary border-4 border-background-dark" />
                      <p className="text-primary text-sm font-bold mb-1">2018 - 2020</p>
                      <h4 className="text-slate-200 font-bold">M.S. in Human-Computer Interaction</h4>
                      <p className="text-sm text-slate-500">Stanford University</p>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute -left-[9px] top-1 size-4 rounded-full bg-primary/40 border-4 border-background-dark" />
                      <p className="text-primary text-sm font-bold mb-1">2014 - 2018</p>
                      <h4 className="text-slate-200 font-bold">B.F.A. in Graphic Design</h4>
                      <p className="text-sm text-slate-500">Rhode Island School of Design</p>
                    </div>
                  </>
                )}
              </div>
              {honors.length > 0 && (
                <div className="mt-12 p-4 rounded-xl bg-primary/10 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">workspace_premium</span>
                    <p className="text-sm font-bold text-slate-200">Featured Honors</p>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {honors.map((h) => (
                      <li key={h.id} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="size-1 rounded-full bg-primary" />
                        {h.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Connect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div className="md:col-span-2 glass p-6 rounded-xl border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-4 items-center">
              <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <div>
                <h4 className="font-bold">Let's connect on social</h4>
                <p className="text-sm text-slate-500">Follow my design journey and insights</p>
              </div>
            </div>
            <div className="flex gap-3">
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="size-10 rounded-lg glass border border-primary/20 flex items-center justify-center text-slate-400 hover:text-primary transition-all" aria-label="LinkedIn">
                  <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              )}
              {profile?.twitter_url && (
                <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" className="size-10 rounded-lg glass border border-primary/20 flex items-center justify-center text-slate-400 hover:text-primary transition-all" aria-label="Twitter">
                  <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" /></svg>
                </a>
              )}
              {profile?.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="size-10 rounded-lg glass border border-primary/20 flex items-center justify-center text-slate-400 hover:text-primary transition-all" aria-label="GitHub">
                  <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
              )}
            </div>
          </div>
          <div className="glass p-6 rounded-xl border border-primary/10 flex items-center justify-center">
            <p className="text-sm font-medium text-slate-500">Based in <span className="text-primary font-bold">{location}</span></p>
          </div>
        </div>
      </div>
    </>
  )
}
