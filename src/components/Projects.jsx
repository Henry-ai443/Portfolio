import "../styles/Projects.css";
import project1Img from "../assets/project1.png";
import project2Img from "../assets/project2.png";

const projects = [
  {
    title: "General Conference Youth Portal",
    image: project1Img,
    link: "https://generalconferenceyouthportal.vercel.app/"
  },
  {
    title: "Terra Smart",
    image: project2Img,
    link: "https://terrasmart.vercel.app/"
  },
  // Add more projects here by importing them above
];

function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">My Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <a
            href={project.link}
            key={index}
            className="project-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="project-image-container">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            </div>
            <h3 className="project-title">{project.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Projects;
