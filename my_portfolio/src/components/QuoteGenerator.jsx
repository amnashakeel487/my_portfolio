const QUOTES = [
  {
    content: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
  {
    content: 'Code is like humor. When you have to explain it, it’s bad.',
    author: 'Cory House',
  },
  {
    content: 'The only way to learn a new programming language is by writing programs in it.',
    author: 'Dennis Ritchie',
  },
  {
    content: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.',
    author: 'Antoine de Saint-Exupéry',
  },
  {
    content: 'Talk is cheap. Show me the code.',
    author: 'Linus Torvalds',
  },
]

// Pick one quote for each 5‑day window, based on today’s date.
function getQuoteForToday() {
  const msPerDay = 24 * 60 * 60 * 1000
  const now = new Date()
  const daysSinceEpoch = Math.floor(now.getTime() / msPerDay)
  const windowIndex = Math.floor(daysSinceEpoch / 5) // changes every 5 days
  const quoteIndex = windowIndex % QUOTES.length
  return QUOTES[quoteIndex]
}

export default function QuoteGenerator() {
  const quote = getQuoteForToday()

  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
          “{quote.content}”
        </p>
        <p className="mt-3 text-sm md:text-base font-medium text-primary">
          — {quote.author}
        </p>
      </div>
    </section>
  )
}

