import { Link } from 'react-router-dom';
import styles from './Layout.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <nav >
                <img src="./public/images/kuffeeLogo.png" alt="Kuffee Tienda" className={styles.logo} />
                <ul className={styles.nav}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/alta">Cargar Producto</Link></li>
                    <button>Login</button>
                    <button>Carrito</button>
                </ul>
            </nav>
        </header>
    );
}

export default Header;