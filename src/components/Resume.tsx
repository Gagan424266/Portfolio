import { MdArrowOutward, MdDownload } from "react-icons/md";
import { profile } from "../data/profile";
import "./styles/Resume.css";

const Resume = () => {
  return (
    <section className="resume-section section-container" id="resume">
      <h2>
        My <span>Resume</span>
      </h2>
      <p className="resume-intro">
        Full-stack developer — React, Python, C++, and Django. Download or open
        the PDF below.
      </p>
      <div className="resume-actions">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="resume-btn resume-btn-primary"
          data-cursor="disable"
        >
          View PDF <MdArrowOutward />
        </a>
        <a
          href={profile.resumeUrl}
          download={profile.resumeFileName}
          className="resume-btn"
          data-cursor="disable"
        >
          Download <MdDownload />
        </a>
      </div>
      <div className="resume-preview">
        <iframe
          title="Gagan Yadav Resume"
          src={`${profile.resumeUrl}#view=FitH`}
          className="resume-iframe"
        />
      </div>
    </section>
  );
};

export default Resume;
