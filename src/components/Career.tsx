import { profile } from "../data/profile";
import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {profile.experience.map((job, index) => (
            <div className="career-info-box" key={job.company}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{job.role}</h4>
                  <h5>
                    {job.company} · {job.location}
                  </h5>
                </div>
                <h3>{index === 0 ? job.periodShort : job.periodShort}</h3>
              </div>
              <div className="career-summary">
                <p className="career-period">{job.period}</p>
                <ul>
                  {job.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
