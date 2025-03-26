import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { EmpleadoFormData, empleadosFormSchema } from '../../../validators/employees';

const productDetails = () => {
    const { idEmployees } = useLocalSearchParams()

    const [modalVisible, setModalVisible] = useState(false);


    const { handleSubmit, setValue, control, formState: { errors } } = useForm<EmpleadoFormData>({
        resolver: zodResolver(empleadosFormSchema)
    });


    const onSubmit = (data: EmpleadoFormData) => {
        console.log(data);
        setModalVisible(false);
        //router.replace('/login');
    };

    const seleccionar = () => {
        setModalVisible(true);
    };

    const onClose = () => {
        setModalVisible(false);
    }

    const mockEmpresas = [
        { id: '1', nombre: 'Empresa 1' },
        { id: '2', nombre: 'Empresa 2' },
        { id: '3', nombre: 'Empresa 3' },
        { id: '4', nombre: 'Empresa 4' },
        { id: '5', nombre: 'Empresa 5' }
    ];

    return (
        <View className='h-full bg-black p-4'>
            <View className='rounded-2xl  h-96 w-96 self-center '>
                <Image source={require('../../../assets/empleado.png')} className='w-full h-full' />
            </View>
            <View className='mt-4'>
                <Text className="text-gray-400 text-sm mt-2 mb-1">ID: {idEmployees}</Text>
                <Text className="text-gray-400 text-sm mt-2 mb-1">Empleado</Text>
                <Text className="text-white font-semibold text-4xl">Coca-Cola</Text>
                <Text className="text-white text-sm">$1.50</Text>
                <Text className="text-white text-sm mt-3">Coca-Cola is a carbonated soft drink manufactured by The Coca-Cola Company.</Text>
                <Text className="text-gray-400 text-sm mt-3 mb-4">Ver más detalles</Text>
            </View>
            <View className='flex-row  justify-between mb-7'>
                <TouchableOpacity className=" bg-zinc-800 rounded-full p-4 mb-3 w-[48%] items-center" onPress={seleccionar}>
                    <Text className="text-white font-semibold"> Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity className=" bg-white rounded-full p-4 mb-3 w-[48%] items-center">
                    <Text className="text-black font-semibold"> Eliminar </Text>
                </TouchableOpacity>
            </View>


            <Modal
                isVisible={modalVisible}
                onBackdropPress={onClose}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >

                <View className="bg-zinc-700 p-6 rounded-t-3xl">
                    <TouchableOpacity onPress={onClose} className="w-52 h-1 bg-white rounded-full self-center mb-4" />

                    <Text className="text-white text-4xl font-bold mb-4 text-center mt-2">Actualizar Empleado</Text>

                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                                placeholder="Nombre del empleado"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="apellido"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                                placeholder="Apellido"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                                placeholder="Email"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="telefono"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                                placeholder="Teléfono"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="empresa"
                        render={({ field: { onChange, value } }) => (
                            <View className="bg-zinc-500 rounded-3xl mb-4 ml-4 mr-4">
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(itemValue) => onChange(itemValue)}
                                    style={{ color: 'white' }}
                                >
                                    <Picker.Item label="Seleccione una empresa" value="" />
                                    {mockEmpresas.map((empresa) => (
                                        <Picker.Item
                                            key={empresa.id}
                                            label={empresa.nombre}
                                            value={empresa.id}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        )}
                    />
                    <View className="flex-row justify-between mt-4">
                        <TouchableOpacity className=" bg-white rounded-3xl p-5 mb-3 ml-4 mr-4 flex-1" onPress={onClose}>
                            <Text className="text-black font-semibold text-center text-xl">➕ Actualizar Empleado</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default productDetails