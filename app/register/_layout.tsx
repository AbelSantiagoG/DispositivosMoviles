import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

export default function RegisterLayout() {
    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="p-4">
                <Image source={require('../../assets/logo.png')} className='w-32 h-32 mx-auto' resizeMode="contain" />
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