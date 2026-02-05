import { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import "../styles/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/api/projects`),
          fetch(`${API_BASE}/api/categories`),
        ]);

        if (!projectsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [projectsData, categoriesData] = await Promise.all([
          projectsRes.json(),
          categoriesRes.json(),
        ]);

        setProjects(projectsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
        setProjects([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => {
          const catId = p.category?._id || p.category;
          return String(catId) === String(activeCategory);
        });

  if (loading) {
    return (
      <section id="projects" className="projects-section">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-loading">Loading projects...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects-section">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-error">
          Unable to load projects. Make sure the API is running at{" "}
          <code>http://localhost:5000</code>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">
        Selected work across web and mobile.
      </p>

      {categories.length > 0 && (
        <div className="category-tabs">
          <button
            className={`category-tab ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`category-tab ${activeCategory === cat._id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat._id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      <div className="projects-container">
        {filteredProjects.length === 0 ? (
          <p className="projects-empty">No projects to display yet.</p>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const imageUrl = project.images?.[0]?.url || null;
  const link = project.link || project.repoUrl;

  const cardContent = (
    <>
      <div className="project-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.images[0]?.alt || project.title}
            className="project-image"
          />
        ) : (
          <div className="project-image-placeholder">No image</div>
        )}
      </div>
      <div className="project-content">
        {project.category?.name && (
          <span className="project-category">{project.category.name}</span>
        )}
        <h3 className="project-title">{project.title}</h3>
        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
        {(project.techStack?.length > 0 || project.additionalTools?.length > 0) && (
          <div className="project-tags">
            {[...(project.techStack || []), ...(project.additionalTools || [])].map(
              (tech, i) => (
                <span key={i} className="project-tag">
                  {tech}
                </span>
              )
            )}
          </div>
        )}
      </div>
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        className="project-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        {cardContent}
      </a>
    );
  }

  return <div className="project-card project-card-no-link">{cardContent}</div>;
}

export default Projects;
