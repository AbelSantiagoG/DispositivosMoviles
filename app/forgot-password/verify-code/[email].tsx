import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from 'expo-status-bar';
import { authService } from '../../../lib/auth';
import { useState } from "react";

const verifyCodeSchema = z.object({
    code: z.string()
        .length(4, "El código debe tener 4 dígitos")
        .regex(/^\d+$/, "El código solo debe contener números"),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(50, "La contraseña no puede tener más de 50 caracteres")
});

type VerifyCodeData = z.infer<typeof verifyCodeSchema>;

const VerifyCode = () => {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();
    const decodedEmail = email ? decodeURIComponent(email) : '';
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyCodeData>({
        resolver: zodResolver(verifyCodeSchema),
    });

    const onSubmit = async (data: VerifyCodeData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            await authService.resetPassword(decodedEmail, data.code, data.password);
            console.log('Restablecer contraseña para:', decodedEmail, 'con código:', data.code, 'y nueva contraseña:', data.password);
            router.push('/');
        } catch (e) {
            setError('Error al verificar el código o actualizar la contraseña');
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
                        <Image className="w-full h-full" source={require("../../../assets/logo.png")} resizeMode="contain" />
                    </View>

                    <Text className="text-white text-lg mb-2 text-center">
                        Recuperación para {decodedEmail}
                    </Text>

                    <Text className="text-white text-lg mb-6 text-center">
                        Ingresa el código de 4 dígitos que enviamos a tu correo y tu nueva contraseña
                    </Text>

                    {error && (
                        <Text className="text-red-500 mb-4 w-full text-center">{error}</Text>
                    )}

                    <Controller
                        control={control}
                        name="code"
                        render={({ field: { onChange, value } }) => (
                            <View className="w-full mb-4">
                                <TextInput
                                    className="w-full bg-neutral-800 text-white p-4 rounded-2xl text-center text-2xl"
                                    placeholder="0000"
                                    placeholderTextColor="#888"
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="number-pad"
                                    maxLength={4}
                                />
                                {errors.code && (
                                    <Text className="text-red-500 text-sm mt-1 ml-2">
                                        {errors.code.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <View className="w-full mb-4">
                                <TextInput
                                    className="w-full bg-neutral-800 text-white p-4 rounded-2xl"
                                    placeholder="Nueva contraseña"
                                    placeholderTextColor="#888"
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry
                                    maxLength={50}
                                />
                                {errors.password && (
                                    <Text className="text-red-500 text-sm mt-1 ml-2">
                                        {errors.password.message}
                                    </Text>
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
                            {isLoading ? 'Procesando...' : 'Actualizar contraseña'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => router.back()}
                        className="w-full bg-gray-800 p-4 rounded-full items-center mb-4"
                        disabled={isLoading}
                    >
                        <Text className="text-white text-lg font-bold">Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default VerifyCode; 