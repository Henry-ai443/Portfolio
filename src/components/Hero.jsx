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
            I am a passionate Software Engineer and graphics designer specializing in web and mobile development plus grpgics design. 
            I enjoy building sleek, modern applications and exploring new technologies to create innovative solutions.
          </p>
          <small><strong>Turning Code Into Constellations</strong></small>
          <p className="hero-subtitle">
            Full-Stack Developer | UI/UX Enthusiast (Figma) | 
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
