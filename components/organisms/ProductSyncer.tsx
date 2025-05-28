// components/ProductSyncer.tsx
import React, { useEffect, useRef, useState } from 'react'
import { useProductService } from '../../lib/products'
import { useCategoryService } from '../../lib/categories'
import { useSupplierService } from '../../lib/suppliers'
import NetInfo from '@react-native-community/netinfo'
import { Alert, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'

export function ProductSyncer() {
    const productService = useProductService()
    const categoryService = useCategoryService()
    const supplierService = useSupplierService()
    const isSyncing = useRef(false)
    const [isManualSyncing, setIsManualSyncing] = useState(false)

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
            setIsManualSyncing(false)
        }
    }

    const handleManualSync = async () => {
        if (isSyncing.current) {
            Alert.alert('Atención', 'Ya hay una sincronización en curso')
            return
        }

        setIsManualSyncing(true)
        await syncAll()
    }

    return (
        <View className="absolute top-2 right-16">
            <TouchableOpacity
                onPress={handleManualSync}
                disabled={isManualSyncing}
                className={`flex-row items-center justify-center px-3 py-1.5 rounded-full ${
                    isManualSyncing ? 'bg-gray-600' : 'bg-blue-600'
                }`}
            >
                {isManualSyncing ? (
                    <ActivityIndicator color="white" size="small" />
                ) : (
                    <>
                        <Feather name="refresh-cw" size={16} color="white" />
                        <Text className="text-white ml-1.5 text-sm font-semibold">
                            Sincronizar
                        </Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    )
}
