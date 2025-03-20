import { useContext,useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { View, Text, ActivityIndicator } from 'react-native';

export const ProtectedRoute = ({ children, permissionName }: { children: JSX.Element, permissionName: string }) => {
    const { user } = useAuth();

    // Verificar si el usuario tiene un permiso específico
    const hasPermission = (permissionName: string) => {
        if (!user || !user.role || !user.role.permissions) return false;
        return user.role.permissions.some(permission => permission.name === permissionName);
    };
    

    if (hasPermission(permissionName) === false) {
        return <Text>No tienes acceso.</Text>;
    }

    return children;
};
