import React from "react";
import { useState } from "react";
import FormNewProductos from "../formNewProductos/FormNewProductos";


function FormContainer({ Mensaje }) {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: ''
    });

    const [imagenFile, setImagenFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm, [name]: value
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
                    urlImagen: datosImgbb.data.url
                };

                // Por el momento hacemos un console.log
                console.log('Enviando los siguientes datos COMPLETOS a la API: ', productoCompleto);

            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }

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