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
      if (!flex || boxes.length < 2) {
        translateX = 0;
        return;
      }

      // Clear transform before measuring
      gsap.set(flex, { x: 0, clearProps: "transform" });
      void flex.offsetWidth;

      const last = boxes[boxes.length - 1] as HTMLElement;
      const lastRect = last.getBoundingClientRect();
      const viewport = window.innerWidth;
      // Scroll until the last card's right edge reaches the viewport (small pad)
      translateX = Math.max(0, Math.round(lastRect.right - viewport + 32));

      // Fallback if rect math fails (e.g. not laid out yet)
      if (translateX < 100) {
        const byScroll = flex.scrollWidth - viewport;
        translateX = Math.max(0, Math.round(byScroll));
      }
    }

    const buildScroll = () => {
      if (window.innerWidth <= 1024) {
        ScrollTrigger.getById("work")?.kill();
        gsap.set(".work-flex", { x: 0, clearProps: "transform" });
        return;
      }

      ScrollTrigger.getById("work")?.kill();
      setTranslateX();
      if (translateX <= 0) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${Math.max(translateX, 1)}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: "work",
          invalidateOnRefresh: true,
        },
      }).to(".work-flex", {
        x: () => -translateX,
        ease: "none",
      });
    };

    buildScroll();
    const onResize = () => {
      buildScroll();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const imgs = Array.from(
      document.querySelectorAll(".work-section img")
    ) as HTMLImageElement[];
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener(
          "load",
          () => {
            buildScroll();
            ScrollTrigger.refresh();
          },
          { once: true }
        );
      }
    });

    // Second pass after layout settles
    const t1 = window.setTimeout(onResize, 100);
    const t2 = window.setTimeout(onResize, 500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", onResize);
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
