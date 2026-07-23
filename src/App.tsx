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
    </div>
  )
}

export default App
