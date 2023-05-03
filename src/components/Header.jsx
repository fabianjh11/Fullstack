import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase-config';
import Navbar from './Navbar';

export default function Header() {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
        setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogout = () => {
        signOut(firebaseAuth).then(() => {
            setUser(undefined);
        });
    };

    return (
        <Navbar user={user} handleLogout={handleLogout} />
    );
}
