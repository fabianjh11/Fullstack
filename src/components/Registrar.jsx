import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { firebaseAuth, db } from '../firebase/firebase-config';
import { addDoc, collection } from 'firebase/firestore';

export default function Registrar() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const {user: authUser } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const userData = {
                email: authUser.email,
                user,
                record: 0
            };
            localStorage.setItem("email", email);
            await addDoc(collection(db, "usuarios"), userData);
        } catch (error) {
            //Navigate to error page
        }
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
    })

    return (
    <div className='content'>
        <div className="container">
            <h1>Regístrate</h1>
            <span>Ingresa un formato de correo válido (ej. usuario@mail.com)</span>
            <input
                required
                type="email"
                placeholder='Correo'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <span>Ingrese un nombre de usuario</span>
            <input
                required
                type="text"
                placeholder='Usuario'
                value={user}
                onChange={(e) => setUser(e.target.value)} />
            <span>La contraseña debe tener al menos 6 caracteres de longitud</span>
            <input
                required
                type="password"
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <div className="button">
                <button onClick={handleSignIn}>Registrar</button>
                <span>
                    ¿Ya tienes una cuenta? 
                    <Link to="/login"> Inicia Sesión</Link>
                </span>
                <span>
                    <Link to="/">Volver</Link>
                </span>
            </div>
        </div>
    </div>
    )
}
