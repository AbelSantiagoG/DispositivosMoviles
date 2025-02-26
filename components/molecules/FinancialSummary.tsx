import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

interface FinancialSummaryProps {
    amount: number;
}

export function FinancialSummary({ amount }: FinancialSummaryProps) {
    return (
        <View className="bg-neutral-800 p-4 rounded-2xl mb-7">
            <View className="flex-row flex-wrap justify-between">
                <Text className="text-white font-semibold mt-2">
                    Resumen Financiero
                </Text>
                <Text className="text-gray-400 text-sm mt-2">
                    Ganancias
                </Text>
            </View>
            <Text className="text-white font-semibold text-4xl mt-4">
                ${amount.toLocaleString()}
            </Text>
            <Link href="/dashboard/reports" asChild>
                <TouchableOpacity className="bg-zinc-700 p-4 rounded-full items-center mt-6">
                    <Text className="text-white text-lg font-bold">
                        Administrar
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
} 