import "../styles/Contact.css";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get in Touch</h2>
      <p>I’d love to hear from you — reach out via any platform below.</p>
      <div className="contact-icons">
        <a href="mailto:your.email@example.com">
          <FaEnvelope />
        </a>
        <a href="https://github.com/Henry-ai443" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/engineer-henry" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://wa.me/254724356198" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
      </div>
    </section>
  );
}

export default Contact;
