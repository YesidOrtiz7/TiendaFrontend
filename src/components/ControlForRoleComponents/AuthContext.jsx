import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Función para obtener el rol desde el backend
  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:8080/api/auth/get-roles", {
        headers: { Authorization: `Bearer ${token}` },
      });

      //setUser({ role: response.data.role });
      setUser({ roles: response.data || [] });
    } catch (error) {
      console.error("Error obteniendo roles", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Llamar la función cuando la app se monta
  useEffect(() => {
    fetchUserRole();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useAuth = () => useContext(AuthContext);