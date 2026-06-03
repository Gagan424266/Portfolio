import { useEffect } from "react";
import { useLoading } from "../../context/LoadingProvider";
import Scene from "./Scene";

const isDesktop3D = () =>
  typeof window !== "undefined" && window.innerWidth > 1024;

const CharacterModel = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!isDesktop3D()) {
      setLoading(100);
    }
  }, [setLoading]);

  if (!isDesktop3D()) return null;

  return <Scene />;
};

export default CharacterModel;
