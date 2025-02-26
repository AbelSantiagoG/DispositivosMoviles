import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { DashboardCard } from '../../components/molecules/DashboardCard';
import { FinancialSummary } from '../../components/molecules/FinancialSummary';

const Dashboard = () => {
    const dashboardItems = [
        {
            title: 'Gestión de Inventario',
            description: 'Administra tu inventario eficientemente.',
            icon: <FontAwesome5 name="warehouse" size={20} color="white" />,
            href: '/dashboard/inventory/'
        },
        {
            title: 'Gestión de Empleados',
            description: 'Rastrea empleados y establece permisos.',
            icon: <MaterialIcons name="people" size={24} color="white" />
        },
        {
            title: 'Gestión Financiera',
            description: 'Monitorea e informa tus finanzas.',
            icon: <FontAwesome5 name="money-bill-wave" size={20} color="white" />
        },
        {
            title: 'Punto de Venta',
            description: 'Procesamiento de ventas sin problemas.',
            icon: <FontAwesome5 name="store" size={20} color="white" />
        }
    ];

    return (
        <ScrollView className="h-full bg-black p-4">
            <Text className="text-white text-2xl font-bold mb-4">
                Gestión Empresarial
            </Text>

            <View className="flex flex-row flex-wrap justify-between">
                {dashboardItems.map((item, index) => (
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
