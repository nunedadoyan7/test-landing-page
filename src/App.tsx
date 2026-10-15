import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
      </main>
      <footer className="py-4 text-center text-sage text-sm">
        Last updated: October 2026
      </footer>
    </div>
  )
}

export default App
