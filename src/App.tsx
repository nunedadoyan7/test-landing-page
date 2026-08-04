import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Copyright } from './components/Copyright'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
      </main>
      <footer>
        <Copyright />
      </footer>
    </div>
  )
}

export default App
