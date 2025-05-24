import React, { useEffect, useState, createContext, Suspense } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { Stack } from 'expo-router'
import "../global.css"
import { AuthProvider } from '../context/AuthContext';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { Text, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import { ActivityIndicator } from 'react-native';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import migrations from '../drizzle/migrations';
import { addDummyData } from '../db/addDummyData';
import { DatabaseProvider } from '../context/DatabaseContext';
import * as schema from '../db/schema'

export const DATABASE_NAME = 'posdb'

const HomeLayout = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const { expoPushToken, notification } = usePushNotifications()
  //const { syncProducts } = useProductService() // 💡 importante
  const expoDB = openDatabaseSync(DATABASE_NAME)
  const db = drizzle(expoDB, { schema }) // Incluye el schema para tipado/autocompletado
  const { success, error } = useMigrations(db, migrations)

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#2ecc71', backgroundColor: '#333' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
        text2Style={{ fontSize: 14, color: '#ddd' }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: '#e74c3c', backgroundColor: '#333' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
        text2Style={{ fontSize: 14, color: '#ddd' }}
      />
    ),
    info: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#3498db', backgroundColor: '#333' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
        text2Style={{ fontSize: 14, color: '#ddd' }}
      />
    ),
  };



  useEffect(() => {
    if (success) {
      console.log("✅ Migraciones ejecutadas correctamente")
    }
    if (error) {
      console.error("❌ Error al aplicar migraciones", error)
    }

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
      if (state.isConnected) {
        console.log("🌐 Conexión detectada. Sincronizando productos...")
        //syncProducts()
      }
    })

    console.log('📱 Expo Push Token:', expoPushToken)
    console.log('🔔 Notificación:', notification)

    return () => {
      unsubscribe();
    }
  }, [expoPushToken, notification, success, error])

  // Esperar migraciones antes de renderizar la app
  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ marginTop: 16, color: '#fff' }}>Inicializando base de datos...</Text>
      </View>
    )
  }

  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <DatabaseProvider db={expoDB}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="no-connection" options={{ headerShown: false }} />
          <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        </Stack>

        <Toast config={toastConfig} />
      </DatabaseProvider>
    </SQLiteProvider>
  )
}

export default HomeLayout 