import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "../carrito/Carrito.module.css";
import estilos from "../formNewProductos/FormNewProductos.module.css";


function GestionCupones() {

    const [cupones, setCupones] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [descuento, setDescuento] = useState("");

    const obtenerCupones = async () => {
        try {
            const respuesta = await getDocs(collection(db, "cupones"));

            const lista = respuesta.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setCupones(lista);

        } catch (error) {
            console.log("Error al obtener los cupones: ", error);
            alert("Ocurrió un error al cargar los cupones.");
        }
    };

    useEffect(() => {
        obtenerCupones();
    }, []);

    // Crear cupón
    const crearCupon = async (e) => {
        e.preventDefault();

        if (!codigo || !descuento) {
            alert("Complete todos los campos.");
            return;
        }

        const porcentaje = Number(descuento);

        if (porcentaje < 1 || porcentaje > 100) {
            alert("El descuento debe estar entre 1 y 100");
            return;
        }

        try {
            await addDoc(collection(db, "cupones"), {
                codigo,
                descuento: Number(descuento),
            });

            alert("Cupón creado correctamente.");

            setCodigo("");
            setDescuento("");

            await obtenerCupones();

        } catch (error) {
            console.error(error);
            alert("Error al crear el cupón.");
        }
    };

    // Eliminar cupón
    const eliminarCupon = async (id) => {
        try {

            await deleteDoc(doc(db, "cupones", id));

            alert("Cupón eliminado.");

            await obtenerCupones();


        } catch (error) {
            console.error(error);
            alert("Error al eliminar el cupón.");
        }
    };

    return (
        <div className={styles.carrito}>
            <h2>Administración de Cupones</h2>

            <form className={estilos.formulario} onSubmit={crearCupon}>
                <input
                    type="text"
                    placeholder="Código"
                    required
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="descuento"
                    min="1"
                    max="100"
                    required
                    value={descuento}
                    onChange={(e) => setDescuento(e.target.value)}
                />
                <button className={styles.botones_secundarios} type="submit">Crear Cupón</button>
            </form>
            <hr />
            <h3>Listado de Cupones</h3>
            {
                cupones.map((cupon) => (
                    <div className={styles.botones_container} key={cupon.id}>
                        <div className={styles.carritoItems}>
                            <p>
                                <strong>Código: </strong> {cupon.codigo}
                            </p>
                            <p>
                                <strong>Descuento: </strong> {cupon.descuento}%
                            </p>
                            <button className={styles.botones_secundarios} onClick={() => eliminarCupon(cupon.id)}>Eliminar</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );

}

export default GestionCupones;
