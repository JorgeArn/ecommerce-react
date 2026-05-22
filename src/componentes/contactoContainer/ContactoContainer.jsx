import { useState, useEffect } from "react";
import styles from './ContactoContainer.module.css'
import Contacto from '../contacto/Contacto'

function ContactoContainer() {
    const [contactos, setContactos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data/nosotros.json')
            .then(res => {
                if(!res.ok) throw new Error("Error de carga");
                return res.json();
            })
            .then(data => {
                setContactos(data);
                setCargando(false);
            })
            .catch(err => {
                setError(err.message);
                setCargando(false);
            });
    }, [])

    if (cargando) return <p>Cargando datos...</p>

    if (error) return <p>Error: {error}</p>

    return (
        <div className={styles.grid}>
            {contactos.map(contacto => (
                <Contacto key={contacto.id} {...contacto} />
            ))}
        </div>
    )
}

export default ContactoContainer;