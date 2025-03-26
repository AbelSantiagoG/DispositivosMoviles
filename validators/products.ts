import { z } from 'zod';

export const productoFormSchema = z.object({
    nombre: z.string().min(1, 'El nombre del producto es requerido'),
    descripcion: z.string().min(1, 'La descripción del producto es requerida'),
    precio: z.number().min(1, 'El precio del producto es requerido'),
    stock: z.number().min(1, 'La cantidad del producto es requerida'),
    categoria: z.array(z.string()).min(1, 'Debe seleccionar al menos una categoría'),
    proveedor: z.string().min(1, 'El proveedor es requerido')
});


export type ProductoFormData = z.infer<typeof productoFormSchema>;