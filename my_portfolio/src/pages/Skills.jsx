import { useState, useEffect } from 'react'
import { getAllSkills } from '../lib/supabase'
import SectionHeader from '../components/SectionHeader'

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
      { name: 'React / Next.js', description: 'Component architecture, SSR, and state management.', percentage: 92, level: 'Advanced' },
      { name: 'Tailwind CSS', description: 'Utility-first styling, design systems, and responsive layouts.', percentage: 98, level: 'Expert' },
      { name: 'TypeScript', description: 'Static typing, generic interfaces, and utility types.', percentage: 88, level: 'Advanced' },
      { name: 'GraphQL', description: 'Schema design, mutations, and Apollo Client integration.', percentage: 75, level: 'Intermediate' },
      { name: 'Three.js / WebGL', description: '3D web experiences, shaders, and geometry rendering.', percentage: 45, level: 'Learning' },
    ]
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
      <SectionHeader
        tag="Skills"
        title="Technical Proficiency"
        subtitle="A breakdown of my engineering capabilities and technological expertise across the stack."
      />

      {hasCategories && (
        <div className="flex border-b border-purple-500/10 mb-10 overflow-x-auto whitespace-nowrap gap-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-4 border-b-2 font-bold text-sm tracking-wide transition-all ${
                activeCategory === cat
                  ? 'border-primary text-purple-text'
                  : 'border-transparent text-muted hover:text-purple-light'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displaySkills.map((skill, i) => (
          <SkillRow key={skill.id || i} skill={skill} index={i} />
        ))}
      </div>

      <div className="mt-16 card-surface p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="size-16 icon-gradient-box shrink-0">
          <span className="material-symbols-outlined text-white text-3xl">workspace_premium</span>
        </div>
        <div>
          <h5 className="text-xl font-bold text-white">Certification Path</h5>
          <p className="text-sm text-muted mt-1">Top 5% Global Assessment Score in Frontend Development (HackerRank)</p>
        </div>
      </div>
    </div>
  )
}

function SkillRow({ skill, index }) {
  const pct = skill.percentage ?? 80
  return (
    <div className="card-surface p-6">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-white">{skill.name}</span>
        <span className="text-sm font-bold text-purple-text">{pct}%</span>
      </div>
      {skill.description && (
        <p className="text-xs text-muted mb-4">{skill.description}</p>
      )}
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ '--skill-width': `${pct}%`, animationDelay: `${index * 0.1}s` }}
        />
      </div>
    </div>
  )
}
