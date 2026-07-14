import styles from './Contacto.module.css'

function Contacto({ id, nombre, rol, linkedinURL, fotoURL }) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <img src={fotoURL} alt={nombre} className={styles.avatar} />
                <div className={styles.cardBody}>
                    <h6>{nombre}</h6>
                    <p>{rol}</p>
                    <small>{linkedinURL}</small>
                </div>
            </div>
        </div>
    );
}

export default Contacto;