import { Navigate } from "react-router-dom";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  outlet,
}: ProtectedRouteProps) => {
  const userIsLoggedIn = useUserContext().isLoggedIn;
  const userIsAdmin = useUserContext().userDetails.isAdmin;

  if (userIsLoggedIn || userIsAdmin) {
    isAuthenticated = true;
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};
