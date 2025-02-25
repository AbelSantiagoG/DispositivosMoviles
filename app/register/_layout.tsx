import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

export default function RegisterLayout() {
    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className=" items-center justify-center mt-10">
                <View className="w-52 h-20 mb-4 ">
                    <Image className="w-full h-full" source={require("../../assets/logo.png")} resizeMode="contain" />
                </View>
            </View>
            <Stack screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="empresa" />
                <Stack.Screen name="plan" />
            </Stack>
        </SafeAreaView>
    );
}