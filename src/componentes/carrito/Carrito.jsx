import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import styles from "../carrito/Carrito.module.css";


const Carrito = () => {
    const { cart, vaciarCart, getCartTotal, eliminarItem } = useCart();

    // Si el carrito esta vacío, mostramos un mensaje
    if (cart.length === 0) {
        return (
            <div className={styles.carrito}>
                <h1>El carrito está vacío</h1>
                <div className={styles.carrito_vacio}>
                    <p>Agrega productos para continuar con la compra.</p>
                    <Link className={styles.ver} to="/productos">Ver Productos</Link>
                </div>
            </div>
        );
    }

    // Si hay productos, los mostramos
    return (
        <div className={styles.carrito}>
            <h1>Carrito de Compras</h1>
            {cart.map(item => (
                <div key={item.id} className={styles.carritoItems}>
                    <div>
                        <img className={styles.item_imagen} src={item.imagen} alt={item.nombre} />
                    </div>
                    <div className={styles.item_info}>
                        <h4>{item.nombre}</h4>
                        <p>Cantidad: {item.cantidad}</p>
                        <p>Precio: ${item.precio}</p>
                        <p>Subtotal: ${item.precio * item.cantidad}</p>
                    </div>
                    <div>
                        <button className={styles.botones_secundarios} onClick={() => eliminarItem(item.id)}>X</button>
                    </div>
                </div>
            ))}
            <hr />
            <h3 className={styles.total}>Total a pagar: ${getCartTotal()}</h3>
            <div className={styles.botones_container}>
                <button className={styles.botones_secundarios} onClick={vaciarCart}>Vaciar Carrito</button>
                <button className={styles.botones_secundarios}>
                    <Link to="/" onClick={() => {
                        alert("Gracias por comprar.");
                        vaciarCart();
                    }}>
                        Finalizar Compra
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Carrito;