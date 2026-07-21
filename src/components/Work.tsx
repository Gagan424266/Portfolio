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
    let built = false;

    function setTranslateX() {
      const flex = document.querySelector(".work-flex") as HTMLElement | null;
      const boxes = document.getElementsByClassName("work-box");
      if (!flex || boxes.length < 2) {
        translateX = 0;
        return;
      }

      const prevX = Number(gsap.getProperty(flex, "x")) || 0;
      gsap.set(flex, { x: 0 });
      void flex.offsetWidth;

      const last = boxes[boxes.length - 1] as HTMLElement;
      const lastRect = last.getBoundingClientRect();
      const viewport = window.innerWidth;
      translateX = Math.max(0, Math.round(lastRect.right - viewport + 32));

      if (translateX < 100) {
        translateX = Math.max(0, Math.round(flex.scrollWidth - viewport));
      }

      // Restore progress position if we were mid-scroll
      gsap.set(flex, { x: prevX });
    }

    function buildScroll(force = false) {
      if (window.innerWidth <= 1024) {
        ScrollTrigger.getById("work")?.kill();
        gsap.set(".work-flex", { x: 0 });
        built = false;
        return;
      }

      setTranslateX();
      if (translateX <= 0) return;

      const existing = ScrollTrigger.getById("work");
      if (existing && !force) {
        // Update end distance without tearing down pin (avoids hitch)
        existing.vars.end = `+=${translateX}`;
        existing.refresh();
        return;
      }

      existing?.kill();
      built = true;

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
          fastScrollEnd: true,
        },
      }).to(".work-flex", {
        x: () => -translateX,
        ease: "none",
        force3D: true,
      });
    }

    // Eager-decode project covers before first pin (lazy load caused first-scroll jank)
    const imgs = Array.from(
      document.querySelectorAll(".work-section img")
    ) as HTMLImageElement[];
    imgs.forEach((img) => {
      img.loading = "eager";
      img.decode?.().catch(() => undefined);
    });

    buildScroll(true);

    let resizeTimer: number | null = null;
    const onResize = () => {
      if (resizeTimer != null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        buildScroll(true);
        ScrollTrigger.refresh();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    // Single rebuild after all images settle — not once per image
    Promise.all(
      imgs.map((img) =>
        img.decode
          ? img.decode().catch(() => undefined)
          : img.complete
            ? Promise.resolve()
            : new Promise<void>((res) => {
                img.addEventListener("load", () => res(), { once: true });
                img.addEventListener("error", () => res(), { once: true });
              })
      )
    ).then(() => {
      buildScroll(true);
      ScrollTrigger.refresh();
    });

    return () => {
      if (resizeTimer != null) window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getById("work")?.kill();
      void built;
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
