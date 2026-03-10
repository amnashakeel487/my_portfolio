import { useState, useEffect, useRef } from 'react'
import { getProjects, createProject, updateProject, deleteProject, uploadImage } from '../../lib/supabase'

const CATEGORIES = ['React', 'Node.js', 'Web3', 'UI/UX', 'Other']
const STATUSES = ['Live', 'In Progress', 'Archived']

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', image_url: '', tags: [], live_url: '', github_url: '', status: 'Live', category: 'React' })
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const data = await getProjects()
    setProjects(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'tags') {
      const arr = value.split(',').map((t) => t.trim()).filter(Boolean)
      setForm((prev) => ({ ...prev, tags: arr }))
    } else setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const { url, error } = await uploadImage(file, 'projects')
    setUploading(false)
    if (error) setMessage('Upload failed: ' + error)
    else if (url) setForm((prev) => ({ ...prev, image_url: url }))
  }

  const openNew = () => {
    setEditing(null)
    setForm({ title: '', description: '', image_url: '', tags: [], live_url: '', github_url: '', status: 'Live', category: 'React' })
  }

  const openEdit = (p) => {
    setEditing(p)
    setForm({
      title: p.title || '',
      description: p.description || '',
      image_url: p.image_url || '',
      tags: Array.isArray(p.tags) ? p.tags : [],
      live_url: p.live_url || '',
      github_url: p.github_url || '',
      status: p.status || 'Live',
      category: p.category || 'React',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    const payload = { ...form, tags: form.tags }
    if (editing) {
      const { error } = await updateProject(editing.id, payload)
      if (error) setMessage(error.message)
      else { setMessage('Updated.'); setEditing(null); load() }
    } else {
      const { data, error } = await createProject(payload)
      if (error) setMessage(error.message)
      else { setMessage('Added.'); setForm({ title: '', description: '', image_url: '', tags: [], live_url: '', github_url: '', status: 'Live', category: 'React' }); load() }
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    const { error } = await deleteProject(id)
    if (error) setMessage(error.message)
    else { setMessage('Deleted.'); setEditing(null); load() }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button type="button" onClick={openNew} className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90">
          Add project
        </button>
      </div>

      {message && <p className="text-sm text-slate-400 mb-4">{message}</p>}

      <div className="space-y-4 mb-8">
        {projects.map((p) => (
          <div key={p.id} className="glass p-4 rounded-xl border border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-10 rounded bg-slate-800 bg-cover bg-center" style={{ backgroundImage: p.image_url ? `url(${p.image_url})` : undefined }} />
              <div>
                <p className="font-medium text-white">{p.title}</p>
                <p className="text-xs text-slate-500">{p.category} · {p.status}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => openEdit(p)} className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm">Edit</button>
              <button type="button" onClick={() => handleDelete(p.id)} className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-6 rounded-xl border border-primary/10">
        <h2 className="font-bold text-slate-200 mb-4">{editing ? 'Edit project' : 'New project'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Image</label>
            <div className="flex items-center gap-4">
              {form.image_url && <img src={form.image_url} alt="" className="w-24 h-14 rounded object-cover" />}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="text-primary text-sm hover:underline">{uploading ? 'Uploading...' : 'Upload image'}</button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Tags (comma-separated)</label>
            <input name="tags" value={form.tags.join(', ')} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" placeholder="REACT, NODE, TYPESCRIPT" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Live URL</label>
              <input name="live_url" value={form.live_url} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">GitHub URL</label>
              <input name="github_url" value={form.github_url} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white" />
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
              <label className="block text-sm text-slate-400 mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90">{editing ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  )
}
