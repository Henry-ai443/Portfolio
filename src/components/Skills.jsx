import { useState, useRef, useEffect } from "react";
import "../styles/Skills.css";

const ICON_CDN = "https://cdn.simpleicons.org";

const skillCards = [
  {
    id: "languages",
    title: "Languages",
    items: [
      { name: "JavaScript", color: "#F7DF1E", textColor: "#000", badge: true, icon: "javascript", description: "Scripting language for web and server-side logic." },
      { name: "Node.js", color: "#339933", badge: true, icon: "nodedotjs", description: "JavaScript runtime for building fast, scalable backends." },
      { name: "Python", color: "#3776AB", badge: true, icon: "python", description: "General-purpose language for backend, data, and automation." },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    items: [
      { name: "MongoDB", color: "#47A248", badge: true, icon: "mongodb", description: "NoSQL document database for flexible, scalable data." },
      { name: "MySQL", color: "#4479A1", badge: true, icon: "mysql", description: "Relational database for structured data and complex queries." },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { name: "JavaScript", color: "#F7DF1E", textColor: "#000", icon: "javascript", description: "Powers interactivity and dynamic UIs in the browser." },
      { name: "HTML5", color: "#E34F26", icon: "html5", description: "Markup and structure for web pages and apps." },
      { name: "CSS3", color: "#1572B6", icon: "css3", description: "Styling, layout, and responsive design." },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { name: "Node.js", color: "#339933", icon: "nodedotjs", description: "Server-side JavaScript with Express and REST APIs." },
      { name: "Python", color: "#3776AB", icon: "python", description: "Backend logic with Django, Flask, and scripting." },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    items: [
      { name: "React", color: "#61DAFB", textColor: "#000", badge: true, icon: "react", description: "Library for building component-based UIs and SPAs." },
      { name: "React Native", color: "#61DAFB", textColor: "#000", badge: true, icon: "react", description: "Cross-platform mobile apps with React and native code." },
      { name: "Django REST Framework", color: "#092E20", badge: true, icon: "django", description: "REST APIs and backend logic with Django and DRF." },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      { name: "Figma", color: "#F24E1E", icon: "figma", description: "UI/UX design, prototypes, and handoff to development." },
      { name: "Canva", color: "#00C4CC", icon: "canva", description: "Graphics and visual content for branding and marketing." },
      { name: "Git", color: "#F05032", icon: "git", description: "Version control and collaboration on code." },
      { name: "GitHub", color: "#181717", icon: "github", description: "Hosting repos, code review, and project management." },
    ],
  },
];

function SkillLogo({ icon, color, name }) {
  const url = `${ICON_CDN}/${icon}/${color.replace("#", "")}`;
  return (
    <img
      src={url}
      alt=""
      className="skills-badge-icon"
      width={20}
      height={20}
      loading="lazy"
    />
  );
}

export default function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const scrollToCard = (index) => {
    const i = Math.max(0, Math.min(index, skillCards.length - 1));
    setCurrentIndex(i);
    const el = scrollRef.current;
    if (el) {
      const card = el.querySelector(`[data-card-index="${i}"]`);
      card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.offsetWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.max(0, Math.min(index, skillCards.length - 1)));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="skills">
      <h2 className="section-title">Tech Stack</h2>
      <p className="section-subtitle">
        Languages, frameworks, databases, and tools I work with.
      </p>

      <div className="skills-carousel">
        <button
          type="button"
          className="skills-carousel-btn skills-carousel-btn-prev"
          onClick={() => scrollToCard(currentIndex - 1)}
          aria-label="Previous card"
        >
          ‹
        </button>

        <div className="skills-carousel-viewport" ref={scrollRef}>
          <div className="skills-carousel-track">
            {skillCards.map((card, index) => (
              <article
                key={card.id}
                className="skills-card"
                data-card-index={index}
              >
                <h3 className="skills-card-title">{card.title}</h3>
                <div className="skills-card-badges">
                  {card.items.map((item, i) => (
                    <span
                      key={i}
                      className={`skills-badge ${item.badge ? "skills-badge-highlight" : ""}`}
                      style={{
                        backgroundColor: item.color,
                        color: item.textColor || "#fff",
                      }}
                    >
                      {item.icon && (
                        <SkillLogo
                          icon={item.icon}
                          color={item.textColor ? "#000" : "#fff"}
                        />
                      )}
                      <span className="skills-badge-text">{item.name}</span>
                    </span>
                  ))}
                </div>
                <dl className="skills-card-descriptions">
                  {card.items.map((item, i) => (
                    <div key={i} className="skills-desc-item">
                      <dt className="skills-desc-name">{item.name}</dt>
                      <dd className="skills-desc-text">{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="skills-carousel-btn skills-carousel-btn-next"
          onClick={() => scrollToCard(currentIndex + 1)}
          aria-label="Next card"
        >
          ›
        </button>
      </div>

      <div className="skills-carousel-dots">
        {skillCards.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`skills-dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => scrollToCard(index)}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
