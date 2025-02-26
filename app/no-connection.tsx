import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NoConnection() {
    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="items-center justify-center mt-10">
                <View className="w-52 h-20 mb-4">
                    <Image className="w-full h-full" source={require("../assets/logo.png")} resizeMode="contain" />
                </View>
            </View>
            
            <View className="flex-1 items-center justify-center px-4">
                <MaterialCommunityIcons name="wifi-off" size={100} color="black" />
                <Text className="text-black text-2xl font-bold text-center mt-6">
                    Sin conexión a Internet
                </Text>
                <Text className="text-gray-400 text-center mt-4 text-lg">
                    Por favor, verifica tu conexión a internet e intenta nuevamente
                </Text>
            </View>
        </SafeAreaView>
    );
} 