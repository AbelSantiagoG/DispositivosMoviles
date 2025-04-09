import { z } from 'zod';

export const empleadosFormSchema = z.object({
    nombre: z.string().min(1, 'El nombre del empleado es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    apellido: z.string().min(1, 'El apellido del empleado es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    email: z.string().email('El email no es válido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    telefono: z.string().min(1, 'El teléfono del empleado es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    rol: z.string().min(1, 'El rol del empleado es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    empresa: z.string().min(1, 'La empresa del empleado es requerida').max(100, "El campo nombre no puede tener más de 100 caracteres")
});

export type EmpleadoFormData = z.infer<typeof empleadosFormSchema>;