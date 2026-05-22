import styles from './Contacto.module.css'

function Contacto({ nombre, email, puesto, foto }) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <img src={foto} alt={nombre} className={styles.avatar} />
                <div className={styles.cardBody}>
                    <h6>{nombre}</h6>
                    <p>{puesto}</p>
                    <small>{email}</small>
                </div>
            </div>
        </div>
    );
}

export default Contacto;