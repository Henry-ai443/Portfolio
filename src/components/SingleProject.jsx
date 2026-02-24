import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE } from "../config/api";
import "../styles/SingleProject.css";

export default function SingleProject() {
  const { id } = useParams();
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
        <Link to="/" className="back-link">← Back to Projects</Link>
        <h2>Error</h2>
        <p>{error || "Project not found"}</p>
      </section>
    );
  }

  // Split description into paragraphs (by double newlines or manually split)
  const descriptionParagraphs = project.description
    ? project.description.split("\n\n").filter(p => p.trim())
    : [];

  return (
    <section className="single-project-section">
      <Link to="/" className="back-link">← Back to Projects</Link>

      <div className="project-container">
        {/* Image Gallery */}
        <div className="project-images">
          {project.images && project.images.length > 0 ? (
            project.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt || project.title}
                className="project-image"
              />
            ))
          ) : (
            <div className="project-image-placeholder">No images available</div>
          )}
        </div>

        {/* Content Section */}
        <div className="project-content">
          {/* Title */}
          <h1 className="project-title">{project.title}</h1>

          {/* Description */}
          {descriptionParagraphs.length > 0 && (
            <div className="project-description">
              {descriptionParagraphs.map((para, idx) => (
                <p key={idx} className="description-paragraph">
                  {para.trim()}
                </p>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          {(project.techStack?.length > 0 || project.additionalTools?.length > 0) && (
            <div className="project-tags-section">
              <h3>Technologies & Tools</h3>
              <ul className="project-tags-list">
                {project.techStack?.map((tech, i) => (
                  <li key={i} className="project-tag">{tech}</li>
                ))}
                {project.additionalTools?.map((tool, i) => (
                  <li key={`tool-${i}`} className="project-tag">{tool}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="project-links">
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                className="project-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View repository →
              </a>
            )}
            {project.link && (
              <a 
                href={project.link} 
                className="project-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Live demo →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
