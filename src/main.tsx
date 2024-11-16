import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContex";
import { AuthProvider } from "./context/AuthContex";

const root = document.getElementById("root")!;

// alt shift f (format code)
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </AuthProvider>
  </BrowserRouter>
);
