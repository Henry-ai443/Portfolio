import "../styles/About.css";

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="about-content">

          <div className="about-text">
            <p>
              I’m a passionate Software Engineer and graphics designer specializing in web and mobile development. I enjoy building sleek, modern applications and exploring new technologies to create innovative solutions.
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
