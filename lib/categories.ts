import api from './api'
import { eq } from 'drizzle-orm'
import { category } from '../db/schema'
import { useDrizzle } from '../context/DatabaseContext'

export interface CategoryData {
    name: string
    description: string
    enterprise_id: number
    id: number
}

export const useCategoryService = () => {
    try {
        const db = useDrizzle()

        if (!db) {
            throw new Error('Database context is not available')
        }

        const service = {
            async getAllCategories() {
                try {
                    const response = await api.get('/categories')
                    const categories = response.data

                    for (const cat of categories) {
                        await db
                            .insert(category)
                            .values({ ...cat, synced: true })
                            .onConflictDoUpdate({ target: category.id, set: { ...cat, synced: true } })
                            .run()
                    }

                    return categories
                } catch (error: any) {
                    console.warn('API no disponible, usando datos locales:', error?.message)
                    try {
                        return await db.select().from(category).all()
                    } catch (dbError) {
                        console.error('Error al obtener categorías de la base de datos:', dbError)
                        throw new Error('No se pudieron obtener las categorías')
                    }
                }
            },

            async getCategoryById(id: number) {
                try {
                    const response = await api.get(`/categories/${id}`)
                    const cat = response.data

                    await db
                        .insert(category)
                        .values({ ...cat, synced: true })
                        .onConflictDoUpdate({ target: category.id, set: { ...cat, synced: true } })
                        .run()

                    return cat
                } catch (error: any) {
                    console.warn('API no disponible, buscando local:', error?.message)
                    try {
                        return await db.select().from(category).where(eq(category.id, id)).get()
                    } catch (dbError) {
                        console.error('Error al obtener categoría de la base de datos:', dbError)
                        throw new Error('No se pudo obtener la categoría')
                    }
                }
            },

            async createCategory(data: CategoryData) {
                try {
                    const response = await api.post('/categories', data)
                    const newCategory = response.data

                    await db.insert(category).values({ ...newCategory, synced: true }).run()

                    return newCategory
                } catch (error: any) {
                    console.warn('API no disponible, guardando localmente:', error?.message)
                    try {
                        await db.insert(category).values({ ...data, synced: false }).run()
                    } catch (dbError) {
                        console.error('Error al crear categoría en la base de datos:', dbError)
                        throw new Error('No se pudo crear la categoría')
                    }
                }
            },

            async updateCategory(id: number, data: Partial<CategoryData>) {
                try {
                    const response = await api.put(`/categories/${id}`, data)
                    const updated = response.data

                    await db.update(category).set({ ...updated, synced: true }).where(eq(category.id, id)).run()

                    return updated
                } catch (error: any) {
                    console.warn('Error en API, actualizando local:', error?.message)
                    try {
                        await db.update(category).set({ ...data, synced: false }).where(eq(category.id, id)).run()
                    } catch (dbError) {
                        console.error('Error al actualizar categoría en la base de datos:', dbError)
                        throw new Error('No se pudo actualizar la categoría')
                    }
                }
            },

            async deleteCategory(id: number) {
                try {
                    await api.delete(`/categories/${id}`)
                    await db.delete(category).where(eq(category.id, id)).run()
                } catch (error: any) {
                    console.warn('Error API al eliminar, eliminando local:', error?.message)
                    try {
                        await db.delete(category).where(eq(category.id, id)).run()
                    } catch (dbError) {
                        console.error('Error al eliminar categoría de la base de datos:', dbError)
                        throw new Error('No se pudo eliminar la categoría')
                    }
                }
            },

            async syncCategories() {
                try {
                    const unsynced = await db.select().from(category).where(eq(category.synced, false)).all()

                    for (const cat of unsynced) {
                        try {
                            const result = await api.post('/categories', cat)
                            await db.update(category).set({ synced: true }).where(eq(category.id, cat.id)).run()
                        } catch (err: any) {
                            console.warn('❌ No se pudo sincronizar categoría', cat.id, err.message)
                        }
                    }

                    // Obtener del servidor y actualizar local
                    const { data: apiCategories } = await api.get('/categories')
                    for (const cat of apiCategories) {
                        await db
                            .insert(category)
                            .values({ ...cat, synced: true })
                            .onConflictDoUpdate({ target: category.id, set: { ...cat, synced: true } })
                            .run()
                    }

                    console.log('✅ Sincronización de categorías completa')
                } catch (err: any) {
                    console.warn('❌ Error al sincronizar categorías', err.message)
                    throw new Error('No se pudieron sincronizar las categorías')
                }
            },
        }

        return service
    } catch (error) {
        console.error('Error al inicializar el servicio de categorías:', error)
        throw error
    }
}