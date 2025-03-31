import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductoFormData, productoFormSchema } from '../../../../validators/products';
import { productService } from '../../../../lib/products';
import { categoriesService, CategorieData } from '../../../../lib/categories';

const ProductDetails = () => {
    const { idProduct } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [categorias, setCategorias] = useState<CategorieData[]>([]);

    const { handleSubmit, setValue, control, formState: { errors }, reset } = useForm<ProductoFormData>({
        resolver: zodResolver(productoFormSchema)   
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(Number(idProduct));
                setProduct(data);
                setValue('nombre', data.name);
                setValue('descripcion', data.description);
                setValue('precio', data.public_price);
                setValue('stock', data.stock);
                setValue('categoria', [data.category_id.toString()]);
                setValue('proveedor', '1');
            } catch (error) {
                console.error('Error al obtener producto:', error);
                Alert.alert('Error', 'No se pudo cargar el producto');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategorias = async () => {
            try {
                const data = await categoriesService.getAllCategories();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };

        fetchProduct();
        fetchCategorias();
    }, [idProduct]);

    const onSubmit = async (data: ProductoFormData) => {
        try {
            await productService.updateProduct(Number(idProduct), {
                name: data.nombre,
                description: data.descripcion,
                stock: data.stock,
                supplier_price: data.precio * 0.7,
                public_price: data.precio,
                category_id: Number(data.categoria[0]) || 1,
                // Mantener los demás campos iguales
                status: product.status,
                thumbnail: product.thumbnail,
                bar_code: product.bar_code,
                minimal_safe_stock: product.minimal_safe_stock,
                discount: product.discount,
                enterprise_id: product.enterprise_id,
                supplier_id: 1 
            });
            
            setModalVisible(false);
            Alert.alert('Éxito', 'Producto actualizado correctamente');
            
            const updatedProduct = await productService.getProductById(Number(idProduct));
            setProduct(updatedProduct);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            Alert.alert('Error', 'No se pudo actualizar el producto');
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar este producto?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await productService.deleteProduct(Number(idProduct));
                            Alert.alert(
                                'Éxito', 
                                'Producto eliminado correctamente',
                                [
                                    { 
                                        text: 'OK', 
                                        onPress: () => {
                                            router.replace('/dashboard/inventory/products');
                                        }
                                    }
                                ]
                            );
                        } catch (error) {
                            console.error('Error al eliminar producto:', error);
                            Alert.alert('Error', 'No se pudo eliminar el producto');
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View className='h-full bg-black p-4 items-center justify-center'>
                <Text className="text-white">Cargando producto...</Text>
            </View>
        );
    }

    return (
        <View className='h-full bg-black p-4'>
            <View className='rounded-2xl overflow-hidden h-96'>
                <Image source={require('../../../../assets/detailsProduct.png')} className='w-full h-full' />
            </View>
            <View className='mt-4'>
                <Text className="text-gray-400 text-sm mt-2 mb-1">ID: {idProduct}</Text>
                <Text className="text-gray-400 text-sm mt-2 mb-1">
                    {categorias.find(c => c.id === product.category_id)?.name || 'Categoría no disponible'}
                </Text>
                <Text className="text-white font-semibold text-4xl">{product.name}</Text>
                <Text className="text-white text-sm">${product.public_price}</Text>
                <Text className="text-white text-sm mt-3">{product.description}</Text>
                <Text className="text-white text-sm mt-3">Stock: {product.stock} unidades</Text>
            </View>
            <View className='flex-row justify-between mb-7 mt-4'>
                <TouchableOpacity 
                    className="bg-zinc-800 rounded-full p-4 mb-3 w-[48%] items-center" 
                    onPress={() => setModalVisible(true)}
                >
                    <Text className="text-white font-semibold">Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className="bg-red-600 rounded-full p-4 mb-3 w-[48%] items-center"
                    onPress={handleDelete}
                >
                    <Text className="text-white font-semibold">Eliminar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >
                <View className="bg-zinc-700 p-6 rounded-t-3xl">
                    <TouchableOpacity onPress={() => setModalVisible(false)} className="w-52 h-1 bg-white rounded-full self-center mb-4" />

                    <Text className="text-white text-4xl font-bold mb-4 text-center mt-2">Actualizar Producto</Text>

                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4 ml-4 mr-4"
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
                                className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4 ml-4 mr-4"
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
                                    className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4 ml-2 mr-4 flex-1"
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

                    <TouchableOpacity 
                        className="bg-white rounded-3xl p-5 mb-3 ml-4 mr-4" 
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-black font-semibold text-center text-xl">🖊 Actualizar Producto</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default ProductDetails