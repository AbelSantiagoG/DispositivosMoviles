import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";

const verifyCodeSchema = z.object({
    code: z.string()
        .length(4, "El código debe tener 4 dígitos")
        .regex(/^\d+$/, "El código solo debe contener números"),
});

type VerifyCodeData = z.infer<typeof verifyCodeSchema>;

const VerifyCode = () => {
    const router = useRouter();
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
            // TODO: Implement code verification logic here
            // For now, we'll just simulate a successful request
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/forgot-password/reset-password');
        } catch (e) {
            setError('Código inválido');
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
                        Ingresa el código de 4 dígitos que enviamos a tu correo electrónico
                    </Text>

                    {error && (
                        <Text className="text-red-500 mb-4 w-full text-center">{error}</Text>
                    )}

                    <Controller
                        control={control}
                        name="code"
                        render={({ field: { onChange, value } }) => (
                            <View className="w-full mb-2">
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
                </View>

                <View className="flex-1 justify-end w-full items-center mb-8">
                    <TouchableOpacity 
                        onPress={handleSubmit(onSubmit)} 
                        className={`w-full ${isLoading ? 'bg-gray-700' : 'bg-gray-500'} p-4 rounded-full items-center mb-4`}
                        disabled={isLoading}
                    >
                        <Text className="text-white text-lg font-bold">
                            {isLoading ? 'Verificando...' : 'Verificar código'}
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