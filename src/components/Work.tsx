import { profile } from "../data/profile";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  useGSAP(() => {
    if (window.innerWidth <= 1024) return;

    let translateX = 0;

    function setTranslateX() {
      const flex = document.querySelector(".work-flex") as HTMLElement | null;
      const boxes = document.getElementsByClassName("work-box");
      if (!flex || !boxes.length) return;

      // Measure with transform cleared so offsetLeft is accurate
      gsap.set(flex, { x: 0 });

      const last = boxes[boxes.length - 1] as HTMLElement;
      const lastRight = last.offsetLeft + last.offsetWidth;
      const viewport = window.innerWidth;
      // End as soon as the last card is fully in view — no trailing empty strip
      const endPad = 24;
      translateX = Math.max(0, Math.ceil(lastRight - viewport + endPad));
    }

    const buildScroll = () => {
      ScrollTrigger.getById("work")?.kill();
      setTranslateX();
      if (translateX <= 0) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${translateX}`,
          scrub: 0.45,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: "work",
          invalidateOnRefresh: true,
        },
      }).to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    };

    buildScroll();
    window.addEventListener("resize", buildScroll);

    // Recalc after project images load (height/width can shift scroll distance)
    const imgs = Array.from(document.querySelectorAll(".work-section img"));
    const onImg = () => {
      buildScroll();
      ScrollTrigger.refresh();
    };
    imgs.forEach((img) => {
      if (!(img as HTMLImageElement).complete) {
        img.addEventListener("load", onImg, { once: true });
      }
    });
    requestAnimationFrame(() => {
      buildScroll();
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("resize", buildScroll);
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container">
        <h2 className="work-heading">
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {profile.projects.map((project, index) => (
            <div className="work-box" key={project.title}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{String(index + 1).padStart(2, "0")}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                {("liveUrl" in project || "githubUrl" in project) && (
                  <div className="work-links">
                    {"liveUrl" in project && project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live demo
                      </a>
                    )}
                    {"githubUrl" in project && project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
