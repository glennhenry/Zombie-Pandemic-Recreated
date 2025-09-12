document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("auth-form");
    const toggle = document.getElementById("toggle-auth");

    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const mode = form.dataset.mode === "login" ? "register" : "login";
        form.dataset.mode = mode;

        // Toggle visibility
        document.querySelectorAll(".login-only").forEach(el => {
            el.style.display = (mode === "login") ? "" : "none";
        });
        document.querySelectorAll(".register-only").forEach(el => {
            el.style.display = (mode === "register") ? "" : "none";
        });

        // Update toggle text
        toggle.textContent = (mode === "login") ? "Register" : "Login";
    });
});