import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { DashboardCard } from '../../components/molecules/DashboardCard';
import { FinancialSummary } from '../../components/molecules/FinancialSummary';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissionsUtils';
import { PERMISSIONS } from '../../constants/permissions';
import { useMemo } from 'react';

const Dashboard = () => {
    const { user } = useAuth();
    
    const dashboardItems = [
        {
            title: 'Gestión de Inventario',
            description: 'Administra tu inventario eficientemente.',
            icon: <FontAwesome5 name="warehouse" size={20} color="white" />,
            href: '/dashboard/inventory/',
            permission: PERMISSIONS.GESTIONAR_INVENTARIO
        },
        {
            title: 'Gestión de Empleados',
            description: 'Rastrea empleados y establece permisos.',
            icon: <MaterialIcons name="people" size={24} color="white" />,
            href: '/dashboard/employees/',
            permission: PERMISSIONS.GESTIONAR_EMPLEADOS
        },
        {
            title: 'Gestión Financiera',
            description: 'Monitorea e informa tus finanzas.',
            icon: <FontAwesome5 name="money-bill-wave" size={20} color="white" />,
            href: '/dashboard/reports/',
            permission: PERMISSIONS.VER_REPORTES
        },
        {
            title: 'Punto de Venta',
            description: 'Procesamiento de ventas sin problemas.',
            icon: <FontAwesome5 name="store" size={20} color="white" />,
            href: '/dashboard/cashier/',
            permission: PERMISSIONS.GESTIONAR_VENTAS
        },
        {
            title: 'Notificaciones',
            description: 'Envía notificaciones push a usuarios.',
            icon: <FontAwesome5 name="bell" size={20} color="white" />,
            href: '/dashboard/notifications'
        }
    ];

    // Filtrar elementos según permisos
    const filteredItems = useMemo(() => {
        return dashboardItems.filter(item => {
            if (!item.permission) return true; // Si no requiere permiso, mostrar siempre
            return hasPermission(user, item.permission);
        });
    }, [user]);

    return (
        <ScrollView className="h-full bg-black px-4">
            <Text className="text-white text-2xl font-bold">
                Gestión Empresarial
            </Text>

            <View className="flex flex-row flex-wrap justify-between">
                {filteredItems.map((item, index) => (
                    <DashboardCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        href={item.href}
                    />
                ))}
            </View>

            <FinancialSummary amount={25000} />
        </ScrollView>
    );
};

export default Dashboard;
