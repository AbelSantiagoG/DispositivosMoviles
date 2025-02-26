import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";

const Dashboard = () => {
    return (
        <ScrollView className="h-full bg-black p-4">

            <Text className="text-white text-2xl font-bold mb-4">
                Gestión Empresarial
            </Text>

            <View className="flex flex-row flex-wrap justify-between">
                <Link href='/dashboard/inventory/' asChild>
                    <TouchableOpacity className="w-[48%] bg-neutral-800 p-4 rounded-2xl mb-4">
                        <FontAwesome5 name="warehouse" size={20} color="white" />
                        <Text className="text-white font-semibold mt-2">Gestión de Inventario</Text>
                        <Text className="text-gray-400 text-sm">Administra tu inventario eficientemente.</Text>
                    </TouchableOpacity>
                </Link>

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
                    <FontAwesome5 name="store" size={20} color="white" />
                    <Text className="text-white font-semibold mt-2">Punto de Venta</Text>
                    <Text className="text-gray-400 text-sm">Procesamiento de ventas sin problemas.</Text>
                </View>

            </View>
            <View className=" bg-neutral-800 p-4 rounded-2xl mb-7">
                <View className=' flex-row flex-wrap justify-between'>
                    <Text className="text-white font-semibold mt-2">Resumen Financiero</Text>
                    <Text className="text-gray-400 text-sm mt-2">Ganancias</Text>
                </View>
                <Text className='text-white font-semibold  text-4xl mt-4'>$25,000</Text>
                <Link href='/reports' asChild>
                    <TouchableOpacity className=" bg-zinc-700 p-4 rounded-full items-center  mt-6">
                        <Text className="text-white text-lg font-bold ">Administrar</Text>
                    </TouchableOpacity>
                </Link>
            </View>


        </ScrollView>
    )
}

export default Dashboard;
