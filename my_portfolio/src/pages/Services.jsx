import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getServices } from '../lib/supabase'

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
    <>
      <header className="sticky top-0 z-10 glass px-6 md:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Services</h1>
        <Link to="/contact" className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90">
          Get in Touch
        </Link>
      </header>

      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">What I Offer</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            End-to-end design and development services to bring your product to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((s, i) => (
            <div
              key={s.id || i}
              className="glass p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all group"
            >
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{iconMap[s.icon] || s.icon || 'work'}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{s.title}</h3>
              <p className="text-slate-400 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4">Have a project in mind?</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all">
            Start a conversation
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </>
  )
}
