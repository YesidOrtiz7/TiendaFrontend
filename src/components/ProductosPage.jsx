import React, { useEffect, useState } from 'react';
import query from './useFetch';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = 'http://localhost:8080/productos/'; // Cambia esta URL por la de tu API



  // Función para obtener los productos desde la API
  const fetchProductos = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProductos(data); // Actualiza el estado con los productos
      } else {
        setError('Error al obtener productos.');
      }
    } catch (err) {
      console.error('Error al hacer la petición:', err);
      setError('No se pudieron cargar los productos.');
    }
  };

  useEffect(() => {
    query({},'GET', {}, {},setProductos, setMessage, setError, {}, 'productos/', {});
    //fetchProductos(); // Llama a la API al cargar el componente
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Listado de Productos</h1>

      {/* Muestra un mensaje de error si ocurre algún problema */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p >{message}</p>}

      {/* Renderiza los productos */}
      <div>
        {productos.length > 0 ? (
          productos.map((producto) =>
            producto.visible ? ( // Evalúa si el producto es visible
              <div
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
                  <strong>Descripción:</strong> {producto.descripcion}
                </p>
                <p>
                  <strong>Precio:</strong> ${producto.precio.toFixed(2)}
                </p>
                <p>
                  <strong>Categoría:</strong> {producto.categoria.nombre}
                </p>
                <p>
                  <strong>Cantidad Disponible:</strong> {producto.cantidadDisponible}
                </p>
                <p>
                  <strong>Fecha de Publicación:</strong> {new Date(producto.fechaPublicacion).toLocaleDateString()}
                </p>
                <p>
                  <strong>Publicado por:</strong> {producto.usuario.primerNombre} {producto.usuario.primerApellido}
                </p>
              </div>
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