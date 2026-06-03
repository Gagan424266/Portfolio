/** Resolve public asset paths for GitHub Pages base (/Portfolio/). */
export const assetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
};
