import "../styles/Footer.css";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer glass text-center">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Engineer Henry. All rights reserved.</p>
        <div className="footer-icons">
          <a href="https://github.com/EngineerHenry" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/engineer-henry" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://wa.me/254724356198" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
