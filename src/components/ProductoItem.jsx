const ProductoItem=({producto})=>{
    return(
        <div className="product-item"
        key={producto.id}
        style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '15px',
                  marginBottom: '15px',
                }}
        >
            <h2>{producto.tituloPublicacion}</h2>
                <p>
                  <strong>${producto.precio.toFixed(2)}</strong>
                </p>
                <p>
                  Cantidad Disponible: {producto.cantidadDisponible}
                </p>
                <p>
                  Fecha de Publicación: {new Date(producto.fechaPublicacion).toLocaleDateString()}
                </p>
                <p>
                  Publicado por: {producto.usuario.nombres} {producto.usuario.apellidos}
                </p>
        </div>
    );
};
export default ProductoItem;