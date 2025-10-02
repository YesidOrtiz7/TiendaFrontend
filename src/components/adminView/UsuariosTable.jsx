import { useState,useEffect } from "react";
import axios from "axios";
const UsuariosTable= ()=>{
    const [usuarios,setUsuarios]=useState([]);
    const [page,setPage]=useState(0);
    const [size,setSize]=useState(10);
    const [totalPages,setTotalPages]=useState(0);
    
    const fetchUsuarios = async () => {
        try {
        const response = await axios.get(
            `http://localhost:8080/usuarios/todos?page=${page}&elements=${size}`,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );

        const data = response.data;
        setUsuarios(data.content);   // los usuarios vienen en `content`
        setTotalPages(data.totalPages);
        } catch (error) {
        console.error("Error al obtener usuarios", error);
        }
    };
    useEffect(()=>{
        fetchUsuarios();
    },[page,size]);
    return (
        <div style={{padding: '20px'}}>
            <h2>Usuarios</h2>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Documento</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length>0?(
                        usuarios.map((u)=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.documento}</td>
                                <td>{u.nombres}</td>
                                <td>{u.apellidos}</td>
                                <td>{u.correo}</td>
                                <td>{u.telefono}</td>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td>No hay usuarios</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* controles de paginacion */}
            <div>
                <button
                    onClick={()=>setPage((prev)=>Math.max(prev-1,0))}
                    disabled={page===0}
                >
                    Anterior
                </button>
                <span>Pagina {page+1} de {totalPages}</span>
                <button
                    onClick={()=>setPage((prev)=>(prev + 1 < totalPages ? prev + 1 : prev))}
                    disabled={page + 1 >= totalPages}
                >
                    Siguiente
                </button>
            </div>
            {/*selector de cantidad de elementos por pagina*/}
            <div>
                <label htmlFor="usuariosPagina">Usuarios por pagina:</label>
                <select
                name="usuariosPagina"
                id="usuariosPagina"
                value={size}
                onChange={()=>setSize(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );
}
export default UsuariosTable;