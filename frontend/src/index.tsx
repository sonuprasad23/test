// frontend/src/index.tsx
import './index.css'; // Ensure Tailwind styles are imported
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
    console.error("Fatal Error: Root element with ID 'root' not found in index.html.");
    // Optionally display a message to the user in the body
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Application failed to load: Root element not found.</div>';
}