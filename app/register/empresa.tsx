import { View, Text, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { empresaFormSchema, type EmpresaFormData } from '../../validators/register';
import { router } from 'expo-router';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function RegisterEmpresa() {
    const { control, handleSubmit, formState: { errors } } = useForm<EmpresaFormData>({
        resolver: zodResolver(empresaFormSchema)
    });

    const onSubmit = (data: EmpresaFormData) => {
        console.log(data);
        router.push('/register/plan');
    };

    return (
        <ScrollView className="flex-1 bg-black px-4">

            <View className="flex-row justify-center mb-10 p-3 rounded-full bg-transparent border-white border-2 mx-4">
                <View className="flex-row items-center mx-2">
                    <View className="w-10 h-10 rounded-full bg-neutral-500 items-center justify-center">
                        <Text className="text-white font-bold">1</Text>
                    </View>
                    <Feather name="user" size={20} color="white" className='ml-1' />
                </View>
                <View className="flex-row items-center mx-2">
                    <View className="w-10 h-10 rounded-full  bg-white items-center justify-center">
                        <Text className="text-black font-bold">2</Text>
                    </View>
                    <FontAwesome name="building-o" size={20} color="white" className='ml-1' />
                </View>
                <View className="flex-row items-center mx-2">
                    <View className="w-10 h-10 rounded-full bg-neutral-500 items-center justify-center">
                        <Text className="text-white font-bold">3</Text>
                    </View>
                    <AntDesign name="shoppingcart" size={20} color="white" className='ml-1' />
                </View>
            </View>


            <View >
                <View>
                    <Text className="text-white mb-2 mx-6">NIT</Text>
                    <Controller
                        control={control}
                        name="nit"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl"
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
                    <Text className="text-white mb-2 mx-6">Nombre de la Empresa</Text>
                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl"
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
                    <Text className="text-white mb-2 mx-6">Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl"
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
                    <Text className="text-white mb-2 mx-6">Teléfono</Text>
                    <Controller
                        control={control}
                        name="telefono"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl"
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
                    <Text className="text-white mb-2 mx-6">Ciudad</Text>
                    <Controller
                        control={control}
                        name="ciudad"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="mx-6 bg-zinc-900 text-white p-4 rounded-2xl"
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

                <TouchableOpacity onPress={handleSubmit(onSubmit)} className="w-full bg-gray-500 p-4 rounded-full items-center mb-14 mt-6">
                    <Text className="text-white text-lg font-bold">Registrarse</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
} 