import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Control } from 'react-hook-form';
import { ProductoFormData } from '../../validators/register';

interface AddProductModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    control: Control<ProductoFormData>;
    errors: { };
}

export function AddProductModal({ isVisible, onClose, onSubmit, control, errors }: AddProductModalProps) {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={{ margin: 0, justifyContent: 'flex-end' }}
        >
            <View className="bg-gray-800 p-6 rounded-t-lg">
                <TouchableOpacity onPress={onClose} className="w-12 h-1 bg-white rounded-full self-center mb-4" />

                <Text className="text-white text-lg font-bold mb-4 text-center">Crear Producto</Text>

                <Controller
                    control={control}
                    name="nombre"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2 mb-4"
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
                            className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2 mb-4"
                            placeholder="Descripción del Producto"
                            placeholderTextColor="#ccc"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                
                <Controller
                    control={control}
                    name="stock"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2 mb-4"
                            placeholder="Stock"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                            value={value?.toString()}
                            onChangeText={(text) => onChange(Number(text))}
                        />
                    )}
                />
                <View className="flex-row justify-between mt-4">
                    <TouchableOpacity className="bg-gray-600 py-2 px-4 rounded-lg" onPress={onClose}>
                        <Text className="text-white font-bold">Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-stone-800 py-2 px-4 rounded-lg" onPress={onSubmit}>
                        <Text className="text-white font-bold">Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}