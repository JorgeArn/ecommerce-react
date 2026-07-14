import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import styles from "../login/Login.module.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const manejarLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario logueado:", user);
                alert("¡Inicio de sesión exitoso!");
                navigate('/'); 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error en el login:", errorCode, errorMessage);
                alert("Error: " + errorMessage);
            });
    };
    // return (
    //     <div>
    //         <h2>Iniciar Sesión</h2>
    //         <form onSubmit={manejarLogin}>
    //             <input
    //                 type="email"
    //                 placeholder="Correo electrónico"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //             />
    //             <input
    //                 type="password"
    //                 placeholder="Contraseña"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //             />
    //             <button type="submit">Ingresar</button>
    //         </form>
    //     </div>
    // );

    return (
        <div className={styles.login_contenedor}>
          <h2>Iniciar Sesión</h2>
          <form className={styles.formulario} onSubmit={manejarLogin}>
            {/* Email */}
            <div className={styles.campo}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ej.: tuemail@email.com"
                required
              />
            </div>
    
            {/* Contraseña */}
            <div className={styles.campo}>
              <label htmlFor="password">Contraseña</label>
              <div className={styles.pass_input}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ej.: tucontraseña"
                  required
                />
              </div>
            </div>
    
            {/* Botón */}
            <button type="submit" className={styles.submit_boton}>
              Ingresar
            </button>
    
            {/* Crear cuenta */}
            <p className={styles.registro}>
              ¿No tenés cuenta aún? <Link to="/registro">Crear cuenta</Link>
            </p>
          </form>
        </div>
      );
};

export default Login;