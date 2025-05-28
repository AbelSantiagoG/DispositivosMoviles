import { z } from 'zod';

export const proveedoresFormSchema = z.object({
    nombre: z.string().min(1, 'El nombre del proveedor es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    email: z.string().email('El email no es válido').max(100, "El campo email no puede tener más de 100 caracteres"),
    telefono: z.string().min(1, 'El teléfono del proveedor es requerido').max(100, "El campo teléfono no puede tener más de 100 caracteres"),
    nit: z.string().min(1, 'El NIT del proveedor es requerido').max(45, "El NIT no puede tener más de 45 caracteres"),
    empresa: z.string().min(1, 'La empresa del proveedor es requerida')
});

export type ProveedorFormData = z.infer<typeof proveedoresFormSchema>;