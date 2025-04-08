import { useContext } from 'react';
import { useAuth } from './AuthContext';
import { Text } from 'react-native';
import { hasPermission } from '../utils/permissionsUtils';
import { PERMISSIONS } from '../constants/permissions';

interface ProtectedRouteProps {
  children: JSX.Element;
  permissionName: string;
}

export const ProtectedRoute = ({ children, permissionName }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if (hasPermission(user, permissionName) === false) {
        return <Text>No tienes acceso.</Text>;
    }

    return children;
};
