import { useState, useEffect } from 'react'
import { getAllSkills } from '../lib/supabase'

const CATEGORIES = ['Frontend', 'Backend', 'Core Languages', 'Dev Tools']

export default function Skills() {
  const [allSkills, setAllSkills] = useState([])
  const [activeCategory, setActiveCategory] = useState('Frontend')

  useEffect(() => {
    getAllSkills().then(setAllSkills)
  }, [])

  const hasCategories = allSkills.some(s => s.category)
  const displaySkills = hasCategories
    ? allSkills.filter(s => (s.category || 'Frontend') === activeCategory)
    : (allSkills.length ? allSkills : getDefaultSkills())

  function getDefaultSkills() {
    return [
      { name: 'React / Next.js', description: 'Component architecture, SSR, and state management.', percentage: 92, level: 'Advanced', icon_color: 'blue' },
      { name: 'Tailwind CSS', description: 'Utility-first styling, design systems, and responsive layouts.', percentage: 98, level: 'Expert', icon_color: 'cyan' },
      { name: 'TypeScript', description: 'Static typing, generic interfaces, and utility types.', percentage: 88, level: 'Advanced', icon_color: 'blue' },
      { name: 'GraphQL', description: 'Schema design, mutations, and Apollo Client integration.', percentage: 75, level: 'Intermediate', icon_color: 'pink' },
      { name: 'Three.js / WebGL', description: '3D web experiences, shaders, and geometry rendering.', percentage: 45, level: 'Learning', icon_color: 'slate' },
    ]
  }

  return (
    <>
      <header className="h-20 border-b border-slate-200 dark:border-primary/10 flex items-center justify-between px-6 md:px-10 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
          <h2 className="text-lg font-extrabold tracking-tight">Skills</h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
        <div className="mb-10 max-w-2xl">
          <h3 className="text-4xl font-black mb-3 text-slate-900 dark:text-white tracking-tight">Technical Proficiency</h3>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            A breakdown of my engineering capabilities and technological expertise across the stack.
          </p>
        </div>

        {hasCategories && (
          <div className="flex border-b border-slate-200 dark:border-primary/20 mb-10 overflow-x-auto whitespace-nowrap gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pb-4 border-b-2 font-bold text-sm tracking-wide transition-all ${
                  activeCategory === cat ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySkills.map((skill, i) => {
            const iconStyle = { blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: 'rocket_launch' }, cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', icon: 'palette' }, pink: { bg: 'bg-pink-500/10', text: 'text-pink-500', icon: 'hub' }, slate: { bg: 'bg-slate-400/10', text: 'text-slate-400', icon: 'view_in_ar' } }
            const style = iconStyle[skill.icon_color] || { bg: 'bg-primary/10', text: 'text-primary', icon: 'code' }
            return (
            <div
              key={skill.id || i}
              className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl ${style.bg}`}>
                  <span className={`material-symbols-outlined text-2xl ${style.text}`}>{style.icon}</span>
                </div>
                <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">{skill.level || 'Intermediate'}</span>
              </div>
              <h4 className="text-xl font-bold mb-1">{skill.name}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">{skill.description || '—'}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span>Mastery</span>
                  <span className="text-primary">{skill.percentage ?? 80}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-primary/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${skill.percentage ?? 80}%` }} />
                </div>
              </div>
            </div>
          )})}
        </section>

        <footer className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-3xl">workspace_premium</span>
            </div>
            <div>
              <h5 className="text-xl font-bold">Certification Path</h5>
              <p className="text-sm text-slate-500 dark:text-slate-400">Top 5% Global Assessment Score in Frontend Development (HackerRank)</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
