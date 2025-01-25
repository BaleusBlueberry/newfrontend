import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContex";
import { AuthProvider } from "./context/AuthContex";
import { TownHallProvider } from "./context/TownHallContext";
import { COCProvider } from "./context/COCContext";

const root = document.getElementById("root")!;

// alt shift f (format code)
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <DarkModeProvider>
        <TownHallProvider>
          <COCProvider>
            <App />
          </COCProvider>
        </TownHallProvider>
      </DarkModeProvider>
    </AuthProvider>
  </BrowserRouter>
);
