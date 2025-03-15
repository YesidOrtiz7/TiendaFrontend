import React from "react";

import { useAuth } from "./ControlForRoleComponents/AuthContext";
import {hasRole} from "./ControlForRoleComponents/hasRole";

const Barra=()=>{
    const { user, loading, logout } = useAuth();

    if(loading) return <p>Cargando...</p>;
    return(
        <header id="top">
            <div id="top-left">
                <img src="src\images\logoNew.png" alt="logo" />
            </div>
            <menu id="top-right">
                <li><a href="/">Productos</a></li>
                {hasRole(user, ["USUARIO"]) && <li><a href="#">Carrito</a></li>}
                {!user &&(
                    <>
                        <li><a href="/login">Iniciar sesion</a></li>
                        <li><a href="/crear_cuenta">Crear cuenta</a></li>
                    </>
                )}
                {user && <li><a onClick={logout}>Cerrar sesión</a></li>}
            </menu>
        </header>
    );
}
export default Barra;