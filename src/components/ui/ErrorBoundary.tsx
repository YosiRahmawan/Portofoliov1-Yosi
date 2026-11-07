import { Component, type ReactNode } from 'react'

// Menahan error render atau efek (mis. WebGL tidak ada, file lazy gagal diunduh) agar tidak mengosongkan seluruh halaman
export class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error(error)
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children
  }
}
