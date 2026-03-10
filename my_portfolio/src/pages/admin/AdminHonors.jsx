import { useState, useEffect } from 'react'
import { getHonors, createHonor, updateHonor, deleteHonor } from '../../lib/supabase'

export default function AdminHonors() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', sort_order: 0 })
  const [message, setMessage] = useState('')

  useEffect(() => {
    getHonors().then(setItems)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'sort_order' ? parseInt(value, 10) || 0 : value }))
  }

  const openNew = () => {
    setEditing(null)
    setForm({ title: '', sort_order: items.length })
  }

  const openEdit = (item) => {
    setEditing(item)
    setForm({ title: item.title || '', sort_order: item.sort_order ?? 0 })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (editing) {
      const { error } = await updateHonor(editing.id, form)
      if (error) setMessage(error.message)
      else { setMessage('Updated.'); setEditing(null); getHonors().then(setItems) }
    } else {
      const { error } = await createHonor(form)
      if (error) setMessage(error.message)
      else { setMessage('Added.'); openNew(); getHonors().then(setItems) }
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return
    const { error } = await deleteHonor(id)
    if (error) setMessage(error.message)
    else { setMessage('Deleted.'); setEditing(null); getHonors().then(setItems) }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Honors</h1>
        <button type="button" onClick={openNew} className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90">Add</button>
      </div>
      {message && <p className="text-sm text-slate-400 mb-4">{message}</p>}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="glass p-4 rounded-xl flex justify-between items-center">
            <p className="font-medium text-white">{item.title}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => openEdit(item)} className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm">Edit</button>
              <button type="button" onClick={() => handleDelete(item.id)} className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="glass p-6 rounded-xl border border-primary/10">
        <h2 className="font-bold text-slate-200 mb-4">{editing ? 'Edit' : 'New'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Sort order</label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" />
          </div>
          <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90">{editing ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  )
}
