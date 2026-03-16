import { useEffect, useState } from 'react'

const FALLBACK_QUOTES = [
  {
    content: ' First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
  {
    content: ' Code is like humor. When you have to explain it, it’s bad.',
    author: 'Cory House',
  },
  {
    content: ' The only way to learn a new programming language is by writing programs in it.',
    author: 'Dennis Ritchie',
  },
  {
    content: ' Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.',
    author: 'Antoine de Saint-Exupéry',
  },
]

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchQuote() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('https://api.quotable.io/random')
      if (!response.ok) {
        throw new Error('Failed to fetch quote. Please try again.')
      }

      const data = await response.json()
      setQuote({
        content: data.content,
        author: data.author || 'Unknown',
      })
    } catch (err) {
      const message = err?.message || 'Something went wrong while fetching a quote.'

      // Use a local fallback quote so the card is never empty
      const fallback =
        FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)]

      setError(message)
      setQuote(fallback)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
          Daily Motivation for Developers
        </h2>

        <div className="bg-slate-900/70 border border-slate-700/70 rounded-3xl shadow-xl shadow-black/40 p-8 sm:p-10 flex flex-col items-center text-center gap-6">
          {loading && (
            <p className="text-slate-400 text-sm sm:text-base">
              Fetching some motivation for you...
            </p>
          )}

          {error && !loading && (
            <div className="space-y-3">
              <p className="text-red-400 text-sm sm:text-base">
                {error}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                You can try again by clicking the button below.
              </p>
            </div>
          )}

          {!loading && !error && quote && (
            <>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-50 leading-relaxed">
                “{quote.content}”
              </p>
              <p className="text-sm sm:text-base font-medium text-slate-400 mt-2">
                — {quote.author}
              </p>
            </>
          )}

          <button
            type="button"
            onClick={fetchQuote}
            className="mt-4 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-white text-sm sm:text-base font-semibold shadow-lg shadow-primary/30 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Loading…' : 'Get Another Quote'}
          </button>
        </div>
      </div>
    </section>
  )
}

