import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, type UserFormData } from '../../validators/register';
import { router } from 'expo-router';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function RegisterUser() {
    const { control, handleSubmit, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema)
    });

    const onSubmit = (data: UserFormData) => {
        console.log(data);
        router.push('/register/empresa');
    };

    return (
        <ScrollView className="flex-1 bg-black px-4">
            <View className="flex-row justify-center mb-10 p-3 rounded-full bg-transparent border-white border-2 mx-4">
                <View className="flex-row items-center mx-2">
                    <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                        <Text className="text-black font-bold">1</Text>
                    </View>
                    <Feather name="user" size={20} color="white" className='ml-1' />
                </View>
                <View className="flex-row items-center mx-2">
                    <View className="w-10 h-10 rounded-full bg-neutral-500 items-center justify-center">
                        <Text className="text-white font-bold">2</Text>
                    </View>
                    <FontAwesome name="building-o" size={20} color="white" className='ml-1' />
                </View>
                <View className="flex-row items-center mx-2">
                    <View className="w-10 h-10 rounded-full bg-neutral-500 items-center justify-center">
                        <Text className="text-white font-bold">3</Text>
                    </View>
                    <AntDesign name="shoppingcart" size={20} color="white" className='ml-1'/>
                </View>
            </View>

            <View >
                <View>
                    <Text className="text-white mb-2 mx-6">Nombre</Text>
                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl "
                                placeholder="Nombre"
                                placeholderTextColor="#666"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.nombre && (
                        <Text className="text-red-500 mt-1 mx-5">{errors.nombre.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2 mx-6 mt-5">Apellido</Text>
                    <Controller
                        control={control}
                        name="apellido"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl "
                                placeholder="Apellido"
                                placeholderTextColor="#666"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.apellido && (
                        <Text className="text-red-500 mt-1 mx-5">{errors.apellido.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2 mx-6 mt-5">Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl "
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
                        <Text className="text-red-500 mt-1 mx-5">{errors.email.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2 mx-6 mt-5">Teléfono</Text>
                    <Controller
                        control={control}
                        name="telefono"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl "
                                placeholder="Teléfono"
                                placeholderTextColor="#666"
                                keyboardType="phone-pad"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.telefono && (
                        <Text className="text-red-500 mt-1 mx-5">{errors.telefono.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2 mx-6 mt-5">Clave</Text>
                    <Controller
                        control={control}
                        name="clave"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl "
                                placeholder="Clave"
                                placeholderTextColor="#666"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.clave && (
                        <Text className="text-red-500 mt-1 mx-5">{errors.clave.message}</Text>
                    )}
                </View>

                <View>
                    <Text className="text-white mb-2 mx-6 mt-5">Repetir clave</Text>
                    <Controller
                        control={control}
                        name="repetirClave"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl "
                                placeholder="Repetir clave"
                                placeholderTextColor="#666"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.repetirClave && (
                        <Text className="text-red-500 mt-1 mx-5">{errors.repetirClave.message}</Text>
                    )}
                </View>

                <TouchableOpacity onPress={handleSubmit(onSubmit)} className="w-full bg-gray-500 p-4 rounded-full items-center mb-14 mt-6">
                    <Text className="text-white text-lg font-bold">Continuar</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}