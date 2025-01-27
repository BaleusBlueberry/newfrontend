import { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Page401 from "../routes/Page401";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Page401></Page401>;
  }
  return children;
};

export const ProtectedIfLoggedInRoute: FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/Home" />;
  }

  return children;
};

export const ProtectedIfNotLoggedInRoute: FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};
