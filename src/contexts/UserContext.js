import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda { username, rol }
  const [token, setToken] = useState(null); // Guarda el token
  const [loading, setLoading] = useState(true); // Control de carga inicial

  // Cargar datos de localStorage al inicio
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
  
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
  
        // Verifica que el usuario tenga el rol asignado
        if (!parsedUser.rol) {
          console.error("El usuario no tiene un rol definido.");
        }
  
        setUser(parsedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error al inicializar datos desde localStorage:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    setLoading(false);
  }, []);
  
  
  const login = (userData, token) => {
    console.log("Datos de usuario en login:", userData); // Log de depuración
    console.log("Token recibido:", token); // Log de depuración
  
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };
  

  const logout = () => {
    console.log("Cerrando sesión..."); // Log de depuración
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Mientras carga, mostrar algo al usuario
  if (loading) return <div>Cargando...</div>;

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
