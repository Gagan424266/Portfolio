/** Native scroll helpers (replaces ScrollSmoother for production compatibility). */

export function scrollToSection(selector: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function enablePageScroll() {
  document.body.style.overflowY = "auto";
  window.scrollTo(0, 0);
}
