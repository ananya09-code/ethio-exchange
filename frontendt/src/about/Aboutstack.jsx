import "./css/aboutstack.css";

const techStackData = {
  frontend: {
    title: "Frontend",
    icon: "fa-solid fa-desktop",
    languages: [{ name: "CSS", icon: "fa-brands fa-css3-alt" }],
    frameworks: [{ name: "React", icon: "fa-brands fa-react" }],
    tools: [{ name: "Vite", icon: "fa-solid fa-bolt-lightning" }]
  },
  backend: {
    title: "Backend",
    icon: "fa-solid fa-server",
    languages: [{ name: "Python", icon: "fa-brands fa-python" }],
    frameworks: [{ name: "FastAPI", icon: "fa-solid fa-bolt" }],
    tools: []
  },
  database: {
    title: "Database",
    icon: "fa-solid fa-database",
    languages: [],
    frameworks: [],
    tools: [{ name: "PostgreSQL (Neon)", icon: "fa-solid fa-database" }]
  },
  deployment: {
    title: "Deployment",
    icon: "fa-solid fa-cloud",
    languages: [],
    frameworks: [],
    tools: [
      { name: "Vercel", icon: "fa-solid fa-triangle-exclamation" },
      { name: "Render", icon: "fa-solid fa-cubes" }
    ]
  }
};

function Aboutstack() {
  return (
    <div className="stack-part">
      <h1 className="stack-title">Tech Stack</h1>

      <div className="stack-con">
        {Object.values(techStackData).map((section, index) => (
          <div className="stack-card" key={index}>
            <div className="stack-header">
              <i className={section.icon}></i>
              <h2>{section.title}</h2>
            </div>

            {section.languages.length > 0 && (
              <>
                <h3>Languages</h3>
                <div className="tech-list">
                  {section.languages.map((item, i) => (
                    <span className="tech-badge" key={i}>
                      <i className={item.icon}></i>
                      {item.name}
                    </span>
                  ))}
                </div>
              </>
            )}

            {section.frameworks.length > 0 && (
              <>
                <h3>Frameworks</h3>
                <div className="tech-list">
                  {section.frameworks.map((item, i) => (
                    <span className="tech-badge" key={i}>
                      <i className={item.icon}></i>
                      {item.name}
                    </span>
                  ))}
                </div>
              </>
            )}

            {section.tools.length > 0 && (
              <>
                <h3>Tools</h3>
                <div className="tech-list">
                  {section.tools.map((item, i) => (
                    <span className="tech-badge" key={i}>
                      <i className={item.icon}></i>
                      {item.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Aboutstack;