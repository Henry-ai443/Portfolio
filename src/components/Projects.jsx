import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config/api";
import "../styles/Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  // Fetch projects and categories
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

  // Reset carousel index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const scrollToCard = (index) => {
    const i = Math.max(0, Math.min(index, filteredProjects.length - 1));
    setCurrentIndex(i);
    const el = scrollRef.current;
    if (el) {
      const card = el.querySelector(`[data-card-index="${i}"]`);
      card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  // Update currentIndex on manual scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.offsetWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.max(0, Math.min(index, filteredProjects.length - 1)));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [filteredProjects]);

  if (loading) {
    return (
      <section id="projects" className="projects-section">
        <h2 className="section-title">Projects</h2>
        <div className="projects-loading">Loading projects...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects-section">
        <h2 className="section-title">Projects</h2>
        <div className="projects-error">Unable to load projects.</div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">
        Browse by category, explore with focus.
      </p>

      {/* Category tabs */}
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

      {/* Carousel */}
      {filteredProjects.length === 0 ? (
        <p className="projects-empty">No projects in this category yet.</p>
      ) : (
        <div className="projects-carousel">
          <button
            type="button"
            className="projects-carousel-btn projects-carousel-btn-prev"
            onClick={() => scrollToCard(currentIndex - 1)}
            aria-label="Previous project"
          >
            ‹
          </button>

          <div className="projects-carousel-viewport" ref={scrollRef}>
            <div className="projects-carousel-track">
              {filteredProjects.map((project, index) => (
                <article
                  key={project._id}
                  className="project-card"
                  data-card-index={index}
                >
                  <div className="project-image-container">
                    {project.images?.[0]?.url ? (
                      <img
                        src={project.images[0].url}
                        alt={project.images[0]?.alt || project.title}
                        className="project-image"
                      />
                    ) : (
                      <div className="project-image-placeholder">
                        No image available
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>

                    {/* Internal detail page */}
                    <Link
                      to={`/projects/${project.slug || project._id}`}
                      className="project-link"
                    >
                      View project →
                    </Link>

                    {/* Live project external link */}
                    {project.link && (
                      <a
                        href={project.link}
                        className="project-link live-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live demo →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="projects-carousel-btn projects-carousel-btn-next"
            onClick={() => scrollToCard(currentIndex + 1)}
            aria-label="Next project"
          >
            ›
          </button>

          {/* Pagination dots */}
          <div className="projects-carousel-dots">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`projects-dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => scrollToCard(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
