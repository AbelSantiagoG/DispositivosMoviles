import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmpleadoFormData, empleadosFormSchema } from '../../../validators/employees';
import { employeeService, EmployeeData } from '../../../lib/employees';
import { enterpriseService, EnterpriseData } from '../../../lib/enterprises';

const EmployeeDetails = () => {
    const { idEmployee } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState<EmployeeData | null>(null);
    const [empresas, setEmpresas] = useState<EnterpriseData[]>([]);

    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
    } = useForm<EmpleadoFormData>({
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
        const fetchData = async () => {
            try {
                setLoading(true);
                
                const empresasData = await enterpriseService.getAllEnterprises();
                setEmpresas(empresasData);
                
                try {
                    const employeeData = await employeeService.getEmployeeById(Number(idEmployee));
                    setEmployee(employeeData);
                    setValue('nombre', employeeData.name || '');
                    setValue('apellido', employeeData.lastname || '');
                    setValue('email', employeeData.email || '');
                    setValue('telefono', employeeData.telephone || '');
                    setValue('empresa', employeeData.enterprise_id ? String(employeeData.enterprise_id) : '1');
                    setValue('rol', '2'); 
                } catch (employeeError) {
                    console.error('Error específico al cargar empleado:', employeeError);
                    Alert.alert('Atención', 'El empleado no se pudo cargar, pero puede continuar viendo los datos disponibles');
                }
                
            } catch (error) {
                console.error('Error general al cargar datos:', error);
                Alert.alert('Error', 'No se pudieron cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idEmployee, setValue]);

    const onSubmit = async (data: EmpleadoFormData) => {
        try {
            const updatedData: Partial<EmployeeData> = {
                name: data.nombre,
                lastname: data.apellido,
                email: data.email,
                telephone: data.telefono,
                enterprise_id: Number(data.empresa),
                role_id: Number(data.rol)
            };
            
            await employeeService.updateEmployee(Number(idEmployee), updatedData);
            
            setModalVisible(false);
            Alert.alert('Éxito', 'Empleado actualizado correctamente', [
                {
                    text: 'OK',
                    onPress: () => {
                        router.push('/dashboard/employees');
                    }
                }
            ]);
            
            const updatedEmployee = await employeeService.getEmployeeById(Number(idEmployee));
            setEmployee(updatedEmployee);
        } catch (error) {
            console.error('Error al actualizar empleado:', error);
            Alert.alert('Error', 'No se pudo actualizar el empleado');
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            "Confirmación",
            "¿Está seguro que desea eliminar este empleado?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            await employeeService.deleteEmployee(Number(idEmployee));
                            Alert.alert("Éxito", "Empleado eliminado correctamente");
                            router.replace("/dashboard/employees");
                        } catch (error) {
                            console.error("Error al eliminar empleado:", error);
                            Alert.alert("Error", "No se pudo eliminar el empleado");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    if (loading) {
        return (
            <View className='h-full bg-black p-4 items-center justify-center'>
                <Text className="text-white">Cargando empleado...</Text>
            </View>
        );
    }

    if (!employee) {
        return (
            <View className='h-full bg-black p-4 items-center justify-center'>
                <Text className="text-white text-xl mb-4">No se pudo cargar la información del empleado</Text>
                <TouchableOpacity 
                    className="bg-white rounded-full p-4 mb-3"
                    onPress={() => router.back()}
                >
                    <Text className="text-black font-semibold">Volver atrás</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const empresaNombre = empresas.find(e => e.id === employee.enterprise_id)?.name || 'Empresa no disponible';

    return (
        <View className='h-full bg-black p-4'>
            <View className='rounded-2xl h-96 w-96 self-center'>
                <Image source={require('../../../assets/empleado.png')} className='w-full h-full' />
            </View>
            <View className='mt-4'>
                <Text className="text-gray-400 text-sm mt-2 mb-1">ID: {idEmployee}</Text>
                <Text className="text-gray-400 text-sm mt-2 mb-1">Empresa: {empresaNombre}</Text>
                <Text className="text-white font-semibold text-4xl">{employee.name} {employee.lastname}</Text>
                <Text className="text-white text-sm">{employee.email}</Text>
                <Text className="text-white text-sm mt-3">Teléfono: {employee.telephone}</Text>
            </View>
            <View className='flex-row justify-between mb-7 mt-5'>
                <TouchableOpacity 
                    className="bg-zinc-800 rounded-full p-4 mb-3 w-[48%] items-center" 
                    onPress={() => setModalVisible(true)}
                >
                    <Text className="text-white font-semibold">Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className="bg-red-500 rounded-full p-4 mb-3 w-[48%] items-center"
                    onPress={handleDelete}
                >
                    <Text className="text-white font-semibold">Eliminar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >
                <View className="bg-zinc-700 p-6 rounded-t-3xl">
                    <TouchableOpacity 
                        onPress={() => setModalVisible(false)} 
                        className="w-52 h-1 bg-white rounded-full self-center mb-4" 
                    />

                    <Text className="text-white text-4xl font-bold mb-4 text-center mt-2">Actualizar Empleado</Text>

                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4"
                                placeholder="Nombre del empleado"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.nombre && (
                        <Text className="text-red-500 ml-4 mb-2">{errors.nombre.message}</Text>
                    )}

                    <Controller
                        control={control}
                        name="apellido"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4"
                                placeholder="Apellido del empleado"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.apellido && (
                        <Text className="text-red-500 ml-4 mb-2">{errors.apellido.message}</Text>
                    )}

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4"
                                placeholder="Email del empleado"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="email-address"
                            />
                        )}
                    />
                    {errors.email && (
                        <Text className="text-red-500 ml-4 mb-2">{errors.email.message}</Text>
                    )}

                    <Controller
                        control={control}
                        name="telefono"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4"
                                placeholder="Teléfono del empleado"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="phone-pad"
                            />
                        )}
                    />
                    {errors.telefono && (
                        <Text className="text-red-500 ml-4 mb-2">{errors.telefono.message}</Text>
                    )}

                    <Controller
                        control={control}
                        name="empresa"
                        render={({ field: { onChange, value } }) => (
                            <View className="bg-zinc-500 rounded-3xl mb-4 overflow-hidden">
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    style={{ color: 'white' }}
                                    dropdownIconColor="white"
                                >
                                    <Picker.Item label="Seleccionar empresa" value="" />
                                    {empresas.map((empresa) => (
                                        <Picker.Item
                                            key={empresa.id}
                                            label={empresa.name}
                                            value={String(empresa.id)}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        )}
                    />
                    {errors.empresa && (
                        <Text className="text-red-500 ml-4 mb-2">{errors.empresa.message}</Text>
                    )}

                    <Controller
                        control={control}
                        name="rol"
                        render={({ field: { onChange, value } }) => (
                            <View className="bg-zinc-500 rounded-3xl mb-4 overflow-hidden">
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    style={{ color: 'white' }}
                                    dropdownIconColor="white"
                                >
                                    <Picker.Item label="Seleccionar rol" value="" />
                                    <Picker.Item label="Administrador" value="1" />
                                    <Picker.Item label="Empleado" value="2" />
                                    <Picker.Item label="Gerente" value="3" />
                                </Picker>
                            </View>
                        )}
                    />
                    {errors.rol && (
                        <Text className="text-red-500 ml-4 mb-2">{errors.rol.message}</Text>
                    )}

                    <TouchableOpacity
                        className="bg-white rounded-full p-4 mt-2 mb-4"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-black font-semibold text-center">Actualizar Empleado</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default EmployeeDetails