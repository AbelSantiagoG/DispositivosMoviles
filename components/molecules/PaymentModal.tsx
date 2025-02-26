import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Control } from 'react-hook-form';
import { modalContainer, modalTitle } from '../Tokens';
import { CustomInput } from '../atoms/CustomInput';
import { Button } from '../atoms/Button';
import { PlanFormData } from '../../validators/register';

interface PaymentModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    control: Control<PlanFormData>;
    errors: {
        numeroTarjeta?: { message?: string };
        fechaExpiracion?: { message?: string };
    };
}

export function PaymentModal({
    isVisible,
    onClose,
    onSubmit,
    control,
    errors
}: PaymentModalProps) {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View className="bg-white p-6 rounded-lg">
                <Text className="text-black text-lg font-bold mb-4 text-center">Ingrese los datos de pago</Text>
                <Controller
                    control={control}
                    name="numeroTarjeta"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="border border-gray-400 rounded-lg p-2 mb-4"
                            placeholder="Número de Tarjeta"
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
                            placeholder="Fecha de Expiración (MM/YY)"
                            keyboardType="numeric"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                <View className="flex-row justify-between mt-4">
                    <TouchableOpacity className="bg-gray-600 py-2 px-4 rounded-lg" onPress={onClose}>
                        <Text className="text-white font-bold">Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-stone-800 py-2 px-4 rounded-lg" onPress={onSubmit}>
                        <Text className="text-white font-bold">Pagar Ahora</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}