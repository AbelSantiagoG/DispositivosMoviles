import { z } from 'zod';

export const productoFormSchema = z.object({
    nombre: z.string().min(1, 'El nombre del producto es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    descripcion: z.string().min(1, 'La descripción del producto es requerida').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    precio: z.number().min(1, 'El precio del producto es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    stock: z.number().min(1, 'La cantidad del producto es requerida').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    categoria: z.array(z.string()).min(1, 'Debe seleccionar al menos una categoría').max(100, "El campo nombre no puede tener más de 100 caracteres"),
    proveedor: z.string().min(1, 'El proveedor es requerido').max(100, "El campo nombre no puede tener más de 100 caracteres")
});


export type ProductoFormData = z.infer<typeof productoFormSchema>;