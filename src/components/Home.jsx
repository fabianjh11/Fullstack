import React, { useEffect, useState } from 'react'
import Header from './Header'
import { db } from '../firebase/firebase-config'
import { collection, orderBy, query, getDocs, limit } from 'firebase/firestore'
import { Link } from 'react-router-dom';

export default function Home() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const getLeaderboardData = async () => {
            const usersRef = collection(db, "usuarios");
            const usersQuery = query (usersRef, orderBy('record', 'desc'), limit(10));
            const querySnapshot = await getDocs(usersQuery);
            const leaderboard = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setLeaderboardData(leaderboard);
        };
        getLeaderboardData();
    }, []);

    return (
        <div className='home'>
            <Header />
            <div className="home-content">
                <br />
                <div className="leaderboard">
                    <h2>Leaderboard</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Usuario</th>
                                <th>Record</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.user}</td>
                                    <td>{item.record}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <div className="play">
                    <Link to="/game">Jugar</Link>
                </div>
                <div className="text">
                    <p>
                        ¡Inicia sesión para poder jugar y ganarte un lugar en la tabla de líderes!
                    </p>
                    <div className="how-to-play">
                        <div className="rules">
                            <h2>
                                ¿CÓMO JUGAR?
                            </h2>
                            <div>
                                <p>► Desplaza tu personaje con las flechas → ↑ ← ↓ o con las teclas WASD.</p>
                                <p>► Recolecta los elementos comestibles para aumentar el tamaño de tu personaje.</p>
                                <p>► Las frutas especiales (amarillas) invierten la dirección del personaje.</p>
                                <p>► No colisiones tu personaje con los obstáculos.</p>
                                <p>► No colisiones tu personaje con los límites.</p>
                                <p>► No colisiones tu personaje con tu propio personaje.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
