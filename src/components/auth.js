//const API_URL = 'http://localhost:8080/api/auth/validate';
const API_URL = 'http://localhost:8080/categorias';

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');

  if (!token) return false;

  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Verifica si el token es válido (status 200)
    return response.ok;
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    return false;
  }
};