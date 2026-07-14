import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useCart } from "../../context/CartContext";
import styles from "./DetalleProducto.module.css"

function DetalleProducto() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const { addToCart, getCantidadActual } = useCart();
    // Este useEffect va si se usa el id automatico que tienen los documentos de firebase
    /*
    useEffect(() => {
        if (id) {

            // Creamos la referencia al documento
            const docRef = doc(db, "Productos nacionales", id);
            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) { // Verificamos si el documento existe
                        setItem({ ...resp.data(), id: resp.id });
                    } else {
                        console.log("No se encontró el producto");
                    }
                })
                .catch(error => console.log(error));
        }
    }, [id]);
    */


    useEffect(() => {
        const prodDB = collection(db, "productos nacionales")
        getDocs(prodDB)
            .then((resp) => {
                const productos = resp.docs.map((doc) => {
                    return { ...doc.data() }
                });
                return productos;
            })
            .then((productos) => {
                const productoEncontrado = productos.find(p => p.id === parseInt(id));
                setProducto(productoEncontrado);
            })
            .catch(error => console.log("Error al cargar el producto: ", error));
    }, [id]);


    if (!producto) {
        return <h2>Cargando detalle del producto...</h2>
    }

    if (!producto.id) {
        return <h2>Producto no encontrado.</h2>
    }

    const incrementar = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const cantidadActual = getCantidadActual(producto.id);

    const manejoAddToCart = () => {
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${producto.nombre} al carrito.`);
    }


    return (
        <section className={styles.producto}>
            {/* <div className={styles.card}>
                <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
                <h3 className={styles.title}>{producto.nombre}</h3>
                <p className={styles.price}>Precio: ${producto.precio}</p>
                <p className={styles.stock}>Stock disponible: {producto.stock}</p>
                <div className={styles.contador}>
                    <button onClick={decrementar}>-</button>
                    <span>{cantidad}</span>
                    <button onClick={incrementar}>+</button>
                </div>
                <button className={styles.cartButton} onClick={manejoAddToCart}>Agregar Al Carrito</button>
                {cantidadActual > 0 && (<p>Ya tenés {cantidadActual} unidades en el carrito.</p>)}
            </div> */}
            <div >
                <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
                {cantidadActual > 0 && (<p>Ya tenés {cantidadActual} unidades en el carrito.</p>)}
            </div>
            <div>
                <h3 className={styles.title}>{producto.nombre}</h3>
                <p className={styles.price}>Precio: ${producto.precio}</p>
                <p className={styles.stock}>Stock disponible: {producto.stock}</p>
                <div className={styles.contador}>
                    <button onClick={decrementar}>-</button>
                    <span>{cantidad}</span>
                    <button onClick={incrementar}>+</button>
                </div>
                <button className={styles.cartButton} onClick={manejoAddToCart}>Agregar Al Carrito</button>
                <p className={styles.descripcion}>{producto.descripcion}</p>
            </div>
        </section>
    );
}

export default DetalleProducto;
