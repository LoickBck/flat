import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setProfile(parsedUser);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    const signIn = (email, password) => {
        setLoading(true);
        try {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(u => u.email === email && u.password === password);

            if (foundUser) {
                const userToStore = {
                    email: foundUser.email, 
                    role: foundUser.role,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName
                };
                localStorage.setItem('user', JSON.stringify(userToStore));
                setUser(userToStore);
                setProfile(userToStore);
                return { user: userToStore };
            } else {
                return { error: 'Invalid credentials' };
            }
        } catch (error) {
            return { error: 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    const signUp = (email, password, options) => {
        setLoading(true);
        try {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = users.find(u => u.email === email);

            if (existingUser) {
                return { error: 'Email already exists' };
            }

            const newUser = { 
                email, 
                password, 
                role: options?.role || 'tenant', 
                firstName: options?.firstName || '',
                lastName: options?.lastName || ''
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            const userToStore = { 
                email: newUser.email, 
                role: newUser.role,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            };
            localStorage.setItem('user', JSON.stringify(userToStore));
            setUser(userToStore);
            setProfile(userToStore);

            return { user: userToStore };
        } catch (error) {
            return { error: 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    const signOut = () => {
        setUser(null);
        setProfile(null);
        localStorage.removeItem('user');
        toast({
            title: "Déconnexion",
            description: "Vous avez été déconnecté.",
        });
    };

    const value = { user, profile, loading, signIn, signUp, signOut };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};