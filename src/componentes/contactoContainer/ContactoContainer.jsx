import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from './ContactoContainer.module.css'
import Contacto from '../contacto/Contacto'


function ContactoContainer() {
    const [contactos, setContactos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const equipoDB = collection(db, "equipo")
        getDocs(equipoDB).then((resp) => {
            setContactos(
                resp.docs.map((doc) => {
                    return { ...doc.data() }
                })
            );
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