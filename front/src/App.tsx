import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModifyPost } from "./components/ModifyPost/ModifyPost";
import { Profile } from "./components/Profile/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Home } from "./pages/Home/Home";
import { Landing } from "./pages/Landing/Landing";
import { useUserContext } from "./utils/hooks/useUserContext/useUserContext";

export const App: React.FC = () => {
  const UserCtx = useUserContext();
  return (
    <BrowserRouter>
      <Routes>
        {!UserCtx.isLoggedIn && <Route path="/" element={<Landing />} />}
        <Route
          path="/"
          element={
            <ProtectedRoute
              outlet={<Home />}
              isAuthenticated={false}
              authenticationPath={"/"}
            />
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute
              outlet={<Profile />}
              isAuthenticated={false}
              authenticationPath={"/"}
            />
          }
        />
        <Route
          path="/post=:id"
          element={
            <ProtectedRoute
              outlet={<ModifyPost />}
              isAuthenticated={false}
              authenticationPath={"/"}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
