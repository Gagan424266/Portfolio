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

    /** Layout-based distance — does not zero the transform (avoids mid-pin flash). */
    function setTranslateX() {
      const flex = document.querySelector(".work-flex") as HTMLElement | null;
      const boxes = document.getElementsByClassName("work-box");
      if (!flex || boxes.length < 1) {
        translateX = 0;
        return;
      }

      const padL = parseFloat(getComputedStyle(flex).paddingLeft) || 0;
      let contentW = padL;
      for (let i = 0; i < boxes.length; i++) {
        contentW += (boxes[i] as HTMLElement).offsetWidth;
      }
      // Small pad so the last card fully clears the right edge
      translateX = Math.max(0, Math.round(contentW - window.innerWidth + 24));
    }

    function buildScroll(force = false) {
      if (window.innerWidth <= 1024) {
        ScrollTrigger.getById("work")?.kill();
        gsap.set(".work-flex", { clearProps: "transform" });
        return;
      }

      setTranslateX();
      if (translateX <= 0) return;

      const existing = ScrollTrigger.getById("work");
      if (existing && !force) {
        existing.vars.end = `+=${translateX}`;
        const tween = existing.animation;
        if (tween) {
          gsap.set(".work-flex", {
            x: () => -translateX * (existing.progress || 0),
          });
        }
        existing.refresh();
        return;
      }

      existing?.kill();

      gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${Math.max(translateX, 1)}`,
          scrub: 0.35,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: "work",
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      }).to(".work-flex", {
        x: () => -translateX,
        ease: "none",
      });
    }

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
      }, 150);
    };
    window.addEventListener("resize", onResize);

    // Soft update after images settle — keep pin alive, only recalc distance
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
      buildScroll(false);
      ScrollTrigger.refresh();
    });

    return () => {
      if (resizeTimer != null) window.clearTimeout(resizeTimer);
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
