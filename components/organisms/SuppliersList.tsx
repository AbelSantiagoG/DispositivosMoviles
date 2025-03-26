import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proveedoresFormSchema, type ProveedorFormData } from '../../validators/suppliers';
import {SuppierDAO} from '../../interfaces/Auth';
import { EmployeesCard } from '../molecules/EmployeesCard';
import { AddEmployeesModal } from '../molecules/AddEmployeesModal';
import { AddSuppliersModal } from '../molecules/AddSuppliersModal';
import { SuppliersCard } from '../molecules/SuppliersCard';

interface SuppliersListProps {
    suppliers: SuppierDAO[];
}

export function SuppliersList({ suppliers }: SuppliersListProps) {

    const { handleSubmit, setValue, control, formState: { errors } } = useForm<ProveedorFormData>({
        resolver: zodResolver(proveedoresFormSchema)
    });

    const [modalVisible, setModalVisible] = useState(false);

    const onSubmit = (data: ProveedorFormData) => {
        console.log(data);
        setModalVisible(false);
        //alert('Pago exitoso');
        //router.replace('/login');
    };

    const seleccionar = () => {
        setModalVisible(true);
    };

    return (
        <View className='h-full bg-black p-4'>
            <ScrollView>
                <View className="flex flex-row flex-wrap justify-between mb-2">
                    {suppliers.map((suppliers) => (
                        <SuppliersCard
                            key={suppliers.id}
                            name={suppliers.name}
                            telephone={suppliers.telephone}
                            image={require('../../assets/empleado.png')}
                            href={`/dashboard/inventory/supplierDetails/${suppliers.id}`}
                        />
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity
                className="absolute bottom-4 right-4 bg-white rounded-full p-4 mb-3"
                onPress={seleccionar}
            >
                <Text className="text-black font-semibold">➕ Agregar Proveedor</Text>
            </TouchableOpacity>
            <AddSuppliersModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                errors={errors}
            />
        </View>
    );
} 