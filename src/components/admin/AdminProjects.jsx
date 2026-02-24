import { useState, useEffect } from "react";
import { API_BASE } from "../../config/api";
import { authHeaders, handleAuthResponse } from "../../lib/auth";
import "./Admin.css";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(getEmptyForm());

  function getEmptyForm() {
    return {
      title: "",
      description: "",
      category: "",
      link: "",
      repoUrl: "",
      techStack: "",
      additionalTools: "",
      featured: false,
      order: 0,
      imageUrls: "",
      imageFiles: null,
    };
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, catRes] = await Promise.all([
        fetch(`${API_BASE}/api/projects`),
        fetch(`${API_BASE}/api/categories`),
      ]);
      if (!projRes.ok || !catRes.ok) throw new Error("Failed to fetch");
      const [projData, catData] = await Promise.all([projRes.json(), catRes.json()]);
      setProjects(projData);
      setCategories(catData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData(getEmptyForm());
    setShowForm(true);
  };

  const openEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      category: project.category?._id || project.category || "",
      link: project.link || "",
      repoUrl: project.repoUrl || "",
      techStack: Array.isArray(project.techStack) ? project.techStack.join(", ") : "",
      additionalTools: Array.isArray(project.additionalTools) ? project.additionalTools.join(", ") : "",
      featured: !!project.featured,
      order: project.order || 0,
      imageUrls: (project.images || []).map((i) => i.url).join("\n"),
      imageFiles: null,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(getEmptyForm());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageFiles = (e) => {
    setFormData((prev) => ({ ...prev, imageFiles: e.target.files || null }));
  };

  const parseList = (str) =>
    str
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const categoryId = formData.category.trim();
      if (!categoryId) {
        setError("Please select a category.");
        setSaving(false);
        return;
      }

      const techStack = parseList(formData.techStack);
      const additionalTools = parseList(formData.additionalTools);
      const order = parseInt(formData.order, 10) || 0;

      if (editingId) {
        const images = formData.imageUrls
          ? parseList(formData.imageUrls).map((url) => ({ url, alt: "" }))
          : [];
        const res = await fetch(`${API_BASE}/api/projects/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
          },
          body: JSON.stringify({
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: categoryId,
            link: formData.link.trim(),
            repoUrl: formData.repoUrl.trim(),
            techStack,
            additionalTools,
            featured: formData.featured,
            order,
            images,
          }),
        });
        handleAuthResponse(res);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || res.statusText);
        }
      } else {
        const form = new FormData();
        form.append("title", formData.title.trim());
        form.append("description", formData.description.trim());
        form.append("category", categoryId);
        form.append("link", formData.link.trim());
        form.append("repoUrl", formData.repoUrl.trim());
        form.append("techStack", JSON.stringify(techStack));
        form.append("additionalTools", JSON.stringify(additionalTools));
        form.append("featured", formData.featured);
        form.append("order", order);
        if (formData.imageUrls) {
          form.append("imageUrls", JSON.stringify(parseList(formData.imageUrls).map((url) => ({ url, alt: "" }))));
        }
        if (formData.imageFiles?.length) {
          for (let i = 0; i < formData.imageFiles.length; i++) {
            form.append("images", formData.imageFiles[i]);
          }
        }
        const res = await fetch(`${API_BASE}/api/projects`, {
          method: "POST",
          headers: authHeaders(),
          body: form,
        });
        handleAuthResponse(res);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || res.statusText);
        }
      }
      closeForm();
      await fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, { method: "DELETE", headers: authHeaders() });
      handleAuthResponse(res);
      if (!res.ok) throw new Error("Delete failed");
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="admin-loading">Loading projects…</div>;
  if (error && !showForm) return <div className="admin-error">Error: {error}</div>;

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Projects</h2>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openCreate}>
          Add project
        </button>
      </div>

      {error && showForm && <p className="admin-error">{error}</p>}

      {showForm && (
        <div className="admin-form-card">
          <h3>{editingId ? "Edit project" : "New project"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <label>Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Project name"
              />

              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Short description for the portfolio"
              />

              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>

              <label>Live link</label>
              <input
                name="link"
                type="url"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://..."
              />

              <label>Repo / source URL</label>
              <input
                name="repoUrl"
                type="url"
                value={formData.repoUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />

              <label>Tech stack (comma or newline)</label>
              <input
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
              />

              <label>Additional tools (comma or newline)</label>
              <input
                name="additionalTools"
                value={formData.additionalTools}
                onChange={handleChange}
                placeholder="Figma, Vercel"
              />

              <label>Order (number)</label>
              <input
                name="order"
                type="number"
                value={formData.order}
                onChange={handleChange}
              />

              <label className="admin-checkbox-label">
                <input
                  name="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Featured
              </label>

              {!editingId && (
                <>
                  <label>Upload images</label>
                  <input type="file" accept="image/*" multiple onChange={handleImageFiles} />
                </>
              )}

              <label>Image URLs (one per line, or comma-separated)</label>
              <textarea
                name="imageUrls"
                value={formData.imageUrls}
                onChange={handleChange}
                rows={3}
                placeholder="https://res.cloudinary.com/... or paste URLs"
              />
            </div>
            <div className="admin-form-actions">
              <button type="button" className="admin-btn admin-btn-ghost" onClick={closeForm}>
                Cancel
              </button>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? "Saving…" : editingId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Link</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5}>No projects yet. Add one above.</td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.category?.name || "—"}</td>
                  <td>
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer">Link</a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{p.order}</td>
                  <td>
                    <button type="button" className="admin-btn admin-btn-sm" onClick={() => openEdit(p)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-danger"
                      onClick={() => handleDelete(p._id)}
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
