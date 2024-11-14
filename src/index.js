import { CustomFramework } from "../framework/CustomFramework.js";
import { App } from "./App.js";
import "./app.css"; // Import styles

/**
 * Function to re-render the application.
 */
function rerenderApp() {
    const rootElement = document.getElementById("root") || document.body;
    CustomFramework.render(CustomFramework.createElement(App, null), rootElement);
}

// Initial render
rerenderApp();

// Re-render on URL changes
window.addEventListener("popstate", rerenderApp);
