import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE } from "../config/api";
import "../styles/SingleProject.css";

export default function SingleProject() {
  const { id } = useParams(); // project ID or slug
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/projects/${id}`);
        if (!res.ok) throw new Error("Project not found");
        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <section className="single-project-section">
        <h2>Loading project...</h2>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="single-project-section">
        <h2>Error</h2>
        <p>{error || "Project not found"}</p>
        <Link to="/" className="back-link">← Back to Projects</Link>
      </section>
    );
  }

  return (
    <section className="single-project-section">
      <Link to="/" className="back-link">← Back to Projects</Link>

      <div className="project-images">
        {project.images?.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt || project.title}
            className="project-image"
          />
        ))}
      </div>

      <div className="project-info">
        <h2 className="project-title">{project.title}</h2>

        {project.description && (
          <div className="project-description">
            <h3>Description</h3>
            <p>{project.description}</p>
          </div>
        )}

        {(project.techStack?.length > 0 || project.additionalTools?.length > 0) && (
          <div className="project-tags-section">
            <h3 style={{color: "#0c1121"}}>Technologies & Tools</h3>
            <ul className="project-tags-list">
              {project.techStack?.map((tech, i) => (
                <li key={i} className="project-tag" style={{color:"black"}}>{tech}</li>
              ))}
              {project.additionalTools?.map((tool, i) => (
                <li key={`tool-${i}`} className="project-tag">{tool}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="project-links">
          {project.repoUrl && (
            <a href={project.repoUrl} className="project-link" target="_blank" rel="noopener noreferrer">
              View repository →
            </a>
          )}
          {project.link && (
            <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
              Live demo →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
