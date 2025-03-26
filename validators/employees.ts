import { z } from 'zod';

export const empleadosFormSchema = z.object({
    nombre: z.string().min(1, 'El nombre del empleado es requerido'),
    apellido: z.string().min(1, 'El apellido del empleado es requerido'),
    email: z.string().email('El email no es válido'),
    telefono: z.string().min(1, 'El teléfono del empleado es requerido'),
    rol: z.string().min(1, 'El rol del empleado es requerido'),
    empresa: z.string().min(1, 'La empresa del empleado es requerida')
});

export type EmpleadoFormData = z.infer<typeof empleadosFormSchema>;