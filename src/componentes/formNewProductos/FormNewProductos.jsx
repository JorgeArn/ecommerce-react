import React from "react";
import styles from "./FormNewProductos.module.css";


function FormNewProductos({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, loading }) {
    return (
        <form className={styles.formulario} onSubmit={manejarEnvio}>
            <div>
                <label>Nombre del Producto:</label>
                <input
                    type="text"
                    placeholder="Ej: Portafiltros"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    placeholder="Ej: 95"
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    placeholder="Ej: 5"
                    name="stock"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="file"
                    placeholder="https://..."
                    name="urlImagen"
                    value={datosForm.urlImagen}
                    onChange={manejarCambioImagen}
                />
            </div>
            <button disabled={loading} type="submit">{loading ? "Cargando Imagen..." : "Guardar Producto"}</button>
        </form>
    );
}

export default FormNewProductos;