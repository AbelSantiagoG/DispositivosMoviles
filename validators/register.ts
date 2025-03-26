import { z } from 'zod';

export const userFormSchema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido'),
    apellido: z.string().min(1, 'El apellido es requerido'),
    email: z.string().email('Email inválido'),
    telefono: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
    clave: z.string().min(6, 'La clave debe tener al menos 6 caracteres'),
    repetirClave: z.string()
}).refine((data) => data.clave === data.repetirClave, {
    message: "Las claves no coinciden",
    path: ["repetirClave"],
});

export const empresaFormSchema = z.object({
    nit: z.string().min(1, 'El NIT es requerido'),
    nombre: z.string().min(1, 'El nombre de la empresa es requerido'),
    email: z.string().email('Email inválido'),
    telefono: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
    ciudad: z.string().min(1, 'La ciudad es requerida'),
});

export const planFormSchema = z.object({
    plan: z.string().min(1, 'Debe seleccionar un plan'),
    numeroTarjeta: z.string().nonempty('Ingrese el número de tarjeta'),
    fechaExpiracion: z.string().nonempty('Ingrese la fecha de expiración'),
});


export type UserFormData = z.infer<typeof userFormSchema>;
export type EmpresaFormData = z.infer<typeof empresaFormSchema>;
export type PlanFormData = z.infer<typeof planFormSchema>; 