import React, { useState } from 'react';

const LoginPage = () => {
  const [documento, setDocumento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:8080/api/auth/login'; // Cambia esta URL por la de tu API

  /*const handleLogin = async (e) => {
    e.preventDefault(); // Previene la recarga de la página

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documento, contrasena }),
      });
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
        window.location.href = '/'; // Redirige al usuario a la página principal
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Credenciales inválidas'); // Muestra el error si la API lo devuelve
      }
    } catch (err) {
      console.error('Error al realizar la petición:', err);
      setError('Ocurrió un error, intenta nuevamente.');
    }
  };*/
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene la recarga de la página

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ documento, contrasena }),
        });

        if (response.ok) {
            // Extrae el token del encabezado
            const token = response.headers.get('Authorization'); 
            console.log(response.headers);
            if (token) {
                localStorage.setItem('token', token); // Guarda el token en localStorage
                window.location.href = '/'; // Redirige al usuario a la página principal
            } else {
                setError('No se encontró el token en los encabezados de la respuesta');
            }
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Credenciales inválidas'); // Muestra el error si la API lo devuelve
        }
    } catch (err) {
        console.error('Error al realizar la petición:', err);
        setError('Ocurrió un error, intenta nuevamente.');
    }
};


  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="documento">Documento</label>
          <input
            type="text"
            id="documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Ingresa tu documento"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        {error && (
          <p style={{ color: 'red', marginBottom: '15px' }}>
            {error}
          </p>
        )}
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
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;