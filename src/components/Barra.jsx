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
                <li className="cursor-pointer"><a href="/">Productos</a></li>
                {hasRole(user, ["USUARIO"]) && <li className="cursor-pointer"><a href="#">Carrito</a></li>}
                {hasRole(user, ["ADMIN"]) && <li className="cursor-pointer"><a href="/categorias">Categorias</a></li>}
                {!user &&(
                    <>
                        <li className="cursor-pointer"><a href="/login">Iniciar sesion</a></li>
                        <li className="cursor-pointer"><a href="/crear_cuenta">Crear cuenta</a></li>
                    </>
                )}
                {user && <li className="cursor-pointer"><a onClick={logout}>Cerrar sesión</a></li>}
            </menu>
        </header>
    );
}
export default Barra;