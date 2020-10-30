export function loadScript(url = "", callback = () => {}) {
  if (url) {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    document.body.appendChild(script);
    script.onload = callback;
  }
}
