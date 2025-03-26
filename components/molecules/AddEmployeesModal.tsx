import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Control } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { EmpleadoFormData } from '../../validators/employees';


interface AddEmployeesModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    control: Control<EmpleadoFormData>;
    errors: {};
}

const mockEmpresas = [
    { id: '1', nombre: 'Empresa 1' },
    { id: '2', nombre: 'Empresa 2' },
    { id: '3', nombre: 'Empresa 3' },
    { id: '4', nombre: 'Empresa 4' },
    { id: '5', nombre: 'Empresa 5' }
];

export function AddEmployeesModal({ isVisible, onClose, onSubmit, control, errors }: AddEmployeesModalProps) {
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

                <Controller
                    control={control}
                    name="nombre"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                            placeholder="Nombre del Producto"
                            placeholderTextColor="#ccc"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="apellido"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                            placeholder="Apellido"
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
                            className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="telefono"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-zinc-500 text-white text-lg  rounded-3xl p-5 mb-4 ml-4 mr-4"
                            placeholder="Teléfono"
                            placeholderTextColor="#ccc"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="empresa"
                    render={({ field: { onChange, value } }) => (
                        <View className="bg-zinc-500 rounded-3xl mb-4 ml-4 mr-4">
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue) => onChange(itemValue)}
                                style={{ color: 'white' }}
                            >
                                <Picker.Item label="Seleccione un proveedor" value="" />
                                {mockEmpresas.map((empresa) => (
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
                <View className="flex-row justify-between mt-4">
                    <TouchableOpacity className=" bg-white rounded-3xl p-5 mb-3 ml-4 mr-4 flex-1" onPress={onClose}>
                        <Text className="text-black font-semibold text-center text-xl">➕ Agregar Empleado</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}