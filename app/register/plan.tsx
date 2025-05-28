import { View, Text, FlatList } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planFormSchema, type PlanFormData } from '../../validators/register';
import { router } from 'expo-router';
import { pageContainer } from '../../components/Tokens';
import { ProgressSteps } from '../../components/molecules/ProgressSteps';
import { PlanCard } from '../../components/molecules/PlanCard';
import { PaymentModal } from '../../components/molecules/PaymentModal';
import { useState } from 'react';
import { useRegister } from '../../context/RegisterContext';
import { registerService } from '../../lib/register';
import Toast from 'react-native-toast-message';
import { Button } from '../../components/atoms/Button';

const PLANES = [
    {
        id: 'avanzado',
        nombre: 'Plan Avanzado',
        precio: 49900,
        descripcion: 'Diseñado para grandes cadenas de supermercados y restaurantes'
    },
    {
        id: 'basico',
        nombre: 'Plan Básico',
        precio: 29900,
        descripcion: 'Diseñado para pequeños supermercados y restaurantes'
    },
    {
        id: 'medio',
        nombre: 'Plan Intermedio',
        precio: 39900,
        descripcion: 'Diseñado para medianos supermercados y restaurantes'
    }
];

export default function RegisterPlan() {
    const { handleSubmit, setValue, control, formState: { errors } } = useForm<PlanFormData>({
        resolver: zodResolver(planFormSchema)
    });
    const [modalVisible, setModalVisible] = useState(false);
    const { registerData, setIsLoading, setError, clearForm, setStepValidation, stepValidation } = useRegister();

    const validatePreviousSteps = () => {
        if (!stepValidation.user.isValid || !stepValidation.enterprise.isValid) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Por favor complete los pasos anteriores antes de continuar',
                position: 'bottom',
            });
            return false;
        }
        return true;
    };

    const onSubmit = async (data: PlanFormData) => {
        if (!validatePreviousSteps()) {
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            setStepValidation('payment', { isVisited: true });
            
            // Simular procesamiento del pago
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Enviar datos al backend
            await registerService.register(registerData);
            
            setStepValidation('payment', { isValid: true, isVisited: true });
            
            // Mostrar mensaje de éxito
            Toast.show({
                type: 'success',
                text1: '¡Registro exitoso!',
                text2: 'Tu cuenta ha sido creada correctamente.',
                position: 'bottom',
                visibilityTime: 3000,
            });
            
            // Limpiar formulario y redirigir
            await clearForm();
            router.replace('/login');
        } catch (error: any) {
            setStepValidation('payment', { isValid: false, isVisited: true });
            setError(error.message || 'Error al procesar el registro');
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Error al procesar el registro',
                position: 'bottom',
                visibilityTime: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const seleccionarPlan = (planId: string) => {
        if (!validatePreviousSteps()) {
            return;
        }
        setValue('plan', planId);
        setModalVisible(true);
    };

    const handleClearForm = () => {
        clearForm();
    };

    return (
        <View className={pageContainer}>
            <ProgressSteps currentStep={3} />
            
            <Text className="text-white text-xl font-bold text-center mt-8 mb-4">
                Elige tu Plan
            </Text>

            <FlatList
                data={PLANES}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item: plan }) => (
                    <PlanCard
                        nombre={plan.nombre}
                        descripcion={plan.descripcion}
                        precio={plan.precio}
                        onSelect={() => seleccionarPlan(plan.id)}
                    />
                )}
            />

            <PaymentModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                errors={errors}
            />
        </View>
    );
}
