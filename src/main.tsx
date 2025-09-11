import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeProvider";

import { registerSW } from "virtual:pwa-register";

// register service worker
registerSW({
  onOfflineReady() {
    console.log("App ready offline!");
  },
  onNeedRefresh() {
    console.log("New version available, refresh to update.");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
