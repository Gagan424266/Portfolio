/** Resolve public asset paths from Vite BASE_URL (site root on Cloudflare). */
export const assetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
};
