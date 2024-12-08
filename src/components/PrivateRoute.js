import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function PrivateRoute({ children }) {
  const token = useAuth();

  if (token === null) {
    return <Navigate to="/sign-in" replace={true} />;
  }

  return children;
}
