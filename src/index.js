import { CustomFramework } from '../framework/CustomFramework.js';
import { App } from './App.js';
import './app.css'; // Імпорт стилів

function rerenderApp() {
    const rootElement = document.getElementById("root") || document.body;
    CustomFramework.render(<App />, rootElement);
}

rerenderApp();

window.addEventListener("popstate", rerenderApp);
