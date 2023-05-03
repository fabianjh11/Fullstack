import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseAuth, db } from '../firebase/firebase-config';
import Header from './Header';
import Main from './Main';

export default function JuegoSnake() {
    const [user, setUser] = useState(undefined);
    const [record, setRecord] = useState(0);
    const navigate = useNavigate();

    const updateRecord = (newRecord) => {
        setRecord(newRecord);
    }

    useEffect(() => {
        setRecord(record);
        const email = localStorage.getItem("email").toLowerCase();
        const getUserInfo = async () => {
            const usuariosRef = collection(db, 'usuarios');
            const usuariosQuery = query(usuariosRef, where('email', '==', email));
            const usuariosSnapshot = await getDocs(usuariosQuery);
            usuariosSnapshot.forEach((doc) => {
                const userData = doc.data();
                setUser(userData.user);
                setRecord(userData.record);
                localStorage.setItem("record", userData.record.toString());
            });
        };
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                if(localStorage.getItem("email") != null){
                    getUserInfo();
                }
            } else {
                navigate("/login");
            }
        });
    }, [navigate]);

    return (
        <div>
            <Header />
                <div className='data'>
                    <p>{user}</p>
                    <p>Récord: {record}</p>
                </div>
            <Main records={record} onUpdateRecord={updateRecord}/>
            <div className="btns">
                <Link className='volver' to="/">Volver</Link>
            </div>
        </div>
    )
}