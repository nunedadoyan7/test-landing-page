import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Testimonials } from './components/Testimonials'
import { SignupForm } from './components/SignupForm'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <Testimonials />
        <SignupForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
