import "../styles/Skills.css";

const techStack = [
  { name: "Python", color: "#3776AB" },
  { name: "JavaScript", color: "#F7DF1E", textColor: "#000" },
  { name: "PHP", color: "#777BB4" },
  { name: "HTML5", color: "#E34F26" },
  { name: "CSS3", color: "#1572B6" },
  { name: "Django", color: "#092E20" },
  { name: "Flask", color: "#000000" },
  { name: "Bootstrap", color: "#7952B3" },
  { name: "jQuery", color: "#0769AD" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "Node.js", color: "#339933" },
  { name: "React", color: "#61DAFB", textColor: "#000" },
  { name: "Vue.js", color: "#4FC08D", textColor: "#000" },
  { name: "Express.js", color: "#404D59" },
  { name: "MySQL", color: "#4479A1" },
  { name: "MariaDB", color: "#003545" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "SQLite", color: "#003B57" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Git", color: "#F05032" },
  { name: "GitHub", color: "#181717" },
  { name: "VS Code", color: "#007ACC" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Postman", color: "#FF6C37" },
  { name: "XAMPP", color: "#FB7A24" },
  { name: "Netlify", color: "#00C7B7" },
  { name: "Linux", color: "#FCC624", textColor: "#000" },
  { name: "Windows", color: "#0078D6" },
  { name: "Kali Linux", color: "#557C94" },
  { name: "Ubuntu", color: "#E95420" },
];

export default function Skills() {
  return (
    <section id="skills">
      <h2 className="section-title">🛠️ Tech Stack</h2>
      <div className="skills-track-wrapper">
        <div className="skills-track">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="skill-badge"
              style={{ backgroundColor: tech.color, color: tech.textColor || "#fff" }}
            >
              {tech.name}
            </span>
          ))}
          {/* Duplicate once for smooth infinite scroll */}
          {techStack.map((tech, index) => (
            <span
              key={"dup-" + index}
              className="skill-badge"
              style={{ backgroundColor: tech.color, color: tech.textColor || "#fff" }}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
