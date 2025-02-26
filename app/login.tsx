import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { loginFormSchema, loginFormData } from "../validators/login";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<loginFormData>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmit = async (data: loginFormData) => {
        try {
            await AsyncStorage.setItem('@infologin', JSON.stringify(data));
            console.log("Datos guardados en AsyncStorage:", data);
            router.navigate('/dashboard');
        } catch (e) {
            console.log('Error al guardar la información:', e);
        }
    };

    return (
        <View className="bg-black items-center justify-center px-6 h-full">
            <View className="flex-1 justify-end w-full items-center">
                <View className="w-52 h-20 mb-4">
                    <Image className="w-full h-full" source={require("../assets/logo.png")} resizeMode="contain" />
                </View>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="w-full bg-neutral-800 text-white p-4 rounded-2xl mb-2"
                            placeholder="Correo electrónico"
                            placeholderTextColor="#888"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="w-full bg-neutral-800 text-white p-4 rounded-2xl mb-2"
                            placeholder="Contraseña"
                            placeholderTextColor="#888"
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
            </View>

            <View className="flex-1 justify-end w-full items-center mb-8">
                <TouchableOpacity onPress={handleSubmit(onSubmit)} className="w-full bg-gray-500 p-4 rounded-full items-center mb-4">
                    <Text className="text-white text-lg font-bold">Iniciar sesión</Text>
                </TouchableOpacity>

                <Link href='/register' asChild>
                    <TouchableOpacity className="w-full bg-gray-800 p-4 rounded-full items-center mb-4">
                        <Text className="text-white text-lg font-bold">Crear Cuenta</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity>
                    <Text className="text-gray-500 mt-2 text-sm">Olvidé mi contraseña</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
