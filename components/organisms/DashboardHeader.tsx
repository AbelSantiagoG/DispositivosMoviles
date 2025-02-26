import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Logo } from '../atoms/Logo';

export function DashboardHeader() {
    return (
        <View className="flex-row justify-between items-center p-4">
            <Logo />
            
            <TouchableOpacity onPress={() => router.push('/dashboard/profile')}>
                <AntDesign name="user" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
} 