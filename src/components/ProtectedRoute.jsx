import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token } = useContext(UserContext);

  console.log("Estado del usuario en ProtectedRoute:", user);

  // Verifica si no hay usuario o token
  if (!user || !token) {
    console.warn("Redirigiendo al login porque no hay usuario o token.");
    return <Navigate to="/login" replace />;
  }

  // Verifica si el rol no coincide
  if (requiredRole && user.rol !== requiredRole) {
    console.warn(`Acceso denegado. Usuario actual: ${user.rol}, Rol requerido: ${requiredRole}`);
    return <Navigate to="/" replace />;
  }

  // Si pasa las verificaciones, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
