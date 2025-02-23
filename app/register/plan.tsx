import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planFormSchema, type PlanFormData } from '../../validators/register';
import { router } from 'expo-router';

const PLANES = [
    {
        id: 'avanzado',
        nombre: 'Plan Avanzado',
        precio: 49900,
        descripcion: 'Diseñado para grandes cadenas de supermercados y restaurantes'
    },
    // Aquí puedes agregar más planes si los necesitas
];

export default function RegisterPlan() {
    const { handleSubmit, setValue, formState: { errors } } = useForm<PlanFormData>({
        resolver: zodResolver(planFormSchema)
    });

    const onSubmit = (data: PlanFormData) => {
        console.log(data);
        // Aquí puedes navegar a donde necesites después de completar el registro
        router.replace('/dashboard');
    };

    const seleccionarPlan = (planId: string) => {
        setValue('plan', planId);
        handleSubmit(onSubmit)();
    };

    return (
        <View className="flex-1 bg-black px-4">
            <View className="flex-row justify-center space-x-2 mb-8">
                <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
                    <Text className="text-white font-bold">1</Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
                    <Text className="text-white font-bold">2</Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-white items-center justify-center">
                    <Text className="text-black font-bold">3</Text>
                </View>
            </View>

            <Text className="text-white text-xl font-bold text-center mb-8">
                Elige tu Plan
            </Text>

            {PLANES.map((plan) => (
                <View key={plan.id} className="bg-white rounded-xl p-6 mb-4">
                    <Text className="text-black text-xl font-bold text-center">
                        {plan.nombre}
                    </Text>
                    <Text className="text-gray-600 text-center text-sm mt-2">
                        {plan.descripcion}
                    </Text>
                    <View className="flex-row justify-center items-baseline mt-4">
                        <Text className="text-black text-3xl font-bold">
                            ${plan.precio.toLocaleString()}
                        </Text>
                        <Text className="text-gray-600 ml-1">/mes</Text>
                    </View>

                    <View className="flex-row justify-center mt-4">
                        <View className="flex-row space-x-1">
                            {[1, 2, 3].map((dot) => (
                                <View
                                    key={dot}
                                    className="w-2 h-2 rounded-full bg-black"
                                />
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity
                        className="bg-gray-600 py-4 rounded-lg mt-6"
                        onPress={() => seleccionarPlan(plan.id)}
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            Seleccionar
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}

            {errors.plan && (
                <Text className="text-red-500 text-center mt-2">
                    {errors.plan.message}
                </Text>
            )}
        </View>
    );
}