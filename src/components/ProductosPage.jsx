import React, { useEffect, useState } from 'react';
import query from './useFetch';
import ProductoItem from './ProductoItem';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  // const [message, setMessage] = useState('');



  // Función para obtener los productos desde la API
  useEffect(() => {
    query({
      method: "GET",
      setData: setProductos,
      // setMessage,
      setError,
      url: "productos/"
    })
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Listado de Productos</h1>

      {/* Muestra un mensaje de error si ocurre algún problema */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* {message && <p >{message}</p>} */}

      {/* Renderiza los productos */}
      <div className='product-container'>
        {productos.length > 0 ? (
          productos.map((producto) =>
            producto.visible ? ( // Evalúa si el producto es visible
              <ProductoItem producto={producto}/>
            ) : null // Si `visible` es false, no renderiza el producto
          )
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ProductosPage;