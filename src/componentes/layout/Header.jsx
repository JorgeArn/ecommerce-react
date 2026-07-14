import { Link } from 'react-router-dom';
import styles from './Layout.module.css'
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function Header() {
    const { getCartCantidad } = useCart();
    const { user, logout } = useAuth();
    const totalItems = getCartCantidad();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarMenu = () => setMenuAbierto(false);

    return (
        <header className={styles.header}>
            <nav >
                <Link to="/" onClick={cerrarMenu}>
                    <img src="/images/kuffeeLogo.png" alt="Kuffee Tienda" className={styles.logo} />
                </Link>

                <button
                    className={`${styles.menuToggle} ${menuAbierto ? styles.menuToggleAbierto : ''}`}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-label="Abrir menú"
                    aria-expanded={menuAbierto}
                >
                    {menuAbierto ? '✕' : '☰'}
                </button>

                <ul className={`${styles.nav} ${menuAbierto ? styles.navAbierto : ''}`}>
                    <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
                    <li><Link to="/productos" onClick={cerrarMenu}>Productos</Link></li>
                    {user ? (
                        <>
                            {user.rol === "admin" && (
                                <>
                                    <li><Link to="/gestion">Gestión Productos</Link></li>
                                    <li><Link to="/admin/cupones">Gestión Cupones</Link></li>
                                </>
                            )}

                            <li className={styles.saludo}>¡Hola, {user.email}!</li>
                            <li>
                                <button
                                    className={styles.logoutBtn}
                                    onClick={() => { logout(); cerrarMenu(); }}
                                >
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <li><Link to="/login" onClick={cerrarMenu}>Login</Link></li>
                    )}

                    <li>
                        <Link to="/carrito" onClick={cerrarMenu}>
                            🛒 {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;