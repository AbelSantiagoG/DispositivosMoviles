import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";

const Login = () => {
    return (
        <View className="bg-black items-center justify-center px-6 h-full">

            <View className="flex-1 justify-end w-full items-center">
                <View className="w-52 h-20 mb-4">
                    <Image className="w-full h-full" source={require('../../assets/logo.png')} resizeMode="contain" />
                </View>

                <TextInput
                    className="w-full bg-neutral-800 text-white p-4 rounded-2xl mb-4"
                    placeholder="Correo electrónico"
                    placeholderTextColor="#888"
                />
                <TextInput
                    className="w-full bg-neutral-800 text-white p-4 rounded-2xl mb-4"
                    placeholder="Contraseña"
                    placeholderTextColor="#888"
                    secureTextEntry
                />
            </View>

            <View className="flex-1 justify-end w-full items-center mb-8">
                <Link href='/dashboard' asChild>
                    <TouchableOpacity className="w-full bg-gray-500 p-4 rounded-full items-center mb-4">
                        <Text className="text-white text-lg font-bold">Iniciar sesión</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity className="w-full bg-gray-800 p-4 rounded-full items-center mb-4">
                    <Text className="text-white text-lg font-bold">Crear Cuenta</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text className="text-gray-500 mt-2 text-sm">Olvidé mi contraseña</Text>
                </TouchableOpacity>

            </View>


            {/*             <Link href='/dashboard'>
            <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                Dashboard
            </Text>
            </Link>
            <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
            ¿No tiene cuenta pa?
            </Text>
            <Link href='/register'>
            <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                Regístrese
            </Text>
            </Link> */}

        </View>

    );
}

export default Login