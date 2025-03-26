import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Control, SubmitHandler } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { EmpleadoFormData } from '../../validators/employees';
import { useState, useEffect } from 'react';
import { enterpriseService } from '../../lib/enterprises';

interface AddEmployeesModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (data?: EmpleadoFormData) => void;
    control?: Control<EmpleadoFormData>;
    errors?: any;
}

interface Empresa {
    id: string;
    nombre: string;
}

export function AddEmployeesModal({ isVisible, onClose, onSubmit, control, errors }: AddEmployeesModalProps) {
    const [empresas, setEmpresas] = useState<Empresa[]>([
        { id: '1', nombre: 'Empresa 1' },
        { id: '2', nombre: 'Empresa 2' },
        { id: '3', nombre: 'Empresa 3' }
    ]);

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const data = await enterpriseService.getAllEnterprises();
                const formattedEmpresas = data.map((empresa: any) => ({
                    id: String(empresa.id),
                    nombre: empresa.name
                }));
                setEmpresas(formattedEmpresas);
            } catch (error) {
                console.error('Error al obtener empresas:', error);
            }
        };

        fetchEmpresas();
    }, []);

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={{ margin: 0, justifyContent: 'flex-end' }}
        >
            <View className="bg-zinc-700 p-6 rounded-t-3xl">
                <TouchableOpacity onPress={onClose} className="w-52 h-1 bg-white rounded-full self-center mb-4" />

                <Text className="text-white text-4xl font-bold mb-4 text-center mt-2">Crear Empleado</Text>

                {control && (
                    <>
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
                        {errors?.nombre && (
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
                        {errors?.apellido && (
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
                        {errors?.email && (
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
                        {errors?.telefono && (
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
                                                label={empresa.nombre}
                                                value={empresa.id}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            )}
                        />
                        {errors?.empresa && (
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
                        {errors?.rol && (
                            <Text className="text-red-500 ml-4 mb-2">{errors.rol.message}</Text>
                        )}
                    </>
                )}

                <TouchableOpacity
                    className="bg-white rounded-full p-4 mt-2 mb-4"
                    onPress={() => onSubmit()}
                >
                    <Text className="text-black font-semibold text-center">Crear Empleado</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}