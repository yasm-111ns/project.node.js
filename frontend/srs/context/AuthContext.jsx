import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try { setUser(JSON.parse(saved)); }
      catch { localStorage.removeItem("user"); }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const { user } = await loginUser(credentials);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return user;
  };

  const register = (payload) => registerUser(payload);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);