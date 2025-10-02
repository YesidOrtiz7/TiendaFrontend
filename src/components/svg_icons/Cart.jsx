import React from "react";
import { Link } from "react-router-dom";
import './svg_css/cartStyle.css'
const Cart=({className})=>{
    return(
        <Link to={'#'} className={className}>
            <div class="cart-bounce">
                <span>Carrito</span>
                <svg class="cart-icon"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.25"  stroke-linecap="round"  stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" />
                </svg>
            </div>
        </Link>
    );
}
export default Cart;