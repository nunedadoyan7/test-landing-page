import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Pricing } from './components/Pricing'
import { Signup } from './components/Signup'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <Pricing />
        <Signup />
      </main>
    </div>
  )
}

export default App
