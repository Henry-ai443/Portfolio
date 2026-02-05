import { useState } from "react";
import { FaHome, FaUser, FaCode, FaFolderOpen, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

// Public nav only — no login or admin link. Visitors never see a sign-in.
function NavigationBar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  return (
    <>
      {/* Top Navbar */}
      <nav className="top-navbar glass">
        <a href="#home" className="navbar-brand">Engineer Henry</a>
        <button type="button" className="menu-icon" onClick={toggleSidebar} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`} role="navigation">
        <NavLink href="#home" icon={<FaHome />} onClick={toggleSidebar}>
          Home
        </NavLink>
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
