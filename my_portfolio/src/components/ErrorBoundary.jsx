import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-slate-400 text-sm mb-4 font-mono">{this.state.error?.message}</p>
            <button
              type="button"
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 rounded-xl bg-primary text-white font-medium"
            >
              Go to home
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
