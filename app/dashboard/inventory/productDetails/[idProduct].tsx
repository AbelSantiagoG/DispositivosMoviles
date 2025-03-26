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
import { ProductoFormData, productoFormSchema } from '../../../../validators/register';
import { router } from 'expo-router';

const productDetails = () => {
    const { idProduct } = useLocalSearchParams()

    const [modalVisible, setModalVisible] = useState(false);

    const mockCategorias = [
        { id: '1', nombre: 'Categoría 1' },
        { id: '2', nombre: 'Categoría 2' },
        { id: '3', nombre: 'Categoría 3' },
        { id: '4', nombre: 'Categoría 4' },
        { id: '5', nombre: 'Categoría 5' }
    ];

    const mockProveedores = [
        { id: '1', nombre: 'Proveedor 1' },
        { id: '2', nombre: 'Proveedor 2' },
        { id: '3', nombre: 'Proveedor 3' },
        { id: '4', nombre: 'Proveedor 4' },
        { id: '5', nombre: 'Proveedor 5' }
    ];

    const { handleSubmit, setValue, control, formState: { errors } } = useForm<ProductoFormData>({
        resolver: zodResolver(productoFormSchema)
    });


    const onSubmit = (data: ProductoFormData) => {
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

    return (
        <View className='h-full bg-black p-4'>
            <View className='rounded-2xl overflow-hidden h-96'>
                <Image source={require('../../../../assets/detailsProduct.png')} className='w-full h-full' />
            </View>
            <View className='mt-4'>
                <Text className="text-gray-400 text-sm mt-2 mb-1">ID: {idProduct}</Text>
                <Text className="text-gray-400 text-sm mt-2 mb-1">Bebidas</Text>
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
                    <TouchableOpacity onPress={onClose} className="w-52 h-1 bg-white rounded-full self-center mb-4 " />

                    <Text className="text-white text-4xl font-bold mb-4 text-center mt-2">Actualizar Producto</Text>

                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                                placeholder="Nombre del Producto"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="descripcion"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                                placeholder="Descripción"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <View className="flex-row justify-between">
                        <Controller
                            control={control}
                            name="precio"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4 ml-4 mr-2 flex-1"
                                    placeholder="Precio"
                                    placeholderTextColor="#ccc"
                                    keyboardType="numeric"
                                    value={value?.toString()}
                                    onChangeText={(text) => onChange(Number(text))}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="stock"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-2 mr-4 flex-1"
                                    placeholder="Stock"
                                    placeholderTextColor="#ccc"
                                    keyboardType="numeric"
                                    value={value?.toString()}
                                    onChangeText={(text) => onChange(Number(text))}
                                />
                            )}
                        />
                    </View>
                    <Controller
                        control={control}
                        name="categoria"
                        render={({ field: { onChange, value } }) => (
                            <View className="bg-zinc-500 rounded-3xl mb-4 ml-4 mr-4">
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(itemValue) => onChange(itemValue)}
                                    style={{ color: 'white' }}
                                >
                                    <Picker.Item label="Seleccione una categoría" value="" />
                                    {mockCategorias.map((categoria) => (
                                        <Picker.Item
                                            key={categoria.id}
                                            label={categoria.nombre}
                                            value={categoria.id}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="proveedor"
                        render={({ field: { onChange, value } }) => (
                            <View className="bg-zinc-500 rounded-3xl mb-4 ml-4 mr-4">
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(itemValue) => onChange(itemValue)}
                                    style={{ color: 'white' }}
                                >
                                    <Picker.Item label="Seleccione un proveedor" value="" />
                                    {mockProveedores.map((proveedor) => (
                                        <Picker.Item
                                            key={proveedor.id}
                                            label={proveedor.nombre}
                                            value={proveedor.id}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        )}
                    />
                    <TouchableOpacity className=" bg-white rounded-3xl p-5 mb-3 ml-4 mr-4" onPress={onClose}>
                        <Text className="text-black font-semibold text-center text-xl">🖊 Editar Producto</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    )
}

export default productDetails