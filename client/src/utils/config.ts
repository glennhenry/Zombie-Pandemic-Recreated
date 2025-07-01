export const BASE_URL = import.meta.env.PROD
  ? window.location.origin
  : "http://localhost:8080"; // Ktor server
