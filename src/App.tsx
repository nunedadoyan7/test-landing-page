import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { WhyHarvest } from './components/WhyHarvest'
import { Pricing } from './components/Pricing'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <WhyHarvest />
        <Pricing />
      </main>
      <footer className="py-4 text-center text-sage text-sm">
        Last updated: October 2026
      </footer>
    </div>
  )
}

export default App
