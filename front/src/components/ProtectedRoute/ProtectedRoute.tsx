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
  const user = useUserContext()

  if (user.isLoggedIn || user.userDetails.isAdmin) {
    isAuthenticated = true;
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};
