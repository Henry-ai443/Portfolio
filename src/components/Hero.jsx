import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-image">
          <img src="/Henry.jpg" alt="Henry" />
        </div>

        <div className="hero-text">
          <h1 className="hero-title">Hi, I’m Engineer Henry</h1>
          <p className="hero-intro">
            I'm a Software Engineer focused on web , systems engineering and mobile development .
            I build clean, scalable applications and enjoy turning ideas into polished products.
          </p>
          <span className="hero-tagline">Turning Code Into Constellations</span>
          <p className="hero-subtitle">
            Full-Stack Developer · UI/UX (Figma)
          </p>
          <a href="#projects" className="cta-button">
            See My Work
          </a>
        </div>
      </div>

      <div className="floating-shapes">
        <span className="shape shape1"></span>
        <span className="shape shape2"></span>
        <span className="shape shape3"></span>
      </div>
    </section>
  );
}

export default Hero;
