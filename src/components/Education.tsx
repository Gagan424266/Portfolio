import { profile } from "../data/profile";
import "./styles/Education.css";

const Education = () => {
  const { education, skills } = profile;

  return (
    <div className="education-section section-container" id="education">
      <div className="education-container">
        <h2>
          Education <span>&</span> skills
        </h2>
        <div className="education-card">
          <div className="education-degree">
            <h4>{education.degree}</h4>
            <h5>{education.school}</h5>
            <p className="education-meta">
              {education.period} · {education.detail}
            </p>
          </div>
          <p className="education-coursework">
            <strong>Coursework:</strong> {education.coursework.join(" · ")}
          </p>
        </div>
        <div className="skills-grid">
          {(
            [
              ["Languages", skills.languages],
              ["Frontend", skills.frontend],
              ["Backend", skills.backend],
              ["Data & cloud", skills.data],
              ["Tools", skills.tools],
              ["Practices", skills.practices],
            ] as const
          ).map(([label, items]) => (
            <div className="skills-block" key={label}>
              <h4>{label}</h4>
              <div className="skills-tags">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="education-interests">
          <strong>Interests:</strong> {profile.interests.join(" · ")}
        </p>
      </div>
    </div>
  );
};

export default Education;
