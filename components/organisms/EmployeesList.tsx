import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { empleadosFormSchema, type EmpleadoFormData } from '../../validators/employees';
import { EmployeesCard } from '../molecules/EmployeesCard';
import { AddEmployeesModal } from '../molecules/AddEmployeesModal';
import { EmployeeData, employeeService } from '../../lib/employees';

interface EmployeesListProps {
    employees: Array<EmployeeData & { id: number }>;
    listEmployees: () => void;
}

export function EmployeesList({ employees: initialEmployees, listEmployees }: EmployeesListProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [employees, setEmployees] = useState<Array<EmployeeData & { id: number }>>(initialEmployees);

    const { handleSubmit, control, formState: { errors }, reset } = useForm<EmpleadoFormData>({
        resolver: zodResolver(empleadosFormSchema),
        defaultValues: {
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            empresa: '1',
            rol: '2'
        }
    });

    useEffect(() => {
        setEmployees(initialEmployees);
    }, [initialEmployees]);

    const onSubmitForm = () => {
        handleSubmit(createEmployee)();
    };

    const createEmployee = async (data: EmpleadoFormData) => {
        try {
            const employeeData: EmployeeData = {
                name: data.nombre,
                lastname: data.apellido,
                telephone: data.telefono,
                email: data.email,
                enterprise_id: Number(data.empresa),
                role_id: Number(data.rol),
                password: Math.random().toString(36).substring(2, 10), 
                code: Math.random().toString(36).substring(2, 8).toUpperCase() // Código aleatorio
            };
            
            console.log('Enviando datos para crear empleado:', employeeData);
            
            await employeeService.createEmployee(employeeData);
            
            setModalVisible(false);
            reset();
            listEmployees(); 
            Alert.alert('Éxito', 'Empleado creado correctamente');
        } catch (error: any) {
            console.error('Error al crear empleado:', error);
            
            let errorMsg = 'No se pudo crear el empleado. Inténtelo de nuevo.';
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
        <View className="h-full bg-black p-4">
            <ScrollView>
                <View className="flex flex-row flex-wrap justify-between mb-2">
                    {employees.map((employee) => (
                        <EmployeesCard
                            key={employee.id}
                            name={employee.name}
                            telephone={employee.telephone}
                            image={require('../../assets/empleado.png')}
                            href={`/dashboard/employeeDetails/${employee.id}`}
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