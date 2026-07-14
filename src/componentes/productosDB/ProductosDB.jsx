import React, { useState, useEffect } from "react";
// Importaciones clave de Firebase
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase/config";

const ProductosDB = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const prodDB = collection(db, "productos nacionales")
        getDocs(prodDB).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                })
            );
        })
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez

    return (
        <div>
            <h2>Productos DB</h2>
            <div>
                {/* 5. Mapeamos el estado `productos` para renderizar cada uno */}
                {productos.map(prod => (
                    <div key={prod.id} >
                        <img src={prod.imagen} alt={prod.nombre} style={{
                            width: '100px'
                        }} />
                        <h3>{prod.nombre}</h3>
                        <p>Categoría: {prod.categoria}</p>
                        <p>Precio: ${prod.precio}</p>
                        <p>Stock: {prod.stock} unidades</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductosDB;