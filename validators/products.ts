import { z } from 'zod';

export const productoFormSchema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido'),
    descripcion: z.string().min(1, 'La descripción es requerida'),
    precio: z.number().min(0.01, 'El precio debe ser mayor a 0'),
    stock: z.number().min(0, 'El stock no puede ser negativo'),
    categoria: z.array(z.string()).min(1, 'Debe seleccionar una categoría'),
    proveedor: z.string().min(1, 'Debe seleccionar un proveedor'),
    descuento: z.number().min(0, 'El descuento no puede ser negativo').max(100, 'El descuento no puede ser mayor a 100%').default(0)
});

export type ProductoFormData = z.infer<typeof productoFormSchema>;