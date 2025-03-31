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
import { Text } from 'react-native';

const HomeLayout = () => {
  //const [isConnected, setIsConnected] = useState(false)

  const [isConnected, setIsConnected] = React.useState<boolean | null>(null)
  const { expoPushToken, notification } = usePushNotifications()

  useEffect(() => {
    console.log('expoPushToken', expoPushToken)
    console.log("notificacion", notification)
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    })
    return () => {
      unsubscribe();
    }
  }, [])

  /* useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected as boolean)
      if (!state.isConnected) {
        router.replace('/no-connection')
      }
    })
    return () => {
      unsubscribe();
    }
  }, []) */

  return (
    <Text selectable={true}>{expoPushToken?.data}</Text>
    /* <Stack>
      <Stack.Screen name = "index" options= {{headerShown: false}}/>
      <Stack.Screen name = "dashboard" options= {{headerShown: false}}/>
      <Stack.Screen name = "login" options= {{headerShown: false}}/>
      <Stack.Screen name = "register" options= {{headerShown: false}}/>
      <Stack.Screen name = "no-connection" options= {{headerShown: false}}/>
    </Stack> */
  )
}

export default HomeLayout 
