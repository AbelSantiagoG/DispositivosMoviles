import { Stack } from "expo-router";

export default function ForgotPasswordLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Recuperar contraseña",
                }}
            />
            <Stack.Screen
                name="verify-code"
                options={{
                    title: "Verificar código",
                }}
            />
        </Stack>
    );
} 