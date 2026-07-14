import { useEffect, useState } from "react";
import styles from "./Inicio.module.css";
import estilos from "../itemList/ItemList.module.css";
import { Item } from "../item/Item";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

function Inicio() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    /*
    useEffect(() => {
        fetch('/data/productos.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('No se pudo cargar la información de los productos.');
                }
                return res.json();
            })
            .then((datos) => {
                const destacados = datos.filter(p => p.destacado);
                setProductos(destacados);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setCargando(false);
            })
    }, []);
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
                    const destacados = productos.filter(p => p.destacado);
                    setProductos(destacados);
                })
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => {
                    setCargando(false);
                })
        }, []);

    if (cargando) return <p>Cargando productos, por favor espere...</p>;

    if (error) return <p>Error: {error}</p>;


    return (
        <section>
            <div className={styles.bannerContainer}>
                <img
                    src="/images/banner.jpeg"
                    alt="Banner Cafetera Filtrados"
                    className={styles.banner}
                />
                <Link
                    to="/productos?categoria=Filtrados"
                    className={styles.bannerButton}
                />
            </div>
            <div>
                <h2>Productos Destacados</h2>
                <div className={estilos.grid}>
                    {productos.map(prod => (
                        <Item key={prod.id} {...prod} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Inicio;