import { useState, useEffect } from 'react'
import { getContactMessages, deleteContactMessage } from '../../lib/supabase'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    getContactMessages().then(setMessages)
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    const { error } = await deleteContactMessage(id)
    if (error) setMessage(error.message)
    else { setMessage('Deleted.'); getContactMessages().then(setMessages) }
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-white mb-6">Contact Messages</h1>
      {message && <p className="text-sm text-slate-400 mb-4">{message}</p>}
      {messages.length === 0 ? (
        <p className="text-slate-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="glass p-6 rounded-xl border border-primary/10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-white">{m.name}</p>
                  <p className="text-sm text-slate-500">{m.email}</p>
                  {m.subject && <p className="text-sm text-primary mt-1">Subject: {m.subject}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{new Date(m.created_at).toLocaleString()}</span>
                  <button type="button" onClick={() => handleDelete(m.id)} className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs">Delete</button>
                </div>
              </div>
              <p className="text-slate-300 text-sm whitespace-pre-wrap mt-2">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
