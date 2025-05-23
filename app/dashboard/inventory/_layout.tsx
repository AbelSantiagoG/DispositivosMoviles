import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo'
import { ProtectedRoute } from "../../../context/ProtectedRoute";
import { PERMISSIONS } from "../../../constants/permissions";


const InventoryLayout = () => {

  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected as boolean)
    })
    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_INVENTARIO}>
      <Stack screenOptions={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white' }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="categories" options={{ headerShown: true }} />
        <Stack.Screen name="products" options={{ headerShown: true, headerTitle: "Gestión Productos" }} />
        <Stack.Screen name="suppliers" options={{ headerShown: true }} />
        <Stack.Screen name="productDetails/[idProduct]" options={{ headerShown: true, headerTitle: "Detalles del producto" }} />
      </Stack>
    </ProtectedRoute>
  )
}

export default InventoryLayout 
