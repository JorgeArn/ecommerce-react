import { useEffect, useState } from "react";
import { ItemList } from "../itemList/ItemList";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSearchParams } from "react-router-dom";


export function ItemListContainer({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const [searchParams] = useSearchParams();
    const categoria = searchParams.get("categoria");


    useEffect(() => {

        const cargarProductos = async () => {

            let consulta;

            if (categoria) {
                consulta = query(
                    collection(db, "productos nacionales"),
                    where("categoria", "==", categoria)
                );
            } else {
                consulta = collection(db, "productos nacionales");
            }

            try {
                const resp = await getDocs(consulta);

                setProductos(
                    resp.docs.map(doc => ({
                        ...doc.data()
                    }))
                );
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        cargarProductos();

    }, [categoria]);

    
    if (cargando) return <p>Cargando productos, por favor espere...</p>;

    if (error) return <p>Error: {error}</p>;


    return (
        <div>
            <h2>{Mensaje}</h2>
            <ItemList productos={productos} />
        </div>
    );
}