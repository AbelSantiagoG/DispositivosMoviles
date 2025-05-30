import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { authService } from '../../lib/auth';
import Toast from 'react-native-toast-message';
import FormErrorMessage from "../../components/atoms/FormErrorMessage";

const forgotPasswordSchema = z.object({
    email: z.string()
        .min(1, "Por favor, ingresa tu correo electrónico")
        .max(50, "El correo electrónico no puede tener más de 50 caracteres")
        .email("Por favor, ingresa un correo electrónico válido")
        .transform(val => val.toLowerCase()),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            await authService.sendRecoveryEmail(data.email);
            Toast.show({
                type: 'success',
                text1: '¡Éxito!',
                text2: 'Te enviamos un correo con instrucciones.',
            });
            router.push(`/forgot-password/verify-code/${encodeURIComponent(data.email)}`);
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
            <View className="bg-black items-center justify-center px-6 h-full">
                <View className="flex-1 justify-end w-full items-center">
                    <View className="w-52 h-20 mb-4">
                        <Image className="w-full h-full" source={require("../../assets/logo.png")} resizeMode="contain" />
                    </View>

                    <Text className="text-white text-lg mb-6 text-center">
                        Ingresa tu correo electrónico para reestablecer tu contraseña
                    </Text>

                    {error && (
                        <Text className="text-red-500 mb-4 w-full text-center">{error}</Text>
                    )}

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <View className="w-full mb-2">
                                <TextInput
                                    className="w-full bg-neutral-800 text-white p-4 rounded-2xl"
                                    placeholder="Correo electrónico"
                                    placeholderTextColor="#888"
                                    onChangeText={onChange}
                                    value={value}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    maxLength={50}
                                />
                                {errors.email && (
                                    <FormErrorMessage message={errors.email?.message} />
                                )}
                            </View>
                        )}
                    />
                </View>

                <View className="flex-1 justify-end w-full items-center mb-8">
                    <TouchableOpacity 
                        onPress={handleSubmit(onSubmit)} 
                        className={`w-full ${isLoading ? 'bg-gray-700' : 'bg-gray-500'} p-4 rounded-full items-center mb-4`}
                        disabled={isLoading}
                    >
                        <Text className="text-white text-lg font-bold">
                            {isLoading ? 'Enviando...' : 'Enviar código'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => router.back()}
                        disabled={isLoading}
                    >
                        <Text className="text-gray-500 mt-2 text-sm">Iniciar sesión con mis credenciales</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ForgotPassword; 