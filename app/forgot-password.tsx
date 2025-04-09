import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import Toast from 'react-native-toast-message';

const forgotPasswordSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordData) => {
        setIsLoading(true);
        
        try {
            // TODO: Implement password reset logic here
            // For now, we'll just simulate a successful request
            await new Promise(resolve => setTimeout(resolve, 1000));
            Toast.show({
                type: 'success',
                text1: '¡Éxito!',
                text2: 'Te enviamos un correo con instrucciones.',
            });
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No pudimos procesar tu solicitud.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View>
            <StatusBar style="dark" />
            <View className="bg-black items-center justify-center px-6 h-full ">
                <View className="flex-1 justify-end w-full items-center">

                <View className="w-52 h-20">
                    <Image 
                    className="w-full h-full" 
                    source={require("../assets/logo.png")} 
                    resizeMode="contain" 
                    />
                </View>

                <View className="w-full items-center mt-14">  
                    <Text className="text-white text-2xl font-bold mb-2 text-center">
                    Restablecer contraseña
                    </Text>

                    <Text className="text-gray-400 text-base mb-6 text-center">
                    Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña
                    </Text>

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
                        autoCapitalize="none"
                        keyboardType="email-address"
                        />
                    )}
                    />
                    {errors.email && (
                    <Text className="text-red-500 mb-2">{errors.email.message}</Text>
                    )}
                </View>
                </View>

                <View className="flex-1 justify-end w-full items-center mb-8">
                <TouchableOpacity 
                    onPress={handleSubmit(onSubmit)} 
                    className={`w-full ${isLoading ? 'bg-gray-700' : 'bg-gray-500'} p-4 rounded-full items-center mb-4`}
                    disabled={isLoading}
                >
                    <Text className="text-white text-lg font-bold">
                    {isLoading ? 'Enviando...' : 'Enviar'}
                    </Text>
                </TouchableOpacity>

                <Link href='/login' asChild>
                    <TouchableOpacity>
                    <Text className="text-gray-500 mt-2 text-sm">
                        Iniciar sesión con tus credenciales
                    </Text>
                    </TouchableOpacity>
                </Link>
                </View>
            </View>
        </View>


    );
};

export default ForgotPassword; 