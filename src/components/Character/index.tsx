import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingProvider";
import Scene from "./Scene";

const CharacterModel = () => {
  const { setLoading } = useLoading();
  const [show3D, setShow3D] = useState(
    () => typeof window !== "undefined" && window.innerWidth > 1024
  );

  useEffect(() => {
    const onResize = () => setShow3D(window.innerWidth > 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!show3D) {
      setLoading(100);
    }
  }, [show3D, setLoading]);

  if (!show3D) return null;

  return <Scene />;
};

export default CharacterModel;
