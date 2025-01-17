import React from "react";
import ProductosPage from "./ProductosPage";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

const HomePage = () => {
  return (
    <div>
      {/* Enlace para redirigir a la página de crear publicación */}
      <div style={{ marginBottom: "20px" }}>
        <Link
          to="/crear_publicacion"
          className="boton"
        >
          Crear Publicación
        </Link>
      </div>
      {/* Muestra los productos */}
      <ProductosPage />
    </div>
  );
};

export default HomePage;