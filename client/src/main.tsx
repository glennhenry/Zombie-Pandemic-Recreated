import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BASE_URL } from "./utils/config.ts";
import { Network } from "./network/Network.ts";

const validPaths = ["/", "/play"];

Network.init(BASE_URL);

if (!validPaths.includes(window.location.pathname)) {
  window.location.href = "/404.html";
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
