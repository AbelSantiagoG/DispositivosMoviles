import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email("Correo inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type loginFormData = z.infer<typeof loginFormSchema>;