import "../styles/About.css";

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          A bit about my background and what I enjoy building.
        </p>

        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a software engineering student at Kisii University focused on building scalable web applications and backend systems. I enjoy developing solutions that solve real-world problems in areas like digital platforms, logistics, and agriculture technology. My main tools include React, Node.js, MongoDB, and cloud services.
            </p>
            <p>
              I love experimenting with frameworks like React, React Native, Node.js, and more. I also enjoy contributing to open-source projects and continuously improving my skills.
            </p>

            <a href="#contact" className="cta-button">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
