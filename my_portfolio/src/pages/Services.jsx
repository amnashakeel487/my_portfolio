import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getServices } from '../lib/supabase'
import SectionHeader from '../components/SectionHeader'

const iconMap = {
  palette: 'palette',
  code: 'code',
  bolt: 'bolt',
  architecture: 'architecture',
  design_services: 'design_services',
  terminal: 'terminal',
}

export default function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  const defaultServices = [
    { title: 'UI/UX Design', description: 'User research, wireframing, high-fidelity mockups, and design systems that scale.', icon: 'palette' },
    { title: 'Frontend Development', description: 'React, Next.js, and modern CSS. Accessible, performant interfaces.', icon: 'code' },
    { title: 'Prototyping & Motion', description: 'Interactive prototypes and micro-interactions that bring ideas to life.', icon: 'bolt' },
    { title: 'Design Strategy', description: 'Product strategy, UX audits, and conversion-focused design decisions.', icon: 'architecture' },
  ]

  const list = services.length > 0 ? services : defaultServices

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
      <SectionHeader
        tag="Services"
        title="What I Offer"
        subtitle="End-to-end design and development services to bring your product to life."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((s, i) => (
          <div
            key={s.id || i}
            className="card-surface card-lift p-8 text-center"
          >
            <div className="size-14 icon-gradient-box mx-auto mb-6">
              <span className="material-symbols-outlined text-white text-2xl">
                {iconMap[s.icon] || s.icon || 'work'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted mb-4">Have a project in mind?</p>
        <Link to="/contact" className="btn-gradient inline-flex items-center gap-2">
          Start a conversation
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </div>
  )
}
