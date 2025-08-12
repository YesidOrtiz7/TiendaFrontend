import {useState} from "react";
import query from "../useFetch";
import Modal from "../Modal";

const CrearCategoria=()=>{
    const [nombre, setNombre]=useState('');
    const [error, setError]=useState('');
    const clearForm=()=>setNombre('');
    const handleSubmit=async (e)=>{
        // if(nombre.length=0){
        //     setError("el nombre no puede estar en blanco");
        // }else{
        //     query(e,'POST',nombre,clearForm,null,null,setError,null,'categorias/crear',null,true);
        // }
        query({
            event: e,
            method: 'POST',
            formData: nombre,
            clearForm,
            setError,
            url: 'categorias/crear',
            authentication: true

        });
        
    }
    return(
        <div className="formulario">
            <h2>Crear Categoria</h2>
            <Modal error={error} onClose={()=>{setError(''); clearForm()}}/>
            <form onSubmit={handleSubmit}>
                <div className="input-formulario-agrupado">
                    <label htmlFor="nombre">Nombre de la categoria</label>
                    <input type="text"
                        id="titulo"
                        value={nombre}
                        onChange={(e)=>setNombre(e.target.value)}
                        
                        className="input-formulario"
                    />
                </div>
                <button
                    type="submit"
                    className="boton boton-amplio"
                >
                    Crear Categoria
                </button>
            </form>
        </div>
    );

}
export default CrearCategoria;