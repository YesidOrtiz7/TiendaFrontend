import React from "react";
import { Link } from "react-router-dom";

import Cart from "./svg_icons/cart";

import { useAuth } from "./ControlForRoleComponents/AuthContext";
import {hasRole} from "./ControlForRoleComponents/hasRole";

const Barra=()=>{
    const { user, loading, logout } = useAuth();

    if(loading) return <p>Cargando...</p>;
    return(
        <header id="navbar">
            <div id="navbar-logo">
                <img src="src\images\logoNew.png" alt="logo" />
                <span className="navbar-title">Agromercado</span>
            </div>
            <nav className="navbar-links">
                <Link to={'/'} className="navbar-link">Productos</Link>
                {hasRole(user, ["USUARIO"]) && <Cart className="navbar-link"/>}
                {hasRole(user, ["ADMIN"]) && <Link to={'/categorias'} className="navbar-link">Categorias</Link>}
                {hasRole(user, ["ADMIN"]) && <Link to={"/usuarios"} className="navbar-link">Usuarios</Link>}
                {!user &&(
                    <>
                        <Link to={"/crear_cuenta"} className="navbar-link">Crear cuenta</Link>
                        <Link to={"/login"} className="navbar-btn">Iniciar sesion</Link>
                    </>
                )}
                {user && <a onClick={logout} className="navbar-btn cursor-pointer">Cerrar sesión</a>}
            </nav>
            {/* <menu id="top-right">
                <li className="cursor-pointer"><a href="/">Productos</a></li>
                {hasRole(user, ["USUARIO"]) && <li className="cursor-pointer"><a href="#"><Cart/></a></li>}
                {hasRole(user, ["ADMIN"]) && <li className="cursor-pointer"><a href="/categorias">Categorias</a></li>}
                {hasRole(user, ["ADMIN"]) && <li className="cursor-pointer"><Link to={"/usuarios"}>Usuarios</Link></li>}
                {!user &&(
                    <>
                        <li className="cursor-pointer"><a href="/login">Iniciar sesion</a></li>
                        <li className="cursor-pointer"><a href="/crear_cuenta">Crear cuenta</a></li>
                    </>
                )}
                {user && <li className="cursor-pointer"><a onClick={logout}>Cerrar sesión</a></li>}
            </menu> */}
        </header>
    );
}
export default Barra;