import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase-config';


export default function IniciarSesion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogIn = async () => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            
        }
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser){
            localStorage.setItem("email", email);
            navigate("/");
        }
    });

    return (
        <div className="content">
            <div className="container">
                <h1>Inicia Sesión</h1>
                <input
                    type="email"
                    placeholder='Correo'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <div className="button">
                    <button onClick={handleLogIn}>Iniciar Sesión</button>
                    <span>
                        ¿Aún no tienes una cuenta? 
                        <Link to="/signup"> Regístrate</Link>
                    </span>
                    <span>
                        <Link to="/">Volver</Link>
                    </span>
                </div>
            </div>
        </div>
    
    )
}
