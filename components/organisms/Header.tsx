import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Logo } from '../atoms/Logo';
import { router } from 'expo-router';

interface HeaderProps {
    showBackButton?: boolean;
    showProfileButton?: boolean;
    onProfilePress?: () => void;
}

export function Header({ 
    showBackButton = false, 
    showProfileButton = false,
    onProfilePress 
}: HeaderProps) {
    return (
        <View className="flex-row justify-between items-center p-4">
            {showBackButton ? (
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ) : <View className="w-6" />}

            <Logo />

            {showProfileButton ? (
                <TouchableOpacity onPress={onProfilePress}>
                    <AntDesign name="user" size={24} color="white" />
                </TouchableOpacity>
            ) : <View className="w-6" />}
        </View>
    );
} 