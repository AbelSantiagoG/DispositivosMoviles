import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { Stack } from "expo-router";

const index = () => {
    return (
        <SafeAreaView className="h-full bg-black p-4">
            <Text className="text-white text-2xl font-bold mb-4">
                Gestión Inventario
            </Text>

            <View className="flex flex-row flex-wrap justify-between">
                <Link href='/dashboard/inventory/products' asChild>
                    <TouchableOpacity className="w-[48%] bg-neutral-800 p-4 rounded-2xl mb-4">
                        <AntDesign name="inbox" size={28} color="white" />
                        <Text className="text-white font-semibold mt-2">Gestión de Productos</Text>
                        <Text className="text-gray-400 text-sm">Administra tus productos eficientemente.</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/dashboard/inventory/categories' asChild>
                    <TouchableOpacity className="w-[48%] bg-neutral-800 p-4 rounded-2xl mb-4">
                        <AntDesign name="bars" size={28} color="white" />
                        <Text className="text-white font-semibold mt-2">Gestión de Categorias</Text>
                        <Text className="text-gray-400 text-sm">Administra tus categorias eficientemente.</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/dashboard/inventory/suppliers' asChild>
                    <TouchableOpacity className="w-full bg-neutral-800 p-4 rounded-2xl pb-11">
                        <SimpleLineIcons name="people" size={24} color="white" />
                        <Text className="text-white font-semibold mt-2">Gestión de Proveedores</Text>
                        <Text className="text-gray-400 text-sm">Monitorea e informa tus proveedores.</Text>
                    </TouchableOpacity>
                </Link>
            </View>


        </SafeAreaView>

    )
}

export default index