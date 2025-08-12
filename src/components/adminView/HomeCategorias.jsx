import React, { useEffect, useState } from 'react';
import PrivateRoute from '../ControlForRoleComponents/PrivateRoute';
import { Link } from 'react-router-dom';
import query from '../useFetch';

const HomeCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Aquí deberías hacer la llamada real a tu API para obtener las categorías
    // Este es un ejemplo con datos simulados
    // const fetchCategorias = async () => {
    //   // Simulación de llamada
    //   const data = [
    //     { id: 1, nombre: 'Tecnología' },
    //     { id: 2, nombre: 'Hogar' },
    //     { id: 3, nombre: 'Ropa' }
    //   ];
    //   setCategorias(data);
      
    // };

    // fetchCategorias();
    query({
        method: 'GET',
        setData: setCategorias,
        url: 'categorias/',
        authentication: true
      });
  }, []);

  const handleEdit = (id) => {
    console.log('Editar categoría con ID:', id);
    // Redirigir o abrir modal con datos para editar
  };

  const handleDelete = (id) => {
    console.log('Eliminar categoría con ID:', id);
    query({
      method: 'DELETE',
      formData: {"id":id},
      url: "categorias/eliminar",
      urlRetorno: "categorias",
      authentication: true
    });
    setCategorias((prevCategorias) =>
      prevCategorias.filter((cat) => cat.id !== id)
    );
    // Envio de la peticion y eliminación lógica de la tabla
  };

  const handleView = (id) => {
    console.log('Ver categoría con ID:', id);
    // Mostrar detalles o redirigir
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: "20px", marginLeft:"20px" }}>
        <PrivateRoute roles={["ADMIN"]}>
          <Link
            to="/crear_categoria"
            className="boton"
          >
            Crear Categoria
          </Link>
        </PrivateRoute>
      </div>
      <h2>Listado de Categorías</h2>
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length > 0 ? (
            categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.nombre}</td>
                <td>
                  <button onClick={() => handleView(categoria.id)}>Ver</button>{' '}
                  <button onClick={() => handleEdit(categoria.id)}>Editar</button>{' '}
                  <button onClick={() => handleDelete(categoria.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No hay categorías registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomeCategorias;