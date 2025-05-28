import api from './api'
import { eq } from 'drizzle-orm'
import { supplier } from '../db/schema'
import { useDrizzle } from '../context/DatabaseContext'

export interface SupplierData {
    name: string
    email: string
    phone_number: string
    NIT: string
    enterprise_id: number
}


export const useSupplierService = () => {
    const db = useDrizzle()

    return {
        async getAllSuppliers() {
            try {
            const response = await api.get('/suppliers')
            const suppliers = response.data


                for (const s of suppliers) {
                await db
                    .insert(supplier)
                    .values({ ...s, synced: true })
                    .onConflictDoUpdate({ target: supplier.id, set: { ...s, synced: true } })
                    .run()
                }

                return suppliers
            } catch (error: any) {
                console.warn('API no disponible, usando proveedores locales:', error?.message)
                return await db.select().from(supplier).all()
            }
        },

        async getSupplierById(id: number) {
            try {
                const response = await api.get(`/suppliers/${id}`)
                const s = response.data

                await db
                .insert(supplier)
                .values({ ...s, synced: true })
                .onConflictDoUpdate({ target: supplier.id, set: { ...s, synced: true } })
                .run()

                return s
            } catch (error: any) {
                console.warn('API no disponible, usando proveedor local:', error?.message)
                return await db.select().from(supplier).where(eq(supplier.id, id)).get()
            }
        },

        async createSupplier(data: SupplierData) {
            try {
                const response = await api.post('/suppliers', data)
                const newSupplier = response.data

                await db.insert(supplier).values({ ...newSupplier, synced: true }).run()

                return newSupplier
            } catch (error: any) {
                console.warn('API no disponible, guardando proveedor local:', error?.message)
                await db.insert(supplier).values({ ...data, synced: false }).run()
            }
        },

        async updateSupplier(id: number, data: Partial<SupplierData>) {
            try {
                const response = await api.put(`/suppliers/${id}`, data)
                const updated = response.data

                await db.update(supplier).set({ ...updated, synced: true }).where(eq(supplier.id, id)).run()

                return updated
            } catch (error: any) {
                console.warn('Error en API, actualizando proveedor local:', error?.message)
                await db.update(supplier).set({ ...data, synced: false }).where(eq(supplier.id, id)).run()
            }
            },

            async deleteSupplier(id: number) {
            try {
                await api.delete(`/suppliers/${id}`)
                await db.delete(supplier).where(eq(supplier.id, id)).run()
            } catch (error: any) {
                console.warn('Error API al eliminar proveedor, eliminando local:', error?.message)
                await db.delete(supplier).where(eq(supplier.id, id)).run()
            }
        },

        async syncSuppliers() {
            try {
                const unsynced = await db
                .select()
                .from(supplier)
                .where(eq(supplier.synced, false))
                .all()

                for (const s of unsynced) {
                try {
                    await api.post('/suppliers', s)
                    await db.update(supplier).set({ synced: true }).where(eq(supplier.id, s.id)).run()
                } catch (err: any) {
                    console.warn('❌ No se pudo sincronizar proveedor', s.id, err.message)
                }
                }

                const { data: apiSuppliers } = await api.get('/suppliers')
                for (const s of apiSuppliers) {
                await db
                    .insert(supplier)
                    .values({ ...s, synced: true })
                    .onConflictDoUpdate({ target: supplier.id, set: { ...s, synced: true } })
                    .run()
                }

                console.log('✅ Sincronización de proveedores completa')
            } catch (err: any) {
                console.warn('❌ Error al sincronizar proveedores', err.message)
            }
        },
    }
}