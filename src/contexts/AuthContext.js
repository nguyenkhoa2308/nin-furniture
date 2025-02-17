import { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        id: '',
        email: '',
        name: '',
    },
});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            id: '',
            email: '',
            name: '',
        },
    });

    // const login = (userData) => setAuth(userData);
    // const logout = () => setAuth(null);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
