import { View, Text, TextInput, TouchableOpacity } from "react-native";

const loginPageModule = () => {
    return (
        <View className="flex-1 bg-black items-center justify-center px-6">
     
            <Text className="text-white text-4xl font-bold mb-10">posco.</Text>
        
            
            <TextInput
                className="w-full bg-neutral-800 text-white p-4 rounded-lg mb-4"
                placeholder="Correo electrónico"
                placeholderTextColor="#888"
            />
            <TextInput
                className="w-full bg-neutral-800 text-white p-4 rounded-lg mb-6"
                placeholder="Contraseña"
                placeholderTextColor="#888"
                secureTextEntry
            />
    
            <TouchableOpacity className="w-full bg-gray-500 p-4 rounded-full items-center mb-4">
                <Text className="text-white text-lg font-bold">Iniciar sesión</Text>
            </TouchableOpacity>
        
            <TouchableOpacity className="w-full bg-gray-800 p-4 rounded-full items-center mb-4">
                <Text className="text-white text-lg font-bold">Crear Cuenta</Text>
            </TouchableOpacity>
        
            <TouchableOpacity>
                <Text className="text-gray-500 mt-2 text-sm">Olvidé mi contraseña</Text>
            </TouchableOpacity>
        </View>
    );
}

export default loginPageModule