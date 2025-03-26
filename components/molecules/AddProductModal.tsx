import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Control } from 'react-hook-form';
import { ProductoFormData } from '../../validators/products';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import { useState, useEffect } from 'react';
import { categoriesService, CategorieData } from '../../lib/categories';


interface AddProductModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    control: Control<ProductoFormData>;
    errors: {};
}

export function AddProductModal({ isVisible, onClose, onSubmit, control, errors }: AddProductModalProps) {
    const [categorias, setCategorias] = useState<CategorieData[]>([]);
    const [loading, setLoading] = useState(true);
    

    const mockProveedores = [
        { id: '1', nombre: 'Proveedor 1' },
        { id: '2', nombre: 'Proveedor 2' },
        { id: '3', nombre: 'Proveedor 3' },
        { id: '4', nombre: 'Proveedor 4' },
        { id: '5', nombre: 'Proveedor 5' }
    ];
    
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await categoriesService.getAllCategories();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
                Alert.alert('Error', 'No se pudo cargar la lista de categorías');
            } finally {
                setLoading(false);
            }
        };
        
        fetchCategorias();
    }, [isVisible]);

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={{ margin: 0, justifyContent: 'flex-end' }}
        >
            <View className="bg-zinc-700 p-6 rounded-t-3xl">
                <TouchableOpacity onPress={onClose} className="w-52 h-1 bg-white rounded-full self-center mb-4" />

                <Text className="text-white text-4xl font-bold mb-4 text-center mt-2">Crear Producto</Text>

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
                                selectedValue={value && value.length > 0 ? value[0] : ''}
                                onValueChange={(itemValue) => onChange([itemValue])}
                                style={{ color: 'white' }}
                            >
                                <Picker.Item label="Seleccione una categoría" value="" />
                                {categorias.map((categoria) => (
                                    <Picker.Item
                                        key={categoria.id.toString()}
                                        label={categoria.name}
                                        value={categoria.id.toString()}
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
                <View className="flex-row justify-between mt-4">
                    <TouchableOpacity className=" bg-white rounded-3xl p-5 mb-3 ml-4 mr-4 flex-1" onPress={onSubmit}>
                        <Text className="text-black font-semibold text-center text-xl">➕ Agregar Producto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className=" bg-white rounded-3xl p-5 mb-3 mr-4 " >
                        <Feather name="camera" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}