import { useState, useEffect } from 'react'
import { getAllSkills, createSkill, updateSkill, deleteSkill } from '../../lib/supabase'

const CATEGORIES = ['Frontend', 'Backend', 'Core Languages', 'Dev Tools']
const LEVELS = ['Learning', 'Intermediate', 'Advanced', 'Expert']
const ICON_COLORS = ['blue', 'cyan', 'pink', 'slate', 'primary']

export default function AdminSkills() {
  const [skills, setSkills] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', description: '', percentage: 80, level: 'Intermediate', category: 'Frontend', icon_color: 'blue' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    getAllSkills().then(setSkills)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'percentage' ? parseInt(value, 10) || 0 : value }))
  }

  const openNew = () => {
    setEditing(null)
    setForm({ name: '', description: '', percentage: 80, level: 'Intermediate', category: 'Frontend', icon_color: 'blue' })
  }

  const openEdit = (s) => {
    setEditing(s)
    setForm({ name: s.name || '', description: s.description || '', percentage: s.percentage ?? 80, level: s.level || 'Intermediate', category: s.category || 'Frontend', icon_color: s.icon_color || 'blue' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (editing) {
      const { error } = await updateSkill(editing.id, form)
      if (error) setMessage(error.message)
      else { setMessage('Updated.'); setEditing(null); getAllSkills().then(setSkills) }
    } else {
      const { error } = await createSkill(form)
      if (error) setMessage(error.message)
      else { setMessage('Added.'); openNew(); getAllSkills().then(setSkills) }
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    const { error } = await deleteSkill(id)
    if (error) setMessage(error.message)
    else { setMessage('Deleted.'); setEditing(null); getAllSkills().then(setSkills) }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Skills</h1>
        <button type="button" onClick={openNew} className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90">Add skill</button>
      </div>
      {message && <p className="text-sm text-slate-400 mb-4">{message}</p>}
      <div className="space-y-4 mb-8">
        {skills.map((s) => (
          <div key={s.id} className="glass p-4 rounded-xl border border-primary/10 flex items-center justify-between">
            <span className="font-medium text-white">{s.name}</span>
            <span className="text-slate-500 text-sm">{s.percentage}% · {s.category}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => openEdit(s)} className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm">Edit</button>
              <button type="button" onClick={() => handleDelete(s.id)} className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="glass p-6 rounded-xl border border-primary/10">
        <h2 className="font-bold text-slate-200 mb-4">{editing ? 'Edit skill' : 'New skill'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Description</label>
            <input name="description" value={form.description} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Percentage (0-100)</label>
              <input name="percentage" type="number" min="0" max="100" value={form.percentage} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Level</label>
              <select name="level" value={form.level} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white">
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Icon color</label>
              <select name="icon_color" value={form.icon_color} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white">
                {ICON_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90">{editing ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  )
}
