import { useState, useEffect } from 'react'
import { getProjects } from '../lib/supabase'

const CATEGORIES = ['All', 'React', 'Node.js', 'Web3', 'UI/UX']

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [category, setCategory] = useState('All')

  useEffect(() => {
    getProjects(category === 'All' ? null : category).then(setProjects)
  }, [category])

  return (
    <>
      <header className="h-16 border-b border-slate-200 dark:border-primary/10 flex items-center justify-between px-6 md:px-8 shrink-0 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md">
        <h1 className="text-lg font-bold">Projects</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Projects Gallery</h2>
            <p className="text-slate-500 dark:text-slate-400">A selection of my development work across platforms.</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  category === cat
                    ? 'bg-primary text-white'
                    : 'bg-slate-200 dark:bg-zinc-800 hover:bg-primary/10 hover:text-primary text-slate-700 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))
          ) : (
            <>
              <ProjectCard placeholder />
              <ProjectCard placeholder />
              <ProjectCard placeholder />
            </>
          )}
        </div>
      </div>
    </>
  )
}

function ProjectCard({ project, placeholder }) {
  if (placeholder) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-center aspect-video text-slate-400">
        <span className="material-symbols-outlined text-4xl mb-2">folder_open</span>
        <p className="text-sm">No projects yet</p>
      </div>
    )
  }

  const { title, description, image_url, tags, live_url, github_url, status } = project
  const tagsList = Array.isArray(tags) ? tags : []

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 group hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
      <div className="relative aspect-video overflow-hidden">
        <div
          className="w-full h-full bg-slate-800 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: image_url ? `url(${image_url})` : undefined }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-4">
          <span className="text-white text-xs font-medium bg-primary/80 backdrop-blur px-2 py-1 rounded">{status || 'Live'}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{description || '—'}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tagsList.slice(0, 4).map((tag, i) => (
            <span key={i} className="bg-slate-100 dark:bg-zinc-800 text-[10px] font-bold px-2 py-1 rounded text-slate-600 dark:text-slate-400">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {live_url && (
            <a href={live_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">visibility</span>
              Live Demo
            </a>
          )}
          {github_url && (
            <a href={github_url} target="_blank" rel="noopener noreferrer" className="flex-1 border border-slate-200 dark:border-zinc-800 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">code</span>
              GitHub
            </a>
          )}
          {!live_url && !github_url && <span className="text-xs text-slate-500">Links coming soon</span>}
        </div>
      </div>
    </div>
  )
}
