document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggle-topbar-btn");
  const topbar = document.getElementById("topbar");

  btn?.addEventListener("click", () => {
    topbar?.classList.toggle("hidden");
  });
});
