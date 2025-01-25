import { useContext } from "react";
import { TownHallContext } from "../context/TownHallContext";

export default function useTownHalls() {
  const context = useContext(TownHallContext);

  if (!context) {
    throw new Error("TownHallContext must be used within a TownHallProvider");
  }
  return context;
}
