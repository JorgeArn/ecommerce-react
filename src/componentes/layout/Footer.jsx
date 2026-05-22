import ContactoContainer from '../contactoContainer/ContactoContainer';
import styles from './Layout.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <h2>Nosotros</h2>
            <ContactoContainer />
            <p>&copy; 2026 - Mi Aplicación React</p>
        </footer>
    );
}

export default Footer;