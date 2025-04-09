/* import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo'

import "../global.css"; */

import React, { useEffect, createContext } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { Stack } from 'expo-router'
import "../global.css"
import { AuthProvider } from '../context/AuthContext';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { Text, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'

const HomeLayout = () => {
  //const [isConnected, setIsConnected] = useState(false)

  const [isConnected, setIsConnected] = React.useState<boolean | null>(null)
  const { expoPushToken, notification } = usePushNotifications()


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
    console.log('expoPushToken', expoPushToken)
    console.log("notificacion", notification)
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    })
    return () => {
      unsubscribe();
    }
  }, [expoPushToken, notification])

  return (
    /*<Text selectable={true}>{expoPushToken?.data}</Text>*/
    <>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="no-connection" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
    </Stack>

    <Toast config={toastConfig} /> 
    </>
  )
}

export default HomeLayout 
