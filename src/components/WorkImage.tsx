import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");

  const handleMouseEnter = async () => {
    if (!props.video) return;
    setIsVideo(true);
    const response = await fetch(`src/assets/${props.video}`);
    const blob = await response.blob();
    setVideo(URL.createObjectURL(blob));
  };

  const content = (
    <>
      {props.link && (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      )}
      <img
        src={props.image}
        alt={props.alt ?? ""}
        loading="eager"
        decoding="async"
        width={720}
        height={540}
      />
      {isVideo && <video src={video} autoPlay muted playsInline loop />}
    </>
  );

  return (
    <div className="work-image">
      {props.link ? (
        <a
          className="work-image-in"
          href={props.link}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          target="_blank"
          rel="noreferrer"
          data-cursor="disable"
        >
          {content}
        </a>
      ) : (
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
