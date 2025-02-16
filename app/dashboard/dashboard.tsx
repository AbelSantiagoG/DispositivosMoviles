import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const Dashboard = () => {
    return (
        <SafeAreaView className="h-full bg-black p-4">

            <Text className="text-white text-2xl font-bold mb-4">
                Gestión Empresarial
            </Text>

            <View className="flex flex-row flex-wrap justify-between">

                <View className="w-[48%] bg-neutral-800 p-4 rounded-2xl mb-4">
                    <FontAwesome5 name="warehouse" size={20} color="white" />
                    <Text className="text-white font-semibold mt-2">Gestión de Inventario</Text>
                    <Text className="text-gray-400 text-sm">Administra tu inventario eficientemente.</Text>
                </View>

                <View className="w-[48%] bg-neutral-800 p-4 rounded-2xl mb-4">
                    <MaterialIcons name="people" size={24} color="white" />
                    <Text className="text-white font-semibold mt-2">Gestión de Empleados</Text>
                    <Text className="text-gray-400 text-sm">Rastrea empleados y establece permisos.</Text>
                </View>

                <View className="w-[48%] bg-neutral-800 p-4 rounded-2xl mb-4">
                    <FontAwesome5 name="money-bill-wave" size={20} color="white" />
                    <Text className="text-white font-semibold mt-2">Gestión Financiera</Text>
                    <Text className="text-gray-400 text-sm">Monitorea e informa tus finanzas.</Text>
                </View>

                <View className="w-[48%] bg-neutral-800 p-4 rounded-2xl mb-4">
                    <Ionicons name="refresh" size={24} color="white" />
                    <Text className="text-white font-semibold mt-2">Punto de Venta</Text>
                    <Text className="text-gray-400 text-sm">Procesamiento de ventas sin problemas.</Text>
                </View>

            </View>

        </SafeAreaView>
    )
}

export default Dashboard;
