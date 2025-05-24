import api from './api';
import { eq } from 'drizzle-orm';
import { product } from '../db/schema';
import { useDrizzle } from '../context/DatabaseContext'; // accede al drizzle client

export type ProductStatus = 'active' | 'inactive' | 'out_of_stock';

export interface ProductData {
    name: string;
    description: string;
    status: ProductStatus;
    stock: number;
    supplier_price: number;
    public_price: number;
    thumbnail: string;
    bar_code: string;
    minimal_safe_stock: number;
    discount: number;
    enterprise_id: number;
    category_id: number;
    supplier_id: number;
}


// Este hook te devuelve los métodos, una vez tengas el drizzle disponible
export const useProductService = () => {
    const db = useDrizzle();

    return {
        async getAllProducts() {
            try {
                const response = await api.get('/products');
                const products = response.data;

                // Cachear localmente
                for (const p of products) {
                    await db
                        .insert(product)
                        .values(p)
                        .onConflictDoUpdate({ target: product.id, set: p })
                        .run();
                }

                return products;
            } catch (error:any) {
                console.warn('API no disponible, usando SQLite:', error?.message);
                return await db.select().from(product).all();
            }
        },

        async getProductById(id: number) {
            try {
                const response = await api.get(`/products/${id}`);
                const prod = response.data;

                await db
                    .insert(product)
                    .values(prod)
                    .onConflictDoUpdate({ target: product.id, set: prod })
                    .run();

                return prod;
            } catch (error:any) {
                console.warn('API no disponible, buscando local:', error?.message);
                return await db.select().from(product).where(eq(product.id, id)).get();
            }
        },

        async createProduct(data: ProductData) {
            try {
                const response = await api.post('/products', data);
                return response.data;
            } catch (error) {
                console.error('Error al crear producto:', error);
                throw error; // podrías guardar en una tabla "pendientes" local si lo deseas
            }
        },

        async updateProduct(id: number, data: Partial<ProductData>) {
            try {
                const response = await api.put(`/products/${id}`, data);
                return response.data;
            } catch (error:any) {
                console.warn('Error API, guardando update local', error?.message);
                await db.update(product).set(data).where(eq(product.id, id)).run();
            }
        },

        async deleteProduct(id: number) {
            try {
                await api.delete(`/products/${id}`);
                // También elimina localmente
                await db.delete(product).where(eq(product.id, id)).run();
            } catch (error:any) {
                console.warn('Error API al eliminar, eliminando local:', error?.message);
                await db.delete(product).where(eq(product.id, id)).run();
            }
        },

        async syncProducts() {
            try {
                // 1. Verifica si hay conexión a la API
                const test = await api.get('/ping'); // Usa un endpoint pequeño
                if (test.status !== 200) return;

                // 2. Enviar productos locales no sincronizados
                const unsynced = await db
                .select()
                .from(product)
                .where(eq(product.synced, 0))
                .all();

                for (const p of unsynced) {
                try {
                    // Si ya existe, haz PUT, si no, POST
                    await api.post('/products', p); // Usa PUT si ya existe
                    await db.update(product)
                    .set({ synced: 1 })
                    .where(eq(product.id, p.id))
                    .run();
                } catch (err:any) {
                    console.warn('No se pudo sincronizar producto', p.id, err.message);
                }
                }

                // 3. Descargar productos de la API y actualizar localmente
                const { data: apiProducts } = await api.get('/products');
                for (const p of apiProducts) {
                await db.insert(product)
                    .values({ ...p, synced: 1 })
                    .onConflictDoUpdate({ target: product.id, set: { ...p, synced: 1 } })
                    .run();
                }

                console.log('✅ Sincronización completa');
            } catch (err:any) {
                console.warn('❌ Error en sincronización', err.message);
            }
            }
    };
};
