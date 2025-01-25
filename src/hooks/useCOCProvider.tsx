import { useContext } from "react";
import { COCContext } from "../context/COCContext";

export default function useCOCProvider() {
  const context = useContext(COCContext);

  if (!context) {
    throw new Error("COCContext must be used within a COCProvider");
  }
  return context;
}
