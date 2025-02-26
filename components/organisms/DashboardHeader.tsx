import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Logo } from '../atoms/Logo';

interface DashboardHeaderProps {
    userInfo?: string | null;
}

export function DashboardHeader({ userInfo }: DashboardHeaderProps) {
    return (
        <View className="flex-row justify-between items-center p-4">
            <Logo />
            
            {userInfo && (
                <Text className="text-white text-sm ml-4">{userInfo}</Text>
            )}

            <TouchableOpacity onPress={() => router.push('/dashboard/profile')}>
                <AntDesign name="user" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
} 