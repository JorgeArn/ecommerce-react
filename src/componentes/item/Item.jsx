import { useState } from "react";
import styles from "./Item.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

// Recibe las props usando destructuring
export function Item({ id, nombre, precio, stock, imagen }) {
    // Se crea el objeto producto a partir de las props
    const producto = { id, nombre, precio, stock, imagen };

    const [cantidad, setCantidad] = useState(1);
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


    // Lógica del carrito
    const { addToCart, getCantidadActual } = useCart(); // Traemos la función del contexto
    
    // Obtenemos la cantidad ya existente en el carrito desde el contexto
    const cantidadActual = getCantidadActual(producto.id);

    const manejoAddToCart = () => {
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }

    return (
        <div className={styles.card}>
            <Link to={`/producto/${id}`}>
                <img src={imagen} alt={nombre} className={styles.image} />
                <h3 className={styles.title}>{nombre}</h3>
                <p className={styles.price}>Precio: ${precio}</p>
                {/* <p className={styles.stock}>Stock disponible: {stock}</p> */}
            </Link>
            {/* <div className={styles.contador}>
                <button onClick={decrementar}>-</button>
                <span>{cantidad}</span>
                <button onClick={incrementar}>+</button>
            </div> */}
            <button className={styles.cartButton} onClick={manejoAddToCart}>Agregar Al Carrito</button>
            {cantidadActual > 0 && (<p>Ya tenés {cantidadActual} unidades en el carrito.</p>)}
        </div>
    );
}
