import { z } from 'zod';

export const proveedoresFormSchema = z.object({
    nombre: z.string().min(1, 'El nombre del empleado es requerido'),
    email: z.string().email('El email no es válido'),
    telefono: z.string().min(1, 'El teléfono del empleado es requerido'),
    empresa: z.string().min(1, 'La empresa del empleado es requerida')
});

export type ProveedorFormData = z.infer<typeof proveedoresFormSchema>;