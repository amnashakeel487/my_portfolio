import { useState, useEffect } from 'react'
import { getProjects } from '../lib/supabase'
import SectionHeader from '../components/SectionHeader'

const CATEGORIES = ['All', 'React', 'Node.js', 'Web3', 'UI/UX']

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [category, setCategory] = useState('All')

  useEffect(() => {
    getProjects(category === 'All' ? null : category).then(setProjects)
  }, [category])

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
      <SectionHeader
        tag="Portfolio"
        title="Projects Gallery"
        subtitle="A selection of my development work across platforms."
      />

      <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              category === cat
                ? 'bg-gradient-accent text-white'
                : 'tech-pill hover:border-purple-500/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} index={i} />
          ))
        ) : (
          <>
            <ProjectCard placeholder index={0} />
            <ProjectCard placeholder index={1} />
            <ProjectCard placeholder index={2} />
          </>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, placeholder, index = 0 }) {
  if (placeholder) {
    return (
      <div
        className="card-surface p-8 flex flex-col items-center justify-center aspect-video text-muted card-slide"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <span className="material-symbols-outlined text-4xl mb-2">folder_open</span>
        <p className="text-sm">No projects yet</p>
      </div>
    )
  }

  const { title, description, image_url, tags, live_url, github_url, status } = project
  const tagsList = Array.isArray(tags) ? tags : []

  return (
    <div
      className="card-surface overflow-hidden group card-slide"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-video overflow-hidden">
        <div
          className="w-full h-full bg-card-surface bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: image_url ? `url(${image_url})` : undefined }}
        />
        {!image_url && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-14 icon-gradient-box">
              <span className="material-symbols-outlined text-white text-2xl">code</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            status === 'In Progress'
              ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
              : 'text-available bg-available/10 border border-available/20'
          }`}>
            {status || 'Live'}
          </span>
        </div>
        <h3 className="font-bold text-lg text-white mb-2 group-hover:text-purple-text transition-colors">{title}</h3>
        <p className="text-sm text-muted mb-4 line-clamp-2">{description || '—'}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {tagsList.slice(0, 4).map((tag, i) => (
            <span key={i} className="tech-pill text-[10px]">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {live_url && (
            <a href={live_url} target="_blank" rel="noopener noreferrer" className="flex-1 btn-gradient py-2 text-xs flex items-center justify-center gap-1 rounded-xl">
              <span className="material-symbols-outlined text-sm">visibility</span>
              Live Demo
            </a>
          )}
          {github_url && (
            <a href={github_url} target="_blank" rel="noopener noreferrer" className="flex-1 btn-outline py-2 text-xs flex items-center justify-center gap-1 rounded-xl">
              <span className="material-symbols-outlined text-sm">code</span>
              GitHub
            </a>
          )}
          {!live_url && !github_url && <span className="text-xs text-muted">Links coming soon</span>}
        </div>
      </div>
    </div>
  )
}
