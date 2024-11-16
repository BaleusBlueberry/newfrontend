import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Products from "./routes/Products";
import NotFound from "./routes/NotFound";
import Navbar from "./components/Navbar";
import {
  ProtectedRoute,
  ProtectedIfLoggedInRoute,
} from "./components/ProtectedRoute";

export const App = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const mode = import.meta.env.VITE_MODE;
  console.log(`${url} mode: ${mode}`);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/register"
          element={
            <ProtectedIfLoggedInRoute>
              <Register />
            </ProtectedIfLoggedInRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <ProtectedIfLoggedInRoute>
              <Login />
            </ProtectedIfLoggedInRoute>
          }
        ></Route>
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
