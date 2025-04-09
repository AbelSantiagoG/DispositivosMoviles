import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,}$/;

export const loginFormSchema = z.object({
    email: z.string()
        .min(1, "Por favor, ingresa tu correo electrónico")
        .max(50, "El correo electrónico no puede tener más de 50 caracteres")
        .regex(emailRegex, "Por favor, ingresa un correo electrónico válido")
        .transform(val => val.toLowerCase()),
    password: z.string()
        .min(1, "Por favor, ingresa tu contraseña")
        .max(50, "La contraseña no puede tener más de 50 caracteres")
        .regex(passwordRegex, "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número")
        .trim(),
});

export type loginFormData = z.infer<typeof loginFormSchema>;