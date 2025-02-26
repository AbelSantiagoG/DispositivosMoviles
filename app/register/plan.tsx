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

    const onSubmit = (data: PlanFormData) => {
        console.log(data);
        setModalVisible(false);
        alert('Pago exitoso');
        router.replace('/login');
    };

    const seleccionarPlan = (planId: string) => {
        setValue('plan', planId);
        setModalVisible(true);
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
