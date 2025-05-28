import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { planCard, cardTitle, cardDescription, secondaryButton, secondaryButtonText } from '../Tokens';

interface PlanCardProps {
    title: string;
    description: string;
    price: number;
    onSelect: () => void;
}

export const PlanCard = ({ title, description, price, onSelect }: PlanCardProps) => {
    return (
        <View className="bg-white p-6 rounded-lg shadow-md">
            <Text className="text-xl font-bold text-center">{title}</Text>
            <Text className="text-gray-600 text-center mt-2">{description}</Text>
            <View className="flex-row justify-center items-baseline mt-4">
                <Text className="text-black text-2xl font-bold">
                    ${price.toLocaleString()}
                </Text>
                <Text className="text-gray-600 ml-1">/mes</Text>
            </View>
            <TouchableOpacity
                onPress={onSelect}
                className="bg-blue-500 py-3 rounded-lg mt-4"
                accessibilityRole="button"
            >
                <Text className="text-white text-center font-semibold">Seleccionar</Text>
            </TouchableOpacity>
        </View>
    );
}; 