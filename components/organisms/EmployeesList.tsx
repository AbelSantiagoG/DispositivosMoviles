import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { empleadosFormSchema, type EmpleadoFormData } from '../../validators/employees';
import {UserDAO} from '../../interfaces/Auth';
import { EmployeesCard } from '../molecules/EmployeesCard';
import { AddEmployeesModal } from '../molecules/AddEmployeesModal';

interface EmployeesListProps {
    employees: UserDAO[];
}

export function EmployeesList({ employees }: EmployeesListProps) {

    const { handleSubmit, setValue, control, formState: { errors } } = useForm<EmpleadoFormData>({
        resolver: zodResolver(empleadosFormSchema)
    });

    const [modalVisible, setModalVisible] = useState(false);

    const onSubmit = (data: EmpleadoFormData) => {
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
                    {employees.map((employees) => (
                        <EmployeesCard
                            key={employees.id}
                            name={employees.name}
                            telephone={employees.telephone}
                            image={require('../../assets/images/employee.png')}
                            href={`/dashboard/inventory/productDetails/${employees.id}`}
                        />
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity
                className="absolute bottom-4 right-4 bg-white rounded-full p-4 mb-3"
                onPress={seleccionar}
            >
                <Text className="text-black font-semibold">➕ Agregar Empleado</Text>
            </TouchableOpacity>
            <AddEmployeesModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                errors={errors}
            />
        </View>
    );
} 