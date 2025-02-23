import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { empresaFormSchema, type EmpresaFormData } from '../../validators/register';
import { router } from 'expo-router';

export default function RegisterEmpresa() {
    const { control, handleSubmit, formState: { errors } } = useForm<EmpresaFormData>({
        resolver: zodResolver(empresaFormSchema)
    });

    const onSubmit = (data: EmpresaFormData) => {
        console.log(data);
        router.push('/register/plan');
    };

    return (
        <View className="flex-1 bg-black px-4">
            <View className="flex-row justify-center space-x-2 mb-8">
                <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
                    <Text className="text-white font-bold">1</Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-white items-center justify-center">
                    <Text className="text-black font-bold">2</Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
                    <Text className="text-white font-bold">3</Text>
                </View>
            </View>

            <View className="space-y-4">
                <View>
                    <Text className="text-white mb-2">NIT</Text>
                    <Controller
                        control={control}
                        name="nit"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-900 text-white p-4 rounded-lg"
                                placeholder="NIT"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.nit && (
                        <Text className="text-red-500 mt-1">{errors.nit.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2">Nombre de la Empresa</Text>
                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-900 text-white p-4 rounded-lg"
                                placeholder="Nombre de la Empresa"
                                placeholderTextColor="#666"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.nombre && (
                        <Text className="text-red-500 mt-1">{errors.nombre.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2">Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-900 text-white p-4 rounded-lg"
                                placeholder="Email"
                                placeholderTextColor="#666"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.email && (
                        <Text className="text-red-500 mt-1">{errors.email.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2">Teléfono</Text>
                    <Controller
                        control={control}
                        name="telefono"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-900 text-white p-4 rounded-lg"
                                placeholder="Teléfono"
                                placeholderTextColor="#666"
                                keyboardType="phone-pad"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.telefono && (
                        <Text className="text-red-500 mt-1">{errors.telefono.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2">Ciudad</Text>
                    <Controller
                        control={control}
                        name="ciudad"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-900 text-white p-4 rounded-lg"
                                placeholder="Ciudad"
                                placeholderTextColor="#666"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.ciudad && (
                        <Text className="text-red-500 mt-1">{errors.ciudad.message}</Text>
                    )}
                </View>

                <TouchableOpacity
                    className="bg-white py-4 rounded-lg mt-6"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text className="text-black text-center font-bold text-lg">Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 