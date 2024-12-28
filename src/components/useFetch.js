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
/**event, method, formData, clearForm,setData, setMessage, setError, setLoading, url, urlRetorno */
export default async function query(event, method, formData, clearForm,
    setData, setMessage, setError, setLoading, url, urlRetorno){
    if(!isObjectEmpty(event)){
        //console.log(isObjectEmpty(event));
        event.preventDefault()
    }
    try {
        if (typeof setLoading === "function"){
            setLoading(true);
        }
        let response={};
        if (isObjectEmpty(formData)){
            response = await fetch(`${API_SERVER}${url}`, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            response = await fetch(`${API_SERVER}${url}`, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        }
        const result=await response.json();
        if (typeof setData === "function" && result != null){
            setData(result);
        }

        if (typeof clearForm === "function"){
            clearForm();
        }


        if (typeof setError === "function" && typeof setMessage === "function"){
            if (!response.ok) {
                const errorResponse = await response.json();
                //setMessage(errorResponse.errorMessage || `HTTP error! status: ${response.status}`);
                setError(errorResponse.errorMessage || messagesFunction(method,true));
                return;
            }
            setMessage(messagesFunction(method,false));
        }
        
        
        if (typeof urlRetorno === "string"){
            window.location.href = `${API_SERVER}${urlRetorno}`;
        }

    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Peticion cancelada");
        } else {
            console.error('Error:', error);
            setMessage(error.message || messagesFunction(method,true));
        }
    } finally {
        if (typeof setLoading === "function"){
            setLoading(false);
        }
    }
}