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
    </div>
  )
}

export default App
