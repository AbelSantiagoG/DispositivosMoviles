import { View, Text } from 'react-native';
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
            <View className={modalContainer}>
                <Text className={modalTitle}>Ingrese los datos de pago</Text>
                
                <CustomInput
                    control={control}
                    name="numeroTarjeta"
                    label="Número de Tarjeta"
                    placeholder="Número de Tarjeta"
                    keyboardType="numeric"
                    error={errors.numeroTarjeta?.message}
                />

                <CustomInput
                    control={control}
                    name="fechaExpiracion"
                    label="Fecha de Expiración"
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    error={errors.fechaExpiracion?.message}
                />

                <View className="flex-row justify-between mt-4">
                    <Button 
                        title="Cancelar" 
                        variant="secondary" 
                        onPress={onClose}
                    />
                    <Button 
                        title="Pagar Ahora" 
                        variant="primary" 
                        onPress={onSubmit}
                    />
                </View>
            </View>
        </Modal>
    );
} 