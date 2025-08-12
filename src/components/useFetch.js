const API_SERVER = "http://localhost:8080/";

const isObjectEmpty = (obj) =>
  obj &&
  Object.keys(obj).length === 0 &&
  obj.constructor === Object;

const fetchMessages = {
  GET: ["Datos obtenidos", "Consulta cancelada."],
  POST: ["Creado.", "No se pudo crear."],
  PUT: ["Actualizado.", "No se pudo actualizar."],
  DELETE: ["Eliminado.", "No se pudo eliminar."],
};

const getMessage = (method = "GET", error = false) => {
  const [success, failure] = fetchMessages[method.toUpperCase()] || ["OK", "Error"];
  return error ? failure : success;
};

export default async function query({
  event = null,
  method = "GET",
  formData = null,
  clearForm = () => {},
  setData = () => {},
  setMessage = () => {},
  setError = () => {},
  setLoading = () => {},
  url = "",
  urlRetorno = null,
  authentication = false,
} = {}) {
  try {
    if (event?.preventDefault) event.preventDefault();
    setLoading(true);

    const headers = {
      "Content-Type": "application/json",
      ...(authentication && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    };

    const options = {
      method,
      headers,
      ...(formData && !isObjectEmpty(formData) && { body: JSON.stringify(formData) }),
    };

    const response = await fetch(`${API_SERVER}${url}`, options);
    const text = await response.text();

    let result = null;
    if (text) {
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.warn("Respuesta no es JSON válido:", e);
        result = null;
      }
    }

    if (response.ok) {
      setData(result);
      setMessage(getMessage(method, false));
    } else {
      const errorMessage = result?.errorMessage || getMessage(method, true);
      setError(errorMessage);
    }

    if (urlRetorno) {
      window.location.assign(`http://localhost:5173/${urlRetorno}`);
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error en fetch:", error);
      setMessage(error.message || getMessage(method, true));
    } else {
      console.warn("Petición cancelada por AbortController.");
    }
  } finally {
    clearForm();
    setLoading(false);
  }
}