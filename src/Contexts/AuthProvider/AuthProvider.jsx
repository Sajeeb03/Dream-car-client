import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.confiq';
const auth = getAuth(app);
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleSignIn = provider => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const registration = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log("user updated", currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => { unsubscribe() }
    }, [])
    const authInfo = {
        user,
        loading,
        googleSignIn,
        registration,
        updateUser,
        login,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;