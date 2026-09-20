import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Challenge from './components/Challenge'
import Solutions from './components/Solutions'
import Needs from './components/Needs'
import Process from './components/Process'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Challenge />
        <Solutions />
        <Needs />
        <Process />
        <CtaBand />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
