import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Google Fonts
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap";
document.head.appendChild(link);

// Add Font Awesome
const fontAwesome = document.createElement("link");
fontAwesome.rel = "stylesheet";
fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
document.head.appendChild(fontAwesome);

// Add Bootstrap 5
const bootstrap = document.createElement("link");
bootstrap.rel = "stylesheet";
bootstrap.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
document.head.appendChild(bootstrap);

// Add Bootstrap JS with proper async loading
const bootstrapScript = document.createElement("script");
bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
bootstrapScript.async = false;
bootstrapScript.defer = true;
bootstrapScript.onload = () => {
  console.log("Bootstrap JS loaded successfully");
};
document.head.appendChild(bootstrapScript);

// Set page title
document.title = "Professional Website Template";

createRoot(document.getElementById("root")!).render(<App />);
