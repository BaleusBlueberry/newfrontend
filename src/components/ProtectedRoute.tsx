import { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/login" />;
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
