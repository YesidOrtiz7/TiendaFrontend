const ProductoItem = ({ producto }) => {
  // verificando si hay imagenes
  const imagenPrincipal = producto.imagenes?.length > 0? `http://localhost:8080/imagenes/id/${producto.imagenes[0].id}`:null;
  console.log(imagenPrincipal);
  return (
    <div className="product-item"
      key={producto.id}
    >
      {imagenPrincipal ? (
        <img
          src={imagenPrincipal}
          alt={producto.tituloPublicacion}
        />
      ) : (
        <div
          className="sin-imagen"
        >
          Sin imagen
        </div>
      )}
      <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>
        {producto.tituloPublicacion}
      </h2>
      <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#27ae60' }}>
        ${producto.precio.toFixed(2)}
      </p>
      <p style={{ fontSize: '14px', margin: '5px 0' }}>
        Cantidad Disponible: {producto.cantidadDisponible}
      </p>
      <p style={{ fontSize: '14px', margin: '5px 0' }}>
        Fecha de Publicación:{" "}
        {new Date(producto.fechaPublicacion).toLocaleDateString()}
      </p>
      <p style={{ fontSize: '14px', margin: '5px 0', color: '#555' }}>
        Publicado por: <strong>{producto.usuario.nombres+" "+producto.usuario.apellidos}</strong>
      </p>
    </div>
  );
};
export default ProductoItem;