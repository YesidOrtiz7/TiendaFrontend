import React from "react";
const Barra=()=>{
    return(
        <header id="top">
            <div id="top-left">
                <img src="src\images\logoNew.png" alt="logo" />
            </div>
            <menu id="top-right">
                <li><a href="#">Productos</a></li>
                <li><a href="#">Carrito</a></li>
                <li><a href="/login">Iniciar sesion</a></li>
                <li><a href="/crear_cuenta">Crear cuenta</a></li>
            </menu>
        </header>
    );
}
export default Barra;