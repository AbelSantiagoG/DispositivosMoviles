import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, type UserFormData } from '../../validators/register';
import { router } from 'expo-router';

export default function RegisterUser() {
    const { control, handleSubmit, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema)
    });

    const onSubmit = (data: UserFormData) => {
        console.log(data);
        router.push('/register/empresa');
    };

    return (
        <View className="flex-1 bg-black px-4">
            <View className="flex-row justify-center space-x-2 mb-8">
                <View className="w-8 h-8 rounded-full bg-white items-center justify-center">
                    <Text className="text-black font-bold">1</Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
                    <Text className="text-white font-bold">2</Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center">
                    <Text className="text-white font-bold">3</Text>
                </View>
            </View>

            <View className="space-y-4">
                <View>
                    <Text className="text-white mb-2">Nombre</Text>
                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-900 text-white p-4 rounded-lg"
                                placeholder="Nombre"
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
                    <Text className="text-white mb-2">Apellido</Text>
                    <Controller
                        control={control}
                        name="apellido"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-900 text-white p-4 rounded-lg"
                                placeholder="Apellido"
                                placeholderTextColor="#666"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.apellido && (
                        <Text className="text-red-500 mt-1">{errors.apellido.message}</Text>
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
                    <Text className="text-white mb-2">Clave</Text>
                    <Controller
                        control={control}
                        name="clave"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-900 text-white p-4 rounded-lg"
                                placeholder="Clave"
                                placeholderTextColor="#666"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.clave && (
                        <Text className="text-red-500 mt-1">{errors.clave.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2">Repetir clave</Text>
                    <Controller
                        control={control}
                        name="repetirClave"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-zinc-900 text-white p-4 rounded-lg"
                                placeholder="Repetir clave"
                                placeholderTextColor="#666"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.repetirClave && (
                        <Text className="text-red-500 mt-1">{errors.repetirClave.message}</Text>
                    )}
                </View>

                <TouchableOpacity
                    className="bg-white py-4 rounded-lg mt-6"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text className="text-black text-center font-bold text-lg">Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 