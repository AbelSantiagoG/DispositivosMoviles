import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDAO } from '../interfaces/Auth';
import { authService } from '../lib/auth';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import { usePushNotifications } from '../hooks/usePushNotifications';

export interface AuthContextType {
    user: UserDAO | null; 
    setUser: (user: UserDAO) => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
});

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { expoPushToken } = usePushNotifications();

    // Efecto para registrar el token de notificaciones cuando cambia
    useEffect(() => {
        const registerTokenIfAuthenticated = async () => {
            if (user && expoPushToken?.data) {
                try {
                    await authService.registerPushToken(expoPushToken.data);
                    console.log('Token de notificaciones registrado automáticamente');
                } catch (error) {
                    console.error('Error al registrar token automáticamente:', error);
                }
            }
        };

        registerTokenIfAuthenticated();
    }, [user, expoPushToken]);
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data: UserDAO = await authService.getCurrentUser();            
                if (data) {
                    setUser(data);
                } else {
                    setUser(null);
                    router.replace('/login');
                }
            } catch (error) {
                console.error('Error checking auth token:', error);
                router.replace('/login');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);