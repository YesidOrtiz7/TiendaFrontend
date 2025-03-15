import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {hasRole} from "./hasRole";

const PrivateRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();

    !user&&console.log("PrivateRoute dice: no existe usuario: "+user)

    if (loading) return <p>Cargando...</p>;
    if (!user) return <Navigate to="/login" />;
    if (!hasRole(user,roles)) return <Navigate to="/" />;    
  
    return children;
  };
export default PrivateRoute;