import { createContext, useContext, useEffect, useState } from 'react'
import { getSession, onAuthStateChange } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const authResult = onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    const subscription = authResult?.data?.subscription
    return () => subscription?.unsubscribe?.()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
