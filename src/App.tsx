import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import NotFound from "./routes/NotFound";
import Navbar from "./components/Navbar";
import {
  ProtectedRoute,
  ProtectedIfLoggedInRoute,
  ProtectedIfNotLoggedInRoute,
} from "./components/ProtectedRoute";
import Townhalls from "./routes/TownHalls/TownHalls";
import { TownHallBuildings } from "./routes/TownHalls/TownHallBuildings";
import TownhallEditOrAdd from "./routes/TownHalls/TownhallEditOrAdd";
import { BuildingTypesPage } from "./routes/buildingTypes/BuildingTypesPage";
import ResourceBuildingEditOrAdd from "./routes/buildingTypes/ResourceBuildingEditOrAdd";
import ArmyBuildingEditOrAdd from "./routes/buildingTypes/ArmyBuildingEditOrAdd";
import DefensiveBuildingEditOrAdd from "./routes/buildingTypes/DefensiveBuildingEditORAdd";
import TrapBuildingEditOrAdd from "./routes/buildingTypes/TrapBuildingEditOrAdd";
import Register from "./routes/Auth/Register";
import Login from "./routes/Auth/Login";
import EditProfile from "./routes/Auth/EditProfile";
import FavoriteBuildingsPage from "./routes/Favorites/FavoritePage";
import Footer from "./components/Footer";

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
          path="/user/profile"
          element={
            <ProtectedIfNotLoggedInRoute>
              <EditProfile />
            </ProtectedIfNotLoggedInRoute>
          }
        ></Route>

        <Route path="/Townhalls" element={<Townhalls />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route
          path="/Townhalls/:level/:buildingType"
          element={<TownHallBuildings />}
        />
        <Route
          path="/TownHalls/add"
          element={
            <ProtectedRoute>
              <TownhallEditOrAdd mode="add" />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/TownHalls/edit/:level"
          element={
            <ProtectedRoute>
              <TownhallEditOrAdd mode="edit" />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/Buildings/:buildingType"
          element={<BuildingTypesPage />}
        />
        <Route
          path="/Buildings/:buildingType/:buildingName"
          element={<BuildingTypesPage />}
        />
        <Route
          path="/resourceBuildings/add/:buildingName"
          element={
            <ProtectedRoute>
              <ResourceBuildingEditOrAdd mode="add" />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/resourceBuildings/edit/:id"
          element={
            <ProtectedRoute>
              <ResourceBuildingEditOrAdd mode="edit" />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/armyBuildings/add/:buildingName"
          element={
            <ProtectedRoute>
              <ArmyBuildingEditOrAdd mode="add" />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/armyBuildings/edit/:id"
          element={
            <ProtectedRoute>
              <ArmyBuildingEditOrAdd mode="edit" />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/defensiveBuildings/add/:buildingName"
          element={
            <ProtectedRoute>
              <DefensiveBuildingEditOrAdd mode="add" />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/defensiveBuildings/edit/:id"
          element={
            <ProtectedRoute>
              <DefensiveBuildingEditOrAdd mode="edit" />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/trapBuildings/add/:buildingName"
          element={
            <ProtectedRoute>
              <TrapBuildingEditOrAdd mode="add" />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/trapBuildings/edit/:id"
          element={
            <ProtectedRoute>
              <TrapBuildingEditOrAdd mode="edit" />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/favorites"
          element={
            <ProtectedIfNotLoggedInRoute>
              <FavoriteBuildingsPage />
            </ProtectedIfNotLoggedInRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
