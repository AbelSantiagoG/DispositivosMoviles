// app/_layout.tsx
import React, { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { Stack } from 'expo-router'
import "../global.css"
import { usePushNotifications } from '../hooks/usePushNotifications'
import { Text, View, ActivityIndicator } from 'react-native'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import { SQLiteProvider, openDatabaseSync, deleteDatabaseSync } from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import migrations from '../drizzle/migrations'
import { DatabaseProvider } from '../context/DatabaseContext'
import * as schema from '../db/schema'
import { ProductSyncer } from '../components/organisms/ProductSyncer' 

export const DATABASE_NAME = 'posdb'

const HomeLayout = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [dbError, setDbError] = useState<Error | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const { expoPushToken, notification } = usePushNotifications()

  // Inicializar la base de datos
  const expoDB = openDatabaseSync(DATABASE_NAME)
  const db = drizzle(expoDB, { schema })
  const { success, error } = useMigrations(db, migrations)

  // Manejar la inicialización y errores
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Intentar eliminar la base de datos existente
        try {
          deleteDatabaseSync(DATABASE_NAME)
        } catch (e) {
          console.log('No existing database to delete or database is in use')
        }
      } catch (error) {
        console.error("Error durante la inicialización:", error)
        setDbError(error as Error)
      } finally {
        setIsInitializing(false)
      }
    }

    initializeDatabase()
  }, [])

  // Manejar el resultado de las migraciones
  useEffect(() => {
    if (error) {
      console.error("❌ Error al aplicar migraciones:", error)
      setDbError(error)
    }
    if (success) {
      console.log("✅ Migraciones ejecutadas correctamente")
      setDbError(null)
    }
  }, [success, error])

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
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (expoPushToken) {
      console.log('📱 Expo Push Token:', expoPushToken)
    }
    if (notification) {
      console.log('🔔 Notificación:', notification)
    }
  }, [expoPushToken, notification])

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ marginTop: 16, color: '#fff' }}>Inicializando base de datos...</Text>
      </View>
    )
  }

  if (dbError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <Text style={{ color: '#e74c3c', marginBottom: 16 }}>Error al inicializar la base de datos</Text>
        <Text style={{ color: '#fff', textAlign: 'center', padding: 16 }}>{dbError.message}</Text>
        <Text style={{ color: '#fff', marginTop: 16 }}>Por favor, reinicia la aplicación</Text>
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

        {/* 👇 Solo renderiza cuando haya conexión */}
        {isConnected && <ProductSyncer />}

        <Toast config={toastConfig} />
      </DatabaseProvider>
    </SQLiteProvider>
  )
}

export default HomeLayout