import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router, useRouter } from 'expo-router'
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
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [categorias, setCategorias] = useState<CategorieData[]>([]);
    const [updating, setUpdating] = useState(false);

    const { handleSubmit, setValue, control, formState: { errors }, reset } = useForm<ProductoFormData>({
        resolver: zodResolver(productoFormSchema)   
    });

    const loadProduct = async () => {
        try {
            const data = await productService.getProductById(Number(idProduct));
            setProduct(data);
            setValue('nombre', data.name);
            setValue('descripcion', data.description);
            setValue('precio', data.public_price);
            setValue('stock', data.stock);
            setValue('categoria', [data.category_id.toString()]);
            setValue('proveedor', '1');
            setValue('descuento', data.discount);
            return data;
        } catch (error) {
            console.error('Error al obtener producto:', error);
            Alert.alert('Error', 'No se pudo cargar el producto');
            return null;
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            try {
                // Cargar producto
                await loadProduct();
                
                // Cargar categorías
                const categoriasData = await categoriesService.getAllCategories();
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al inicializar datos:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeData();
    }, [idProduct]);

    const onSubmit = async (data: ProductoFormData) => {
        try {
            setUpdating(true);

            // Validar que todos los campos requeridos estén presentes
            if (!data.nombre || !data.descripcion || !data.precio || !data.stock || !data.categoria) {
                Alert.alert('Error', 'Por favor complete todos los campos requeridos');
                return;
            }

            // Preparar los datos para la actualización
            const updateData = {
                name: data.nombre,
                description: data.descripcion,
                stock: data.stock,
                supplier_price: data.precio * 0.7,
                public_price: data.precio,
                category_id: Number(data.categoria[0]),
                discount: data.descuento,
                status: product.status,
                thumbnail: product.thumbnail,
                bar_code: product.bar_code,
                minimal_safe_stock: product.minimal_safe_stock,
                enterprise_id: product.enterprise_id,
                supplier_id: 1
            };

            // Realizar la actualización
            await productService.updateProduct(Number(idProduct), updateData);
            
            // Recargar los datos del producto
            const updatedProduct = await loadProduct();
            
            if (updatedProduct) {
                setModalVisible(false);
                Alert.alert('Éxito', 'Producto actualizado correctamente', [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Actualizar la vista actual
                            setProduct(updatedProduct);
                            // Regresar a la lista de productos con un parámetro de refresco
                            router.push({
                                pathname: '/dashboard/inventory/products',
                                params: { refresh: Date.now() }
                            });
                        }
                    }
                ]);
            }
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            Alert.alert('Error', 'No se pudo actualizar el producto');
        } finally {
            setUpdating(false);
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
                <Image 
                    source={product.thumbnail ? productService.getImageUrl(product.thumbnail) : require('../../../../assets/detailsProduct.png')} 
                    className='w-full h-full'
                    resizeMode="cover"
                />
            </View>
            <View className='mt-4'>
                <Text className="text-gray-400 text-sm mt-2 mb-1">ID: {idProduct}</Text>
                <Text className="text-gray-400 text-sm mt-2 mb-1">
                    {categorias.find(c => c.id === product.category_id)?.name || 'Categoría no disponible'}
                </Text>
                <Text className="text-white font-semibold text-4xl">{product.name}</Text>
                <View className="flex-row items-center">
                    <Text className="text-white text-sm">${product.public_price}</Text>
                    {product.discount > 0 && (
                        <Text className="text-green-500 text-sm ml-2">(-{product.discount}% descuento)</Text>
                    )}
                </View>
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
                style={{ margin: 0 }}
                className="justify-end"
            >
                <View className="bg-black rounded-t-3xl p-4 h-[90%]">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white text-2xl font-bold">Actualizar Producto</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Feather name="x" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-zinc-800 rounded-2xl p-4 mb-4 items-center justify-center" style={{ height: 200 }}>
                        <Image 
                            source={product.thumbnail ? productService.getImageUrl(product.thumbnail) : require('../../../../assets/detailsProduct.png')} 
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>

                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Nombre del producto"
                                placeholderTextColor="#666"
                                onChangeText={onChange}
                                value={value}
                                className="bg-zinc-800 text-white rounded-3xl px-4 py-3 mb-4"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="descripcion"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Descripción"
                                placeholderTextColor="#666"
                                onChangeText={onChange}
                                value={value}
                                className="bg-zinc-800 text-white rounded-3xl px-4 py-3 mb-4"
                                multiline
                            />
                        )}
                    />

                    <View className="flex-row justify-between mb-4">
                        <View className="flex-1 mr-2">
                            <Controller
                                control={control}
                                name="precio"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder="Precio"
                                        placeholderTextColor="#666"
                                        onChangeText={(text) => onChange(Number(text))}
                                        value={value?.toString()}
                                        keyboardType="numeric"
                                        className="bg-zinc-800 text-white rounded-3xl px-4 py-3"
                                    />
                                )}
                            />
                        </View>
                        <View className="flex-1 ml-2">
                            <Controller
                                control={control}
                                name="descuento"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder="Descuento %"
                                        placeholderTextColor="#666"
                                        onChangeText={(text) => onChange(Number(text))}
                                        value={value?.toString()}
                                        keyboardType="numeric"
                                        className="bg-zinc-800 text-white rounded-3xl px-4 py-3"
                                    />
                                )}
                            />
                        </View>
                    </View>

                    <Controller
                        control={control}
                        name="stock"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Stock"
                                placeholderTextColor="#666"
                                onChangeText={(text) => onChange(Number(text))}
                                value={value?.toString()}
                                keyboardType="numeric"
                                className="bg-zinc-800 text-white rounded-3xl px-4 py-3 mb-4"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="categoria"
                        render={({ field: { onChange, value } }) => (
                            <View className="bg-zinc-800 rounded-3xl mb-4">
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
                        className="bg-white rounded-3xl p-5 mb-3" 
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-black font-semibold text-center text-xl">
                            Guardar Cambios
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

export default ProductDetails;