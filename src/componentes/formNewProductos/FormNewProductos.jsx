import React from "react";
import styles from "./FormNewProductos.module.css";


function FormNewProductos({
    datosForm,
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen,
    loading,
    modoEdicion
}) {
    return (
        <form className={styles.formulario} onSubmit={manejarEnvio}>
            <h3>
                {modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}
            </h3>
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
                <label>Id del producto:</label>
                <input
                    type="number"
                    placeholder="Ej: 1"
                    name="id"
                    value={datosForm.id}
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
                <label>Categoría:</label>
                <input
                    type="text"
                    placeholder="Ej: Accesorios"
                    name="categoria"
                    value={datosForm.categoria}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    placeholder="Escribe aquí..."
                    name="descripcion"
                    value={datosForm.descripcion}
                    onChange={manejarCambio}
                    rows={4}
                    cols={40}
                />
            </div>
            <div>
                <label>Destacado:</label>
                <input
                    type="checkbox"
                    name="destacado"
                    checked={datosForm.destacado}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Imagen:</label>
                {modoEdicion && datosForm.imagen && (
                    <div>
                        <p>Imagen actual:</p>
                        <img
                            className={styles.preview}
                            src={datosForm.imagen}
                            alt={datosForm.nombre}
                            width={120}
                        />
                    </div>
                )}
                <input
                    type="file"
                    placeholder="https://..."
                    name="imagen"
                    onChange={manejarCambioImagen}
                />
            </div>
            <button disabled={loading} type="submit">
                {
                    loading
                        ? "Procesando..."
                        : modoEdicion
                            ? "Actualizar Producto"
                            : "Guardar Producto"
                }
            </button>
        </form>
    );
}

export default FormNewProductos;