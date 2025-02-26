import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Stack } from "expo-router";
import { InventoryCard } from '../../../components/molecules/InventoryCard';

const InventoryIndex = () => {
    const inventoryItems = [
        {
            title: 'Gestión de Productos',
            description: 'Administra tus productos eficientemente.',
            icon: <AntDesign name="inbox" size={28} color="white" />,
            href: '/dashboard/inventory/products'
        },
        {
            title: 'Gestión de Categorias',
            description: 'Administra tus categorias eficientemente.',
            icon: <AntDesign name="bars" size={28} color="white" />,
            href: '/dashboard/inventory/categories'
        },
        {
            title: 'Gestión de Proveedores',
            description: 'Monitorea e informa tus proveedores.',
            icon: <SimpleLineIcons name="people" size={24} color="white" />,
            href: '/dashboard/inventory/suppliers',
            fullWidth: true
        }
    ];

    return (
        <SafeAreaView className="h-full bg-black p-4">
            <Text className="text-white text-2xl font-bold mb-4">
                Gestión Inventario
            </Text>

            <View className="flex flex-row flex-wrap justify-between">
                {inventoryItems.map((item, index) => (
                    <InventoryCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        href={item.href}
                        fullWidth={item.fullWidth}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
};

export default InventoryIndex;