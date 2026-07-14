import React from "react";
import { useState } from "react";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import FormNewProductos from "../formNewProductos/FormNewProductos";


function FormContainer({ Mensaje }) {
    const [datosForm, setDatosForm] = useState({
        id: 0,
        nombre: '',
        precio: 0,
        stock: 0,
        categoria: '',
        descripcion: '',
        destacado: false
    });

    const [imagenFile, setImagenFile] = useState(null);

    const [loading, setLoading] = useState(false);

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

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        // Se valida que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        setLoading(true);   // Se setea el loading en "true" antes del fetch.

        // --- Lógica para subir una imagen a imgbb ---
        const apiKey = 'daef5d9041633fbe450901b6e39394b6';
        const formData = new FormData();
        formData.append('image', imagenFile);

        try {
            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });

            const datosImgbb = await respuestaImgbb.json();

            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL: ", datosImgbb.data.url);

                // Unimos la URL de la imagen con el resto de los datos del formulario.
                const productoCompleto = {
                    ...datosForm,
                    // Agregamos la URL obtenida
                    imagen: datosImgbb.data.url
                };
                // LÓGICA PARA SUBIR DATOS A FIRESTORE
                console.log('Enviando producto a Firebase: ', productoCompleto);
                // Obtenemos la instancia de la base de datos
                const db = getFirestore();
                // Apuntamos a la colección "productos" (si no existe se crea)
                const productosCollection = collection(db, "productos nacionales");
                // Agregamos el nuevo documento a la colección
                await addDoc(productosCollection, productoCompleto);

            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
            // Reseteamos el formulario solo si todo fue exitoso
        } catch (error) {
            console.error("Error en el proceso de envío: ", error);
            alert("Hubo un error al subir la imagen. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div>
            <h2>{Mensaje}</h2>
            <FormNewProductos
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarEnvio={manejarEnvio}
                manejarCambioImagen={manejarCambioImagen}
                loading={loading}
            />
        </div>
    );
}

export default FormContainer;