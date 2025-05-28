import { View, Text, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Control, UseFormTrigger } from 'react-hook-form';
import { ProductoFormData } from '../../validators/products';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import { useState, useEffect } from 'react';
import { categoriesService, CategorieData } from '../../lib/categories';
import * as ImagePicker from 'expo-image-picker';

interface AddProductModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (data: ProductoFormData & { image?: ImagePicker.ImagePickerAsset }) => void;
    control: Control<ProductoFormData>;
    errors: {};
    trigger: UseFormTrigger<ProductoFormData>;
}

export function AddProductModal({ isVisible, onClose, onSubmit, control, errors, trigger }: AddProductModalProps) {
    const [categorias, setCategorias] = useState<CategorieData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

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

    const handleImageSelection = async () => {
        try {
            
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0]);
            }
        } catch (error) {
            console.error('Error al seleccionar imagen:', error);
            Alert.alert('Error', 'No se pudo seleccionar la imagen');
        }
    };

    const handleSubmit = async () => {
        const isValid = await trigger();
        if (!isValid) {
            Alert.alert('Error', 'Por favor complete todos los campos requeridos correctamente');
            return;
        }

        const formData = control._formValues as ProductoFormData;
        onSubmit({ ...formData, image: selectedImage || undefined });
        setSelectedImage(null);
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            style={{ margin: 0 }}
            className="justify-end"
        >
            <View className="bg-black rounded-t-3xl p-4 h-[90%]">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-white text-2xl font-bold">Agregar Producto</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Feather name="x" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    onPress={handleImageSelection}
                    className="bg-zinc-800 rounded-2xl p-4 mb-4 items-center justify-center"
                    style={{ height: 200 }}
                >
                    {selectedImage ? (
                        <Image
                            source={{ uri: selectedImage.uri }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="items-center">
                            <Feather name="camera" size={48} color="white" className="mb-2" />
                            <Text className="text-white">Seleccionar imagen</Text>
                        </View>
                    )}
                </TouchableOpacity>

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

                <Controller
                    control={control}
                    name="proveedor"
                    render={({ field: { onChange, value } }) => (
                        <View className="bg-zinc-800 rounded-3xl mb-4">
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}
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

                <TouchableOpacity 
                    className="bg-white rounded-3xl p-5 mb-3" 
                    onPress={handleSubmit}
                >
                    <Text className="text-black font-semibold text-center text-xl">➕ Agregar Producto</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}