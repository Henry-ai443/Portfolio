import { useState } from "react";
import { FaUser, FaCode, FaFolderOpen, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

function NavigationBar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  return (
    <>
      {/* Top Navbar */}
      <nav className="top-navbar glass">
        <div className="navbar-brand">Nova Works Softwares</div>
        <div className="menu-icon" onClick={toggleSidebar}>
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <NavLink href="#about" icon={<FaUser />} onClick={toggleSidebar}>
          About
        </NavLink>
        <NavLink href="#skills" icon={<FaCode />} onClick={toggleSidebar}>
          Skills
        </NavLink>
        <NavLink href="#projects" icon={<FaFolderOpen />} onClick={toggleSidebar}>
          Projects
        </NavLink>
        <NavLink href="#contact" icon={<FaEnvelope />} onClick={toggleSidebar}>
          Contact
        </NavLink>
      </div>

      {/* Overlay */}
      {open && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

// Reusable nav link component
const NavLink = ({ href, icon, children, onClick }) => (
  <a href={href} className="sidebar-link" onClick={onClick}>
    {icon} <span>{children}</span>
  </a>
);

export default NavigationBar;
