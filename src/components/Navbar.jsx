import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png";

export default function Navbar({ user, handleLogout }) {
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h2 className="nombre">Snakes</h2>
            </div>
            {user ? (
                <div>
                <button className='cerrar' onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <div>
                <nav className='abrir'>
                    <Link className='btn' to="/signup">Regístrate</Link>
                    <Link className='btn' to="/login">Iniciar Sesión</Link>
                </nav>
                </div>
            )}
        </header>
      );
}
