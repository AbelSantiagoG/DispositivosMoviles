import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Control } from 'react-hook-form';
import { modalContainer, modalTitle } from '../Tokens';
import { CustomInput } from '../atoms/CustomInput';
import { Button } from '../atoms/Button';
import { PlanFormData } from '../../validators/register';
import { useRegister } from '../../context/RegisterContext';

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
    const { isLoading, error } = useRegister();

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View className="bg-white p-6 rounded-lg">
                <Text className="text-black text-lg font-bold mb-4 text-center">
                    Ingrese los datos de pago
                </Text>
                
                {error && (
                    <Text className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </Text>
                )}

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
                            maxLength={16}
                            editable={!isLoading}
                        />
                    )}
                />
                {errors.numeroTarjeta?.message && (
                    <Text className="text-red-500 text-sm mb-2">
                        {errors.numeroTarjeta.message}
                    </Text>
                )}

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
                            maxLength={5}
                            editable={!isLoading}
                        />
                    )}
                />
                {errors.fechaExpiracion?.message && (
                    <Text className="text-red-500 text-sm mb-2">
                        {errors.fechaExpiracion.message}
                    </Text>
                )}

                <TouchableOpacity
                    className={`bg-blue-500 p-3 rounded-lg items-center ${isLoading ? 'opacity-50' : ''}`}
                    onPress={onSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-semibold">Pagar ahora</Text>
                    )}
                </TouchableOpacity>
            </View>
        </Modal>
    );
}