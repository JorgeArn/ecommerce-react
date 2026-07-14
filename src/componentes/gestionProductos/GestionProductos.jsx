import React from "react";
import { db } from "../../firebase/config";
import { collection, deleteDoc, doc, getDocs, orderBy, query, addDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import FormNewProductos from "../formNewProductos/FormNewProductos";
import styles from "../carrito/Carrito.module.css";
import estilos from "../gestionProductos/GestionProductos.module.css";


const GestionProductos = () => {
    const [productos, setProductos] = useState([]);

    const estadoInicialForm = {
        id: 0,
        nombre: '',
        precio: 0,
        stock: 0,
        categoria: '',
        descripcion: '',
        destacado: false,
        imagen: ''
    };

    const [datosForm, setDatosForm] = useState(estadoInicialForm);

    const [imagenFile, setImagenFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [productoAEditar, setProductoAEditar] = useState(null);


    const manejarCambio = (evento) => {
        const { name, value, type, checked } = evento.target;
        setDatosForm({
            ...datosForm, [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? Number(value)
                        : value
        });
    };

    // Nueva función para manejar el cambio del input de tipo "file".   
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };


    const cargarProductos = async () => {
        const productosRef = collection(db, "productos nacionales"); //Ajustar "productos" al nombre de tu colección
        // Hago el query para ordenar los productos por id
        const q = query(productosRef, orderBy("id", "asc"));
        const resp = await getDocs(q);
        setProductos(
            resp.docs.map((doc) => ({ firestoreID: doc.id, ...doc.data() }))
        );
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const manejarEditar = (producto) => {
        setProductoAEditar(producto);
        setDatosForm(producto);
    }

    const modoEdicion = productoAEditar !== null;

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        // Se valida que el usuario haya seleccionado una imagen
        if (!imagenFile && !productoAEditar) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        setLoading(true);   // Se setea el loading en "true" antes del fetch.

        let urlImagen = datosForm.imagen;

        try {

            if (imagenFile) {
                console.log("Subiendo imagen a Imgbb...");

                // --- Lógica para subir una imagen a imgbb ---
                const apiKey = 'daef5d9041633fbe450901b6e39394b6';
                const formData = new FormData();
                formData.append('image', imagenFile);

                const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
                const datosImgbb = await respuestaImgbb.json();

                if (!datosImgbb.success) {
                    throw new Error('La subida de la imagen a Imgbb falló.');
                }

                console.log("Imagen subida con éxito. URL: ", datosImgbb.data.url);
                urlImagen = datosImgbb.data.url;

            }

            // Unimos la URL de la imagen con el resto de los datos del formulario.
            const productoCompleto = {
                ...datosForm,
                // Agregamos la URL obtenida o la del form si no se seleccionó nada
                imagen: urlImagen
            };
            // LÓGICA PARA SUBIR DATOS A FIRESTORE
            console.log('Enviando producto a Firebase: ', productoCompleto);
            // Apuntamos a la colección "productos" (si no existe se crea)
            const productosCollection = collection(db, "productos nacionales");

            if (modoEdicion) {
                // Si estamos en modo edicion actualiza el producto
                const docRef = doc(db, "productos nacionales", productoAEditar.firestoreID);
                await updateDoc(docRef, productoCompleto)
            } else {
                // Si no estamos en modo edicion agregamos el nuevo documento a la colección
                await addDoc(productosCollection, productoCompleto);
            }

            await cargarProductos();
            // Reseteamos el formulario solo si todo fue exitoso
            setDatosForm(estadoInicialForm);
            setImagenFile(null);

            setProductoAEditar(null);

        } catch (error) {
            console.error("Error en el proceso de envío: ", error);
            alert("Hubo un error al subir la imagen. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }

    };

    const manejarDelete = async (producto) => {
        const confirmacion = window.confirm(`¿Esta seguro que desea eliminar "${producto.nombre}"?`);
        if (confirmacion) {
            const docRef = doc(db, "productos nacionales", producto.firestoreID);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio
            setProductos(productos.filter(prod => prod.firestoreID !== producto.firestoreID));
            alert("Producto eliminado.");
        }
    };

    return (
        <div>

            <h2>Gestión de Productos</h2>
            <hr />
            <FormNewProductos
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarCambioImagen={manejarCambioImagen}
                manejarEnvio={manejarEnvio}
                modoEdicion={modoEdicion}
                loading={loading}
            />
            <hr />
            <h3>Lista de Productos</h3>
                {productos.map((prod) => (
                    <div className={estilos.productos} key={prod.id}>
                        <div className={styles.carritoItems}>
                            {prod.id} - {prod.nombre} - ${prod.precio}
                            {/*acá agregaremos los botones de acción */}
                            <button className={styles.botones_secundarios} onClick={() => manejarEditar(prod)}>Editar</button>
                            <button className={styles.botones_secundarios} onClick={() => manejarDelete(prod)}>Eliminar</button>
                        </div>
                    </div>
                ))}
        </div>
    );
};
export default GestionProductos;