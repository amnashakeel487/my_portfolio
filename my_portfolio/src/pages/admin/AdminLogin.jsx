import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signIn } from '../../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { data, error: err } = await signIn(email, password)
    setLoading(false)
    if (err) {
      setError(err.message || 'Login failed')
      return
    }
    if (data?.user) navigate(redirect, { replace: true })
  }

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass p-8 rounded-2xl border border-primary/20">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-12 bg-primary rounded-xl flex items-center justify-center text-white">
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-slate-400 text-sm">Sign in to manage your portfolio</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-center text-slate-500 text-sm">
            Create an account in Supabase Dashboard → Authentication → Users → Add user.
          </p>
          <a href="/" className="mt-4 block text-center text-primary text-sm hover:underline">← Back to site</a>
        </div>
      </div>
    </div>
  )
}
