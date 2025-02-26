import { View, Text, TouchableOpacity } from 'react-native';
import { planCard, cardTitle, cardDescription, secondaryButton, secondaryButtonText } from '../Tokens';

interface PlanCardProps {
    nombre: string;
    descripcion: string;
    precio: number;
    onSelect: () => void;
}

export function PlanCard({ nombre, descripcion, precio, onSelect }: PlanCardProps) {
    return (
        <View className={planCard}>
            <Text className={cardTitle}>{nombre}</Text>
            <Text className={cardDescription}>{descripcion}</Text>
            <View className="flex-row justify-center items-baseline mt-4">
                <Text className="text-black text-2xl font-bold">
                    ${precio.toLocaleString()}
                </Text>
                <Text className="text-gray-600 ml-1">/mes</Text>
            </View>
            <TouchableOpacity 
                className={secondaryButton}
                onPress={onSelect}
            >
                <Text className={secondaryButtonText}>Seleccionar</Text>
            </TouchableOpacity>
        </View>
    );
} 