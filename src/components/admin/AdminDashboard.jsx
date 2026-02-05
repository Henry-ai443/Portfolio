import { useState } from "react";
import { Link } from "react-router-dom";
import AdminProjects from "./AdminProjects";
import AdminCategories from "./AdminCategories";
import "./Admin.css";

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "categories", label: "Categories" },
];

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState("projects");

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-inner">
          <h1 className="admin-logo">Portfolio Admin <span className="admin-badge">Maintainer</span></h1>
          <div className="admin-header-actions">
            <Link to="/" className="admin-btn admin-btn-ghost">View public site</Link>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`admin-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="admin-main">
        {tab === "projects" && <AdminProjects />}
        {tab === "categories" && <AdminCategories />}
      </main>
    </div>
  );
}
