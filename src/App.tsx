import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default App
