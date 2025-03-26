import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proveedoresFormSchema, ProveedorFormData } from '../../../../validators/suppliers';
import { supplierService, SupplierData } from '../../../../lib/suppliers';
import { EnterpriseData, enterpriseService } from '../../../../lib/enterprises';

const SupplierDetails = () => {
    const { idSupplier } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [supplier, setSupplier] = useState<SupplierData | null>(null);
    const [empresas, setEmpresas] = useState<EnterpriseData[]>([]);

    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
    } = useForm<ProveedorFormData>({
        resolver: zodResolver(proveedoresFormSchema),
        defaultValues: {
            nombre: '',
            email: '',
            telefono: '',
            empresa: '1'
        }
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const empresasData = await enterpriseService.getAllEnterprises();
                setEmpresas(empresasData);

                try {
                    const supplierData = await supplierService.getSupplierById(Number(idSupplier));
                    setSupplier(supplierData);

                    setValue('nombre', supplierData.name || '');
                    setValue('email', supplierData.email || '');
                    setValue('telefono', supplierData.telephone || '');
                    setValue('empresa', supplierData.enterprise_id ? String(supplierData.enterprise_id) : '1');
                } catch (supplierError) {
                    console.error('Error específico al cargar :', supplierError);
                    Alert.alert('Atención', 'Error');
                }

            } catch (error) {
                console.error('Error general al cargar datos:', error);
                Alert.alert('Error', 'No se pudieron cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idSupplier, setValue]);

    const onSubmit = async (data: ProveedorFormData) => {
        try {
            const updatedData: Partial<SupplierData> = {
                name: data.nombre,
                email: data.email,
                phone_number: data.telefono,
                enterprise_id: Number(data.empresa)
            };

            await supplierService.updateSupplier(Number(idSupplier), updatedData);

            setModalVisible(false);
            Alert.alert('Éxito', ' actualizado correctamente');

            // Actualizar datos locales
            const updatedSupplier = await supplierService.getSupplierById(Number(idSupplier));
            setSupplier(updatedSupplier);
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
                            await supplierService.deleteSupplier(Number(idSupplier));
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


    const seleccionar = () => {
        setModalVisible(true);
    };

    const onClose = () => {
        setModalVisible(false);
    }
    if (loading) {
        return (
            <View className='h-full bg-black p-4 items-center justify-center'>
                <Text className="text-white text-xl">Cargando información del proveedor...</Text>
            </View>
        );
    }

    if (!supplier) {
        return (
            <View className='h-full bg-black p-4 items-center justify-center'>
                <Text className="text-white text-xl mb-4">No se pudo cargar la información del proveedor</Text>
                <TouchableOpacity
                    className="bg-white rounded-full p-4 mb-3"
                    onPress={() => router.back()}
                >
                    <Text className="text-black font-semibold">Volver atrás</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const empresaNombre = empresas.find(e => e.id === supplier.enterprise_id)?.name || 'Empresa no disponible';

    return (
        <View className='h-full bg-black p-4'>
            <View className='rounded-2xl h-96 w-96 self-center'>
                <Image source={require('../../../../assets/empleado.png')} className='w-full h-full' />
            </View>
            <View className='mt-4'>
                <Text className="text-gray-400 text-sm mt-2 mb-1">ID: {idSupplier}</Text>
                <Text className="text-gray-400 text-sm mt-2 mb-1">Proveedor</Text>
                <Text className="text-white font-semibold text-4xl">{supplier.name}</Text>
                <Text className="text-white text-sm">{supplier.email}</Text>
                <Text className="text-white text-sm mt-3">Teléfono: {supplier.phone_number}</Text>
                <Text className="text-white text-sm mt-3">Empresa: {empresaNombre}</Text>
            </View>
            <View className='flex-row justify-between mb-7 mt-5'>
                <TouchableOpacity
                    className="bg-zinc-800 rounded-full p-4 mb-3 w-[48%] items-center"
                    onPress={seleccionar}
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
                onBackdropPress={onClose}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >
                <View className="bg-zinc-700 p-6 rounded-t-3xl">
                    <TouchableOpacity onPress={onClose} className="w-52 h-1 bg-white rounded-full self-center mb-4" />

                    <Text className="text-white text-4xl font-bold mb-4 text-center mt-2">Actualizar Proveedor</Text>

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
                                            label={empresa.name}
                                            value={empresa.id}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        )}
                    />

                    <TouchableOpacity
                        className="bg-white rounded-full p-4 mt-2 mb-4"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-black font-semibold text-center">Actualizar Empleado</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default SupplierDetails;