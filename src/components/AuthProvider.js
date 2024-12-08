import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth işlemi başarısız");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const token = localStorage.getItem("authToken");
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}
