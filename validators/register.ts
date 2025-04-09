import { z } from 'zod';

export const userFormSchema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    apellido: z.string().min(1, 'El apellido es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    email: z.string().email('Email inválido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    telefono: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    clave: z.string().min(6, 'La clave debe tener al menos 6 caracteres').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    repetirClave: z.string().min(6, 'La clave debe tener al menos 6 caracteres').max(100, "El campo nombre no puede tener más de 100 caracteres")
}).refine((data) => data.clave === data.repetirClave, {
    message: "Las claves no coinciden",
    path: ["repetirClave"],
});

export const empresaFormSchema = z.object({
    nit: z.string().min(1, 'El NIT es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    nombre: z.string().min(1, 'El nombre de la empresa es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    email: z.string().email('Email inválido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    telefono: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    ciudad: z.string().min(1, 'La ciudad es requerida').max(100, "El campo nombre no puede tener más de 100 caracteres"),
});

export const planFormSchema = z.object({
    plan: z.string().min(1, 'Debe seleccionar un plan').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    numeroTarjeta: z.string().nonempty('Ingrese el número de tarjeta').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    fechaExpiracion: z.string().nonempty('Ingrese la fecha de expiración').max(100, "El campo nombre no puede tener más de 100 caracteres"),
});


export type UserFormData = z.infer<typeof userFormSchema>;
export type EmpresaFormData = z.infer<typeof empresaFormSchema>;
export type PlanFormData = z.infer<typeof planFormSchema>; 