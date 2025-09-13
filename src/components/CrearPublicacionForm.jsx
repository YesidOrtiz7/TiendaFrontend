import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import query from './useFetch';

const CrearPublicacionForm = () => {
  const [tituloPublicacion, setTituloPublicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [cantidadDisponible, setCantidadDisponible] = useState('');
  const [imagenes, setImagenes]=useState([]);

  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const clearForm=()=>{
    setTituloPublicacion('');
    setDescripcion('');
    setPrecio('');
    setCategoriaId('');
    setCantidadDisponible('');
    setImagenes([]);
  }

  const handleImageChange=(e)=>{
    setImagenes(Array.from(e.target.files));
  };

  // Función para extraer el documento del JWT
  const getDocumentoFromToken = () => {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    if (!token) {
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
      return payload.sub; // Devuelve el nombre de usuario (documento) del token
    } catch (err) {
      console.error('Error al decodificar el token:', err);
      return null;
    }
  };
  const token = localStorage.getItem('token');

  // Función para obtener las categorías desde la API
  const fetchCategorias = async () => {
    try {
      const response =  await fetch('http://localhost:8080/categorias/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });;
    //console.log(response);
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
    fetchCategorias(); // Carga las categorías al montar el componente
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    const documentoUsuario = getDocumentoFromToken();
    const formData=new FormData();

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
    // añadiendo los datos de la publicacion
        /*formData.append('publicacion', JSON.stringify(publicacion));*/
    formData.append( // enviando los datos como un Blob tipo JSON
      "publicacion",
      new Blob([JSON.stringify(publicacion)], { type: "application/json" })
    );
    // añadiendo las imagenes
    imagenes.forEach((img)=>{
      formData.append('imagenes',img);
    });

    query({
      method: 'POST',
      formData,
      clearForm,
      setMessage,
      setError,
      url: 'productos/crear',
      authentication: true,
      isMultipart: true,
    });
  };

  return (
    <div className='formulario'>
      <h2>Crear Publicación</h2>
      <Modal message={message} error={error} onClose={
        ()=>{setMessage(''); setError(''); clearForm();}
      }/>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='input-formulario-agrupado'>
          <label htmlFor="titulo">Título de la Publicación</label>
          <input
            type="text"
            id="titulo"
            value={tituloPublicacion}
            onChange={(e) => setTituloPublicacion(e.target.value)}
            required
            className='input-formulario'
          />
        </div>
        <div className='input-formulario-agrupado'>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className='input-formulario'
          />
        </div>
        <div className='input-formulario-agrupado'>
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className='input-formulario'
          />
        </div>
        <div className='input-formulario-agrupado'>
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            className='input-formulario'
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className='input-formulario-agrupado'>
          <label htmlFor="cantidadDisponible">Cantidad Disponible</label>
          <input
            type="number"
            id="cantidadDisponible"
            value={cantidadDisponible}
            onChange={(e) => setCantidadDisponible(e.target.value)}
            required
            className='input-formulario'
          />
        </div>
        <div className='input-formulario-agrupado'>
          <label htmlFor="imagenes">Imágenes del producto</label>
          <input
            type="file"
            id="imagenes"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className='input-formulario'
          />
        </div>
        <button
          type="submit"
          className='boton boton-amplio'
        >
          Crear Publicación
        </button>
      </form>
    </div>
  );
};

export default CrearPublicacionForm;
