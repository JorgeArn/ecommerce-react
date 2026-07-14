import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from "../login/Login.module.css";

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const manejarSubmit = async (e) => {
        e.preventDefaul();
        setError(null); // Reseteamos cualquier error previo

        try {
            // Intentamos crear el nuevo usuario en firebase
            await createUserWithEmailAndPassword(auth, email, password);

            // Si la creación es exitosa, lo redirigimos al inicio 
            // Firebase ya gestiona el estado de sesión automáticamente 
            navigate('/');

        } catch (error) {
            // Aquí es donde manejamos el caso especifico que nos interesa 
            if (error.code === 'auth/email-already-in-use') {
                // Usamos window.confirm para hacer la pregunta al usuario
                const quiereLoguearse = window.confirm('Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?');

                if (quiereLoguearse) {
                    // Si el usuario confirma, lo redirigimos a la página de login
                    navigate('/login');
                } else {
                    // Si el usuario cancela, lo redirigimos a la página de inicio.
                    navigate('/');
                }

            } else {
                // Para cualquier otro error (contraseña débil, email inválido, etc.),
                // mostramos un mensaje genérico.
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error("Error en el registro: ", error.message);
            }
        }

    };

    return (
        <div className={styles.login_contenedor}>
            <h2>Crear Una Nueva Cuenta</h2>
            <form className={styles.formulario} onSubmit={manejarSubmit}>
                <div className={styles.campo}>
                    <label>Correo Electrónico: </label>
                    <input
                        type="email"
                        value={email}

                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.campo}>
                    <label>Contraseña: </label>
                    <input
                        type="password"
                        value={password}

                        onChange={(e) => setPassword(e.target.value)}
                        required

                        placeholder="Mínimo 6 caracteres"

                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className={styles.submit_boton} type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Registro;