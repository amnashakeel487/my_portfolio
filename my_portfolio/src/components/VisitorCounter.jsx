import { useEffect, useState } from 'react'
import { incrementVisitorCount } from '../lib/supabase'

export default function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    let mounted = true

    async function trackVisit() {
      const newCount = await incrementVisitorCount()
      if (mounted) setCount(newCount)
    }

    trackVisit()

    return () => {
      mounted = false
    }
  }, [])

  if (count === null) {
    return null
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background-dark/80 border border-primary/30 text-xs md:text-sm text-slate-200 shadow-sm shadow-primary/20">
      <span className="text-lg">👀</span>
      <span className="font-medium">
        Total Visitors: <span className="font-semibold text-primary">{count}</span>
      </span>
    </div>
  )
}

