import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config/api";
import "../styles/Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  console.log(project.short_description)

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/projects`).then(r => r.json()),
      fetch(`${API_BASE}/api/categories`).then(r => r.json()),
    ]).then(([projectsData, categoriesData]) => {
      setProjects(projectsData);
      setCategories(categoriesData);
    });
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter(p =>
          String(p.category?._id || p.category) === String(activeCategory)
        );

  useEffect(() => {
    setCurrentIndex(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [activeCategory]);

  const scrollTo = (index) => {
    const i = Math.max(0, Math.min(index, filteredProjects.length - 1));
    setCurrentIndex(i);
    scrollRef.current
      ?.querySelector(`[data-index="${i}"]`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">One project at a time. Focused.</p>

      <div className="category-tabs">
        <button
          className={`category-tab ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            className={`category-tab ${activeCategory === cat._id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 && (
        <div className="projects-carousel">
          <button
            className="projects-carousel-btn projects-carousel-btn-prev"
            onClick={() => scrollTo(currentIndex - 1)}
          >
            ‹
          </button>

          <div className="projects-carousel-viewport" ref={scrollRef}>
            <div className="projects-carousel-track">
              {filteredProjects.map((project, i) => (
                <article
                  key={project._id}
                  className="project-card"
                  data-index={i}
                >
                  <div className="project-image-container">
                    {project.images?.[0]?.url ? (
                      <img
                        src={project.images[0].url}
                        alt={project.title}
                        className="project-image"
                      />
                    ) : (
                      <div className="project-image-placeholder">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <h3 className="project-title" style={{color:"blue"}}>{project.title}</h3>
                    
                    {project.short_description && (
                      <p className="project-short-description">
                        {project.short_description}
                      </p>
                    )}

                    {(project.techStack?.length > 0 || project.additionalTools?.length > 0) && (
                      <div className="project-tech-stack">
                        <div className="project-tech-tags">
                          {project.techStack?.slice(0, 3).map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                          ))}
                          {project.additionalTools?.slice(0, 2).map((tool, i) => (
                            <span key={`tool-${i}`} className="tech-tag">{tool}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="project-links-container">
                      <Link
                        to={`/projects/${project.slug || project._id}`}
                        className="project-link"
                      >
                        View Project
                      </Link>

                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link github-link"
                        >
                          GitHub
                        </a>
                      )}

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link live-link"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            className="projects-carousel-btn projects-carousel-btn-next"
            onClick={() => scrollTo(currentIndex + 1)}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
