import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { LaundryProvider } from "./context/LaundryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <LaundryProvider>
          <App />
        </LaundryProvider>
      </BrowserRouter>
    </NextUIProvider>
  </StrictMode>
);
