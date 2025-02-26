import { View, Text, FlatList } from 'react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planFormSchema, type PlanFormData } from '../../validators/register';
import { PlanCard } from '../molecules/PlanCard';
import { PaymentModal } from '../molecules/PaymentModal';
import { ProgressSteps } from '../molecules/ProgressSteps';

interface Plan {
    id: string;
    nombre: string;
    precio: number;
    descripcion: string;
}

interface PlanSelectorProps {
    planes: Plan[];
    onPlanSelected: (planId: string) => void;
    onPaymentComplete: (data: PlanFormData) => void;
}

export function PlanSelector({ planes, onPlanSelected, onPaymentComplete }: PlanSelectorProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const { handleSubmit, setValue, control, formState: { errors } } = useForm<PlanFormData>({
        resolver: zodResolver(planFormSchema)
    });

    const handlePlanSelection = (planId: string) => {
        setValue('plan', planId);
        onPlanSelected(planId);
        setModalVisible(true);
    };

    const handlePaymentSubmit = (data: PlanFormData) => {
        setModalVisible(false);
        onPaymentComplete(data);
    };

    return (
        <View className="flex-1">
            <ProgressSteps currentStep={3} />
            
            <Text className="text-white text-xl font-bold text-center mt-8 mb-4">
                Elige tu Plan
            </Text>

            <FlatList
                data={planes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item: plan }) => (
                    <PlanCard
                        nombre={plan.nombre}
                        descripcion={plan.descripcion}
                        precio={plan.precio}
                        onSelect={() => handlePlanSelection(plan.id)}
                    />
                )}
            />

            <PaymentModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit(handlePaymentSubmit)}
                control={control}
                errors={errors}
            />
        </View>
    );
} 