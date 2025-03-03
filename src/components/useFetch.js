const isObjectEmpty =(objectName)=>{
    return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
      );
}
const fetchMessages = {
    get_query: "Datos obtenidos",
    post_query: "Creado.",
    put_query: "Actualizado.",
    delete_query: "Eliminado.",
    get_query_error: "Consulta cancelada.",
    post_query_error: "No se pudo crear.",
    put_query_error: "No se pudo actualizar.",
    delete_query_error: "No se pudo eliminar.",
}
const messagesFunction=(method,error)=>{
    if(method==="GET" && error){
        return fetchMessages.get_query_error;
    }
    if(method==="POST" && error){
        return fetchMessages.post_query_error;
    }
    if(method==="PUT" && error){
        return fetchMessages.put_query_error;
    }
    if(method==="DELETE" && error){
        return fetchMessages.delete_query_error;
    }
    if(method==="GET" && !error){
        return fetchMessages.get_query;
    }
    if(method==="POST" && !error){
        return fetchMessages.post_query;
    }
    if(method==="PUT" && !error){
        return fetchMessages.put_query;
    }
    if(method==="DELETE" && !error){
        return fetchMessages.delete_query;
    }
}
const API_SERVER = "http://localhost:8080/";
export default async function query(event, method, formData, clearForm,
    setData, setMessage, setError, setLoading, url, urlRetorno, authentication) {

    if (!isObjectEmpty(event)) {
        event.preventDefault();
    }

    if (typeof setLoading === "function") {
        setLoading(true);
    }

    /*si el parametro authentication es true, entonces incluye el token de acceso */
    const headers = {
        'Content-Type': 'application/json',
        ...(authentication && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
    };

    try {
        //construye la configuracion para fetch
        const options = {
            method,
            headers,
            ...(isObjectEmpty(formData) ? {} : { body: JSON.stringify(formData) }),
        };

        //ejecuta la llamada a fetch
        const response = await fetch(`${API_SERVER}${url}`, options);
        const result = await response.json();

        if (typeof setData === "function" && result != null) {
            setData(result);
        }

        if (typeof setError === "function" && typeof setMessage === "function") {
            response.ok
                ? setMessage(messagesFunction(method, false))
                : setError(result.errorMessage || messagesFunction(method, true));
        }

        if (typeof urlRetorno === "string") {
            window.location.assign(`http://localhost:5173/${urlRetorno}`);
        }

    } catch (error) {
        if (error.name !== "AbortError") {
            console.error('Error:', error);
            if (typeof setMessage === "function") {
                setMessage(error.message || messagesFunction(method, true));
            }
        }else{
            console.log('Peticion cancelada');
        }
    } finally {
        clearForm?.();
        setLoading?.(false);
    }
}
