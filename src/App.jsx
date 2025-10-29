import './App.css';

import NavigationBar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <NavigationBar />
      <div className="full-width-container text-center mt-5">
        <Hero />
        <About />
        <Skills />
        <Projects/>
        <Contact/>
        <Footer/>
      </div>
    </>
  );
}

export default App;
