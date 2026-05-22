import { useEffect, useState } from "react";
import { ItemList } from "../itemList/ItemList";


export function ItemListContainer({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('No se pudo cargar la información de los productos.');
                }
                return res.json();
            })
            .then((datos) => {
                setProductos(datos);
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
        <div>
            <h2>{Mensaje}</h2>
            <ItemList productos={productos} />
        </div>
    );
}