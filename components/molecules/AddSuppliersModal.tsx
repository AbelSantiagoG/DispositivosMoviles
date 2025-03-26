import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Control } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { ProveedorFormData } from '../../validators/suppliers';
import { useState, useEffect } from 'react';
import { enterpriseService } from '../../lib/enterprises';

interface AddSuppliersModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (data?: ProveedorFormData) => void;
    control: Control<ProveedorFormData>;
    errors: any;
}

export function AddSuppliersModal({ isVisible, onClose, onSubmit, control, errors }: AddSuppliersModalProps) {
    const [empresas, setEmpresas] = useState([
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

                <Text className="text-white text-4xl font-bold mb-4 text-center mt-2">Crear Proveedor</Text>

                <Controller
                    control={control}
                    name="nombre"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4 ml-4 mr-4"
                            placeholder="Nombre del proveedor"
                            placeholderTextColor="#ccc"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4 ml-4 mr-4"
                            placeholder="Email del proveedor"
                            placeholderTextColor="#ccc"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="email-address"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="telefono"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-zinc-500 text-white text-lg rounded-3xl p-5 mb-4 ml-4 mr-4"
                            placeholder="Teléfono del proveedor"
                            placeholderTextColor="#ccc"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="phone-pad"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="empresa"
                    render={({ field: { onChange, value } }) => (
                        <View className="bg-zinc-500 text-white text-lg rounded-3xl mb-4 ml-4 mr-4 justify-center">
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

                <TouchableOpacity
                    className="bg-white rounded-full p-4 mt-2 mb-4"
                    onPress={() => onSubmit()}
                >
                    <Text className="text-black font-semibold text-center">Crear Proveedor</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}