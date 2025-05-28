import api from './api';
import { eq } from 'drizzle-orm';
import { product,  } from '../db/schema';
import { useDrizzle } from '../context/DatabaseContext';

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

export interface ProductImageData extends ProductData {
    image?: {
        uri: string;
        type: string;
        name: string;
    };
}

const API_BASE_URL = 'https://martinostios.com';

const generateUniqueBarcode = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `PRD-${timestamp}-${random}`;
};

export const useProductService = () => {
    try {
        const db = useDrizzle();

        if (!db) {
            throw new Error('Database context is not available');
        }

        return {
            async getAllProducts() {
                try {
                    const response = await api.get('/products');
                    const products = response.data;

                    for (const p of products) {
                        await db
                            .insert(product)
                            .values({ ...p, synced: true })
                            .onConflictDoUpdate({ target: product.id, set: { ...p, synced: true } })
                            .run();
                    }

                    return products;
                } catch (error: any) {
                    console.warn('API no disponible, usando SQLite:', error?.message);
                    try {
                        return await db
                            .select()
                            .from(product)
                            .where(eq(product.status, 'active'))
                            .all();
                    } catch (dbError) {
                        console.error('Error al obtener productos de la base de datos:', dbError);
                        throw new Error('No se pudieron obtener los productos');
                    }
                }
            },

            async getProductById(id: number) {
                try {
                    const response = await api.get(`/products/${id}`);
                    const prod = response.data;

                    await db
                        .insert(product)
                        .values({ ...prod, synced: true })
                        .onConflictDoUpdate({ target: product.id, set: { ...prod, synced: true } })
                        .run();

                    return prod;
                } catch (error: any) {
                    console.warn('API no disponible, buscando local:', error?.message);
                    try {
                        return await db.select().from(product).where(eq(product.id, id)).get();
                    } catch (dbError) {
                        console.error('Error al obtener producto de la base de datos:', dbError);
                        throw new Error('No se pudo obtener el producto');
                    }
                }
            },

            async getProductByBarcode(barcode: string) {
                try {
                    const response = await api.get(`/products/barcode/${barcode}`);
                    return response.data;
                } catch (error: any) {
                    console.warn('Error buscando por código de barras:', error?.message);
                    throw new Error('No se pudo encontrar el producto por código de barras');
                }
            },

            async searchProducts(query: string) {
                try {
                    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
                    return response.data;
                } catch (error: any) {
                    console.warn('Error en búsqueda de productos:', error?.message);
                    throw new Error('No se pudieron buscar los productos');
                }
            },

            async getProductsByCategory(categoryId: number) {
                try {
                    const response = await api.get(`/products/category/${categoryId}`);
                    const products = response.data;

                    for (const p of products) {
                        await db
                            .insert(product)
                            .values({ ...p, synced: true })
                            .onConflictDoUpdate({ target: product.id, set: { ...p, synced: true } })
                            .run();
                    }

                    return products;
                } catch (error: any) {
                    console.warn('API no disponible, usando SQLite:', error?.message);
                    try {
                        return await db.select().from(product).where(eq(product.category_id, categoryId)).all();
                    } catch (dbError) {
                        console.error('Error al obtener productos por categoría:', dbError);
                        throw new Error('No se pudieron obtener los productos de la categoría');
                    }
                }
            },

            async createProduct(data: ProductData) {
                try {
                    // Intentar crear en el servidor primero
                    const response = await api.post('/products', {
                        ...data,
                        bar_code: generateUniqueBarcode(),
                    });
                    const newProduct = response.data;

                    // Si tiene éxito, guardar en la base de datos local
                    await db
                        .insert(product)
                        .values({ ...newProduct, synced: true })
                        .run();

                    return newProduct;
                } catch (error: any) {
                    console.warn('API no disponible, guardando localmente:', error?.message);
                    try {
                        // Crear el producto localmente sin especificar ID
                        const localProduct = {
                            ...data,
                            bar_code: generateUniqueBarcode(),
                            synced: false,
                            status: 'active' as ProductStatus
                        };

                        const result = await db
                            .insert(product)
                            .values(localProduct)
                            .run();

                        console.log('✅ Producto creado localmente:', result.lastInsertRowId);
                        return { ...localProduct, id: result.lastInsertRowId };
                    } catch (dbError) {
                        console.error('Error al crear producto localmente:', dbError);
                        throw new Error('No se pudo crear el producto localmente. Por favor, verifica todos los campos.');
                    }
                }
            },

            async createProductWithImage(data: ProductImageData) {
                try {
                    const formData = new FormData();
                    const barCode = generateUniqueBarcode();

                    formData.append('name', data.name);
                    formData.append('description', data.description);
                    formData.append('status', data.status);
                    formData.append('stock', data.stock.toString());
                    formData.append('supplier_price', data.supplier_price.toString());
                    formData.append('public_price', data.public_price.toString());
                    formData.append('bar_code', barCode);
                    formData.append('minimal_safe_stock', data.minimal_safe_stock.toString());
                    formData.append('discount', (data.discount || 0).toString());
                    formData.append('enterprise_id', data.enterprise_id.toString());
                    formData.append('category_id', data.category_id.toString());
                    formData.append('supplier_id', data.supplier_id.toString());

                    if (data.image) {
                        const imageFile = {
                            uri: data.image.uri,
                            type: 'image/jpeg',
                            name: 'product_image.jpg',
                        };
                        formData.append('image', imageFile as any);
                    }

                    const response = await api.post('/products/create-with-image', formData, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        transformRequest: (data) => data,
                    });

                    const newProduct = response.data;
                    await db
                        .insert(product)
                        .values({ ...newProduct, synced: true })
                        .run();

                    return newProduct;
                } catch (error: any) {
                    console.warn('API no disponible, guardando localmente:', error?.message);
                    try {
                        // Crear el producto localmente sin especificar ID
                        const localProduct = {
                            ...data,
                            bar_code: generateUniqueBarcode(),
                            synced: false,
                            status: 'active' as ProductStatus,
                            thumbnail: data.image ? 'local_image.jpg' : ''
                        };

                        const result = await db
                            .insert(product)
                            .values(localProduct)
                            .run();

                        console.log('✅ Producto con imagen creado localmente:', result.lastInsertRowId);
                        return { ...localProduct, id: result.lastInsertRowId };
                    } catch (dbError) {
                        console.error('Error al crear producto con imagen localmente:', dbError);
                        throw new Error('No se pudo crear el producto localmente. Por favor, verifica todos los campos.');
                    }
                }
            },

            async updateProduct(id: number, data: Partial<ProductData>) {
                try {
                    const response = await api.put(`/products/${id}`, data);
                    const updatedProduct = response.data;
                    
                    // Actualizar en la base de datos local
                    await db
                        .update(product)
                        .set({ ...updatedProduct, synced: true })
                        .where(eq(product.id, id))
                        .run();

                    return updatedProduct;
                } catch (error: any) {
                    console.warn('Error API al actualizar, guardando local:', error?.message);
                    try {
                        // Guardar los cambios localmente y marcar como no sincronizado
                        await db
                            .update(product)
                            .set({ 
                                ...data,
                                synced: false
                            })
                            .where(eq(product.id, id))
                            .run();

                        console.log('✅ Producto actualizado localmente:', id);
                        return { ...data, id };
                    } catch (dbError) {
                        console.error('Error al actualizar producto localmente:', dbError);
                        throw new Error('No se pudo actualizar el producto');
                    }
                }
            },

            async deleteProduct(id: number) {
                try {
                    await api.delete(`/products/${id}`);
                    await db.delete(product).where(eq(product.id, id)).run();
                } catch (error: any) {
                    console.warn('Error API al eliminar, eliminando local:', error?.message);
                    try {
                        // Eliminar el producto localmente
                        await db.delete(product).where(eq(product.id, id)).run();
                        console.log('✅ Producto eliminado localmente:', id);
                    } catch (dbError) {
                        console.error('Error al eliminar producto localmente:', dbError);
                        throw new Error('No se pudo eliminar el producto');
                    }
                }
            },

            async syncProducts() {
                try {
                    // Obtener productos no sincronizados
                    const unsynced = await db
                        .select()
                        .from(product)
                        .where(eq(product.synced, false))
                        .all();

                    console.log(`🔄 Sincronizando ${unsynced.length} productos...`);

                    // Sincronizar productos
                    for (const p of unsynced) {
                        try {
                            // Intentar crear en el servidor (ya que son productos nuevos)
                            const response = await api.post('/products', p);
                            const serverProduct = response.data;

                            // Actualizar el producto local con el ID del servidor
                            await db
                                .update(product)
                                .set({ 
                                    ...serverProduct,
                                    synced: true 
                                })
                                .where(eq(product.id, p.id))
                                .run();

                            console.log('✅ Producto sincronizado:', p.id, '->', serverProduct.id);
                        } catch (err: any) {
                            console.warn('❌ No se pudo sincronizar producto:', p.id, err.message);
                        }
                    }

                    // Obtener productos del servidor
                    console.log('📥 Obteniendo productos del servidor...');
                    const { data: apiProducts } = await api.get('/products');
                    
                    // Obtener IDs de productos locales
                    const localProducts = await db.select().from(product).all();
                    const localProductIds = new Set(localProducts.map(p => p.id));

                    // Actualizar o insertar productos del servidor
                    for (const p of apiProducts) {
                        if (!localProductIds.has(p.id)) {
                            await db
                                .insert(product)
                                .values({ ...p, synced: true })
                                .run();
                            console.log('✅ Nuevo producto insertado:', p.id);
                        } else {
                            // Solo actualizar si el producto local está sincronizado
                            const localProduct = localProducts.find(lp => lp.id === p.id);
                            if (localProduct?.synced) {
                                await db
                                    .update(product)
                                    .set({ ...p, synced: true })
                                    .where(eq(product.id, p.id))
                                    .run();
                                console.log('✅ Producto actualizado:', p.id);
                            }
                        }
                    }

                    console.log('✅ Sincronización completa');
                } catch (err: any) {
                    console.warn('❌ Error en sincronización:', err.message);
                    throw new Error('No se pudieron sincronizar los productos');
                }
            },

            getImageUrl(thumbnail: string | null) {
                if (!thumbnail) {
                    return require('../assets/product.png');
                }
                return { uri: `${API_BASE_URL}/static/images/${thumbnail}` };
            },
        };
    } catch (error) {
        console.error('Error al inicializar el servicio de productos:', error);
        throw error;
    }
};
