import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Challenge from './components/Challenge'
import Recorridos from './components/Recorridos'
import Solutions from './components/Solutions'
import Industrias from './components/Industrias'
import Casos from './components/Casos'
import BandaCalculadora from './components/BandaCalculadora'
import Needs from './components/Needs'
import Process from './components/Process'
import Nosotros from './components/Nosotros'
import Faq from './components/Faq'
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
        <Recorridos />
        <Challenge />
        <Solutions />
        <Industrias />
        <Casos />
        <Needs />
        <BandaCalculadora />
        <Process />
        <Nosotros />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
