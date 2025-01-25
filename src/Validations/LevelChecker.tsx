import { useNavigate } from "react-router-dom";
import { dialogs } from "../dialogs/dialogs";

export const CheckLevel = (lvl: number) => {
  const navigate = useNavigate();
  if (lvl > 17 || lvl < 0) {
    dialogs.error("level number have to be more then 0 and less than 17");
    navigate("/townhalls");
    return;
  }
};
