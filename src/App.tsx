import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { WhatsInBox } from './components/WhatsInBox'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhatsInBox />
      </main>
      <footer className="py-4 text-center text-sage text-sm">
        Last updated: October 2026
      </footer>
    </div>
  )
}

export default App
