import React from "react";
import ProductosPage from "./ProductosPage";
import { Link } from "react-router-dom";
import PrivateRoute from "./ControlForRoleComponents/PrivateRoute";

const HomePage = () => {
  return (
    <div>
      {/* Enlace para redirigir a la página de crear publicación */}
      <div style={{ marginBottom: "20px", marginLeft:"20px" }}>
        <PrivateRoute roles={["USUARIO"]}>
          <Link
            to="/crear_publicacion"
            className="boton"
          >
            Crear Publicación
          </Link>
        </PrivateRoute>
      </div>
      {/* Muestra los productos */}
      <ProductosPage />
    </div>
  );
};

export default HomePage;