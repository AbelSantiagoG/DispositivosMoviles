// components/ProductSyncer.tsx
import React, { useEffect, useRef } from 'react'
import { useProductService } from '../../lib/products'
import { useCategoryService } from '../../lib/categories'
import { useSupplierService } from '../../lib/suppliers'
import NetInfo from '@react-native-community/netinfo'
import { Alert } from 'react-native'

export function ProductSyncer() {
    const productService = useProductService()
    const categoryService = useCategoryService()
    const supplierService = useSupplierService()
    const isSyncing = useRef(false)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected && !isSyncing.current) {
                console.log("🌐 Conexión detectada. Iniciando sincronización...")
                syncAll()
            }
        })

        // Sincronización inicial si hay conexión
        NetInfo.fetch().then(state => {
            if (state.isConnected && !isSyncing.current) {
                console.log("🌐 Conexión inicial detectada. Iniciando sincronización...")
                syncAll()
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const syncAll = async () => {
        if (isSyncing.current) {
            console.log("🔄 Ya hay una sincronización en curso...")
            return
        }

        isSyncing.current = true
        try {
            console.log("🔄 Iniciando sincronización completa...")
            
            // Primero sincronizamos categorías ya que los productos dependen de ellas
            console.log("📑 Sincronizando categorías...")
            await categoryService.syncCategories()
            
            // Luego sincronizamos proveedores
            console.log("👥 Sincronizando proveedores...")
            await supplierService.syncSuppliers()
            
            // Finalmente sincronizamos productos
            console.log("📦 Sincronizando productos...")
            await productService.syncProducts()
            
            console.log("✅ Sincronización completa finalizada")
            Alert.alert('Sincronización', 'Los datos se han sincronizado correctamente')
        } catch (error: any) {
            console.error('❌ Error durante la sincronización:', error.message)
            Alert.alert('Error', 'Hubo un problema al sincronizar los datos')
        } finally {
            isSyncing.current = false
        }
    }

    return null
}
