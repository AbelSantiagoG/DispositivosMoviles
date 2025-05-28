import { z } from 'zod';

export const userFormSchema = z.object({
    employee_name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede tener más de 50 caracteres'),
    employee_lastname: z.string()
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(50, 'El apellido no puede tener más de 50 caracteres'),
    employee_email: z.string()
        .email('Por favor ingresa un email válido'),
    employee_phone: z.string()
        .min(10, 'El teléfono debe tener al menos 10 dígitos')
        .max(15, 'El teléfono no puede tener más de 15 dígitos'),
    password: z.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'La contraseña debe tener al menos una mayúscula')
        .regex(/[a-z]/, 'La contraseña debe tener al menos una minúscula')
        .regex(/[0-9]/, 'La contraseña debe tener al menos un número')
        .regex(/[^A-Za-z0-9]/, 'La contraseña debe tener al menos un carácter especial'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export const empresaFormSchema = z.object({
    enterprise_name: z.string()
        .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres')
        .max(100, 'El nombre de la empresa no puede tener más de 100 caracteres'),
    nit: z.string()
        .min(9, 'El NIT debe tener al menos 9 caracteres')
        .max(15, 'El NIT no puede tener más de 15 caracteres'),
    enterprise_email: z.string()
        .email('Por favor ingresa un email válido de la empresa'),
    enterprise_phone: z.string()
        .min(10, 'El teléfono debe tener al menos 10 dígitos')
        .max(15, 'El teléfono no puede tener más de 15 dígitos'),
    city: z.string()
        .min(2, 'La ciudad debe tener al menos 2 caracteres')
        .max(50, 'La ciudad no puede tener más de 50 caracteres'),
});

export const planFormSchema = z.object({
    plan: z.string()
        .min(1, 'Debe seleccionar un plan'),
    numeroTarjeta: z.string()
        .regex(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos'),
    fechaExpiracion: z.string()
        .regex(/^\d{4}$/, 'Formato inválido. Use MMYY'),
});

export type UserFormData = z.infer<typeof userFormSchema>;
export type EmpresaFormData = z.infer<typeof empresaFormSchema>;
export type PlanFormData = z.infer<typeof planFormSchema>; 