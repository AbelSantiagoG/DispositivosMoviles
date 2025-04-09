import { Stack } from "expo-router";
import { PublicRoute } from '../../context/PublicRoute';

const ForgotPasswordLayoutContent = () => {
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
};

export default function ForgotPasswordLayout() {
    return (
        <PublicRoute>
            <ForgotPasswordLayoutContent />
        </PublicRoute>
    );
} 