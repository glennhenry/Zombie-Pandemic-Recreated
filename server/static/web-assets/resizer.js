document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const resizer = document.getElementById("sidebar-resizer");
  if (!sidebar || !resizer) return;

  const MIN_WIDTH = 200;

  resizer.addEventListener("mousedown", e => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    const containerRight = sidebar.getBoundingClientRect().right;
    const newWidth = containerRight - e.clientX; // right edge stays fixed
    sidebar.style.width = Math.max(MIN_WIDTH, newWidth) + "px";
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
});
