import React, { useState, useEffect } from 'react';
import query from './useFetch';

const CrearPublicacionForm = () => {
  const [tituloPublicacion, setTituloPublicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [cantidadDisponible, setCantidadDisponible] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const API_CATEGORIAS_URL = 'http://localhost:8080/categorias'; // Cambia por la URL para obtener las categorías
  const API_PUBLICACION_URL = 'http://localhost:8080/publicaciones'; // Cambia por la URL para crear la publicación

  // Función para extraer el documento del JWT
  const getDocumentoFromToken = () => {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    if (!token) {
      return null; // Si no hay token, retorna null
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
      return payload.sub; // Devuelve el nombre de usuario (documento) del token
    } catch (err) {
      console.error('Error al decodificar el token:', err);
      return null;
    }
  };
  const token = localStorage.getItem('jwtToken');

  // Función para obtener las categorías desde la API
  const fetchCategorias = async () => {
    try {
      const response =  await fetch(`${API_SERVER}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });;
      if (response.ok) {
        const data = await response.json();
        setCategorias(data); // Guarda las categorías en el estado
      } else {
        setError('Error al obtener categorías.');
      }
    } catch (err) {
      console.error('Error al hacer la petición:', err);
      setError('No se pudieron cargar las categorías.');
    }
  };

  useEffect(() => {
    //query({},'GET', {}, {},setCategorias, {}, setError, {}, 'categorias/', {});
    fetchCategorias(); // Carga las categorías al montar el componente
  }, []);
/*
  const formData = {
    tituloPublicacion,
    descripcion,
    precio: parseFloat(precio),
    categoria: {
      id: parseInt(categoriaId),
    },
    cantidadDisponible: parseInt(cantidadDisponible),
    fechaPublicacion: new Date().toISOString(),
    usuario: {
      documento: documentoUsuario,
    },
    visible: true,
  };
  const clearForm=()=>{
    alert('Publicación creada exitosamente.');
    // Limpia el formulario
    setTituloPublicacion('');
    setDescripcion('');
    setPrecio('');
    setCategoriaId('');
    setCantidadDisponible('');
  }*/

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    const documentoUsuario = getDocumentoFromToken();

    if (!documentoUsuario) {
      setError('No se pudo autenticar al usuario. Por favor, inicia sesión nuevamente.');
      return;
    }

    const publicacion = {
      tituloPublicacion,
      descripcion,
      precio: parseFloat(precio),
      categoria: {
        id: parseInt(categoriaId),
      },
      cantidadDisponible: parseInt(cantidadDisponible),
      fechaPublicacion: new Date().toISOString(),
      usuario: {
        documento: documentoUsuario,
      },
      visible: true,
    };
    //const token = localStorage.getItem('jwtToken');

    try {
      const response = await fetch(API_PUBLICACION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(publicacion),
      });

      if (response.ok) {
        alert('Publicación creada exitosamente.');
        // Limpia el formulario
        setTituloPublicacion('');
        setDescripcion('');
        setPrecio('');
        setCategoriaId('');
        setCantidadDisponible('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear la publicación.');
      }
    } catch (err) {
      console.error('Error al enviar la publicación:', err);
      setError('Ocurrió un error, intenta nuevamente.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Crear Publicación</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>{/*</form><form onSubmit={query(e,'POST', formData, {},setCategorias, {}, setError, {}, 'categorias/', {})}> */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="titulo">Título de la Publicación</label>
          <input
            type="text"
            id="titulo"
            value={tituloPublicacion}
            onChange={(e) => setTituloPublicacion(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="cantidadDisponible">Cantidad Disponible</label>
          <input
            type="number"
            id="cantidadDisponible"
            value={cantidadDisponible}
            onChange={(e) => setCantidadDisponible(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Crear Publicación
        </button>
      </form>
    </div>
  );
};

export default CrearPublicacionForm;
