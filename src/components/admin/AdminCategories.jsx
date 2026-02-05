import { useState, useEffect } from "react";
import { API_BASE } from "../../config/api";
import { authHeaders, handleAuthResponse } from "../../lib/auth";
import "./Admin.css";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ name }),
      });
      handleAuthResponse(res);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || res.statusText);
      }
      setNewName("");
      await fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category? Projects using it may break.")) return;
    try {
      const res = await fetch(`${API_BASE}/api/categories/${id}`, { method: "DELETE", headers: authHeaders() });
      handleAuthResponse(res);
      if (!res.ok) throw new Error("Delete failed");
      await fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="admin-loading">Loading categories…</div>;

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Categories</h2>
      </div>
      <p className="admin-section-desc">
        Create categories (e.g. Web Apps, Mobile) and assign them to projects.
      </p>

      {error && <p className="admin-error">{error}</p>}

      <form className="admin-inline-form" onSubmit={handleCreate}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Category name (e.g. Web Applications)"
          disabled={saving}
        />
        <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || !newName.trim()}>
          {saving ? "Adding…" : "Add category"}
        </button>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3}>No categories. Add one above.</td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td><code>{c.slug}</code></td>
                  <td>
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-danger"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
