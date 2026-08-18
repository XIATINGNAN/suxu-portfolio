import Nav from './components/Nav'
import BgFx from './components/BgFx'
import Spotlight from './components/Spotlight'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import Life from './components/Life'
import Strengths from './components/Strengths'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <BgFx />
      <Spotlight />
      <Nav />
      <main>
        <Hero />
        <About />
        <Works />
        <Life />
        <Strengths />
        <Contact />
      </main>
    </>
  )
}
