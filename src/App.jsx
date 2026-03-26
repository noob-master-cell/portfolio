import { useEffect } from 'react';
import './index.css';

import NoiseOverlay from './components/ui/NoiseOverlay';
import InteractiveBackground from './components/ui/InteractiveBackground';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

export default function App() {
  // Ensure we start at the top on initial visit (if no hash)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e8e6e1] selection:bg-[#ff5722] selection:text-white font-sans antialiased">
      <NoiseOverlay />
      <InteractiveBackground />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
