import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proveedoresFormSchema, type ProveedorFormData } from '../../validators/suppliers';

import { AddSuppliersModal } from '../molecules/AddSuppliersModal';
import { SuppliersCard } from '../molecules/SuppliersCard';
import { useSupplierService, type SupplierData } from '../../lib/suppliers';

interface SuppliersListProps {
    suppliers: Array<SupplierData & { id: number }>;
    listSuppliers: () => void;
}

export function SuppliersList({ suppliers: initialSuppliers, listSuppliers }: SuppliersListProps) {
    const [suppliers, setSuppliers] = useState<Array<SupplierData & { id: number }>>(initialSuppliers);
    const supplierService = useSupplierService();
    
    const { handleSubmit, control, formState: { errors }, reset } = useForm<ProveedorFormData>({
        resolver: zodResolver(proveedoresFormSchema),
        defaultValues: {
            nombre: '',
            email: '',
            telefono: '',
            nit: '',
            empresa: '1'
        }
    });

    useEffect(() => {
        setSuppliers(initialSuppliers);
    }, [initialSuppliers]);

    const [modalVisible, setModalVisible] = useState(false);

    const onSubmitForm = () => {
        handleSubmit(createSupplier)();
    };

    const createSupplier = async (data: ProveedorFormData) => {
        try {
            const supplierData: SupplierData = {
                name: data.nombre,
                phone_number: data.telefono,
                email: data.email,
                NIT: data.nit,
                enterprise_id: 1  // POSCO
            };
            
            console.log('Enviando datos para crear proveedor:', supplierData);
            
            await supplierService.createSupplier(supplierData);
            
            setModalVisible(false);
            reset();
            listSuppliers(); 
            Alert.alert('Éxito', 'Proveedor creado correctamente');
        } catch (error: any) {
            console.error('Error al crear proveedor:', error);
            
            let errorMsg = 'No se pudo crear el proveedor. Inténtelo de nuevo.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMsg = `Error: ${error.response.data.message}`;
            }
            
            Alert.alert('Error', errorMsg);
        }
    };

    const seleccionar = () => {
        setModalVisible(true);
    };

    return (
        <View className='h-full bg-black p-4'>
            <ScrollView>
                <View className="flex flex-row flex-wrap justify-between mb-2">
                    {suppliers.map((supplier) => (
                        <SuppliersCard
                            key={supplier.id}
                            name={supplier.name}
                            telephone={supplier.phone_number}
                            image={require('../../assets/empleado.png')}
                            href={`/dashboard/inventory/supplierDetails/${supplier.id}`}
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
                onClose={() => {
                    setModalVisible(false);
                    reset();
                }}
                onSubmit={onSubmitForm}
                control={control}
                errors={errors}
            />
        </View>
    );
} 