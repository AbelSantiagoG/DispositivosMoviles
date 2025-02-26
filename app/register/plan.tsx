import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planFormSchema, type PlanFormData } from '../../validators/register';
import { router } from 'expo-router';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useState } from 'react';

const PLANES = [
    {
        id: 'avanzado',
        nombre: 'Plan Avanzado',
        precio: 49900,
        descripcion: 'Diseñado para grandes cadenas de supermercados y restaurantes'
    },
    {
        id: 'basico',
        nombre: 'Plan Basico',
        precio: 49900,
        descripcion: 'Diseñado para pequeños supermercados y restaurantes'
    },

    {
        id: 'medio',
        nombre: 'Plan Basico',
        precio: 49900,
        descripcion: 'Diseñado para pequeños supermercados y restaurantes'
    }
];

export default function RegisterPlan() {
    const { handleSubmit, setValue, control, formState: { errors } } = useForm<PlanFormData>({
        resolver: zodResolver(planFormSchema)
    });
    const [modalVisible, setModalVisible] = useState(false);

    const onSubmit = (data: PlanFormData) => {
        console.log(data);
        setModalVisible(false);
        alert('Pago exitoso');
        router.replace('/login');
    };

    const seleccionarPlan = (planId: string) => {
        setValue('plan', planId);
        setModalVisible(true);
    };

    return (
        <View className=" bg-black px-4 h-full">
            <View className="flex-row justify-center  p-3 rounded-full bg-transparent border-white border-2 mx-4">
                <View className="flex-row items-center mx-2">
                    <View className="w-10 h-10 rounded-full bg-neutral-500 items-center justify-center">
                        <Text className="text-white font-bold">1</Text>
                    </View>
                    <Feather name="user" size={20} color="white" className='ml-1' />
                </View>
                <View className="flex-row items-center mx-2">
                    <View className="w-10 h-10 rounded-full bg-neutral-500 items-center justify-center">
                        <Text className="text-white font-bold">2</Text>
                    </View>
                    <FontAwesome name="building-o" size={20} color="white" className='ml-1' />
                </View>
                <View className="flex-row items-center mx-2">
                    <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                        <Text className="text-black font-bold">3</Text>
                    </View>
                    <AntDesign name="shoppingcart" size={20} color="white" className='ml-1' />
                </View>
            </View>
            <Text className="text-white text-xl font-bold text-center mt-32">Elige tu Plan</Text>

            <FlatList
                data={PLANES}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item: plan }) => (
                    <View key={plan.id} className="bg-white rounded-xl p-4 mr-4 w-80 max-h-60 mt-5">
                        <Text className="text-black text-lg font-bold text-center">{plan.nombre}</Text>
                        <Text className="text-gray-600 text-center text-sm mt-2">{plan.descripcion}</Text>
                        <View className="flex-row justify-center items-baseline mt-4">
                            <Text className="text-black text-2xl font-bold">${plan.precio.toLocaleString()}</Text>
                            <Text className="text-gray-600 ml-1">/mes</Text>
                        </View>
                        <TouchableOpacity className="bg-gray-600 py-2 rounded-lg mt-6" onPress={() => seleccionarPlan(plan.id)}>
                            <Text className="text-white text-center font-bold text-base">Seleccionar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            {errors.plan && <Text className="text-red-500 text-center mt-2">{errors.plan.message}</Text>}


            <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
                <View className="bg-white p-6 rounded-lg">
                    <Text className="text-black text-lg font-bold mb-4 text-center">Ingrese los datos de pago</Text>
                    <Controller
                        control={control}
                        name="numeroTarjeta"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border border-gray-400 rounded-lg p-2 mb-4"
                                placeholder="Número de Tarjeta"
                                keyboardType="numeric"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="fechaExpiracion"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border border-gray-400 rounded-lg p-2 mb-4"
                                placeholder="Fecha de Expiración (MM/YY)"
                                keyboardType="numeric"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <View className="flex-row justify-between mt-4">
                        <TouchableOpacity className="bg-gray-600 py-2 px-4 rounded-lg" onPress={() => setModalVisible(false)}>
                            <Text className="text-white font-bold">Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-stone-800 py-2 px-4 rounded-lg" onPress={handleSubmit(onSubmit)}>
                            <Text className="text-white font-bold">Pagar Ahora</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
