import { useState } from "react";
import styles from "./Item.module.css";

// Recibe las props usando destructuring
export function Item({ id, nombre, precio, stock, imagen }) {
    const [cantidad, setCantidad] = useState(0);
    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const agregarAlCarrito = () => {
        if (cantidad > 0) {
            alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
        }
    }

    return (
        <div className={styles.card}>
            <img src={imagen} alt={nombre} className={styles.image} />
            <h3 className={styles.title}>{nombre}</h3>
            <p className={styles.price}>Precio: ${precio}</p>
            <p className={styles.stock}>Stock disponible: {stock}</p>
            <div className={styles.contador}>
                <button onClick={decrementar}>-</button>
                <span>{cantidad}</span>
                <button onClick={incrementar}>+</button>
            </div>
            <button className={styles.cartButton} onClick={agregarAlCarrito}>Agregar Al Carrito</button>
        </div>
    );
}
