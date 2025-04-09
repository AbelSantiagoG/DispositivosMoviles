import { useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/dashboard');
        }
    }, [user]);

    if (user) {
        return (
            <View className="flex-1 items-center justify-center bg-black">
                <Text className="text-white">Redirigiendo...</Text>
            </View>
        );
    }

    return children;
}; 