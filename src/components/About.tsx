import { profile } from "../data/profile";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{profile.about}</p>
        <p className="para about-meta">
          {profile.location} · {profile.title}
        </p>
      </div>
    </div>
  );
};

export default About;
